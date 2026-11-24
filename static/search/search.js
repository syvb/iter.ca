// Ctrl-K or ⌘K, or the topbar's Search link, opens a box that searches the text of every page of the site and of the
// items in its full stream, most of which link to other sites (pull requests, Stack Exchange posts, HN comments), and of
// the items only search has (my GitHub repositories, the pages of kb.iter.ca). The first time it opens on a page, it
// loads /search.json, which Hugo writes at build time (themes/smitop/layouts/index.searchindex.json). style.css styles
// the box.
(function () {
  var LIMIT = 40; // how many results are shown at first
  var MORE = 100; // how many more the button after them shows
  var PREVIEW = 200; // about how many characters of a page a result shows
  // With ?debug in the URL, the box says how it read the query and how it scored each result (debugQuery(),
  // debugResult()).
  var DEBUG = new URLSearchParams(location.search).has("debug");
  var WORD = "\\p{L}\\p{M}\\p{N}"; // what words are made of
  // A word may have apostrophes inside it, of either kind; fold() makes them the same, so "don't" finds "don’t".
  var WORDS = new RegExp("[" + WORD + "]+(?:['’][" + WORD + "]+)*", "gu");
  // A query word finds a word of a page that's the same, and counts it once. It also finds others, which count less:
  var STEMMED = 0.75; // a word with the same stem (Porter2's), so "compressing" finds "compression"
  var ALIASED = 0.75; // an alias of it (below), so "js" finds "JavaScript"
  var PREFIX = 0.5; // a word it starts, so "png" finds "PNGs", including the word being typed
  var TYPO = 0.5; // a word a typo away, or two from 9 letters, so "colmak" finds "Colemak" (see expand())
  // Words and phrases that mean the same thing, so a query with one finds the others. A phrase is only found with its
  // words in a row, and its last word may start a longer one, so "language model" finds "language models".
  var ALIASES = [
    ["ai", "artificial intelligence"],
    ["agi", "artificial general intelligence"],
    ["llm", "llms", "language model"],
    ["ml", "machine learning"],
    ["rl", "reinforcement learning"],
    ["nla", "nlas", "natural language autoencoder"],
    ["interp", "interpretability"],
    ["ea", "effective altruism"],
    ["hn", "hacker news"],
    ["lw", "lesswrong", "less wrong"],
    ["se", "stackexchange", "stack exchange"],
    ["stackoverflow", "stack overflow"],
    ["pr", "prs", "pull request"],
    ["gh", "github"],
    ["bsky", "bluesky"],
    ["yt", "youtube"],
    ["yc", "ycombinator", "y combinator"],
    ["openai", "open ai"],
    ["chatgpt", "chat gpt"],
    ["js", "javascript"],
    ["ts", "typescript"],
    ["wasm", "webassembly", "web assembly"],
    ["postgres", "postgresql"],
    ["db", "database"],
    ["k8s", "kubernetes"],
    ["regex", "regexp", "regular expression"],
    ["vscode", "vs code", "visual studio code"],
    ["ubo", "ublock"],
    ["os", "operating system"],
    ["ui", "user interface"],
    ["cli", "command line"],
    ["ctf", "capture the flag"],
    ["botc", "clocktower", "blood on the clocktower"],
    ["email", "e-mail"],
    ["sf", "san francisco"],
    ["nyc", "new york"],
    ["color", "colour"],
    ["favorite", "favourite"],
    ["behavior", "behaviour"],
    ["center", "centre"],
    ["gray", "grey"],
  ];
  var dialog, input, status, list, more, debugBox;
  var pages = null; // the index, once it has loaded
  var loading = false;
  // The words of the pages, as fold() has them, each with the pages it's in, as a list of [page, how many times
  // in its title, how many times in the rest of what's searched]. vocab is them in order, so the words a query word
  // starts are together, and stemmed has the stems of those a query has needed.
  var terms, vocab, stemmed;
  var aliases; // ALIASES, ready to use
  var lengths, avgLength; // how long what's searched of each page is, and on average, for BM25
  var indexTime; // how many milliseconds buildIndex() took, for ?debug
  var current = null; // the query's results, best first, with how it was read (its units and lookup), to show more
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
      (DEBUG ? '<div class="search-debug"></div>' : "") +
      // The button scrolls with the results, so it shows once they're scrolled to the end.
      '<div class="search-scroll">' +
      '<ul id="search-results" role="listbox" aria-label="Results"></ul>' +
      '<button type="button" class="search-more" hidden></button>' +
      "</div>" +
      "</div>";
    document.body.appendChild(dialog);
    input = dialog.querySelector("input");
    status = dialog.querySelector(".search-status");
    list = dialog.querySelector("ul");
    more = dialog.querySelector(".search-more");
    debugBox = dialog.querySelector(".search-debug");
    // The box fills the dialog, so a click on the dialog itself is on the backdrop around it.
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    input.addEventListener("input", search);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        // ↓ on the last result shows more, when there are more, instead of going back to the first.
        if (e.key === "ArrowDown" && selected === shown.length - 1 && !more.hidden) showMore(MORE);
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
    // Clicking it leaves focus in the box, so typing still changes the query.
    more.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    more.addEventListener("click", function () {
      showMore(MORE);
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
          var started = performance.now();
          buildIndex();
          indexTime = performance.now() - started;
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

  // Splits each page into its words: those of its title, and of the rest of what's searched, its label, description,
  // tags, and text.
  function buildIndex() {
    terms = new Map();
    lengths = pages.map(function (page, i) {
      var body = page.label + " " + page.desc + " " + page.tags + " " + page.text;
      for (var inBody = 0; inBody < 2; inBody++) {
        var words = wordsOf(inBody ? body : page.title);
        for (var j = 0; j < words.length; j++) {
          var p = terms.get(words[j]);
          if (!p) terms.set(words[j], (p = []));
          if (p[p.length - 3] !== i) p.push(i, 0, 0);
          p[p.length - 2 + inBody]++;
        }
      }
      return body.length;
    });
    avgLength =
      lengths.reduce(function (a, b) {
        return a + b;
      }, 0) / pages.length;
    vocab = Array.from(terms.keys()).sort();
    // each alias's words, their stems, and, for a phrase, a pattern that finds its words in a row
    aliases = ALIASES.map(function (group) {
      return group.map(function (f) {
        var words = wordsOf(f);
        return {
          words: words,
          stems: words.map(stem),
          phrase: words.length > 1 && new RegExp("(?<![" + WORD + "])" + words.join("[^" + WORD + "]+"), "iu"),
        };
      });
    });
    stemmed = new Map();
  }

  // A word in lowercase, with ’ as ' and without accents, so "naive" finds "naïve".
  function fold(w) {
    w = w.toLowerCase();
    return /[^\x00-\x7f]/.test(w) ? w.replace(/’/g, "'").normalize("NFD").replace(/\p{M}/gu, "") : w;
  }

  // The words of s, as fold() has them.
  function wordsOf(s) {
    var words = s.toLowerCase().match(WORDS) || [];
    for (var i = 0; i < words.length; i++) if (/[^\x00-\x7f]/.test(words[i])) words[i] = fold(words[i]);
    return words;
  }

  // The words of the pages that a query word finds, each with how much it counts and, for a word it only starts, its
  // length, which is how much of the word is marked. A word that's 5 letters or more and isn't anywhere, not even by
  // its stem, also finds the words a typo away from it or from its stem, or two typos from 9 letters, so "colmaks"
  // finds "Colemak". Only a word the user typed finds the words it starts and typos: an alias doesn't, so "javascript"
  // doesn't find "JSON".
  function expand(w, typed) {
    var found = new Map();
    function add(t, how, weight, prefix) {
      var had = found.get(t);
      if (!had || had.weight < weight) found.set(t, { how: how, weight: weight, prefix: prefix });
    }
    if (terms.has(w)) add(w, "exact", 1, 0);
    // A stem is its word with at most its last two letters changed, so the words with this stem start like it.
    var s = stem(w);
    if (s.length > 1) {
      startingWith(s.slice(0, Math.max(1, s.length - 2)), function (t) {
        if (!stemmed.has(t)) stemmed.set(t, stem(t));
        if (stemmed.get(t) === s) add(t, "stem", STEMMED, 0);
      });
    }
    if (!typed) return found;
    if (!found.size) {
      (s === w ? [w] : [w, s]).forEach(function (x) {
        var k = x.length >= 9 ? 2 : x.length >= 5 ? 1 : 0;
        if (!k) return;
        vocab.forEach(function (t) {
          if (near(x, t, k)) add(t, "typo", TYPO, 0);
        });
      });
    }
    startingWith(w, function (t) {
      add(t, "prefix", PREFIX, w.length);
    });
    return found;
  }

  // Calls f with each word of the pages that starts with start, which are together in vocab.
  function startingWith(start, f) {
    for (var lo = 0, hi = vocab.length; lo < hi; ) {
      var mid = (lo + hi) >> 1;
      if (vocab[mid] < start) lo = mid + 1;
      else hi = mid;
    }
    for (var i = lo; i < vocab.length && vocab[i].startsWith(start); i++) f(vocab[i]);
  }

  // Whether a and b are at most k edits apart, where an edit adds, removes, or changes a letter, or swaps two next to
  // each other (optimal string alignment distance).
  function near(a, b, k) {
    if (Math.abs(a.length - b.length) > k) return false;
    var before = [];
    var prev = [];
    for (var j = 0; j <= b.length; j++) prev[j] = j;
    for (var i = 1; i <= a.length; i++) {
      var row = [i];
      var least = i;
      for (j = 1; j <= b.length; j++) {
        var d = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, before[j - 2] + 1);
        row[j] = d;
        least = Math.min(least, d);
      }
      if (least > k) return false;
      before = prev;
      prev = row;
    }
    return prev[b.length] <= k;
  }

  // The query's words, grouped into what a result has to have: a word, or the words of an alias phrase, such as
  // "hacker news". Each has the ways it can be found, its forms: what was typed, and its aliases.
  function unitsOf(words) {
    var wordStems = words.map(stem);
    var units = [];
    for (var i = 0; i < words.length; ) {
      // the longest alias at this word, by its stems, so "pull requests" is "pull request"
      var group = null;
      var form = null;
      aliases.forEach(function (g) {
        g.forEach(function (f) {
          var fits = f.stems.every(function (s, j) {
            return wordStems[i + j] === s;
          });
          if (fits && (!form || f.words.length > form.words.length)) {
            group = g;
            form = f;
          }
        });
      });
      var typed = words.slice(i, i + (form ? form.words.length : 1));
      var forms = [{ words: typed, typed: true, weight: 1 }];
      if (form) {
        group.forEach(function (f) {
          if (f !== form) forms.push({ words: f.words, weight: ALIASED, phrase: f.phrase });
        });
      }
      units.push({ text: typed.join(" "), forms: forms });
      i += typed.length;
    }
    return units;
  }

  // How much of each unit each page has, in its title and in the rest of it, and, in lookup, which unit each word of
  // the pages it finds is of. A form with more than one word counts as many times as the one of them the page has
  // least of, so only on a page with all of them, and an alias phrase only on a page with its words in a row. Each
  // form keeps what expand() found for its words, in found.
  function count(units, lookup) {
    var n = pages.length;
    return units.map(function (unit, u) {
      var title = new Float64Array(n);
      var body = new Float64Array(n);
      unit.forms.forEach(function (form) {
        var formTitle, formBody;
        form.found = form.words.map(function (w) {
          return expand(w, form.typed);
        });
        form.found.forEach(function (found) {
          var t = new Float64Array(n);
          var b = new Float64Array(n);
          found.forEach(function (m, term) {
            var had = lookup.get(term);
            if (!had || (had.prefix && !m.prefix)) lookup.set(term, { word: u, prefix: m.prefix });
            var p = terms.get(term);
            for (var i = 0; i < p.length; i += 3) {
              t[p[i]] += p[i + 1] * m.weight;
              b[p[i]] += p[i + 2] * m.weight;
            }
          });
          formTitle = formTitle
            ? formTitle.map(function (x, i) {
                return Math.min(x, t[i]);
              })
            : t;
          formBody = formBody
            ? formBody.map(function (x, i) {
                return Math.min(x, b[i]);
              })
            : b;
        });
        for (var i = 0; i < n; i++) {
          if (!formTitle[i] && !formBody[i]) continue;
          var page = pages[i];
          var fields = [page.title, page.label, page.desc, page.tags, page.text];
          if (form.phrase && !fields.some(form.phrase.test, form.phrase)) continue;
          title[i] += formTitle[i] * form.weight;
          body[i] += formBody[i] * form.weight;
        }
      });
      return { title: title, body: body };
    });
  }

  // Where s has a word the query found, as [start, end, which unit], in order. A word the query only found the start
  // of is marked only that far.
  function matches(lookup, s) {
    var found = [];
    WORDS.lastIndex = 0;
    for (var m; (m = WORDS.exec(s)); ) {
      var hit = lookup.get(fold(m[0]));
      if (hit) found.push({ start: m.index, end: m.index + (hit.prefix || m[0].length), word: hit.word });
    }
    return found;
  }

  function search() {
    var started = performance.now();
    var query = wordsOf(input.value);
    var words = query
      .filter(function (w, i) {
        return query.indexOf(w) === i;
      })
      .slice(0, 10);
    current = null;
    shown = [];
    list.textContent = "";
    more.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
    if (DEBUG) debugBox.textContent = "";
    if (!pages) return;
    status.textContent = "";
    if (!words.length) return;
    var units = unitsOf(words);
    var lookup = new Map();
    var counts = count(units, lookup);
    // The words in a row, with anything but words between them.
    var phrase = new RegExp("(?<![" + WORD + "])" + words.join("[^" + WORD + "]+").replace(/'/g, "['’]"), "iu");

    // Each page is scored with BM25 (https://en.wikipedia.org/wiki/Okapi_BM25) over its label, description, tags, and
    // text, plus more for each unit in its title. Pages with every unit come first, then those with fewer.
    counts.forEach(function (c, u) {
      var df = 0;
      for (var i = 0; i < pages.length; i++) if (c.title[i] || c.body[i]) df++;
      units[u].df = df;
      units[u].idf = Math.log(1 + (pages.length - df + 0.5) / (df + 0.5));
    });
    var k1 = 1.2; // BM25's usual parameters
    var b = 0.75;
    var results = [];
    pages.forEach(function (page, i) {
      // each unit's part of the score, if the page has it
      var f = { page: page, length: lengths[i], score: 0, parts: [] };
      counts.forEach(function (c, u) {
        if (!c.title[i] && !c.body[i]) return;
        var tf = c.body[i];
        var bm25 = (tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * lengths[i]) / avgLength));
        f.parts[u] = { tf: tf, title: c.title[i], score: units[u].idf * (bm25 + 3 * Math.min(c.title[i], 1)) };
        f.score += f.parts[u].score;
      });
      f.matched = f.parts.filter(Boolean).length;
      if (!f.matched) return;
      f.phrase =
        f.matched === units.length &&
        words.length > 1 &&
        [page.title, page.label, page.desc, page.text].some(phrase.test, phrase);
      if (f.phrase) f.score *= 2;
      // The site's own pages come before stream items, which are mostly short and mostly about other people's projects,
      // so their few words would otherwise put a pull request about Rust above a post about Rust.
      if (page.type) f.score /= 2;
      // A page whose title is the query comes first, however much more of it others have.
      f.exact = wordsOf(page.title).join(" ") === query.join(" ");
      results.push(f);
    });
    results.sort(function (a, b) {
      return b.exact - a.exact || b.matched - a.matched || b.score - a.score;
    });

    current = {
      results: results,
      all: results.filter(function (f) {
        return f.matched === units.length;
      }).length,
      units: units,
      lookup: lookup,
    };
    showMore(LIMIT);
    selected = 0;
    if (shown.length) {
      input.setAttribute("aria-expanded", "true");
      select(0, true);
    }
    if (DEBUG) debugBox.textContent = debugQuery(units, performance.now() - started);
  }


  // Shows up to n more of the query's results, and says how many it has and how many are shown.
  function showMore(n) {
    var results = current.results;
    results.slice(shown.length, shown.length + n).forEach(showResult);
    var all = current.all;
    var some = results.length - all;
    var left = results.length - shown.length;
    function many(n) {
      return n === 1 ? "1 result" : n + " results";
    }
    status.textContent = !results.length
      ? "No results"
      : (!some ? many(all) : (all ? many(all) : "No results") + " with every word, " + some + " with some") +
        (left ? ", showing the best " + shown.length : "");
    more.hidden = !left;
    more.textContent = "Show " + Math.min(MORE, left) + " more";
  }

  // Adds a result to the list.
  function showResult(f) {
    var units = current.units;
    var lookup = current.lookup;
    var li = document.createElement("li");
    li.id = "search-result-" + shown.length;
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", "false");
    var a = document.createElement("a");
    a.href = f.page.url;
    // Focus stays in the box, which says which result is selected, so Tab can't focus another one for Enter to
    // follow.
    a.tabIndex = -1;
    var title = document.createElement("span");
    title.className = "search-title";
    highlight(title, f.page.title, 0, f.page.title.length, matches(lookup, f.page.title));
    if (f.page.label) {
      var label = document.createElement("span");
      label.className = "search-type";
      highlight(label, f.page.label, 0, f.page.label.length, matches(lookup, f.page.label));
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
    showPreview(preview, f.page, lookup, units.length);
    a.append(title, preview);
    // A result without every word says which it doesn't have, as Google does.
    if (f.matched < units.length) {
      var missing = document.createElement("span");
      missing.className = "search-missing";
      missing.append("Missing:");
      units.forEach(function (unit, u) {
        if (f.parts[u]) return;
        var s = document.createElement("s");
        s.textContent = unit.text;
        missing.append(" ", s);
      });
      a.appendChild(missing);
    }
    if (DEBUG) {
      var debug = document.createElement("span");
      debug.className = "search-debug";
      debug.textContent = debugResult(f, units);
      a.appendChild(debug);
    }
    li.appendChild(a);
    list.appendChild(li);
    shown.push(li);
  }

  // With ?debug: how long the search took, the index, and how it read the query: each unit, how many pages have it and
  // its IDF, and the words of the pages that each word of its forms found, most counted first, with how it found each
  // ("stem", "prefix", "typo", or the word itself), how much each counts, and how many pages have each.
  function debugQuery(units, ms) {
    var lines = [
      "search " + ms.toFixed(1) + " ms; index of " + pages.length + " pages and " + vocab.length + " words, built in " +
        indexTime.toFixed(0) + " ms; average length " + Math.round(avgLength),
    ];
    units.forEach(function (unit) {
      lines.push('"' + unit.text + '": in ' + unit.df + " pages, IDF " + unit.idf.toFixed(2));
      unit.forms.forEach(function (form) {
        var indent = "  ";
        if (!form.typed) {
          var alias = '  alias "' + form.words.join(" ") + '" ×' + form.weight;
          lines.push(alias + (form.phrase ? ", with its words in a row" : ""));
          indent = "    ";
        }
        form.words.forEach(function (w, j) {
          var found = Array.from(form.found[j]).map(function (e) {
            return { term: e[0], how: e[1].how, weight: e[1].weight, pages: terms.get(e[0]).length / 3 };
          });
          found.sort(function (a, b) {
            return b.weight - a.weight || b.pages - a.pages;
          });
          var listed = found.slice(0, 12).map(function (m) {
            return m.term + (m.how === "exact" ? "" : " " + m.how) + " " + m.weight + " (" + m.pages + "p)";
          });
          if (found.length > 12) listed.push("+" + (found.length - 12) + " more");
          lines.push(indent + w + " → " + (listed.join(", ") || "nothing"));
        });
      });
    });
    return lines.join("\n");
  }

  // With ?debug: a result's score, the sum of its units' BM25 scores, each from how many times the page has the unit
  // outside its title (tf) and in its title, times what applies to the page; how many units it has, which ranks it
  // before its score does; and the length BM25 weighs tf by.
  function debugResult(f, units) {
    var parts = units.map(function (unit, u) {
      var p = f.parts[u];
      var name = '"' + unit.text + '" ';
      if (!p) return name + "missing";
      return name + p.score.toFixed(2) + " (tf " + +p.tf.toFixed(2) + ", title " + +p.title.toFixed(2) + ")";
    });
    return (
      "score " + f.score.toFixed(2) + " = (" + parts.join(" + ") + ")" + (f.phrase ? " ×2 phrase" : "") +
      (f.page.type ? " ÷2 stream item" : "") + "; " + f.matched + "/" + units.length + " units; length " + f.length +
      (f.exact ? "; title is the query, so first" : "")
    );
  }

  // The part of a page's text with the most of the query words close together, or of its description if its text has
  // none of them, or the start of its description or text if neither has any.
  function showPreview(el, page, lookup, units) {
    var text = page.text;
    var found = matches(lookup, text);
    if (!found.length && page.desc) {
      text = page.desc;
      found = matches(lookup, text);
    }
    var near = PREVIEW * 0.6;
    var best = 0;
    var bestWords = 0;
    var bestCount = 0;
    var inWindow = new Array(units).fill(0);
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

  // The English (Porter2) stemmer of Snowball 3.1 (https://snowballstem.org/algorithms/english/stemmer.html), which
  // gives "compress", "compression", and "compressing" the stem "compress". w is in lowercase.
  function isV(c) {
    return "aeiouy".includes(c);
  }

  var STEM_EXCEPTIONS = new Map([
    ["skis", "ski"], ["skies", "sky"], ["idly", "idl"], ["gently", "gentl"], ["ugly", "ugli"], ["early", "earli"],
    ["only", "onli"], ["singly", "singl"], ["sky", "sky"], ["news", "news"], ["howe", "howe"], ["atlas", "atlas"],
    ["cosmos", "cosmos"], ["bias", "bias"], ["andes", "andes"],
  ]);
  // Each step's suffixes, longest first, with what replaces them.
  var STEP2 = [
    ["ational", "ate"], ["iveness", "ive"], ["fulness", "ful"], ["ousness", "ous"], ["ization", "ize"],
    ["tional", "tion"], ["biliti", "ble"], ["lessli", "less"], ["entli", "ent"], ["ation", "ate"], ["alism", "al"],
    ["aliti", "al"], ["ousli", "ous"], ["iviti", "ive"], ["fulli", "ful"], ["ogist", "og"], ["enci", "ence"],
    ["anci", "ance"], ["abli", "able"], ["izer", "ize"], ["ator", "ate"], ["alli", "al"], ["bli", "ble"], ["ogi", "og"],
    ["li", ""],
  ];
  var STEP3 = [
    ["ational", "ate"], ["tional", "tion"], ["alize", "al"], ["icate", "ic"], ["iciti", "ic"], ["ative", ""],
    ["ical", "ic"], ["ness", ""], ["ful", ""],
  ];
  var STEP4 = ["ement", "ance", "ence", "able", "ible", "ment", "ant", "ent", "ism", "ate", "iti", "ous", "ive", "ize",
    "ion", "al", "er", "ic"];

  function stem(w) {
    if (STEM_EXCEPTIONS.has(w)) return STEM_EXCEPTIONS.get(w);
    if (w.length < 3) return w;
    if (w[0] === "'") w = w.slice(1);
    // A y at the start or after a vowel is a consonant, written Y until the end.
    if (w.includes("y")) {
      var c = w.split("");
      for (var i = 0; i < c.length; i++) if (c[i] === "y" && (i === 0 || isV(c[i - 1]))) c[i] = "Y";
      w = c.join("");
    }
    var m = /^(gener|commun|arsen|past|univers|later|emerg|organ|inter)/.exec(w);
    var p1 = m ? m[0].length : region(w, 0);
    var p2 = region(w, p1);

    // Step 0 and 1a: apostrophes, then plurals.
    if (w.includes("'")) w = w.replace(/'(s'?)?$/, "");
    if (w.endsWith("sses")) w = w.slice(0, -2);
    else if (/ie[ds]$/.test(w)) w = w.slice(0, -3) + (w.length > 4 ? "i" : "ie");
    else if (w.endsWith("s") && !/[us]s$/.test(w) && /[aeiouy]/.test(w.slice(0, -2))) w = w.slice(0, -1);

    // Step 1b: -eed, -ed, -ing.
    if ((m = /eed(ly)?$/.exec(w))) {
      if (m.index >= p1 && !/^(proc|exc|succ)$/.test(w.slice(0, m.index))) w = w.slice(0, m.index) + "ee";
    } else if ((m = /(ed|edly|ing|ingly)$/.exec(w))) {
      var before = w.slice(0, m.index);
      if (m[1] === "ing" && /^[^aeiouy]y$/.test(before)) w = before[0] + "ie";
      else if (m[1] === "ing" && /^(inn|out|cann|herr|earr|even)$/.test(before)) {
      } else if (/[aeiouy]/.test(before)) {
        w = before;
        if (/(at|bl|iz)$/.test(w)) w += "e";
        else if (/(bb|dd|ff|gg|mm|nn|pp|rr|tt)$/.test(w)) {
          if (!(w.length === 3 && "aeo".includes(w[0]))) w = w.slice(0, -1);
        } else if (w.length === p1 && shortv(w)) w += "e";
      }
    }

    // Step 1c
    if (/[yY]$/.test(w) && w.length > 2 && !isV(w[w.length - 2])) w = w.slice(0, -1) + "i";

    // Steps 2 and 3: suffixes in R1.
    var s = STEP2.find(function (s) { return w.endsWith(s[0]); });
    if (s && w.length - s[0].length >= p1) {
      var at = w.length - s[0].length;
      if (s[0] === "ogi" ? w[at - 1] === "l" : s[0] === "li" ? "cdeghkmnrt".includes(w[at - 1]) : true) {
        w = w.slice(0, at) + s[1];
      }
    }
    s = STEP3.find(function (s) { return w.endsWith(s[0]); });
    if (s && w.length - s[0].length >= (s[0] === "ative" ? p2 : p1)) w = w.slice(0, -s[0].length) + s[1];

    // Step 4: suffixes in R2.
    s = STEP4.find(function (s) { return w.endsWith(s); });
    if (s && w.length - s.length >= p2 && (s !== "ion" || /[st]ion$/.test(w))) w = w.slice(0, -s.length);

    // Step 5
    if (w.endsWith("e")) {
      var e = w.length - 1;
      if (e >= p2 || (e >= p1 && !shortv(w.slice(0, -1)))) w = w.slice(0, -1);
    } else if (w.endsWith("ll") && w.length - 1 >= p2) {
      w = w.slice(0, -1);
    }
    return w.includes("Y") ? w.replace(/Y/g, "y") : w;
  }

  // Where R1 or R2 starts: after the first non-vowel that follows a vowel, from "from" on.
  function region(w, from) {
    for (var i = from + 1; i < w.length; i++) if (!isV(w[i]) && isV(w[i - 1])) return i + 1;
    return w.length;
  }

  // Whether w ends in a short syllable.
  function shortv(w) {
    var n = w.length;
    return (
      (n >= 3 && !"aeiouywxY".includes(w[n - 1]) && isV(w[n - 2]) && !isV(w[n - 3])) ||
      (n === 2 && !isV(w[1]) && isV(w[0])) ||
      w.endsWith("past")
    );
  }
})();
