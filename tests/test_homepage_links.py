"""The homepage lists each stream item in its column, with links that stay on the preview origin, don't change external
links, and each have something to click."""

from html.parser import HTMLParser
import json
from pathlib import Path
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[1]
DAY = 86400
JAN_1_2021 = 1609459200


class Homepage(HTMLParser):
    """The homepage's links, and its lists of stream items as they are in the page."""

    def __init__(self, html):
        super().__init__()
        self.hrefs = []
        self.empty = []  # hrefs of links with no text or image in them
        self.open = None
        # Each list in order: its title, where its heading links (None if nowhere), and its entries in order, each
        # the entry's text without its date, the words of it that link, and where they link (None if nowhere).
        self.lists = []
        self.depth = 0  # how many divs deep, inside the lists
        self.target = None  # what text is being read into: a list (for its title) or an entry
        self.in_list = False
        self.in_date = False
        self.in_link = False
        self.in_shelf = False  # in the newsletter shelf, which is among the lists but isn't one
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = (attrs.get("class") or "").split()
        if tag == "a":
            self.hrefs.append(attrs.get("href"))
            self.open = self.hrefs[-1]
            self.in_link = True
            if self.target is not None and self.target["href"] is None:
                self.target["href"] = self.hrefs[-1]
        elif tag == "img":
            self.open = None
        elif tag == "section" and "home-newsletter" in classes:
            self.in_shelf = True
        elif self.in_shelf:
            return
        elif tag == "div" and (self.depth or "home-cols" in classes):
            self.depth += 1
            if "home-col" in classes:
                self.lists.append({"title": "", "href": None, "entries": []})
        elif not self.depth:
            return
        elif tag == "h2":
            self.target = self.lists[-1]
        elif tag == "ul":
            self.in_list = True
        elif tag == "li" and self.in_list:
            self.target = {"title": "", "linked": "", "href": None}
            self.lists[-1]["entries"].append(self.target)
        elif tag == "span" and "home-col-date" in classes:
            self.in_date = True

    def handle_data(self, data):
        if data.strip():
            self.open = None
        if self.target is not None and not self.in_date:
            self.target["title"] += data
            if self.in_link and "linked" in self.target:
                self.target["linked"] += data

    def handle_endtag(self, tag):
        if tag == "a":
            self.in_link = False
            if self.open is not None:
                self.empty.append(self.open)
                self.open = None
        if tag == "section":
            self.in_shelf = False
        if not self.depth or self.in_shelf:
            return
        if tag == "div":
            self.depth -= 1
        elif tag in ("h2", "li"):
            self.target["title"] = self.target["title"].strip()
            self.target = None
        elif tag == "ul":
            self.in_list = False
        elif tag == "span":
            self.in_date = False

    def titles(self):
        """Each list's title and the titles of its entries, in order."""
        return [(column["title"], [entry["title"] for entry in column["entries"]]) for column in self.lists]

    def entry(self, title):
        """Where the entry with that title links."""
        [href] = [entry["href"] for column in self.lists for entry in column["entries"] if entry["title"] == title]
        return href

    def linked(self, title):
        """The words of the entry with that title that link."""
        [linked] = [entry["linked"] for column in self.lists for entry in column["entries"] if entry["title"] == title]
        return linked


class Stream(HTMLParser):
    """A stream page's items in order, as their titles, each featured one's with a * before it."""

    def __init__(self, html):
        super().__init__()
        self.items = []
        self.in_title = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        classes = (dict(attrs).get("class") or "").split()
        if tag == "div" and "stream-item" in classes:
            self.items.append("*" if "featured" in classes else "")
        elif tag == "h2" and self.items and "stream-item-type" not in classes:
            self.in_title = True

    def handle_data(self, data):
        if self.in_title:
            self.items[-1] += data.strip()

    def handle_endtag(self, tag):
        if tag == "h2":
            self.in_title = False


