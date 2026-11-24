"""Build the real site and check what its pages rely on: links and images that go somewhere, real dates, titles as
written, a feed with the newest posts, and a current security.txt. It checks the site as full Neocities builds deploy
it, after ./subrepos.sh has generated the files pages link to, so it is skipped until that has run."""

import csv
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
import io
from pathlib import Path
import re
import subprocess
import tempfile
import tomllib
import unittest
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
SITE = "https://iter.ca"
# the last file ./subrepos.sh generates
GENERATED = ROOT / "static/ext/og-home.png"


def hugo(*args):
    result = subprocess.run(["hugo", *args], cwd=ROOT, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        raise AssertionError(result.stdout + result.stderr)
    return result.stdout


class Page(HTMLParser):
    """A page's tab title, the ids that fragments can link to, and the URLs it links to or loads."""

    def __init__(self, html):
        super().__init__()
        self.title, self.ids, self.urls, self.in_title = None, set(), [], False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.ids.update(value for name, value in attrs.items() if name == "id" or (tag == "a" and name == "name"))
        self.urls += [attrs[name] for name in ("href", "src") if attrs.get(name) is not None]
        self.urls += [candidate.split()[0] for candidate in (attrs.get("srcset") or "").split(",") if candidate.strip()]
        if tag == "meta" and (attrs.get("property") or attrs.get("name")) in ("og:image", "twitter:image"):
            self.urls.append(attrs.get("content") or "")
        if tag == "title" and self.title is None:
            self.title, self.in_title = "", True

    def handle_data(self, data):
        if self.in_title:
            self.title += data

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False


@unittest.skipUnless(GENERATED.exists(), "checks the site as full builds deploy it: run ./subrepos.sh first, as they do")
class SiteTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        temp = tempfile.TemporaryDirectory()
        cls.addClassCleanup(temp.cleanup)
        cls.public = Path(temp.name) / "public"
        # the pages Hugo publishes, from its own list of the content rather than from the templates under test
        now = datetime.now(timezone.utc)
        cls.content = [row for row in csv.DictReader(io.StringIO(hugo("list", "all")))
                       if row["draft"] == "false" and datetime.fromisoformat(row["publishDate"]) <= now]
        hugo("-t", "smitop", "-d", str(cls.public), "--cacheDir", str(Path(temp.name) / "cache"))
        cls.pages = {file: Page(file.read_text(errors="replace")) for file in cls.public.rglob("*.html")}

    def served(self, url):
        """The file in the build that serves a URL on the site."""
        file = self.public / unquote(urlsplit(url).path).lstrip("/")
        return file / "index.html" if file.is_dir() else file

    def test_links_and_images_go_somewhere(self):
        broken = []
        for file, page in self.pages.items():
            path = str(file.relative_to(self.public))
            # pages copied from static/ are apps, whose scripts can read a fragment that names no element
            app = (ROOT / "static" / path).exists()
            for url in page.urls:
                # such as a card image's https://iter.ca//image.png
                if url.startswith(SITE + "//"):
                    broken.append((path, url))
                    continue
                target_url = urljoin(f"{SITE}/{path}", url)
                if not target_url.startswith(SITE + "/"):
                    continue
                target = self.served(target_url)
                fragment = unquote(urlsplit(target_url).fragment)
                if not target.exists():
                    broken.append((path, url))
                # #search is the topbar's Search link, which search.js opens the search box for
                elif (fragment and fragment != "search" and not app and target in self.pages
                      and fragment not in self.pages[target].ids):
                    broken.append((path, url))
        self.assertEqual(sorted(broken), [])

    def test_no_page_shows_the_zero_date(self):
        # the date Hugo gives a page without one, which stream pages showed for such pages, and a post whose front
        # matter it can't read, as with a stray line before the +++
        zero = re.compile(r"\b(?:Jan(?:uary)? 0?1,? 0001|0001-01-01)\b")
        self.assertEqual(sorted(str(file.relative_to(self.public)) for file in self.pages
                                if zero.search(file.read_text(errors="replace"))), [])

    def test_tab_titles_are_titles_as_written(self):
        # *asterisks* and all: only titles in the page itself set them in italics
        wrong = []
        for row in self.content:
            page = self.pages.get(self.served(row["permalink"]))
            if row["title"] and page and (page.title or "").strip() != row["title"]:
                wrong.append((row["path"], row["title"], page.title))
        self.assertEqual(wrong, [])

    def test_feed_has_every_post_newer_than_its_oldest_item(self):
        # including posts that are page bundles, and leaving out replies, as the feed does
        items = ET.parse(self.public / "index.xml").findall("./channel/item")
        oldest = min(parsedate_to_datetime(item.findtext("pubDate")) for item in items)
        links = {item.findtext("link") for item in items}
        missing = [row["path"] for row in self.content if row["path"].startswith("content/post/")
                   and datetime.fromisoformat(row["date"]) > oldest and row["permalink"] not in links
                   and "reply" not in tomllib.loads((ROOT / row["path"]).read_text().split("+++\n")[1])]
        self.assertEqual(missing, [])

    def test_security_txt_is_current(self):
        lines = (self.public / ".well-known/security.txt").read_text().splitlines()
        fields = dict(line.split(": ", 1) for line in lines if line and not line.startswith("#"))
        self.assertEqual(fields["Canonical"], SITE + "/.well-known/security.txt")
        # RFC 9116 recommends an Expires less than a year away. This fails a month before it, while the deployed file
        # is still current, since a failure stops the deploy.
        expires = datetime.fromisoformat(fields["Expires"])
        now = datetime.now(timezone.utc)
        self.assertTrue(now + timedelta(days=30) < expires < now + timedelta(days=365),
                        f"Expires is {expires:%Y-%m-%d}: set it to less than a year from now")


if __name__ == "__main__":
    unittest.main()
