// Ctrl-K or ⌘K, or the topbar's Search link, opens a box that searches the text of every page of the site and of the
// items in its full stream, most of which link to other sites (pull requests, Stack Exchange posts, HN comments), and of
// the items only search has (my GitHub repositories, the pages of kb.iter.ca). The first time it opens on a page, it
// loads /search.json, which Hugo writes at build time (themes/smitop/layouts/index.searchindex.json). style.css styles
// the box.
(function () {
  var LIMIT = 40; // how many results are shown
  var PREVIEW = 200; // about how many characters of a page a result shows
  var WORD = "\\p{L}\\p{M}\\p{N}"; // what words are made of
  // A word may have apostrophes inside it, which match either kind, so "don't" finds "don’t".
  var WORDS = new RegExp("[" + WORD + "]+(?:'[" + WORD + "]+)*", "gu");
  var dialog, input, status, list;
  var pages = null; // the index, once it has loaded
  var loading = false;
  var shown = []; // the results' list items, best first
  var selected = 0;

  addEventListener("keydown", function (e) {
    // Chrome's autofill sends keydown events without a key.
    if ((e.key || "").toLowerCase() !== "k" || !(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey) return;
    e.preventDefault();
    // Holding the keys repeats the keydown, which would open and close the box over and over. Its repeats still don't
    // do what the browser would, such as going to the address bar.
    if (e.repeat) return;
    if (dialog && dialog.open) return dialog.close();
    open();
  });

  // The link is in the topbar (themes/smitop/layouts/partials/topbar.html).
  addEventListener("click", function (e) {
    if (!e.target.closest || !e.target.closest("#search-link")) return;
    e.preventDefault();
    open();
  });

  function open() {
    if (!dialog) build();
    dialog.showModal();
    input.select();
    load();
  }

  function build() {
    dialog = document.createElement("dialog");
    dialog.id = "search";
    dialog.setAttribute("aria-label", "Search this site");
    dialog.innerHTML =
      '<div class="search-box">' +
      '<input type="text" role="combobox" aria-label="Search iter.ca" placeholder="Search iter.ca" aria-controls="search-results"' +
      ' aria-expanded="false" aria-autocomplete="list" autocomplete="off" spellcheck="false" enterkeyhint="go">' +
      '<div class="search-status" role="status"></div>' +
      '<ul id="search-results" role="listbox" aria-label="Results"></ul>' +
      "</div>";
    document.body.appendChild(dialog);
    input = dialog.querySelector("input");
    status = dialog.querySelector(".search-status");
    list = dialog.querySelector("ul");
    // The box fills the dialog, so a click on the dialog itself is on the backdrop around it.
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    input.addEventListener("input", search);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        select(selected + (e.key === "ArrowDown" ? 1 : -1), true);
      } else if (e.key === "Enter" && shown.length && !e.isComposing) {
        e.preventDefault();
        // Following a result closes the box: one on this page only scrolls to it, and the box shouldn't be open when
        // someone comes back to this page.
        dialog.close();
        location.href = shown[selected].querySelector("a").href;
      }
    });
    // So does clicking one, unless the click opens it somewhere else, such as in a new tab.
    list.addEventListener("click", function (e) {
      if (!e.target.closest("a") || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      dialog.close();
    });
    // Only a moving mouse selects, so results scrolling under a still one don't.
    list.addEventListener("mousemove", function (e) {
      var li = e.target.closest("li");
      if (li) select(shown.indexOf(li), false);
    });
  }

  function load() {
    if (pages || loading) return;
    loading = true;
    status.textContent = "Loading…";
    // The index changes with every build, so the browser checks for a newer one instead of trusting its cache.
    fetch("/search.json", { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(
        function (json) {
          // A result shows its title, or what it is if it's a stream item without one, such as an HN comment. A stream
          // item with a title also shows what it is after it, as the stream does: its label. Both can be searched.
          json.forEach(function (page) {
            page.label = page.title ? page.type || "" : "";
            page.title = page.title || page.type;
            // A page's tags aren't shown, but it can be found by them.
            page.tags = page.tags || "";
          });
          pages = json;
          search();
        },
        function () {
          // Opening the box again tries again.
          status.textContent = "Couldn't load the search index.";
        }
      )
      .finally(function () {
        loading = false;
      });
  }

  // Where each query word starts a word in s, as [start, end, which word], in order. A query word matches the start of
  // a word, ignoring case, so "png" finds "PNG" and "PNGs". A match of a whole word is marked whole.
  function matches(patterns, s) {
    var found = [];
    patterns.forEach(function (re, w) {
      re.lastIndex = 0;
      for (var m; (m = re.exec(s)); ) {
        found.push({ start: m.index, end: m.index + m[0].length - m[1].length, word: w, whole: !m[1] });
      }
    });
    return found.sort(function (a, b) {
      return a.start - b.start;
    });
  }

  // How many times each query word is in s, with a match of only the start of a word counting half. It counts without
  // keeping where, since it runs on every page for every keystroke.
  function counts(patterns, s) {
    return patterns.map(function (re) {
      var n = 0;
      re.lastIndex = 0;
      for (var m; (m = re.exec(s)); ) n += m[1] ? 0.5 : 1;
      return n;
    });
  }

  // The words of s, in lowercase and with ’ as '.
  function wordsOf(s) {
    return s.toLowerCase().replace(/’/g, "'").match(WORDS) || [];
  }

  function search() {
    var query = wordsOf(input.value);
    var words = query
      .filter(function (w, i) {
        return query.indexOf(w) === i;
      })
      .slice(0, 10);
    shown = [];
    list.textContent = "";
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
    if (!pages) return;
    status.textContent = "";
    if (!words.length) return;
    var patterns = words.map(function (w) {
      return new RegExp("(?<![" + WORD + "])" + w.replace(/'/g, "['’]") + "([" + WORD + "]*)", "giu");
    });
    // The words in a row, with anything but words between them.
    var phrase = new RegExp("(?<![" + WORD + "])" + words.join("[^" + WORD + "]+").replace(/'/g, "['’]"), "iu");

    // Each page is scored with BM25 (https://en.wikipedia.org/wiki/Okapi_BM25) over its label, description, tags, and
    // text, plus more for each word in its title. A page has to have every word somewhere.
    var avgLength = 0;
    var found = pages.map(function (page) {
      var body = page.label + " " + page.desc + " " + page.tags + " " + page.text;
      avgLength += body.length / pages.length;
      return { page: page, title: counts(patterns, page.title), body: counts(patterns, body), length: body.length };
    });
    var idf = words.map(function (w, i) {
      var df = found.filter(function (f) {
        return f.title[i] || f.body[i];
      }).length;
      return Math.log(1 + (pages.length - df + 0.5) / (df + 0.5));
    });
    var results = found.filter(function (f) {
      return words.every(function (w, i) {
        return f.title[i] || f.body[i];
      });
    });
    var k1 = 1.2; // BM25's usual parameters
    var b = 0.75;
    results.forEach(function (f) {
      f.score = 0;
      words.forEach(function (w, i) {
        var tf = f.body[i];
        f.score += idf[i] * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * f.length) / avgLength)) + 3 * Math.min(f.title[i], 1));
      });
      var page = f.page;
      if (words.length > 1 && [page.title, page.label, page.desc, page.text].some(phrase.test, phrase)) f.score *= 2;
      // The site's own pages come before stream items, which are mostly short and mostly about other people's projects,
      // so their few words would otherwise put a pull request about Rust above a post about Rust.
      if (page.type) f.score /= 2;
      // A page whose title is the query comes first, however much more of it others have.
      f.exact = wordsOf(page.title).join(" ") === query.join(" ");
    });
    results.sort(function (a, b) {
      return b.exact - a.exact || b.score - a.score;
    });

    status.textContent = !results.length
      ? "No results"
      : results.length > LIMIT
      ? results.length + " results, showing the best " + LIMIT
      : results.length === 1
      ? "1 result"
      : results.length + " results";
    results.slice(0, LIMIT).forEach(function (f, i) {
      var li = document.createElement("li");
      li.id = "search-result-" + i;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", "false");
      var a = document.createElement("a");
      a.href = f.page.url;
      // Focus stays in the box, which says which result is selected, so Tab can't focus another one for Enter to
      // follow.
      a.tabIndex = -1;
      var title = document.createElement("span");
      title.className = "search-title";
      highlight(title, f.page.title, 0, f.page.title.length, matches(patterns, f.page.title));
      if (f.page.label) {
        var label = document.createElement("span");
        label.className = "search-type";
        highlight(label, f.page.label, 0, f.page.label.length, matches(patterns, f.page.label));
        title.append(" ", label);
      }
      // The date isn't searched, so it isn't marked. A no-break space keeps it on the line with the label.
      if (f.page.date) {
        var date = document.createElement("span");
        date.className = "search-date";
        date.textContent = (f.page.label ? "· " : "") + f.page.date;
        title.append(f.page.label ? "\u00a0" : " ", date);
      }
      var preview = document.createElement("span");
      preview.className = "search-preview";
      showPreview(preview, f.page, patterns);
      a.append(title, preview);
      li.appendChild(a);
      list.appendChild(li);
      shown.push(li);
    });
    selected = 0;
    if (shown.length) {
      input.setAttribute("aria-expanded", "true");
      select(0, true);
    }
  }

  // The part of a page's text with the most of the query words close together, or of its description if its text has
  // none of them, or the start of its description or text if neither has any.
  function showPreview(el, page, patterns) {
    var text = page.text;
    var found = matches(patterns, text);
    if (!found.length && page.desc) {
      text = page.desc;
      found = matches(patterns, text);
    }
    var near = PREVIEW * 0.6;
    var best = 0;
    var bestWords = 0;
    var bestCount = 0;
    var inWindow = patterns.map(function () {
      return 0;
    });
    var words = 0;
    for (var i = 0, j = 0; i < found.length; i++) {
      for (; j < found.length && found[j].start < found[i].start + near; j++) {
        if (!inWindow[found[j].word]++) words++;
      }
      if (words > bestWords || (words === bestWords && j - i > bestCount)) {
        best = i;
        bestWords = words;
        bestCount = j - i;
      }
      if (!--inWindow[found[i].word]) words--;
    }
    // Some text before the matches, starting and ending between words when there's a space nearby.
    var start = found.length ? Math.max(0, found[best].start - 40) : 0;
    var end = Math.min(text.length, start + PREVIEW);
    if (start > 0) {
      var space = text.indexOf(" ", start);
      if (space !== -1 && space < start + 20 && (!found.length || space < found[best].start)) start = space + 1;
    }
    if (end < text.length) {
      var back = text.lastIndexOf(" ", end);
      if (back > end - 20 && back > start) end = back;
    }
    if (start > 0) el.append("…");
    highlight(el, text, start, end, found);
    if (end < text.length) el.append("…");
  }

  // Appends s from start to end to el, with each match in it marked.
  function highlight(el, s, start, end, found) {
    var at = start;
    found.forEach(function (m) {
      var from = Math.max(m.start, at);
      var to = Math.min(m.end, end);
      if (from >= to) return;
      el.append(s.slice(at, from));
      var mark = document.createElement("mark");
      mark.textContent = s.slice(from, to);
      el.appendChild(mark);
      at = to;
    });
    el.append(s.slice(at, end));
  }

  function select(i, scroll) {
    if (!shown.length) return;
    shown[selected].setAttribute("aria-selected", "false");
    selected = (i + shown.length) % shown.length;
    shown[selected].setAttribute("aria-selected", "true");
    input.setAttribute("aria-activedescendant", shown[selected].id);
    if (scroll) shown[selected].scrollIntoView({ block: "nearest" });
  }
})();