def build_homepage(homecols, posts, data, streams={}):
    """Builds the site from the posts (name to front matter) and data.json items, and returns its homepage. homecols
    is the text of data/homecols.toml, or None for a site without that file. streams has the front matter of pages of
    content/stream/ by name, and the homepage's streams has their items (Stream.items) by the same name."""
    with tempfile.TemporaryDirectory() as temp:
        root = Path(temp)
        (root / "content/post").mkdir(parents=True)
        for name, front_matter in posts.items():
            (root / f"content/post/{name}.md").write_text(f"+++\n{front_matter}\n+++\nBody.\n")
        (root / "content/stream").mkdir()
        for name, front_matter in streams.items():
            (root / f"content/stream/{name}.md").write_text(f"+++\n{front_matter}\n+++\n")
        (root / "data").mkdir()
        if homecols is not None:
            (root / "data/homecols.toml").write_text(homecols)
        (root / "data/voverrides.json").write_text("{}")
        (root / "data/data.json").write_text(json.dumps(data))
        config = root / "config.json"
        config.write_text(json.dumps({"dataDir": str(root / "data")}))
        result = subprocess.run([
            "hugo", "-t", "smitop", "--enableGitInfo=false",
            "--config", f"{ROOT / 'config.toml'},{config}",
            "--contentDir", str(root / "content"),
            "--destination", str(root / "public"),
            "--cacheDir", str(root / "cache"),
        ], cwd=ROOT, capture_output=True, text=True, timeout=30)
        if result.returncode != 0:
            raise AssertionError(result.stdout + result.stderr)
        homepage = Homepage((root / "public/index.html").read_text())
        homepage.streams = {name: Stream((root / f"public/stream/{name}/index.html").read_text()).items
                            for name in streams}
        return homepage


def item(day, title, **fields):
    """A data.json item dated that day of January 2021."""
    return {"Type": "note", "Id": f"note-{day}", "Date": {"Unix": JAN_1_2021 + (day - 1) * DAY},
            "Uri": f"https://example.com/{day}", "Verbose": 0, **({"Title": title} if title else {}), **fields}


ONE_LIST = 'limit = 10\n[[columns]]\ntitle = "Everything"\nrest = true\n'


class HomepageLinksTest(unittest.TestCase):
    def test_local_links_are_relative_and_external_links_are_unchanged(self):
        local = "/post/local/?a=1&b=2#section"
        external = "https://iter.ca.example.net/post/local/?a=1&b=2#section"
        homepage = build_homepage(
            ONE_LIST,
            {
                "local": 'title = "Local post"\ndate = "2021-01-02"',
                "untitled": 'date = "2021-01-01"',
            },
            [
                item(1, "Local note", Uri="https://iter.ca" + local),
                item(2, None, Uri="https://iter.ca/post/local/#untitled"),
                item(3, "External note", Uri=external),
            ])
        hrefs = homepage.hrefs

        self.assertEqual(homepage.empty, [])
        self.assertIn("/post/local/", hrefs)
        self.assertIn(local, hrefs)
        self.assertIn("/post/local/#untitled", hrefs)
        self.assertIn(external, hrefs)
        self.assertFalse(any(href.startswith("https://iter.ca/") for href in hrefs))

    def test_stream_items_are_listed_in_their_columns(self):
        homepage = build_homepage(
            '''
            limit = 3
            latest_only = ["buttondown"]

            [[columns]]
            title = "Picks"
            featured = true
            ids = ["note-3"]
            more = "/stream/me/"

            [[columns.links]]
            title = "Custom link"
            url = "/custom/"

            [[columns.links]]
            before = "Made"
            title = "a sentence"
            after = "of its own words"
            url = "/sentence/"

            [[columns]]
            title = "First"
            tags = ["a"]
            kinds = ["lw"]
            more = "/tags/a/"

            [[columns]]
            title = "Second"
            tags = ["b", "a"]
            kinds = ["Report"]

            [[columns]]
            title = "Rest"
            rest = true
            ids = ["note-5"]
            ''',
            {
                # in the first column that lists one of its tags, not the column of its own first tag
                "both": 'title = "Both tags"\ndate = "2021-01-12"\ntags = ["b", "a"]',
                "b": 'title = "Tag b"\ndate = "2021-01-11"\ntags = ["b"]',
                "untagged": 'title = "Untagged"\ndate = "2021-01-10"',
                "featured": 'title = "Featured post"\ndate = "2021-01-01"\ntags = ["a"]\nverbose = -1',
                "verbose": 'title = "Too verbose post"\ndate = "2021-01-13"\ntags = ["a"]\nverbose = 1',
                "old": 'title = "Old tag a"\ndate = "2021-01-02"\ntags = ["a"]',
                # past the limit of its column
                "older": 'title = "Older tag a"\ndate = "2021-01-01"\ntags = ["a"]',
            },
            [
                # a NoteType is the kind of a note only
                item(9, "By kind", Type="lw", NoteType="Report"),
                item(5, "By id, not its kind", Type="lw"),
                item(4, "By note type", NoteType="Report"),
                item(3, "Picked by id"),
                item(2, "Featured note", Verbose=-1),
                item(8, "Newer issue", Type="buttondown"),
                item(7, "Older issue", Type="buttondown"),
                # the newest of its kind, but not for the other lists
                item(16, "Featured issue", Type="buttondown", Verbose=-1),
                item(14, "Too verbose note", Verbose=1),
                item(15, "Slightly verbose note", Verbose=0.5),
                item(6, None, Uri=None, Text="\n<p>An untitled note's text.</p>\n"),
            ],
            {"first": 'title = "First stream"\nVerbose = 1\nhomecol = "First"'})

        self.assertEqual(homepage.titles(), [
            # its links follow its stream items and don't count toward the limit
            ("Picks", ["Featured issue", "Picked by id", "Featured note", "Custom link",
                       "Made a sentence of its own words", "more..."]),
            ("First", ["Both tags", "By kind", "Old tag a", "more..."]),
            ("Second", ["Tag b", "By note type"]),
            ("Rest", ["Untagged", "Newer issue", "An untitled note's text."]),
        ])
        # a heading links where its list's "more..." does
        self.assertEqual([(column["title"], column["href"], column["entries"][-1]["href"]) for column in homepage.lists[:2]],
                         [("Picks", "/stream/me/", "/stream/me/"), ("First", "/tags/a/", "/tags/a/")])
        self.assertEqual([column["href"] for column in homepage.lists[2:]], [None, None])
        self.assertEqual(homepage.entry("Custom link"), "/custom/")
        self.assertEqual(homepage.linked("Custom link"), "Custom link")
        # of a sentence, only the title links
        self.assertEqual(homepage.entry("Made a sentence of its own words"), "/sentence/")
        self.assertEqual(homepage.linked("Made a sentence of its own words"), "a sentence")
        self.assertEqual(homepage.entry("By kind"), "https://example.com/9")
        # with no link of its own, to its entry on the stream page
        self.assertEqual(homepage.entry("An untitled note's text."), "/stream/interesting/#stream-item-note-6")
        # a list's stream page has every item that belongs in the list, of the verbosity the page allows: its featured
        # ones first, and those past the list's limit or too verbose for the homepage, but not one listed elsewhere by id
        self.assertEqual(homepage.streams["first"], [
            "*Featured post", "Too verbose post", "Both tags", "By kind", "Old tag a", "Older tag a"])

    def test_build_fails_without_the_lists(self):
        with self.assertRaisesRegex(AssertionError, "data/homecols.toml has no columns"):
            build_homepage(None, {"local": 'title = "Local post"\ndate = "2021-01-02"'}, [])

    def test_exclude_kinds_and_newsletter_shelf(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "content/post").mkdir(parents=True)
            (root / "content/post/post.md").write_text('+++\ntitle = "A post"\ndate = "2021-01-09"\n+++\nBody.\n')
            (root / "data").mkdir()
            (root / "data/homecols.toml").write_text(
                'limit = 10\nexclude_kinds = ["buttondown"]\n[[columns]]\ntitle = "Everything"\nrest = true\n'
            )
            (root / "data/voverrides.json").write_text("{}")
            issues = [
                item(d, f"iter.ca update #{d}", Type="buttondown",
                     Uri=f"https://buttondown.com/z/archive/update-{d}/",
                     Text=f"Hi readers! Issue {d}'s greeting.", Excerpt=f"Issue {d}&#x27;s first section.",
                     **({"Headings": ["posts", "research"]} if d == 6 else {}))
                for d in range(1, 7)
            ]
            (root / "data/data.json").write_text(json.dumps(issues))
            config = root / "config.json"
            config.write_text(json.dumps({"dataDir": str(root / "data")}))
            result = subprocess.run([
                "hugo", "-t", "smitop", "--enableGitInfo=false",
                "--config", f"{ROOT / 'config.toml'},{config}",
                "--contentDir", str(root / "content"),
                "--destination", str(root / "public"),
                "--cacheDir", str(root / "cache"),
            ], cwd=ROOT, capture_output=True, text=True, timeout=30)
            if result.returncode != 0:
                raise AssertionError(result.stdout + result.stderr)
            html = (root / "public/index.html").read_text()

        homepage = Homepage(html)
        self.assertEqual(homepage.empty, [])
        # Buttondown issues are excluded from the column and shown in the shelf instead.
        self.assertEqual(homepage.titles(), [("Everything", ["A post"])])
        self.assertIn("6 issues", html)
        self.assertIn("all 6", html)
        # Latest issue (#6) is previewed and the next four (#5..#2) link directly; #1 is only in the archive count.
        self.assertIn("iter.ca update #6", html)
        self.assertIn("https://buttondown.com/z/archive/update-5/", html)
        self.assertIn("https://buttondown.com/z/archive/update-2/", html)
        self.assertNotIn("https://buttondown.com/z/archive/update-1/", html)
        # Headings render when present, and the excerpt, with its entities decoded, rather than the start of the text.
        self.assertIn("posts, research", html)
        self.assertIn("Issue 6&#39;s first section.", html)
        self.assertNotIn("greeting", html)


if __name__ == "__main__":
    unittest.main()
