// beautified census app.js

! function(e) {
    function n(n) {
        for (var r, i, s = n[0], l = n[1], c = n[2], d = 0, p = []; d < s.length; d++) i = s[d], Object.prototype.hasOwnProperty.call(a, i) && a[i] && p.push(a[i][0]), a[i] = 0;
        for (r in l) Object.prototype.hasOwnProperty.call(l, r) && (e[r] = l[r]);
        for (u && u(n); p.length;) p.shift()();
        return o.push.apply(o, c || []), t()
    }

    function t() {
        for (var e, n = 0; n < o.length; n++) {
            for (var t = o[n], r = !0, s = 1; s < t.length; s++) {
                var l = t[s];
                0 !== a[l] && (r = !1)
            }
            r && (o.splice(n--, 1), e = i(i.s = t[0]))
        }
        return e
    }
    var r = {},
        a = {
            4: 0
        },
        o = [];

    function i(n) {
        if (r[n]) return r[n].exports;
        var t = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(t.exports, t, t.exports, i), t.l = !0, t.exports
    }
    i.e = function(e) {
        var n = [],
            t = a[e];
        if (0 !== t)
            if (t) n.push(t[2]);
            else {
                var r = new Promise(function(n, r) {
                    t = a[e] = [n, r]
                });
                n.push(t[2] = r);
                var o, s = document.createElement("script");
                s.charset = "utf-8", s.timeout = 120, i.nc && s.setAttribute("nonce", i.nc), s.src = function(e) {
                    return i.p + "js/" + ({
                        3: "pdf-make"
                    } [e] || e) + ".js"
                }(e);
                var l = new Error;
                o = function(n) {
                    s.onerror = s.onload = null, clearTimeout(c);
                    var t = a[e];
                    if (0 !== t) {
                        if (t) {
                            var r = n && ("load" === n.type ? "missing" : n.type),
                                o = n && n.target && n.target.src;
                            l.message = "Loading chunk " + e + " failed.\n(" + r + ": " + o + ")", l.name = "ChunkLoadError", l.type = r, l.request = o, t[1](l)
                        }
                        a[e] = void 0
                    }
                };
                var c = setTimeout(function() {
                    o({
                        type: "timeout",
                        target: s
                    })
                }, 12e4);
                s.onerror = s.onload = o, document.head.appendChild(s)
            } return Promise.all(n)
    }, i.m = e, i.c = r, i.d = function(e, n, t) {
        i.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: t
        })
    }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, i.t = function(e, n) {
        if (1 & n && (e = i(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var t = Object.create(null);
        if (i.r(t), Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var r in e) i.d(t, r, function(n) {
                return e[n]
            }.bind(null, r));
        return t
    }, i.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return i.d(n, "a", n), n
    }, i.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, i.p = "/static/", i.oe = function(e) {
        throw console.error(e), e
    };
    var s = window.webpackJsonp = window.webpackJsonp || [],
        l = s.push.bind(s);
    s.push = n, s = s.slice();
    for (var c = 0; c < s.length; c++) n(s[c]);
    var u = l;
    o.push([577, 1, 0, 2]), t()
}([function(e, n, t) {
    "use strict";
    (function(e) {
        t.d(n, "M", function() {
            return i
        }), t.d(n, "x", function() {
            return l
        }), t.d(n, "Q", function() {
            return c
        }), t.d(n, "w", function() {
            return u
        }), t.d(n, "r", function() {
            return d
        }), t.d(n, "q", function() {
            return p
        }), t.d(n, "y", function() {
            return _
        }), t.d(n, "E", function() {
            return f
        }), t.d(n, "n", function() {
            return h
        }), t.d(n, "A", function() {
            return m
        }), t.d(n, "z", function() {
            return g
        }), t.d(n, "b", function() {
            return v
        }), t.d(n, "L", function() {
            return E
        }), t.d(n, "d", function() {
            return T
        }), t.d(n, "K", function() {
            return R
        }), t.d(n, "c", function() {
            return b
        }), t.d(n, "p", function() {
            return P
        }), t.d(n, "o", function() {
            return A
        }), t.d(n, "D", function() {
            return S
        }), t.d(n, "f", function() {
            return N
        }), t.d(n, "H", function() {
            return D
        }), t.d(n, "F", function() {
            return I
        }), t.d(n, "I", function() {
            return O
        }), t.d(n, "s", function() {
            return y
        }), t.d(n, "t", function() {
            return C
        }), t.d(n, "C", function() {
            return x
        }), t.d(n, "B", function() {
            return L
        }), t.d(n, "U", function() {
            return w
        }), t.d(n, "e", function() {
            return H
        }), t.d(n, "g", function() {
            return M
        }), t.d(n, "T", function() {
            return X
        }), t.d(n, "v", function() {
            return j
        }), t.d(n, "J", function() {
            return $
        }), t.d(n, "R", function() {
            return U
        }), t.d(n, "S", function() {
            return F
        }), t.d(n, "u", function() {
            return k
        }), t.d(n, "l", function() {
            return q
        }), t.d(n, "k", function() {
            return V
        }), t.d(n, "j", function() {
            return Y
        }), t.d(n, "G", function() {
            return B
        }), t.d(n, "i", function() {
            return z
        }), t.d(n, "h", function() {
            return Z
        }), t.d(n, "P", function() {
            return W
        }), t.d(n, "m", function() {
            return G
        }), t.d(n, "a", function() {
            return Q
        }), t.d(n, "N", function() {
            return J
        }), t.d(n, "O", function() {
            return ee
        });
        var r = t(1),
            a = t(3),
            o = t(4),
            i = "object" == typeof self && self.self === self && self || "object" == typeof e && e.global === e && e || void 0,
            s = i.angular || {},
            l = s.fromJson || JSON.parse.bind(JSON),
            c = s.toJson || JSON.stringify.bind(JSON),
            u = s.forEach || function(e, n, t) {
                if (Object(r.a)(e)) return e.forEach(n, t);
                Object.keys(e).forEach(function(t) {
                    return n(e[t], t)
                })
            },
            d = Object.assign || Q,
            p = s.equals || K;

        function _(e) {
            return e
        }

        function f() {}

        function h(e, n, t, r, a) {
            void 0 === a && (a = !1);
            var o = function(n) {
                return e()[n].bind(t())
            };
            return (r = r || Object.keys(e())).reduce(function(e, t) {
                var r;
                return e[t] = a ? (r = t, function() {
                    return n[r] = o(r), n[r].apply(null, arguments)
                }) : o(t), e
            }, n)
        }
        var m = function(e, n) {
                return d(Object.create(e), n)
            },
            g = Object(a.e)(v);

        function v(e, n) {
            return -1 !== e.indexOf(n)
        }
        var E = Object(a.e)(T);

        function T(e, n) {
            var t = e.indexOf(n);
            return t >= 0 && e.splice(t, 1), e
        }
        var R = Object(a.e)(b);

        function b(e, n) {
            return e.push(n), n
        }
        var P = function(e) {
            return e.slice().forEach(function(n) {
                "function" == typeof n && n(), E(e, n)
            })
        };

        function A(e) {
            for (var n = [], t = 1; t < arguments.length; t++) n[t - 1] = arguments[t];
            var r = d.apply(void 0, [{}].concat(n.reverse()));
            return d(r, D(e || {}, Object.keys(r)))
        }
        var S = function(e, n) {
            return d(e, n)
        };

        function N(e, n) {
            var t = [];
            for (var r in e.path) {
                if (e.path[r] !== n.path[r]) break;
                t.push(e.path[r])
            }
            return t
        }

        function D(e, n) {
            var t = {};
            for (var r in e) - 1 !== n.indexOf(r) && (t[r] = e[r]);
            return t
        }

        function I(e, n) {
            return Object.keys(e).filter(Object(a.i)(g(n))).reduce(function(n, t) {
                return n[t] = e[t], n
            }, {})
        }

        function O(e, n) {
            return L(e, Object(a.n)(n))
        }

        function y(e, n) {
            var t = Object(r.a)(e),
                a = t ? [] : {},
                o = t ? function(e) {
                    return a.push(e)
                } : function(e, n) {
                    return a[n] = e
                };
            return u(e, function(e, t) {
                n(e, t) && o(e, t)
            }), a
        }

        function C(e, n) {
            var t;
            return u(e, function(e, r) {
                t || n(e, r) && (t = e)
            }), t
        }
        var x = L;

        function L(e, n, t) {
            return t = t || (Object(r.a)(e) ? [] : {}), u(e, function(e, r) {
                return t[r] = n(e, r)
            }), t
        }
        var w = function(e) {
                return Object.keys(e).map(function(n) {
                    return e[n]
                })
            },
            H = function(e, n) {
                return e && n
            },
            M = function(e, n) {
                return e || n
            },
            X = function(e, n) {
                return e.concat(n)
            },
            j = function(e, n) {
                return Object(r.a)(n) ? e.concat(n.reduce(j, [])) : $(e, n)
            };

        function $(e, n) {
            return e.push(n), e
        }
        var U = function(e, n) {
                return g(e, n) ? e : $(e, n)
            },
            F = function(e) {
                return e.reduce(X, [])
            },
            k = function(e) {
                return e.reduce(j, [])
            },
            q = Y,
            V = Y;

        function Y(e, n) {
            return void 0 === n && (n = "assert failure"),
                function(t) {
                    var a = e(t);
                    if (!a) throw new Error(Object(r.d)(n) ? n(t) : n);
                    return a
                }
        }
        var B = function(e) {
            return Object.keys(e).map(function(n) {
                return [n, e[n]]
            })
        };

        function z() {
            for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
            if (0 === e.length) return [];
            for (var t = e.reduce(function(e, n) {
                    return Math.min(n.length, e)
                }, 9007199254740991), r = [], a = function(n) {
                    switch (e.length) {
                        case 1:
                            r.push([e[0][n]]);
                            break;
                        case 2:
                            r.push([e[0][n], e[1][n]]);
                            break;
                        case 3:
                            r.push([e[0][n], e[1][n], e[2][n]]);
                            break;
                        case 4:
                            r.push([e[0][n], e[1][n], e[2][n], e[3][n]]);
                            break;
                        default:
                            r.push(e.map(function(e) {
                                return e[n]
                            }))
                    }
                }, o = 0; o < t; o++) a(o);
            return r
        }

        function Z(e, n) {
            var t, a;
            if (Object(r.a)(n) && (t = n[0], a = n[1]), !Object(r.l)(t)) throw new Error("invalid parameters to applyPairs");
            return e[t] = a, e
        }

        function W(e) {
            return e.length && e[e.length - 1] || void 0
        }

        function G(e, n) {
            return n && Object.keys(n).forEach(function(e) {
                return delete n[e]
            }), n || (n = {}), d(n, e)
        }

        function Q(e) {
            for (var n = 1; n < arguments.length; n++) {
                var t = arguments[n];
                if (t)
                    for (var r = Object.keys(t), a = 0; a < r.length; a++) e[r[a]] = t[r[a]]
            }
            return e
        }

        function K(e, n) {
            if (e === n) return !0;
            if (null === e || null === n) return !1;
            if (e != e && n != n) return !0;
            var t = typeof e;
            if (t !== typeof n || "object" !== t) return !1;
            var o, i, s = [e, n];
            if (Object(a.a)(r.a)(s)) return i = n, (o = e).length === i.length && z(o, i).reduce(function(e, n) {
                return e && K(n[0], n[1])
            }, !0);
            if (Object(a.a)(r.b)(s)) return e.getTime() === n.getTime();
            if (Object(a.a)(r.k)(s)) return e.toString() === n.toString();
            if (Object(a.a)(r.d)(s)) return !0;
            if ([r.d, r.a, r.b, r.k].map(a.c).reduce(function(e, n) {
                    return e || !!n(s)
                }, !1)) return !1;
            var l = {};
            for (var c in e) {
                if (!K(e[c], n[c])) return !1;
                l[c] = !0
            }
            for (var c in n)
                if (!l[c]) return !1;
            return !0
        }
        var J = function(e) {
                return e.catch(function(e) {
                    return 0
                }) && e
            },
            ee = function(e) {
                return J(o.b.$q.reject(e))
            }
    }).call(this, t(61))
}, function(e, n, t) {
    "use strict";
    t.d(n, "m", function() {
        return i
    }), t.d(n, "c", function() {
        return s
    }), t.d(n, "f", function() {
        return l
    }), t.d(n, "g", function() {
        return c
    }), t.d(n, "d", function() {
        return u
    }), t.d(n, "h", function() {
        return d
    }), t.d(n, "l", function() {
        return p
    }), t.d(n, "i", function() {
        return _
    }), t.d(n, "a", function() {
        return f
    }), t.d(n, "b", function() {
        return h
    }), t.d(n, "k", function() {
        return m
    }), t.d(n, "e", function() {
        return g
    }), t.d(n, "j", function() {
        return v
    });
    var r = t(3),
        a = Object.prototype.toString,
        o = function(e) {
            return function(n) {
                return typeof n === e
            }
        },
        i = o("undefined"),
        s = Object(r.i)(i),
        l = function(e) {
            return null === e
        },
        c = Object(r.j)(l, i),
        u = o("function"),
        d = o("number"),
        p = o("string"),
        _ = function(e) {
            return null !== e && "object" == typeof e
        },
        f = Array.isArray,
        h = function(e) {
            return "[object Date]" === a.call(e)
        },
        m = function(e) {
            return "[object RegExp]" === a.call(e)
        };

    function g(e) {
        if (f(e) && e.length) {
            var n = e.slice(0, -1),
                t = e.slice(-1);
            return !(n.filter(Object(r.i)(p)).length || t.filter(Object(r.i)(u)).length)
        }
        return u(e)
    }
    var v = Object(r.b)(_, Object(r.m)(Object(r.n)("then"), u))
}, , function(e, n, t) {
    "use strict";

    function r(e) {
        var n = [].slice.apply(arguments, [1]),
            t = e.length;
        return function n(r) {
            return r.length >= t ? e.apply(null, r) : function() {
                return n(r.concat([].slice.apply(arguments)))
            }
        }(n)
    }

    function a() {
        var e = arguments,
            n = e.length - 1;
        return function() {
            for (var t = n, r = e[n].apply(this, arguments); t--;) r = e[t].call(this, r);
            return r
        }
    }

    function o() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        return a.apply(null, [].slice.call(arguments).reverse())
    }
    t.d(n, "e", function() {
        return r
    }), t.d(n, "d", function() {
        return a
    }), t.d(n, "m", function() {
        return o
    }), t.d(n, "n", function() {
        return i
    }), t.d(n, "o", function() {
        return s
    }), t.d(n, "k", function() {
        return l
    }), t.d(n, "i", function() {
        return c
    }), t.d(n, "b", function() {
        return u
    }), t.d(n, "j", function() {
        return d
    }), t.d(n, "a", function() {
        return p
    }), t.d(n, "c", function() {
        return _
    }), t.d(n, "h", function() {
        return f
    }), t.d(n, "f", function() {
        return h
    }), t.d(n, "p", function() {
        return m
    }), t.d(n, "g", function() {
        return g
    }), t.d(n, "l", function() {
        return v
    });
    var i = function(e) {
            return function(n) {
                return n && n[e]
            }
        },
        s = r(function(e, n, t) {
            return t && t[e] === n
        }),
        l = function(e) {
            return o.apply(null, e.split(".").map(i))
        },
        c = function(e) {
            return function() {
                for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
                return !e.apply(null, n)
            }
        };

    function u(e, n) {
        return function() {
            for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
            return e.apply(null, t) && n.apply(null, t)
        }
    }

    function d(e, n) {
        return function() {
            for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
            return e.apply(null, t) || n.apply(null, t)
        }
    }
    var p = function(e) {
            return function(n) {
                return n.reduce(function(n, t) {
                    return n && !!e(t)
                }, !0)
            }
        },
        _ = function(e) {
            return function(n) {
                return n.reduce(function(n, t) {
                    return n || !!e(t)
                }, !1)
            }
        },
        f = function(e) {
            return function(n) {
                return null != n && n.constructor === e || n instanceof e
            }
        },
        h = function(e) {
            return function(n) {
                return e === n
            }
        },
        m = function(e) {
            return function() {
                return e
            }
        };

    function g(e, n) {
        return function(t) {
            return t[e].apply(t, n)
        }
    }

    function v(e) {
        return function(n) {
            for (var t = 0; t < e.length; t++)
                if (e[t][0](n)) return e[t][1](n)
        }
    }
}, function(e, n, t) {
    "use strict";
    t.d(n, "a", function() {
        return r
    }), t.d(n, "b", function() {
        return a
    });
    var r = function(e) {
            return function() {
                throw new Error(e + "(): No coreservices implementation for UI-Router is loaded.")
            }
        },
        a = {
            $q: void 0,
            $injector: void 0
        }
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, n, t) {
    var r = t(638),
        a = t(659),
        o = t(99),
        i = t(15),
        s = t(663);
    e.exports = function(e) {
        return "function" == typeof e ? e : null == e ? o : "object" == typeof e ? i(e) ? a(e[0], e[1]) : r(e) : s(e)
    }
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, n, t) {
    var r = t(699),
        a = t(700)(r);
    e.exports = a
}, function(e, n, t) {
    var r = t(704),
        a = t(156),
        o = t(219),
        i = t(15);
    e.exports = function(e, n) {
        return (i(e) ? r : a)(e, o(n))
    }
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, n) {
    e.exports = '<div class="modal-header">\n  <button title="Close" name="Close dialog" type="button" class="close" ng-click="no()">&times;</button>\n  <h4 class="modal-title"><span class="glyphicon glyphicon-map-marker"></span><span translate="intro.standardizeaddress.heading"></span></h4>\n</div>\n<div class="modal-body">\n  <div ng-show="error" translate="intro.standardizeaddress.error"></div>\n  <div ng-show="loading">\n    <div class="text-center h3" translate="intro.standardizeaddress.loading"></div>\n    <loading></loading>\n  </div>\n  <div ng-hide="loading || error">\n    <h4 translate="intro.standardizeaddress.subheading"></h4>\n    <div translate="intro.standardizeaddress.instructions"></div>\n    <div class="formatted-address" ng-bind-html="formattedAddress"></div>\n    <div translate="intro.standardizeaddress.question"></div>\n    <help title="\'Help\'" content="\'intro/standardize_address.help.partial.html\'"></help>\n  </div>\n</div>\n<div class="modal-footer">\n  <button title="Yes" name="yes" type="button" class="btn btn-primary" ng-click="yes()" translate="dialogs.DIALOGS_YES"></button>\n  <button title="No" name="no" type="button" class="btn btn-default" ng-click="no()" translate="dialogs.DIALOGS_NO"></button>\n</div>\n'
}, function(e, n, t) {
    var r = t(640),
        a = t(38);
    e.exports = function e(n, t, o, i, s) {
        return n === t || (null == n || null == t || !a(n) && !a(t) ? n != n && t != t : r(n, t, o, i, e, s))
    }
}, function(e, n, t) {
    var r = t(641),
        a = t(644),
        o = t(645),
        i = 1,
        s = 2;
    e.exports = function(e, n, t, l, c, u) {
        var d = t & i,
            p = e.length,
            _ = n.length;
        if (p != _ && !(d && _ > p)) return !1;
        var f = u.get(e);
        if (f && u.get(n)) return f == n;
        var h = -1,
            m = !0,
            g = t & s ? new r : void 0;
        for (u.set(e, n), u.set(n, e); ++h < p;) {
            var v = e[h],
                E = n[h];
            if (l) var T = d ? l(E, v, h, n, e, u) : l(v, E, h, e, n, u);
            if (void 0 !== T) {
                if (T) continue;
                m = !1;
                break
            }
            if (g) {
                if (!a(n, function(e, n) {
                        if (!o(g, n) && (v === e || c(v, e, t, l, u))) return g.push(n)
                    })) {
                    m = !1;
                    break
                }
            } else if (v !== E && !c(v, E, t, l, u)) {
                m = !1;
                break
            }
        }
        return u.delete(e), u.delete(n), m
    }
}, function(e, n) {
    e.exports = function(e, n) {
        for (var t = -1, r = null == e ? 0 : e.length, a = 0, o = []; ++t < r;) {
            var i = e[t];
            n(i, t, e) && (o[a++] = i)
        }
        return o
    }
}, function(e, n, t) {
    var r = t(654),
        a = t(141),
        o = t(655),
        i = t(656),
        s = t(657),
        l = t(43),
        c = t(195),
        u = c(r),
        d = c(a),
        p = c(o),
        _ = c(i),
        f = c(s),
        h = l;
    (r && "[object DataView]" != h(new r(new ArrayBuffer(1))) || a && "[object Map]" != h(new a) || o && "[object Promise]" != h(o.resolve()) || i && "[object Set]" != h(new i) || s && "[object WeakMap]" != h(new s)) && (h = function(e) {
        var n = l(e),
            t = "[object Object]" == n ? e.constructor : void 0,
            r = t ? c(t) : "";
        if (r) switch (r) {
            case u:
                return "[object DataView]";
            case d:
                return "[object Map]";
            case p:
                return "[object Promise]";
            case _:
                return "[object Set]";
            case f:
                return "[object WeakMap]"
        }
        return n
    }), e.exports = h
}, function(e, n, t) {
    var r = t(30);
    e.exports = function(e) {
        return e == e && !r(e)
    }
}, function(e, n) {
    e.exports = function(e, n) {
        return function(t) {
            return null != t && t[e] === n && (void 0 !== n || e in Object(t))
        }
    }
}, function(e, n, t) {
    var r = t(99);
    e.exports = function(e) {
        return "function" == typeof e ? e : r
    }
}, function(e, n, t) {
    var r = t(144),
        a = t(71),
        o = t(698),
        i = t(15);
    e.exports = function(e, n) {
        return (i(e) ? r : o)(e, a(n, 3))
    }
}, function(e, n, t) {
    var r = t(215),
        a = t(701),
        o = t(71),
        i = t(15);
    e.exports = function(e, n) {
        return (i(e) ? r : a)(e, o(n, 3))
    }
}, function(e, n, t) {
    var r = t(705);
    e.exports = function(e, n, t) {
        return null == e ? e : r(e, n, t)
    }
}, function(e, n, t) {
    var r = t(211),
        a = t(216),
        o = t(68),
        i = t(15),
        s = t(39),
        l = t(97),
        c = t(96),
        u = t(98),
        d = "[object Map]",
        p = "[object Set]",
        _ = Object.prototype.hasOwnProperty;
    e.exports = function(e) {
        if (null == e) return !0;
        if (s(e) && (i(e) || "string" == typeof e || "function" == typeof e.splice || l(e) || u(e) || o(e))) return !e.length;
        var n = a(e);
        if (n == d || n == p) return !e.size;
        if (c(e)) return !r(e).length;
        for (var t in e)
            if (_.call(e, t)) return !1;
        return !0
    }
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, n, t) {
    t(100), e.exports = t(578)
}, function(e, n, t) {
    "use strict";
    var r = o(t(59));
    t(65), t(579), t(127), t(129), t(130), t(131), t(87), t(132), t(133), t(134), t(135), t(136), t(152), t(153), t(154);
    var a = o(t(137));

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function i(e, n, a) {
        e.put("dialogs/customconfirm.html", t(724)), e.put("heartbeat.html", t(725)), e.put("dialogs/customnotify.html", t(726)), e.put("intro/standardize-address.html", t(212)), e.put("help.html", t(155)), n.onStart({}, function(e) {
            if ("init" === e.to().name && "intro.page" === e.from().name) return !1
        }), n.onSuccess({}, function(e) {
            document.body.scrollTop = 0, document.documentElement.scrollTop = 0, a.pushStateHistory(e.from().name, e.params("from")), "url" === e._options.source && null === e._options.relative && a.stateHistory.length > 3 && a.gotoPreviousState()
        }), setTimeout(function() {
            (0, r.default)(".hide-on-start").addClass("animated fadeIn faster").removeClass("hide-on-start")
        }, 200)
    }
    angular.module("app", ["shared", "ui.router", "ngAnimate", "ngSanitize", "ngAria", "pascalprecht.translate", "ui.bootstrap", "dialogs.main"]), angular.module("app").constant("configConstants", {
        context: "app",
        refdate: (0, a.default)("2020-04-01"),
        year: "2020",
        heartbeatCycleLength: 78e4,
        heartbeatWarningLength: 12e4
    }).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$translateProvider", "$httpProvider", "$translatePartialLoaderProvider", "$compileProvider", "$cookiesProvider", "dialogsProvider", "paradataProvider", function(e, n, r, a, o, i, s, l, c, u) {
        e.state("init", {
            url: "/",
            template: "",
            controller: "InitCtrl",
            resolve: {
                centurionStorageData: ["centurionStorageService", function(e) {
                    return e.getData()
                }]
            }
        }).state("intro", {
            url: "/intro",
            template: "<ui-view/>",
            controller: "IntroCtrl",
            resolve: {
                centurionStorageData: ["centurionStorageService", function(e) {
                    return e.getData()
                }]
            }
        }).state("intro.page", {
            url: "/:page",
            template: function(e) {
                return t(580)("./" + e.page + ".html")
            },
            controller: "IntroCtrl"
        }).state("dashboard", {
            url: "/dashboard",
            template: t(609),
            controller: "DashboardCtrl",
            resolve: {
                centurionStorageData: ["centurionStorageService", function(e) {
                    return e.getData()
                }]
            }
        }).state("household", {
            url: "/household",
            abstract: !0,
            template: "<ui-view/>"
        }).state("household.page", {
            url: "/:page",
            template: function(e) {
                return t(610)("./" + e.page + ".html")
            },
            controller: "HouseholdCtrl"
        }).state("person", {
            url: "/person",
            abstract: !0,
            template: "<ui-view/>"
        }).state("person.page", {
            url: "/:page",
            template: function(e) {
                return t(616)("./" + e.page + ".html")
            },
            controller: "PersonCtrl"
        }).state("closeout", {
            url: "/closeout",
            abstract: !0,
            template: "<ui-view/>"
        }).state("closeout.page", {
            url: "/:page",
            template: function(e) {
                return t(624)("./" + e.page + ".html")
            },
            controller: "CloseoutCtrl"
        }).state("confirmation", {
            url: "/confirmation/:CONFIRMATION_NUMBER",
            template: t(630),
            controller: "ConfirmationCtrl"
        }).state("nocomplete", {
            url: "/nocomplete",
            template: t(631),
            controller: "GoodbyeCtrl"
        }).state("goodbye", {
            url: "/goodbye",
            template: t(632),
            controller: "GoodbyeCtrl"
        }), n.otherwise("/"), l.defaults.path = "/", c.useBackdrop(), c.useAnimation(), a.directivePriority(1), a.useCookieStorage(), i.addPart("app"), a.useLoader("$translatePartialLoader", {
            urlTemplate: "/static/content/{part}/{lang}.json"
        }), a.useSanitizeValueStrategy("sanitizeParameters"), a.preferredLanguage("en"), a.useMessageFormatInterpolation(), r.html5Mode(!(!window.history || !history.pushState)), o.interceptors.push("GlobalHTTPInterceptor"), u.useCentStore(), u.useUiRouter(), s.debugInfoEnabled(!1)
    }]), angular.module("app").controller("InitCtrl", t(633)).controller("IntroCtrl", t(634)).controller("CloseoutCtrl", t(635)).controller("ConfirmationCtrl", t(667)).controller("GoodbyeCtrl", t(668)).controller("DashboardCtrl", t(669)).controller("customConfirmCtrl", t(670)).controller("customNotifyCtrl", t(671)).controller("HeartbeatCtrl", t(672)).controller("HouseholdCtrl", t(673)).controller("PersonCtrl", t(674)).controller("ViewWatchCtrl", t(675)).directive("breadcrumb", t(676)).directive("generatepdf", t(678)).directive("finalQuestions", t(680)).directive("formbuttons", t(682)).directive("submitsurvey", t(684)).directive("dateselect", t(686)).directive("addperson", t(688)).directive("person", t(690)).directive("progressBar", t(692)).directive("alert", t(694)).directive("alert", t(695)).factory("closeoutService", t(696)).factory("heartbeatService", t(702)).factory("householdService", t(703)).factory("personService", t(706)).factory("addressService", t(707)).factory("centurionStorageService", t(708)).factory("GlobalHTTPInterceptor", t(709)).factory("rosterService", t(710)).factory("introService", t(716)).factory("stateSpyService", t(717)).service("formDispatcher", t(718)).service("states", t(720)).service("geocoder", t(721)).service("addressStandardizer", t(722)).service("rtnpCaller", t(723)).run(i), i.$inject = ["$templateCache", "$transitions", "stateSpyService", "heartbeatService"]
}, function(e, n, t) {
    /**
     * State-based routing for AngularJS 1.x
     * This bundle requires the ui-router-core.js bundle from the @uirouter/core package.
     * @version v1.0.19
     * @link https://ui-router.github.io
     * @license MIT License, http://www.opensource.org/licenses/MIT
     */
    ! function(e, n, t) {
        "use strict";
        var r = angular,
            a = n && n.module ? n : r;

        function o() {
            var e = null;
            return function(n, r) {
                return e = e || t.services.$injector.get("$templateFactory"), [new c(n, r, e)]
            }
        }
        var i = function(e, n) {
            return e.reduce(function(e, r) {
                return e || t.isDefined(n[r])
            }, !1)
        };

        function s(e) {
            if (!e.parent) return {};
            var n = ["component", "bindings", "componentProvider"],
                r = ["templateProvider", "templateUrl", "template", "notify", "async"].concat(["controller", "controllerProvider", "controllerAs", "resolveAs"]),
                a = n.concat(r);
            if (t.isDefined(e.views) && i(a, e)) throw new Error("State '" + e.name + "' has a 'views' object. It cannot also have \"view properties\" at the state level.  Move the following properties into a view (in the 'views' object):  " + a.filter(function(n) {
                return t.isDefined(e[n])
            }).join(", "));
            var o = {},
                s = e.views || {
                    $default: t.pick(e, a)
                };
            return t.forEach(s, function(a, s) {
                if (s = s || "$default", t.isString(a) && (a = {
                        component: a
                    }), a = t.extend({}, a), i(n, a) && i(r, a)) throw new Error("Cannot combine: " + n.join("|") + " with: " + r.join("|") + " in stateview: '" + s + "@" + e.name + "'");
                a.resolveAs = a.resolveAs || "$resolve", a.$type = "ng1", a.$context = e, a.$name = s;
                var l = t.ViewService.normalizeUIViewTarget(a.$context, a.$name);
                a.$uiViewName = l.uiViewName, a.$uiViewContextAnchor = l.uiViewContextAnchor, o[s] = a
            }), o
        }
        var l = 0,
            c = function() {
                function e(e, n, t) {
                    var r = this;
                    this.path = e, this.viewDecl = n, this.factory = t, this.$id = l++, this.loaded = !1, this.getTemplate = function(e, n) {
                        return r.component ? r.factory.makeComponentTemplate(e, n, r.component, r.viewDecl.bindings) : r.template
                    }
                }
                return e.prototype.load = function() {
                    var e = this,
                        n = t.services.$q,
                        r = new t.ResolveContext(this.path),
                        a = this.path.reduce(function(e, n) {
                            return t.extend(e, n.paramValues)
                        }, {}),
                        o = {
                            template: n.when(this.factory.fromConfig(this.viewDecl, a, r)),
                            controller: n.when(this.getController(r))
                        };
                    return n.all(o).then(function(n) {
                        return t.trace.traceViewServiceEvent("Loaded", e), e.controller = n.controller, t.extend(e, n.template), e
                    })
                }, e.prototype.getController = function(e) {
                    var n = this.viewDecl.controllerProvider;
                    if (!t.isInjectable(n)) return this.viewDecl.controller;
                    var r = t.services.$injector.annotate(n),
                        a = t.isArray(n) ? t.tail(n) : n,
                        o = new t.Resolvable("", a, r);
                    return o.get(e)
                }, e
            }(),
            u = function() {
                function e() {
                    var e = this;
                    this._useHttp = a.version.minor < 3, this.$get = ["$http", "$templateCache", "$injector", function(n, t, r) {
                        return e.$templateRequest = r.has && r.has("$templateRequest") && r.get("$templateRequest"), e.$http = n, e.$templateCache = t, e
                    }]
                }
                return e.prototype.useHttpService = function(e) {
                    this._useHttp = e
                }, e.prototype.fromConfig = function(e, n, r) {
                    var a = function(e) {
                            return t.services.$q.when(e).then(function(e) {
                                return {
                                    template: e
                                }
                            })
                        },
                        o = function(e) {
                            return t.services.$q.when(e).then(function(e) {
                                return {
                                    component: e
                                }
                            })
                        };
                    return t.isDefined(e.template) ? a(this.fromString(e.template, n)) : t.isDefined(e.templateUrl) ? a(this.fromUrl(e.templateUrl, n)) : t.isDefined(e.templateProvider) ? a(this.fromProvider(e.templateProvider, n, r)) : t.isDefined(e.component) ? o(e.component) : t.isDefined(e.componentProvider) ? o(this.fromComponentProvider(e.componentProvider, n, r)) : a("<ui-view></ui-view>")
                }, e.prototype.fromString = function(e, n) {
                    return t.isFunction(e) ? e(n) : e
                }, e.prototype.fromUrl = function(e, n) {
                    return t.isFunction(e) && (e = e(n)), null == e ? null : this._useHttp ? this.$http.get(e, {
                        cache: this.$templateCache,
                        headers: {
                            Accept: "text/html"
                        }
                    }).then(function(e) {
                        return e.data
                    }) : this.$templateRequest(e)
                }, e.prototype.fromProvider = function(e, n, r) {
                    var a = t.services.$injector.annotate(e),
                        o = t.isArray(e) ? t.tail(e) : e,
                        i = new t.Resolvable("", o, a);
                    return i.get(r)
                }, e.prototype.fromComponentProvider = function(e, n, r) {
                    var a = t.services.$injector.annotate(e),
                        o = t.isArray(e) ? t.tail(e) : e,
                        i = new t.Resolvable("", o, a);
                    return i.get(r)
                }, e.prototype.makeComponentTemplate = function(e, n, r, o) {
                    o = o || {};
                    var i = a.version.minor >= 3 ? "::" : "",
                        s = function(e) {
                            var n = t.kebobString(e);
                            return /^(x|data)-/.exec(n) ? "x-" + n : n
                        },
                        l = function(e) {
                            var n = t.services.$injector.get(e + "Directive");
                            if (!n || !n.length) throw new Error("Unable to find component named '" + e + "'");
                            return n.map(d).reduce(t.unnestR, [])
                        }(r).map(function(r) {
                            var a = r.name,
                                l = r.type,
                                c = s(a);
                            if (e.attr(c) && !o[a]) return c + "='" + e.attr(c) + "'";
                            var u = o[a] || a;
                            if ("@" === l) return c + "='{{" + i + "$resolve." + u + "}}'";
                            if ("&" === l) {
                                var d = n.getResolvable(u),
                                    p = d && d.data,
                                    _ = p && t.services.$injector.annotate(p) || [],
                                    f = t.isArray(p) ? "[" + (p.length - 1) + "]" : "";
                                return c + "='$resolve." + u + f + "(" + _.join(",") + ")'"
                            }
                            return c + "='" + i + "$resolve." + u + "'"
                        }).join(" "),
                        c = s(r);
                    return "<" + c + " " + l + "></" + c + ">"
                }, e
            }(),
            d = function(e) {
                return t.isObject(e.bindToController) ? p(e.bindToController) : p(e.scope)
            },
            p = function(e) {
                return Object.keys(e || {}).map(function(n) {
                    return [n, /^([=<@&])[?]?(.*)/.exec(e[n])]
                }).filter(function(e) {
                    return t.isDefined(e) && t.isArray(e[1])
                }).map(function(e) {
                    return {
                        name: e[1][2] || e[0],
                        type: e[1][1]
                    }
                })
            },
            _ = function() {
                function e(n, r) {
                    this.stateRegistry = n, this.stateService = r, t.createProxyFunctions(t.val(e.prototype), this, t.val(this))
                }
                return e.prototype.decorator = function(e, n) {
                    return this.stateRegistry.decorator(e, n) || this
                }, e.prototype.state = function(e, n) {
                    return t.isObject(e) ? n = e : n.name = e, this.stateRegistry.register(n), this
                }, e.prototype.onInvalid = function(e) {
                    return this.stateService.onInvalid(e)
                }, e
            }(),
            f = function(e) {
                return function(n, r) {
                    var a = n[e],
                        o = "onExit" === e ? "from" : "to";
                    return a ? function(e, n) {
                        var r = new t.ResolveContext(e.treeChanges(o)).subContext(n.$$state()),
                            i = t.extend(C(r), {
                                $state$: n,
                                $transition$: e
                            });
                        return t.services.$injector.invoke(a, this, i)
                    } : void 0
                }
            },
            h = function() {
                function e(e) {
                    this._urlListeners = [], this.$locationProvider = e;
                    var n = t.val(e);
                    t.createProxyFunctions(n, this, n, ["hashPrefix"])
                }
                return e.monkeyPatchPathParameterType = function(e) {
                    var n = e.urlMatcherFactory.type("path");
                    n.encode = function(e) {
                        return null != e ? e.toString().replace(/(~|\/)/g, function(e) {
                            return {
                                "~": "~~",
                                "/": "~2F"
                            } [e]
                        }) : e
                    }, n.decode = function(e) {
                        return null != e ? e.toString().replace(/(~~|~2F)/g, function(e) {
                            return {
                                "~~": "~",
                                "~2F": "/"
                            } [e]
                        }) : e
                    }
                }, e.prototype.dispose = function() {}, e.prototype.onChange = function(e) {
                    var n = this;
                    return this._urlListeners.push(e),
                        function() {
                            return t.removeFrom(n._urlListeners)(e)
                        }
                }, e.prototype.html5Mode = function() {
                    var e = this.$locationProvider.html5Mode();
                    return (e = t.isObject(e) ? e.enabled : e) && this.$sniffer.history
                }, e.prototype.baseHref = function() {
                    return this._baseHref || (this._baseHref = this.$browser.baseHref() || this.$window.location.pathname)
                }, e.prototype.url = function(e, n, r) {
                    return void 0 === n && (n = !1), t.isDefined(e) && this.$location.url(e), n && this.$location.replace(), r && this.$location.state(r), this.$location.url()
                }, e.prototype._runtimeServices = function(e, n, r, a, o) {
                    var i = this;
                    this.$location = n, this.$sniffer = r, this.$browser = a, this.$window = o, e.$on("$locationChangeSuccess", function(e) {
                        return i._urlListeners.forEach(function(n) {
                            return n(e)
                        })
                    });
                    var s = t.val(n);
                    t.createProxyFunctions(s, this, s, ["replace", "path", "search", "hash"]), t.createProxyFunctions(s, this, s, ["port", "protocol", "host"])
                }, e
            }(),
            m = function() {
                function e(e) {
                    this._router = e, this._urlRouter = e.urlRouter
                }
                return e.injectableHandler = function(e, n) {
                    return function(r) {
                        return t.services.$injector.invoke(n, null, {
                            $match: r,
                            $stateParams: e.globals.params
                        })
                    }
                }, e.prototype.$get = function() {
                    var e = this._urlRouter;
                    return e.update(!0), e.interceptDeferred || e.listen(), e
                }, e.prototype.rule = function(e) {
                    var n = this;
                    if (!t.isFunction(e)) throw new Error("'rule' must be a function");
                    var r = new t.BaseUrlRule(function() {
                        return e(t.services.$injector, n._router.locationService)
                    }, t.identity);
                    return this._urlRouter.rule(r), this
                }, e.prototype.otherwise = function(e) {
                    var n = this,
                        r = this._urlRouter;
                    if (t.isString(e)) r.otherwise(e);
                    else {
                        if (!t.isFunction(e)) throw new Error("'rule' must be a string or function");
                        r.otherwise(function() {
                            return e(t.services.$injector, n._router.locationService)
                        })
                    }
                    return this
                }, e.prototype.when = function(n, r) {
                    return (t.isArray(r) || t.isFunction(r)) && (r = e.injectableHandler(this._router, r)), this._urlRouter.when(n, r), this
                }, e.prototype.deferIntercept = function(e) {
                    this._urlRouter.deferIntercept(e)
                }, e
            }();
        a.module("ui.router.angular1", []);
        var g = a.module("ui.router.init", ["ng"]),
            v = a.module("ui.router.util", ["ui.router.init"]),
            E = a.module("ui.router.router", ["ui.router.util"]),
            T = a.module("ui.router.state", ["ui.router.router", "ui.router.util", "ui.router.angular1"]),
            R = a.module("ui.router", ["ui.router.init", "ui.router.state", "ui.router.angular1"]),
            b = (a.module("ui.router.compat", ["ui.router"]), null);

        function P(e) {
            (b = this.router = new t.UIRouter).stateProvider = new _(b.stateRegistry, b.stateService), b.stateRegistry.decorator("views", s), b.stateRegistry.decorator("onExit", f("onExit")), b.stateRegistry.decorator("onRetain", f("onRetain")), b.stateRegistry.decorator("onEnter", f("onEnter")), b.viewService._pluginapi._viewConfigFactory("ng1", o());
            var n = b.locationService = b.locationConfig = new h(e);

            function r(e, t, r, a, o, i, s) {
                return n._runtimeServices(o, e, a, t, r), delete b.router, delete b.$get, b
            }
            return h.monkeyPatchPathParameterType(b), b.router = b, b.$get = r, r.$inject = ["$location", "$browser", "$window", "$sniffer", "$rootScope", "$http", "$templateCache"], b
        }
        P.$inject = ["$locationProvider"];
        var A = function(e) {
            return ["$uiRouterProvider", function(n) {
                var t = n.router[e];
                return t.$get = function() {
                    return t
                }, t
            }]
        };

        function S(e, n, r) {
            if (t.services.$injector = e, t.services.$q = n, !e.hasOwnProperty("strictDi")) try {
                e.invoke(function(e) {})
            } catch (n) {
                e.strictDi = !!/strict mode/.exec(n && n.toString())
            }
            r.stateRegistry.get().map(function(e) {
                return e.$$state().resolvables
            }).reduce(t.unnestR, []).filter(function(e) {
                return "deferred" === e.deps
            }).forEach(function(n) {
                return n.deps = e.annotate(n.resolveFn, e.strictDi)
            })
        }

        function N(e) {
            e.$watch(function() {
                t.trace.approximateDigests++
            })
        }
        S.$inject = ["$injector", "$q", "$uiRouter"], N.$inject = ["$rootScope"], g.provider("$uiRouter", P), E.provider("$urlRouter", ["$uiRouterProvider", function(e) {
            return e.urlRouterProvider = new m(e)
        }]), v.provider("$urlService", A("urlService")), v.provider("$urlMatcherFactory", ["$uiRouterProvider", function() {
            return b.urlMatcherFactory
        }]), v.provider("$templateFactory", function() {
            return new u
        }), T.provider("$stateRegistry", A("stateRegistry")), T.provider("$uiRouterGlobals", A("globals")), T.provider("$transitions", A("transitionService")), T.provider("$state", ["$uiRouterProvider", function() {
            return t.extend(b.stateProvider, {
                $get: function() {
                    return b.stateService
                }
            })
        }]), T.factory("$stateParams", ["$uiRouter", function(e) {
            return e.globals.params
        }]), R.factory("$view", function() {
            return b.viewService
        }), R.service("$trace", function() {
            return t.trace
        }), R.run(N), v.run(["$urlMatcherFactory", function(e) {}]), T.run(["$state", function(e) {}]), E.run(["$urlRouter", function(e) {}]), g.run(S);
        var D, I, O, y, C = function(e) {
            var n = e.getTokens().filter(t.isString),
                r = n.map(function(n) {
                    var t = e.getResolvable(n),
                        r = e.getPolicy(t).async;
                    return [n, "NOWAIT" === r ? t.promise : t.data]
                });
            return r.reduce(t.applyPairs, {})
        };

        function x(e) {
            var n, t = e.match(/^\s*({[^}]*})\s*$/);
            if (t && (e = "(" + t[1] + ")"), !(n = e.replace(/\n/g, " ").match(/^\s*([^(]*?)\s*(\((.*)\))?\s*$/)) || 4 !== n.length) throw new Error("Invalid state ref '" + e + "'");
            return {
                state: n[1] || null,
                paramExpr: n[3] || null
            }
        }

        function L(e) {
            var n = e.parent().inheritedData("$uiView"),
                r = t.parse("$cfg.path")(n);
            return r ? t.tail(r).state.name : void 0
        }

        function w(e, n, r) {
            var a = r.uiState || e.current.name,
                o = t.extend(function(e, n) {
                    return {
                        relative: L(e) || n.$current,
                        inherit: !0,
                        source: "sref"
                    }
                }(n, e), r.uiStateOpts || {}),
                i = e.href(a, r.uiStateParams, o);
            return {
                uiState: a,
                uiStateParams: r.uiStateParams,
                uiStateOpts: o,
                href: i
            }
        }

        function H(e) {
            var n = "[object SVGAnimatedString]" === Object.prototype.toString.call(e.prop("href")),
                t = "FORM" === e[0].nodeName;
            return {
                attr: t ? "action" : n ? "xlink:href" : "href",
                isAnchor: "A" === e.prop("tagName").toUpperCase(),
                clickable: !t
            }
        }

        function M(e, n, t, r, a) {
            return function(o) {
                var i = o.which || o.button,
                    s = a();
                if (!(i > 1 || o.ctrlKey || o.metaKey || o.shiftKey || e.attr("target"))) {
                    var l = t(function() {
                        e.attr("disabled") || n.go(s.uiState, s.uiStateParams, s.uiStateOpts)
                    });
                    o.preventDefault();
                    var c = r.isAnchor && !s.href ? 1 : 0;
                    o.preventDefault = function() {
                        c-- <= 0 && t.cancel(l)
                    }
                }
            }
        }

        function X(e, n, r, a) {
            var o;
            a && (o = a.events), t.isArray(o) || (o = ["click"]);
            for (var i = e.on ? "on" : "bind", s = 0, l = o; s < l.length; s++) {
                var c = l[s];
                e[i](c, r)
            }
            n.$on("$destroy", function() {
                for (var n = e.off ? "off" : "unbind", t = 0, a = o; t < a.length; t++) {
                    var i = a[t];
                    e[n](i, r)
                }
            })
        }

        function j(e) {
            var n = function(n, t, r) {
                return e.is(n, t, r)
            };
            return n.$stateful = !0, n
        }

        function $(e) {
            var n = function(n, t, r) {
                return e.includes(n, t, r)
            };
            return n.$stateful = !0, n
        }

        function U(e, n, r, o, i, s) {
            var l = t.parse("viewDecl.controllerAs"),
                c = t.parse("viewDecl.resolveAs");
            return {
                restrict: "ECA",
                priority: -400,
                compile: function(o) {
                    var s = o.html();
                    return o.empty(),
                        function(o, u) {
                            var d = u.data("$uiView");
                            if (!d) return u.html(s), void e(u.contents())(o);
                            var p = d.$cfg || {
                                    viewDecl: {},
                                    getTemplate: t.noop
                                },
                                _ = p.path && new t.ResolveContext(p.path);
                            u.html(p.getTemplate(u, _) || s), t.trace.traceUIViewFill(d.$uiView, u.html());
                            var f = e(u.contents()),
                                h = p.controller,
                                m = l(p),
                                g = c(p),
                                v = _ && C(_);
                            if (o[g] = v, h) {
                                var E = n(h, t.extend({}, v, {
                                    $scope: o,
                                    $element: u
                                }));
                                m && (o[m] = E, o[m][g] = v), u.data("$ngControllerController", E), u.children().data("$ngControllerController", E), q(i, r, E, o, p)
                            }
                            if (t.isString(p.component)) var T = t.kebobString(p.component),
                                R = new RegExp("^(x-|data-)?" + T + "$", "i"),
                                b = o.$watch(function() {
                                    var e = [].slice.call(u[0].children).filter(function(e) {
                                        return e && e.tagName && R.exec(e.tagName)
                                    });
                                    return e && a.element(e).data("$" + p.component + "Controller")
                                }, function(e) {
                                    e && (q(i, r, e, o, p), b())
                                });
                            f(o)
                        }
                }
            }
        }
        D = ["$uiRouter", "$timeout", function(e, n) {
            var r = e.stateService;
            return {
                restrict: "A",
                require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
                link: function(a, o, i, s) {
                    var l, c = H(o),
                        u = s[1] || s[0],
                        d = null,
                        p = {},
                        _ = function() {
                            return w(r, o, p)
                        },
                        f = x(i.uiSref);

                    function h() {
                        var e = _();
                        d && d(), u && (d = u.$$addStateInfo(e.uiState, e.uiStateParams)), null != e.href && i.$set(c.attr, e.href)
                    }
                    p.uiState = f.state, p.uiStateOpts = i.uiSrefOpts ? a.$eval(i.uiSrefOpts) : {}, f.paramExpr && (a.$watch(f.paramExpr, function(e) {
                        p.uiStateParams = t.extend({}, e), h()
                    }, !0), p.uiStateParams = t.extend({}, a.$eval(f.paramExpr))), h(), a.$on("$destroy", e.stateRegistry.onStatesChanged(h)), a.$on("$destroy", e.transitionService.onSuccess({}, h)), c.clickable && (l = M(o, r, n, c, _), X(o, a, l, p.uiStateOpts))
                }
            }
        }], I = ["$uiRouter", "$timeout", function(e, n) {
            var r = e.stateService;
            return {
                restrict: "A",
                require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
                link: function(a, o, i, s) {
                    var l, c = H(o),
                        u = s[1] || s[0],
                        d = null,
                        p = {},
                        _ = function() {
                            return w(r, o, p)
                        },
                        f = ["uiState", "uiStateParams", "uiStateOpts"],
                        h = f.reduce(function(e, n) {
                            return e[n] = t.noop, e
                        }, {});

                    function m() {
                        var e = _();
                        d && d(), u && (d = u.$$addStateInfo(e.uiState, e.uiStateParams)), null != e.href && i.$set(c.attr, e.href)
                    }
                    f.forEach(function(e) {
                        p[e] = i[e] ? a.$eval(i[e]) : null, i.$observe(e, function(n) {
                            h[e](), h[e] = a.$watch(n, function(n) {
                                p[e] = n, m()
                            }, !0)
                        })
                    }), m(), a.$on("$destroy", e.stateRegistry.onStatesChanged(m)), a.$on("$destroy", e.transitionService.onSuccess({}, m)), c.clickable && (l = M(o, r, n, c, _), X(o, a, l, p.uiStateOpts))
                }
            }
        }], O = ["$state", "$stateParams", "$interpolate", "$uiRouter", function(e, n, r, a) {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$attrs", function(n, o, i) {
                    var s, l, c, u, d, p = [];
                    s = r(i.uiSrefActiveEq || "", !1)(n);
                    try {
                        l = n.$eval(i.uiSrefActive)
                    } catch (e) {}

                    function _(e) {
                        e.promise.then(g, t.noop)
                    }

                    function f() {
                        h(l)
                    }

                    function h(e) {
                        t.isObject(e) && (p = [], t.forEach(e, function(e, r) {
                            var a = function(e, t) {
                                var r = x(e);
                                m(r.state, n.$eval(r.paramExpr), t)
                            };
                            t.isString(e) ? a(e, r) : t.isArray(e) && t.forEach(e, function(e) {
                                a(e, r)
                            })
                        }))
                    }

                    function m(n, r, a) {
                        var i = e.get(n, L(o)),
                            s = {
                                state: i || {
                                    name: n
                                },
                                params: r,
                                activeClass: a
                            };
                        return p.push(s),
                            function() {
                                t.removeFrom(p)(s)
                            }
                    }

                    function g() {
                        var r = function(e) {
                                return e.split(/\s/).filter(t.identity)
                            },
                            a = function(e) {
                                return e.map(function(e) {
                                    return e.activeClass
                                }).map(r).reduce(t.unnestR, [])
                            },
                            i = a(p).concat(r(s)).reduce(t.uniqR, []),
                            l = a(p.filter(function(n) {
                                return e.includes(n.state.name, n.params)
                            })),
                            c = !!p.filter(function(n) {
                                return e.is(n.state.name, n.params)
                            }).length,
                            u = c ? r(s) : [],
                            d = l.concat(u).reduce(t.uniqR, []),
                            _ = i.filter(function(e) {
                                return !t.inArray(d, e)
                            });
                        n.$evalAsync(function() {
                            d.forEach(function(e) {
                                return o.addClass(e)
                            }), _.forEach(function(e) {
                                return o.removeClass(e)
                            })
                        })
                    }
                    h(l = l || r(i.uiSrefActive || "", !1)(n)), this.$$addStateInfo = function(e, n) {
                        if (!(t.isObject(l) && p.length > 0)) {
                            var r = m(e, n, l);
                            return g(), r
                        }
                    }, n.$on("$destroy", (c = a.stateRegistry.onStatesChanged(f), u = a.transitionService.onStart({}, _), d = n.$on("$stateChangeSuccess", g), function() {
                        c(), u(), d()
                    })), a.globals.transition && _(a.globals.transition), g()
                }]
            }
        }], a.module("ui.router.state").directive("uiSref", D).directive("uiSrefActive", O).directive("uiSrefActiveEq", O).directive("uiState", I), j.$inject = ["$state"], $.$inject = ["$state"], a.module("ui.router.state").filter("isState", j).filter("includedByState", $), y = ["$view", "$animate", "$uiViewScroll", "$interpolate", "$q", function(e, n, r, o, i) {
            var s = {
                    $cfg: {
                        viewDecl: {
                            $context: e._pluginapi._rootViewContext()
                        }
                    },
                    $uiView: {}
                },
                l = {
                    count: 0,
                    restrict: "ECA",
                    terminal: !0,
                    priority: 400,
                    transclude: "element",
                    compile: function(u, d, p) {
                        return function(u, d, _) {
                            var f, h, m, g, v, E = _.onload || "",
                                T = _.autoscroll,
                                R = {
                                    enter: function(e, t, r) {
                                        a.version.minor > 2 ? n.enter(e, null, t).then(r) : n.enter(e, null, t, r)
                                    },
                                    leave: function(e, t) {
                                        a.version.minor > 2 ? n.leave(e).then(t) : n.leave(e, t)
                                    }
                                },
                                b = d.inheritedData("$uiView") || s,
                                P = o(_.uiView || _.name || "")(u) || "$default",
                                A = {
                                    $type: "ng1",
                                    id: l.count++,
                                    name: P,
                                    fqn: b.$uiView.fqn ? b.$uiView.fqn + "." + P : P,
                                    config: null,
                                    configUpdated: function(e) {
                                        (!e || e instanceof c) && (g !== e && (t.trace.traceUIViewConfigUpdated(A, e && e.viewDecl && e.viewDecl.$context), g = e, S(e)))
                                    },
                                    get creationContext() {
                                        var e = t.parse("$cfg.viewDecl.$context")(b),
                                            n = t.parse("$uiView.creationContext")(b);
                                        return e || n
                                    }
                                };

                            function S(e) {
                                var n = u.$new(),
                                    a = i.defer(),
                                    o = i.defer(),
                                    s = {
                                        $cfg: e,
                                        $uiView: A
                                    },
                                    l = {
                                        $animEnter: a.promise,
                                        $animLeave: o.promise,
                                        $$animLeave: o
                                    };
                                n.$emit("$viewContentLoading", P);
                                var c = p(n, function(e) {
                                    e.data("$uiViewAnim", l), e.data("$uiView", s), R.enter(e, d, function() {
                                            a.resolve(), m && m.$emit("$viewContentAnimationEnded"), (t.isDefined(T) && !T || u.$eval(T)) && r(e)
                                        }),
                                        function() {
                                            if (f && (t.trace.traceUIViewEvent("Removing (previous) el", f.data("$uiView")), f.remove(), f = null), m && (t.trace.traceUIViewEvent("Destroying scope", A), m.$destroy(), m = null), h) {
                                                var e = h.data("$uiViewAnim");
                                                t.trace.traceUIViewEvent("Animate out", e), R.leave(h, function() {
                                                    e.$$animLeave.resolve(), f = null
                                                }), f = h, h = null
                                            }
                                        }()
                                });
                                h = c, (m = n).$emit("$viewContentLoaded", e || g), m.$eval(E)
                            }
                            t.trace.traceUIViewEvent("Linking", A), d.data("$uiView", {
                                $uiView: A
                            }), S(), v = e.registerUIView(A), u.$on("$destroy", function() {
                                t.trace.traceUIViewEvent("Destroying/Unregistering", A), v()
                            })
                        }
                    }
                };
            return l
        }], U.$inject = ["$compile", "$controller", "$transitions", "$view", "$q", "$timeout"];
        var F = "function" == typeof a.module("ui.router").component,
            k = 0;

        function q(e, n, r, a, o) {
            !t.isFunction(r.$onInit) || o.viewDecl.component && F || r.$onInit();
            var i = t.tail(o.path).state.self,
                s = {
                    bind: r
                };
            if (t.isFunction(r.uiOnParamsChanged)) {
                var l = new t.ResolveContext(o.path),
                    c = l.getResolvable("$transition$").data;
                a.$on("$destroy", n.onSuccess({}, function(e) {
                    if (e !== c && -1 === e.exiting().indexOf(i)) {
                        var n = e.params("to"),
                            a = e.params("from"),
                            o = function(e) {
                                return e.paramSchema
                            },
                            s = e.treeChanges("to").map(o).reduce(t.unnestR, []),
                            l = e.treeChanges("from").map(o).reduce(t.unnestR, []),
                            u = s.filter(function(e) {
                                var t = l.indexOf(e);
                                return -1 === t || !l[t].type.equals(n[e.id], a[e.id])
                            });
                        if (u.length) {
                            var d = u.map(function(e) {
                                    return e.id
                                }),
                                p = t.filter(n, function(e, n) {
                                    return -1 !== d.indexOf(n)
                                });
                            r.uiOnParamsChanged(p, e)
                        }
                    }
                }, s))
            }
            if (t.isFunction(r.uiCanExit)) {
                var u = k++,
                    d = function(e) {
                        return !!e && (e._uiCanExitIds && !0 === e._uiCanExitIds[u] || d(e.redirectedFrom()))
                    },
                    p = {
                        exiting: i.name
                    };
                a.$on("$destroy", n.onBefore(p, function(n) {
                    var t, a = n._uiCanExitIds = n._uiCanExitIds || {};
                    return d(n) || (t = e.when(r.uiCanExit(n))).then(function(e) {
                        return a[u] = !1 !== e
                    }), t
                }, s))
            }
        }
        a.module("ui.router.state").directive("uiView", y), a.module("ui.router.state").directive("uiView", U), a.module("ui.router.state").provider("$uiViewScroll", function() {
            var e = !1;
            this.useAnchorScroll = function() {
                e = !0
            }, this.$get = ["$anchorScroll", "$timeout", function(n, t) {
                return e ? n : function(e) {
                    return t(function() {
                        e[0].scrollIntoView()
                    }, 0, !1)
                }
            }]
        }), Object.keys(t).forEach(function(n) {
            e[n] = t[n]
        }), e.core = t, e.default = "ui.router", e.watchDigests = N, e.getLocals = C, e.getNg1ViewConfigFactory = o, e.ng1ViewsBuilder = s, e.Ng1ViewConfig = c, e.StateProvider = _, e.UrlRouterProvider = m, Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }(n, t(65), t(727))
}, function(e, n, t) {
    var r = {
        "./anyone.html": 581,
        "./apt.html": 582,
        "./apt_address.html": 583,
        "./areanm.html": 584,
        "./areanm_address.html": 585,
        "./closed.html": 586,
        "./confirm.html": 587,
        "./gen_address.html": 588,
        "./homeless.html": 589,
        "./homeless_pr.html": 590,
        "./other_address.html": 591,
        "./other_address_pr.html": 592,
        "./other_complete.html": 593,
        "./other_complete_auth.html": 594,
        "./residence.html": 595,
        "./residence2.html": 596,
        "./respondent.html": 597,
        "./rr_address.html": 598,
        "./rural_route.html": 599,
        "./stan_other_address.html": 600,
        "./stan_residence.html": 601,
        "./stan_rr_address.html": 602,
        "./standardize-address.html": 212,
        "./state.html": 603,
        "./urb.html": 604,
        "./urb_address.html": 605,
        "./vacancy.html": 606,
        "./verify.html": 607,
        "./verifyaddress.html": 608
    };

    function a(e) {
        var n = o(e);
        return t(n)
    }

    function o(e) {
        if (!t.o(r, e)) {
            var n = new Error("Cannot find module '" + e + "'");
            throw n.code = "MODULE_NOT_FOUND", n
        }
        return r[e]
    }
    a.keys = function() {
        return Object.keys(r)
    }, a.resolve = o, e.exports = a, a.id = 580
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="intro.anyone.error" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentPageValid"></div>\n\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.anyone.questionText"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/anyone.help.partial.html\'"></help>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n    <div class="radio" ng-init="radios = [\'H_OCC_YES_PRX_IND\', \'H_OCC_NO_PRX_IND\', \'H_OCC_DK_PRX_IND\']">\n      <label>\n        <input\n          type="radio"\n          id="ANYONE_YES"\n          name="ANYONE"\n          title="Yes"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_OCC_YES_PRX_IND"\n          ng-change="radioChanged(\'H_OCC_YES_PRX_IND\', radios)">\n        <span translate="intro.anyone.yes"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="ANYONE_NO"\n          name="ANYONE"\n          title="No"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_OCC_NO_PRX_IND"\n          ng-change="radioChanged(\'H_OCC_NO_PRX_IND\', radios)">\n        <span translate="intro.anyone.no"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="ANYONE_DK"\n          name="ANYONE"\n          title="Don\'t Know"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_OCC_DK_PRX_IND"\n          ng-change="radioChanged(\'H_OCC_DK_PRX_IND\', radios)">\n        <span translate="intro.anyone.dk"></span>\n      </label>\n    </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div role="alert" class="alert alert-info" translate="intro.generic.error" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentFormValid"></div>\n</div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.apt.questionText"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/apt.help.partial.html\'"></help>\n</p>\n<p class="questionTip" translate="intro.apt.questionTip"></p>\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n  <div class="radio" ng-init="radios = [\'ADR_IS_APT_YES_IND\', \'ADR_IS_APT_NO_IND\']">\n    <label>\n      <input\n        type="radio"\n        id="APT_YES"\n        name="APT"\n        title="Yes"\n        ng-required="true"\n        value="1"\n        ng-model="model.ADR_IS_APT_YES_IND"\n        ng-change="radioChanged(\'ADR_IS_APT_YES_IND\', radios)">\n      <span translate="intro.generic.yes"></span>\n    </label>\n  </div>\n  <div class="radio">\n    <label>\n      <input\n        type="radio"\n        id="APT_NO"\n        name="APT"\n        title="No"\n        ng-required="true"\n        value="1"\n        ng-model="model.ADR_IS_APT_NO_IND"\n        ng-change="radioChanged(\'ADR_IS_APT_NO_IND\', radios)">\n      <span translate="intro.generic.no"></span>\n    </label>\n  </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.class"></div>\n</div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.address_generics.question"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/apt_address.help.partial.html\'"></help>\n</p>\n<p class="questionTip" translate="intro.address_generics.questionTip"></p>\n<br />\n<form class="form" role="form" name="currentForm" novalidate>\n  <div class="row">\n    <div class="form-group col-sm-5" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_COMPLEX_NAME}">\n      <label for="ADR_COMPLEX_NAME" translate="intro.apt_address.complexName"></label>\n      <span class="example-text" translate="intro.pr_addresses.apt" aria-hidden="true"></span>\n      <span class="sr-only">Example Name: COND Ponce de León or RES Los Jardines de Ponce</span>\n      <input type="text"\n             aria-required="true"\n             class="form-control"\n             style="width: 100%;"\n             id="ADR_COMPLEX_NAME"\n             title="Complex Name"\n             name="ADR_COMPLEX_NAME"\n             ng-maxlength="100"\n             maxlength="100"\n             ng-model="model.a10.ADR_COMPLEX_NAME">\n    </div>\n  </div>\n  <div class="row">\n    <div class="form-group col-sm-4 col-md-3 col-lg-3">\n      <label for="ADR_STNU_TEXT" translate="intro.address_generics.houseNumber"></label>\n      <span class="example-text" translate="intro.pr_addresses.example1" aria-hidden="true"></span>\n      <span class="sr-only">Example Address Number: 100 or 5007</span>\n      <input type="text"\n             class="form-control"\n             id="ADR_STNU_TEXT"\n             title="Address Number"\n             ng-model="model.a10.ADR_STNU_TEXT"\n             ng-maxlength="20"\n             maxlength="20"\n             name="ADR_STNU_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-3">\n      <label for="ADR_STNM_TEXT" translate="intro.address_generics.streetName"></label>\n      <span class="example-text" translate="intro.pr_addresses.example2" aria-hidden="true"></span>\n      <span class="sr-only">Example Street Name: CLL 10 or AVE FD Roosevelt</span>\n      <input type="text"\n             class="form-control"\n             id="ADR_STNM_TEXT"\n             title="Street Name"\n             name="ADR_STNM_TEXT"\n             ng-maxlength="100"\n             maxlength="100"\n             ng-model="model.a10.ADR_STNM_TEXT">\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-3"  ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_UNIT_TEXT}">\n        <label for="ADR_UNIT_TEXT" translate="intro.address_generics.unitText"></label>\n        <span class="example-text" translate="intro.pr_addresses.example3" aria-hidden="true"></span>\n        <span class="sr-only">Example Apartment or Unit: Torre 5-10, or Apt. B, or 45-9</span>\n        <input type="text"\n               aria-required="true"\n               class="form-control"\n               id="ADR_UNIT_TEXT"\n               title="Apt/Unit"\n               ng-model="model.a10.ADR_UNIT_TEXT"\n               ng-maxlength="40"\n               maxlength="40"\n               name="ADR_UNIT_TEXT"\n        >\n      </div>\n  </div>\n  <div class="row">\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_PR_MUNI_NAME}">\n      <label for="ADR_PR_MUNI_NAME" translate="intro.address_generics.muniName"></label>\n      <input type="text"\n             aria-required="true"\n             class="form-control"\n             id="ADR_PR_MUNI_NAME"\n             title="Municipio Name"\n             name="ADR_PR_MUNI_NAME"\n             ng-maxlength="100"\n             maxlength="100"\n             ng-model="model.a10.ADR_PR_MUNI_NAME">\n    </div>\n    <div class="form-group col-sm-2 col-lg-2">\n      <label for="ADR_STATE_TEXT" translate="intro.address_generics.pr"></label>\n      <input type="text"\n             class="form-control"\n             id="ADR_STATE_TEXT"\n             title="State"\n             ng-model="model.a10.ADR_STATE_TEXT"\n             placeholder="PR"\n             ng-maxlength="20"\n             maxlength="20"\n             size="2"\n             ng-disabled="true"\n             ng-init="model.a10.ADR_STATE_TEXT = \'PR\'"\n             name="ADR_STATE_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-3" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_ZIP_TEXT}">\n      <label for="ADR_ZIP_TEXT" translate="intro.address_generics.zip"></label>\n      <input type="text"\n             aria-required="true"\n             class="form-control is-number"\n             id="ADR_ZIP_TEXT"\n             title="Zip Code"\n             ng-model="model.a10.ADR_ZIP_TEXT"\n             ng-maxlength="5"\n             maxlength="5"\n             size="5"\n             name="ADR_ZIP_TEXT"\n             input-filter="^[0-9]*$"\n             inputmode="decimal"\n             pattern="[0-9]*"\n      >\n    </div>\n  </div>\n  <div class="row">\n    <div class="form-group col-sm-6" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_LOC_DESC_TEXT}">\n      <label><strong translate="intro.address_generics.por"></strong></label>\n      <p class="questionTip" translate="intro.address_generics.porTip"></p>\n      <textarea\n          id="ADR_LOC_DESC_TEXT"\n          aria-required="true"\n          rows="2"\n          rtl-default-dir="rtl"\n          class="form-control"\n          style="width:100%"\n          title="Points of Reference"\n          ng-model="model.a10.ADR_LOC_DESC_TEXT"\n          ng-maxlength="250"\n          maxlength="250"\n          ng-required="true"\n          name="ADR_LOC_DESC_TEXT">\n        </textarea>\n    </div>\n  </div>\n\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="intro.generic.error" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentFormValid"></div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.areanm.questionText"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/areanm.help.partial.html\'"></help>\n</p>\n<p class="questionTip" translate="intro.areanm.questionTip"></p>\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n  <div class="radio" ng-init="radios = [\'ADR_IS_AREA_YES_IND\', \'ADR_IS_AREA_NO_IND\']">\n    <label>\n      <input\n        type="radio"\n        id="AREA_YES"\n        name="AREA"\n        title="Yes"\n        ng-required="true"\n        value="1"\n        ng-model="model.ADR_IS_AREA_YES_IND"\n        ng-change="radioChanged(\'ADR_IS_AREA_YES_IND\', radios)">\n      <span translate="intro.generic.yes"></span>\n    </label>\n  </div>\n  <div class="radio">\n    <label>\n      <input\n        type="radio"\n        id="AREA_NO"\n        name="AREA"\n        title="No"\n        ng-required="true"\n        value="1"\n        ng-model="model.ADR_IS_AREA_NO_IND"\n        ng-change="radioChanged(\'ADR_IS_AREA_NO_IND\', radios)">\n      <span translate="intro.generic.no"></span>\n    </label>\n  </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.message"></div>\n</div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.address_generics.question"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/areanm_address.help.partial.html\'"></help>\n</p>\n\n<p class="questionTip" translate="intro.address_generics.questionTip"></p>\n<br/>\n<form class="form" role="form" name="currentForm" novalidate>\n  <div class="row">\n    <div class="form-group col-sm-6" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_LOC_DESC_TEXT}">\n      <label class="strong" for="ADR_LOC_DESC_TEXT" translate="intro.address_generics.por"></label>\n      <p class="questionTip" translate="intro.address_generics.porTip"></p>\n      <div class="form-group">\n        <textarea\n          rows="2"\n          aria-required="true"\n          rtl-default-dir="rtl"\n          class="form-control"\n          style="width:100%"\n          title="Nearby points of reference description"\n          ng-model="model.a10.ADR_LOC_DESC_TEXT"\n          ng-maxlength="250"\n          maxlength="250"\n          ng-required="true"\n          id="ADR_LOC_DESC_TEXT"\n          name="ADR_LOC_DESC_TEXT">\n        </textarea>\n      </div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="form-group col-sm-6" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_PR_AREA_PRI_NAME}">\n      <label for="ADR_PR_AREA_PRI_NAME" translate="intro.areanm_address.areaName"></label>\n      <span class="example-text" translate="intro.areanm_address.areaNameExample"></span>\n      <span class="sr-only">Example Name: BO Martí, or BDA Los Toldos, or SECT Laguna, or BO Ponce PARC 10, or COM Los Reyes</span>\n      <input type="text"\n             aria-required="true"\n             class="form-control"\n             id="ADR_PR_AREA_PRI_NAME"\n             title="Name of Barrio, Barriada, Sector, Parcela, or Comunidad"\n             name="ADR_PR_AREA_PRI_NAME"\n             ng-maxlength="100"\n             maxlength="100"\n             ng-model="model.a10.ADR_PR_AREA_PRI_NAME"\n      >\n    </div>\n  </div>\n  <div class="row">\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width">\n      <label for="ADR_STNU_TEXT" translate="intro.address_generics.houseNumber"></label>\n      <span class="example-text" translate="intro.pr_addresses.example1" aria-hidden="true"></span>\n      <span class="sr-only">Example Address Number: 100 or 5007</span>\n      <input type="text"\n             class="form-control"\n             id="ADR_STNU_TEXT"\n             title="Address Number"\n             ng-model="model.a10.ADR_STNU_TEXT"\n             ng-maxlength="20"\n             maxlength="20"\n             name="ADR_STNU_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_STNM_TEXT}">\n      <label for="ADR_STNM_TEXT" translate="intro.address_generics.streetName"></label>\n      <span class="example-text" translate="intro.pr_addresses.example2" aria-hidden="true"></span>\n      <span class="sr-only">Example Street Name: CLL 10 or AVE FD Roosevelt</span>\n      <input type="text"\n             aria-required="true"\n             class="form-control"\n             id="ADR_STNM_TEXT"\n             title="Street Name"\n             name="ADR_STNM_TEXT"\n             ng-maxlength="100"\n             maxlength="100"\n             ng-model="model.a10.ADR_STNM_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width">\n        <label for="ADR_UNIT_TEXT" translate="intro.address_generics.unitText"></label>\n        <span class="example-text" translate="intro.pr_addresses.example3" aria-hidden="true"></span>\n        <span class="sr-only">Example Apartment or Unit: Torre 5-10, or Apt. B, or 45-9</span>\n        <input type="text"\n               class="form-control"\n               id="ADR_UNIT_TEXT"\n               title="Apt/Unit"\n               ng-model="model.a10.ADR_UNIT_TEXT"\n               ng-maxlength="40"\n               maxlength="40"\n               name="ADR_UNIT_TEXT"\n        >\n      </div>\n  </div>\n  <div class="row">\n    <div class="form-group col-sm-4 col-md-3 col-lg-2" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_PR_MUNI_NAME}">\n      <label for="ADR_PR_MUNI_NAME" translate="intro.address_generics.muniName"></label>\n      <input type="text"\n             aria-required="true"\n             class="form-control"\n             id="ADR_PR_MUNI_NAME"\n             title="Municipio Name"\n             name="ADR_COMPLEX_NAME"\n             ng-maxlength="100"\n             maxlength="100"\n             ng-model="model.a10.ADR_PR_MUNI_NAME">\n    </div>\n    <div class="form-group col-sm-2">\n      <label for="ADR_STATE_TEXT" translate="intro.address_generics.pr"></label>\n      <input type="text"\n             class="form-control"\n             id="ADR_STATE_TEXT"\n             title="State"\n             ng-model="model.a10.ADR_STATE_TEXT"\n             placeholder="PR"\n             ng-maxlength="20"\n             maxlength="20"\n             ng-size="2"\n             size="2"\n             ng-disabled="true"\n             ng-init="model.a10.ADR_STATE_TEXT = \'PR\'"\n             name="ADR_STATE_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-3" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_ZIP_TEXT}">\n      <label for="ADR_ZIP_TEXT" translate="intro.address_generics.zip"></label>\n      <input type="text"\n             aria-required="true"\n             class="form-control is-number"\n             id="ADR_ZIP_TEXT"\n             name="ADR_ZIP_TEXT"\n             title="Zip Code"\n             ng-model="model.a10.ADR_ZIP_TEXT"\n             ng-maxlength="5"\n             maxlength="5"\n             ng-size="5"\n             size="5"\n             input-filter="^[0-9]*$"\n             inputmode="decimal"\n             pattern="[0-9]*"\n      >\n    </div>\n  </div>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div class="row">\n  <div class="app-header text-center">\n    <h1 class="app-title" translate="closed.header"></h1>\n    <p class="lead app-description" translate="closed.subtext"></p>\n  </div>\n</div>\n'
}, function(e, n) {
    e.exports = '<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.confirm.questionText"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/confirm.help.partial.html\'"></help>\n</p>\n<p>\n{{ intro.prelist.addr1 }}<span ng-show="intro.prelist.unit">,</span> {{ intro.prelist.addr2 }} <br />\n{{ intro.prelist.addr3 }}\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n    <div class="radio" ng-init="radios = [\'RESP_FOR_QUEST_ADR_YES_IND\', \'RESP_FOR_QUEST_ADR_NO_IND\']">\n      <label>\n        <input\n          type="radio"\n          id="CONFIRM_YES"\n          name="CONFIRM"\n          title="Yes"\n          ng-required="true"\n          value="1"\n          ng-model="model.RESP_FOR_QUEST_ADR_YES_IND"\n          ng-change="radioChanged(\'RESP_FOR_QUEST_ADR_YES_IND\', radios)">\n        <span translate="intro.confirm.yes"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="CONFIRM_NO"\n          name="CONFIRM"\n          title="No"\n          ng-required="true"\n          value="1"\n          ng-model="model.RESP_FOR_QUEST_ADR_NO_IND"\n          ng-change="radioChanged(\'RESP_FOR_QUEST_ADR_NO_IND\', radios)">\n        <span translate="intro.confirm.no"></span>\n      </label>\n    </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher" next-disabled="model.RESP_FOR_QUEST_ADR_YES_IND !== \'1\' && model.RESP_FOR_QUEST_ADR_NO_IND !== \'1\'"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.message"></div>\n</div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.address_generics.question"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/gen_address.help.partial.html\'"></help>\n</p>\n\n<p class="questionTip" translate="intro.address_generics.questionTip"></p>\n\n<form class="form" role="form" name="currentForm" novalidate>\n  <div class="row">\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_STNU_TEXT}">\n      <label for="ADR_STNU_TEXT" translate="intro.address_generics.houseNumber"></label>\n      <span class="example-text" translate="intro.pr_addresses.example1" aria-hidden="true"></span>\n      <span class="sr-only">Example Address Number: 100 or 5007</span>\n      <input type="text"\n             aria-required="true"\n             class="form-control"\n             id="ADR_STNU_TEXT"\n             title="Address Number"\n             ng-model="model.a10.ADR_STNU_TEXT"\n             ng-maxlength="20"\n             maxlength="20"\n             name="ADR_STNU_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_STNM_TEXT}">\n      <label for="ADR_STNM_TEXT" translate="intro.address_generics.streetName"></label>\n      <span class="example-text" translate="intro.pr_addresses.example2" aria-hidden="true"></span>\n      <span class="sr-only">Example Street Name: CLL 10 or AVE FD Roosevelt</span>\n      <input type="text"\n             aria-required="true"\n             class="form-control"\n             id="ADR_STNM_TEXT"\n             title="Street Name"\n             name="ADR_STNM_TEXT"\n             nng-maxlength="100"\n             maxlength="100"\n             ng-model="model.a10.ADR_STNM_TEXT">\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width">\n        <label for="ADR_UNIT_TEXT" class="control-label" translate="intro.address_generics.unitText"></label>\n        <span class="example-text" translate="intro.pr_addresses.example3" aria-hidden="true"></span>\n        <span class="sr-only">Example Apartment or Unit: Torre 5-10, or Apt. B, or 45-9</span>\n        <input type="text"\n               class="form-control"\n               id="ADR_UNIT_TEXT"\n               title="Apt/Unit"\n               ng-model="model.a10.ADR_UNIT_TEXT"\n               ng-maxlength="40"\n               maxlength="40"\n               name="ADR_UNIT_TEXT"\n        >\n      </div>\n  </div>\n  <div class="row">\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_PR_MUNI_NAME}">\n      <label for="ADR_PR_MUNI_NAME" translate="intro.address_generics.muniName"></label>\n      <input type="text"\n             aria-required="true"\n             class="form-control"\n             id="ADR_PR_MUNI_NAME"\n             title="Municipio Name"\n             name="ADR_PR_MUNI_NAME"\n             ng-maxlength="100"\n             maxlength="100"\n             ng-model="model.a10.ADR_PR_MUNI_NAME">\n    </div>\n    <div class="form-group col-sm-2">\n      <label for="ADR_STATE_TEXT" class="control-label" translate="intro.address_generics.pr"></label>\n      <input type="text"\n             class="form-control"\n             id="ADR_STATE_TEXT"\n             title="State"\n             ng-model="model.a10.ADR_STATE_TEXT"\n             placeholder="PR"\n             ng-maxlength="20"\n             maxlength="20"\n             ng-size="2"\n             size="2"\n             ng-disabled="true"\n             ng-init="model.a10.ADR_STATE_TEXT = \'PR\'"\n             name="ADR_STATE_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_ZIP_TEXT}">\n      <label for="ADR_ZIP_TEXT" translate="intro.address_generics.zip"></label>\n      <input type="text"\n             aria-required="true"\n             class="form-control is-number"\n             id="ADR_ZIP_TEXT"\n             name="ADR_ZIP_TEXT"\n             title="Zip Code"\n             ng-model="model.a10.ADR_ZIP_TEXT"\n             ng-maxlength="5"\n             maxlength="5"\n             ng-size="5"\n             size="5"\n             input-filter="^[0-9]*$"\n             inputmode="decimal"\n             pattern="[0-9]*"\n      >\n    </div>\n  </div>\n  <div class="row">\n    <div class="form-group col-sm-6" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_LOC_DESC_TEXT}">\n      <p><strong translate="intro.address_generics.por"></strong></p>\n      <p class="questionTip" translate="intro.address_generics.porTip"></p>\n      <textarea\n        id="ADR_LOC_DESC_TEXT"\n        aria-required="true"\n        class="form-control"\n        rows="2"\n        style="width:100%"\n        title="Points of Reference"\n        ng-model="model.a10.ADR_LOC_DESC_TEXT"\n        ng-maxlength="250"\n        maxlength="250"\n        ng-required="true"\n        name="ADR_LOC_DESC_TEXT"\n      ></textarea>\n    </div>\n  </div>\n\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="intro.homeless.error" ng-if="dispatcher.currentPageAttempt == 1 && dispatcher.currentPageErrors"></div>\n\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.homeless.question"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/homeless.help.partial.html\'"></help>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n    <div class="radio" ng-init="radios = [\'ADR_IS_HOMELESS_YES_IND\', \'ADR_IS_HOMELESS_NO_IND\']">\n      <label>\n        <input\n          type="radio"\n          id="Homeless_yes"\n          name="HOMELESS"\n          title="Yes"\n          ng-required="true"\n          value="1"\n          ng-model="model.ADR_IS_HOMELESS_YES_IND"\n          ng-change="radioChanged(\'ADR_IS_HOMELESS_YES_IND\', radios)">\n        <span translate="intro.homeless.yes"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="Homeless_no"\n          name="HOMELESS"\n          title="No"\n          ng-required="true"\n          value="1"\n          ng-model="model.ADR_IS_HOMELESS_NO_IND"\n          ng-change="radioChanged(\'ADR_IS_HOMELESS_NO_IND\', radios)">\n        <span translate="intro.homeless.no"></span>\n      </label>\n    </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="intro.homeless_pr.error1" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentFormValid"></div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.homeless_pr.questionText"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/homeless.help.partial.html\'"></help>\n</p>\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n  <div class="radio" ng-init="radios = [\'ADR_IS_HOMELESS_YES_IND\', \'ADR_IS_HOMELESS_NO_IND\']">\n    <label>\n      <input\n        type="radio"\n        id="HOMELESS_PR_YES"\n        name="HOMELESS_PR"\n        title="Yes"\n        ng-required="true"\n        value="1"\n        ng-model="model.ADR_IS_HOMELESS_YES_IND"\n        ng-change="radioChanged(\'ADR_IS_HOMELESS_YES_IND\', radios)">\n      <span translate="intro.generic.yes"></span>\n    </label>\n  </div>\n  <div class="radio">\n    <label>\n      <input\n        type="radio"\n        id="HOMELESS_PR_NO"\n        name="HOMELESS_PR"\n        title="No"\n        ng-required="true"\n        value="1"\n        ng-model="model.ADR_IS_HOMELESS_NO_IND"\n        ng-change="radioChanged(\'ADR_IS_HOMELESS_NO_IND\', radios)">\n      <span translate="intro.generic.no"></span>\n    </label>\n  </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.class"></div>\n</div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.other_address.questionText1"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/other_address.help.partial.html\'"></help>\n</p>\n<p><strong role="heading" aria-level="2" translate="intro.other_address.questionText2"></strong></p>\n<br/>\n<form class="form" role="form" name="currentForm" novalidate>\n\n  <div class="row" reverse-children-on-rtl>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_CITY_TEXT}">\n      <label for="ADDR_CITY" translate="intro.residence.city"></label>\n      <input type="text" class="form-control" id="ADR_CITY_TEXT"\n          name="ADDR_CITY"\n          aria-required="true"\n          title="City"\n          ng-maxlength="100"\n          maxlength="100"\n          ng-model="model.a10.ADR_CITY_TEXT">\n    </div>\n\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_STATE_TEXT}">\n      <label for="ADR_STATE_TEXT" translate="intro.residence.state"></label>\n      <select class="form-control"\n        name="ADR_STATE_TEXT"\n        aria-required="true"\n        id="ADR_STATE_TEXT"\n        title="State"\n        ng-model="model.a10.ADR_STATE_TEXT"\n        ng-options="name for (name, value) in states">\n      </select>\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_ZIP_TEXT}">\n      <label for="ADR_ZIP_TEXT" translate="intro.residence.zip"></label>\n      <input type="text" class="form-control is-number" id="ADR_ZIP_TEXT"\n          ng-model="model.a10.ADR_ZIP_TEXT"\n          name="ADR_ZIP_TEXT"\n          aria-required="true"\n          title="Zip Code"\n          maxlength="5"\n          ng-maxlength="5"\n          ng-size="5"\n          size="5"\n          ng-pattern="/^[0-9]+$/"\n          input-filter="^[0-9]*$"\n          inputmode="decimal"\n          pattern="[0-9]*"\n      >\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-sm-6 col-xs-12">\n      <p>\n        <span class="strong" translate="intro.other_address.questionText3"></span>\n      </p>\n\n      <p>\n        <span translate="intro.other_address.forExample"></span>\n        <ul>\n          <li translate="intro.other_address.exampleBullet1"></li>\n          <li translate="intro.other_address.exampleBullet2"></li>\n        </ul>\n      </p>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="form-group col-sm-6" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_LOC_DESC_TEXT}">\n      <textarea\n        rtl-default-dir="rtl"\n        aria-required="true"\n        class="form-control"\n        rows="2"\n        style="width:100%"\n        title="Location Description"\n        ng-model="model.a10.ADR_LOC_DESC_TEXT"\n        ng-maxlength="250"\n        maxlength="250"\n        ng-required="true"\n        id="ADR_LOC_DESC_TEXT"\n        name="ADR_LOC_DESC_TEXT">\n      </textarea>\n    </div>\n  </div>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.message"></div>\n</div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.other_address_pr.questionText"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/other_address_pr.help.partial.html\'"></help>\n</p>\n<p><strong role="heading" aria-level="2" translate="intro.other_address_pr.questionText2"></strong></p>\n\n<form class="form" role="form" name="currentForm" novalidate>\n  <div class="row">\n    <div class="form-group col-sm-4" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_PR_MUNI_NAME}">\n      <label for="ADR_PR_MUNI_NAME" translate="intro.address_generics.muniName"></label>\n      <input type="text"\n             aria-required="true"\n             class="form-control"\n             id="ADR_PR_MUNI_NAME"\n             title="Municipio Name"\n             name="ADR_PR_MUNI_NAME"\n             ng-maxlength="100"\n             maxlength="100"\n             ng-size="26"\n             size="26"\n             ng-model="model.a10.ADR_PR_MUNI_NAME">\n    </div>\n    <div class="form-group col-sm-2">\n      <label for="ADR_STATE_TEXT" translate="intro.address_generics.statePR"></label>\n      <input type="text"\n             class="form-control"\n             id="ADR_STATE_TEXT"\n             title="State"\n             ng-model="model.a10.ADR_STATE_TEXT"\n             placeholder="PR"\n             ng-maxlength="20"\n             maxlength="20"\n             ng-size="2"\n             size="2"\n             ng-disabled="true"\n             ng-init="model.a10.ADR_STATE_TEXT = \'PR\'"\n             name="ADR_STATE_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-3" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_ZIP_TEXT}">\n      <label for="ADR_ZIP_TEXT" translate="intro.address_generics.zip"></label>\n      <input type="text"\n             aria-required="true"\n             class="form-control is-number"\n             id="ADR_ZIP_TEXT"\n             name="ADR_ZIP_TEXT"\n             title="Zip Code"\n             ng-model="model.a10.ADR_ZIP_TEXT"\n             ng-maxlength="5"\n             maxlength="5"\n             ng-size="5"\n             size="5"\n             input-filter="^[0-9]*$"\n             inputmode="decimal"\n             pattern="[0-9]*"\n      >\n    </div>\n  </div>\n    <p><strong role="heading" aria-level="2" translate="intro.other_address_pr.questionText3"></strong></p>\n    <p translate="intro.other_address_pr.forExample">\n      <ul>\n        <li translate="intro.other_address_pr.exampleBullet1"></li>\n        <li translate="intro.other_address_pr.exampleBullet2"></li>\n      </ul>\n    </p>\n  <div class="row">\n    <div class="form-group col-sm-6" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_LOC_DESC_TEXT}">\n      <textarea\n        id="ADR_LOC_DESC_TEXT"\n        aria-required="true"\n        rows="2"\n        rtl-default-dir="rtl"\n        class="form-control"\n        style="width:100%"\n        title="Points of Reference"\n        ng-model="model.a10.ADR_LOC_DESC_TEXT"\n        ng-maxlength="250"\n        maxlength="250"\n        ng-required="true"\n        name="ADR_LOC_DESC_TEXT"\n      ></textarea>\n    </div>\n  </div>\n\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="intro.other_complete.error" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentPageValid"></div>\n\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.other_complete.infoText"></strong>\n</p>\n<p>\n  <strong role="heading" aria-level="2" translate="intro.other_complete.questionText"></strong>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n    <div class="radio" ng-init="radios = [\'RESP_OTHERID_YES_IND\', \'RESP_OTHERID_NO_IND\']">\n      <label>\n        <input\n          type="radio"\n          id="OTHERCOMPLETE_YES"\n          name="OTHERCOMPLETE"\n          title="Yes"\n          ng-required="!model.RESP_OTHERID_YES_IND && !model.RESP_OTHERID_NO_IND"\n          value="1"\n          ng-model="model.RESP_OTHERID_YES_IND"\n          ng-change="radioChanged(\'RESP_OTHERID_YES_IND\', radios)">\n        <span translate="intro.other_complete.yes"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="OTHERCOMPLETE_NO"\n          name="OTHERCOMPLETE"\n          title="No"\n          ng-required="!model.RESP_OTHERID_YES_IND && !model.RESP_OTHERID_NO_IND"\n          value="1"\n          ng-model="model.RESP_OTHERID_NO_IND"\n          ng-change="radioChanged(\'RESP_OTHERID_NO_IND\', radios)">\n        <span translate="intro.other_complete.no"></span>\n      </label>\n    </div>\n  </p>\n  <formbuttons next-disabled="!model.RESP_OTHERID_YES_IND && !model.RESP_OTHERID_NO_IND" dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.other_complete_auth.infoText"></strong>\n</p>\n<p>\n  <strong translate="intro.other_complete_auth.info2Text"></strong>\n</p>\n<p>\n  <span translate="intro.other_complete_auth.phone"></span>\n</p>\n<p>\n  <strong role="heading" aria-level="2" translate="intro.other_complete_auth.questionText"></strong>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n    <div class="radio" ng-init="radios = [\'RESP_OTHERID_YES_IND\', \'RESP_OTHERID_NO_IND\']">\n      <label>\n        <input\n          type="radio"\n          id="OTHERCOMPLETE_YES"\n          name="OTHERCOMPLETE"\n          title="Yes"\n          ng-required="!model.RESP_OTHERID_YES_IND && !model.RESP_OTHERID_NO_IND"\n          value="1"\n          ng-model="model.RESP_OTHERID_YES_IND"\n          ng-change="radioChanged(\'RESP_OTHERID_YES_IND\', radios)">\n        <span translate="intro.other_complete_auth.yes"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="OTHERCOMPLETE_NO"\n          name="OTHERCOMPLETE"\n          title="No"\n          ng-required="!model.RESP_OTHERID_YES_IND && !model.RESP_OTHERID_NO_IND"\n          value="1"\n          ng-model="model.RESP_OTHERID_NO_IND"\n          ng-change="radioChanged(\'RESP_OTHERID_NO_IND\', radios)">\n        <span translate="intro.other_complete_auth.no"></span>\n      </label>\n    </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher" next-disabled="model.RESP_OTHERID_YES_IND !== \'1\' && model.RESP_OTHERID_NO_IND !== \'1\'"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.class"></div>\n</div>\n<p>\n  <b id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.residence.question"></b>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/residence.help.partial.html\'"></help>\n</p>\n\n<p><b translate="intro.residence.note"></b></p>\n<br />\n<form class="form" role="form" name="currentForm" novalidate>\n  <div class="row" reverse-children-on-rtl>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_STNU_TEXT}">\n      <label for="ADR_STNU_TEXT" translate="intro.residence.houseNumber"></label>\n      <span class="example-text" translate="intro.residence.exampleStreetNumber" aria-hidden="true"></span>\n      <span class="sr-only">Example Address Number: 101</span>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="ADR_STNU_TEXT"\n        title="Address Number"\n        ng-model="model.a10.ADR_STNU_TEXT"\n        ng-maxlength="20"\n        maxlength="20"\n        size="7"\n        name="ADR_STNU_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_STNM_TEXT}">\n      <label for="ADR_STNM_TEXT" translate="intro.residence.streetName"></label>\n      <span class="example-text" translate="intro.residence.exampleStreetName" aria-hidden="true"></span>\n      <span class="sr-only">Example Street Name: N Main St</span>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="ADR_STNM_TEXT"\n        title="Street Name"\n        name="ADR_STNM_TEXT"\n        ng-maxlength="50"\n        maxlength="50"\n        ng-model="model.a10.ADR_STNM_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width">\n      <label for="ADR_UNIT_TEXT" translate="intro.residence.aptNumber"></label>\n      <span class="example-text" translate="intro.residence.exampleStreetUnit" aria-hidden="true"></span>\n      <span class="sr-only">Example Apartment or Unit Number: Apt 23</span>\n      <input\n        type="text"\n        class="form-control"\n        id="ADR_UNIT_TEXT"\n        name="ADR_UNIT_TEXT"\n        title="Apt/Unit"\n        ng-maxlength="50"\n        maxlength="50"\n        size="11"\n        ng-model="model.a10.ADR_UNIT_TEXT"\n      >\n    </div>\n  </div>\n\n  <div class="row" reverse-children-on-rtl>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_CITY_TEXT}">\n      <label for="ADR_CITY_TEXT" translate="intro.residence.city"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="ADR_CITY_TEXT"\n        name="ADR_CITY_TEXT"\n        title="City"\n        ng-maxlength="100"\n        maxlength="100"\n        ng-model="model.a10.ADR_CITY_TEXT"\n      >\n    </div>\n\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_STATE_TEXT}">\n      <label for="ADR_STATE_TEXT" translate="intro.residence.state"></label>\n      <select\n        class="form-control"\n        aria-required="true"\n        name="ADR_STATE_TEXT"\n        id="ADR_STATE_TEXT"\n        title="State"\n        ng-model="model.a10.ADR_STATE_TEXT"\n        ng-options="name for (name, value) in states">\n      </select>\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_ZIP_TEXT}">\n      <label for="ADR_ZIP_TEXT" translate="intro.residence.zip"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control is-number"\n        id="ADR_ZIP_TEXT"\n        ng-model="model.a10.ADR_ZIP_TEXT"\n        name="ADR_ZIP_TEXT"\n        title="Zip Code"\n        ng-maxlength="5"\n        maxlength="5"\n        size="5"\n        ng-pattern="/^[0-9]+$/"\n        input-filter="^[0-9]*$"\n        inputmode="decimal"\n        pattern="[0-9]*"\n      >\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="checkbox">\n        <label for="ADR_NO_STREET_ADR_IND">\n      <input type="checkbox"\n            id="ADR_NO_STREET_ADR_IND"\n            name="ADR_NO_STREET_ADR_IND"\n            title="No Address"\n            class="form-control"\n            ng-model="model.ADR_NO_STREET_ADR_IND"\n            ng-true-value="\'1\'"\n            ng-false-value="\'0\'">\n            <span translate="intro.residence.noAddress"></span></label>\n    </div>\n  </div>\n\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.class"></div>\n</div>\n<p>\n  <p>\n    <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.residence2.questionText1"></strong>\n    <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/stan_residence.help.partial.html\'"></help>\n  </p>\n  <p>\n    <strong role="heading" aria-level="2" translate="intro.residence2.questionText2"></strong>\n  </p>\n  <p>\n    <strong role="heading" aria-level="2" translate="intro.residence2.questionText3"></strong>\n  </p>\n</p>\n\n<div class="address-dark">\n  <bdo dir="ltr">\n    <span class="preserve-line-break"> {{ dispatcher.metadata.formattedAddress }} </span>\n  </bdo>\n</div>\n<p>\n  <strong translate="intro.residence2.questionText4"></strong>\n</p>\n<form class="form" role="form" name="currentForm" novalidate>\n  <div class="row" reverse-children-on-rtl>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_STNU_TEXT}">\n      <label for="R2_ADR_STNU_TEXT" translate="intro.residence.houseNumber"></label>\n      <span class="example-text" translate="intro.residence.exampleStreetNumber" aria-hidden="true"></span>\n      <span class="sr-only">Example Address Number: 101</span>\n      <input type="text"\n        class="form-control"\n        aria-required="true"\n        id="R2_ADR_STNU_TEXT"\n        title="Address Number"\n        ng-model="model.a12.ADR_STNU_TEXT"\n        ng-maxlength="20"\n        maxlength="20"\n        size="7"\n        name="R2_ADR_STNU_TEXT">\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_STNM_TEXT}">\n      <label for="R2_ADR_STNM_TEXT" translate="intro.residence.streetName"></label>\n      <span class="example-text" translate="intro.residence.exampleStreetName" aria-hidden="true"></span>\n      <span class="sr-only">Example Street Name: N Main St</span>\n      <input type="text"\n        class="form-control"\n        aria-required="true"\n        id="R2_ADR_STNM_TEXT"\n        title="Street Name"\n        name="R2_ADR_STNM_TEXT"\n        ng-maxlength="50"\n        maxlength="50"\n        ng-model="model.a12.ADR_STNM_TEXT">\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width">\n      <label for="R2_ADR_UNIT_TEXT" translate="intro.residence.aptNumber"></label>\n      <span class="example-text" translate="intro.residence.exampleStreetUnit" aria-hidden="true"></span>\n      <span class="sr-only">Example Apartment or Unit Number: Apt 23</span>\n      <input type="text" class="form-control" id="R2_ADR_UNIT_TEXT"\n        name="R2_ADR_UNIT_TEXT"\n        title="Apt/Unit"\n        ng-maxlength="50"\n        maxlength="50"\n        size="11"\n        ng-model="model.a12.ADR_UNIT_TEXT">\n    </div>\n  </div>\n\n  <div class="row" reverse-children-on-rtl>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_CITY_TEXT}">\n      <label for="R2_ADR_CITY_TEXT" translate="intro.residence.city"></label>\n      <input type="text" class="form-control" id="R2_ADR_CITY_TEXT"\n          name="R2_ADR_CITY_TEXT"\n          aria-required="true"\n          title="City "\n          ng-maxlength="100"\n          maxlength="100"\n          ng-model="model.a12.ADR_CITY_TEXT">\n    </div>\n\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_STATE_TEXT}">\n      <label for="R2_ADR_STATE_TEXT" translate="intro.residence.state"></label>\n      <select class="form-control"\n        name="R2_ADR_STATE_TEXT"\n        aria-required="true"\n        id="R2_ADR_STATE_TEXT"\n        title="State"\n        ng-model="model.a12.ADR_STATE_TEXT"\n        ng-options="name for (name, value) in states">\n      </select>\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_ZIP_TEXT}">\n      <label for="R2_ADR_ZIP_TEXT" translate="intro.residence.zip"></label>\n      <input\n          type="text"\n          aria-required="true"\n          class="form-control is-number"\n          id="R2_ADR_ZIP_TEXT"\n          ng-model="model.a12.ADR_ZIP_TEXT"\n          name="R2_ADR_ZIP_TEXT"\n          title="Zip Code"\n          ng-maxlength="5"\n          maxlength="5"\n          size="5"\n          ng-pattern="/^[0-9]+$/"\n          input-filter="^[0-9]*$"\n          inputmode="decimal"\n          pattern="[0-9]*"\n      >\n    </div>\n  </div>\n  <formbuttons dispatcher="intro.dispatcher" custom-next-name="\'intro.stan_other_address.submit\'"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.class"></div>\n</div>\n<p>\n  <span id="question" tabindex="-1" role="heading" aria-level="2" class="strong" translate="intro.respondent.question"></span><br />\n  <span class="questionTip" translate="intro.respondent.questionTip"></span>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/respondent.help.partial.html\'"></help>\n</p>\n<form class="form" role="form" name="currentForm" novalidate>\n\n  <div class="row" reverse-children-on-rtl>\n    <div class="form-group col-xs-12 col-sm-4 col-md-3 col-lg-2" ng-class="{\'has-error\':dispatcher.currentPageErrors.error.class === \'alert-danger\' && !dispatcher.currentPageValid && dispatcher.currentPageAttempt}" >\n      <label for="P_FIRST_NAME" translate="intro.respondent.firstName"></label>\n      <input\n        type="text"\n        aria-required="true"\n        ng-model="roster[0].P_FIRST_NAME"\n        title="First Name"\n        name="P_FIRST_NAME"\n        ng-maxlength="20"\n        maxlength="20"\n        ng-size="20"\n        size="20"\n        class="input-full form-control"\n        id="P_FIRST_NAME"\n        gid="1"\n      >\n    </div>\n\n    <div class="form-group col-xs-12 col-sm-4 col-md-3 col-lg-2"  ng-class="{\'has-error\':dispatcher.currentPageErrors.error.class === \'alert-danger\' && !dispatcher.currentPageValid && dispatcher.currentPageAttempt}">\n      <label for="P_MIDDLE_NAME" translate="intro.respondent.middleName"></label>\n      <input\n        type="text"\n        aria-required="true"\n        ng-model="roster[0].P_MIDDLE_NAME"\n        title="Middle Name"\n        name="P_MIDDLE_NAME"\n        ng-maxlength="20"\n        maxlength="20"\n        ng-size="20"\n        size="20"\n        class="input-full form-control"\n        id="P_MIDDLE_NAME"\n        gid="1"\n      >\n    </div>\n\n    <div class="form-group col-xs-12 col-sm-4 col-md-3 col-lg-2" ng-class="{\'has-error\':dispatcher.currentPageErrors.error.class === \'alert-danger\' && !dispatcher.currentPageValid && dispatcher.currentPageAttempt}" >\n      <label for="P_LAST_NAME" translate="intro.respondent.lastName"></label>\n      <input\n        type="text"\n        aria-required="true"\n        ng-model="roster[0].P_LAST_NAME"\n        title="Last Name "\n        name="P_LAST_NAME"\n        ng-maxlength="20"\n        maxlength="20"\n        ng-size="20"\n        size="20"\n        class="input-full form-control"\n        id="P_LAST_NAME"\n        gid="1"\n      >\n    </div>\n  </div>\n\n  <p>\n    <label for="RESP_PHONE" translate="intro.respondent.telephone"></label>\n  </p>\n  <div class="row">\n    <div class="form-group telephone-form col-xs-12 col-sm-5 col-md-3 col-lg-2">\n      <div class="row no-gutter text-center" reverse-children-on-rtl>\n        <div class="col-xs-3" ng-class="{\'has-error\':dispatcher.currentPageErrors.error.class === \'alert-info\' && !dispatcher.currentPageValid && dispatcher.currentPageAttempt}">\n          <input\n            type="text"\n            aria-required="true"\n            class="input-full is-number regular-font-size form-control has-tel-padding"\n            id="RESP_PHONE"\n            name="RESP_PH_AREA_ID"\n            title="Area Code"\n            ng-model="model.RESP_PH_AREA_ID"\n            auto-tab-to="RESP_PH_PREFIX_ID"\n            ng-maxlength="3"\n            maxlength="3"\n            input-filter="^[1-9][0-9]{0,2}$"\n            inputmode="decimal"\n            pattern="[0-9]*"\n          >\n        </div>\n        <div class="col-xs-1">-</div>\n        <div class="col-xs-3" ng-class="{\'has-error\':dispatcher.currentPageErrors.error.class === \'alert-info\' && !dispatcher.currentPageValid && dispatcher.currentPageAttempt}">\n          <label for="RESP_PH_PREFIX_ID" class="sr-only">Phone Number Prefix</label>\n          <input\n            type="text"\n            aria-required="true"\n            class="input-full is-number regular-font-size form-control has-tel-padding"\n            id="RESP_PH_PREFIX_ID"\n            name="RESP_PH_PREFIX_ID"\n            title="Prefix"\n            ng-model="model.RESP_PH_PREFIX_ID"\n            auto-tab-to="RESP_PH_SUFFIX_ID"\n            ng-maxlength="3"\n            maxlength="3"\n            ng-size="3"\n            size="1"\n            input-filter="^[1-9][0-9]{0,2}$"\n            inputmode="decimal"\n            pattern="[0-9]*"\n          >\n        </div>\n        <div class="col-xs-1">-</div>\n        <div class="col-xs-4" ng-class="{\'has-error\':dispatcher.currentPageErrors.error.class === \'alert-info\' && !dispatcher.currentPageValid && dispatcher.currentPageAttempt}">\n          <label for="RESP_PH_SUFFIX_ID" class="sr-only">Phone Number Suffix</label>\n          <input\n            type="text"\n            aria-required="true"\n            class="input-full is-number regular-font-size form-control has-tel-padding"\n            id="RESP_PH_SUFFIX_ID"\n            name="RESP_PH_SUFFIX_ID"\n            title="Suffix"\n            ng-model="model.RESP_PH_SUFFIX_ID"\n            ng-maxlength="4"\n            maxlength="4"\n            ng-size="4"\n            size="2"\n            input-filter="^[0-9]*$"\n            inputmode="decimal"\n            pattern="[0-9]*"\n          >\n        </div>\n      </div>\n    </div>\n  </div>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.class"></div>\n</div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.rr_address.question"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/rr_address.help.partial.html\'"></help>\n</p>\n\n<form class="form" role="form" name="currentForm" novalidate>\n  <div class="row" reverse-children-on-rtl>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_RR_DESC_TEXT}">\n      <label for="RR_Descriptor" translate="intro.rr_address.descriptor"></label>\n      <select class="form-control" aria-required="true" name="RR_Descriptor" id="RR_Descriptor" title="Rural Route Descriptor" ng-model="model.a10.ADR_RR_DESC_TEXT">\n        <option value=""></option>\n        <option value="RR">RR</option>\n        <option value="HC">HC</option>\n        <option value="SR">SR</option>\n        <option value="PS">PS</option>\n        <option value="RTE">RTE</option>\n      </select>\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_RR_NUM_TEXT}">\n      <label for="ADR_RR_NUM_TEXT" translate="intro.rr_address.number"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="ADR_RR_NUM_TEXT"\n        name="ADR_RR_NUM_TEXT"\n        title="Address Number"\n        ng-maxlength="10"\n        maxlength="10"\n        ng-size="10"\n        size="10"\n        ng-model="model.a10.ADR_RR_NUM_TEXT">\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_RR_BOX_NUM_TEXT}">\n      <label for="ADR_RR_BOX_NUM_TEXT" translate="intro.rr_address.box"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="ADR_RR_BOX_NUM_TEXT"\n        name="ADR_RR_BOX_NUM_TEXT"\n        title="Box ID Number"\n        ng-maxlength="10"\n        maxlength="10"\n        ng-size="10"\n        size="10"\n        ng-model="model.a10.ADR_RR_BOX_NUM_TEXT">\n    </div>\n  </div>\n\n  <div class="row" reverse-children-on-rtl>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' &&  dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_CITY_TEXT}">\n      <label for="ADR_CITY_TEXT" translate="intro.rr_address.city"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="ADR_CITY_TEXT"\n        name="ADR_CITY_TEXT"\n        title="City"\n        ng-maxlength="100"\n        maxlength="100"\n        ng-model="model.a10.ADR_CITY_TEXT">\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_STATE_TEXT}">\n      <label for="ADR_STATE_TEXT" translate="intro.rr_address.state"></label>\n      <select class="form-control"\n        name="ADR_STATE_TEXT"\n        aria-required="true"\n        id="ADR_STATE_TEXT"\n        title="State"\n        ng-model="model.a10.ADR_STATE_TEXT"\n        ng-options="name for (name, value) in states">\n      </select>\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_ZIP_TEXT}">\n      <label for="ADR_ZIP_TEXT" translate="intro.rr_address.zip"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control is-number"\n        id="ADR_ZIP_TEXT"\n        ng-model="model.a10.ADR_ZIP_TEXT"\n        name="ADR_ZIP_TEXT"\n        title="Zip Code"\n        maxlength="5"\n        ng-maxlength="5"\n        ng-size="5"\n        size="5"\n        input-filter="^[0-9]*$"\n        ng-pattern="/^[0-9]+$/"\n        inputmode="decimal"\n        pattern="[0-9]*"\n      >\n    </div>\n  </div>\n  <p><strong translate="intro.rr_address.info"></strong></p>\n  <p><span translate="intro.rr_address.ex"></span></p>\n  <div class="row">\n    <div class="form-group col-sm-6" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_LOC_DESC_TEXT}">\n      <textarea\n        rtl-default-dir="rtl"\n        aria-required="true"\n        class="form-control"\n        rows="2"\n        style="width:100%;"\n        title="Physical location description"\n        ng-model="model.a10.ADR_LOC_DESC_TEXT"\n        ng-maxlength="250"\n        maxlength="250"\n        ng-required="true"\n        name="ADR_LOC_DESC_TEXT">\n      </textarea>\n    </div>\n  </div>\n\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="intro.rural_route.error" ng-if="dispatcher.currentPageAttempt == 1 && dispatcher.currentPageErrors"></div>\n\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.rural_route.question"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/rural_route.help.partial.html\'"></help>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n    <div class="radio" ng-init="radios = [\'ADR_IS_RURAL_YES_IND\', \'ADR_IS_RURAL_NO_IND\']">\n      <label>\n        <input\n          type="radio"\n          id="RuralRoute_yes"\n          name="RURALROUTE"\n          title="Yes"\n          value="1"\n          ng-required="true"\n          ng-model="model.ADR_IS_RURAL_YES_IND"\n          ng-change="radioChanged(\'ADR_IS_RURAL_YES_IND\', radios)">\n        <span translate="intro.rural_route.yes"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="RuralRoute_no"\n          name="RURALROUTE"\n          title="No"\n          value="1"\n          ng-required="true"\n          ng-model="model.ADR_IS_RURAL_NO_IND"\n          ng-change="radioChanged(\'ADR_IS_RURAL_NO_IND\', radios)">\n        <span translate="intro.rural_route.no"></span>\n      </label>\n    </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.class"></div>\n</div>\n<p>\n  <p>\n    <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.stan_other_address.questionText1"></strong>\n    <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/stan_residence.help.partial.html\'"></help>\n  </p>\n  <p>\n    <strong role="heading" aria-level="2" translate="intro.stan_other_address.questionText2"></strong>\n  </p>\n  <p class="animated" ng-if="!intro.getReviseFlag(\'stan_other_address\')">\n    <strong role="heading" aria-level="2" translate="intro.stan_other_address.questionText3"></strong>\n  </p>\n</p>\n\n<div class="address-dark">\n  <span class="preserve-line-break" reverse-children-on-rtl> {{ dispatcher.metadata.formattedAddress }} </span>\n</div>\n\n<div class="row animated" ng-if="!intro.getReviseFlag(\'stan_other_address\')">\n  <div class="col-xs-6 col-sm-2 col-sm-offset-8">\n    <button type="button" ng-click="intro.setReviseFlag(\'stan_other_address\'); intro.populateA12OtherFields();" class="btn btn-block center-block form-button button-previous" title="Revise" name="Revise" alt="Revise"><span translate="intro.stan_other_address.revise"></span></button>\n  </div>\n  <div class="col-xs-6 col-sm-2">\n    <button type="button" ng-click="dispatcher.next()" class="btn btn-primary btn-block center-block form-button button-next" title="Submit" name="Submit" alt="Submit"><span translate="intro.stan_other_address.submit"></span></button>\n  </div>\n</div>\n\n<div class="row animated" ng-if="intro.getReviseFlag(\'stan_other_address\')">\n  <hr role="presentation" aria-hidden="true" />\n  <p><strong translate="intro.stan_other_address.questionText4"></strong></p>\n  <form class="form" role="form" name="currentForm" novalidate>\n    <div class="row" reverse-children-on-rtl>\n      <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_CITY_TEXT}">\n        <label for="ADDR_CITY" translate="intro.residence.city"></label>\n        <input\n            type="text"\n            aria-required="true"\n            class="form-control"\n            id="SO_ADR_CITY_TEXT"\n            name="SO_ADR_CITY_TEXT"\n            title="City"\n            ng-maxlength="100"\n            maxlength="100"\n            ng-model="model.a12.ADR_CITY_TEXT">\n      </div>\n\n      <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_STATE_TEXT}">\n        <label for="SO_ADR_STATE_TEXT" translate="intro.residence.state"></label>\n        <select class="form-control"\n          name="SO_ADR_STATE_TEXT"\n          aria-required="true"\n          id="SO_ADR_STATE_TEXT"\n          title="State"\n          ng-model="model.a12.ADR_STATE_TEXT"\n          ng-options="name for (name, value) in states">\n        </select>\n      </div>\n      <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_ZIP_TEXT}">\n        <label for="SO_ADR_ZIP_TEXT" translate="intro.residence.zip"></label>\n        <input\n            type="text"\n            aria-required="true"\n            class="form-control"\n            id="SO_ADR_ZIP_TEXT"\n            ng-model="model.a12.ADR_ZIP_TEXT"\n            name="SO_ADR_ZIP_TEXT"\n            title="Zip Code"\n            maxlength="5"\n            ng-maxlength="5"\n            input-filter="^[0-9]*$"\n            ng-pattern="/^[0-9]+$/"\n            inputmode="decimal"\n            pattern="[0-9]*"\n        >\n      </div>\n    </div>\n    <formbuttons custom-next-name="\'intro.stan_other_address.submit\'" dispatcher="intro.dispatcher"></formbuttons>\n  </form>\n</div>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.class"></div>\n</div>\n<p>\n  <p>\n    <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.stan_residence.questionText1"></strong>\n    <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/stan_residence.help.partial.html\'"></help>\n  </p>\n  <p>\n    <strong role="heading" aria-level="2" translate="intro.stan_residence.questionText2" ></strong>\n  </p>\n  <p class="animated" ng-if="!intro.getReviseFlag(\'stan_residence\')">\n    <strong role="heading" aria-level="2" translate="intro.stan_residence.questionText3"></strong>\n  </p>\n</p>\n\n<div class="address-dark">\n  <bdo dir="ltr">\n    <span class="preserve-line-break"> {{ dispatcher.metadata.formattedAddress }} </span>\n  </bdo>\n</div>\n\n<div class="row animated" ng-if="!intro.getReviseFlag(\'stan_residence\')">\n  <div class="col-xs-6 col-sm-2 col-sm-offset-8">\n    <button type="button" ng-click="intro.setReviseFlag(\'stan_residence\'); intro.createResidenceFields(\'SR\');" class="btn btn-block center-block form-button button-previous" title="Revise" name="Revise" alt="Revise"><span translate="intro.stan_residence.revise"></span></button>\n  </div>\n  <div class="col-xs-6 col-sm-2">\n    <button type="button" ng-click="dispatcher.next()" class="btn btn-primary btn-block center-block form-button button-next" title="Submit" name="Submit" alt="Submit"><span translate="intro.stan_residence.submit"></span></button>\n  </div>\n</div>\n\n<div class="row animated" ng-if="intro.getReviseFlag(\'stan_residence\')">\n  <hr role="presentation" aria-hidden="true" />\n  <p class="strong" translate="intro.stan_residence.note"></p>\n   <form class="form" role="form" name="currentForm" novalidate>\n      <div class="row" reverse-children-on-rtl>\n        <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_STNU_TEXT}">\n          <label for="SR_ADR_STNU_TEXT" class="control-label" translate="intro.residence.houseNumber"></label>\n          <span class="example-text" translate="intro.residence.exampleStreetNumber" aria-hidden="true"></span>\n          <span class="sr-only">Example Address Number: 101</span>\n          <input\n            type="text"\n            aria-required="true"\n            class="form-control"\n            id="SR_ADR_STNU_TEXT"\n            title="Address Number"\n            ng-model="model.a12.ADR_STNU_TEXT"\n            ng-maxlength="20"\n            maxlength="20"\n            size="7"\n            name="SR_ADR_STNU_TEXT"\n            >\n        </div>\n        <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_STNM_TEXT}">\n          <label for="SR_ADR_STNM_TEXT" translate="intro.residence.streetName"></label>\n          <span class="example-text" translate="intro.residence.exampleStreetName" aria-hidden="true"></span>\n          <span class="sr-only">Example Street Name: N Main St</span>\n          <input\n            type="text"\n            aria-required="true"\n            class="form-control"\n            id="SR_ADR_STNM_TEXT"\n            title="Street Name"\n            name="SR_ADR_STNM_TEXT"\n            ng-maxlength="50"\n            maxlength="50"\n            ng-model="model.a12.ADR_STNM_TEXT">\n        </div>\n        <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width">\n          <label for="SR_ADR_UNIT_TEXT" translate="intro.residence.aptNumber"></label>\n          <span class="example-text" translate="intro.residence.exampleStreetUnit" aria-hidden="true"></span>\n          <span class="sr-only">Example Apartment or Unit Number: Apt 23</span>\n          <input type="text" class="form-control" id="SR_ADR_UNIT_TEXT"\n            name="SR_ADR_UNIT_TEXT"\n            title="Apt/Unit"\n            ng-maxlength="50"\n            maxlength="50"\n            size="11"\n            ng-model="model.a12.ADR_UNIT_TEXT">\n        </div>\n      </div>\n\n      <div class="row" reverse-children-on-rtl>\n        <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_CITY_TEXT}">\n          <label for="SR_ADR_CITY_TEXT" translate="intro.residence.city"></label>\n          <input\n              type="text"\n              aria-required="true"\n              class="form-control"\n              id="SR_ADR_CITY_TEXT"\n              name="SR_ADR_CITY_TEXT"\n              title="City"\n              ng-maxlength="100"\n              maxlength="100"\n              ng-model="model.a12.ADR_CITY_TEXT">\n        </div>\n\n        <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_STATE_TEXT}">\n          <label for="SR_ADR_STATE_TEXT" translate="intro.residence.state"></label>\n          <select\n            aria-required="true"\n            class="form-control"\n            name="SR_ADR_STATE_TEXT"\n            id="SR_ADR_STATE_TEXT"\n            title="State"\n            ng-model="model.a12.ADR_STATE_TEXT"\n            ng-options="name for (name, value) in states">\n          </select>\n        </div>\n        <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_ZIP_TEXT}">\n          <label for="SR_ADR_ZIP_TEXT" class="control-label" translate="intro.residence.zip"></label>\n          <input\n              type="text"\n              aria-required="true"\n              class="form-control"\n              id="SR_ADR_ZIP_TEXT"\n              ng-model="model.a12.ADR_ZIP_TEXT"\n              name="SR_ADR_ZIP_TEXT"\n              title="Zip Code"\n              maxlength="5"\n              ng-maxlength="5"\n              size="5"\n              ng-pattern="/^[0-9]+$/"\n              input-filter="^[0-9]*$"\n              inputmode="decimal"\n              pattern="[0-9]*"\n          >\n        </div>\n      </div>\n    <formbuttons dispatcher="intro.dispatcher" custom-next-name="\'intro.stan_other_address.submit\'"></formbuttons>\n  </form>\n</div>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.class"></div>\n</div>\n<p>\n  <p>\n    <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.stan_rr_address.questionText1"></strong>\n    <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/stan_residence.help.partial.html\'"></help>\n  </p>\n  <p>\n    <strong role="heading" aria-level="2" translate="intro.stan_rr_address.questionText2"></strong>\n  </p>\n  <p class="animated" ng-if="!intro.getReviseFlag(\'stan_rr_address\')">\n    <strong role="heading" aria-level="2" translate="intro.stan_rr_address.questionText3"></strong>\n  </p>\n</p>\n\n<div class="address-dark">\n  <bdo dir="ltr">\n    <span class="preserve-line-break"> {{ dispatcher.metadata.formattedAddress }} </span>\n  </bdo>\n</div>\n\n<div class="row animated" ng-if="!intro.getReviseFlag(\'stan_rr_address\')">\n  <div class="col-xs-6 col-sm-2 col-sm-offset-8">\n    <button type="button" ng-click="intro.setReviseFlag(\'stan_rr_address\'); intro.populateA12RRFields();" class="btn btn-block center-block form-button button-previous" title="Revise" name="Revise" alt="Revise"><span translate="intro.stan_rr_address.revise"></span></button>\n  </div>\n  <div class="col-xs-6 col-sm-2">\n    <button type="button" ng-click="dispatcher.next()" class="btn btn-primary btn-block center-block form-button button-next" title="Submit" name="Submit" alt="Submit"><span translate="intro.stan_rr_address.submit"></span></button>\n  </div>\n</div>\n\n<div class="row animated" ng-if="intro.getReviseFlag(\'stan_rr_address\')">\n  <hr role="presentation" aria-hidden="true" />\n  <p>\n    <strong translate="intro.stan_rr_address.questionText4"></strong>\n  </p>\n  <form class="form" role="form" name="currentForm" novalidate>\n  <div class="row" reverse-children-on-rtl>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_RR_DESC_TEXT}">\n      <label for="RR_Descriptor" translate="intro.rr_address.descriptor"></label>\n      <select class="form-control" aria-required="true" name="RR_Descriptor" id="RR_Descriptor" title="Rural Route Descriptor" ng-model="model.a12.ADR_RR_DESC_TEXT" >\n        <option value=""></option>\n        <option value="RR">RR</option>\n        <option value="HC">HC</option>\n        <option value="SR">SR</option>\n        <option value="PS">PS</option>\n        <option value="RTE">RTE</option>\n      </select>\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_RR_NUM_TEXT}">\n      <label for="SRR_ADR_RR_NUM_TEXT" translate="intro.rr_address.number"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="SRR_ADR_RR_NUM_TEXT"\n        name="SRR_ADR_RR_NUM_TEXT"\n        title="Route Number"\n        ng-maxlength="10"\n        maxlength="10"\n        ng-model="model.a12.ADR_RR_NUM_TEXT">\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_RR_BOX_NUM_TEXT}">\n      <label for="SRR_ADR_RR_BOX_NUM_TEXT" translate="intro.rr_address.box"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="SRR_ADR_RR_BOX_NUM_TEXT"\n        name="SRR_ADR_RR_BOX_NUM_TEXT"\n        title="BOX ID Number"\n        ng-maxlength="10"\n        maxlength="10"\n        ng-model="model.a12.ADR_RR_BOX_NUM_TEXT">\n    </div>\n  </div>\n\n  <div class="row" reverse-children-on-rtl>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_CITY_TEXT}">\n      <label for="SRR_ADR_CITY_TEXT" translate="intro.residence.city"></label>\n      <input\n          type="text"\n          aria-required="true"\n          class="form-control"\n          id="SRR_ADR_CITY_TEXT"\n          name="SRR_ADR_CITY_TEXT"\n          title="City"\n          ng-maxlength="100"\n          maxlength="100"\n          ng-model="model.a12.ADR_CITY_TEXT">\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_STATE_TEXT}">\n      <label for="SRR_ADR_STATE_TEXT" translate="intro.residence.state"></label>\n      <select\n        class="form-control"\n        aria-required="true"\n        name="SRR_ADR_STATE_TEXT"\n        id="SRR_ADR_STATE_TEXT"\n        title="State"\n        ng-model="model.a12.ADR_STATE_TEXT"\n        ng-options="name for (name, value) in states">\n      </select>\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a12.ADR_ZIP_TEXT}">\n      <label for="SRR_ADR_ZIP_TEXT" translate="intro.residence.zip"></label>\n      <input\n          type="text"\n          aria-required="true"\n          class="form-control"\n          id="SRR_ADR_ZIP_TEXT"\n          ng-model="model.a12.ADR_ZIP_TEXT"\n          name="SRR_ADR_ZIP_TEXT"\n          title="Zip Code"\n          maxlength="5"\n          ng-maxlength="5"\n          input-filter="^[0-9]*$"\n          ng-pattern="/^[0-9]+$/"\n          inputmode="decimal"\n          pattern="[0-9]*"\n      >\n    </div>\n  </div>\n      <formbuttons custom-next-name="\'intro.stan_rr_address.submit\'" dispatcher="intro.dispatcher"></formbuttons>\n  </form>\n</div>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="intro.state.error1" ng-if="dispatcher.currentPageAttempt >= 1 && !dispatcher.currentFormValid"></div>\n<p>\n  <b id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.state.questionText"></b>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/state.help.partial.html\'"></help>\n</p>\n<p><b translate="intro.state.questionTip"></b></p>\n</p>\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <div class="form-group">\n    <div class="radio">\n      <label for="RESP_LOC_OCD_CTRY_CODE_US">\n        <input\n          id="RESP_LOC_OCD_CTRY_CODE_US"\n          type="radio"\n          name="RESP_LOC_OCD_CTRY_CODE"\n          ng-required="true"\n          value="1"\n          ng-model="model.RESP_LOC_OCD_CTRY_CODE">\n        <span translate="intro.state.us"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label for="RESP_LOC_OCD_CTRY_CODE_PR">\n        <input\n          id="RESP_LOC_OCD_CTRY_CODE_PR"\n          type="radio"\n          name="RESP_LOC_OCD_CTRY_CODE"\n          ng-required="true"\n          value="2"\n          ng-model="model.RESP_LOC_OCD_CTRY_CODE">\n        <span translate="intro.state.pr"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label for="RESP_LOC_OCD_CTRY_CODE_OTHER">\n        <input\n          id="RESP_LOC_OCD_CTRY_CODE_OTHER"\n          type="radio"\n          name="RESP_LOC_OCD_CTRY_CODE"\n          ng-required="true"\n          value="3"\n          ng-model="model.RESP_LOC_OCD_CTRY_CODE">\n        <span translate="intro.state.other"></span>\n      </label>\n    </div>\n  </div>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="intro.generic.error" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentFormValid"></div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.urb.questionText"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/urb.help.partial.html\'"></help>\n</p>\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n  <div class="radio" ng-init="radios = [\'ADR_IS_URB_YES_IND\', \'ADR_IS_URB_NO_IND\']">\n    <label>\n      <input\n        type="radio"\n        id="URB_YES"\n        name="URB"\n        title="Yes"\n        ng-required="true"\n        value="1"\n        ng-model="model.ADR_IS_URB_YES_IND"\n        ng-change="radioChanged(\'ADR_IS_URB_YES_IND\', radios)">\n      <span translate="intro.generic.yes"></span>\n    </label>\n  </div>\n  <div class="radio">\n    <label>\n      <input\n        type="radio"\n        id="URB_NO"\n        name="URB"\n        title="No"\n        ng-required="true"\n        value="1"\n        ng-model="model.ADR_IS_URB_NO_IND"\n        ng-change="radioChanged(\'ADR_IS_URB_NO_IND\', radios)">\n      <span translate="intro.generic.no"></span>\n    </label>\n  </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div>\n  <div\n    role="alert"\n    class="alert {{ dispatcher.currentPageErrors.error.class }}"\n    translate="{{ dispatcher.currentPageErrors.error.message }}"\n    ng-if="dispatcher.currentPageErrors.error.message"></div>\n</div>\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.address_generics.question"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/urb_address.help.partial.html\'"></help>\n</p>\n\n<p class="questionTip" translate="intro.address_generics.questionTip"></p>\n<br/>\n<form class="form" role="form" name="currentForm" novalidate>\n  <div class="row">\n    <div class="form-group col-sm-6" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !model.a10.ADR_PR_URB_NAME}">\n      <label for="ADR_PR_URB_NAME" translate="intro.urb_address.urbName"></label>\n      <span class="example-text"  translate="intro.pr_addresses.urb" aria-hidden="true"></span>\n      <span class="sr-only">Example Urbanización Name: URB José Martí or URB Los Jardines de Caguas</span>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="ADR_PR_URB_NAME"\n        title="Urbanización Name"\n        name="ADR_PR_URB_NAME"\n        ng-maxlength="50"\n        maxlength="50"\n        ng-model="model.a10.ADR_PR_URB_NAME">\n    </div>\n  </div>\n  <div class="row">\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !model.a10.ADR_STNU_TEXT}">\n      <label for="ADR_STNU_TEXT" translate="intro.address_generics.houseNumber"></label>\n      <span class="example-text" translate="intro.pr_addresses.example1" aria-hidden="true"></span>\n      <span class="sr-only">Example Address Number: 100 or 5007</span>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="ADR_STNU_TEXT"\n        title="Address Number"\n        ng-model="model.a10.ADR_STNU_TEXT"\n        ng-maxlength="20"\n        maxlength="20"\n        name="ADR_STNU_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width">\n      <label for="ADR_STNM_TEXT" translate="intro.address_generics.streetName"></label>\n      <span class="example-text" translate="intro.pr_addresses.example2" aria-hidden="true"></span>\n      <span class="sr-only">Example Street Name: CLL 10 or AVE FD Roosevelt</span>\n      <input type="text"\n             class="form-control"\n             id="ADR_STNM_TEXT"\n             title="Street Name"\n             name="ADR_STNM_TEXT"\n             ng-maxlength="100"\n             maxlength="100"\n             ng-model="model.a10.ADR_STNM_TEXT">\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width">\n      <label for="ADR_UNIT_TEXT" translate="intro.address_generics.unitText"></label>\n      <span class="example-text" translate="intro.pr_addresses.example3" aria-hidden="true"></span>\n      <span class="sr-only">Example Apartment or Unit: Torre 5-10, or Apt. B, or 45-9</span>\n      <input type="text"\n             class="form-control"\n             id="ADR_UNIT_TEXT"\n             title="Apt/Unit"\n             ng-model="model.a10.ADR_UNIT_TEXT"\n             ng-maxlength="40"\n             maxlength="40"\n             name="ADR_UNIT_TEXT"\n      >\n    </div>\n  </div>\n  <div class="row">\n    <div class="form-group col-sm-4 col-md-3 col-lg-2 address-col-min-width" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !model.a10.ADR_PR_MUNI_NAME}">\n      <label for="ADR_PR_MUNI_NAME" translate="intro.address_generics.muniName"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control"\n        id="ADR_PR_MUNI_NAME"\n        title="Municipio Name"\n        name="ADR_PR_MUNI_NAME"\n        ng-maxlength="100"\n        maxlength="100"\n        ng-model="model.a10.ADR_PR_MUNI_NAME">\n    </div>\n    <div class="form-group col-sm-2">\n      <label for="ADR_STATE_TEXT" translate="intro.address_generics.pr"></label>\n      <input type="text"\n             class="form-control"\n             id="ADR_STATE_TEXT"\n             title="State"\n             ng-model="model.a10.ADR_STATE_TEXT"\n             placeholder="PR"\n             ng-maxlength="20"\n             maxlength="20"\n             ng-size="2"\n             size="2"\n             ng-disabled="true"\n             ng-init="model.a10.ADR_STATE_TEXT = \'PR\'"\n             name="ADR_STATE_TEXT"\n      >\n    </div>\n    <div class="form-group col-sm-4 col-md-3 col-lg-2" ng-class="{\'has-error\': dispatcher.currentPageErrors.error.class === \'alert-danger\' && dispatcher.currentPageAttempt && !model.a10.ADR_ZIP_TEXT}">\n      <label for="ADR_ZIP_TEXT" translate="intro.address_generics.zip"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="form-control is-number"\n        id="ADR_ZIP_TEXT"\n        name="ADR_ZIP_TEXT"\n        title="Zip Code"\n        ng-model="model.a10.ADR_ZIP_TEXT"\n        ng-maxlength="5"\n        maxlength="5"\n        ng-size="5"\n        size="5"\n        input-filter="^[0-9]*$"\n        inputmode="decimal"\n        pattern="[0-9]*"\n      >\n    </div>\n  </div>\n  <div class="row">\n    <div class="form-group col-sm-6" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !model.a10.ADR_LOC_DESC_TEXT}">\n      <label><strong translate="intro.address_generics.por"></strong></label>\n      <p class="questionTip" translate="intro.address_generics.porTip"></p>\n        <textarea\n          id="ADR_LOC_DESC_TEXT"\n          aria-required="true"\n          rows="2"\n          rtl-default-dir="rtl"\n          class="form-control"\n          style="width:100%"\n          title="Points of Reference"\n          ng-model="model.a10.ADR_LOC_DESC_TEXT"\n          ng-maxlength="250"\n          maxlength="250"\n          ng-required="true"\n          name="ADR_LOC_DESC_TEXT">\n        </textarea>\n    </div>\n  </div>\n\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="intro.vacancy.error" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentPageValid"></div>\n\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.vacancy.questionText"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/vacancy.help.partial.html\'"></help>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n    <div class="radio" ng-init="radios = [\'H_VAC_FORRENT_IND\', \'H_VAC_RENTNOTOCC_IND\', \'H_VAC_FORSALE_IND\', \'H_VAC_SOLDNOTOCC_IND\', \'H_VAC_SEASON_IND\', \'H_VAC_MIGRANT_IND\', \'H_VAC_OTHER_IND\']">\n      <label>\n        <input\n          type="radio"\n          id="VACANCY_FOR_RENT"\n          name="VACANCY"\n          title="For Rent"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_VAC_FORRENT_IND"\n          ng-change="radioChanged(\'H_VAC_FORRENT_IND\', radios)">\n        <span translate="intro.vacancy.forRent"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="VACANCY_RENTED_NOT_OCCUPIED"\n          name="VACANCY"\n          title="Rented Not Occupied"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_VAC_RENTNOTOCC_IND"\n          ng-change="radioChanged(\'H_VAC_RENTNOTOCC_IND\', radios)">\n        <span translate="intro.vacancy.rentedNotOccupied"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="VACANCY_FOR_SALE"\n          name="VACANCY"\n          title="For Sale"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_VAC_FORSALE_IND"\n          ng-change="radioChanged(\'H_VAC_FORSALE_IND\', radios)">\n        <span translate="intro.vacancy.forSale"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="VACANCY_SOLD"\n          name="VACANCY"\n          title="Sold"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_VAC_SOLDNOTOCC_IND"\n          ng-change="radioChanged(\'H_VAC_SOLDNOTOCC_IND\', radios)">\n        <span translate="intro.vacancy.sold"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="VACANCY_SEASONAL"\n          name="VACANCY"\n          title="Seasonal"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_VAC_SEASON_IND"\n          ng-change="radioChanged(\'H_VAC_SEASON_IND\', radios)">\n        <span translate="intro.vacancy.seasonal"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="VACANCY_MIGRANT"\n          name="VACANCY"\n          title="Migrant"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_VAC_MIGRANT_IND"\n          ng-change="radioChanged(\'H_VAC_MIGRANT_IND\', radios)">\n        <span translate="intro.vacancy.migrant"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="VACANCY_OTHER_VACANT"\n          name="VACANCY"\n          title="Other Vacant"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_VAC_OTHER_IND"\n          ng-change="radioChanged(\'H_VAC_OTHER_IND\', radios)">\n        <span translate="intro.vacancy.otherVacant"></span>\n      </label>\n    </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.verify.questionText"></strong>\n</p>\n\n<form class="form" role="form" name="currentForm" novalidate>\n  <p>\n    <div class="row">\n      <div id="census-id-wrapper" class="col-xs-12 col-sm-6 col-md-3">\n        <div id="census-id-block" class="row no-gutter text-center">\n          <div class="col-xs-3">\n            <label for="RESP_VERIFIED_USER_ID1" class="sr-only" translate="intro.verify.un1"></label>\n            <input\n              type="text"\n              class="login-UN input-full"\n              id="RESP_VERIFIED_USER_ID1"\n              name="RESP_VERIFIED_USER_ID1"\n              title="Verify ID Page ID Field 1 Write In"\n              ng-model="model.RESP_VERIFIED_USER_ID1"\n              ng-maxlength="4"\n              maxlength="4"\n              auto-tab-to="RESP_VERIFIED_USER_ID2"\n              size="2">\n          </div>\n          <div class="col-xs-1">-</div>\n          <div class="col-xs-3">\n            <label for="VERIFYID_UN2" class="sr-only" translate="intro.verify.un2"></label>\n            <input\n              type="text"\n              class="login-UN input-full"\n              id="RESP_VERIFIED_USER_ID2"\n              name="RESP_VERIFIED_USER_ID2"\n              title="Verify ID Page ID Field 2 Write In"\n              ng-model="model.RESP_VERIFIED_USER_ID2"\n              ng-maxlength="4"\n              maxlength="4"\n              auto-tab-to="RESP_VERIFIED_USER_ID3"\n              size="2">\n          </div>\n          <div class="col-xs-1">-</div>\n          <div class="col-xs-3">\n            <label for="VERIFYID_UN3" class="sr-only" translate="intro.verify.un3"></label>\n            <input\n              type="text"\n              class="login-UN input-full"\n              id="RESP_VERIFIED_USER_ID3"\n              name="RESP_VERIFIED_USER_ID3"\n              title="Verify ID Page ID Field 3 Write In"\n              ng-model="model.RESP_VERIFIED_USER_ID3"\n              ng-maxlength="4"\n              maxlength="4"\n              size="1">\n          </div>\n        </div>\n      </div>\n    </div>\n  </p>\n\n  <formbuttons dispatcher="intro.dispatcher" next-disabled="model.RESP_VERIFIED_USER_ID1.length !== 4 || model.RESP_VERIFIED_USER_ID2.length !== 4 || model.RESP_VERIFIED_USER_ID3.length !== 4"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="intro.verifyaddress.error" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentPageValid"></div>\n\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="intro.verifyaddress.questionText"></strong>\n  <help title="\'Help\'" part="\'app/intro/help\'" content="\'/static/partials/verifyaddress.help.partial.html\'"></help>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n    <div class="radio" ng-init="radios = [\'H_OCC_YES_IND\', \'H_OCC_NO_IND\']">\n      <label>\n        <input\n          type="radio"\n          id="verifyaddress_yes"\n          name="VERIFYADDRESS"\n          title="Yes"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_OCC_YES_IND"\n          ng-change="radioChanged(\'H_OCC_YES_IND\', radios)">\n        <span translate="intro.verifyaddress.yes"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="verifyaddress_no"\n          name="VERIFYADDRESS"\n          title="No"\n          ng-required="true"\n          value="1"\n          ng-model="model.H_OCC_NO_IND"\n          ng-change="radioChanged(\'H_OCC_NO_IND\', radios)">\n        <span translate="intro.verifyaddress.no"></span>\n      </label>\n    </div>\n  </p>\n  <formbuttons dispatcher="intro.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div ng-show="data.respondent.closeout.metadata.finished">\n  <submitsurvey></submitsurvey>\n<hr role="presentation" aria-hidden="true" />\n</div>\n<div class="row dashboard-row">\n  <div class="col-md-2 center-text-xs">\n    <i aria-hidden="true" ng-class="{ \'icon-transparent\': state != \'review\' }" class="fa fa-check-square-o green dashboard-item-icon-3" style="margin-top:20px"></i>\n    <i aria-hidden="true" class="fa fa-home dashboard-item-icon-1"></i>\n  </div>\n  <div class="col-md-8">\n    <div class="center-text-xs">\n      <span class="h3"><strong translate="dashboard.householdQuestions"></strong></span>\n    </div>\n    <p ng-if="!data.respondent.household.metadata.started" translate="dashboard.startHousehold"></p>\n  </div>\n  <div class="col-md-2">\n    <div class="pull-right">\n      <button ng-hide="state == \'review\'" type="button" ng-click="household.dispatcher.enter()" name="{{state}}" class="btn btn-full form-button" ng-class="householdButtonClass"><span translate-attr="{ title: \'dashboard.\' + state }" translate="{{ \'dashboard.\' + state}}"></span></button>\n    </div>\n  </div>\n</div>\n<hr role="presentation" aria-hidden="true" />\n<div aria-hidden="{{ data.respondent.household.metadata.finished ? false : true }}" class="row dashboard-row" ng-class="{ \'grey\': !data.respondent.household.metadata.finished }">\n  <div class="col-md-2 center-text-xs">\n    <i aria-hidden="true" ng-class="{ \'icon-transparent\': !shouldShowFinalQuestions() }" class="fa fa-check-square-o green dashboard-item-icon-3" style="margin-top:20px"></i>\n    <i aria-hidden="true" class="fa fa-users dashboard-item-icon-2"></i>\n  </div>\n  <div class="col-md-8">\n    <div class="center-text-xs">\n      <span class="h3"><strong translate="dashboard.peopleQuestions"></strong></span>\n    </div>\n    <p ng-if="shouldShowPeopleStart()" translate="dashboard.peopleStart"></p>\n  </div>\n  <div class="col-md-2">\n  </div>\n</div>\n<hr role="presentation" aria-hidden="true" ng-if="data.respondent.household.metadata.finished"/>\n<fieldset  ng-disabled="!data.respondent.household.metadata.finished">\n  <div ng-if="data.respondent.household.metadata.finished">\n    <person ng-repeat="person in persons" index="$index" person="person"></person>\n    <addperson ng-if="!personLimitReached && !data.respondent.closeout.metadata.finished"></addperson>\n  </div>\n</fieldset>\n<div ng-show="shouldShowFinalQuestions()">\n  <hr role="presentation" aria-hidden="true" />\n  <final-questions></final-questions>\n</div>\n<div ng-show="data.respondent.closeout.metadata.finished">\n  <submitsurvey></submitsurvey>\n</div>\n'
}, function(e, n, t) {
    var r = {
        "./home.html": 611,
        "./owner.html": 612,
        "./people.html": 613,
        "./popcount.html": 614,
        "./uc.html": 615
    };

    function a(e) {
        var n = o(e);
        return t(n)
    }

    function o(e) {
        if (!t.o(r, e)) {
            var n = new Error("Cannot find module '" + e + "'");
            throw n.code = "MODULE_NOT_FOUND", n
        }
        return r[e]
    }
    a.keys = function() {
        return Object.keys(r)
    }, a.resolve = o, e.exports = a, a.id = 610
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info"  ng-if="!dispatcher.currentFormValid && household.dispatcher.currentPageAttempt == 1" translate="household.generic.error"></div>\n<p>\n  <b id="question" tabindex="-1" role="heading" aria-level="2" translate="household.home.question"></b>\n  <help title="\'Help\'" part="\'app/household/help\'" content="\'/static/partials/home.help.partial.html\'"></help>\n</p>\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n    <div class="radio" ng-init="radios = [\'H_TENURE_OWNED_MORT_IND\', \'H_TENURE_OWNED_FREE_IND\', \'H_TENURE_RENTED_IND\', \'H_TENURE_OCC_NOPAY_IND\']">\n      <label>\n        <input\n          type="radio"\n          id="home_own_mort"\n          name="H_TENURE_IND"\n          title="With Mortgage or Rent Radio Button"\n          ng-model="model.H_TENURE_OWNED_MORT_IND"\n          ng-required="true"\n          value="1"\n          ng-change="radioChanged(\'H_TENURE_OWNED_MORT_IND\', radios)">\n          <span translate="household.home.option1"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="home_own_free"\n          name="H_TENURE_IND"\n          title="With Free and Clear Radio Button"\n          ng-model="model.H_TENURE_OWNED_FREE_IND"\n          ng-required="true"\n          value="1"\n          ng-change="radioChanged(\'H_TENURE_OWNED_FREE_IND\', radios)">\n          <span translate="household.home.option2"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="home_rent"\n          name="H_TENURE_IND"\n          title="Rented Radio Button"\n          ng-model="model.H_TENURE_RENTED_IND"\n          ng-required="true"\n          value="1"\n          ng-change="radioChanged(\'H_TENURE_RENTED_IND\', radios)">\n          <span translate="household.home.option3"></span>\n      </label>\n    </div>\n    <div class="radio">\n      <label>\n        <input\n          type="radio"\n          id="home_free"\n          name="H_TENURE_IND"\n          title="Occupied without Payment or Rent Radio Button"\n          ng-model="model.H_TENURE_OCC_NOPAY_IND"\n          ng-required="true"\n          value="1"\n          ng-change="radioChanged(\'H_TENURE_OCC_NOPAY_IND\', radios)">\n          <span translate="household.home.option4"></span>\n      </label>\n    </div>\n  <formbuttons dispatcher="household.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info"  ng-if="!person.P_OWNER_RENTER_IND && household.dispatcher.currentPageAttempt == 1" translate="household.generic.error"></div>\n<p>\n  <b translate="household.owner.question"></b>\n  <help title="\'Help link owner question\'" part="\'app/household/help\'" content="\'/static/partials/owner.help.partial.html\'"></help>\n</p>\n<p class="questionTip" translate="household.owner.questionTip"></p>\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <div ng-class="{\'has-error\': currentForm.$dirty && currentForm.H_OWNER_RENTER_NONE_IND.$invalid}">\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10" ng-repeat="person in roster track by $index" ng-if="household.isValidPerson(person)">\n      <label ng-init="input = \'PERSON\' + ($index + 1)" for="{{input}}" >\n        <input\n          type="checkbox"\n          id="{{input}}"\n          name="person"\n          title="{{input}}"\n          ng-model="person.P_OWNER_RENTER_IND"\n          ng-true-value="\'1\'"\n          ng-false-value="\'0\'">\n          <span>{{ rosterService.fullName(person) }}</span>\n    </div>\n    <div class="checkbox col-xs-10">\n      <label for="H_OWNER_RENTER_NONE_IND">\n      <input\n        type="checkbox"\n        id="H_OWNER_RENTER_NONE_IND"\n        name="H_OWNER_RENTER_NONE_IND"\n        title="None"\n        ng-model="model.H_OWNER_RENTER_NONE_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'">\n        <span translate="household.owner.none"></span>\n      </label>\n    </div>\n  </div>\n  <formbuttons dispatcher="household.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="household.people.noResponse1"   ng-if="!dispatcher.currentFormValid && dispatcher.currentPageAttempt === 1 && dispatcher.currentPageErrors.noResponse"></div>\n<div role="alert" class="alert alert-info" translate="household.people.noResponse2"   ng-if="!dispatcher.currentFormValid && dispatcher.currentPageAttempt === 2 && dispatcher.currentPageErrors.noResponse2"></div>\n<div role="alert" class="alert alert-info" translate="household.people.popcountError" ng-if="!dispatcher.currentFormValid && dispatcher.currentPageErrors.popcountError"></div>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p>\n    <b id="question" tabindex="-1" role="heading" aria-level="2" translate="household.people.question"></b><br>\n    <help class="link-underline" title="\'Help\'" text="\'help.whoToInclude\'" part="\'app/household/help\'" content="\'/static/partials/people.help.partial.html\'"></help>\n  </p>\n  <p class="questionTip" translate="household.people.questionTip"></p>\n\n  <div class="col-sm-12 col-md-8 col-lg-6">\n    <div class="strong" translate="household.people.subtext"></div>\n    <div class="row">\n      <div class="col-xs-12">\n        <p ng-repeat="person in roster | filter:{from:\'respondent\'} track by $index">\n          <span><i aria-hidden="true" class="fa fa-check-square-o green"></i>&nbsp;{{ rosterService.fullName(person) }}</span>\n        </p>\n      </div>\n    </div>\n    <div class="row visible-md-block visible-lg-block" ng-if="(roster | filter:{from:\'people\'}).length" reverse-children-on-rtl>\n      <div class="col-md-3">\n        <span translate="household.people.firstName"></span>\n      </div>\n      <div class="col-md-3">\n        <span translate="household.people.middleName"></span>\n      </div>\n      <div class="col-md-3">\n        <span translate="household.people.lastName"></span>\n      </div>\n      <div class="col-md-3"></div>\n    </div>\n\n    <div class="row bg-light add-people-row" ng-repeat="person in roster | filter:{from:\'people\'} track by $index" reverse-children-on-rtl>\n      <div class="col-sm-12 col-md-3 xs-margin-bottom" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !person.P_FIRST_NAME && !person.P_MIDDLE_NAME && !person.P_LAST_NAME}">\n        <label for="P_FIRST_NAME_{{ $index }}">\n          <span aria-hidden="true" class="hidden-md hidden-lg" translate="household.people.firstName"></span>\n        </label>\n        <input\n          type="text"\n          aria-required="true"\n          id="P_FIRST_NAME_{{ $index }}"\n          class="form-control input-full"\n          name="P_FIRST_NAME"\n          aria-label="{{\'household.people.firstName\' | translate}} {{$index + 1}}"\n          ng-model="person.P_FIRST_NAME"\n          ng-maxlength="20"\n          maxlength="20"\n          ng-size="20"\n          size="20"\n          gid="{{ $index + 2 }}"\n        >\n      </div>\n\n      <div class="col-sm-12 col-md-3 xs-margin-bottom" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !person.P_FIRST_NAME && !person.P_MIDDLE_NAME && !person.P_LAST_NAME}">\n        <label for="P_MIDDLE_NAME_{{ $index }}">\n          <span aria-hidden="true" class="hidden-md hidden-lg" translate="household.people.middleName"></span>\n        </label>\n        <input\n          type="text"\n          aria-required="true"\n          id="P_MIDDLE_NAME_{{ $index }}"\n          class="form-control input-full"\n          name="P_MIDDLE_NAME"\n          aria-label="{{\'household.people.middleName\' | translate}} {{$index + 1}}"\n          ng-model="person.P_MIDDLE_NAME"\n          ng-maxlength="20"\n          maxlength="20"\n          ng-size="20"\n          size="20"\n          gid="{{ $index + 2 }}"\n        >\n      </div>\n\n      <div class="col-sm-12 col-md-3" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid && !person.P_FIRST_NAME && !person.P_MIDDLE_NAME && !person.P_LAST_NAME}">\n        <label for="P_LAST_NAME_{{ $index }}">\n          <span aria-hidden="true" class="hidden-md hidden-lg" translate="household.people.lastName"></span>\n        </label>\n        <input\n          type="text"\n          aria-required="true"\n          id="P_LAST_NAME_{{ $index }}"\n          class="form-control input-full"\n          name="P_LAST_NAME"\n          aria-label="{{\'household.people.lastName\' | translate}} {{$index + 1}}"\n          ng-model="person.P_LAST_NAME"\n          ng-maxlength="20"\n          maxlength="20"\n          ng-size="20"\n          size="20"\n          gid="{{ $index + 2 }}"\n        >\n      </div>\n      <div class="col-sm-12 col-md-3 pull-left people-remove-button">\n        <br class="hidden-md hidden-lg"/>\n        <button class="btn btn-small btn-primary-outlined" ng-click="household.removeFromRoster(person)">\n          <i class="fa fa-trash"></i>\n          <span translate="household.people.remove"></span>\n          <span class="sr-only">New Person {{$index + 1}}</span>\n        </button>\n      </div>\n    </div>\n    <p>\n      <br />\n      <button aria-label="Add Another Person" title="Add Another Person" name="People Add People" class="btn btn-primary" ng-click="household.addToRoster()" ng-hide="roster.length >= 99" translate="household.people.add"></button>\n    </p>\n  </div>\n</form>\n<formbuttons dispatcher="household.dispatcher"></formbuttons>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-danger" translate="household.popcount.errorBlank" ng-if="dispatcher.currentPageErrors.errorBlank">  </div>\n<div role="alert" class="alert alert-danger" translate="household.popcount.errorBlank2" ng-if="dispatcher.currentPageErrors.errorBlank2">  </div>\n<div role="alert" class="alert alert-danger" translate="household.popcount.errorZero" ng-if="dispatcher.currentPageErrors.errorZero">  </div>\n<div role="alert" class="alert alert-danger" translate="household.popcount.errorNonNumeric" ng-if="dispatcher.currentPageErrors.errorNonNumeric"></div>\n\n\n<form class="form" role="form" name="currentForm" novalidate>\n  <div class="form-group">\n    <p><b id="question" tabindex="-1" role="heading" aria-level="2" translate="household.popcount.question"></b></p>\n    <help title="\'Help link popcount question\'" class="link-underline" text="\'help.whoToInclude\'" part="\'app/household/help\'" content="\'/static/partials/popcount.help.partial.html\'"></help>\n    <br><br>\n    <div class="row">\n      <div class="col-md-1 col-sm-2 col-xs-3" ng-class="{\'has-error\': dispatcher.currentPageAttempt && !dispatcher.currentPageValid}">\n        <label for="H_SIZE_STATED_CNT" class="control-label" translate="household.popcount.label2"></label>\n        <br>\n        <input\n          type="text"\n          aria-required="true"\n          class="form-control is-number"\n          id="H_SIZE_STATED_CNT"\n          name="H_SIZE_STATED_CNT"\n          title="Number"\n          ng-model="model.H_SIZE_STATED_CNT"\n          max="99"\n          ng-minlength="1"\n          ng-maxlength="2"\n          maxlength="2"\n          ng-size="2"\n          size="2"\n          input-filter="^[0-9]*$"\n          inputmode="decimal"\n          pattern="[0-9]*"\n        >\n        </input>\n      </div>\n    </div>\n  </div>\n  <formbuttons dispatcher="household.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" ng-if="!dispatcher.currentFormValid && dispatcher.currentPageAttempt === 1 && dispatcher.currentPageErrors.error" translate="household.uc.error"></div>\n<div role="alert" class="alert alert-info" ng-if="!dispatcher.currentFormValid && dispatcher.currentPageAttempt >= 1 && dispatcher.currentPageErrors.error2" translate="household.uc.error2"></div>\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <p><strong id="question" tabindex="-1" role="heading" aria-level="2" translate="household.uc.question"></strong></p>\n  <p  class="section-divider" translate="household.uc.questionTip"></p>\n  <ul>\n    <li translate="household.uc.listItem1"></li>\n    <li translate="household.uc.listItem2"></li>\n    <li translate="household.uc.listItem3"></li>\n    <li translate="household.uc.listItem4"></li>\n  </ul>\n\n  <p class="section-divider"><strong translate="household.uc.listedSoFar"></strong></p>\n  <div class="row">\n    <div class="col-xs-12">\n      <p ng-repeat="person in roster | filter:{from: \'!uc\'} track by $index">\n        <span><i aria-hidden="true" class="fa fa-check-square-o green"></i>&nbsp;{{ rosterService.fullName(person) }}</span>\n      </p>\n    </div>\n  </div>\n  <p class="section-divider">\n    <strong translate="household.uc.question2"></strong><br>\n    <help class="link-underline" title="\'Help\'" text="\'help.whoToInclude\'" part="\'app/household/help\'" content="\'/static/partials/uc.help.partial.html\'"></help>\n  </p>\n\n  <div class="form-group" ng-init="radios = [\'H_UC_ADD_YES_IND\', \'H_UC_ADD_NO_IND\']">\n    <div class="col-sm-12">\n      <label>\n        <input\n          type="radio"\n          id="UC_ADD_YES_IND"\n          name="UC_ADD_IND"\n          title="Yes"\n          ng-model="model.H_UC_ADD_YES_IND"\n          ng-required="true"\n          ng-click="!(roster | filter:{from:\'uc\'}).length && household.addToRoster();"\n          ng-change="radioChanged(\'H_UC_ADD_YES_IND\', radios)"\n          value="1">\n        <span translate="household.uc.yes"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n        <input\n          type="radio"\n          id="UC_ADD_NO_IND"\n          name="UC_ADD_IND"\n          title="No"\n          ng-model="model.H_UC_ADD_NO_IND"\n          ng-required="true"\n          ng-click="household.removePeopleByFrom(\'uc\');"\n          ng-change="radioChanged(\'H_UC_ADD_NO_IND\', radios)"\n          value="1">\n        <span translate="household.uc.no"></span>\n      </label>\n    </div>\n  </div>\n\n  <div class="row section-divider" ng-init="ensureUcRosterFieldsPresence()" ng-show="model.H_UC_ADD_YES_IND == \'1\' || (roster | filter:{from:\'uc\'}).length">\n    <div class="col-sm-12 col-md-8 col-lg-6">\n      <div class="row visible-md-block visible-lg-block" reverse-children-on-rtl>\n        <div class="col-md-4 col-md-3">\n          <strong translate="household.uc.firstName"></strong>\n        </div>\n        <div class="col-md-4 col-md-3">\n          <strong translate="household.uc.middleName"></strong>\n        </div>\n        <div class="col-md-4 col-md-3">\n          <strong translate="household.uc.lastName"></strong>\n        </div>\n        <div class="col-md-3"></div>\n      </div>\n\n      <div class="row bg-light add-people-row" ng-init="gidOffset = rosterService.getCountOfPeopleNotFrom(\'uc\')" ng-repeat="person in roster | filter:{from:\'uc\'} track by $index" reverse-children-on-rtl>\n        <div class="col-sm-12 col-md-3 xs-margin-bottom" ng-class="{\'has-error\': dispatcher.currentPageErrors.error2}">\n          <label for="P_FIRST_NAME_{{ $index }}">\n            <span aria-hidden="true" class="hidden-md hidden-lg" translate="household.people.firstName"></span>\n          </label>\n          <input\n            id="P_FIRST_NAME_{{ $index }}"\n            aria-required="true"\n            class="form-control input-full"\n            name="P_FIRST_NAME"\n            aria-label="{{\'household.people.firstName\' | translate}} {{$index + 1}}"\n            ng-model="person.P_FIRST_NAME"\n            type="text"\n            ng-maxlength="20"\n            maxlength="20"\n            ng-size="20"\n            size="20"\n            gid="{{ gidOffset + $index + 1 }}"\n            >\n        </div>\n        <div class="col-sm-12 col-md-3 xs-margin-bottom" ng-class="{\'has-error\': dispatcher.currentPageErrors.error2}">\n          <label for="P_MIDDLE_NAME_{{ $index }}">\n            <span aria-hidden="true" class="hidden-md hidden-lg" translate="household.people.middleName"></span>\n          </label>\n          <input\n            id="P_MIDDLE_NAME_{{ $index }}"\n            aria-required="true"\n            class="form-control input-full"\n            name="P_MIDDLE_NAME"\n            aria-label="{{\'household.people.middleName\' | translate}} {{$index + 1}}"\n            ng-model="person.P_MIDDLE_NAME"\n            type="text"\n            ng-maxlength="20"\n            maxlength="20"\n            ng-size="20"\n            size="20"\n            gid="{{ gidOffset + $index + 1 }}"\n            >\n        </div>\n        <div class="col-sm-12 col-md-3" ng-class="{\'has-error\': dispatcher.currentPageErrors.error2}">\n          <label for="P_LAST_NAME_{{ $index }}">\n            <span aria-hidden="true" class="hidden-md hidden-lg" translate="household.people.lastName"></span>\n          </label>\n          <input\n            id="P_LAST_NAME_{{ $index }}"\n            aria-required="true"\n            class="form-control input-full"\n            name="P_LAST_NAME"\n            aria-label="{{\'household.people.lastName\' | translate}} {{$index + 1}}"\n            ng-model="person.P_LAST_NAME"\n            type="text"\n            ng-maxlength="20"\n            maxlength="20"\n            ng-size="20"\n            size="20"\n            gid="{{ gidOffset + $index + 1 }}"\n            >\n        </div>\n        <div class="col-sm-12 col-md-3 pull-left people-remove-button">\n          <br class="hidden-md hidden-lg"/>\n          <button class="btn btn-small btn-primary-outlined" ng-click="household.removeFromRoster(person)">\n            <i class="fa fa-trash"></i>\n            <span translate="household.uc.remove"></span>\n            <span class="sr-only">New Person {{$index + 1}}</span>\n          </button>\n        </div>\n      </div>\n      <p>\n        <br />\n        <button aria-label="Add Another Person" title="Add Another Person" name="People Add People" class="btn btn-primary" ng-click="household.addToRoster()" ng-hide="roster.length >= 99" translate="household.people.add"></button>\n      </p>\n    </div>\n  </div>\n</form>\n<formbuttons dispatcher="household.dispatcher"></formbuttons>\n'
}, function(e, n, t) {
    var r = {
        "./dob.html": 617,
        "./hispanic_origin.html": 618,
        "./name.html": 619,
        "./race.html": 620,
        "./relationship.html": 621,
        "./sex.html": 622,
        "./sex_confirm.html": 623
    };

    function a(e) {
        var n = o(e);
        return t(n)
    }

    function o(e) {
        if (!t.o(r, e)) {
            var n = new Error("Cannot find module '" + e + "'");
            throw n.code = "MODULE_NOT_FOUND", n
        }
        return r[e]
    }
    a.keys = function() {
        return Object.keys(r)
    }, a.resolve = o, e.exports = a, a.id = 616
}, function(e, n) {
    e.exports = '<breadcrumb page="\'person.dob.page\'" dispatcher="dispatcher"></breadcrumb>\n<div role="alert" class="alert alert-info" ng-if="!dispatcher.currentFormValid && dispatcher.currentPageAttempt >=1 && dispatcher.currentPageErrors" ng-translate>\n  <p translate="person.generic.error1" ng-if="dispatcher.currentPageAttempt == 1 && dispatcher.currentPageErrors.noSelection"></p>\n  <p translate="person.dob.error1" ng-if="dispatcher.currentPageAttempt == 1 && dispatcher.currentPageErrors.partialSelection"></p>\n  <p translate="person.dob.error1" ng-if="dispatcher.currentPageAttempt == 2 && dispatcher.currentPageErrors.noSelection"></p>\n</div>\n\n<p>\n  <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="person.dob.questionText"></strong>\n  <br>\n  <help class="link-underline" title="\'Help\'" text="\'help.dontKnow\'" part="\'app/person/help\'" content="\'/static/partials/dob.help.partial.html\'"></help>\n</p>\n\n<form class="form-horizontal" style="margin-left: 0px" role="form" name="currentForm" novalidate>\n  <div class="row">\n    <div class="col-sm-8 col-md-6 col-lg-5">\n      <dateselect min-year="1894" max-date="2020-04-01"></dateselect>\n    </div>\n  </div>\n  <formbuttons dispatcher="person.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<breadcrumb page="\'person.hispanic_origin.page\'" dispatcher="dispatcher"></breadcrumb>\n<div role="alert" class="alert alert-info" translate="person.generic.error1" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentPageValid && !dispatcher.currentPageErrors.noWriteIn"></div>\n<div role="alert" class="alert alert-info" translate="person.hispanic_origin.error1" ng-if="dispatcher.currentPageErrors.noWriteIn"></div>\n<p>\n    <b id="question" tabindex="-1" role="heading" aria-level="2" translate="person.hispanic_origin.questionText"></b>\n    <help title="\'Help\'" part="\'app/person/help\'" content="\'/static/partials/hispanic_origin.help.partial.html\'"></help>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n    <div class="form-group check-group" >\n        <div class="checkbox col-xs-10">\n            <label for="P_HISP_NO_IND">\n                <input\n                        type="checkbox"\n                        id="P_HISP_NO_IND"\n                        name="hispanic_origin"\n                        title=""\n                        ng-model="model.P_HISP_NO_IND"\n                        ng-true-value="\'1\'"\n                        ng-false-value="\'0\'"\n                        ng-disabled="model.P_HISP_YES_MEXICAN_IND === \'1\' || model.P_HISP_YES_PR_IND === \'1\' || model.P_HISP_YES_CUBAN_IND === \'1\' || model.P_HISP_YES_OTH_IND === \'1\'">\n                <b translate="person.hispanic_origin.option1"></b></label>\n        </div>\n    </div>\n    <div class="form-group check-group" >\n        <div class="checkbox col-xs-10">\n            <label for="P_HISP_YES_MEXICAN_IND">\n                <input\n                        type="checkbox"\n                        id="P_HISP_YES_MEXICAN_IND"\n                        name="hispanic_origin"\n                        title=""\n                        ng-model="model.P_HISP_YES_MEXICAN_IND"\n                        ng-true-value="\'1\'"\n                        ng-false-value="\'0\'"\n                        ng-disabled="model.P_HISP_NO_IND === \'1\'">\n                <b translate="person.hispanic_origin.option2"></b></label>\n        </div>\n    </div>\n    <div class="form-group check-group" >\n        <div class="checkbox col-xs-10">\n            <label for="P_HISP_YES_PR_IND">\n                <input\n                        type="checkbox"\n                        id="P_HISP_YES_PR_IND"\n                        name="hispanic_origin"\n                        title=""\n                        ng-model="model.P_HISP_YES_PR_IND"\n                        ng-true-value="\'1\'"\n                        ng-false-value="\'0\'"\n                        ng-disabled="model.P_HISP_NO_IND === \'1\'">\n                <b translate="person.hispanic_origin.option3"></b></label>\n        </div>\n    </div>\n    <div class="form-group check-group" >\n        <div class="checkbox col-xs-10">\n            <label for="P_HISP_YES_CUBAN_IND">\n                <input\n                        type="checkbox"\n                        id="P_HISP_YES_CUBAN_IND"\n                        name="hispanic_origin"\n                        title=""\n                        ng-model="model.P_HISP_YES_CUBAN_IND"\n                        ng-true-value="\'1\'"\n                        ng-false-value="\'0\'"\n                        ng-disabled="model.P_HISP_NO_IND === \'1\'">\n                <b translate="person.hispanic_origin.option4"></b></label>\n        </div>\n    </div>\n    <div class="form-group check-group" >\n        <div class="checkbox col-xs-12">\n            <label for="P_HISP_YES_OTH_IND">\n                <input\n                        type="checkbox"\n                        id="P_HISP_YES_OTH_IND"\n                        name="hispanic_origin"\n                        ng-model="model.P_HISP_YES_OTH_IND"\n                        ng-true-value="\'1\'"\n                        ng-false-value="\'0\'"\n                        ng-disabled="model.P_HISP_NO_IND === \'1\'">\n                  <b translate="person.hispanic_origin.option5"></b>\n            </label>\n        </div>\n    </div>\n    <div class="form-group col-xs-12 no-right-gutter" ng-class="{\'has-error\': (dispatcher.currentPageAttempt >= 1 && dispatcher.currentPageErrors.noWriteIn)}">\n      <label for="P_HISP_YES_OTH_TEXT" ng-class="{\'disabled-grey\': model.P_HISP_NO_IND === \'1\'}" class="example-text example-text-indent">\n        <span translate="person.hispanic_origin.option5b"></span>\n        <input\n          name="P_HISP_YES_OTH_TEXT"\n          aria-required="{{ dispatcher.currentPageErrors.noWriteIn ? \'true\' : \'false\' }}"\n          type="text"\n          class="form-control"\n          id="P_HISP_YES_OTH_TEXT"\n          ng-model="model.P_HISP_YES_OTH_TEXT"\n          maxlength="200"\n          ng-maxlength="200"\n          ng-disabled="model.P_HISP_NO_IND === \'1\'"\n        >\n      </label>\n    </div>\n    <formbuttons dispatcher="person.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="person.name.error" ng-if="!dispatcher.currentFormValid && dispatcher.currentPageErrors.error && dispatcher.currentPageAttempt == 1"></div>\n<div role="alert" class="alert alert-info" translate="person.name.error2" ng-if="!dispatcher.currentFormValid && dispatcher.currentPageErrors.error2 && dispatcher.currentPageAttempt == 2"></div>\n\n<div ng-show="person.personIndex == 0">\n  <p><b translate="person.name.auxText"></b></p>\n</div>\n<div>\n  <p>\n    <b id="question" tabindex="-1" role="heading" aria-level="2" translate="person.name.questionText"></b>\n    <help class="link-underline" title="\'Help\'" part="\'app/household/help\'" content="\'/static/partials/people.help.partial.html\'"></help>\n  </p>\n</div>\n\n<form role="form" name="currentForm" novalidate>\n  <div class="row" reverse-children-on-rtl>\n  <div class="form-group col-xs-12 col-sm-4 col-md-3 col-lg-2" ng-class="{\'has-error\':currentForm.person.$dirty && currentForm.NAME_FIRST.$invalid}">\n    <label for="NAME_FIRST" translate="person.name.NAME_FIRST"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="input-full form-control"\n        id="NAME_FIRST"\n        name="NAME_FIRST"\n        title="First Name"\n        ng-maxlength="20"\n        maxlength="20"\n        ng-size="20"\n        size="20"\n        ng-model="model.P_FIRST_NAME"\n        >\n      </input>\n  </div>\n  <div class="form-group col-xs-12 col-sm-4 col-md-3 col-lg-2">\n    <label for="NAME_MIDDLE" translate="person.name.NAME_MIDDLE"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="input-full form-control"\n        id="NAME_MIDDLE"\n        name="NAME_MIDDLE"\n        title="Middle Name"\n        ng-maxlength="20"\n        maxlength="20"\n        ng-size="20"\n        size="20"\n        ng-model="model.P_MIDDLE_NAME">\n      </input>\n  </div>\n  <div class="form-group col-xs-12 col-sm-4 col-md-3 col-lg-2" ng-class="{\'has-error\': person.currentFormAttempted && currentForm.NAME_LAST.$invalid}">\n    <label for="NAME_LAST" translate="person.name.NAME_LAST"></label>\n      <input\n        type="text"\n        aria-required="true"\n        class="input-full form-control"\n        id="NAME_LAST"\n        name="NAME_LAST"\n        title="Last Name"\n        ng-maxlength="20"\n        maxlength="20"\n        ng-size="20"\n        size="20"\n        ng-model="model.P_LAST_NAME"\n        >\n      </input>\n  </div>\n</div>\n  <formbuttons dispatcher="person.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<breadcrumb page="\'person.race.page\'" dispatcher="dispatcher"></breadcrumb>\n<div role="alert" class="alert alert-info" ng-if="dispatcher.currentPageAttempt >= 1 && !dispatcher.currentPageValid">\n  <p translate="person.generic.error1" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentPageValid && !dispatcher.currentPageErrors.writeInErrors"></p>\n  <p translate="person.race.error1" ng-if="dispatcher.currentPageErrors.writeInErrors"></p>\n</div>\n<p>\n  <b id="question" tabindex="-1" role="heading" aria-level="2" translate="person.race.questionText"></b>\n  <help title="\'Help\'" part="\'app/person/help\'" content="\'/static/partials/race.help.partial.html\'"></help>\n</p>\n\n<p>\n  <span class="questionTip" translate="person.race.questionTip1"></span>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <div class="form-group check-group" >\n    <div class="checkbox col-xs-12">\n      <label for="P_RACE_WHITE_IND">\n        <input\n          type="checkbox"\n          id="P_RACE_WHITE_IND"\n          name="race"\n          ng-model="model.P_RACE_WHITE_IND"\n          ng-true-value="\'1\'"\n          ng-false-value="\'0\'">\n          <b translate="person.race.option1"></b>\n      </label>\n    </div>\n  </div>\n  <div class="form-group col-xs-12 no-right-gutter" ng-class="{\'has-error\': (dispatcher.currentPageErrors.writeInErrors.noWhiteWriteIn)}">\n    <label for="P_RACE2_WHITE_TEXT" class="example-text example-text-indent">\n      <span translate="person.race.option1Tip"></span>\n      <input\n        name="P_RACE2_WHITE_TEXT"\n        aria-required="{{ dispatcher.currentPageErrors.writeInErrors.noWhiteWriteIn ? \'true\' : \'false\' }}"\n        type="text"\n        class="form-control"\n        id="P_RACE2_WHITE_TEXT"\n        ng-model="model.P_RACE2_WHITE_TEXT"\n        maxlength="200"\n        ng-maxlength="200"\n      >\n    </label>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE_BLACK_IND">\n        <input\n          type="checkbox"\n          id="P_RACE_BLACK_IND"\n          name="race"\n          ng-model="model.P_RACE_BLACK_IND"\n          ng-true-value="\'1\'"\n          ng-false-value="\'0\'">\n          <b translate="person.race.option2"></b>\n      </label>\n    </div>\n  </div>\n  <div class="form-group col-xs-12 no-right-gutter" ng-class="{\'has-error\': (dispatcher.currentPageErrors.writeInErrors.noBlackWriteIn)}">\n    <label for="P_RACE2_BLACK_TEXT" class="example-text example-text-indent">\n      <span translate="person.race.option2Tip"></span>\n      <input\n        name="P_RACE2_BLACK_TEXT"\n        aria-required="{{ dispatcher.currentPageErrors.writeInErrors.noBlackWriteIn ? \'true\' : \'false\' }}"\n        type="text"\n        class="form-control"\n        id="P_RACE2_BLACK_TEXT"\n        ng-model="model.P_RACE2_BLACK_TEXT"\n        maxlength="200"\n        ng-maxlength="200"\n      >\n    </label>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE_AIAN_IND">\n        <input\n          type="checkbox"\n          id="P_RACE_AIAN_IND"\n          name="race"\n          ng-model="model.P_RACE_AIAN_IND"\n          ng-true-value="\'1\'"\n          ng-false-value="\'0\'">\n        <b translate="person.race.option3"></b>\n      </label>\n    </div>\n  </div>\n  <div class="form-group col-xs-12 no-right-gutter" ng-class="{\'has-error\': (dispatcher.currentPageErrors.writeInErrors.noAianWriteIn)}">\n    <label for="P_RACE2_AIAN_TEXT" class="example-text example-text-indent">\n      <span translate="person.race.option3Tip"></span>\n      <input\n        name="P_RACE2_AIAN_TEXT"\n        aria-required="{{ dispatcher.currentPageErrors.writeInErrors.noAianWriteIn ? \'true\' : \'false\' }}"\n        type="text"\n        class="form-control"\n        id="P_RACE2_AIAN_TEXT"\n        ng-model="model.P_RACE2_AIAN_TEXT"\n        maxlength="200"\n        ng-maxlength="200"\n      >\n    </label>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE2_CHINESE_IND">\n      <input\n        type="checkbox"\n        id="P_RACE2_CHINESE_IND"\n        name="race"\n        ng-model="model.P_RACE2_CHINESE_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'">\n        <b translate="person.race.option4"></b>\n    </div>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE2_FILIPINO_IND">\n      <input\n        type="checkbox"\n        id="P_RACE2_FILIPINO_IND"\n        name="race"\n        ng-model="model.P_RACE2_FILIPINO_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'">\n        <b translate="person.race.option5"></b>\n    </div>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE2_ASIANINDIAN_IND">\n      <input\n        type="checkbox"\n        id="P_RACE2_ASIANINDIAN_IND"\n        name="race"\n        ng-model="model.P_RACE2_ASIANINDIAN_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'">\n        <b translate="person.race.option6"></b>\n    </div>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE2_VIETNAMESE_IND">\n      <input\n        type="checkbox"\n        id="P_RACE2_VIETNAMESE_IND"\n        name="race"\n        ng-model="model.P_RACE2_VIETNAMESE_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'">\n        <b translate="person.race.option7"></b>\n    </div>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE2_KOREAN_IND">\n      <input\n        type="checkbox"\n        id="P_RACE2_KOREAN_IND"\n        name="race"\n        ng-model="model.P_RACE2_KOREAN_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'">\n        <b translate="person.race.option8"></b>\n    </div>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE2_JAPANESE_IND">\n      <input\n        type="checkbox"\n        id="P_RACE2_JAPANESE_IND"\n        name="race"\n        ng-model="model.P_RACE2_JAPANESE_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'">\n        <b translate="person.race.option9"></b>\n    </div>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_ASIAN_OTHER_IND">\n        <input\n          type="checkbox"\n          id="P_ASIAN_OTHER_IND"\n          name="race"\n          ng-model="model.P_ASIAN_OTHER_IND"\n          ng-true-value="\'1\'"\n          ng-false-value="\'0\'">\n        <b translate="person.race.option10"></b>\n      </label>\n    </div>\n  </div>\n  <div class="form-group col-xs-12 no-right-gutter" ng-class="{\'has-error\': (dispatcher.currentPageErrors.writeInErrors.noOtherAsianWriteIn)}">\n    <label for="P_ASIAN_OTHER_TEXT" class="example-text example-text-indent">\n      <span translate="person.race.option10Tip"></span>\n      <input\n        name="P_ASIAN_OTHER_TEXT"\n        aria-required="{{ dispatcher.currentPageErrors.writeInErrors.noOtherAsianWriteIn ? \'true\' : \'false\' }}"\n        type="text"\n        class="form-control"\n        id="P_ASIAN_OTHER_TEXT"\n        ng-model="model.P_ASIAN_OTHER_TEXT"\n        maxlength="200"\n        ng-maxlength="200"\n      >\n    </label>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE2_NATHAWAIIAN_IND">\n        <input\n          type="checkbox"\n          id="P_RACE2_NATHAWAIIAN_IND"\n          name="race"\n          ng-model="model.P_RACE2_NATHAWAIIAN_IND"\n          ng-true-value="\'1\'"\n          ng-false-value="\'0\'">\n        <b translate="person.race.option11"></b>\n      </label>\n    </div>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE2_SAMOAN_IND">\n        <input\n          type="checkbox"\n          id="P_RACE2_SAMOAN_IND"\n          name="race"\n          ng-model="model.P_RACE2_SAMOAN_IND"\n          ng-true-value="\'1\'"\n          ng-false-value="\'0\'">\n        <b translate="person.race.option12"></b>\n      </label>\n    </div>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE2_CHAMORRO_IND">\n        <input\n          type="checkbox"\n          id="P_RACE2_CHAMORRO_IND"\n          name="race"\n          ng-model="model.P_RACE2_CHAMORRO_IND"\n          ng-true-value="\'1\'"\n          ng-false-value="\'0\'">\n        <b translate="person.race.option13"></b>\n      </label>\n    </div>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_NHPI_OTHER_IND">\n        <input\n          type="checkbox"\n          id="P_NHPI_OTHER_IND"\n          name="race"\n          ng-model="model.P_NHPI_OTHER_IND"\n          ng-true-value="\'1\'"\n          ng-false-value="\'0\'">\n        <b translate="person.race.option14"></b>\n      </label>\n    </div>\n  </div>\n  <div class="form-group col-xs-12 no-right-gutter" ng-class="{\'has-error\': (dispatcher.currentPageErrors.writeInErrors.noNHPIWriteIn)}">\n    <label for="P_NHPI_OTHER_TEXT" class="example-text example-text-indent">\n      <span translate="person.race.option14Tip"></span>\n      <input\n        name="P_NHPI_OTHER_TEXT"\n        aria-required="{{ dispatcher.currentPageErrors.writeInErrors.noNHPIWriteIn ? \'true\' : \'false\' }}"\n        type="text"\n        class="form-control"\n        id="P_NHPI_OTHER_TEXT"\n        ng-model="model.P_NHPI_OTHER_TEXT"\n        maxlength="200"\n        ng-maxlength="200"\n      >\n    </label>\n  </div>\n\n  <div class="form-group check-group">\n    <div class="checkbox col-xs-10">\n      <label for="P_RACE_SOR_IND">\n        <input\n          type="checkbox"\n          id="P_RACE_SOR_IND"\n          name="race"\n          ng-model="model.P_RACE_SOR_IND"\n          ng-true-value="\'1\'"\n          ng-false-value="\'0\'">\n        <b translate="person.race.option15"></b>\n      </label>\n    </div>\n  </div>\n  <div class="form-group col-xs-12 no-right-gutter" ng-class="{\'has-error\': (dispatcher.currentPageErrors.writeInErrors.noOtherRaceWriteIn)}">\n    <label for="P_RACE2_SOR_TEXT" class="example-text example-text-indent">\n      <span translate="person.race.option15Tip"></span>\n      <input\n        name="P_RACE2_SOR_TEXT"\n        aria-required="{{ dispatcher.currentPageErrors.writeInErrors.noOtherRaceWriteIn ? \'true\' : \'false\' }}"\n        type="text"\n        class="form-control"\n        id="P_RACE2_SOR_TEXT"\n        ng-model="model.P_RACE2_SOR_TEXT"\n        maxlength="200"\n        ng-maxlength="200"\n      >\n    </label>\n  </div>\n\n  <formbuttons dispatcher="person.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<breadcrumb page="\'person.relationship.page\'" dispatcher="dispatcher"></breadcrumb>\n<div role="alert" class="alert alert-info" translate="person.generic.error1" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentFormValid"></div>\n\n<p><b translate="person.relationship.prefaceText"></b></p>\n<p>\n  <b id="question" tabindex="-1" role="heading" aria-level="2" translate="person.relationship.questionText"></b>\n  <help title="\'Help\'" part="\'app/person/help\'" content="\'/static/partials/relationship.help.partial.html\'"></help>\n</p>\n\n<form class="form" role="form" name="currentForm" novalidate>\n    <div class="radio" ng-init="radios = [\'P_REL_SPOUSE_OPP_IND\', \'P_REL_PARTNER_OPP_IND\', \'P_REL_SPOUSE_SAME_IND\', \'P_REL_PARTNER_SAME_IND\', \'P_REL_CHILD_BIO_IND\', \'P_REL_CHILD_ADOPTED_IND\', \'P_REL_CHILD_STEP_IND\', \'P_REL_SIBLING_IND\', \'P_REL_PARENT_IND\', \'P_REL_GRANDCHILD_IND\', \'P_REL_INLAW_PARENT_IND\', \'P_REL_INLAW_CHILD_IND\', \'P_REL_OTHER_REL_IND\', \'P_REL_HOUSEROOMMATE_IND\', \'P_REL_CHILD_FOSTER_IND\', \'P_REL_OTHER_NONREL_IND\']">\n      <label for="relation_1">\n      <input\n        type="radio"\n        id="relation_1"\n        name="RELATION"\n        ng-model="model.P_REL_SPOUSE_OPP_IND"\n        title="Opposite-sex husband/wife/spouse"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_SPOUSE_OPP_IND\', radios)">\n      <span translate="person.relationship.option1"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_2">\n      <input\n        type="radio"\n        id="relation_2"\n        name="RELATION"\n        ng-model="model.P_REL_PARTNER_OPP_IND"\n        title="Opposite-sex Unmarried Partner"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_PARTNER_OPP_IND\', radios)">\n      <span translate="person.relationship.option2"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_3">\n      <input\n        type="radio"\n        id="relation_3"\n        name="RELATION"\n        ng-model="model.P_REL_SPOUSE_SAME_IND"\n        title="Same-sex husband/wife/spouse"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_SPOUSE_SAME_IND\', radios)">\n      <span translate="person.relationship.option3"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_4">\n      <input\n        type="radio"\n        id="relation_4"\n        name="RELATION"\n        ng-model="model.P_REL_PARTNER_SAME_IND"\n        title="Same-sex Unmarried Partner"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_PARTNER_SAME_IND\', radios)">\n      <span translate="person.relationship.option4"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_5">\n      <input\n        type="radio"\n        id="relation_5"\n        name="RELATION"\n        ng-model="model.P_REL_CHILD_BIO_IND"\n        title="Biological son or daughter"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_CHILD_BIO_IND\', radios)">\n      <span translate="person.relationship.option5"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_6">\n      <input\n        type="radio"\n        id="relation_6"\n        name="RELATION"\n        ng-model="model.P_REL_CHILD_ADOPTED_IND"\n        title="Adopted son or daughter"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_CHILD_ADOPTED_IND\', radios)">\n      <span translate="person.relationship.option6"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_7">\n      <input\n        type="radio"\n        id="relation_7"\n        name="RELATION"\n        ng-model="model.P_REL_CHILD_STEP_IND"\n        title="Stepson or stepdaughter"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_CHILD_STEP_IND\', radios)">\n      <span translate="person.relationship.option7"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_8">\n      <input\n        type="radio"\n        id="relation_8"\n        name="RELATION"\n        ng-model="model.P_REL_SIBLING_IND"\n        title="Brother or Sister"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_SIBLING_IND\', radios)">\n      <span translate="person.relationship.option8"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_9">\n      <input\n        type="radio"\n        id="relation_9"\n        name="RELATION"\n        ng-model="model.P_REL_PARENT_IND"\n        title="Father or Mother"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_PARENT_IND\', radios)">\n      <span translate="person.relationship.option9"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_10">\n      <input\n        type="radio"\n        id="relation_10"\n        name="RELATION"\n        ng-model="model.P_REL_GRANDCHILD_IND"\n        title="Grandchild"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_GRANDCHILD_IND\', radios)">\n      <span translate="person.relationship.option10"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_11">\n      <input\n        type="radio"\n        id="relation_11"\n        name="RELATION"\n        ng-model="model.P_REL_INLAW_PARENT_IND"\n        title="Parent-in-law"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_INLAW_PARENT_IND\', radios)">\n      <span translate="person.relationship.option11"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_12">\n      <input\n        type="radio"\n        id="relation_12"\n        name="RELATION"\n        ng-model="model.P_REL_INLAW_CHILD_IND"\n        title="Son-in-law or daughter-in-law"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_INLAW_CHILD_IND\', radios)">\n      <span translate="person.relationship.option12"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_13">\n      <input\n        type="radio"\n        id="relation_13"\n        name="RELATION"\n        ng-model="model.P_REL_OTHER_REL_IND"\n        title="Other relative"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_OTHER_REL_IND\', radios)">\n      <span translate="person.relationship.option13"></span></label>\n    </div>\n\n    \x3c!-- Housemate or roommate  --\x3e\n    <div class="radio">\n      <label for="relation_15">\n      <input\n        type="radio"\n        id="relation_15"\n        name="RELATION"\n        ng-model="model.P_REL_HOUSEROOMMATE_IND"\n        title="Housemate or roommate"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_HOUSEROOMMATE_IND\', radios)">\n      <span translate="person.relationship.option15"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_16">\n      <input\n        type="radio"\n        id="relation_16"\n        name="RELATION"\n        ng-model="model.P_REL_CHILD_FOSTER_IND"\n        title="Foster Child"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_CHILD_FOSTER_IND\', radios)">\n      <span translate="person.relationship.option16"></span></label>\n    </div>\n    <div class="radio">\n      <label for="relation_17">\n      <input\n        type="radio"\n        id="relation_17"\n        name="RELATION"\n        ng-model="model.P_REL_OTHER_NONREL_IND"\n        title="Other nonrelative"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_REL_OTHER_NONREL_IND\', radios)">\n      <span translate="person.relationship.option17"></span></label>\n    </div>\n\n  <formbuttons dispatcher="person.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<breadcrumb page="\'person.sex.page\'" dispatcher="dispatcher"></breadcrumb>\n<div role="alert" class="alert alert-info" translate="person.generic.error1" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentFormValid"></div>\n<p>\n  <b id="question" tabindex="-1" role="heading" aria-level="2" translate="person.sex.questionText"></b>\n  <help title="\'Help\'" part="\'app/person/help\'" content="\'/static/partials/sex.help.partial.html\'"></help>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <div class="form-group" ng-init="radios = [\'P_SEX_MALE_IND\', \'P_SEX_FEMALE_IND\']">\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="radio"\n        id="male"\n        name="P_SEX"\n        title="Male"\n        ng-model="model.P_SEX_MALE_IND"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_SEX_MALE_IND\', radios)">\n        <span translate="person.sex.male"></span>\n      </label>\n      </div>\n      <div class="col-sm-12">\n      <label>\n      <input\n        type="radio"\n        id="female"\n        name="P_SEX"\n        title="Female"\n        ng-model="model.P_SEX_FEMALE_IND"\n        ng-required="true"\n        value="1"\n        ng-change="radioChanged(\'P_SEX_FEMALE_IND\', radios)">\n        <span translate="person.sex.female"></span>\n      </label>\n    </div>\n  </div>\n  <formbuttons dispatcher="person.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<breadcrumb page="\'person.sex_confirm.page\'" dispatcher="dispatcher"></breadcrumb>\n\n<p><b translate="person.sex_confirm.header"></b></p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <div class="form-group">\n    <div class="form-group" ng-init="conflictPersonSexConfRadios = [\'P_SEX_CONF_YES_IND\', \'P_SEX_CONF_NO_IND\']">\n      <div class="col-sm-12">\n        <p><b role="heading" aria-level="2" translate="person.sex_confirm.questionText"></b></p>\n        <label>\n          <input\n            type="radio"\n            name="P_SEX_CONF"\n            title="Yes"\n            ng-model="model.P_SEX_CONF_YES_IND"\n            value="1"\n            ng-change="radioChanged(\'P_SEX_CONF_YES_IND\', conflictPersonSexConfRadios, model); clearSexCHFields(model); dispatcher.currentPageErrors.firstQuestionBlank = false">\n          <span translate="person.sex_confirm.yes"></span>\n        </label>\n      </div>\n      <div class="col-sm-12">\n        <label>\n          <input\n            type="radio"\n            name="P_SEX_CONF"\n            title="No"\n            ng-model="model.P_SEX_CONF_NO_IND"\n            value="1"\n            ng-change="radioChanged(\'P_SEX_CONF_NO_IND\', conflictPersonSexConfRadios, model); dispatcher.currentPageErrors.firstQuestionBlank = false">\n          <span translate="person.sex_confirm.no"></span>\n        </label>\n      </div>\n    </div>\n\n    <div class="col-sm-12" ng-init="conflictPersonSexRadios = [\'P_SEX_MALE_CH_IND\', \'P_SEX_FEMALE_CH_IND\']">\n      <div ng-if="model.P_SEX_CONF_NO_IND === \'1\'">\n        <p><b role="heading" aria-level="2" translate="person.sex_confirm.questionText3"></b></p>\n        <label class="radio-inline">\n          <input\n            type="radio"\n            id="male"\n            name="P_SEX_CH"\n            title="Male"\n            ng-model="model.P_SEX_MALE_CH_IND"\n            value="1"\n            ng-change="radioChanged(\'P_SEX_MALE_CH_IND\', conflictPersonSexRadios, model); dispatcher.currentPageErrors.firstQuestionBlank = false">\n          <span translate="person.sex_confirm.male"></span>\n        </label>\n        <label class="radio-inline">\n          <input\n            type="radio"\n            id="female"\n            name="P_SEX_CH"\n            title="Female"\n            ng-model="model.P_SEX_FEMALE_CH_IND"\n            value="1"\n            ng-change="radioChanged(\'P_SEX_FEMALE_CH_IND\', conflictPersonSexRadios, model); dispatcher.currentPageErrors.firstQuestionBlank = false">\n          <span translate="person.sex_confirm.female"></span>\n        </label>\n      </div>\n    </div>\n  </div>\n\n  <div class="form-group">\n    <div class="form-group" ng-init="sexConfRadios = [\'P_SEX_CONF_YES_IND\', \'P_SEX_CONF_NO_IND\']" ng-if="shouldShowRefSexConfirm(model, refPerson)">\n      <div class="col-sm-12"  >\n        <p><b role="heading" aria-level="2" translate="person.sex_confirm.questionText2"></b></p>\n        <label>\n          <input\n            type="radio"\n            name="P_SEX_CONF_REF"\n            title="Yes"\n            ng-model="refPerson.P_SEX_CONF_YES_IND"\n            value="1"\n            ng-change="radioChanged(\'P_SEX_CONF_YES_IND\', sexConfRadios, refPerson); clearSexCHFields(refPerson); dispatcher.currentPageErrors.secondQuestionBlank = false">\n          <span translate="person.sex_confirm.yes"></span>\n        </label>\n      </div>\n      <div class="col-sm-12">\n        <label>\n          <input\n            type="radio"\n            name="P_SEX_CONF_REF"\n            title="No"\n            ng-model="refPerson.P_SEX_CONF_NO_IND"\n            value="1"\n            ng-change="radioChanged(\'P_SEX_CONF_NO_IND\', sexConfRadios, refPerson); dispatcher.currentPageErrors.secondQuestionBlank = false">\n          <span translate="person.sex_confirm.no"></span>\n        </label>\n      </div>\n    </div>\n\n    <div class="col-sm-12" ng-init="sexRadios = [\'P_SEX_MALE_CH_IND\', \'P_SEX_FEMALE_CH_IND\']">\n      <div ng-if="shouldShowRefSexConfirm(model, refPerson) && refPerson.P_SEX_CONF_NO_IND === \'1\'">\n        <p><b role="heading" aria-level="2" translate="person.sex_confirm.questionText4"></b></p>\n        <label class="radio-inline">\n          <input\n            type="radio"\n            id="male"\n            name="P_SEX_CH_REF"\n            title="Male"\n            ng-model="refPerson.P_SEX_MALE_CH_IND"\n            value="1"\n            ng-change="radioChanged(\'P_SEX_MALE_CH_IND\', sexRadios, refPerson); dispatcher.currentPageErrors.secondQuestionBlank = false">\n          <span translate="person.sex_confirm.male"></span>\n        </label>\n        <label class="radio-inline">\n          <input\n            type="radio"\n            id="female"\n            name="P_SEX_CH_REF"\n            title="Female"\n            ng-model="refPerson.P_SEX_FEMALE_CH_IND"\n            value="1"\n            ng-change="radioChanged(\'P_SEX_FEMALE_CH_IND\', sexRadios, refPerson); dispatcher.currentPageErrors.secondQuestionBlank = false">\n          <span translate="person.sex_confirm.female"></span>\n        </label>\n      </div>\n    </div>\n  </div>\n\n  <div class="form-group" ng-if="shouldShowRefSexConfirm(model, refPerson) && shouldShowSexConfirmRelationship(model, refPerson)">\n    <div class="col-sm-12">\n      <p id="question" tabindex="-1" role="heading" aria-level="2">\n        <b translate="person.relationship.prefaceText"></b>\n        <br>\n        <b translate="person.relationship.questionText"></b>\n      </p>\n      <div class="radio" ng-init="radios = [\'P_REL_SPOUSE_OPP_CH_IND\', \'P_REL_PARTNER_OPP_CH_IND\', \'P_REL_SPOUSE_SAME_CH_IND\', \'P_REL_PARTNER_SAME_CH_IND\', \'P_REL_CHILD_BIO_CH_IND\', \'P_REL_CHILD_ADOPTED_CH_IND\', \'P_REL_CHILD_STEP_CH_IND\', \'P_REL_SIBLING_CH_IND\', \'P_REL_PARENT_CH_IND\', \'P_REL_GRANDCHILD_CH_IND\', \'P_REL_INLAW_PARENT_CH_IND\', \'P_REL_INLAW_CHILD_CH_IND\', \'P_REL_OTHER_REL_CH_IND\', \'P_REL_HOUSEROOMMATE_CH_IND\', \'P_REL_CHILD_FOSTER_CH_IND\', \'P_REL_OTHER_NONREL_CH_IND\']">\n        <label for="relation_1">\n        <input\n          type="radio"\n          id="relation_1"\n          name="RELATION"\n          ng-model="model.P_REL_SPOUSE_OPP_CH_IND"\n          title="Opposite-sex husband/wife/spouse"\n          value="1"\n          ng-change="radioChanged(\'P_REL_SPOUSE_OPP_CH_IND\', radios)">\n        <span translate="person.relationship.option1"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_2">\n        <input\n          type="radio"\n          id="relation_2"\n          name="RELATION"\n          ng-model="model.P_REL_PARTNER_OPP_CH_IND"\n          title="Opposite-sex Unmarried Partner"\n          value="1"\n          ng-change="radioChanged(\'P_REL_PARTNER_OPP_CH_IND\', radios)">\n        <span translate="person.relationship.option2"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_3">\n        <input\n          type="radio"\n          id="relation_3"\n          name="RELATION"\n          ng-model="model.P_REL_SPOUSE_SAME_CH_IND"\n          title="Same-sex husband/wife/spouse"\n          value="1"\n          ng-change="radioChanged(\'P_REL_SPOUSE_SAME_CH_IND\', radios)">\n        <span translate="person.relationship.option3"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_4">\n        <input\n          type="radio"\n          id="relation_4"\n          name="RELATION"\n          ng-model="model.P_REL_PARTNER_SAME_CH_IND"\n          title="Same-sex Unmarried Partner"\n          value="1"\n          ng-change="radioChanged(\'P_REL_PARTNER_SAME_CH_IND\', radios)">\n        <span translate="person.relationship.option4"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_5">\n        <input\n          type="radio"\n          id="relation_5"\n          name="RELATION"\n          ng-model="model.P_REL_CHILD_BIO_CH_IND"\n          title="Biological son or daughter"\n          value="1"\n          ng-change="radioChanged(\'P_REL_CHILD_BIO_CH_IND\', radios)">\n        <span translate="person.relationship.option5"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_6">\n        <input\n          type="radio"\n          id="relation_6"\n          name="RELATION"\n          ng-model="model.P_REL_CHILD_ADOPTED_CH_IND"\n          title="Adopted son or daughter"\n          value="1"\n          ng-change="radioChanged(\'P_REL_CHILD_ADOPTED_CH_IND\', radios)">\n        <span translate="person.relationship.option6"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_7">\n        <input\n          type="radio"\n          id="relation_7"\n          name="RELATION"\n          ng-model="model.P_REL_CHILD_STEP_CH_IND"\n          title="Stepson or stepdaughter"\n          value="1"\n          ng-change="radioChanged(\'P_REL_CHILD_STEP_CH_IND\', radios)">\n        <span translate="person.relationship.option7"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_8">\n        <input\n          type="radio"\n          id="relation_8"\n          name="RELATION"\n          ng-model="model.P_REL_SIBLING_CH_IND"\n          title="Brother or Sister"\n          value="1"\n          ng-change="radioChanged(\'P_REL_SIBLING_CH_IND\', radios)">\n        <span translate="person.relationship.option8"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_9">\n        <input\n          type="radio"\n          id="relation_9"\n          name="RELATION"\n          ng-model="model.P_REL_PARENT_CH_IND"\n          title="Father or Mother"\n          value="1"\n          ng-change="radioChanged(\'P_REL_PARENT_CH_IND\', radios)">\n        <span translate="person.relationship.option9"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_10">\n        <input\n          type="radio"\n          id="relation_10"\n          name="RELATION"\n          ng-model="model.P_REL_GRANDCHILD_CH_IND"\n          title="Grandchild"\n          value="1"\n          ng-change="radioChanged(\'P_REL_GRANDCHILD_CH_IND\', radios)">\n        <span translate="person.relationship.option10"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_11">\n        <input\n          type="radio"\n          id="relation_11"\n          name="RELATION"\n          ng-model="model.P_REL_INLAW_PARENT_CH_IND"\n          title="Parent-in-law"\n          value="1"\n          ng-change="radioChanged(\'P_REL_INLAW_PARENT_CH_IND\', radios)">\n        <span translate="person.relationship.option11"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_12">\n        <input\n          type="radio"\n          id="relation_12"\n          name="RELATION"\n          ng-model="model.P_REL_INLAW_CHILD_CH_IND"\n          title="Son-in-law or daughter-in-law"\n          value="1"\n          ng-change="radioChanged(\'P_REL_INLAW_CHILD_CH_IND\', radios)">\n        <span translate="person.relationship.option12"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_13">\n        <input\n          type="radio"\n          id="relation_13"\n          name="RELATION"\n          ng-model="model.P_REL_OTHER_REL_CH_IND"\n          title="Other relative"\n          value="1"\n          ng-change="radioChanged(\'P_REL_OTHER_REL_CH_IND\', radios)">\n        <span translate="person.relationship.option13"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_15">\n        <input\n          type="radio"\n          id="relation_15"\n          name="RELATION"\n          ng-model="model.P_REL_HOUSEROOMMATE_CH_IND"\n          title="Housemate or roommate"\n          value="1"\n          ng-change="radioChanged(\'P_REL_HOUSEROOMMATE_CH_IND\', radios)">\n        <span translate="person.relationship.option15"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_16">\n        <input\n          type="radio"\n          id="relation_16"\n          name="RELATION"\n          ng-model="model.P_REL_CHILD_FOSTER_CH_IND"\n          title="Foster Child"\n          value="1"\n          ng-change="radioChanged(\'P_REL_CHILD_FOSTER_CH_IND\', radios)">\n        <span translate="person.relationship.option16"></span></label>\n      </div>\n      <div class="radio">\n        <label for="relation_17">\n        <input\n          type="radio"\n          id="relation_17"\n          name="RELATION"\n          ng-model="model.P_REL_OTHER_NONREL_CH_IND"\n          title="Other nonrelative"\n          value="1"\n          ng-change="radioChanged(\'P_REL_OTHER_NONREL_CH_IND\', radios)">\n        <span translate="person.relationship.option17"></span></label>\n      </div>\n    </div>\n  </div>\n\n  <formbuttons dispatcher="person.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n, t) {
    var r = {
        "./cd_check.html": 625,
        "./oc.html": 626,
        "./oc_hh.html": 627,
        "./oc_p.html": 628,
        "./submit.html": 629
    };

    function a(e) {
        var n = o(e);
        return t(n)
    }

    function o(e) {
        if (!t.o(r, e)) {
            var n = new Error("Cannot find module '" + e + "'");
            throw n.code = "MODULE_NOT_FOUND", n
        }
        return r[e]
    }
    a.keys = function() {
        return Object.keys(r)
    }, a.resolve = o, e.exports = a, a.id = 624
}, function(e, n) {
    e.exports = '<p>\n  <b id="question" tabindex="-1" role="heading" aria-level="2" translate="closeout.cd_check.questionText"></b>\n</p>\n\n<div class="row">\n  <div class="col-xs-12">\n    <p ng-repeat="person in persons track by $index">\n      <span><i aria-hidden="true" class="fa fa-check-square-o green"></i>&nbsp;{{ closeout.fullName(person.data, $index) }}</span>\n    </p>\n  </div>\n</div>\n\n<p>\n  <b role="heading" aria-level="2" translate="closeout.cd_check.questionText2"></b>\n</p>\n\n<form class="form-horizontal" role="form" ng-init="model.H_SIZE_CHECK_CODE = model.H_SIZE_CHECK_CODE ? model.H_SIZE_CHECK_CODE : \'0\'" name="currentForm" novalidate>\n  <div class="form-group">\n    <div class="col-sm-12">\n      <label>\n        <input\n          name="H_SIZE_CHECK_CODE"\n          type="radio"\n          id="popcount"\n          ng-model="model.H_SIZE_CHECK_CODE"\n          value="1">\n        <span translate="closeout.cd_check.popcount"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n        <input\n          name="H_SIZE_CHECK_CODE"\n          type="radio"\n          id="personcount"\n          ng-model="model.H_SIZE_CHECK_CODE"\n          value="2">\n        <span translate="closeout.cd_check.personcount"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n        <input\n          name="H_SIZE_CHECK_CODE"\n          type="radio"\n          id="other"\n          ng-model="model.H_SIZE_CHECK_CODE"\n          value="3">\n        <span translate="closeout.cd_check.other"></span>\n      </label>\n    </div>\n  </div>\n  <div class="row" ng-if="model.H_SIZE_CHECK_CODE == 3">\n    <div class="col-sm-12">\n      <label for="H_SIZE_CHECK_CNT" class="control-label" translate="closeout.cd_check.number"></label>\n    </div>\n    <div class="col-sm-1">\n      <p>\n        <input type="text"\n               class="form-control is-number"\n               id="H_SIZE_CHECK_CNT"\n               title="Other"\n               ng-model="model.H_SIZE_CHECK_CNT"\n               name="H_SIZE_CHECK_CNT"\n               maxlength="2"\n               ng-maxlength="2"\n               ng-size="2"\n               size="2"\n               ng-pattern="/^[0-9]+$/"\n               input-filter="^[0-9]*$"\n               inputmode="decimal"\n               pattern="[0-9]*"\n        >\n      </p>\n    </div>\n  </div>\n  <formbuttons dispatcher="closeout.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="closeout.generic.error" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentPageValid"></div>\n\n<p>\n  <b id="question" tabindex="-1" role="heading" aria-level="2" translate="closeout.oc.questionText"></b>\n  <help title="\'Help\'" part="\'app/closeout/help\'" content="\'/static/partials/oc.help.partial.html\'"></help>\n</p>\n\n<p>\n  <span class="questionTip" translate="closeout.oc.questionTip"></span>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <div class="form-group">\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_NO_IND"\n        title="No"\n        ng-model="model.P_LOC_ELSE_NO_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_RELATIVES_IND === \'1\' || model.P_LOC_ELSE_COLLEGE_IND === \'1\' || model.P_LOC_ELSE_MILITARY_IND === \'1\' || model.P_LOC_ELSE_JOB_IND === \'1\' || model.P_LOC_ELSE_NURSINGHOME_IND === \'1\' || model.P_LOC_ELSE_JAIL_IND === \'1\' || model.P_LOC_ELSE_SEASONAL_IND === \'1\' || model.P_LOC_ELSE_OTHER_IND === \'1\'">\n        <span translate="closeout.oc.no"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_RELATIVES_IND"\n        title="Relatives"\n        ng-model="model.P_LOC_ELSE_RELATIVES_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc.relatives"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_COLLEGE_IND"\n        title="College"\n        ng-model="model.P_LOC_ELSE_COLLEGE_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc.college"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_MILITARY_IND"\n        title="Military"\n        ng-model="model.P_LOC_ELSE_MILITARY_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc.military"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_JOB_IND"\n        title="Job"\n        ng-model="model.P_LOC_ELSE_JOB_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc.job"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_NURSINGHOME_IND"\n        title="Nursing Home"\n        ng-model="model.P_LOC_ELSE_NURSINGHOME_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc.nursinghome"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_JAIL_IND"\n        title="Jail"\n        ng-model="model.P_LOC_ELSE_JAIL_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc.jail"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_SEASONAL_IND"\n        title="Seasonal"\n        ng-model="model.P_LOC_ELSE_SEASONAL_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc.seasonal"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_OTHER_IND"\n        title="Other"\n        ng-model="model.P_LOC_ELSE_OTHER_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc.other"></span>\n      </label>\n    </div>\n  </div>\n  <div class="form-group" ng-if="model.P_LOC_ELSE_OTHER_IND === \'1\'">\n    <p><span class="questionTip" translate="closeout.oc.writeIn" style="margin-left: 15px;"></span></p>\n    <div class="col-xs-12 col-sm-6">\n      <label class="sr-only" for="P_LOC_ELSE_OTHER_TEXT">For what reason?</label>\n      <input name="P_LOC_ELSE_OTHER_TEXT"\n             type="text"\n             class="form-control"\n             id="P_LOC_ELSE_OTHER_TEXT"\n             title="For what reason?"\n             ng-model="model.P_LOC_ELSE_OTHER_TEXT"\n             style="width:100%"\n             maxlength="250"\n             ng-maxlength="250">\n    </div>\n  </div>\n\n  <formbuttons dispatcher="closeout.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="closeout.generic.error" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentPageValid"></div>\n\n<p>\n  <b id="question" tabindex="-1" role="heading" aria-level="2" translate="closeout.oc_hh.questionText"></b>\n  <help title="\'Help\'" part="\'app/closeout/help\'" content="\'/static/partials/oc.help.partial.html\'"></help>\n</p>\n\n<p>\n  <span translate="closeout.oc_hh.questionTip"></span>\n  <ul>\n    <li translate="closeout.oc_hh.relatives"></li>\n    <li translate="closeout.oc_hh.college"></li>\n    <li translate="closeout.oc_hh.military"></li>\n    <li translate="closeout.oc_hh.job"></li>\n    <li translate="closeout.oc_hh.nursinghome"></li>\n    <li translate="closeout.oc_hh.jail"></li>\n    <li translate="closeout.oc_hh.seasonal"></li>\n  </ul>\n</p>\n\n<p><strong role="heading" aria-level="2" translate="closeout.oc_hh.questionText2"></strong></p>\n\n<p>\n  <span class="questionTip" translate="closeout.oc_hh.questionTip2"></span>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <div class="form-group">\n    <div class="col-sm-12" ng-repeat="person in persons track by $index">\n      <label>\n      <input\n        type="checkbox"\n        ng-model="person.data.P_LOC_ELSE_YES_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.H_OC_ELSE_NO_IND === \'1\'">\n        <span>{{getFullName($index)}}</span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        ng-model="model.H_OC_ELSE_NO_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="disableOcNone()"\n        ng-change="selectedOcNone()">\n        <span translate="closeout.oc_hh.none"></span>\n      </label>\n    </div>\n  </div>\n  {{roster}}\n  <formbuttons dispatcher="closeout.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div role="alert" class="alert alert-info" translate="closeout.generic.error" ng-if="dispatcher.currentPageAttempt == 1 && !dispatcher.currentPageValid"></div>\n\n<p>\n  <b id="question" tabindex="-1" role="heading" aria-level="2" translate="closeout.oc_p.questionText"></b>\n  <help title="\'Help\'" part="\'app/closeout/help\'" content="\'/static/partials/oc.help.partial.html\'"></help>\n</p>\n\n<p>\n  <span class="questionTip" translate="closeout.oc_p.questionTip"></span>\n</p>\n\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <div class="form-group">\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_RELATIVES_IND"\n        title="Relatives"\n        ng-model="model.P_LOC_ELSE_RELATIVES_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc_p.relatives"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_COLLEGE_IND"\n        title="College"\n        ng-model="model.P_LOC_ELSE_COLLEGE_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc_p.college"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_MILITARY_IND"\n        title="Military"\n        ng-model="model.P_LOC_ELSE_MILITARY_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc_p.military"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_JOB_IND"\n        title="Job"\n        ng-model="model.P_LOC_ELSE_JOB_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc_p.job"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_NURSINGHOME_IND"\n        title="Nursing Home"\n        ng-model="model.P_LOC_ELSE_NURSINGHOME_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc_p.nursinghome"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_JAIL_IND"\n        title="Jail"\n        ng-model="model.P_LOC_ELSE_JAIL_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc_p.jail"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_SEASONAL_IND"\n        title="Seasonal"\n        ng-model="model.P_LOC_ELSE_SEASONAL_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc_p.seasonal"></span>\n      </label>\n    </div>\n    <div class="col-sm-12">\n      <label>\n      <input\n        type="checkbox"\n        id="P_LOC_ELSE_OTHER_IND"\n        title="Other"\n        ng-model="model.P_LOC_ELSE_OTHER_IND"\n        ng-true-value="\'1\'"\n        ng-false-value="\'0\'"\n        ng-disabled="model.P_LOC_ELSE_NO_IND === \'1\'">\n        <span translate="closeout.oc_p.other"></span>\n      </label>\n    </div>\n  </div>\n  <div class="form-group" ng-if="model.P_LOC_ELSE_OTHER_IND === \'1\'">\n    <p><span class="questionTip" translate="closeout.oc_p.writeIn"></span></p>\n    <div class="col-xs-10 col-sm-6">\n      <label class="sr-only" for="P_LOC_ELSE_OTHER_TEXT">For what reason?</label>\n      <input name="P_LOC_ELSE_OTHER_TEXT"\n             type="text"\n             class="form-control"\n             id="P_LOC_ELSE_OTHER_TEXT"\n             title="For what reason?"\n             ng-model="model.P_LOC_ELSE_OTHER_TEXT"\n             maxlength="250"\n             ng-maxlength="250"\n             ng-size="45"\n             size="45">\n    </div>\n  </div>\n\n  <formbuttons dispatcher="closeout.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<p translate="closeout.submit.text1"></p>\n<p class="strong" translate="closeout.submit.text2"></p>\n<form class="form-horizontal" role="form" name="currentForm" novalidate>\n  <formbuttons custom-prev-name="\'dialogs.cancel\'" custom-next-name="\'dialogs.submit\'" show-full-text-on-mobile="1" larger-buttons="1" dispatcher="closeout.dispatcher"></formbuttons>\n</form>\n'
}, function(e, n) {
    e.exports = '<div class="text-center">\n  <h1 translate="confirmation.p1" class="confirmation-header"></h1>\n  <p><strong translate="confirmation.address"></strong></p>\n  <p class="margin-top-25"><strong translate="confirmation.timestamp"></strong></p>\n  <p class="margin-top-25"><strong translate="confirmation.p2"></strong></p>\n  <p class="margin-top-25"><span translate="confirmation.p3"></span></p>\n  <p class="margin-top-25"><span ng-show="state == \'US\'" translate="confirmation.phone"></span></p>\n  <p class="margin-top-25"><span ng-show="state == \'PR\'" translate="confirmation.phonePr"></span></p>\n  <p class="margin-top-25"><h2 translate="confirmation.confirmationNumber" class="confirmation-blue"></h2></p>\n  <p class="margin-top-25"><a href="https://www.2020census.gov" target="_blank"><span class="strong" translate="confirmation.link"></span></a></p>\n  <p class="margin-top-25"><generatePDF confirmation-number="CONFIRMATION_NUMBER" class="margin-top-25"></generatePDF></p>\n  <p class="margin-top-25"><span translate="confirmation.closeBrowser" class="margin-top-25"></span></p>\n</div>\n'
}, function(e, n) {
    e.exports = '<p><b translate="nocomplete.p1"></b></p>\n<p><b translate="nocomplete.p2"></b></p>\n<p translate="nocomplete.p3"></p>\n'
}, function(e, n) {
    e.exports = '<div class="text-center">\n  <p>\n    <strong id="question" tabindex="-1" role="heading" aria-level="2" translate="goodbye.p1"></strong>\n  </p>\n  <p translate="goodbye.p2"></p>\n  <p translate="goodbye.p3"></p>\n</div>\n'
}, function(e, n, t) {
    "use strict";
    var r, a = t(14),
        o = (r = a) && r.__esModule ? r : {
            default: r
        };

    function i(e, n) {
        var t = (0, o.default)(n, "appdata.lastState", "intro"),
            r = (0, o.default)(n, "appdata.lastParams", {});
        e.go(t, r)
    }
    e.exports = i, i.$inject = ["$state", "centurionStorageData"]
}, function(e, n, t) {
    "use strict";
    var r, a = t(14),
        o = (r = a) && r.__esModule ? r : {
            default: r
        };

    function i(e, n, t, r, a, i, s, l) {
        e.intro = r, e.roster = r.roster, e.model = r.dispatcher.model, e.dispatcher = r.dispatcher, e.states = s, e.translateVals = {
            REFDATE: i.format,
            BEFORE: i.before(),
            ADDRESS: '<span dir="ltr" class="word-break-all">' + l.getStreetAddress() + "</span>",
            YEAR: i.year,
            USERID: (0, o.default)(e, "model.RESP_VERIFIED_USER_ID", "").replace(/(.{4})(.{4})(.{4})/, "$1-$2-$3").toUpperCase()
        }, e.$watch("currentForm.$valid", function(e) {
            void 0 !== e && (r.dispatcher.currentPageValid = e)
        }), n.$on("refDateTranslated", function() {
            e.translateVals.REFDATE = i.format
        }), e.radioChanged = function(n, t) {
            t.forEach(function(n) {
                e.model[n] = "0"
            }), e.model[n] = "1"
        }
    }
    e.exports = i, i.$inject = ["$scope", "$rootScope", "$location", "introService", "configConstants", "refDate", "states", "addressService"]
}, function(e, n, t) {
    "use strict";
    var r = o(t(14)),
        a = o(t(636));

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function i(e, n, t, o, i, s, l) {
        e.closeout = n, e.model = n.dispatcher.model, e.dispatcher = n.dispatcher, e.currentPage = (0, r.default)(n, "dispatcher.currentPage.name", ""), e.persons = n.persons(), e.POPCOUNT = (0, r.default)(o, "dispatcher.model.H_SIZE_STATED_CNT"), e.PERSONCOUNT = (0, r.default)(i, "data.respondent.persons", []).length.toString(), e.translateVals = {
            NAME: l.fullName(e.model, n.personIndex),
            ADDRESS: '<span dir="ltr" class="word-break-all">' + o.getAddress(void 0, void 0, o.rtnpSource()) + "</span>",
            REFDATE: s.format,
            BEFORE: s.before(),
            PERSONCOUNT: e.PERSONCOUNT,
            POPCOUNT: e.POPCOUNT,
            HASMULTIPLEPEOPLE: 1 === (0, r.default)(i, "data.respondent.persons", []).length ? "no" : "yes"
        }, e.$watch("currentForm.$valid", function(e) {
            void 0 !== e && (n.dispatcher.currentPageValid = e)
        }), e.selectedOcNone = function() {
            for (var n = e.persons, t = 0; t < n.length; t += 1) {
                var r = n[t].data;
                "1" === r.P_LOC_ELSE_YES_IND && (r.P_LOC_ELSE_YES_IND = "0")
            }
        }, e.disableOcNone = function() {
            return !!(0, a.default)(e.persons, function(e) {
                return "1" === e.data.P_LOC_ELSE_YES_IND
            })
        }, e.getFullName = function(e) {
            return t.getFullName(e)
        }, e.radioChanged = function(n, t) {
            t.forEach(function(n) {
                e.model[n] = "0"
            }), e.model[n] = "1"
        }
    }
    e.exports = i, i.$inject = ["$scope", "closeoutService", "personService", "householdService", "centurionStorageService", "refDate", "rosterService"]
}, function(e, n, t) {
    var r = t(637)(t(666));
    e.exports = r
}, function(e, n, t) {
    var r = t(71),
        a = t(39),
        o = t(70);
    e.exports = function(e) {
        return function(n, t, i) {
            var s = Object(n);
            if (!a(n)) {
                var l = r(t, 3);
                n = o(n), t = function(e) {
                    return l(s[e], e, s)
                }
            }
            var c = e(n, t, i);
            return c > -1 ? s[l ? n[c] : c] : void 0
        }
    }
}, function(e, n, t) {
    var r = t(639),
        a = t(658),
        o = t(218);
    e.exports = function(e) {
        var n = a(e);
        return 1 == n.length && n[0][2] ? o(n[0][0], n[0][1]) : function(t) {
            return t === e || r(t, e, n)
        }
    }
}, function(e, n, t) {
    var r = t(145),
        a = t(213),
        o = 1,
        i = 2;
    e.exports = function(e, n, t, s) {
        var l = t.length,
            c = l,
            u = !s;
        if (null == e) return !c;
        for (e = Object(e); l--;) {
            var d = t[l];
            if (u && d[2] ? d[1] !== e[d[0]] : !(d[0] in e)) return !1
        }
        for (; ++l < c;) {
            var p = (d = t[l])[0],
                _ = e[p],
                f = d[1];
            if (u && d[2]) {
                if (void 0 === _ && !(p in e)) return !1
            } else {
                var h = new r;
                if (s) var m = s(_, f, p, e, n, h);
                if (!(void 0 === m ? a(f, _, o | i, s, h) : m)) return !1
            }
        }
        return !0
    }
}, function(e, n, t) {
    var r = t(145),
        a = t(214),
        o = t(646),
        i = t(649),
        s = t(216),
        l = t(15),
        c = t(97),
        u = t(98),
        d = 1,
        p = "[object Arguments]",
        _ = "[object Array]",
        f = "[object Object]",
        h = Object.prototype.hasOwnProperty;
    e.exports = function(e, n, t, m, g, v) {
        var E = l(e),
            T = l(n),
            R = E ? _ : s(e),
            b = T ? _ : s(n),
            P = (R = R == p ? f : R) == f,
            A = (b = b == p ? f : b) == f,
            S = R == b;
        if (S && c(e)) {
            if (!c(n)) return !1;
            E = !0, P = !1
        }
        if (S && !P) return v || (v = new r), E || u(e) ? a(e, n, t, m, g, v) : o(e, n, R, t, m, g, v);
        if (!(t & d)) {
            var N = P && h.call(e, "__wrapped__"),
                D = A && h.call(n, "__wrapped__");
            if (N || D) {
                var I = N ? e.value() : e,
                    O = D ? n.value() : n;
                return v || (v = new r), g(I, O, t, m, v)
            }
        }
        return !!S && (v || (v = new r), i(e, n, t, m, g, v))
    }
}, function(e, n, t) {
    var r = t(140),
        a = t(642),
        o = t(643);

    function i(e) {
        var n = -1,
            t = null == e ? 0 : e.length;
        for (this.__data__ = new r; ++n < t;) this.add(e[n])
    }
    i.prototype.add = i.prototype.push = a, i.prototype.has = o, e.exports = i
}, function(e, n) {
    var t = "__lodash_hash_undefined__";
    e.exports = function(e) {
        return this.__data__.set(e, t), this
    }
}, function(e, n) {
    e.exports = function(e) {
        return this.__data__.has(e)
    }
}, function(e, n) {
    e.exports = function(e, n) {
        for (var t = -1, r = null == e ? 0 : e.length; ++t < r;)
            if (n(e[t], t, e)) return !0;
        return !1
    }
}, function(e, n) {
    e.exports = function(e, n) {
        return e.has(n)
    }
}, function(e, n, t) {
    var r = t(66),
        a = t(203),
        o = t(67),
        i = t(214),
        s = t(647),
        l = t(648),
        c = 1,
        u = 2,
        d = "[object Boolean]",
        p = "[object Date]",
        _ = "[object Error]",
        f = "[object Map]",
        h = "[object Number]",
        m = "[object RegExp]",
        g = "[object Set]",
        v = "[object String]",
        E = "[object Symbol]",
        T = "[object ArrayBuffer]",
        R = "[object DataView]",
        b = r ? r.prototype : void 0,
        P = b ? b.valueOf : void 0;
    e.exports = function(e, n, t, r, b, A, S) {
        switch (t) {
            case R:
                if (e.byteLength != n.byteLength || e.byteOffset != n.byteOffset) return !1;
                e = e.buffer, n = n.buffer;
            case T:
                return !(e.byteLength != n.byteLength || !A(new a(e), new a(n)));
            case d:
            case p:
            case h:
                return o(+e, +n);
            case _:
                return e.name == n.name && e.message == n.message;
            case m:
            case v:
                return e == n + "";
            case f:
                var N = s;
            case g:
                var D = r & c;
                if (N || (N = l), e.size != n.size && !D) return !1;
                var I = S.get(e);
                if (I) return I == n;
                r |= u, S.set(e, n);
                var O = i(N(e), N(n), r, b, A, S);
                return S.delete(e), O;
            case E:
                if (P) return P.call(e) == P.call(n)
        }
        return !1
    }
}, function(e, n) {
    e.exports = function(e) {
        var n = -1,
            t = Array(e.size);
        return e.forEach(function(e, r) {
            t[++n] = [r, e]
        }), t
    }
}, function(e, n) {
    e.exports = function(e) {
        var n = -1,
            t = Array(e.size);
        return e.forEach(function(e) {
            t[++n] = e
        }), t
    }
}, function(e, n, t) {
    var r = t(650),
        a = 1,
        o = Object.prototype.hasOwnProperty;
    e.exports = function(e, n, t, i, s, l) {
        var c = t & a,
            u = r(e),
            d = u.length;
        if (d != r(n).length && !c) return !1;
        for (var p = d; p--;) {
            var _ = u[p];
            if (!(c ? _ in n : o.call(n, _))) return !1
        }
        var f = l.get(e);
        if (f && l.get(n)) return f == n;
        var h = !0;
        l.set(e, n), l.set(n, e);
        for (var m = c; ++p < d;) {
            var g = e[_ = u[p]],
                v = n[_];
            if (i) var E = c ? i(v, g, _, n, e, l) : i(g, v, _, e, n, l);
            if (!(void 0 === E ? g === v || s(g, v, t, i, l) : E)) {
                h = !1;
                break
            }
            m || (m = "constructor" == _)
        }
        if (h && !m) {
            var T = e.constructor,
                R = n.constructor;
            T != R && "constructor" in e && "constructor" in n && !("function" == typeof T && T instanceof T && "function" == typeof R && R instanceof R) && (h = !1)
        }
        return l.delete(e), l.delete(n), h
    }
}, function(e, n, t) {
    var r = t(651),
        a = t(652),
        o = t(70);
    e.exports = function(e) {
        return r(e, o, a)
    }
}, function(e, n, t) {
    var r = t(151),
        a = t(15);
    e.exports = function(e, n, t) {
        var o = n(e);
        return a(e) ? o : r(o, t(e))
    }
}, function(e, n, t) {
    var r = t(215),
        a = t(653),
        o = Object.prototype.propertyIsEnumerable,
        i = Object.getOwnPropertySymbols,
        s = i ? function(e) {
            return null == e ? [] : (e = Object(e), r(i(e), function(n) {
                return o.call(e, n)
            }))
        } : a;
    e.exports = s
}, function(e, n) {
    e.exports = function() {
        return []
    }
}, function(e, n, t) {
    var r = t(54)(t(29), "DataView");
    e.exports = r
}, function(e, n, t) {
    var r = t(54)(t(29), "Promise");
    e.exports = r
}, function(e, n, t) {
    var r = t(54)(t(29), "Set");
    e.exports = r
}, function(e, n, t) {
    var r = t(54)(t(29), "WeakMap");
    e.exports = r
}, function(e, n, t) {
    var r = t(217),
        a = t(70);
    e.exports = function(e) {
        for (var n = a(e), t = n.length; t--;) {
            var o = n[t],
                i = e[o];
            n[t] = [o, i, r(i)]
        }
        return n
    }
}, function(e, n, t) {
    var r = t(213),
        a = t(14),
        o = t(660),
        i = t(139),
        s = t(217),
        l = t(218),
        c = t(60),
        u = 1,
        d = 2;
    e.exports = function(e, n) {
        return i(e) && s(n) ? l(c(e), n) : function(t) {
            var i = a(t, e);
            return void 0 === i && i === n ? o(t, e) : r(n, i, u | d)
        }
    }
}, function(e, n, t) {
    var r = t(661),
        a = t(662);
    e.exports = function(e, n) {
        return null != e && a(e, n, r)
    }
}, function(e, n) {
    e.exports = function(e, n) {
        return null != e && n in Object(e)
    }
}, function(e, n, t) {
    var r = t(88),
        a = t(68),
        o = t(15),
        i = t(69),
        s = t(149),
        l = t(60);
    e.exports = function(e, n, t) {
        for (var c = -1, u = (n = r(n, e)).length, d = !1; ++c < u;) {
            var p = l(n[c]);
            if (!(d = null != e && t(e, p))) break;
            e = e[p]
        }
        return d || ++c != u ? d : !!(u = null == e ? 0 : e.length) && s(u) && i(p, u) && (o(e) || a(e))
    }
}, function(e, n, t) {
    var r = t(664),
        a = t(665),
        o = t(139),
        i = t(60);
    e.exports = function(e) {
        return o(e) ? r(i(e)) : a(e)
    }
}, function(e, n) {
    e.exports = function(e) {
        return function(n) {
            return null == n ? void 0 : n[e]
        }
    }
}, function(e, n, t) {
    var r = t(138);
    e.exports = function(e) {
        return function(n) {
            return r(n, e)
        }
    }
}, function(e, n, t) {
    var r = t(200),
        a = t(71),
        o = t(95),
        i = Math.max;
    e.exports = function(e, n, t) {
        var s = null == e ? 0 : e.length;
        if (!s) return -1;
        var l = null == t ? 0 : o(t);
        return l < 0 && (l = i(s + l, 0)), r(e, a(n, 3), l)
    }
}, function(e, n, t) {
    "use strict";
    var r = o(t(14)),
        a = o(t(17));

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function i(e, n, t, o, i, s, l) {
        if (e.CONFIRMATION_NUMBER = n.params.CONFIRMATION_NUMBER, l.handleEndAction(), e.translateVals = {
                ADDRESS: '<span dir="ltr" class="word-break-all">' + o.getAddress(void 0, void 0, o.rtnpSource(), "fullMaps") + "</span>",
                TIMESTAMP: u(t.use()),
                CONFIRMATION: e.CONFIRMATION_NUMBER,
                YEAR: s.year
            }, "id" === (0, r.default)(i, "data.appdata.accountType")) e.state = "PR" === (0, r.default)(i, "data.respondent.prelist.state") ? "PR" : "US";
        else {
            var c = (0, r.default)(i, "data.respondent.verification.data.RESP_LOC_OCD_CTRY_CODE");
            e.state = "1" === c ? "US" : "PR"
        }

        function u(e) {
            "zh" === (e = e || "en") && (e = "zh-cn"), "tl" === e && (e = "tl-ph"), "ht" === e && (e = "fr");
            var n = (0, a.default)().locale(e).format("LLLL");
            return "es" === e && (n = n.toLowerCase()), n
        }
        e.$on("i18n-language-changed", function() {
            e.translateVals.TIMESTAMP = u(t.use())
        })
    }
    e.exports = i, i.$inject = ["$scope", "$state", "$translate", "householdService", "centurionStorageService", "refDate", "sourceTrackingIndicatorService"]
}, function(e, n, t) {
    "use strict";

    function r(e, n, t) {
        t.handleEndAction(), e.translateVals = {
            BEFORE: n.before(),
            REFDATE: n.format,
            YEAR: n.year
        }, e.$on("refDateTranslated", function() {
            e.translateVals.REFDATE = n.format
        })
    }
    e.exports = r, r.$inject = ["$scope", "refDate", "sourceTrackingIndicatorService"]
}, function(e, n, t) {
    "use strict";

    function r(e, n, t, r, a, o, i) {
        var s = t.get("householdService"),
            l = t.get("personService");
        if (i && i.state && "redirect" === i.action) n.go(i.state);
        else if (r.data.appdata.noComplete) n.go("nocomplete");
        else if (r.data.appdata.submitted) n.go("complete");
        else {
            if (s.household().metadata.finished ? (e.state = "review", e.householdButtonClass = "btn-primary") : s.household().metadata.started ? (e.state = "resume", e.householdButtonClass = "btn-info") : (e.state = "start", e.householdButtonClass = "btn-success"), e.household = s, e.personService = l, e.persons = r.data.respondent.persons, e.data = i, e.translateValues = {
                    YEAR: o.refdate.format("YYYY")
                }, s.household().metadata.started)(r.data.respondent.persons.length || 0) >= 99 && (e.personLimitReached = !0);
            e.shouldShowFinalQuestions = function() {
                return r.data.respondent.household.metadata.finished && c(r.data.respondent.persons)
            }, e.shouldShowPeopleStart = function() {
                return r.data.respondent.household.metadata.finished && !c(r.data.respondent.persons)
            }
        }

        function c(e) {
            var n = !0;
            return angular.forEach(e, function(e) {
                e.metadata.finished || (n = !1)
            }), n
        }
    }
    e.exports = r, r.$inject = ["$scope", "$state", "$injector", "centurionStorageService", "alertService", "configConstants", "centurionStorageData"]
}, function(e, n, t) {
    "use strict";

    function r(e, n, t, r) {
        e.translateVals = {
            YEAR: r.year
        }, e.hideClose = t.hideClose, e.header = t.header, e.msg = t.msg, e.noHeader = t.noHeader || !1, e.customText = t.customText, e.customYes = t.customYes, e.customNo = t.customNo, e.yes = function() {
            n.close("yes")
        }, e.no = function(e) {
            e ? n.close("closedWithX") : n.close("no")
        }
    }
    e.exports = r, r.$inject = ["$scope", "$uibModalInstance", "data", "refDate"]
}, function(e, n, t) {
    "use strict";

    function r(e, n, t) {
        e.header = t.header, e.msg = t.msg, e.ok = function() {
            n.close("yes")
        }
    }
    e.exports = r, r.$inject = ["$scope", "$uibModalInstance", "data"]
}, function(e, n, t) {
    "use strict";

    function r(e, n, t, r, a, o) {
        e.warningLength = o.warningLength;
        var i = t(function() {
                r.location.href = "/logout?session_timeout=1"
            }, e.warningLength),
            s = n(function() {
                e.warningLength <= 0 ? n.cancel(s) : (e.warningLength -= 1e3, e.setTime())
            }, 1e3, 120);
        e.ok = function() {
            n.cancel(s), t.cancel(i), a.close("ok")
        }, e.setTime = function() {
            e.minutesSr = Math.floor(e.warningLength / 1e3 / 60), e.minutes = e.minutesSr < 10 ? "0" + e.minutesSr : e.minutesSr, e.secondsSr = Math.floor(e.warningLength / 1e3 % 60), e.seconds = e.secondsSr < 10 ? "0" + e.secondsSr : e.secondsSr
        }, e.setTime()
    }
    e.exports = r, r.$inject = ["$scope", "$interval", "$timeout", "$window", "$uibModalInstance", "heartbeatService"]
}, function(e, n, t) {
    "use strict";

    function r(e, n, t, r, a, o, i) {
        e.household = a, e.rosterService = i, e.roster = i.roster, e.refDate = o, e.config = r, e.translateVals = {
            ADDRESS: '<span dir="ltr" class="word-break-all">' + a.getAddress(void 0, void 0, a.rtnpSource()) + "</span>",
            REFDATE: o.format,
            TENURE: "1" === a.dispatcher.model.H_TENURE_RENTED_IND ? "rent" : "own",
            BEFORE: o.before(),
            HOME: o.before() + ("1" === a.dispatcher.model.H_TENURE_RENTED_IND ? "rent" : "own"),
            PERSONCOUNT: a.personCount(),
            POPCOUNT: a.dispatcher.model.H_SIZE_STATED_CNT,
            HASMULTIPLEPEOPLE: 1 === a.personCount(a.dispatcher.model) ? "no" : "yes",
            YEAR: o.year
        }, e.model = a.dispatcher.model, e.dispatcher = a.dispatcher, e.$watch("currentForm.$valid", function(e) {
            void 0 !== e && (a.dispatcher.currentPageValid = e)
        }), e.$watch("model.H_SIZE_STATED_CNT", function(n) {
            e.translateVals.POPCOUNT = n
        }), e.$watch("dispatcher.currentPageErrors.popcountError", function() {
            e.translateVals.PERSONCOUNT = a.personCount(a.dispatcher.model), e.translateVals.HASMULTIPLEPEOPLE = 1 === e.translateVals.PERSONCOUNT ? "no" : "yes"
        }), n.$on("refDateTranslated", function() {
            e.translateVals.REFDATE = o.format
        }), e.radioChanged = function(n, t) {
            t.forEach(function(n) {
                e.model[n] = "0"
            }), e.model[n] = "1"
        }, e.ensureUcRosterFieldsPresence = function() {
            var n = i.roster.filter(function(e) {
                return "uc" === e.from
            }).length;
            "1" !== e.model.H_UC_ADD_YES_IND || n || a.addToRoster()
        }
    }
    e.exports = r, r.$inject = ["$scope", "$rootScope", "$location", "configConstants", "householdService", "refDate", "rosterService"]
}, function(e, n, t) {
    "use strict";

    function r(e, n, t, r, a, o, i) {
        e.person = r, r.currentFormAttempted = !1, e.model = r.dispatcher.model, e.dispatcher = r.dispatcher, e.code = r.dispatcher.currentPage.data.code, e.state = r.state, e.refPerson = r.referencePersonModel(), e.fullname = function() {
            if (0 === r.personIndex && "sex_confirm" === r.dispatcher.currentPage.name) return r.getFullName(r.conflictPersons[r.conflictPersonIndex]);
            return r.getFullName()
        }(), e.states = i, e.translateVals = {
            NAME: e.fullname,
            REFDATE: o.format,
            BEFORE: o.before(),
            REFNAME: r.getFullName(0),
            ADDRESS: '<span dir="ltr" class="word-break-all">' + a.getStreetAddress() + "</span>",
            REFSEX: l(e.refPerson),
            SEX: l(e.model),
            STATE: e.state,
            YEAR: o.year
        }, e.$watch("currentForm.$valid", function(e) {
            void 0 !== e && (r.dispatcher.currentPageValid = e)
        }), n.$on("refDateTranslated", function() {
            e.translateVals.REFDATE = o.format
        }), e.years = [];
        for (var s = o.dayjs.year(); s >= o.dayjs.year() - 126; s -= 1) e.years.push(s);

        function l(e) {
            return "1" === e.P_SEX_MALE_IND ? "male" : "1" === e.P_SEX_FEMALE_IND ? "female" : "no response"
        }
        e.radioChanged = function(n, t, r) {
            var a = void 0 !== r ? r : e.model;
            t.forEach(function(e) {
                a[e] = "0"
            }), a[n] = "1"
        }, e.clearSexCHFields = r.clearSexCHFields, e.hasSexRelConflictResolved = r.hasSexRelConflictResolved, e.shouldShowSexConfirmRelationship = r.shouldShowSexConfirmRelationship, e.shouldShowRefSexConfirm = r.shouldShowRefSexConfirm
    }
    e.exports = r, r.$inject = ["$scope", "$rootScope", "$location", "personService", "addressService", "refDate", "states"]
}, function(e, n, t) {
    "use strict";

    function r(e, n, t, r, a) {
        n.defaultErrorHandler(function(e) {
            2 !== e.type && console.error(e)
        }), t.onBefore({
            to: "*"
        }, function(e) {
            return !(a.hasData && (a.data.appdata.submitted || a.data.appdata.noComplete) && (n = e, t = n.$to().name, "confirmation" !== t && "nocomplete" !== t));
            var n, t
        }), t.onError({
            to: "*"
        }, function(e) {
            "session check failed" === e.error().detail && a.killSession()
        }), t.onSuccess({
            to: "*"
        }, function(e) {
            a.data && a.data.appdata && (a.data.appdata.lastState = e.$to().name, a.data.appdata.lastParams = e.$to().params)
        }), e.$on("$viewContentLoaded", function() {
            var e = r.document.getElementById("question");
            e && e.focus()
        })
    }
    e.exports = r, r.$inject = ["$rootScope", "$state", "$transitions", "$window", "centurionStorageService"]
}, function(e, n, t) {
    "use strict";

    function r(e, n, t) {
        e.home = function(e) {
            return e._resetPageDefaults(), e.return(), t.saveData().catch(function() {})
        }, e.goToPage = function(e, n) {
            return n.currentPage = n.map[e], n.goto(e), t.saveData().catch(function() {})
        }
    }
    e.exports = function() {
        return {
            restrict: "E",
            template: t(677),
            scope: {
                dispatcher: "=",
                page: "="
            },
            controller: r
        }
    }, r.$inject = ["$scope", "$state", "centurionStorageService"]
}, function(e, n) {
    e.exports = '<ol class="breadcrumb hidden-xs">\n  <li><a href="#" title="Home" name="breadcrumb home" ng-click="home(dispatcher)" translate="breadcrumb.home"></a></li>\n  <li ng-if="page != \'name\' && page !=\'sex_confirm\'" ng-repeat="page in dispatcher.metadata.path track by $index">\n    <a ng-if="page !== dispatcher.currentPage.name" href="#" translate-attr="{ title: \'breadcrumb.\' + page }" name="{{page}}" ng-click="goToPage(page, dispatcher)" translate="breadcrumb.{{page}}"></a>\n    <span ng-if="page === dispatcher.currentPage.name" translate-attr="{ title: \'breadcrumb.\' + page }" name="{{page}}" translate="breadcrumb.{{page}}"></span>\n  </li>\n</ol>\n'
}, function(e, n, t) {
    "use strict";

    function r(e, n, r, a, o, i) {
        var s = {
            type: "danger",
            translationId: "alerts.miscError"
        };
        e.openConfirm = function() {
            return e.isLoading = !0, void t.e(3).then(t.t.bind(null, 728, 7)).then(function(r) {
                t.e(3).then(t.t.bind(null, 729, 7)).then(function(t) {
                    r.default.vfs = t.pdfMake.vfs, r.default.createPdf({
                        content: [{
                            text: "Thank you for completing the 2020 Census questionnaire for:",
                            margin: [50, 10],
                            style: "header"
                        }, {
                            text: i.getStreetAddress(void 0, void 0, o.rtnpSource(), "fullMaps"),
                            margin: [50, 5],
                            style: "paragraph"
                        }, {
                            text: "Confirmation #: " + e.confirmationNumber,
                            margin: [50, 5],
                            style: ["paragraph", "confirmationNumber"]
                        }, {
                            text: Date(),
                            margin: [50, 5],
                            style: "header"
                        }, {
                            text: "If you receive other mail from the Census Bureau about the 2020 Census in the next few days, please disregard it. That mail may have been sent out before today.",
                            margin: [50, 5],
                            style: "paragraph"
                        }, {
                            text: "If you have any questions, please call the phone number printed in your materials or listed below.",
                            margin: [50, 5],
                            style: "paragraph"
                        }, {
                            text: n.instant("generate-pdf.pdfPhone"),
                            margin: [50, 5],
                            style: "paragraph"
                        }],
                        styles: {
                            header: {
                                fontSize: 14,
                                bold: !0
                            },
                            paragraph: {
                                fontSize: 14
                            },
                            confirmationNumber: {
                                bold: !0
                            }
                        }
                    }).download("census2020.pdf"), e.isLoading = !1, e.$digest()
                }).catch(function(n) {
                    console.log(n), a.addAlert(s.type, s.translationId), e.isLoading = !1, e.$digest()
                })
            }).catch(function(n) {
                console.log(n), a.addAlert(s.type, s.translationId), e.isLoading = !1, e.$digest()
            })
        }
    }
    e.exports = function() {
        return {
            restrict: "E",
            scope: {
                confirmationNumber: "="
            },
            template: t(679),
            controller: r
        }
    }, r.$inject = ["$scope", "$translate", "dialogs", "alertService", "householdService", "addressService"]
}, function(e, n) {
    e.exports = '<div>\n  <div ng-show="isLoading">\n    <loading></loading>\n  </div>\n  <button class="btn btn-success btn-lg"\n          name="Generate PDF"\n          title="Generate PDF"\n          ng-click="openConfirm()"\n          translate="generate-pdf.generatePDF"\n          ng-disabled="isLoading">\n  </button>\n</div>\n\n'
}, function(e, n, t) {
    "use strict";

    function r(e, n) {
        e.closeout = n, n.dispatcher.metadata.finished ? (e.state = "review", e.btnState = "btn-primary", e.btnText = "Edit Final Questions") : n.dispatcher.metadata.started ? (e.state = "resume", e.btnState = "btn-info", e.btnText = "Resume Final Questions") : (e.state = "start", e.btnState = "btn-success", e.btnText = "Start Final Questions")
    }
    e.exports = function() {
        return {
            restrict: "E",
            template: t(681),
            scope: {},
            transclude: !0,
            controller: r
        }
    }, r.$inject = ["$scope", "closeoutService"]
}, function(e, n) {
    e.exports = '<div class="row dashboard-row">\n  <div class="col-md-2 center-text-xs">\n    <i aria-hidden="true" ng-class="{ \'clear\': !closeout.metadata.finished }" class="fa fa-check-square-o green dashboard-item-icon-3"></i>\n    <i aria-hidden="true" class="fa fa-list-alt dashboard-item-icon-1"></i>\n  </div>\n  <div class="col-md-8 center-text-xs">\n    <span class="h3"><strong id="question" tabindex="-1" role="heading" aria-level="2" translate="dashboard.finalQuestions"></strong></span>\n    <p></p>\n  </div>\n  <div class="col-md-2 col-sm-6">\n    <div class="pull-right">\n      <button id="START_FINAL_QUESTIONS" type="button" class="btn btn-basic form-button" name="{{state}}" ng-class="btnState" ng-click="closeout.dispatcher.enter()"><span translate="{{ \'dashboard.\' + state }}"></span></button>\n    </div>\n  </div>\n</div>\n'
}, function(e, n, t) {
    "use strict";

    function r(e, n) {
        e.flipDirection = !1, "rtl" === document.dir && (e.flipDirection = !0), e.$on("i18n-language-changed", function(n, t) {
            "ar" !== t || "right" === e.direction ? e.flipDirection = !1 : e.flipDirection = !0
        }), e.go = function(t) {
            e.dispatcher[t](), n()
        }
    }
    e.exports = function() {
        return {
            restrict: "E",
            template: t(683),
            scope: {
                dispatcher: "=",
                customPrevName: "=",
                customNextName: "=",
                nextDisabled: "=",
                largerButtons: "=",
                showFullTextOnMobile: "="
            },
            transclude: !0,
            controller: r
        }
    }, r.$inject = ["$scope", "$anchorScroll"]
}, function(e, n) {
    e.exports = '<div class="mobile-button-margin">\n  <div class="row">\n    <p class="text-center text-danger" translate="form-buttons.error" ng-show="!dispatcher.currentPageValid && dispatcher.currentPageAttempted"></p>\n  </div>\n  <div class="row">\n    <div ng-class="largerButtons ? [\'col-xs-6\', \'col-sm-3\', \'col-sm-offset-6\'] : [\'col-xs-6\', \'col-sm-3\', \'col-md-2\', \'col-sm-offset-6\', \'col-md-offset-8\']">\n      <button type="button" ng-if="!dispatcher.currentPage.hidePrevious" ng-disabled="dispatcher.processing" ng-click="go(\'previous\')" class="btn btn-block center-block form-button button-previous" name="Previous">\n        <div ng-if="dispatcher.processing"><span class="fa fa-spinner fa-spin"></div>\n        <div ng-if="!dispatcher.processing">\n          <span ng-if="!showFullTextOnMobile" ng-class="flipDirection ? \'glyphicon-chevron-right\' : \'glyphicon-chevron-left\'"class="glyphicon" translate-attr="{ \'aria-label\': customPrevName ? customPrevName : \'form-buttons.previous\' }"></span>\n          <span ng-class="!showFullTextOnMobile ? [\'hidden-xs\'] : [\'reduced-font-size\']" translate="{{ customPrevName ? customPrevName : \'form-buttons.previous\' }}" ></span>\n        </div>\n      </button>\n    </div>\n    <div ng-class="largerButtons ? [\'col-xs-6\', \'col-sm-3\'] : [\'col-xs-6\', \'col-sm-3\', \'col-md-2\']">\n      <button type="button" ng-click="go(\'next\')" ng-disabled="nextDisabled || dispatcher.processing" class="btn btn-primary btn-block center-block form-button button-next" name="Next">\n        <div ng-if="dispatcher.processing"><span class="fa fa-spinner fa-spin"></div>\n        <div ng-if="!dispatcher.processing">\n          <span ng-class="!showFullTextOnMobile ? [\'hidden-xs\'] : [\'reduced-font-size\']" translate="{{ customNextName ? customNextName : \'form-buttons.next\' }}"></span>\n          <span ng-if="!showFullTextOnMobile" ng-class="flipDirection ? \'glyphicon-chevron-left\' : \'glyphicon-chevron-right\'" class="glyphicon" translate-attr="{ \'aria-label\': customNextName ? customNextName : \'form-buttons.next\' }"></span>\n        </div>\n      </button>\n    </div>\n  </div>\n</div>\n'
}, function(e, n, t) {
    "use strict";

    function r(e, n, t, r, a) {
        e.translateVals = {
            YEAR: r.year
        }, e.submit = function() {
            t.dispatcher.currentPage = t.dispatcher.map.submit, t.dispatcher.setModel(a.data.respondent.household.data), n.go("closeout.page", {
                page: "submit"
            })
        }
    }
    e.exports = function() {
        return {
            restrict: "E",
            template: t(685),
            controller: r
        }
    }, r.$inject = ["$scope", "$state", "closeoutService", "refDate", "centurionStorageService"]
}, function(e, n) {
    e.exports = '<hr role="presentation" aria-hidden="true">\n<div class="row">\n  <div class="col-xs-12 text-center">\n    <p class="strong" translate="submit-survey.completed"></p>\n  </div>\n</div>\n<div class="row dashboard-row">\n  <div class="col-xs-12 text-center">\n    <button class="btn btn-full btn-success form-button"\n            name="Submit"\n            title="Submit Button"\n            ng-click="submit()"\n            translate="submit-survey.submit">\n    </button>\n  </div>\n</div>\n'
}, function(e, n, t) {
    "use strict";
    var r, a = t(17),
        o = (r = a) && r.__esModule ? r : {
            default: r
        };

    function i(e, n, t) {
        e.maxDate = new Date(t.maxDate), e.minDate = new Date(t.minYear, "3", "2"), e.maxYear = e.maxDate.getFullYear(), e.minYear = e.minDate.getFullYear(), e.years = [];
        for (var r = e.maxYear; r >= parseInt(e.minYear); r -= 1) e.years.push(r.toString())
    }

    function s(e, n) {
        e.calculateAge = function() {
            if (e.model.P_BIRTH_YEAR_INT && e.model.P_BIRTH_MONTH_INT && e.model.P_BIRTH_DAY_INT || e.model.P_BIRTH_YEAR_INT && e.model.P_BIRTH_MONTH_INT && 4 !== parseInt(e.model.P_BIRTH_MONTH_INT)) {
                var t = "Day" !== e.model.P_BIRTH_DAY_INT && e.model.P_BIRTH_DAY_INT ? parseInt(e.model.P_BIRTH_DAY_INT) : 1,
                    r = (0, o.default)(new Date(parseInt(e.model.P_BIRTH_YEAR_INT), parseInt(e.model.P_BIRTH_MONTH_INT) - 1, t)),
                    a = n.dayjs.diff(r, "years");
                isNaN(a) || (e.model.P_AGE_CALC_INT = a.toString(), e.model.P_AGE_INT = a.toString())
            } else delete e.model.P_AGE_CALC_INT, delete e.model.P_AGE_INT
        }, e.clearOutofBoundsAgeIntValue = function() {
            e.model.P_AGE_INT > 126 && (delete e.model.P_AGE_INT, delete e.model.P_AGE_CALC_INT)
        }
    }
    e.exports = function() {
        return {
            restrict: "E",
            scope: !1,
            template: t(687),
            link: i,
            controller: s
        }
    }, s.$inject = ["$scope", "refDate"]
}, function(e, n) {
    e.exports = '<div class="form-group">\n  <div class="col-xs-12 col-sm-4">\n    <label for="P_BIRTH_MONTH_INT" class="control-label" translate="person.dob.P_BIRTH_MONTH_INT"></label>\n    <div ng-class="{\'has-error\': dispatcher.currentPageAttempt >= 1 && currentForm.P_BIRTH_MONTH_INT.$invalid}">\n      <select id="P_BIRTH_MONTH_INT" aria-required="true" name="P_BIRTH_MONTH_INT" class="form-control dob-col-min-width" title="Month" ng-model="model.P_BIRTH_MONTH_INT" ng-change="calculateAge()" required>\n        <option value=""></option>\n        <option value="1" translate="date-select.jan"></option>\n        <option value="2" translate="date-select.feb" ng-if="(model.P_BIRTH_DAY_INT == 29 && model.P_BIRTH_YEAR_INT % 4 == 0) || model.P_BIRTH_DAY_INT < 29 || !model.P_BIRTH_DAY_INT || !model.P_BIRTH_YEAR_INT"></option>\n        <option value="3" translate="date-select.mar"></option>\n        <option value="4" translate="date-select.apr" ng-if="model.P_BIRTH_DAY_INT < 31 || !model.P_BIRTH_DAY_INT"></option>\n        <option value="5" translate="date-select.may"></option>\n        <option value="6" translate="date-select.june" ng-if="model.P_BIRTH_DAY_INT < 31 || !model.P_BIRTH_DAY_INT"></option>\n        <option value="7" translate="date-select.jul"></option>\n        <option value="8" translate="date-select.aug"></option>\n        <option value="9" translate="date-select.sept" ng-if="model.P_BIRTH_DAY_INT < 31 || !model.P_BIRTH_DAY_INT"></option>\n        <option value="10" translate="date-select.oct"></option>\n        <option value="11" translate="date-select.nov" ng-if="model.P_BIRTH_DAY_INT < 31 || !model.P_BIRTH_DAY_INT"></option>\n        <option value="12" translate="date-select.dec"></option>\n      </select>\n    </div>\n  </div>\n\n  <div class="col-xs-12 col-sm-4">\n    <label for="P_BIRTH_DAY_INT" class="control-label" translate="person.dob.P_BIRTH_DAY_INT"></label>\n    <div ng-class="{\'has-error\': dispatcher.currentPageAttempt >= 1 && currentForm.P_BIRTH_DAY_INT.$invalid}">\n      <select id="P_BIRTH_DAY_INT" aria-required="true" name="P_BIRTH_DAY_INT" class="form-control dob-col-min-width" title="Day" ng-model="model.P_BIRTH_DAY_INT" ng-change="calculateAge()" required>\n        <option value=""></option>\n        <option>1</option>\n        <option>2</option>\n        <option>3</option>\n        <option>4</option>\n        <option>5</option>\n        <option>6</option>\n        <option>7</option>\n        <option>8</option>\n        <option>9</option>\n        <option>10</option>\n        <option>11</option>\n        <option>12</option>\n        <option>13</option>\n        <option>14</option>\n        <option>15</option>\n        <option>16</option>\n        <option>17</option>\n        <option>18</option>\n        <option>19</option>\n        <option>20</option>\n        <option>21</option>\n        <option>22</option>\n        <option>23</option>\n        <option>24</option>\n        <option>25</option>\n        <option>26</option>\n        <option>27</option>\n        <option>28</option>\n        <option ng-if="model.P_BIRTH_MONTH_INT != 2 || (!(model.P_BIRTH_YEAR_INT % 4) && model.P_BIRTH_YEAR_INT != \'1900\')">29</option>\n        <option ng-if="model.P_BIRTH_MONTH_INT != 2">30</option>\n        <option ng-if="[\'1\', \'3\', \'5\', \'7\', \'8\', \'10\', \'12\'].indexOf(model.P_BIRTH_MONTH_INT) != -1 || !model.P_BIRTH_MONTH_INT">31</option>\n      </select>\n    </div>\n  </div>\n\n  <div class="col-xs-12 col-sm-4">\n    <label for="P_BIRTH_YEAR_INT" class="control-label" translate="person.dob.P_BIRTH_YEAR_INT"></label>\n    <div  ng-class="{\'has-error\': dispatcher.currentPageAttempt >= 1 && currentForm.P_BIRTH_YEAR_INT.$invalid}">\n      <select id="P_BIRTH_YEAR_INT" aria-required="true" name="P_BIRTH_YEAR_INT" class="form-control dob-col-min-width" title="Year" ng-model="model.P_BIRTH_YEAR_INT" ng-change="calculateAge()" required>\n        <option value=""></option>\n        <option ng-repeat="y in years" ng-hide="model.P_BIRTH_MONTH_INT == 2 && model.P_BIRTH_DAY_INT == 29 && (y % 4)">{{y}}</option>\n      </select>\n    </div>\n  </div>\n  <br>\n</div>\n<div class="form-group col-sm-12">\n  <label for="P_AGE_INT" class="control-label" translate="person.dob.P_AGE_INT"></label>\n  <span class="questionTip" translate="person.dob.questionTip"></span>\n</div>\n<div class="form-group col-sm-12">\n  <input type="text"\n         class="col-sm-3 col-xs-3 form-control is-number"\n         id="P_AGE_INT"\n         title="Age"\n         ng-model="model.P_AGE_INT"\n         name="P_AGE_INT"\n         maxlength="3"\n         ng-maxlength="3"\n         ng-size="3"\n         size="3"\n         ng-change="clearOutofBoundsAgeIntValue()"\n         inputmode="decimal"\n         pattern="[0-9]*"\n         required\n  >\n  <span class="col-sm-1 col-xs-1" translate="person.dob.years"></span>\n</div>\n'
}, function(e, n, t) {
    "use strict";

    function r(e, n) {
        e.add = n.addPerson
    }
    e.exports = function() {
        return {
            restrict: "E",
            template: t(689),
            controller: r
        }
    }, r.$inject = ["$scope", "personService"]
}, function(e, n) {
    e.exports = '<div class="row">\n  <div class="col-md-3">\n    <div class="top-buffer">\n      <button type="button" class="btn btn-primary-outlined btn-full form-button full-width-xs" name="add_person" title="Add Person" ng-click="add()"><span class="glyphicon glyphicon-plus"></span> <span translate="add-person.text"></span></button>\n    </div>\n  </div>\n</div>\n'
}, function(e, n, t) {
    "use strict";

    function r(e, n, t) {
        e.fullname = e.$parent.personService.getFullName(e.index), e.translateVals = {
            NAME: e.fullname
        }, e.delete = t.delete, e.enter = t.enter, e.person.metadata.finished ? (e.state = "review", e.btnState = "btn-primary") : e.person.metadata.started ? (e.state = "resume", e.btnState = "btn-info") : (e.state = "start", e.btnState = "btn-success")
    }
    e.exports = function() {
        return {
            restrict: "E",
            template: t(691),
            scope: {
                person: "=",
                index: "="
            },
            transclude: !0,
            controller: r
        }
    }, r.$inject = ["$scope", "$location", "personService"]
}, function(e, n) {
    e.exports = '<div class="row dashboard-row xs-margin-bottom">\n  <div class="col-md-2 dashboard-item-icon-3 center-text-xs">\n    <i aria-hidden="true" ng-class="{ \'icon-transparent\': !person.metadata.finished }" class="fa fa-check-square-o green"></i>\n    <i aria-hidden="true" class="fa fa-user"></i>\n  </div>\n  <div class="col-sm-5 col-md-6">\n    <div class="center-text-xs">\n      <span class="h3 strong"> {{ fullname }}</span>\n    </div>\n    <p>\n      <strong translate="{{ \'person.\' + state + \'Text\'}}"></strong>\n    </p>\n  </div>\n  <div class="col-sm-5 col-md-4">\n    <div id="ref-person" class="pull-right" ng-if="index == 0">\n      <button type="button" class="btn btn-basic form-button" gid="{{ index + 1 }}" name="{{state}}" aria-label="{{ state + \' \' + fullname }}" title="{{ state + \' \' + fullname }}" ng-class="btnState" ng-click="enter(index)"><span gid="{{ index + 1 }}" translate="{{ \'person.\' + state }}"></span></button>\n    </div>\n\n    <div id="not-ref-person" class="pull-right" ng-if="index != 0">\n      <button ng-hide="index == 0" type="button" class="btn btn-default grey form-button delete-person-button" gid="{{ index + 1 }}" name="{{\'delete_person_\' + (index + 1)}}" aria-label="{{ \'Remove \' + fullname }}" title="{{ \'Remove \' + fullname }}" ng-click="delete(index, fullname)"><i class="fa fa-trash"></i>&nbsp;<span class="grey-alt" gid="{{ index + 1 }}" translate="person.delete"></span><span class="sr-only" translate="person.srOnlyDelete"></span></button>\n      &nbsp;\n      <button type="button" class="btn btn-basic form-button" gid="{{ index + 1 }}" name="{{state}}" aria-label="{{ state + \' \' + fullname }}" title="{{ state + \' \' + fullname }}" ng-class="btnState" ng-click="enter(index)"><span gid="{{ index + 1 }}"  translate="{{ \'person.\' + state }}"></span></button>\n    </div>\n  </div>\n</div>\n'
}, function(e, n, t) {
    "use strict";
    var r, a = t(14),
        o = (r = a) && r.__esModule ? r : {
            default: r
        };

    function i(e, n, t) {
        function r() {
            var n = t.data;
            return (0, o.default)(n, "respondent.verification.metadata.finished") ? (0, o.default)(n, "respondent.household.metadata.finished") ? a(n) ? void(a(n) && (e.state = "final", e.srProgressText = "progress.srOnlyp4", e.srProgressValue = "4")) : (e.state = "people", e.srProgressText = "progress.srOnlyp3", void(e.srProgressValue = "3")) : (e.state = "household", e.srProgressText = "progress.srOnlyp2", void(e.srProgressValue = "2")) : (e.state = "intro", e.srProgressText = "progress.srOnlyp1", void(e.srProgressValue = "1"))
        }

        function a(e) {
            if ((0, o.default)(e, "respondent.household.metadata.finished")) {
                var n = !0;
                return angular.forEach((0, o.default)(e, "respondent.persons", []), function(e) {
                    (0, o.default)(e, "metadata.finished") || (n = !1)
                }), n
            }
        }
        n.$on("centurionStorageDataFetched", function() {
            r()
        }, !0), n.$on("re-evaluateProgress", function() {
            r()
        }, !0)
    }
    e.exports = function() {
        return {
            restrict: "E",
            template: t(693),
            controller: i
        }
    }, i.$inject = ["$scope", "$rootScope", "centurionStorageService"]
}, function(e, n) {
    e.exports = '<div class="progress-main hidden-xs" role="progressbar" translate-attr="{\'aria-valuetext\': srProgressText }" aria-valuenow="{{ srProgressValue }}" aria-valuemin="1" aria-valuemax="4">\n  <div class="col-xs-3 progress-element-wrapper" ng-class="">\n    <span class="bar progress-line" ng-class="{\'progress-color-active\': state===\'intro\', \'progress-color-default\': state!==\'intro\'}"></span>\n    <div class="circle" ng-class="{\'progress-color-active\': state==\'intro\', \'progress-color-default\': state!=\'intro\'}"> <span class="label"></span>\n      <span aria-hidden="true" class="title" translate="progress.p1"></span>\n      <span class="sr-only" translate="progress.srOnlyp1"></span>\n    </div>\n    <span class="bar progress-line" ng-class="{\'progress-color-active\': state==\'intro\', \'progress-color-default\': state!=\'intro\'}"></span>\n  </div>\n  <div class="col-xs-3  progress-element-wrapper">\n    <span class="bar progress-line" ng-class="{\'progress-color-active\': state==\'household\', \'progress-color-default\': state!=\'household\'}"></span>\n    <div class="circle"   ng-class="{\'progress-color-active\': state==\'household\', \'progress-color-default\': state!=\'household\'}"  >\n      <span class="label"></span>\n      <span class="title" translate="progress.p2"></span>\n      <span class="sr-only" translate="progress.srOnlyp2"></span>\n    </div>\n    <span class="bar progress-line" ng-class="{\'progress-color-active\': state==\'household\', \'progress-color-default\': state!=\'household\'}"></span>\n  </div>\n  <div class="col-xs-3  progress-element-wrapper">\n    <span class="bar progress-line"  ng-class="{\'progress-color-active\': state==\'people\', \'progress-color-default\': state!=\'people\'}"></span>\n    <div class="circle"  ng-class="{\'progress-color-active\': state==\'people\', \'progress-color-default\': state!=\'people\'}">\n      <span class="label"></span>\n      <span class="title" translate="progress.p3"></span>\n      <span class="sr-only" translate="progress.srOnlyp3"></span>\n    </div>\n    <span class="bar progress-line" ng-class="{\'progress-color-active\': state==\'people\', \'progress-color-default\': state!=\'people\'}"></span>\n  </div>\n  <div class="col-xs-3  progress-element-wrapper">\n    <span class="bar progress-line"  ng-class="{\'progress-color-active\': state==\'final\', \'progress-color-default\': state!=\'final\'}"></span>\n    <div class="circle"  ng-class="{\'progress-color-active\': state==\'final\', \'progress-color-default\': state!=\'final\'}">\n      <span class="label"></span>\n      <span class="title" translate="progress.p4"></span>\n      <span class="sr-only" translate="progress.srOnlyp4"></span>\n    </div>\n    <span class="bar progress-line" ng-class="{\'progress-color-active\': state==\'final\', \'progress-color-default\': state!=\'final\'}"></span>\n  </div>\n</div>\n'
}, function(e, n, t) {
    "use strict";

    function r(e) {
        return {
            restrict: "C",
            link: function(n, t, r) {
                if ("pdOmitAlert" in r) return;
                e.writeEvent("ALERT", {})
            }
        }
    }
    e.exports = r, r.$inject = ["paradata"]
}, function(e, n, t) {
    "use strict";

    function r(e) {
        return {
            restrict: "C",
            link: function() {
                e.document.getElementById("question").focus()
            }
        }
    }
    e.exports = r, r.$inject = ["$window"]
}, function(e, n, t) {
    "use strict";
    var r = s(t(14)),
        a = s(t(697)),
        o = s(t(220)),
        i = s(t(221));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function l(e, n, t, s, l, c, u, d) {
        var p = {},
            _ = s.getInstance();

        function f() {
            var e = (0, o.default)(p.persons(), function(e, n) {
                if ("1" === e.data.P_LOC_ELSE_YES_IND) return n
            });
            return (0, i.default)(e, function(e) {
                return void 0 !== e
            })
        }

        function h() {
            return 1 === p.persons().length ? p.persons()[p.personIndex].data : p.persons()[p.selectedPersons[p.personIndex]].data
        }

        function m() {
            return t(function(t, a) {
                d.writeEvent("click", {
                    id: "SUBMIT",
                    name: "SUBMIT"
                }), l.submit().then(function(n) {
                    e.go("confirmation", {
                        CONFIRMATION_NUMBER: (0, r.default)(n, "data.CONFIRMATION_NUMBER", "unavailable")
                    })
                }).catch(function(e) {
                    n.error("There was an error submitting the respondent. " + e), a(e)
                })
            })
        }
        return _.page("cd_check", {
            next: function() {
                if (1 === p.persons().length) return _.setModel(h()), "oc";
                return _.setModel(l.data.respondent.household.data), "oc_hh"
            }
        }).page("oc", {
            attempts: 1,
            validate: function(e) {
                return Object.keys(e).some(function(n) {
                    return !(!/^P_LOC_ELSE.*_IND$/.test(n) || "1" !== e[n])
                })
            },
            previous: function() {
                if ((0, r.default)(l, "data.respondent.persons", []).length !== parseInt((0, r.default)(l, "data.respondent.household.data.H_SIZE_STATED_CNT", 0))) return _.setModel(l.data.respondent.household.data), "cd_check";
                return "dashboard"
            },
            next: "submit"
        }).page("oc_hh", {
            attempts: 1,
            validate: function(e) {
                return !!(f().length > 0 || e && "1" === e.H_OC_ELSE_NO_IND)
            },
            next: function() {
                if (p.selectedPersons = f(), p.selectedPersons.length > 0) return _.setModel(h()), "oc_p";
                return "submit"
            }
        }).page("oc_p", {
            attempts: 1,
            validate: function(e) {
                return function(e, n) {
                    var t = !1;
                    return e.forEach(function(e) {
                        n[e] && "1" === n[e] && (t = !0)
                    }), t
                }(["P_LOC_ELSE_RELATIVES_IND", "P_LOC_ELSE_COLLEGE_IND", "P_LOC_ELSE_MILITARY_IND", "P_LOC_ELSE_JOB_IND", "P_LOC_ELSE_NURSINGHOME_IND", "P_LOC_ELSE_JAIL_IND", "P_LOC_ELSE_SEASONAL_IND", "P_LOC_ELSE_OTHER_IND", "P_LOC_ELSE_OTHER_TEXT"], e)
            },
            next: function() {
                if (p.personIndex + 1 === p.persons().length || p.personIndex + 1 === p.selectedPersons.length) return "submit";
                return p.personIndex += 1, _.setModel(h()), "oc_p"
            },
            previous: function() {
                if (0 === p.personIndex && 1 === p.persons().length) return "dashboard";
                if (0 === p.personIndex && p.persons().length > 1) return _.setModel(l.data.respondent.household.data), "oc_hh";
                return p.personIndex -= 1, _.setModel(h()), "oc_p"
            }
        }).page("submit", {
            next: m,
            previous: function() {
                _.setFinished(), l.saveData().then(function() {
                    _.return()
                })
            }
        }), _.baseState = "closeout.page", _.setInitialPage(function() {
            return (0, r.default)(l, "data.respondent.persons", []).length !== parseInt((0, r.default)(l, "data.respondent.household.data.H_SIZE_STATED_CNT", 0)) ? (_.setModel(l.data.respondent.household.data), "cd_check") : 1 === p.persons().length ? (_.setModel(h()), "oc") : (_.setModel(l.data.respondent.household.data), "oc_hh")
        }), _.setReturn("dashboard"), _.hasReviewMode = !1, _.setMetadata(l.data.respondent.closeout.metadata), p.dispatcher = _, p.persons = function() {
            return l.data.respondent.persons
        }, p.personIndex = 0, p.selectedPersons = [], p.metadata = l.data.respondent.closeout.metadata, _.onEnter(function() {
            return p.metadata.started || p.setStarted(), p.metadata.path = void 0, p.metadata.lastPage = void 0, p.personIndex = 0, 1 === p.persons().length ? _.setModel(h()) : _.setModel(l.data.respondent.household.data)
        }), p.clearMetadata = function() {
            p.personIndex = 0;
            var e = l.data.respondent.closeout.metadata;
            (0, a.default)(e, function(n, t) {
                delete e[t]
            })
        }, p.setStarted = function() {
            var e = void 0 === (arguments.length <= 0 ? void 0 : arguments[0]) ? 1 : arguments.length <= 0 ? void 0 : arguments[0];
            e = 1 === e || !0 === e ? 1 : 0, p.metadata.started = e, p.metadata.started_ts = e ? (new Date).getTime() : 0
        }, p.fullName = u.fullName, p.submit = m, p
    }
    e.exports = l, l.$inject = ["$state", "$log", "$q", "formDispatcher", "centurionStorageService", "householdService", "rosterService", "paradata"]
}, function(e, n, t) {
    var r = t(147),
        a = t(219),
        o = t(150);
    e.exports = function(e, n) {
        return null == e ? e : r(e, a(n), o)
    }
}, function(e, n, t) {
    var r = t(156),
        a = t(39);
    e.exports = function(e, n) {
        var t = -1,
            o = a(e) ? Array(e.length) : [];
        return r(e, function(e, r, a) {
            o[++t] = n(e, r, a)
        }), o
    }
}, function(e, n, t) {
    var r = t(147),
        a = t(70);
    e.exports = function(e, n) {
        return e && r(e, n, a)
    }
}, function(e, n, t) {
    var r = t(39);
    e.exports = function(e, n) {
        return function(t, a) {
            if (null == t) return t;
            if (!r(t)) return e(t, a);
            for (var o = t.length, i = n ? o : -1, s = Object(t);
                (n ? i-- : ++i < o) && !1 !== a(s[i], i, s););
            return t
        }
    }
}, function(e, n, t) {
    var r = t(156);
    e.exports = function(e, n) {
        var t = [];
        return r(e, function(e, r, a) {
            n(e, r, a) && t.push(e)
        }), t
    }
}, function(e, n, t) {
    "use strict";

    function r(e, n, t, r, a, o, i, s) {
        var l = {},
            c = void 0;
        return l.cycleLength = i.heartbeatCycleLength, l.warningLength = i.heartbeatWarningLength, l.contract = function() {
            o.isInvalidSession() || s.create("heartbeat.html", "HeartbeatCtrl", {}, {
                backdrop: "static",
                size: "sm"
            }).result.then(function() {
                l.eject()
            })
        }, c = r(l.contract.bind(l), l.cycleLength), l.eject = function() {
            n.get("/app/api/heartbeat").then(l.restartCycle.bind(l)).catch(function() {
                t.location.href = "/logout"
            })
        }, l.restartCycle = function() {
            return r.cancel(c), c = r(l.contract.bind(l), l.cycleLength), !0
        }, e.$on("session-renewed", l.restartCycle.bind(l)), l
    }
    e.exports = r, r.$inject = ["$rootScope", "$http", "$window", "$timeout", "$transitions", "centurionStorageService", "configConstants", "dialogs"]
}, function(e, n, t) {
    "use strict";
    var r = i(t(157)),
        a = i(t(14)),
        o = i(t(222));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(e, n, t, i, s, l, c, u, d, p, _, f) {
        var h = {},
            m = u.getInstance();

        function g(e) {
            if ("next" === e) {
                var n = h.pruneInvalidPersons(_.roster);
                (0, o.default)(c, "data.respondent.roster", n), _.roster = n
            }
        }
        m.page("popcount", {
            attempts: 3,
            validate: function(e, n) {
                e.H_SIZE_STATED_CNT && (e.H_SIZE_STATED_CNT = Number(e.H_SIZE_STATED_CNT).toString());
                var t = /^[0-9]+$/.test(e.H_SIZE_STATED_CNT);
                if (e.H_SIZE_STATED_CNT >= "1" && !0 === t) return !0;
                if (m.currentPageAttempt >= n.attempts) return c.noComplete();
                if (2 === m.currentPageAttempt && ("0" === e.H_SIZE_STATED_CNT || "00" === e.H_SIZE_STATED_CNT)) return v(), !1;
                if (2 === m.currentPageAttempt && m.currentPageErrors.errorBlank && !e.H_SIZE_STATED_CNT) return m.currentPageErrors.errorBlank2 = !0, !1;
                m.currentPageErrors = {}, e.H_SIZE_STATED_CNT || (m.currentPageErrors.errorBlank = !0);
                e.H_SIZE_STATED_CNT && !1 === t && (m.currentPageErrors.errorNonNumeric = !0);
                "0" !== e.H_SIZE_STATED_CNT && "00" !== e.H_SIZE_STATED_CNT || (m.currentPageErrors.errorZero = !0)
            },
            hidePrevious: !0,
            next: function(e) {
                if (e.H_SIZE_STATED_CNT = Number(e.H_SIZE_STATED_CNT).toString(), h.adjustRoster(e), e.H_SIZE_CALCULATED_INT = h.pruneInvalidPersons(_.roster).length, c.saveData().catch(function() {}), "1" === e.H_SIZE_STATED_CNT) return "uc";
                return "people"
            }
        }).page("people", {
            attempts: 3,
            validate: function(e) {
                var n = h.personCount(),
                    t = e.H_SIZE_STATED_CNT,
                    a = !0,
                    o = !1;
                if ((0, r.default)(_.roster, function(e) {
                        "people" === e.from && h.isValidPerson(e) && (a = !1), "people" !== e.from || h.isValidPerson(e) || (o = !0)
                    }), 1 === _.roster.length) return !0;
                if (m.currentPageErrors = {}, a && 1 === m.currentPageAttempt) return m.currentPageErrors.noResponse = !0, !1;
                if (a && 2 === m.currentPageAttempt) return m.currentPageErrors.noResponse2 = !0, !1;
                if (a && 3 === m.currentPageAttempt) return m.currentPageErrors.popcountError = !0, !1;
                if (m.currentPageErrors.popcountError) return !0;
                if (o && n < t) return m.currentPageErrors.popcountError = !0, m.currentPageAttempt += 1, !1;
                return !0
            },
            previous: function() {
                return _.roster.filter(function(e) {
                    return e && "people" === e.from && !_.isValidPerson(e)
                }).forEach(h.removeFromRoster), "popcount"
            },
            beforeAction: g,
            next: function(e) {
                if (e.H_SIZE_CALCULATED_INT >= 99) return "home";
                return "uc"
            }
        }).page("uc", {
            attempts: 2,
            beforeAction: g,
            validate: function(e) {
                if (!e.H_UC_ADD_YES_IND && !e.H_UC_ADD_NO_IND && 2 === m.currentPageAttempt) return !0;
                if (!e.H_UC_ADD_YES_IND && !e.H_UC_ADD_NO_IND) return m.currentPageErrors.error = !0, !1;
                if ("1" === e.H_UC_ADD_YES_IND && !m.currentPageErrors.error2 && "" + _.roster.length !== e.H_SIZE_STATED_CNT) {
                    var n = !1;
                    if ((0, r.default)(_.roster, function(e) {
                            "uc" === e.from && (e.P_FIRST_NAME || e.P_MIDDLE_NAME || e.P_LAST_NAME) && (n = !0)
                        }), !n) return m.currentPageErrors.error2 = !0, !1
                }
                return !0
            },
            next: function(e) {
                if ("1" === (0, a.default)(c, "data.respondent.verification.data.ADR_IS_HOMELESS_YES_IND", "0")) return E();
                return "home"
            }
        }).page("home", {
            attempts: 1,
            next: function(e) {
                if (("1" === e.H_TENURE_OWNED_MORT_IND || "1" === e.H_TENURE_OWNED_FREE_IND || "1" === e.H_TENURE_RENTED_IND) && e.H_SIZE_CALCULATED_INT > 1) return "owner";
                "1" === e.H_TENURE_OCC_NOPAY_IND && function(e) {
                    delete e.H_OWNER_RENTER_NONE_IND, delete c.data.respondent.household.data.H_OWNER_RENTER_NONE_IND, (0, r.default)(_.roster, function(e) {
                        delete e.P_OWNER_RENTER_IND
                    })
                }(e);
                E()
            }
        }).page("owner", {
            attempts: 1,
            validate: function(e, n) {
                var t = !1;
                (0, r.default)(_.roster, function(e) {
                    "1" === e.P_OWNER_RENTER_IND && (t = !0)
                }), "1" === e.H_OWNER_RENTER_NONE_IND && (t = !0);
                return !(m.currentPageAttempt >= n.attempts && !t)
            },
            next: E
        }), m.setInitialPage("popcount"), h.metadata = c.data.respondent.household.metadata, m.setMetadata(h.metadata), m.setReturn("dashboard"), m.baseState = "household.page", m.onEnter(function() {
            h.household().metadata.started || (h.setStarted(), c.data.appdata.started = 1)
        }), h.model = c.data.respondent.household.data, m.setModel(c.data.respondent.household.data), h.dispatcher = m, h.appdata = c.data.appdata, h.household = function() {
            return c.data.respondent.household
        }, h.rtnpSource = function() {
            return (0, a.default)(c, "data.respondent.verification.metadata.rtnpSource", "sa")
        }, h.prelist = angular.copy(c.data.respondent.prelist), h.started = h.household().metadata.started || 0, h.setStarted = function() {
            var e = void 0 === (arguments.length <= 0 ? void 0 : arguments[0]) ? 1 : arguments.length <= 0 ? void 0 : arguments[0];
            e = 1 === e || !0 === e ? 1 : 0, h.started = e, h.household().metadata.started = e, h.household().metadata.started_ts = e ? (new Date).getTime() : 0
        }, h.getPopCount = function() {
            return c.data.respondent.household.data.H_SIZE_CALCULATED_INT || 0
        }, h.incrementPopCount = function(e) {
            h.dispatcher.model.H_SIZE_CALCULATED_INT += e || 1, c.data.respondent.household.data.H_SIZE_CALCULATED_INT += e || 1
        }, h.decrementPopCount = function(e) {
            h.getPopCount() > 0 && (h.dispatcher.model.H_SIZE_CALCULATED_INT -= e || 1, c.data.respondent.household.data.H_SIZE_CALCULATED_INT -= e || 1)
        }, h.addToRoster = function(e) {
            !h.dispatcher.inReview && h.dispatcher.model.H_SIZE_CALCULATED_INT <= 99 && (e = e || h.dispatcher.currentPage.name, _.addToRoster(e), h.incrementPopCount())
        }, h.removePeopleByFrom = function(e) {
            var n = _.removePeopleByFrom(e);
            n && h.decrementPopCount(n)
        }, h.removeFromRoster = function(e) {
            _.removeFromRoster(e), h.decrementPopCount()
        }, h.finalizeRoster = _.finalizeRoster, e.$watch(h.dispatcher.model, function(e, n) {
            angular.equals(e, n) || "address" === h.dispatcher.currentPage && h.household().metadata.addressStandardized && (h.addressStandardized = !1)
        }, !0), h.pruneInvalidPersons = function(e) {
            var n = [];
            return (0, r.default)(e, function(e) {
                _.isValidPerson(e) && n.push(e)
            }), h.dispatcher.model.H_SIZE_CALCULATED_INT = n.length, n
        }, h.isValidPerson = function(e) {
            return !!(e.P_FIRST_NAME || e.P_MIDDLE_NAME || e.P_LAST_NAME)
        }, h.getAddress = p.getStreetAddress, h.blockDialog = function() {
            d.create("dialogs/customnotify.html", "customNotifyCtrl", {
                header: s.instant("dialogs.blockAreaHeader"),
                msg: s.instant("dialogs.blockAreaContent")
            })
        }, h.waterDialog = function() {
            d.create("dialogs/customnotify.html", "customNotifyCtrl", {
                header: s.instant("dialogs.waterAreaHeader"),
                msg: s.instant("dialogs.waterAreaContent")
            })
        }, h.personCount = function() {
            var e = 0;
            return (0, r.default)(_.roster, function(n) {
                (n.P_FIRST_NAME || n.P_MIDDLE_NAME || n.P_LAST_NAME) && (e += 1)
            }), e
        }, h.adjustRoster = function(e) {
            if (e.H_SIZE_STATED_CNT > _.roster.length) {
                var n, t = e.H_SIZE_STATED_CNT - _.roster.length,
                    a = new Array(t);
                (0, r.default)(a, function(e, n) {
                    a[n] = {
                        from: "people",
                        P_ORIGROST_ADD_IND: "1"
                    }
                }), (n = _.roster).push.apply(n, a), e.H_SIZE_CALCULATED_INT < _.roster.length && (e.H_SIZE_CALCULATED_INT = _.roster.length)
            }
        };
        var v = function() {
            var e = {
                BEFORE: f.before(),
                REFDATE: f.format,
                ADDRESS: h.getAddress()
            };
            d.create("dialogs/customconfirm.html", "customConfirmCtrl", {
                noHeader: !0,
                msg: s.instant("dialogs.popcountMessage", e)
            }).result.then(function(e) {
                "no" === e ? (c.data.respondent.roster = [], c.data.respondent.verification.data = {}, c.data.respondent.verification.metadata = {}, c.data.respondent.household.data = {}, c.data.respondent.household.data.H_OCC_CHECK_NO_IND = "1", c.data.respondent.household.metadata = {}, c.saveData().then(h.redirectToVacancy).catch(h.redirectToVacancy)) : "yes" === e && (m.model.H_OCC_CHECK_YES_IND = "1")
            })
        };

        function E() {
            h.dispatcher.inReview || (h.dispatcher.setFinished(), h.finalizeRoster(), c.saveData().then(function() {
                m.return()
            }).catch(function() {
                m.return()
            }))
        }
        return h.location = h.household().metadata.location || !1, h.redirectToVacancy = function() {
            var e = l.get("introService");
            e.dispatcher.currentPage = e.dispatcher.map.vacancy, e.dispatcher.map.vacancy.hidePrevious = !0, e.dispatcher.metadata.path = [], e.dispatcher.setModel(c.data.respondent.verification.data), i.go("intro.page", {
                page: "vacancy"
            })
        }, h
    }
    e.exports = s, s.$inject = ["$rootScope", "$location", "$q", "$state", "$translate", "$injector", "centurionStorageService", "formDispatcher", "dialogs", "addressService", "rosterService", "refDate"]
}, function(e, n) {
    e.exports = function(e, n) {
        for (var t = -1, r = null == e ? 0 : e.length; ++t < r && !1 !== n(e[t], t, e););
        return e
    }
}, function(e, n, t) {
    var r = t(208),
        a = t(88),
        o = t(69),
        i = t(30),
        s = t(60);
    e.exports = function(e, n, t, l) {
        if (!i(e)) return e;
        for (var c = -1, u = (n = a(n, e)).length, d = u - 1, p = e; null != p && ++c < u;) {
            var _ = s(n[c]),
                f = t;
            if (c != d) {
                var h = p[_];
                void 0 === (f = l ? l(h, _, p) : void 0) && (f = i(h) ? h : o(n[c + 1]) ? [] : {})
            }
            r(p, _, f), p = p[_]
        }
        return e
    }
}, function(e, n, t) {
    "use strict";
    var r, a = t(14),
        o = (r = a) && r.__esModule ? r : {
            default: r
        };

    function i(e, n, t, r, a, i, s, l, c, u, d, p) {
        var _ = {},
            f = i.getInstance();
        if (f.page("name", {
                attempts: 3,
                validate: function(e, n) {
                    if (f.currentPageErrors = {}, f.currentPageAttempt >= n.attempts) return !0;
                    if (!e.P_FIRST_NAME && !e.P_MIDDLE_NAME && !e.P_LAST_NAME && 1 === f.currentPageAttempt) return f.currentPageErrors.error = !0, !1;
                    if (!e.P_FIRST_NAME && !e.P_MIDDLE_NAME && !e.P_LAST_NAME && 2 === f.currentPageAttempt) return f.currentPageErrors.error2 = !0, !1;
                    return !0
                },
                next: "relationship",
                previous: function(e) {
                    e.P_FIRST_NAME || e.P_MIDDLE_NAME || e.P_LAST_NAME || (s.decrementPopCount(), a.data.respondent.persons.splice(_.personIndex))
                }
            }).page("relationship", {
                attempts: 1,
                beforeAction: m,
                next: function() {
                    return a.saveData().catch(function() {}), "sex"
                }
            }).page("sex", {
                attempts: 1,
                beforeAction: m,
                next: function(e) {
                    if (v(), 0 === _.personIndex) return _.conflictPersons.length ? (_.conflictPersonIndex = 0, f.setModel(a.data.respondent.persons[_.conflictPersons[0]].data), f.model.P_SEXREL_EDIT_YES_IND = "1", "sex_confirm") : "dob";
                    if (-1 !== _.conflictPersons.indexOf(_.personIndex)) return e.P_SEXREL_EDIT_YES_IND = "1", "sex_confirm";
                    return e.P_SEXREL_EDIT_YES_IND = "0", "dob"
                }
            }).page("sex_confirm", {
                validate: function(e) {
                    var n = a.data.respondent.persons[0].data;
                    if (!f.currentPageErrors.firstQuestionBlank && (!g(e.P_SEX_CONF_YES_IND) && !g(e.P_SEX_CONF_NO_IND) || g(e.P_SEX_CONF_NO_IND) && !g(e.P_SEX_MALE_CH_IND) && !g(e.P_SEX_FEMALE_CH_IND))) return f.currentPageErrors.firstQuestionBlank = !0, !1;
                    if (!f.currentPageErrors.secondQuestionBlank && (!g(n.P_SEX_CONF_YES_IND) && !g(n.P_SEX_CONF_NO_IND) || g(e.P_SEX_CONF_NO_IND) && !g(e.P_SEX_MALE_CH_IND) && !g(e.P_SEX_FEMALE_CH_IND))) return f.currentPageErrors.secondQuestionBlank = !0, !1;
                    if (f.currentPageErrors.firstQuestionBlank && !f.currentPageErrors.secondQuestionBlank && !g(e.P_SEX_CONF_NO_IND) && !g(e.P_SEX_CONF_NO_IND) && g(n.P_SEX_CONF_YES_IND)) return f.currentPageErrors.secondQuestionBlank = !0, !1;
                    if (g(n.P_SEX_CONF_NO_IND) && !g(n.P_SEX_MALE_CH_IND) && !g(n.P_SEX_FEMALE_CH_IND)) {
                        var t = Object.assign({}, n);
                        if (g(n.P_SEX_MALE_IND) && (t.P_SEX_MALE_CH_IND = "1"), g(n.P_SEX_FEMALE_IND) && (t.P_SEX_FEMALE_CH_IND = "1"), !_.hasSexRelConflictResolved(t, e, !0, !1)) return f.currentPageErrors.secondQuestionBlank = !0, !1
                    }
                    return !0
                },
                previous: function() {
                    if (0 !== _.personIndex) return "sex";
                    if (v(), _.conflictPersons.length) return 0 === _.conflictPersonIndex ? (f.setModel(a.data.respondent.persons[0].data), delete _.conflictPersons, "sex") : (_.conflictPersonIndex -= 1, f.setModel(a.data.respondent.persons[_.conflictPersons[_.conflictPersonIndex]].data), "sex_confirm");
                    return "sex"
                },
                attempts: 2,
                next: function() {
                    if (0 !== _.personIndex) return "dob";
                    if (v(), _.conflictPersons.length) return _.conflictPersons.length === _.conflictPersonIndex + 1 ? (f.setModel(a.data.respondent.persons[0].data), delete _.conflictPersons, "dob") : (_.conflictPersonIndex += 1, f.setModel(a.data.respondent.persons[_.conflictPersons[_.conflictPersonIndex]].data), "sex_confirm");
                    return "dob"
                }
            }).page("dob", {
                attempts: 2,
                validate: function(e, n) {
                    var t = !e.P_BIRTH_DAY_INT && !e.P_BIRTH_MONTH_INT && !e.P_BIRTH_YEAR_INT,
                        r = !e.P_BIRTH_DAY_INT || !e.P_BIRTH_MONTH_INT || !e.P_BIRTH_YEAR_INT;
                    if (e.P_AGE_INT) return !0;
                    if (e.P_BIRTH_YEAR_INT && e.P_BIRTH_MONTH_INT && 4 !== parseInt(e.P_BIRTH_MONTH_INT)) return !0;
                    if (t && f.currentPageAttempt <= n.attempts) return f.currentPageErrors.noSelection = !0, !1;
                    if (r && f.currentPageAttempt < n.attempts) return f.currentPageErrors.partialSelection = !0, !1;
                    if (r && f.currentPageAttempt === n.attempts) return !0;
                    return !0
                },
                previous: "sex",
                next: function() {
                    return a.saveData().catch(function() {}), "hispanic_origin"
                }
            }).page("hispanic_origin", {
                attempts: 1,
                validate: function(e, n) {
                    if (e.P_HISP_YES_OTH_TEXT) return !0;
                    var t = Object.keys(e).some(function(n) {
                        return !(!/^P_HISP/.test(n) || "1" !== e[n])
                    });
                    if (f.currentPageAttempt <= n.attempts && !t) return !1;
                    if ("1" === e.P_HISP_YES_OTH_IND && !e.P_HISP_YES_OTH_TEXT) return f.currentPageErrors.noWriteIn = !0, !1;
                    return !0
                },
                next: function() {
                    return a.saveData().catch(function() {}), "race"
                }
            }).page("race", {
                attempts: 1,
                validate: function(e, n) {
                    if (Object.keys(e).some(function(n) {
                            return !(!/^P_RACE.*_TEXT$/.test(n) || !e[n].length)
                        }) || e.P_ASIAN_OTHER_TEXT || e.P_NHPI_OTHER_TEXT) return !0;
                    var t = Object.keys(e).some(function(n) {
                        return !(!/^P_RACE/.test(n) || "1" !== e[n])
                    });
                    if (f.currentPageAttempt <= n.attempts && !t && !g(e.P_ASIAN_OTHER_IND) && !g(e.P_NHPI_OTHER_IND)) return !1;
                    f.currentPageErrors.writeInErrors = {}, g(e.P_RACE_WHITE_IND) && !e.P_RACE2_WHITE_TEXT && (f.currentPageErrors.writeInErrors.noWhiteWriteIn = !0);
                    g(e.P_RACE_BLACK_IND) && !e.P_RACE2_BLACK_TEXT && (f.currentPageErrors.writeInErrors.noBlackWriteIn = !0);
                    g(e.P_RACE_AIAN_IND) && !e.P_RACE2_AIAN_TEXT && (f.currentPageErrors.writeInErrors.noAianWriteIn = !0);
                    g(e.P_ASIAN_OTHER_IND) && !e.P_ASIAN_OTHER_TEXT && (f.currentPageErrors.writeInErrors.noOtherAsianWriteIn = !0);
                    g(e.P_NHPI_OTHER_IND) && !e.P_NHPI_OTHER_TEXT && (f.currentPageErrors.writeInErrors.noNHPIWriteIn = !0);
                    g(e.P_RACE_SOR_IND) && !e.P_RACE2_SOR_TEXT && (f.currentPageErrors.writeInErrors.noOtherRaceWriteIn = !0);
                    return !Object.keys(f.currentPageErrors.writeInErrors).length
                },
                next: function() {
                    return _.setFinished(), a.saveData({
                        global: !0
                    }), "/dashboard"
                }
            }), f.setReturn("dashboard"), f.baseState = "person.page", f.hasReviewMode = !1, _.dispatcher = f, _.init = function() {
                _.currentPageValid = !1, _.currentPage = "", _.currentFormAttempted = !1
            }, _.appdata = a.data.appdata, _.accountType = a.data.appdata.accountType, "id" === _.accountType) _.state = (0, o.default)(a, "data.respondent.prelist.state");
        else if ("nonid" === _.accountType) {
            var h = (0, o.default)(a, "data.respondent.verification.data.RESP_LOC_OCD_CTRY_CODE");
            _.state = "1" === h ? "US" : "PR"
        }

        function m(e, n) {
            "next" === e && (0 !== _.personIndex ? _.setPersonsNoLongerInConflict({
                data: n,
                metadata: _.dispatcher.metadata
            }, a.data.respondent.persons[0]) : _.setPersonsNoLongerInConflict(a.data.respondent.persons, {
                data: n,
                metadata: _.dispatcher.metadata
            }))
        }

        function g(e) {
            return e && "1" === e
        }

        function v() {
            var e = [],
                n = a.data.respondent.persons[0].data;
            a.data.respondent.persons.forEach(function(t, r) {
                t.metadata.isReferencePerson || _.isConflictedPerson(n, t) && e.push(r)
            }), _.conflictPersons = e
        }

        function E(e, n) {
            var t = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = "P_SEX_MALE_IND",
                a = "P_SEX_FEMALE_IND",
                o = "P_SEX_MALE_IND",
                i = "P_SEX_FEMALE_IND";
            return arguments.length > 3 && void 0 !== arguments[3] && arguments[3] && (r = "P_SEX_MALE_CH_IND", a = "P_SEX_FEMALE_CH_IND"), t && (r = "P_SEX_MALE_IND", a = "P_SEX_FEMALE_IND", o = "P_SEX_MALE_CH_IND", i = "P_SEX_FEMALE_CH_IND"), "1" === e[o] && "1" === n.data[r] && ("1" === n.data.P_REL_SPOUSE_OPP_IND || "1" === n.data.P_REL_PARTNER_OPP_IND) || ("1" === e[i] && "1" === n.data[a] && ("1" === n.data.P_REL_SPOUSE_OPP_IND || "1" === n.data.P_REL_PARTNER_OPP_IND) || ("1" === e[o] && "1" === n.data[a] && ("1" === n.data.P_REL_SPOUSE_SAME_IND || "1" === n.data.P_REL_PARTNER_SAME_IND) || "1" === e[i] && "1" === n.data[r] && ("1" === n.data.P_REL_SPOUSE_SAME_IND || "1" === n.data.P_REL_PARTNER_SAME_IND)))
        }
        _.getFullName = function(e) {
            if (e = angular.isUndefined(e) ? _.personIndex : e, a.data.respondent.persons[e] && a.data.respondent.persons[e].data) {
                var n = a.data.respondent.persons[e].data;
                return n.P_FIRST_NAME && n.P_MIDDLE_NAME && n.P_LAST_NAME ? [n.P_FIRST_NAME, n.P_MIDDLE_NAME.substring(0, 1), n.P_LAST_NAME].join(" ").trim() : n.P_FIRST_NAME || n.P_MIDDLE_NAME || n.P_LAST_NAME ? [n.P_FIRST_NAME || "", n.P_MIDDLE_NAME || "", n.P_LAST_NAME || ""].join(" ").trim() : "Person " + (e + 1)
            }
            return "Person " + (e + 1)
        }, _.createNewPerson = function() {
            return a.data.respondent.persons.push({
                data: {},
                metadata: {}
            }) - 1
        }, _.addPerson = function() {
            s.incrementPopCount(), _.cameFromAddPerson = !0, _.enter()
        }, _.person = function() {
            return a.data.respondent.persons[_.personIndex]
        }, _.enter = function(e) {
            if (_.personIndex = angular.isUndefined(e) ? _.createNewPerson() : e, _.metadata = a.data.respondent.persons[_.personIndex].metadata, _.model = a.data.respondent.persons[_.personIndex].data, _.location = _.metadata.location || !1, f.setMetadata(_.metadata), f.setModel(a.data.respondent.persons[_.personIndex].data), f.setInitialPage(function() {
                    return _.cameFromAddPerson ? (_.cameFromAddPerson = !1, f.model.P_ROSTREV_ADD_IND = "1", "name") : _.personIndex > 0 ? "relationship" : "sex"
                }), _.init(), _.started = function() {
                    return _.person().metadata.started || 0
                }, _.setStarted = function() {
                    var e = void 0 === (arguments.length <= 0 ? void 0 : arguments[0]) ? 1 : arguments.length <= 0 ? void 0 : arguments[0];
                    e = 1 === e || !0 === e ? 1 : 0, _.person().metadata.started = e, _.person().metadata.started_ts = e ? (new Date).getTime() : 0
                }, _.referencePersonModel = function() {
                    return a.data.respondent.persons[0].data
                }, _.finished = function() {
                    return _.person().metadata.finished || 0
                }, _.setFinished = function() {
                    var e = void 0 === (arguments.length <= 0 ? void 0 : arguments[0]) ? 1 : arguments.length <= 0 ? void 0 : arguments[0];
                    e = 1 === e || !0 === e ? 1 : 0, _.person().metadata.finished = e, _.person().metadata.finished_ts = e ? (new Date).getTime() : 0, _.personIndex > 0 && _.person().metadata.path.shift()
                }, _.person().metadata.finished) {
                var n = ["sex", "dob", "hispanic_origin", "race"];
                _.person().metadata.isReferencePerson || n.unshift("relationship"), _.person().metadata.path = n
            }
            _.setStarted(), f.enter()
        }, _.delete = function(e, n) {
            n = "stub" === e ? "a Person" : n;
            var t = c.create("dialogs/customconfirm.html", "customConfirmCtrl", {
                    header: "" + r.instant("person.delete"),
                    msg: r.instant("person.deleteConfirmation", {
                        NAME: n
                    })
                }, {
                    size: "md"
                }),
                o = function(n) {
                    "yes" === n && !Number.isNaN(e) && a.data.respondent.persons[e] && a.data.respondent.persons.splice(e, 1), s.decrementPopCount(), a.saveData()
                };
            return t.result.then(o), t.handleDeleteCallback = o, t
        };
        var T = ["P_SEX_CONF_YES_IND", "P_SEX_CONF_NO_IND", "P_SEX_MALE_CH_IND", "P_SEX_FEMALE_CH_IND", "P_REL_SPOUSE_OPP_CH_IND", "P_REL_PARTNER_OPP_CH_IND", "P_REL_SPOUSE_SAME_CH_IND", "P_REL_PARTNER_SAME_CH_IND", "P_REL_CHILD_BIO_CH_IND", "P_REL_CHILD_ADOPTED_CH_IND", "P_REL_CHILD_STEP_CH_IND", "P_REL_SIBLING_CH_IND", "P_REL_PARENT_CH_IND", "P_REL_GRANDCHILD_CH_IND", "P_REL_INLAW_PARENT_CH_IND", "P_REL_INLAW_CHILD_CH_IND", "P_REL_OTHER_REL_CH_IND", "P_REL_HOUSEROOMMATE_CH_IND", "P_REL_CHILD_FOSTER_CH_IND", "P_REL_OTHER_NONREL_CH_IND"];

        function R(e, n, t) {
            return !E(e, {
                data: n
            }, t, !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3])
        }

        function b(e) {
            T.filter(function(e) {
                return !!e.match(/^P_REL_/)
            }).forEach(function(n) {
                return delete e[n]
            })
        }
        return _.isConflictedPerson = E, _.setConflictPersons = v, _.setPersonsNoLongerInConflict = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                n = arguments[1];
            Array.isArray(e) || (e = [e]), e.forEach(function(e) {
                (0, o.default)(e, "metadata.isReferencePerson") || e.data.P_SEXREL_EDIT_YES_IND && !_.isConflictedPerson(n.data, e) && (e.data.P_SEXREL_EDIT_YES_IND = "0", T.forEach(function(n) {
                    return delete e.data[n]
                }))
            })
        }, _.clearSexCHFields = function(e) {
            delete e.P_SEX_FEMALE_CH_IND, delete e.P_SEX_MALE_CH_IND
        }, _.hasSexRelConflictResolved = R, _.shouldShowRefSexConfirm = function(e, n) {
            return !!f.currentPageErrors.firstQuestionBlank || "1" === e.P_SEX_CONF_YES_IND || !R(n, e) || (b(e), !1)
        }, _.shouldShowSexConfirmRelationship = function(e, n) {
            if (_.dispatcher.currentPageErrors.secondQuestionBlank) return !0;
            if ("1" === e.P_SEX_CONF_NO_IND && "1" === n.P_SEX_CONF_YES_IND && !_.hasSexRelConflictResolved(n, e)) return !0;
            if ("1" === e.P_SEX_CONF_NO_IND && "1" !== e.P_SEX_FEMALE_CH_IND && "1" !== e.P_SEX_MALE_CH_IND && "1" === n.P_SEX_CONF_YES_IND) return !0;
            if (("1" === e.P_SEX_CONF_NO_IND || "1" === e.P_SEX_CONF_YES_IND) && "1" === n.P_SEX_CONF_YES_IND && !_.hasSexRelConflictResolved(n, e)) return !0;
            if ("1" === e.P_SEX_CONF_NO_IND && "1" === n.P_SEX_CONF_NO_IND && ("1" === n.P_SEX_MALE_CH_IND || "1" === n.P_SEX_FEMALE_CH_IND) && !_.hasSexRelConflictResolved(n, e, !0) && "1" === e.P_SEX_CONF_NO_IND) return !0;
            if ("1" === e.P_SEX_CONF_YES_IND && "1" === n.P_SEX_CONF_NO_IND && ("1" === n.P_SEX_MALE_CH_IND || "1" === n.P_SEX_FEMALE_CH_IND) && !_.hasSexRelConflictResolved(n, e, !0, !1)) return !0;
            if ("1" === n.P_SEX_CONF_YES_IND && "1" === e.P_SEX_CONF_YES_IND) return !0;
            if (f.currentPageAttempt >= 1 && "1" !== e.P_SEX_CONF_NO_IND && "1" !== e.P_SEX_CONF_NO_IND) {
                var t = Object.assign({}, e);
                if (g(t.P_SEX_MALE_IND) && (t.P_SEX_MALE_CH_IND = "1"), g(t.P_SEX_FEMALE_IND) && (t.P_SEX_FEMALE_CH_IND = "1"), !_.hasSexRelConflictResolved(n, t, !0, !1)) return !0
            }
            return b(e), !1
        }, _.deletePersonRelationshipChangeFields = b, _
    }
    e.exports = i, i.$inject = ["$rootScope", "$location", "$state", "$translate", "centurionStorageService", "formDispatcher", "householdService", "alertService", "dialogs", "addressService", "closeoutService", "configConstants"]
}, function(e, n, t) {
    "use strict";
    var r = s(t(157)),
        a = s(t(91)),
        o = s(t(14)),
        i = s(t(223));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function l(e, n, t) {
        var s = {
            getStreetAddress: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.address,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s.source,
                    t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "sa",
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "shortMaps";
                if (!e) return "";
                if ("prelist" === n) {
                    var a = [e.addr1, e.addr2].join(" ");
                    return "shortMaps" === r ? a : a + "\n" + e.addr3
                }
                if ("geo" === n) {
                    var o = c(e, s[r][n][t]).trim();
                    return o.length < 1 && (o = c(e, s.fullMaps[n][t])), o
                }
                if ("user" === n) {
                    var i = c(e, s[r][n]).trim();
                    return i.length < 1 && (i = c(e, s.fullMaps[n])), i
                }
                return ""
            },
            shortMaps: {
                geo: {
                    sa: [function(e) {
                        if (e.ADR_STNU_PRI_STD_TEXT && e.ADR_STNU_SEC_STD_TEXT) {
                            var n = (0, o.default)(e, "ADR_STNU_SEP_STD_TEXT", "");
                            return "" + e.ADR_STNU_PRI_STD_TEXT + n + e.ADR_STNU_SEC_STD_TEXT + " "
                        }
                        return e.ADR_STNU_PRI_STD_TEXT ? e.ADR_STNU_PRI_STD_TEXT + " " : ""
                    }, "ADR_STNU_SUF_STD_TEXT", "ADR_STNM_PRE_QUAL_STD_TEXT", "ADR_STNM_PRE_DIR_STD_TEXT", "ADR_STNM_PRE_TYPE_STD_CODE", "ADR_STNM_BASE_STD_NAME", "ADR_STNM_SUF_TYPE_STD_CODE", "ADR_STNM_SUF_DIR_STD_TEXT", "ADR_STNM_SUF_QUAL_STD_TEXT", function(e) {
                        return e.ADR_UNIT_NUM_STD_TEXT ? "Apt " + e.ADR_UNIT_NUM_STD_TEXT + " \n" : "\n"
                    }],
                    rr: ["ADR_RR_INFO_STD_TEXT"],
                    oa: [l, "ADR_STATE_UPD_NAME", "ADR_ZIP_UPD_TEXT"],
                    po: ["translationId:household.standardizeaddress.poBoxPrefix", "ADR_RR_INFO_STD_TEXT", "translationId:household.standardizeaddress.poBoxIn"],
                    pr: ["ADR_COMPLEX_STD_NAME", "ADR_PR_URB_STD_NAME", "ADR_PR_AREA_PRI_STD_NAME", function(e) {
                        if (e.ADR_STNU_PRI_STD_TEXT && e.ADR_STNU_SEC_STD_TEXT) {
                            var n = (0, o.default)(e, "ADR_STNU_SEP_STD_TEXT", "");
                            return "" + e.ADR_STNU_PRI_STD_TEXT + n + e.ADR_STNU_SEC_STD_TEXT + " "
                        }
                        return e.ADR_STNU_PRI_STD_TEXT ? e.ADR_STNU_PRI_STD_TEXT + " " : ""
                    }, "ADR_STNM_PRE_TYPE_STD_CODE", "ADR_STNM_BASE_STD_NAME", "ADR_UNIT_DESC_STD_TEXT", "ADR_UNIT_NUM_STD_TEXT"]
                },
                user: ["ADR_COMPLEX_NAME", "ADR_PR_URB_NAME", "ADR_PR_AREA_PRI_NAME", "ADR_RR_DESC_TEXT", "ADR_RR_NUM_TEXT", function(e) {
                    return e.ADR_RR_BOX_NUM_TEXT ? "BOX " + e.ADR_RR_BOX_NUM_TEXT : ""
                }, "ADR_STNU_TEXT", "ADR_STNM_TEXT", function(e) {
                    return e.ADR_UNIT_TEXT ? "Apt " + e.ADR_UNIT_TEXT + " \n" : "\n"
                }]
            },
            fullMaps: {
                geo: {
                    sa: [function(e) {
                        if (e.ADR_STNU_PRI_STD_TEXT && e.ADR_STNU_SEC_STD_TEXT) {
                            var n = (0, o.default)(e, "ADR_STNU_SEP_STD_TEXT", "");
                            return "" + e.ADR_STNU_PRI_STD_TEXT + n + e.ADR_STNU_SEC_STD_TEXT + " "
                        }
                        return e.ADR_STNU_PRI_STD_TEXT ? e.ADR_STNU_PRI_STD_TEXT + " " : ""
                    }, "ADR_STNU_SUF_STD_TEXT", "ADR_STNM_PRE_QUAL_STD_TEXT", "ADR_STNM_PRE_DIR_STD_TEXT", "ADR_STNM_PRE_TYPE_STD_CODE", "ADR_STNM_BASE_STD_NAME", "ADR_STNM_SUF_TYPE_STD_CODE", "ADR_STNM_SUF_DIR_STD_TEXT", "ADR_STNM_SUF_QUAL_STD_TEXT", function(e) {
                        return e.ADR_UNIT_NUM_STD_TEXT ? "Apt " + e.ADR_UNIT_NUM_STD_TEXT + " \n" : "\n"
                    }, l, "ADR_STATE_UPD_NAME", "ADR_ZIP_UPD_TEXT"],
                    rr: ["ADR_RR_INFO_STD_TEXT", l, "ADR_STATE_UPD_NAME", "ADR_ZIP_UPD_TEXT"],
                    po: ["translationId:household.standardizeaddress.poBoxPrefix", "ADR_RR_INFO_STD_TEXT", "translationId:household.standardizeaddress.poBoxIn", l, "ADR_STATE_UPD_NAME", "ADR_ZIP_UPD_TEXT"],
                    oa: [l, "ADR_STATE_UPD_NAME", "ADR_ZIP_UPD_TEXT"],
                    pr: ["ADR_COMPLEX_STD_NAME", "ADR_PR_URB_STD_NAME", "ADR_PR_AREA_PRI_STD_NAME", function(e) {
                        if (e.ADR_STNU_PRI_STD_TEXT && e.ADR_STNU_SEC_STD_TEXT) {
                            var n = (0, o.default)(e, "ADR_STNU_SEP_STD_TEXT", "");
                            return "" + e.ADR_STNU_PRI_STD_TEXT + n + e.ADR_STNU_SEC_STD_TEXT + " "
                        }
                        return e.ADR_STNU_PRI_STD_TEXT ? e.ADR_STNU_PRI_STD_TEXT + " " : ""
                    }, "ADR_STNM_PRE_TYPE_STD_CODE", "ADR_STNM_BASE_STD_NAME", "ADR_UNIT_DESC_STD_TEXT", "ADR_UNIT_NUM_STD_TEXT", "ADR_PR_MUNI_STD_NAME", "ADR_STATE_UPD_NAME", "ADR_ZIP_UPD_TEXT"]
                },
                user: ["ADR_COMPLEX_NAME", "ADR_PR_URB_NAME", "ADR_PR_AREA_PRI_NAME", "ADR_RR_DESC_TEXT", "ADR_RR_NUM_TEXT", function(e) {
                    return e.ADR_RR_BOX_NUM_TEXT ? "BOX " + e.ADR_RR_BOX_NUM_TEXT : ""
                }, "ADR_STNU_TEXT", "ADR_STNM_TEXT", function(e) {
                    return e.ADR_UNIT_TEXT ? "Apt " + e.ADR_UNIT_TEXT + " \n" : "\n"
                }, l, "ADR_PR_MUNI_NAME", "ADR_STATE_TEXT", "ADR_ZIP_TEXT"]
            }
        };

        function l(e) {
            return e.ADR_CITY_UPD_NAME ? e.ADR_CITY_UPD_NAME + ", " : e.ADR_CITY_TEXT ? e.ADR_CITY_TEXT + ", " : ""
        }

        function c(n, t) {
            var o = "";
            return (0, r.default)(t, function(t) {
                (0, a.default)(t) ? o += t(n): t.match("translationId:") ? (o += e.instant(t.split(":")[1]), o += " ") : n[t] && (o += n[t] + " ")
            }), o
        }
        return s.setSource = function() {
            (0, i.default)((0, o.default)(t, "data.respondent.verification.data.a13")) ? (0, i.default)((0, o.default)(t, "data.respondent.verification.data.a11")) ? (0, i.default)((0, o.default)(t, "data.respondent.verification.data.a12")) ? (0, i.default)((0, o.default)(t, "data.respondent.verification.data.a10")) ? (s.address = (0, o.default)(t, "data.respondent.prelist"), s.source = "prelist") : (s.address = (0, o.default)(t, "data.respondent.verification.data.a10", {}), s.source = "user") : (s.address = (0, o.default)(t, "data.respondent.verification.data.a12", {}), s.source = "user") : (s.address = (0, o.default)(t, "data.respondent.verification.data.a11", {}), s.source = "geo") : (s.address = (0, o.default)(t, "data.respondent.verification.data.a13", {}), s.source = "geo")
        }, s.setSource(), n.$on("centurionStorageDataFetched", function() {
            s.setSource()
        }, !0), s
    }
    e.exports = l, l.$inject = ["$translate", "$rootScope", "centurionStorageService"]
}, function(e, n, t) {
    "use strict";
    var r, a = t(14),
        o = (r = a) && r.__esModule ? r : {
            default: r
        };

    function i(e, n, t, r, a, i, s) {
        var l = {
            data: {},
            hasData: !1
        };
        return l.xsrf = i.get("XSRF-TOKEN"), l._serverTime = 0, l._clientTime = 0, l._dataWatcher = !1, e.$on("centurionStorageDataFetched", function() {
            var e = n.storage().get("NG_TRANSLATE_LANG_KEY");
            l.data.appdata && (0, o.default)(l.data, "appdata.lang") !== e && (l.data.appdata.lang = e)
        }), e.$on("$translateChangeSuccess", function() {
            if (l.hasData) {
                var e = n.use();
                l.data.appdata && (0, o.default)(l.data, "appdata.lang") !== e && (l.data.appdata.lang = e)
            }
        }), l.calcServerTime = function() {
            return l._serverTime + (l.getClientTime() - l._clientTime)
        }, l.getClientTime = function() {
            return (new Date).getTime()
        }, l.isInvalidSession = function() {
            return l.xsrf = i.get("XSRF-TOKEN"), !l.xsrf
        }, l.fetch = function() {
            var n = a.defer();
            return t({
                url: "/app/api/user",
                method: "GET"
            }).then(function(t) {
                l._serverTime = t.data.time, l._clientTime = l.getClientTime(), l.data = t.data.data, l.hasData = !0, e.$broadcast("centurionStorageDataFetched", l.data), n.resolve(l.data)
            }).catch(function(e) {
                n.reject(e)
            }), n.promise
        }, l.getData = function() {
            var e = a.defer();
            return l.isInvalidSession() ? (e.reject("session check failed"), e.promise) : l.hasData ? (e.resolve(l.data), e.promise) : (l.fetch().then(e.resolve).catch(e.reject), e.promise)
        }, l.saveData = function() {
            var n = a.defer();
            return l.isInvalidSession() ? (n.reject("session check failed"), n.promise) : (l.saveDataPromise = t({
                url: "/app/api/user",
                method: "PUT",
                data: l.data
            }), l.saveDataPromise.then(function(t) {
                e.$broadcast("session-renewed"), "Success" === t.data.status ? n.resolve(t) : n.reject(t), l.saveDataPromise = void 0
            }), l.saveDataPromise.catch(function(e) {
                n.reject(e), l.saveDataPromise = void 0
            }), e.$broadcast("re-evaluateProgress"), n.promise)
        }, l.killSession = function() {
            s.location.href = "/logout"
        }, l.submit = function() {
            return l.data.appdata.submitted = !0, l.data.appdata.submittedTs = l.calcServerTime(), t({
                url: "/app/api/user/submit",
                method: "PUT",
                data: l.data
            })
        }, l.reportVacant = function() {
            return l.data.appdata.vacant = !0, l.data.appdata.vacantTs = l.calcServerTime(), t({
                url: "/app/api/user/vacant",
                method: "PUT",
                data: l.data
            })
        }, l.noComplete = function() {
            return l.data.appdata.noComplete = !0, l.data.appdata.noCompleteTs = l.calcServerTime(), t({
                url: "/app/api/user/nocomplete",
                method: "PUT",
                data: l.data
            })
        }, l.submitPartial = function() {
            return t({
                url: "/app/api/user/submit-partial",
                method: "PUT",
                data: l.data
            })
        }, l.verifyId = function(e) {
            return t({
                url: "/app/api/user/id",
                method: "PUT",
                data: {
                    username: e
                }
            })
        }, l.reloginNonId = function() {
            return t.post("/authenticate/nonid", {
                type: "nonid"
            })
        }, l.reloginId = function(e) {
            return t.post("/authenticate/id", {
                type: "id",
                username: e
            })
        }, l.redirectToLogin = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            s.location.href = e ? "/logout?failed=1" : "/logout"
        }, l
    }
    e.exports = i, i.$inject = ["$rootScope", "$translate", "$http", "$state", "$q", "$cookies", "$window", "$log"]
}, function(e, n, t) {
    "use strict";
    var r, a = t(14),
        o = (r = a) && r.__esModule ? r : {
            default: r
        };

    function i(e, n, t, r) {
        return {
            request: function(e) {
                return e.url.match(/^http/) || (e.headers["X-Requested-With"] = "XMLHttpRequest"), e
            },
            response: function(e) {
                if (e && 200 === e.status) {
                    if ("redirect" === (0, o.default)(e, "data.action")) {
                        if ((0, o.default)(e, "data.state")) return void t.get("$state").go((0, o.default)(e, "data.state"), (0, o.default)(e, "data.params", {}));
                        if (e.data.url) return void(n.location.href = e.data.url)
                    }
                    return e
                }
            },
            responseError: function(t) {
                if (403 !== t.status) return e.reject(t);
                n.location.href = "/logout?security=1"
            }
        }
    }
    e.exports = i, i.$inject = ["$q", "$window", "$injector", "alertService"]
}, function(e, n, t) {
    "use strict";
    var r = s(t(14)),
        a = s(t(711)),
        o = s(t(157)),
        i = s(t(221));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function l(e) {
        var n = {};
        return n.roster = (0, r.default)(e, "data.respondent.roster", []), n.addToRoster = function(e) {
            "uc" === e ? n.roster.push({
                from: e,
                P_WAS_UNDERCOUNT_IND: "1"
            }) : "people" === e ? n.roster.push({
                from: e,
                P_ORIGROST_ADD_IND: "1"
            }) : n.roster.push({
                from: e
            })
        }, n.removePeopleByFrom = function(e) {
            var t = 0;
            return (0, a.default)(n.roster, function(n) {
                if (n.from === e) return t += 1, !0
            }), t
        }, n.removeFromRoster = function(e) {
            (0, a.default)(n.roster, function(n) {
                return n === e
            })
        }, n.finalizeRoster = function() {
            n.persons = [], n.refPersonSet = !1, (0, o.default)((0, i.default)(n.pruneRoster(n.roster)), function(e) {
                var t = angular.copy(e),
                    r = {
                        from: t.from
                    };
                delete t.from, n.persons = n.constructPersons(t, r)
            }), n.refPersonSet || (n.persons[0].data.P_REFERENCE_PERSON_IND = "1", n.persons[0].metadata.isReferencePerson = !0), e.data.respondent.persons = n.persons
        }, n.isValidPerson = function(e) {
            return !!(e.P_FIRST_NAME || e.P_MIDDLE_NAME || e.P_LAST_NAME)
        }, n.fullName = function(e, n) {
            var t = (0, r.default)(e, "P_FIRST_NAME", ""),
                a = (0, r.default)(e, "P_MIDDLE_NAME", ""),
                o = (0, r.default)(e, "P_LAST_NAME", "");
            (t || o) && a && (a = a.substring(0, 1));
            var i = t + " " + a + " " + o;
            return (i = i.trim()).length < 1 ? "Person " + (n + 1) : i
        }, n.pruneRoster = function(e) {
            return (0, o.default)(e, function(e) {
                n.isValidPerson(e) || n.removeFromRoster(e)
            }), e
        }, n.constructPersons = function(e, t) {
            return "1" !== e.P_OWNER_RENTER_IND || n.refPersonSet ? n.persons.push({
                data: e,
                metadata: t
            }) : (t.isReferencePerson = !0, e.P_REFERENCE_PERSON_IND = "1", n.persons.unshift({
                data: e,
                metadata: t
            }), n.refPersonSet = !0), n.persons
        }, n.getCountOfPeopleNotFrom = function(e) {
            return n.roster.filter(function(n) {
                return n.from !== e
            }).length
        }, n
    }
    e.exports = l, l.$inject = ["centurionStorageService"]
}, function(e, n, t) {
    var r = t(71),
        a = t(712);
    e.exports = function(e, n) {
        var t = [];
        if (!e || !e.length) return t;
        var o = -1,
            i = [],
            s = e.length;
        for (n = r(n, 3); ++o < s;) {
            var l = e[o];
            n(l, o, e) && (t.push(l), i.push(o))
        }
        return a(e, i), t
    }
}, function(e, n, t) {
    var r = t(713),
        a = t(69),
        o = Array.prototype.splice;
    e.exports = function(e, n) {
        for (var t = e ? n.length : 0, i = t - 1; t--;) {
            var s = n[t];
            if (t == i || s !== l) {
                var l = s;
                a(s) ? o.call(e, s, 1) : r(e, s)
            }
        }
        return e
    }
}, function(e, n, t) {
    var r = t(88),
        a = t(714),
        o = t(715),
        i = t(60);
    e.exports = function(e, n) {
        return n = r(n, e), null == (e = o(e, n)) || delete e[i(a(n))]
    }
}, function(e, n) {
    e.exports = function(e) {
        var n = null == e ? 0 : e.length;
        return n ? e[n - 1] : void 0
    }
}, function(e, n, t) {
    var r = t(138),
        a = t(198);
    e.exports = function(e, n) {
        return n.length < 2 ? e : r(e, a(n, 0, -1))
    }
}, function(e, n, t) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        a = c(t(220)),
        o = c(t(14)),
        i = c(t(222)),
        s = c(t(210)),
        l = c(t(223));
    c(t(59));

    function c(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function u(e, n, t, c, u, d, p, _, f, h, m) {
        var g = {},
            v = p.getInstance();

        function E(e, n) {
            var t = {
                hasDescriptionField: !0,
                model: e
            };
            return b(function(e, n) {
                if ("apt_address" === n.name) return !(!e.a10.ADR_COMPLEX_NAME || !e.a10.ADR_UNIT_TEXT || !e.a10.ADR_ZIP_TEXT && !e.a10.ADR_PR_MUNI_NAME);
                if ("urb_address" === n.name) return !(!e.a10.ADR_PR_URB_NAME || !e.a10.ADR_STNU_TEXT || !e.a10.ADR_ZIP_TEXT && !e.a10.ADR_PR_MUNI_NAME);
                if ("areanm_address" === n.name) return !(!e.a10.ADR_PR_AREA_PRI_NAME || !e.a10.ADR_STNM_TEXT || !e.a10.ADR_ZIP_TEXT && !e.a10.ADR_PR_MUNI_NAME);
                if ("gen_address" === n.name) return !(!e.a10.ADR_STNU_TEXT || !e.a10.ADR_STNM_TEXT || !e.a10.ADR_ZIP_TEXT && !e.a10.ADR_PR_MUNI_NAME);
                if ("other_address_pr" === n.name) return !(!e.a10.ADR_ZIP_TEXT && !e.a10.ADR_PR_MUNI_NAME);
                return !1
            }(e, n), n, t)
        }

        function T(e) {
            return g.truncateZip(e.a10), t(function(n) {
                m("pr", e, g.metadata, 11).then(function() {
                    n("respondent")
                }).catch(function() {
                    n("respondent")
                })
            })
        }

        function R(e) {
            return !(v.currentPageAttempt >= e.attempts) || (_.noComplete(), !1)
        }

        function b(e, n, t) {
            return v.currentPageErrors.error = {
                message: "intro." + n.name + "."
            }, e ? !(t && t.hasDescriptionField && !v.currentPageErrors.hasSeenWarning && !t.model.a10.ADR_LOC_DESC_TEXT) || (P({
                seen: !0,
                message: "error3",
                type: "Warning",
                class: "alert-info"
            }), !1) : v.currentPageErrors.hasSeenError ? 1 === v.currentPageErrors.hasSeenError ? (P({
                seen: 2,
                message: "error2",
                type: "Error",
                class: "alert-danger"
            }), !1) : R(n) : (P({
                seen: 1,
                message: "error1",
                type: "Error",
                class: "alert-danger"
            }), !1)
        }

        function P(e) {
            d(function() {
                v.currentPageErrors["hasSeen" + e.type] = e.seen, v.currentPageErrors.error.message += e.message, v.currentPageErrors.error.class = e.class
            })
        }

        function A(e) {
            delete e.a10.ADR_RR_DESC_TEXT, delete e.a10.ADR_RR_NUM_TEXT, delete e.a10.ADR_RR_BOX_NUM_TEXT, delete e.a10.ADR_PR_MUNI_NAME, delete e.a10.ADR_CITY_TEXT, delete e.a10.ADR_STATE_TEXT, delete e.a10.ADR_ZIP_TEXT, delete e.a10.ADR_UNIT_TEXT, delete e.a10.ADR_STNU_TEXT, delete e.a10.ADR_STNM_TEXT, delete e.a10.ADR_LOC_DESC_TEXT;
            var n = v.metadata.path;
            return n[n.indexOf(v.currentPage.name) - 1]
        }
        g.reviseFlags = {}, g.roster = f.roster, g.appdata = (0, o.default)(_, "data.appdata", {}), g.prelist = (0, o.default)(_, "data.respondent.prelist", {}), v.page("state", {
            attempts: 1,
            hidePrevious: !0,
            next: function(t) {
                if ("1" === t.RESP_LOC_OCD_CTRY_CODE) return "residence";
                if ("2" === t.RESP_LOC_OCD_CTRY_CODE) return n.$broadcast("i18n-update-available-languages", !0), "apt";
                if ("3" === t.RESP_LOC_OCD_CTRY_CODE) return e.go("goodbye");
                return "residence"
            }
        }).page("residence", {
            attempts: 3,
            validate: function(e, n) {
                if ("1" === e.ADR_NO_STREET_ADR_IND) return !0;
                return b(e.a10.ADR_STNU_TEXT && e.a10.ADR_STNM_TEXT && (e.a10.ADR_CITY_TEXT && e.a10.ADR_STATE_TEXT || e.a10.ADR_ZIP_TEXT), n)
            },
            previous: A,
            next: function(e) {
                var n = e.ADR_NO_STREET_ADR_IND && "1" === e.ADR_NO_STREET_ADR_IND,
                    r = e.a10.ADR_STNU_TEXT && e.a10.ADR_STNM_TEXT && (e.a10.ADR_CITY_TEXT && e.a10.ADR_STATE_TEXT || e.a10.ADR_ZIP_TEXT);
                if (g.truncateZip(e.a10), n && !r) return "rural_route";
                return t(function(n) {
                    m("sa", e, g.metadata, 11).then(function() {
                        var t = e.a11.ADR_MAF_STATUS_CODE;
                        return (0, s.default)(["1", "2", "3", "4"], t) ? n("stan_residence") : n("residence2")
                    }).catch(function() {
                        return n("respondent")
                    })
                })
            }
        }).page("stan_residence", {
            attempts: 3,
            validate: function(e, n) {
                if (!g.getReviseFlag(n)) return !0;
                return b(!!(e.a12.ADR_STNU_TEXT && e.a12.ADR_STNM_TEXT && (e.a12.ADR_CITY_TEXT || e.a12.ADR_STATE_TEXT) && e.a12.ADR_ZIP_TEXT), n)
            },
            hidePrevious: !0,
            next: function(e) {
                if (g.truncateZip(e.a12), !g.getReviseFlag("stan_residence")) return e.a12 = {}, "respondent";
                var n = S(e);
                if (n) return t(function(n) {
                    m("sa", e, g.metadata, 13).then(function() {
                        return n("respondent")
                    }).catch(function() {
                        return n("respondent")
                    })
                });
                if (!n) return e.a12 = {}, "respondent"
            }
        }).page("residence2", {
            attempts: 3,
            resolve: function() {
                return g.createResidenceFields()
            },
            hidePrevious: !0,
            validate: function(e, n) {
                return b(!!(e.a12.ADR_STNU_TEXT && e.a12.ADR_STNM_TEXT && (e.a12.ADR_CITY_TEXT && e.a12.ADR_STATE_TEXT || e.a12.ADR_ZIP_TEXT)), n)
            },
            next: function(e) {
                g.truncateZip(e.a12);
                var n = S(e);
                if (n) return t(function(n) {
                    m("sa", e, g.metadata, 13).then(function() {
                        return n("respondent")
                    }).catch(function() {
                        return n("respondent")
                    })
                });
                if (!n) return e.a12 = {}, "respondent"
            }
        }).page("rural_route", {
            attempts: 1,
            next: function(e) {
                if ("1" === e.ADR_IS_RURAL_YES_IND) return "rr_address";
                return "homeless"
            }
        }).page("homeless", {
            attempts: 1,
            next: "other_address"
        }).page("rr_address", {
            attempts: 3,
            validate: function(e, n) {
                return b(e.a10.ADR_RR_DESC_TEXT && e.a10.ADR_RR_NUM_TEXT && e.a10.ADR_RR_BOX_NUM_TEXT && (e.a10.ADR_CITY_TEXT && e.a10.ADR_STATE_TEXT || e.a10.ADR_ZIP_TEXT), n, {
                    hasDescriptionField: !0,
                    model: e
                })
            },
            previous: A,
            next: function(e) {
                return g.truncateZip(e.a10), t(function(n) {
                    m("rr", e, g.metadata, 11).then(function() {
                        n("stan_rr_address")
                    }).catch(function() {
                        n("respondent")
                    })
                })
            }
        }).page("stan_rr_address", {
            attempts: 3,
            hidePrevious: !0,
            validate: function(e, n) {
                if (!g.getReviseFlag(n)) return !0;
                return b(e.a12.ADR_RR_DESC_TEXT && e.a12.ADR_RR_NUM_TEXT && e.a12.ADR_RR_BOX_NUM_TEXT && (e.a12.ADR_CITY_TEXT && e.a12.ADR_STATE_TEXT || e.a12.ADR_ZIP_TEXT), n)
            },
            next: function(e) {
                if (g.truncateZip(e.a12), !g.getReviseFlag("stan_rr_address")) return e.a12 = {}, "respondent";
                var n = S(e);
                if (n) return t(function(n) {
                    m("rr", e, g.metadata, 13).then(function() {
                        n("respondent")
                    }).catch(function() {
                        n("respondent")
                    })
                });
                if (!n) return e.a12 = {}, "respondent"
            }
        }).page("other_address", {
            attempts: 3,
            validate: function(e, n) {
                return b(e.a10.ADR_CITY_TEXT && e.a10.ADR_STATE_TEXT || e.a10.ADR_ZIP_TEXT, n, {
                    hasDescriptionField: !0,
                    model: e
                })
            },
            previous: A,
            next: function(e) {
                return g.truncateZip(e.a10), t(function(n) {
                    m("oa", e, g.metadata, 11).then(function() {
                        n("stan_other_address")
                    }).catch(function() {
                        n("respondent")
                    })
                })
            }
        }).page("stan_other_address", {
            attempts: 3,
            hidePrevious: !0,
            validate: function(e, n) {
                if (!g.getReviseFlag(n)) return !0;
                return b(e.a12.ADR_CITY_TEXT && e.a12.ADR_STATE_TEXT || e.a12.ADR_ZIP_TEXT, n)
            },
            next: function(e) {
                if (g.truncateZip(e.a12), !g.getReviseFlag("stan_other_address")) return e.a12 = {}, "respondent";
                var n = S(e);
                if (n) return t(function(n) {
                    m("rr", e, g.metadata, 13).then(function() {
                        n("respondent")
                    }).catch(function() {
                        n("respondent")
                    })
                });
                if (!n) return e.a12 = {}, "respondent"
            }
        }).page("apt", {
            attempts: 1,
            next: function(e) {
                if ("1" === e.ADR_IS_APT_YES_IND) return "apt_address";
                return "urb"
            },
            previous: function() {
                return n.$broadcast("i18n-update-available-languages"), "state"
            }
        }).page("urb", {
            attempts: 1,
            next: function(e) {
                if ("1" === e.ADR_IS_URB_YES_IND) return "urb_address";
                return "areanm"
            }
        }).page("areanm", {
            attempts: 1,
            next: function(e) {
                if ("1" === e.ADR_IS_AREA_YES_IND) return "areanm_address";
                return "homeless_pr"
            }
        }).page("homeless_pr", {
            attempts: 1,
            next: function(e) {
                if ("1" === e.ADR_IS_HOMELESS_YES_IND) return "other_address_pr";
                return "gen_address"
            }
        }).page("apt_address", {
            attempts: 3,
            validate: E,
            previous: A,
            next: T
        }).page("urb_address", {
            attempts: 3,
            validate: E,
            previous: A,
            next: T
        }).page("areanm_address", {
            attempts: 3,
            validate: E,
            previous: A,
            next: T
        }).page("gen_address", {
            attempts: 3,
            validate: E,
            previous: A,
            next: T
        }).page("other_address_pr", {
            attempts: 3,
            validate: E,
            previous: A,
            next: T
        }).page("confirm", {
            attempts: 0,
            hidePrevious: !0,
            next: function() {
                if ("1" === g.dispatcher.model.RESP_FOR_QUEST_ADR_YES_IND) return "verifyaddress";
                return "verify"
            }
        }).page("verify", {
            attempts: 0,
            hidePrevious: !0,
            next: function() {
                return t(function(e) {
                    var n = [g.dispatcher.model.RESP_VERIFIED_USER_ID1, g.dispatcher.model.RESP_VERIFIED_USER_ID2, g.dispatcher.model.RESP_VERIFIED_USER_ID3].join("");
                    g.dispatcher.model.RESP_VERIFIED_USER_ID = n, delete g.dispatcher.model.RESP_VERIFIED_USER_ID1, delete g.dispatcher.model.RESP_VERIFIED_USER_ID2, delete g.dispatcher.model.RESP_VERIFIED_USER_ID3, _.verifyId(n).then(function(t) {
                        var r = t.data;
                        return r.valid ? r.matched ? e("other_complete_auth") : _.submitPartial().then(function() {
                            return _.reloginId(n)
                        }).catch(function() {
                            return _.redirectToLogin(!0)
                        }) : _.redirectToLogin(!0)
                    }).catch(function() {
                        return _.redirectToLogin()
                    })
                })
            }
        }).page("verifyaddress", {
            attempts: 1,
            next: function() {
                if ("1" === g.dispatcher.model.H_OCC_YES_IND) return "respondent";
                return "anyone"
            }
        }).page("anyone", {
            attempts: 1,
            next: function() {
                if ("1" === g.dispatcher.model.H_OCC_NO_PRX_IND) return "vacancy";
                return "other_complete"
            }
        }).page("vacancy", {
            attempts: 1,
            next: "other_complete"
        }).page("other_complete", {
            attempts: 1,
            hidePrevious: !0,
            next: function() {
                return t(function() {
                    _.reportVacant().then(function(e) {
                        return "id" === e.data.reloginAs ? _.redirectToLogin() : _.reloginNonId()
                    }).catch(function(e) {
                        e instanceof Error && _.redirectToLogin()
                    })
                })
            }
        }).page("other_complete_auth", {
            attempts: 1,
            next: function() {
                return _.submitPartial().then(function() {
                    return "1" === g.dispatcher.model.RESP_OTHERID_YES_IND ? _.redirectToLogin() : _.reloginNonId()
                }).catch(function() {
                    _.redirectToLogin()
                })
            }
        }).page("respondent", {
            attempts: 3,
            hidePrevious: !0,
            resolve: function() {
                return n.$broadcast("i18n-update-available-languages")
            },
            validate: function(e, n) {
                if (v.currentPageErrors.error = {
                        message: "intro." + n.name + "."
                    }, !(((0, o.default)(g, "roster[0].P_FIRST_NAME", "") + (0, o.default)(g, "roster[0].P_MIDDLE_NAME", "") + (0, o.default)(g, "roster[0].P_LAST_NAME", "")).length >= 1)) return v.currentPageErrors.hasSeenError ? 1 === v.currentPageErrors.hasSeenError ? (P({
                    seen: 2,
                    message: "tooShort2",
                    type: "Error",
                    class: "alert-danger"
                }), !1) : R(n) : (P({
                    seen: 1,
                    message: "tooShort",
                    type: "Error",
                    class: "alert-danger"
                }), !1);
                if (!v.currentPageErrors.hasSeenWarning && 10 !== ((0, o.default)(e, "RESP_PH_AREA_ID", "") + (0, o.default)(e, "RESP_PH_PREFIX_ID", "") + (0, o.default)(e, "RESP_PH_SUFFIX_ID", "")).length) return P({
                    seen: !0,
                    message: "noPhone",
                    type: "Warning",
                    class: "alert-info"
                }), !1;
                return !0
            },
            next: function() {
                g.dispatcher.inReview || ("id" !== g.appdata.accountType && (_.data.respondent.verification.data.ADR_EVOLUTION_CODE = function(e) {
                    if (!(0, l.default)((0, o.default)(e, "a13"))) return "13";
                    if (!(0, l.default)((0, o.default)(e, "a12"))) return "12";
                    if (!(0, l.default)((0, o.default)(e, "a11"))) return "11";
                    if (!(0, l.default)((0, o.default)(e, "a10"))) return "10";
                    return "10"
                }(g.dispatcher.model), _.data.respondent.verification.data.ADR_TYPE_CODE = N(g.metadata.path)), g.dispatcher.setFinished(), (0, i.default)(g, "roster[0].from", "respondent"), (0, i.default)(g, "roster[0].P_RESPONDENT_IND", "1"), (0, i.default)(_, "data.appdata.lastState", "dashboard"), (0, i.default)(_, "data.respondent.household.data.H_SIZE_CALCULATED_INT", 1), _.saveData().then(function() {
                    h.setSource(), v.setReturn("dashboard"), v.return()
                }))
            }
        }), v.baseState = "intro.page", v.setInitialPage(function() {
            return "id" === g.appdata.accountType ? "confirm" : "state"
        }), v.setReturn(function() {
            return "id" === g.appdata.accountType ? "confirm" : "state"
        }), g.metadata = _.data.respondent.verification.metadata, v.setMetadata(g.metadata), v.setModel(_.data.respondent.verification.data), v.enter(), g.dispatcher = v, g.truncateZip = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e.ADR_ZIP_TEXT && e.ADR_ZIP_TEXT.length > 5 && (e.ADR_ZIP_TEXT = e.ADR_ZIP_TEXT.substring(0, 5))
        }, g.createResidenceFields = function(e) {
            var n;

            function t(e) {
                var n = (0, a.default)(e, function(e) {
                        return (0, o.default)(v, "model.a11." + e, "")
                    }),
                    t = "";
                return n.forEach(function(e) {
                    e && (t += t ? " " + e : e)
                }), t
            }
            v.model.a12.ADR_STNU_TEXT = t(["ADR_STNU_PRE_STD_TEXT", "ADR_STNU_PRI_STD_TEXT", "ADR_STNU_SEP_STD_TEXT", "ADR_STNU_SEC_STD_TEXT", "ADR_STNU_SUF_STD_TEXT"]), v.model.a12.ADR_STNM_TEXT = t(["ADR_STNM_PRE_QUAL_STD_TEXT", "ADR_STNM_PRE_DIR_STD_TEXT", "ADR_STNM_PRE_TYPE_STD_CODE", "ADR_STNM_BASE_STD_NAME", "ADR_STNM_SUF_TYPE_STD_CODE", "ADR_STNM_SUF_DIR_STD_TEXT", "ADR_STNM_SUF_QUAL_STD_TEXT"]), v.model.a12.ADR_UNIT_TEXT = t(["ADR_UNIT_DESC_STD_TEXT", "ADR_UNIT_NUM_STD_TEXT"]), v.model.a12.ADR_CITY_TEXT = (0, o.default)(v, "model.a11.ADR_CITY_UPD_NAME", ""), v.model.a12.ADR_STATE_TEXT = (0, o.default)(v, "model.a11.ADR_STATE_UPD_NAME", ""), v.model.a12.ADR_ZIP_TEXT = (0, o.default)(v, "model.a11.ADR_ZIP_UPD_TEXT", ""), n = v.model, g.modelString = JSON.stringify(n), "SR" === e && g.setReviseFlag("stan_residence")
        }, g.populateA12RRFields = function() {
            v.model.a12.ADR_RR_DESC_TEXT = (0, o.default)(v, "model.a11.ADR_RR_DESC_TEXT"), v.model.a12.ADR_RR_NUM_TEXT = (0, o.default)(v, "model.a11.ADR_RR_NUM_TEXT"), v.model.a12.ADR_RR_BOX_NUM_TEXT = (0, o.default)(v, "model.a11.ADR_RR_BOX_NUM_TEXT"), v.model.a12.ADR_CITY_TEXT = (0, o.default)(v, "model.a11.ADR_CITY_UPD_NAME", ""), v.model.a12.ADR_STATE_TEXT = (0, o.default)(v, "model.a11.ADR_STATE_UPD_NAME", ""), v.model.a12.ADR_ZIP_TEXT = (0, o.default)(v, "model.a11.ADR_ZIP_UPD_TEXT", "")
        }, g.populateA12OtherFields = function(e) {
            v.model.a12.ADR_CITY_TEXT = (0, o.default)(v, "model.a11.ADR_CITY_UPD_NAME", ""), v.model.a12.ADR_STATE_TEXT = (0, o.default)(v, "model.a11.ADR_STATE_UPD_NAME", ""), v.model.a12.ADR_ZIP_TEXT = (0, o.default)(v, "model.a11.ADR_ZIP_UPD_TEXT", "")
        };
        var S = function(e) {
            return g.modelString !== JSON.stringify(e)
        };

        function N(e) {
            return -1 !== e.indexOf("residence") && -1 === e.indexOf("rr_address") && -1 === e.indexOf("other_address") ? "1" : -1 !== e.indexOf("rr_address") ? "2" : -1 !== e.indexOf("apt_address") ? "4" : -1 !== e.indexOf("urb_address") ? "5" : -1 !== e.indexOf("areanm_address") ? "6" : -1 !== e.indexOf("gen_address") ? "7" : -1 !== e.indexOf("other_address") || -1 !== e.indexOf("other_address_pr") ? "9" : "0"
        }
        return g.setReviseFlag = function(e) {
            g.reviseFlags[e] = !0
        }, g.getReviseFlag = function(e) {
            return "object" === (void 0 === e ? "undefined" : r(e)) ? g.reviseFlags[e.name] : g.reviseFlags[e]
        }, g.getAdrTypeCode = N, g
    }
    e.exports = u, u.$inject = ["$state", "$rootScope", "$q", "$window", "$log", "$timeout", "formDispatcher", "centurionStorageService", "rosterService", "addressService", "rtnpCaller"]
}, function(e, n, t) {
    "use strict";

    function r(e) {
        var n = {
            stateHistory: [],
            gotoPreviousState: function() {
                var t = n.stateHistory[n.stateHistory.length - 1];
                return t ? e.go(t.state, t.params) : e.go("init")
            },
            pushStateHistory: function(e, t) {
                n.stateHistory.push({
                    state: e,
                    params: t
                })
            }
        };
        return n
    }
    e.exports = r, r.$inject = ["$state"]
}, function(e, n, t) {
    "use strict";
    var r, a = t(719),
        o = (r = a) && r.__esModule ? r : {
            default: r
        };

    function i(e, n, t, r, a, i) {
        function s() {
            this.map = {}, this.currentPage = null, this.currentPageValid = !1, this.currentPageAttempt = 0, this.currentPageErrors = {}, this.model = {}, this.lastPage = null, this.baseState = t.current.name, this.stateParam = "page", this.inReview = !1, this.hasReviewMode = !0, this.unbindWatcher = null, this.processing = !1
        }

        function l(e) {
            return "function" == typeof e ? e : new Function('return "' + e.toString() + '"')
        }
        return s.prototype.setModel = function(e) {
            this.modelRef = e, this.model = angular.copy(this.modelRef)
        }, s.prototype.setMetadata = function(e) {
            this.metadata = e
        }, s.prototype.page = function(e, n) {
            var t = n.previous ? l(n.previous) : null,
                r = n.next ? l(n.next) : this.return.bind(this),
                o = n.attempts ? n.attempts : 0,
                i = n.hidePrevious || !1,
                s = null,
                c = null,
                u = null,
                d = n.data || {};
            return e || a.warn("Trying to create a page dispatch, but no name given"), angular.isFunction(n.resolve) && (s = n.resolve), angular.isFunction(n.validate) && (c = n.validate), angular.isFunction(n.beforeAction) && (u = n.beforeAction), this.map[e] = {
                previous: t,
                next: r,
                name: e,
                data: d,
                hidePrevious: i,
                validate: c,
                attempts: o,
                beforeAction: u,
                resolve: s
            }, this
        }, s.prototype.setInitialPage = function(e) {
            this.initialPage = l(e)
        }, s.prototype.enter = function() {
            this.metadata && this.hasReviewMode && (this.inReview = !!this.metadata.finished), angular.isFunction(this.onEnterFn) ? n.when(this.onEnterFn()).then(this._gotoEntryPage.bind(this)) : this._gotoEntryPage()
        }, s.prototype.onEnter = function(e) {
            this.onEnterFn = e
        }, s.prototype.setReturn = function(e) {
            this.returnTo = l(e)
        }, s.prototype.return = function() {
            t.go(this.returnTo())
        }, s.prototype.previous = function() {
            if (this.inReview) return this.goto(this._getPreviousPage());
            this._handlePageAction("previous")
        }, s.prototype.next = function() {
            return this.inReview ? this.goto(this._getNextPage()) : (this.currentPageAttempt += 1, this._handlePageAction("next"))
        }, s.prototype.goto = function(e) {
            if (e && this.map[e]) {
                this.currentPage = this.map[e], this.metadata.lastPage = e, this._updatePath(e), this._resetPageDefaults();
                var n = {};
                n[this.stateParam] = e, t.go(this.baseState, n, {
                    reload: !0
                })
            } else this.return()
        }, s.prototype.resetAttempts = function() {
            this.currentPageAttempt = 0
        }, s.prototype.setFinished = function() {
            var e = void 0 === (arguments.length <= 0 ? void 0 : arguments[0]) ? 1 : arguments.length <= 0 ? void 0 : arguments[0];
            e = 1 === e || !0 === e ? 1 : 0, this.metadata.finished = e, this.metadata.finished_ts = e ? (new Date).getTime() : 0
        }, s.prototype._handlePageAction = function(e) {
            var t = this,
                r = t.currentPage.name;
            if (t.map[r] && t.map[r][e]) {
                if (t.currentPageAction = e, t.inReview) return t.goto(t.map[r][e](e, t.model));
                if ("next" === e) {
                    if (t.currentPage.validate) {
                        var i = t.currentPage.validate(t.model, t.currentPage);
                        (0, o.default)(i) ? t.currentPageValid = i: Object.keys(t.currentPageErrors).length && (t.currentPageValid = !1)
                    }
                    if (!t.currentPageValid) {
                        if (!t.currentPage.attempts) return !1;
                        if (t.currentPageAttempt <= t.currentPage.attempts) return !1
                    }
                }
                t.map[r].beforeAction && angular.isFunction(t.map[r].beforeAction) ? n.when(t.map[r].beforeAction(e, t.model)).then(function(n) {
                    t._processAction(r, e, n)
                }).catch(function(e) {
                    a.error("Error with beforeAction on page " + r + ": " + e)
                }) : t._processAction(r, e)
            } else "previous" === e && t._getPreviousPage(r) ? t.goto(t._getPreviousPage(r)) : t.return()
        }, s.prototype._processAction = function(e, t, r) {
            var a = this;
            a.processing = !0, a._resetPageDefaults(), n.when(a.map[e][t](a.model, r)).then(function(e) {
                a.map[e] && a.map[e].resolve && angular.isFunction(a.map[e].resolve) ? (n.when(a.map[e].resolve()).then(function() {
                    a.processing = !1, a.goto(e)
                }), a.processing = !1) : (a.processing = !1, a.goto(e))
            })
        }, s.prototype._updatePath = function(e) {
            if (!this.inReview && this.metadata) {
                this.metadata.path || (this.metadata.path = []);
                var n = this.metadata.path.indexOf(e); - 1 === n || this.metadata.finished ? this.metadata.finished || this.metadata.path.push(e) : this.metadata.path = this.metadata.path.slice(0, n + 1)
            }
        }, s.prototype._getPreviousPage = function(e) {
            if (!this.metadata || !this.metadata.path) return !1;
            e = e || this.currentPage.name;
            var n = this.metadata.path.indexOf(e);
            return n > 0 && this.metadata.path[n - 1]
        }, s.prototype._getNextPage = function(e) {
            if (!this.metadata || !this.metadata.path) return !1;
            e = e || this.currentPage.name;
            var n = this.metadata.path.indexOf(e);
            return !(-1 === n && !this.metadata.path[n + 1]) && this.metadata.path[n + 1]
        }, s.prototype._resetPageDefaults = function() {
            var n = this;
            angular.isFunction(n.unbindWatcher) && n.unbindWatcher(), n.dirty = !1, n.currentPageAttempt = 0, n.currentPageValid = !1, n.currentPageErrors = {}, n.inReview ? (i.addDeferredAlert("info", "alerts.review"), n.currentPageValid = !0) : angular.copy(n.model, n.modelRef), n.unbindWatcher = e.$watch(function() {
                return n.model
            }, function(e, t) {
                e !== t && (n.dirty = !0, n.unbindWatcher())
            }, !0)
        }, s.prototype._gotoEntryPage = function() {
            this.metadata && this.metadata.path && (this.inReview || this.metadata.finished) ? this.goto(this.metadata.path[0]) : this.metadata && this.metadata.lastPage && this.map[this.metadata.lastPage] ? this.goto(this.metadata.lastPage) : this.goto(this.initialPage())
        }, {
            getInstance: function() {
                return new s
            }
        }
    }
    e.exports = i, i.$inject = ["$rootScope", "$q", "$state", "$injector", "$log", "alertService"]
}, function(e, n, t) {
    var r = t(43),
        a = t(38),
        o = "[object Boolean]";
    e.exports = function(e) {
        return !0 === e || !1 === e || a(e) && r(e) == o
    }
}, function(e, n, t) {
    "use strict";
    e.exports = function() {
        return {
            "": "",
            Alabama: "AL",
            Alaska: "AK",
            Arizona: "AZ",
            Arkansas: "AR",
            California: "CA",
            Colorado: "CO",
            Connecticut: "CT",
            Delaware: "DE",
            "District Of Columbia": "DC",
            Florida: "FL",
            Georgia: "GA",
            Hawaii: "HI",
            Idaho: "ID",
            Illinois: "IL",
            Indiana: "IN",
            Iowa: "IA",
            Kansas: "KS",
            Kentucky: "KY",
            Louisiana: "LA",
            Maine: "ME",
            Maryland: "MD",
            Massachusetts: "MA",
            Michigan: "MI",
            Minnesota: "MN",
            Mississippi: "MS",
            Missouri: "MO",
            Montana: "MT",
            Nebraska: "NE",
            Nevada: "NV",
            "New Hampshire": "NH",
            "New Jersey": "NJ",
            "New Mexico": "NM",
            "New York": "NY",
            "North Carolina": "NC",
            "North Dakota": "ND",
            Ohio: "OH",
            Oklahoma: "OK",
            Oregon: "OR",
            Pennsylvania: "PA",
            "Rhode Island": "RI",
            "South Carolina": "SC",
            "South Dakota": "SD",
            Tennessee: "TN",
            Texas: "TX",
            Utah: "UT",
            Vermont: "VT",
            Virginia: "VA",
            Washington: "WA",
            "West Virginia": "WV",
            Wisconsin: "WI",
            Wyoming: "WY"
        }
    }
}, function(e, n, t) {
    "use strict";

    function r(e) {
        return function(n, t) {
            var r = "a" + (t - 1),
                a = {
                    evolution: "a" + t,
                    hn: n[r].ADR_STNU_TEXT,
                    street: n[r].ADR_STNM_TEXT,
                    ws: n[r].ADR_UNIT_TEXT,
                    city: n[r].ADR_CITY_TEXT,
                    state: n[r].ADR_STATE_TEXT,
                    zip: n[r].ADR_ZIP_TEXT
                };
            return e({
                method: "POST",
                url: "/app/api/address-geocoder",
                data: a,
                timeout: 5e3
            })
        }
    }
    e.exports = r, r.$inject = ["$http"]
}, function(e, n, t) {
    "use strict";

    function r(e) {
        return function(n, t, r) {
            var a = "a" + (r - 1),
                o = {};
            return "rr" === (n = n ? n.toLowerCase() : "rr") && (o = {
                street: [t[a].ADR_RR_DESC_TEXT, t[a].ADR_RR_NUM_TEXT, "BOX " + t[a].ADR_RR_BOX_NUM_TEXT].join(" "),
                city: t[a].ADR_CITY_TEXT,
                state: t[a].ADR_STATE_TEXT,
                zip: t[a].ADR_ZIP_TEXT
            }), "oa" === n ? o = {
                street: "",
                city: t[a].ADR_CITY_TEXT,
                state: t[a].ADR_STATE_TEXT,
                zip: t[a].ADR_ZIP_TEXT
            } : "pr" === n && (o = {
                aptcomplex: t[a].ADR_COMPLEX_NAME,
                urb: t[a].ADR_PR_URB_NAME,
                areanm: t[a].ADR_PR_AREA_PRI_NAME,
                hn: t[a].ADR_STNU_TEXT,
                street: t[a].ADR_STNM_TEXT,
                ws: t[a].ADR_UNIT_TEXT,
                city: t[a].ADR_PR_MUNI_NAME,
                state: t[a].ADR_STATE_TEXT,
                zip: t[a].ADR_ZIP_TEXT
            }), e({
                method: "POST",
                url: "/app/api/address-standardizer",
                data: o,
                timeout: 5e3
            })
        }
    }
    e.exports = r, r.$inject = ["$http"]
}, function(e, n, t) {
    "use strict";

    function r(e, n, t, r) {
        return function(a, o, i, s) {
            return r(function(r, l) {
                i.rtnpSource = a, "sa" === a ? e(o, s).then(function(e) {
                    i.formattedAddress = t.getStreetAddress(e.data, "geo", a, "fullMaps"), o["a" + s] = e.data, r()
                }).catch(l) : n(a, o, s).then(function(e) {
                    i.formattedAddress = t.getStreetAddress(e.data, "geo", a, "fullMaps"), o["a" + s] = e.data, r()
                }).catch(l)
            })
        }
    }
    e.exports = r, r.$inject = ["geocoder", "addressStandardizer", "addressService", "$q"]
}, function(e, n) {
    e.exports = '<div ng-hide="noHeader" class="modal-header">\n  <button ng-if="!hideClose" type="button" class="close" aria-label="Close modal" title="Close modal" ng-click="no(true)"><span aria-hidden="true">&times;</span></button>\n  <h4 id="modal-header-label" class="modal-title" tabindex="0" autofocus>{{ header }}</h4>\n</div>\n<div class="modal-body" ng-bind-html="msg"></div>\n<div class="modal-footer">\n  <button title="Yes" name="Dialog Yes" type="button" class="btn btn-primary ie-padding modal-btn-mobile" ng-click="yes()"><span translate="{{ customText ? customYes : \'dialogs.DIALOGS_YES\' }}"></span></button>\n  <button title="No" name="Dialog No" type="button" class="btn btn-default ie-padding modal-btn-mobile" ng-click="no()"><span translate="{{ customText ? customNo : \'dialogs.DIALOGS_NO\' }}"></span></button>\n</div>\n'
}, function(e, n) {
    e.exports = '<div class="modal-header text-center">\n  <h4 id="modal-header-label" class="modal-title text-danger" role="alert" tabindex="0" autofocus>\n    <span class="glyphicon glyphicon-warning-sign"></span>\n    <span translate="heartbeat.heading"></span>\n  </h4>\n</div>\n<div class="modal-body">\n  <div translate="heartbeat.message"></div>\n  <p class="bg-danger text-center" role="timer region">\n    <span translate="heartbeat.timeremaining"></span>\n    <strong aria-hidden="true">{{ minutes }}:{{ seconds}}</strong>\n    <span class="sr-only">{{ minutesSr }} min {{ secondsSr }}</span>\n  </p>\n</div>\n<div class="modal-footer">\n  <button name="Heartbeat Ok" title="Heartbeat Ok" type="button" class="btn btn-block btn-default" ng-click="ok()" translate="heartbeat.button"></button>\n</div>\n'
}, function(e, n) {
    e.exports = '<div class="modal-header">\n  <h4 id="modal-header-label" class="modal-title"><span class="glyphicon glyphicon-check"></span>{{ header }}</h4>\n</div>\n<div class="modal-body" ng-bind-html="msg"></div>\n<div class="modal-footer">\n  <button name="Custom Notify Ok" title="Ok" type="button" class="btn btn-default" ng-click="ok()"><span translate="dialogs.OKAY"></span></button>\n</div>\n'
}, function(e, n, t) {
    "use strict";
    t.r(n);
    var r, a = t(0),
        o = t(4),
        i = function() {
            function e(e) {
                this.text = e, this.glob = e.split(".");
                var n = this.text.split(".").map(function(e) {
                    return "**" === e ? "(?:|(?:\\.[^.]*)*)" : "*" === e ? "\\.[^.]*" : "\\." + e
                }).join("");
                this.regexp = new RegExp("^" + n + "$")
            }
            return e.is = function(e) {
                return !!/[!,*]+/.exec(e)
            }, e.fromString = function(n) {
                return e.is(n) ? new e(n) : null
            }, e.prototype.matches = function(e) {
                return this.regexp.test("." + e)
            }, e
        }(),
        s = t(3),
        l = t(1),
        c = function() {
            function e(e, n) {
                void 0 === e && (e = []), void 0 === n && (n = null), this._items = e, this._limit = n, this._evictListeners = [], this.onEvict = Object(a.K)(this._evictListeners)
            }
            return e.prototype.enqueue = function(e) {
                var n = this._items;
                return n.push(e), this._limit && n.length > this._limit && this.evict(), e
            }, e.prototype.evict = function() {
                var e = this._items.shift();
                return this._evictListeners.forEach(function(n) {
                    return n(e)
                }), e
            }, e.prototype.dequeue = function() {
                if (this.size()) return this._items.splice(0, 1)[0]
            }, e.prototype.clear = function() {
                var e = this._items;
                return this._items = [], e
            }, e.prototype.size = function() {
                return this._items.length
            }, e.prototype.remove = function(e) {
                var n = this._items.indexOf(e);
                return n > -1 && this._items.splice(n, 1)[0]
            }, e.prototype.peekTail = function() {
                return this._items[this._items.length - 1]
            }, e.prototype.peekHead = function() {
                if (this.size()) return this._items[0]
            }, e
        }();
    ! function(e) {
        e[e.SUPERSEDED = 2] = "SUPERSEDED", e[e.ABORTED = 3] = "ABORTED", e[e.INVALID = 4] = "INVALID", e[e.IGNORED = 5] = "IGNORED", e[e.ERROR = 6] = "ERROR"
    }(r || (r = {}));
    var u = 0,
        d = function() {
            function e(e, n, t) {
                this.$id = u++, this.type = e, this.message = n, this.detail = t
            }
            return e.isRejectionPromise = function(n) {
                return n && "function" == typeof n.then && Object(s.h)(e)(n._transitionRejection)
            }, e.superseded = function(n, t) {
                var a = new e(r.SUPERSEDED, "The transition has been superseded by a different transition", n);
                return t && t.redirected && (a.redirected = !0), a
            }, e.redirected = function(n) {
                return e.superseded(n, {
                    redirected: !0
                })
            }, e.invalid = function(n) {
                return new e(r.INVALID, "This transition is invalid", n)
            }, e.ignored = function(n) {
                return new e(r.IGNORED, "The transition was ignored", n)
            }, e.aborted = function(n) {
                return new e(r.ABORTED, "The transition has been aborted", n)
            }, e.errored = function(n) {
                return new e(r.ERROR, "The transition errored", n)
            }, e.normalize = function(n) {
                return Object(s.h)(e)(n) ? n : e.errored(n)
            }, e.prototype.toString = function() {
                var e, n = (e = this.detail) && e.toString !== Object.prototype.toString ? e.toString() : E(e);
                return "Transition Rejection($id: " + this.$id + " type: " + this.type + ", message: " + this.message + ", detail: " + n + ")"
            }, e.prototype.toPromise = function() {
                return Object(a.r)(Object(a.O)(this), {
                    _transitionRejection: this
                })
            }, e
        }();

    function p(e, n) {
        return n.length <= e ? n : n.substr(0, e - 3) + "..."
    }

    function _(e, n) {
        for (; n.length < e;) n += " ";
        return n
    }

    function f(e) {
        return e.replace(/^([A-Z])/, function(e) {
            return e.toLowerCase()
        }).replace(/([A-Z])/g, function(e) {
            return "-" + e.toLowerCase()
        })
    }

    function h(e) {
        var n = m(e),
            t = n.match(/^(function [^ ]+\([^)]*\))/),
            r = t ? t[1] : n,
            a = e.name || "";
        return a && r.match(/function \(/) ? "function " + a + r.substr(9) : r
    }

    function m(e) {
        var n = Object(l.a)(e) ? e.slice(-1)[0] : e;
        return n && n.toString() || "undefined"
    }
    var g = d.isRejectionPromise,
        v = Object(s.l)([
            [l.m, Object(s.p)("undefined")],
            [l.f, Object(s.p)("null")],
            [l.j, Object(s.p)("[Promise]")],
            [g, function(e) {
                return e._transitionRejection.toString()
            }],
            [function(e) {
                return Object(l.i)(e) && !Object(l.a)(e) && e.constructor !== Object && Object(l.d)(e.toString)
            }, function(e) {
                return e.toString()
            }],
            [l.e, h],
            [Object(s.p)(!0), a.y]
        ]);

    function E(e) {
        var n = [];

        function t(e) {
            if (Object(l.i)(e)) {
                if (-1 !== n.indexOf(e)) return "[circular ref]";
                n.push(e)
            }
            return v(e)
        }
        return Object(l.m)(e) ? t(e) : JSON.stringify(e, function(e, n) {
            return t(n)
        }).replace(/\\"/g, '"')
    }
    var T = function(e) {
            return function(n) {
                if (!n) return ["", ""];
                var t = n.indexOf(e);
                return -1 === t ? [n, ""] : [n.substr(0, t), n.substr(t + 1)]
            }
        },
        R = new RegExp("^(?:[a-z]+:)?//[^/]+/"),
        b = function(e) {
            return e.replace(/\/[^\/]*$/, "")
        },
        P = T("#"),
        A = T("?"),
        S = T("="),
        N = function(e) {
            return e ? e.replace(/^#/, "") : ""
        };

    function D(e) {
        var n = new RegExp("(" + e + ")", "g");
        return function(e) {
            return e.split(n).filter(a.y)
        }
    }

    function I(e, n) {
        return Object(l.l)(Object(a.P)(e)) && Object(l.l)(n) ? e.slice(0, -1).concat(Object(a.P)(e) + n) : Object(a.J)(e, n)
    }

    function O(e) {
        if (!e) return "ui-view (defunct)";
        var n = e.creationContext ? e.creationContext.name || "(root)" : "(none)";
        return "[ui-view#" + e.id + " " + e.$type + ":" + e.fqn + " (" + e.name + "@" + n + ")]"
    }

    function y(e) {
        return Object(l.h)(e) ? C[e] : C[C[e]]
    }
    var C, x = Function.prototype.bind.call(console.log, console),
        L = Object(l.d)(console.table) ? console.table.bind(console) : x.bind(console);
    ! function(e) {
        e[e.RESOLVE = 0] = "RESOLVE", e[e.TRANSITION = 1] = "TRANSITION", e[e.HOOK = 2] = "HOOK", e[e.UIVIEW = 3] = "UIVIEW", e[e.VIEWCONFIG = 4] = "VIEWCONFIG"
    }(C || (C = {}));
    var w = Object(s.k)("$id"),
        H = Object(s.k)("router.$id"),
        M = function(e) {
            return "Transition #" + w(e) + "-" + H(e)
        },
        X = function() {
            function e() {
                this._enabled = {}, this.approximateDigests = 0
            }
            return e.prototype._set = function(e, n) {
                var t = this;
                n.length || (n = Object.keys(C).map(function(e) {
                    return parseInt(e, 10)
                }).filter(function(e) {
                    return !isNaN(e)
                }).map(function(e) {
                    return C[e]
                })), n.map(y).forEach(function(n) {
                    return t._enabled[n] = e
                })
            }, e.prototype.enable = function() {
                for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                this._set(!0, e)
            }, e.prototype.disable = function() {
                for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                this._set(!1, e)
            }, e.prototype.enabled = function(e) {
                return !!this._enabled[y(e)]
            }, e.prototype.traceTransitionStart = function(e) {
                this.enabled(C.TRANSITION) && console.log(M(e) + ": Started  -> " + E(e))
            }, e.prototype.traceTransitionIgnored = function(e) {
                this.enabled(C.TRANSITION) && console.log(M(e) + ": Ignored  <> " + E(e))
            }, e.prototype.traceHookInvocation = function(e, n, t) {
                if (this.enabled(C.HOOK)) {
                    var r = Object(s.k)("traceData.hookType")(t) || "internal",
                        a = Object(s.k)("traceData.context.state.name")(t) || Object(s.k)("traceData.context")(t) || "unknown",
                        o = h(e.registeredHook.callback);
                    console.log(M(n) + ":   Hook -> " + r + " context: " + a + ", " + p(200, o))
                }
            }, e.prototype.traceHookResult = function(e, n, t) {
                this.enabled(C.HOOK) && console.log(M(n) + ":   <- Hook returned: " + p(200, E(e)))
            }, e.prototype.traceResolvePath = function(e, n, t) {
                this.enabled(C.RESOLVE) && console.log(M(t) + ":         Resolving " + e + " (" + n + ")")
            }, e.prototype.traceResolvableResolved = function(e, n) {
                this.enabled(C.RESOLVE) && console.log(M(n) + ":               <- Resolved  " + e + " to: " + p(200, E(e.data)))
            }, e.prototype.traceError = function(e, n) {
                this.enabled(C.TRANSITION) && console.log(M(n) + ": <- Rejected " + E(n) + ", reason: " + e)
            }, e.prototype.traceSuccess = function(e, n) {
                this.enabled(C.TRANSITION) && console.log(M(n) + ": <- Success  " + E(n) + ", final state: " + e.name)
            }, e.prototype.traceUIViewEvent = function(e, n, t) {
                void 0 === t && (t = ""), this.enabled(C.UIVIEW) && console.log("ui-view: " + _(30, e) + " " + O(n) + t)
            }, e.prototype.traceUIViewConfigUpdated = function(e, n) {
                this.enabled(C.UIVIEW) && this.traceUIViewEvent("Updating", e, " with ViewConfig from context='" + n + "'")
            }, e.prototype.traceUIViewFill = function(e, n) {
                this.enabled(C.UIVIEW) && this.traceUIViewEvent("Fill", e, " with: " + p(200, n))
            }, e.prototype.traceViewSync = function(e) {
                if (this.enabled(C.VIEWCONFIG)) {
                    var n = "uiview component fqn",
                        t = e.map(function(e) {
                            var t, r = e.uiView,
                                a = e.viewConfig,
                                o = r && r.fqn,
                                i = a && a.viewDecl.$context.name + ": (" + a.viewDecl.$name + ")";
                            return (t = {})[n] = o, t["view config state (view name)"] = i, t
                        }).sort(function(e, t) {
                            return (e[n] || "").localeCompare(t[n] || "")
                        });
                    L(t)
                }
            }, e.prototype.traceViewServiceEvent = function(e, n) {
                this.enabled(C.VIEWCONFIG) && console.log("VIEWCONFIG: " + e + " " + function(e) {
                    var n = e.viewDecl,
                        t = n.$context.name || "(root)";
                    return "[View#" + e.$id + " from '" + t + "' state]: target ui-view: '" + n.$uiViewName + "@" + n.$uiViewContextAnchor + "'"
                }(n))
            }, e.prototype.traceViewServiceUIViewEvent = function(e, n) {
                this.enabled(C.VIEWCONFIG) && console.log("VIEWCONFIG: " + e + " " + O(n))
            }, e
        }(),
        j = new X,
        $ = function() {
            function e(e) {
                this.pattern = /.*/, this.inherit = !0, Object(a.r)(this, e)
            }
            return e.prototype.is = function(e, n) {
                return !0
            }, e.prototype.encode = function(e, n) {
                return e
            }, e.prototype.decode = function(e, n) {
                return e
            }, e.prototype.equals = function(e, n) {
                return e == n
            }, e.prototype.$subPattern = function() {
                var e = this.pattern.toString();
                return e.substr(1, e.length - 2)
            }, e.prototype.toString = function() {
                return "{ParamType:" + this.name + "}"
            }, e.prototype.$normalize = function(e) {
                return this.is(e) ? e : this.decode(e)
            }, e.prototype.$asArray = function(e, n) {
                if (!e) return this;
                if ("auto" === e && !n) throw new Error("'auto' array mode is for query parameters only");
                return new U(this, e)
            }, e
        }();

    function U(e, n) {
        var t = this;

        function r(e) {
            return Object(l.a)(e) ? e : Object(l.c)(e) ? [e] : []
        }

        function o(e, t) {
            return function(o) {
                if (Object(l.a)(o) && 0 === o.length) return o;
                var i = r(o),
                    s = Object(a.B)(i, e);
                return !0 === t ? 0 === Object(a.s)(s, function(e) {
                    return !e
                }).length : function(e) {
                    switch (e.length) {
                        case 0:
                            return;
                        case 1:
                            return "auto" === n ? e[0] : e;
                        default:
                            return e
                    }
                }(s)
            }
        }

        function i(e) {
            return function(n, t) {
                var a = r(n),
                    o = r(t);
                if (a.length !== o.length) return !1;
                for (var i = 0; i < a.length; i++)
                    if (!e(a[i], o[i])) return !1;
                return !0
            }
        } ["encode", "decode", "equals", "$normalize"].forEach(function(n) {
            var r = e[n].bind(e),
                a = "equals" === n ? i : o;
            t[n] = a(r)
        }), Object(a.r)(this, {
            dynamic: e.dynamic,
            name: e.name,
            pattern: e.pattern,
            inherit: e.inherit,
            raw: e.raw,
            is: o(e.is.bind(e), !0),
            $arrayMode: n
        })
    }
    var F, k = Object.prototype.hasOwnProperty,
        q = function(e) {
            return 0 === ["value", "type", "squash", "array", "dynamic"].filter(k.bind(e || {})).length
        };

    function V(e, n, t) {
        var r = !1 === t.reloadOnSearch && n === F.SEARCH || void 0,
            o = [t.dynamic, r].find(l.c),
            i = Object(l.c)(o) ? {
                dynamic: o
            } : {},
            s = function(e) {
                function n() {
                    return e.value
                }
                e = q(e) ? {
                    value: e
                } : e, n.__cacheable = !0;
                var t = Object(l.e)(e.value) ? e.value : n;
                return Object(a.r)(e, {
                    $$fn: t
                })
            }(t && t.params && t.params[e]);
        return Object(a.r)(i, s)
    }! function(e) {
        e[e.PATH = 0] = "PATH", e[e.SEARCH = 1] = "SEARCH", e[e.CONFIG = 2] = "CONFIG"
    }(F || (F = {}));
    var Y, B = function() {
            function e(e, n, t, r, o) {
                var i = V(e, t, o);
                n = function(e, n, t, r, a) {
                    if (e.type && n && "string" !== n.name) throw new Error("Param '" + r + "' has two type configurations.");
                    if (e.type && n && "string" === n.name && a.type(e.type)) return a.type(e.type);
                    if (n) return n;
                    if (!e.type) {
                        var o = t === F.CONFIG ? "any" : t === F.PATH ? "path" : t === F.SEARCH ? "query" : "string";
                        return a.type(o)
                    }
                    return e.type instanceof $ ? e.type : a.type(e.type)
                }(i, n, t, e, r.paramTypes);
                var c, u, d = (c = {
                    array: t === F.SEARCH && "auto"
                }, u = e.match(/\[\]$/) ? {
                    array: !0
                } : {}, Object(a.r)(c, u, i).array);
                n = d ? n.$asArray(d, t === F.SEARCH) : n;
                var p = void 0 !== i.value || t === F.SEARCH,
                    _ = Object(l.c)(i.dynamic) ? !!i.dynamic : !!n.dynamic,
                    f = Object(l.c)(i.raw) ? !!i.raw : !!n.raw,
                    h = function(e, n, t) {
                        var r = e.squash;
                        if (!n || !1 === r) return !1;
                        if (!Object(l.c)(r) || null == r) return t;
                        if (!0 === r || Object(l.l)(r)) return r;
                        throw new Error("Invalid squash policy: '" + r + "'. Valid policies: false, true, or arbitrary string")
                    }(i, p, r.defaultSquashPolicy()),
                    m = function(e, n, t, r) {
                        var o = [{
                                from: "",
                                to: t || n ? void 0 : ""
                            }, {
                                from: null,
                                to: t || n ? void 0 : ""
                            }],
                            i = Object(l.a)(e.replace) ? e.replace : [];
                        Object(l.l)(r) && i.push({
                            from: r,
                            to: void 0
                        });
                        var c = Object(a.B)(i, Object(s.n)("from"));
                        return Object(a.s)(o, function(e) {
                            return -1 === c.indexOf(e.from)
                        }).concat(i)
                    }(i, d, p, h),
                    g = Object(l.c)(i.inherit) ? !!i.inherit : !!n.inherit;
                Object(a.r)(this, {
                    id: e,
                    type: n,
                    location: t,
                    isOptional: p,
                    dynamic: _,
                    raw: f,
                    squash: h,
                    replace: m,
                    inherit: g,
                    array: d,
                    config: i
                })
            }
            return e.values = function(e, n) {
                void 0 === n && (n = {});
                for (var t = {}, r = 0, a = e; r < a.length; r++) {
                    var o = a[r];
                    t[o.id] = o.value(n[o.id])
                }
                return t
            }, e.changed = function(e, n, t) {
                return void 0 === n && (n = {}), void 0 === t && (t = {}), e.filter(function(e) {
                    return !e.type.equals(n[e.id], t[e.id])
                })
            }, e.equals = function(n, t, r) {
                return void 0 === t && (t = {}), void 0 === r && (r = {}), 0 === e.changed(n, t, r).length
            }, e.validates = function(e, n) {
                return void 0 === n && (n = {}), e.map(function(e) {
                    return e.validates(n[e.id])
                }).reduce(a.e, !0)
            }, e.prototype.isDefaultValue = function(e) {
                return this.isOptional && this.type.equals(this.value(), e)
            }, e.prototype.value = function(e) {
                var n = this;
                return e = function(e) {
                    for (var t = 0, r = n.replace; t < r.length; t++) {
                        var a = r[t];
                        if (a.from === e) return a.to
                    }
                    return e
                }(e), Object(l.m)(e) ? function() {
                    if (n._defaultValueCache) return n._defaultValueCache.defaultValue;
                    if (!o.b.$injector) throw new Error("Injectable functions cannot be called at configuration time");
                    var e = o.b.$injector.invoke(n.config.$$fn);
                    if (null != e && !n.type.is(e)) throw new Error("Default value (" + e + ") for parameter '" + n.id + "' is not an instance of ParamType (" + n.type.name + ")");
                    return n.config.$$fn.__cacheable && (n._defaultValueCache = {
                        defaultValue: e
                    }), e
                }() : this.type.$normalize(e)
            }, e.prototype.isSearch = function() {
                return this.location === F.SEARCH
            }, e.prototype.validates = function(e) {
                if ((Object(l.m)(e) || null === e) && this.isOptional) return !0;
                var n = this.type.$normalize(e);
                if (!this.type.is(n)) return !1;
                var t = this.type.encode(n);
                return !(Object(l.l)(t) && !this.type.pattern.exec(t))
            }, e.prototype.toString = function() {
                return "{Param:" + this.id + " " + this.type + " squash: '" + this.squash + "' optional: " + this.isOptional + "}"
            }, e
        }(),
        z = function() {
            function e() {
                this.enqueue = !0, this.typeQueue = [], this.defaultTypes = Object(a.H)(e.prototype, ["hash", "string", "query", "path", "int", "bool", "date", "json", "any"]);
                this.types = Object(a.A)(Object(a.B)(this.defaultTypes, function(e, n) {
                    return new $(Object(a.r)({
                        name: n
                    }, e))
                }), {})
            }
            return e.prototype.dispose = function() {
                this.types = {}
            }, e.prototype.type = function(e, n, t) {
                if (!Object(l.c)(n)) return this.types[e];
                if (this.types.hasOwnProperty(e)) throw new Error("A type named '" + e + "' has already been defined.");
                return this.types[e] = new $(Object(a.r)({
                    name: e
                }, n)), t && (this.typeQueue.push({
                    name: e,
                    def: t
                }), this.enqueue || this._flushTypeQueue()), this
            }, e.prototype._flushTypeQueue = function() {
                for (; this.typeQueue.length;) {
                    var e = this.typeQueue.shift();
                    if (e.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
                    Object(a.r)(this.types[e.name], o.b.$injector.invoke(e.def))
                }
            }, e
        }();
    Y = function(e) {
        var n = function(e) {
                return null != e ? e.toString() : e
            },
            t = {
                encode: n,
                decode: n,
                is: Object(s.h)(String),
                pattern: /.*/,
                equals: function(e, n) {
                    return e == n
                }
            };
        return Object(a.r)({}, t, e)
    }, Object(a.r)(z.prototype, {
        string: Y({}),
        path: Y({
            pattern: /[^\/]*/
        }),
        query: Y({}),
        hash: Y({
            inherit: !1
        }),
        int: Y({
            decode: function(e) {
                return parseInt(e, 10)
            },
            is: function(e) {
                return !Object(l.g)(e) && this.decode(e.toString()) === e
            },
            pattern: /-?\d+/
        }),
        bool: Y({
            encode: function(e) {
                return e ? 1 : 0
            },
            decode: function(e) {
                return 0 !== parseInt(e, 10)
            },
            is: Object(s.h)(Boolean),
            pattern: /0|1/
        }),
        date: Y({
            encode: function(e) {
                return this.is(e) ? [e.getFullYear(), ("0" + (e.getMonth() + 1)).slice(-2), ("0" + e.getDate()).slice(-2)].join("-") : void 0
            },
            decode: function(e) {
                if (this.is(e)) return e;
                var n = this.capture.exec(e);
                return n ? new Date(n[1], n[2] - 1, n[3]) : void 0
            },
            is: function(e) {
                return e instanceof Date && !isNaN(e.valueOf())
            },
            equals: function(e, n) {
                return ["getFullYear", "getMonth", "getDate"].reduce(function(t, r) {
                    return t && e[r]() === n[r]()
                }, !0)
            },
            pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
            capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
        }),
        json: Y({
            encode: a.Q,
            decode: a.x,
            is: Object(s.h)(Object),
            equals: a.q,
            pattern: /[^\/]*/
        }),
        any: Y({
            encode: a.y,
            decode: a.y,
            is: function() {
                return !0
            },
            equals: a.q
        })
    });
    var Z = function() {
            function e(e) {
                void 0 === e && (e = {}), Object(a.r)(this, e)
            }
            return e.prototype.$inherit = function(e, n, t) {
                var r, o = Object(a.f)(n, t),
                    i = {},
                    s = [];
                for (var l in o)
                    if (o[l] && o[l].params && (r = Object.keys(o[l].params)).length)
                        for (var c in r) s.indexOf(r[c]) >= 0 || (s.push(r[c]), i[r[c]] = this[r[c]]);
                return Object(a.r)({}, i, e)
            }, e
        }(),
        W = function() {
            function e(n) {
                if (n instanceof e) {
                    var t = n;
                    this.state = t.state, this.paramSchema = t.paramSchema.slice(), this.paramValues = Object(a.r)({}, t.paramValues), this.resolvables = t.resolvables.slice(), this.views = t.views && t.views.slice()
                } else {
                    var r = n;
                    this.state = r, this.paramSchema = r.parameters({
                        inherit: !1
                    }), this.paramValues = {}, this.resolvables = r.resolvables.map(function(e) {
                        return e.clone()
                    })
                }
            }
            return e.prototype.clone = function() {
                return new e(this)
            }, e.prototype.applyRawParams = function(e) {
                return this.paramValues = this.paramSchema.reduce(function(n, t) {
                    return Object(a.h)(n, [(r = t).id, r.value(e[r.id])]);
                    var r
                }, {}), this
            }, e.prototype.parameter = function(e) {
                return Object(a.t)(this.paramSchema, Object(s.o)("id", e))
            }, e.prototype.equals = function(e, n) {
                var t = this.diff(e, n);
                return t && 0 === t.length
            }, e.prototype.diff = function(e, n) {
                if (this.state !== e.state) return !1;
                var t = n ? n(this) : this.paramSchema;
                return B.changed(t, this.paramValues, e.paramValues)
            }, e.clone = function(e) {
                return e.clone()
            }, e
        }(),
        G = function() {
            function e(e, n, t, r) {
                this._stateRegistry = e, this._identifier = n, this._identifier = n, this._params = Object(a.r)({}, t || {}), this._options = Object(a.r)({}, r || {}), this._definition = e.matcher.find(n, this._options.relative)
            }
            return e.prototype.name = function() {
                return this._definition && this._definition.name || this._identifier
            }, e.prototype.identifier = function() {
                return this._identifier
            }, e.prototype.params = function() {
                return this._params
            }, e.prototype.$state = function() {
                return this._definition
            }, e.prototype.state = function() {
                return this._definition && this._definition.self
            }, e.prototype.options = function() {
                return this._options
            }, e.prototype.exists = function() {
                return !(!this._definition || !this._definition.self)
            }, e.prototype.valid = function() {
                return !this.error()
            }, e.prototype.error = function() {
                var e = this.options().relative;
                if (!this._definition && e) {
                    var n = e.name ? e.name : e;
                    return "Could not resolve '" + this.name() + "' from state '" + n + "'"
                }
                return this._definition ? this._definition.self ? void 0 : "State '" + this.name() + "' has an invalid definition" : "No such state '" + this.name() + "'"
            }, e.prototype.toString = function() {
                return "'" + this.name() + "'" + E(this.params())
            }, e.prototype.withState = function(n) {
                return new e(this._stateRegistry, n, this._params, this._options)
            }, e.prototype.withParams = function(n, t) {
                void 0 === t && (t = !1);
                var r = t ? n : Object(a.r)({}, this._params, n);
                return new e(this._stateRegistry, this._identifier, r, this._options)
            }, e.prototype.withOptions = function(n, t) {
                void 0 === t && (t = !1);
                var r = t ? n : Object(a.r)({}, this._options, n);
                return new e(this._stateRegistry, this._identifier, this._params, r)
            }, e.isDef = function(e) {
                return e && e.state && (Object(l.l)(e.state) || Object(l.l)(e.state.name))
            }, e
        }(),
        Q = function() {
            function e() {}
            return e.makeTargetState = function(e, n) {
                var t = Object(a.P)(n).state;
                return new G(e, t, n.map(Object(s.n)("paramValues")).reduce(a.D, {}), {})
            }, e.buildPath = function(e) {
                var n = e.params();
                return e.$state().path.map(function(e) {
                    return new W(e).applyRawParams(n)
                })
            }, e.buildToPath = function(n, t) {
                var r = e.buildPath(t);
                return t.options().inherit ? e.inheritParams(n, r, Object.keys(t.params())) : r
            }, e.applyViewConfigs = function(n, t, r) {
                t.filter(function(e) {
                    return Object(a.z)(r, e.state)
                }).forEach(function(r) {
                    var o = Object(a.U)(r.state.views || {}),
                        i = e.subPath(t, function(e) {
                            return e === r
                        }),
                        s = o.map(function(e) {
                            return n.createViewConfig(i, e)
                        });
                    r.views = s.reduce(a.T, [])
                })
            }, e.inheritParams = function(e, n, t) {
                void 0 === t && (t = []);
                var r = e.map(function(e) {
                    return e.paramSchema
                }).reduce(a.T, []).filter(function(e) {
                    return !e.inherit
                }).map(Object(s.n)("id"));
                return n.map(function(n) {
                    var o = Object(a.r)({}, n && n.paramValues),
                        i = Object(a.H)(o, t);
                    o = Object(a.F)(o, t);
                    var l, c, u, d = Object(a.F)((l = e, c = n.state, u = Object(a.t)(l, Object(s.o)("state", c)), Object(a.r)({}, u && u.paramValues) || {}), r),
                        p = Object(a.r)(o, d, i);
                    return new W(n.state).applyRawParams(p)
                })
            }, e.treeChanges = function(n, t, r) {
                for (var a, o, i, s, l, c, u = Math.min(n.length, t.length), d = 0; d < u && n[d].state !== r && (a = n[d], o = t[d], a.equals(o, e.nonDynamicParams));) d++;
                s = (i = n).slice(0, d), l = i.slice(d);
                var p = s.map(function(e, n) {
                    var r = e.clone();
                    return r.paramValues = t[n].paramValues, r
                });
                return c = t.slice(d), {
                    from: i,
                    to: p.concat(c),
                    retained: s,
                    retainedWithToParams: p,
                    exiting: l,
                    entering: c
                }
            }, e.matching = function(e, n, t) {
                var r = !1;
                return Object(a.i)(e, n).reduce(function(e, n) {
                    var a = n[0],
                        o = n[1];
                    return (r = r || !a.equals(o, t)) ? e : e.concat(a)
                }, [])
            }, e.equals = function(n, t, r) {
                return n.length === t.length && e.matching(n, t, r).length === n.length
            }, e.subPath = function(e, n) {
                var t = Object(a.t)(e, n),
                    r = e.indexOf(t);
                return -1 === r ? void 0 : e.slice(0, r + 1)
            }, e.nonDynamicParams = function(e) {
                return e.state.parameters({
                    inherit: !1
                }).filter(function(e) {
                    return !e.dynamic
                })
            }, e.paramValues = function(e) {
                return e.reduce(function(e, n) {
                    return Object(a.r)(e, n.paramValues)
                }, {})
            }, e
        }(),
        K = {
            when: {
                LAZY: "LAZY",
                EAGER: "EAGER"
            },
            async: {
                WAIT: "WAIT",
                NOWAIT: "NOWAIT",
                RXWAIT: "RXWAIT"
            }
        },
        J = {
            when: "LAZY",
            async: "WAIT"
        },
        ee = function() {
            function e(n, t, r, i, s) {
                if (this.resolved = !1, this.promise = void 0, n instanceof e) Object(a.r)(this, n);
                else if (Object(l.d)(t)) {
                    if (Object(l.g)(n)) throw new Error("new Resolvable(): token argument is required");
                    if (!Object(l.d)(t)) throw new Error("new Resolvable(): resolveFn argument must be a function");
                    this.token = n, this.policy = i, this.resolveFn = t, this.deps = r || [], this.data = s, this.resolved = void 0 !== s, this.promise = this.resolved ? o.b.$q.when(this.data) : void 0
                } else if (Object(l.i)(n) && n.token && (n.hasOwnProperty("resolveFn") || n.hasOwnProperty("data"))) {
                    var c = n;
                    return new e(c.token, c.resolveFn, c.deps, c.policy, c.data)
                }
            }
            return e.prototype.getPolicy = function(e) {
                var n = this.policy || {},
                    t = e && e.resolvePolicy || {};
                return {
                    when: n.when || t.when || J.when,
                    async: n.async || t.async || J.async
                }
            }, e.prototype.resolve = function(e, n) {
                var t = this,
                    r = o.b.$q,
                    i = e.findNode(this),
                    s = i && i.state,
                    l = "RXWAIT" === this.getPolicy(s).async ? function(e) {
                        var n = e.cache(1);
                        return n.take(1).toPromise().then(function() {
                            return n
                        })
                    } : a.y;
                return this.promise = r.when().then(function() {
                    return r.all(e.getDependencies(t).map(function(t) {
                        return t.get(e, n)
                    }))
                }).then(function(e) {
                    return t.resolveFn.apply(null, e)
                }).then(l).then(function(e) {
                    return t.data = e, t.resolved = !0, t.resolveFn = null, j.traceResolvableResolved(t, n), t.data
                })
            }, e.prototype.get = function(e, n) {
                return this.promise || this.resolve(e, n)
            }, e.prototype.toString = function() {
                return "Resolvable(token: " + E(this.token) + ", requires: [" + this.deps.map(E) + "])"
            }, e.prototype.clone = function() {
                return new e(this)
            }, e.fromData = function(n, t) {
                return new e(n, function() {
                    return t
                }, null, null, t)
            }, e
        }(),
        ne = K.when,
        te = [ne.EAGER, ne.LAZY],
        re = [ne.EAGER],
        ae = "Native Injector",
        oe = function() {
            function e(e) {
                this._path = e
            }
            return e.prototype.getTokens = function() {
                return this._path.reduce(function(e, n) {
                    return e.concat(n.resolvables.map(function(e) {
                        return e.token
                    }))
                }, []).reduce(a.R, [])
            }, e.prototype.getResolvable = function(e) {
                var n = this._path.map(function(e) {
                    return e.resolvables
                }).reduce(a.T, []).filter(function(n) {
                    return n.token === e
                });
                return Object(a.P)(n)
            }, e.prototype.getPolicy = function(e) {
                var n = this.findNode(e);
                return e.getPolicy(n.state)
            }, e.prototype.subContext = function(n) {
                return new e(Q.subPath(this._path, function(e) {
                    return e.state === n
                }))
            }, e.prototype.addResolvables = function(e, n) {
                var t = Object(a.t)(this._path, Object(s.o)("state", n)),
                    r = e.map(function(e) {
                        return e.token
                    });
                t.resolvables = t.resolvables.filter(function(e) {
                    return -1 === r.indexOf(e.token)
                }).concat(e)
            }, e.prototype.resolvePath = function(e, n) {
                var t = this;
                void 0 === e && (e = "LAZY");
                var r = (Object(a.z)(te, e) ? e : "LAZY") === K.when.EAGER ? re : te;
                j.traceResolvePath(this._path, e, n);
                var i = function(e, n) {
                        return function(r) {
                            return Object(a.z)(e, t.getPolicy(r)[n])
                        }
                    },
                    l = this._path.reduce(function(e, a) {
                        var o = a.resolvables.filter(i(r, "when")),
                            l = o.filter(i(["NOWAIT"], "async")),
                            c = o.filter(Object(s.i)(i(["NOWAIT"], "async"))),
                            u = t.subContext(a.state),
                            d = function(e) {
                                return e.get(u, n).then(function(n) {
                                    return {
                                        token: e.token,
                                        value: n
                                    }
                                })
                            };
                        return l.forEach(d), e.concat(c.map(d))
                    }, []);
                return o.b.$q.all(l)
            }, e.prototype.injector = function() {
                return this._injector || (this._injector = new ie(this))
            }, e.prototype.findNode = function(e) {
                return Object(a.t)(this._path, function(n) {
                    return Object(a.z)(n.resolvables, e)
                })
            }, e.prototype.getDependencies = function(e) {
                var n = this,
                    t = this.findNode(e),
                    r = (Q.subPath(this._path, function(e) {
                        return e === t
                    }) || this._path).reduce(function(e, n) {
                        return e.concat(n.resolvables)
                    }, []).filter(function(n) {
                        return n !== e
                    });
                return e.deps.map(function(e) {
                    var t = r.filter(function(n) {
                        return n.token === e
                    });
                    if (t.length) return Object(a.P)(t);
                    var o = n.injector().getNative(e);
                    if (Object(l.m)(o)) throw new Error("Could not find Dependency Injection token: " + E(e));
                    return new ee(e, function() {
                        return o
                    }, [], o)
                })
            }, e
        }(),
        ie = function() {
            function e(e) {
                this.context = e, this.native = this.get(ae) || o.b.$injector
            }
            return e.prototype.get = function(e) {
                var n = this.context.getResolvable(e);
                if (n) {
                    if ("NOWAIT" === this.context.getPolicy(n).async) return n.get(this.context);
                    if (!n.resolved) throw new Error("Resolvable async .get() not complete:" + E(n.token));
                    return n.data
                }
                return this.getNative(e)
            }, e.prototype.getAsync = function(e) {
                var n = this.context.getResolvable(e);
                return n ? n.get(this.context) : o.b.$q.when(this.native.get(e))
            }, e.prototype.getNative = function(e) {
                return this.native && this.native.get(e)
            }, e
        }();

    function se(e) {
        return e.name
    }

    function le(e) {
        return e.self.$$state = function() {
            return e
        }, e.self
    }

    function ce(e) {
        return e.parent && e.parent.data && (e.data = e.self.data = Object(a.A)(e.parent.data, e.data)), e.data
    }
    var ue = function(e, n) {
            return function(t) {
                var r = t.self;
                r && r.url && r.name && r.name.match(/\.\*\*$/) && (r.url += "{remainder:any}");
                var a = t.parent,
                    o = function(e) {
                        if (!Object(l.l)(e)) return !1;
                        var n = "^" === e.charAt(0);
                        return {
                            val: n ? e.substring(1) : e,
                            root: n
                        }
                    }(r.url),
                    i = o ? e.compile(o.val, {
                        state: r
                    }) : r.url;
                if (!i) return null;
                if (!e.isMatcher(i)) throw new Error("Invalid url '" + i + "' in state '" + t + "'");
                return o && o.root ? i : (a && a.navigable || n()).url.append(i)
            }
        },
        de = function(e) {
            return function(n) {
                return !e(n) && n.url ? n : n.parent ? n.parent.navigable : null
            }
        },
        pe = function(e) {
            return function(n) {
                var t = n.url && n.url.parameters({
                        inherit: !1
                    }) || [],
                    r = Object(a.U)(Object(a.C)(Object(a.F)(n.params || {}, t.map(Object(s.n)("id"))), function(t, r) {
                        return e.fromConfig(r, null, n.self)
                    }));
                return t.concat(r).map(function(e) {
                    return [e.id, e]
                }).reduce(a.h, {})
            }
        };

    function _e(e) {
        return e.parent ? e.parent.path.concat(e) : [e]
    }

    function fe(e) {
        var n = e.parent ? Object(a.r)({}, e.parent.includes) : {};
        return n[e.name] = !0, n
    }

    function he(e) {
        var n, t, r = function(e) {
                return e.provide || e.token
            },
            i = Object(s.l)([
                [Object(s.n)("resolveFn"), function(e) {
                    return new ee(r(e), e.resolveFn, e.deps, e.policy)
                }],
                [Object(s.n)("useFactory"), function(e) {
                    return new ee(r(e), e.useFactory, e.deps || e.dependencies, e.policy)
                }],
                [Object(s.n)("useClass"), function(e) {
                    return new ee(r(e), function() {
                        return new e.useClass
                    }, [], e.policy)
                }],
                [Object(s.n)("useValue"), function(e) {
                    return new ee(r(e), function() {
                        return e.useValue
                    }, [], e.policy, e.useValue)
                }],
                [Object(s.n)("useExisting"), function(e) {
                    return new ee(r(e), a.y, [e.useExisting], e.policy)
                }]
            ]),
            c = Object(s.l)([
                [Object(s.m)(Object(s.n)("val"), l.l), function(e) {
                    return new ee(e.token, a.y, [e.val], e.policy)
                }],
                [Object(s.m)(Object(s.n)("val"), l.a), function(e) {
                    return new ee(e.token, Object(a.P)(e.val), e.val.slice(0, -1), e.policy)
                }],
                [Object(s.m)(Object(s.n)("val"), l.d), function(e) {
                    return new ee(e.token, e.val, (n = e.val, t = o.b.$injector, n.$inject || t && t.annotate(n, t.strictDi) || "deferred"), e.policy);
                    var n, t
                }]
            ]),
            u = Object(s.l)([
                [Object(s.h)(ee), function(e) {
                    return e
                }],
                [function(e) {
                    return !(!e.token || !e.resolveFn)
                }, i],
                [function(e) {
                    return !(!e.provide && !e.token || !(e.useValue || e.useFactory || e.useExisting || e.useClass))
                }, i],
                [function(e) {
                    return !!(e && e.val && (Object(l.l)(e.val) || Object(l.a)(e.val) || Object(l.d)(e.val)))
                }, c],
                [Object(s.p)(!0), function(e) {
                    throw new Error("Invalid resolve value: " + E(e))
                }]
            ]),
            d = e.resolve;
        return (Object(l.a)(d) ? d : (n = d, t = e.resolvePolicy || {}, Object.keys(n || {}).map(function(e) {
            return {
                token: e,
                val: n[e],
                deps: void 0,
                policy: t[e]
            }
        }))).map(u)
    }
    var me, ge, ve = function() {
            function e(e, n) {
                this.matcher = e;
                var t = this,
                    r = function() {
                        return e.find("")
                    },
                    a = function(e) {
                        return "" === e.name
                    };
                this.builders = {
                    name: [se],
                    self: [le],
                    parent: [function(n) {
                        return a(n) ? null : e.find(t.parentName(n)) || r()
                    }],
                    data: [ce],
                    url: [ue(n, r)],
                    navigable: [de(a)],
                    params: [pe(n.paramFactory)],
                    views: [],
                    path: [_e],
                    includes: [fe],
                    resolvables: [he]
                }
            }
            return e.prototype.builder = function(e, n) {
                var t = this.builders,
                    r = t[e] || [];
                return Object(l.l)(e) && !Object(l.c)(n) ? r.length > 1 ? r : r[0] : Object(l.l)(e) && Object(l.d)(n) ? (t[e] = r, t[e].push(n), function() {
                    return t[e].splice(t[e].indexOf(n, 1)) && null
                }) : void 0
            }, e.prototype.build = function(e) {
                var n = this.matcher,
                    t = this.builders,
                    r = this.parentName(e);
                if (r && !n.find(r, void 0, !1)) return null;
                for (var o in t)
                    if (t.hasOwnProperty(o)) {
                        var i = t[o].reduce(function(e, n) {
                            return function(t) {
                                return n(t, e)
                            }
                        }, a.E);
                        e[o] = i(e)
                    } return e
            }, e.prototype.parentName = function(e) {
                var n = e.name || "",
                    t = n.split(".");
                if ("**" === t.pop() && t.pop(), t.length) {
                    if (e.parent) throw new Error("States that specify the 'parent:' property should not have a '.' in their name (" + n + ")");
                    return t.join(".")
                }
                return e.parent ? Object(l.l)(e.parent) ? e.parent : e.parent.name : ""
            }, e.prototype.name = function(e) {
                var n = e.name;
                if (-1 !== n.indexOf(".") || !e.parent) return n;
                var t = Object(l.l)(e.parent) ? e.parent : e.parent.name;
                return t ? t + "." + n : n
            }, e
        }(),
        Ee = function() {
            function e(n) {
                return e.create(n || {})
            }
            return e.create = function(n) {
                n = e.isStateClass(n) ? new n : n;
                var t = Object(a.A)(Object(a.A)(n, e.prototype));
                return n.$$state = function() {
                    return t
                }, t.self = n, t.__stateObjectCache = {
                    nameGlob: i.fromString(t.name)
                }, t
            }, e.prototype.is = function(e) {
                return this === e || this.self === e || this.fqn() === e
            }, e.prototype.fqn = function() {
                if (!(this.parent && this.parent instanceof this.constructor)) return this.name;
                var e = this.parent.fqn();
                return e ? e + "." + this.name : this.name
            }, e.prototype.root = function() {
                return this.parent && this.parent.root() || this
            }, e.prototype.parameters = function(e) {
                return ((e = Object(a.o)(e, {
                    inherit: !0,
                    matchingKeys: null
                })).inherit && this.parent && this.parent.parameters() || []).concat(Object(a.U)(this.params)).filter(function(n) {
                    return !e.matchingKeys || e.matchingKeys.hasOwnProperty(n.id)
                })
            }, e.prototype.parameter = function(e, n) {
                return void 0 === n && (n = {}), this.url && this.url.parameter(e, n) || Object(a.t)(Object(a.U)(this.params), Object(s.o)("id", e)) || n.inherit && this.parent && this.parent.parameter(e)
            }, e.prototype.toString = function() {
                return this.fqn()
            }, e.isStateClass = function(e) {
                return Object(l.d)(e) && !0 === e.__uiRouterState
            }, e.isState = function(e) {
                return Object(l.i)(e.__stateObjectCache)
            }, e
        }(),
        Te = function() {
            function e(e) {
                this._states = e
            }
            return e.prototype.isRelative = function(e) {
                return 0 === (e = e || "").indexOf(".") || 0 === e.indexOf("^")
            }, e.prototype.find = function(e, n, t) {
                if (void 0 === t && (t = !0), e || "" === e) {
                    var r = Object(l.l)(e),
                        o = r ? e : e.name;
                    this.isRelative(o) && (o = this.resolvePath(o, n));
                    var i = this._states[o];
                    if (i && (r || !(r || i !== e && i.self !== e))) return i;
                    if (r && t) {
                        var s = Object(a.U)(this._states).filter(function(e) {
                            return e.__stateObjectCache.nameGlob && e.__stateObjectCache.nameGlob.matches(o)
                        });
                        return s.length > 1 && console.log("stateMatcher.find: Found multiple matches for " + o + " using glob: ", s.map(function(e) {
                            return e.name
                        })), s[0]
                    }
                }
            }, e.prototype.resolvePath = function(e, n) {
                if (!n) throw new Error("No reference point given for path '" + e + "'");
                for (var t = this.find(n), r = e.split("."), a = r.length, o = 0, i = t; o < a; o++)
                    if ("" !== r[o] || 0 !== o) {
                        if ("^" !== r[o]) break;
                        if (!i.parent) throw new Error("Path '" + e + "' not valid for state '" + t.name + "'");
                        i = i.parent
                    } else i = t;
                var s = r.slice(o).join(".");
                return i.name + (i.name && s ? "." : "") + s
            }, e
        }(),
        Re = function() {
            function e(e, n, t, r, a) {
                this.$registry = e, this.$urlRouter = n, this.states = t, this.builder = r, this.listeners = a, this.queue = [], this.matcher = e.matcher
            }
            return e.prototype.dispose = function() {
                this.queue = []
            }, e.prototype.register = function(e) {
                var n = this.queue,
                    t = Ee.create(e),
                    r = t.name;
                if (!Object(l.l)(r)) throw new Error("State must have a valid name");
                if (this.states.hasOwnProperty(r) || Object(a.z)(n.map(Object(s.n)("name")), r)) throw new Error("State '" + r + "' is already defined");
                return n.push(t), this.flush(), t
            }, e.prototype.flush = function() {
                for (var e = this, n = this.queue, t = this.states, r = this.builder, a = [], o = [], i = {}, s = function(n) {
                        return e.states.hasOwnProperty(n) && e.states[n]
                    }, l = function() {
                        a.length && e.listeners.forEach(function(e) {
                            return e("registered", a.map(function(e) {
                                return e.self
                            }))
                        })
                    }; n.length > 0;) {
                    var c = n.shift(),
                        u = c.name,
                        d = r.build(c),
                        p = o.indexOf(c);
                    if (d) {
                        var _ = s(u);
                        if (_ && _.name === u) throw new Error("State '" + u + "' is already defined");
                        var f = s(u + ".**");
                        f && this.$registry.deregister(f), t[u] = c, this.attachRoute(c), p >= 0 && o.splice(p, 1), a.push(c)
                    } else {
                        var h = i[u];
                        if (i[u] = n.length, p >= 0 && h === n.length) return n.push(c), l(), t;
                        p < 0 && o.push(c), n.push(c)
                    }
                }
                return l(), t
            }, e.prototype.attachRoute = function(e) {
                !e.abstract && e.url && this.$urlRouter.rule(this.$urlRouter.urlRuleFactory.create(e))
            }, e
        }(),
        be = function() {
            function e(e) {
                this._router = e, this.states = {}, this.listeners = [], this.matcher = new Te(this.states), this.builder = new ve(this.matcher, e.urlMatcherFactory), this.stateQueue = new Re(this, e.urlRouter, this.states, this.builder, this.listeners), this._registerRoot()
            }
            return e.prototype._registerRoot = function() {
                (this._root = this.stateQueue.register({
                    name: "",
                    url: "^",
                    views: null,
                    params: {
                        "#": {
                            value: null,
                            type: "hash",
                            dynamic: !0
                        }
                    },
                    abstract: !0
                })).navigable = null
            }, e.prototype.dispose = function() {
                var e = this;
                this.stateQueue.dispose(), this.listeners = [], this.get().forEach(function(n) {
                    return e.get(n) && e.deregister(n)
                })
            }, e.prototype.onStatesChanged = function(e) {
                return this.listeners.push(e),
                    function() {
                        Object(a.L)(this.listeners)(e)
                    }.bind(this)
            }, e.prototype.root = function() {
                return this._root
            }, e.prototype.register = function(e) {
                return this.stateQueue.register(e)
            }, e.prototype._deregisterTree = function(e) {
                var n = this,
                    t = this.get().map(function(e) {
                        return e.$$state()
                    }),
                    r = function(e) {
                        var n = t.filter(function(n) {
                            return -1 !== e.indexOf(n.parent)
                        });
                        return 0 === n.length ? n : n.concat(r(n))
                    },
                    a = r([e]),
                    o = [e].concat(a).reverse();
                return o.forEach(function(e) {
                    var t = n._router.urlRouter;
                    t.rules().filter(Object(s.o)("state", e)).forEach(t.removeRule.bind(t)), delete n.states[e.name]
                }), o
            }, e.prototype.deregister = function(e) {
                var n = this.get(e);
                if (!n) throw new Error("Can't deregister state; not found: " + e);
                var t = this._deregisterTree(n.$$state());
                return this.listeners.forEach(function(e) {
                    return e("deregistered", t.map(function(e) {
                        return e.self
                    }))
                }), t
            }, e.prototype.get = function(e, n) {
                var t = this;
                if (0 === arguments.length) return Object.keys(this.states).map(function(e) {
                    return t.states[e].self
                });
                var r = this.matcher.find(e, n);
                return r && r.self || null
            }, e.prototype.decorator = function(e, n) {
                return this.builder.builder(e, n)
            }, e
        }();
    ! function(e) {
        e[e.CREATE = 0] = "CREATE", e[e.BEFORE = 1] = "BEFORE", e[e.RUN = 2] = "RUN", e[e.SUCCESS = 3] = "SUCCESS", e[e.ERROR = 4] = "ERROR"
    }(me || (me = {})),
    function(e) {
        e[e.TRANSITION = 0] = "TRANSITION", e[e.STATE = 1] = "STATE"
    }(ge || (ge = {}));
    var Pe = {
            current: a.E,
            transition: null,
            traceData: {},
            bind: null
        },
        Ae = function() {
            function e(e, n, t, r) {
                var o = this;
                this.transition = e, this.stateContext = n, this.registeredHook = t, this.options = r, this.isSuperseded = function() {
                    return o.type.hookPhase === me.RUN && !o.options.transition.isActive()
                }, this.options = Object(a.o)(r, Pe), this.type = t.eventType
            }
            return e.chain = function(e, n) {
                return e.reduce(function(e, n) {
                    return e.then(function() {
                        return n.invokeHook()
                    })
                }, n || o.b.$q.when())
            }, e.invokeHooks = function(n, t) {
                for (var r = 0; r < n.length; r++) {
                    var a = n[r].invokeHook();
                    if (Object(l.j)(a)) {
                        var o = n.slice(r + 1);
                        return e.chain(o, a).then(t)
                    }
                }
                return t()
            }, e.runAllHooks = function(e) {
                e.forEach(function(e) {
                    return e.invokeHook()
                })
            }, e.prototype.logError = function(e) {
                this.transition.router.stateService.defaultErrorHandler()(e)
            }, e.prototype.invokeHook = function() {
                var e = this,
                    n = this.registeredHook;
                if (!n._deregistered) {
                    var t = this.getNotCurrentRejection();
                    if (t) return t;
                    var r = this.options;
                    j.traceHookInvocation(this, this.transition, r);
                    var a = function(t) {
                            return n.eventType.getErrorHandler(e)(t)
                        },
                        o = function(t) {
                            return n.eventType.getResultHandler(e)(t)
                        };
                    try {
                        var i = n.callback.call(r.bind, e.transition, e.stateContext);
                        return !this.type.synchronous && Object(l.j)(i) ? i.catch(function(e) {
                            return d.normalize(e).toPromise()
                        }).then(o, a) : o(i)
                    } catch (e) {
                        return a(d.normalize(e))
                    } finally {
                        n.invokeLimit && ++n.invokeCount >= n.invokeLimit && n.deregister()
                    }
                }
            }, e.prototype.handleHookResult = function(e) {
                var n = this,
                    t = this.getNotCurrentRejection();
                return t || (Object(l.j)(e) ? e.then(function(e) {
                    return n.handleHookResult(e)
                }) : (j.traceHookResult(e, this.transition, this.options), !1 === e ? d.aborted("Hook aborted transition").toPromise() : Object(s.h)(G)(e) ? d.redirected(e).toPromise() : void 0))
            }, e.prototype.getNotCurrentRejection = function() {
                var e = this.transition.router;
                return e._disposed ? d.aborted("UIRouter instance #" + e.$id + " has been stopped (disposed)").toPromise() : this.transition._aborted ? d.aborted().toPromise() : this.isSuperseded() ? d.superseded(this.options.current()).toPromise() : void 0
            }, e.prototype.toString = function() {
                var e = this.options,
                    n = this.registeredHook;
                return (Object(s.k)("traceData.hookType")(e) || "internal") + " context: " + (Object(s.k)("traceData.context.state.name")(e) || Object(s.k)("traceData.context")(e) || "unknown") + ", " + p(200, m(n.callback))
            }, e.HANDLE_RESULT = function(e) {
                return function(n) {
                    return e.handleHookResult(n)
                }
            }, e.LOG_REJECTED_RESULT = function(e) {
                return function(n) {
                    Object(l.j)(n) && n.catch(function(n) {
                        return e.logError(d.normalize(n))
                    })
                }
            }, e.LOG_ERROR = function(e) {
                return function(n) {
                    return e.logError(n)
                }
            }, e.REJECT_ERROR = function(e) {
                return function(e) {
                    return Object(a.O)(e)
                }
            }, e.THROW_ERROR = function(e) {
                return function(e) {
                    throw e
                }
            }, e
        }();

    function Se(e, n) {
        var t = Object(l.l)(n) ? [n] : n;
        return !!(Object(l.d)(t) ? t : function(e) {
            for (var n = t, r = 0; r < n.length; r++) {
                var a = new i(n[r]);
                if (a && a.matches(e.name) || !a && n[r] === e.name) return !0
            }
            return !1
        })(e)
    }
    var Ne = function() {
        function e(e, n, t, r, a, o) {
            void 0 === o && (o = {}), this.tranSvc = e, this.eventType = n, this.callback = t, this.matchCriteria = r, this.removeHookFromRegistry = a, this.invokeCount = 0, this._deregistered = !1, this.priority = o.priority || 0, this.bind = o.bind || null, this.invokeLimit = o.invokeLimit
        }
        return e.prototype._matchingNodes = function(e, n) {
            if (!0 === n) return e;
            var t = e.filter(function(e) {
                return Se(e.state, n)
            });
            return t.length ? t : null
        }, e.prototype._getDefaultMatchCriteria = function() {
            return Object(a.C)(this.tranSvc._pluginapi._getPathTypes(), function() {
                return !0
            })
        }, e.prototype._getMatchingNodes = function(e) {
            var n = this,
                t = Object(a.r)(this._getDefaultMatchCriteria(), this.matchCriteria);
            return Object(a.U)(this.tranSvc._pluginapi._getPathTypes()).reduce(function(r, o) {
                var i = o.scope === ge.STATE,
                    s = e[o.name] || [],
                    l = i ? s : [Object(a.P)(s)];
                return r[o.name] = n._matchingNodes(l, t[o.name]), r
            }, {})
        }, e.prototype.matches = function(e) {
            var n = this._getMatchingNodes(e);
            return Object(a.U)(n).every(a.y) ? n : null
        }, e.prototype.deregister = function() {
            this.removeHookFromRegistry(this), this._deregistered = !0
        }, e
    }();

    function De(e, n, t) {
        var r = (e._registeredHooks = e._registeredHooks || {})[t.name] = [],
            o = Object(a.L)(r);

        function i(e, a, i) {
            void 0 === i && (i = {});
            var s = new Ne(n, t, a, e, o, i);
            return r.push(s), s.deregister.bind(s)
        }
        return e[t.name] = i, i
    }
    var Ie = function() {
        function e(e) {
            this.transition = e
        }
        return e.prototype.buildHooksForPhase = function(e) {
            var n = this;
            return this.transition.router.transitionService._pluginapi._getEvents(e).map(function(e) {
                return n.buildHooks(e)
            }).reduce(a.T, []).filter(a.y)
        }, e.prototype.buildHooks = function(e) {
            var n = this.transition,
                t = n.treeChanges(),
                r = this.getMatchingHooks(e, t);
            if (!r) return [];
            var o = {
                transition: n,
                current: n.options().current
            };
            return r.map(function(r) {
                return r.matches(t)[e.criteriaMatchPath.name].map(function(t) {
                    var i = Object(a.r)({
                            bind: r.bind,
                            traceData: {
                                hookType: e.name,
                                context: t
                            }
                        }, o),
                        s = e.criteriaMatchPath.scope === ge.STATE ? t.state.self : null,
                        l = new Ae(n, s, r, i);
                    return {
                        hook: r,
                        node: t,
                        transitionHook: l
                    }
                })
            }).reduce(a.T, []).sort(function(e) {
                void 0 === e && (e = !1);
                return function(n, t) {
                    var r = e ? -1 : 1,
                        a = (n.node.state.path.length - t.node.state.path.length) * r;
                    return 0 !== a ? a : t.hook.priority - n.hook.priority
                }
            }(e.reverseSort)).map(function(e) {
                return e.transitionHook
            })
        }, e.prototype.getMatchingHooks = function(e, n) {
            var t = e.hookPhase === me.CREATE,
                r = this.transition.router.transitionService;
            return (t ? [r] : [this.transition, r]).map(function(n) {
                return n.getHooks(e.name)
            }).filter(Object(a.l)(l.a, "broken event named: " + e.name)).reduce(a.T, []).filter(function(e) {
                return e.matches(n)
            })
        }, e
    }();
    var Oe = Object(s.n)("self"),
        ye = function() {
            function e(e, n, t) {
                var r = this;
                if (this._deferred = o.b.$q.defer(), this.promise = this._deferred.promise, this._registeredHooks = {}, this._hookBuilder = new Ie(this), this.isActive = function() {
                        return r.router.globals.transition === r
                    }, this.router = t, this._targetState = n, !n.valid()) throw new Error(n.error());
                this._options = Object(a.r)({
                    current: Object(s.p)(this)
                }, n.options()), this.$id = t.transitionService._transitionCount++;
                var i = Q.buildToPath(e, n);
                this._treeChanges = Q.treeChanges(e, i, this._options.reloadState), this.createTransitionHookRegFns();
                var l = this._hookBuilder.buildHooksForPhase(me.CREATE);
                Ae.invokeHooks(l, function() {
                    return null
                }), this.applyViewConfigs(t)
            }
            return e.prototype.onBefore = function(e, n, t) {}, e.prototype.onStart = function(e, n, t) {}, e.prototype.onExit = function(e, n, t) {}, e.prototype.onRetain = function(e, n, t) {}, e.prototype.onEnter = function(e, n, t) {}, e.prototype.onFinish = function(e, n, t) {}, e.prototype.onSuccess = function(e, n, t) {}, e.prototype.onError = function(e, n, t) {}, e.prototype.createTransitionHookRegFns = function() {
                var e = this;
                this.router.transitionService._pluginapi._getEvents().filter(function(e) {
                    return e.hookPhase !== me.CREATE
                }).forEach(function(n) {
                    return De(e, e.router.transitionService, n)
                })
            }, e.prototype.getHooks = function(e) {
                return this._registeredHooks[e]
            }, e.prototype.applyViewConfigs = function(e) {
                var n = this._treeChanges.entering.map(function(e) {
                    return e.state
                });
                Q.applyViewConfigs(e.transitionService.$view, this._treeChanges.to, n)
            }, e.prototype.$from = function() {
                return Object(a.P)(this._treeChanges.from).state
            }, e.prototype.$to = function() {
                return Object(a.P)(this._treeChanges.to).state
            }, e.prototype.from = function() {
                return this.$from().self
            }, e.prototype.to = function() {
                return this.$to().self
            }, e.prototype.targetState = function() {
                return this._targetState
            }, e.prototype.is = function(n) {
                return n instanceof e ? this.is({
                    to: n.$to().name,
                    from: n.$from().name
                }) : !(n.to && !Se(this.$to(), n.to) || n.from && !Se(this.$from(), n.from))
            }, e.prototype.params = function(e) {
                return void 0 === e && (e = "to"), Object.freeze(this._treeChanges[e].map(Object(s.n)("paramValues")).reduce(a.D, {}))
            }, e.prototype.paramsChanged = function() {
                var e = this.params("from"),
                    n = this.params("to"),
                    t = [].concat(this._treeChanges.to).concat(this._treeChanges.from).map(function(e) {
                        return e.paramSchema
                    }).reduce(a.v, []).reduce(a.R, []);
                return B.changed(t, e, n).reduce(function(e, t) {
                    return e[t.id] = n[t.id], e
                }, {})
            }, e.prototype.injector = function(e, n) {
                void 0 === n && (n = "to");
                var t = this._treeChanges[n];
                return e && (t = Q.subPath(t, function(n) {
                    return n.state === e || n.state.name === e
                })), new oe(t).injector()
            }, e.prototype.getResolveTokens = function(e) {
                return void 0 === e && (e = "to"), new oe(this._treeChanges[e]).getTokens()
            }, e.prototype.addResolvable = function(e, n) {
                void 0 === n && (n = ""), e = Object(s.h)(ee)(e) ? e : new ee(e);
                var t = "string" == typeof n ? n : n.name,
                    r = this._treeChanges.to,
                    o = Object(a.t)(r, function(e) {
                        return e.state.name === t
                    });
                new oe(r).addResolvables([e], o.state)
            }, e.prototype.redirectedFrom = function() {
                return this._options.redirectedFrom || null
            }, e.prototype.originalTransition = function() {
                var e = this.redirectedFrom();
                return e && e.originalTransition() || this
            }, e.prototype.options = function() {
                return this._options
            }, e.prototype.entering = function() {
                return Object(a.B)(this._treeChanges.entering, Object(s.n)("state")).map(Oe)
            }, e.prototype.exiting = function() {
                return Object(a.B)(this._treeChanges.exiting, Object(s.n)("state")).map(Oe).reverse()
            }, e.prototype.retained = function() {
                return Object(a.B)(this._treeChanges.retained, Object(s.n)("state")).map(Oe)
            }, e.prototype.views = function(e, n) {
                void 0 === e && (e = "entering");
                var t = this._treeChanges[e];
                return (t = n ? t.filter(Object(s.o)("state", n)) : t).map(Object(s.n)("views")).filter(a.y).reduce(a.T, [])
            }, e.prototype.treeChanges = function(e) {
                return e ? this._treeChanges[e] : this._treeChanges
            }, e.prototype.redirect = function(e) {
                for (var n = 1, t = this; null != (t = t.redirectedFrom());)
                    if (++n > 20) throw new Error("Too many consecutive Transition redirects (20+)");
                var r = {
                    redirectedFrom: this,
                    source: "redirect"
                };
                "url" === this.options().source && !1 !== e.options().location && (r.location = "replace");
                var o = Object(a.r)({}, this.options(), e.options(), r);
                e = e.withOptions(o, !0);
                var i, l = this.router.transitionService.create(this._treeChanges.from, e),
                    c = this._treeChanges.entering,
                    u = l._treeChanges.entering;
                return Q.matching(u, c, Q.nonDynamicParams).filter(Object(s.i)((i = e.options().reloadState, function(e) {
                    return i && e.state.includes[i.name]
                }))).forEach(function(e, n) {
                    e.resolvables = c[n].resolvables
                }), l
            }, e.prototype._changedParams = function() {
                var e = this._treeChanges;
                if (!this._options.reload && (!e.exiting.length && !e.entering.length && e.to.length === e.from.length && !Object(a.i)(e.to, e.from).map(function(e) {
                        return e[0].state !== e[1].state
                    }).reduce(a.g, !1))) {
                    var n = e.to.map(function(e) {
                            return e.paramSchema
                        }),
                        t = [e.to, e.from].map(function(e) {
                            return e.map(function(e) {
                                return e.paramValues
                            })
                        }),
                        r = t[0],
                        o = t[1];
                    return Object(a.i)(n, r, o).map(function(e) {
                        var n = e[0],
                            t = e[1],
                            r = e[2];
                        return B.changed(n, t, r)
                    }).reduce(a.T, [])
                }
            }, e.prototype.dynamic = function() {
                var e = this._changedParams();
                return !!e && e.map(function(e) {
                    return e.dynamic
                }).reduce(a.g, !1)
            }, e.prototype.ignored = function() {
                return !!this._ignoredReason()
            }, e.prototype._ignoredReason = function() {
                var e = this.router.globals.transition,
                    n = this._options.reloadState,
                    t = function(e, t) {
                        if (e.length !== t.length) return !1;
                        var r = Q.matching(e, t);
                        return e.length === r.filter(function(e) {
                            return !n || !e.state.includes[n.name]
                        }).length
                    },
                    r = this.treeChanges(),
                    a = e && e.treeChanges();
                return a && t(a.to, r.to) && t(a.exiting, r.exiting) ? "SameAsPending" : 0 === r.exiting.length && 0 === r.entering.length && t(r.from, r.to) ? "SameAsCurrent" : void 0
            }, e.prototype.run = function() {
                var e = this,
                    n = Ae.runAllHooks,
                    t = function(n) {
                        return e._hookBuilder.buildHooksForPhase(n)
                    },
                    r = t(me.BEFORE);
                return Ae.invokeHooks(r, function() {
                    var n = e.router.globals;
                    return n.lastStartedTransitionId = e.$id, n.transition = e, n.transitionHistory.enqueue(e), j.traceTransitionStart(e), o.b.$q.when(void 0)
                }).then(function() {
                    var e = t(me.RUN);
                    return Ae.invokeHooks(e, function() {
                        return o.b.$q.when(void 0)
                    })
                }).then(function() {
                    j.traceSuccess(e.$to(), e), e.success = !0, e._deferred.resolve(e.to()), n(t(me.SUCCESS))
                }, function(r) {
                    j.traceError(r, e), e.success = !1, e._deferred.reject(r), e._error = r, n(t(me.ERROR))
                }), this.promise
            }, e.prototype.valid = function() {
                return !this.error() || void 0 !== this.success
            }, e.prototype.abort = function() {
                Object(l.m)(this.success) && (this._aborted = !0)
            }, e.prototype.error = function() {
                var e = this.$to();
                if (e.self.abstract) return d.invalid("Cannot transition to abstract state '" + e.name + "'");
                var n = e.parameters(),
                    t = this.params(),
                    r = n.filter(function(e) {
                        return !e.validates(t[e.id])
                    });
                if (r.length) {
                    var a = r.map(function(e) {
                            return "[" + e.id + ":" + E(t[e.id]) + "]"
                        }).join(", "),
                        o = "The following parameter values are not valid for state '" + e.name + "': " + a;
                    return d.invalid(o)
                }
                return !1 === this.success ? this._error : void 0
            }, e.prototype.toString = function() {
                var e = this.from(),
                    n = this.to(),
                    t = function(e) {
                        return null !== e["#"] && void 0 !== e["#"] ? e : Object(a.F)(e, ["#"])
                    };
                return "Transition#" + this.$id + "( '" + (Object(l.i)(e) ? e.name : e) + "'" + E(t(this._treeChanges.from.map(Object(s.n)("paramValues")).reduce(a.D, {}))) + " -> " + (this.valid() ? "" : "(X) ") + "'" + (Object(l.i)(n) ? n.name : n) + "'" + E(t(this.params())) + " )"
            }, e.diToken = e, e
        }();

    function Ce(e, n) {
        var t = ["", ""],
            r = e.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
        if (!n) return r;
        switch (n.squash) {
            case !1:
                t = ["(", ")" + (n.isOptional ? "?" : "")];
                break;
            case !0:
                r = r.replace(/\/$/, ""), t = ["(?:/(", ")|/)?"];
                break;
            default:
                t = ["(" + n.squash + "|", ")?"]
        }
        return r + t[0] + n.type.pattern.source + t[1]
    }
    var xe = D("/"),
        Le = {
            state: {
                params: {}
            },
            strict: !0,
            caseInsensitive: !0
        },
        we = function() {
            function e(n, t, r, o) {
                var i = this;
                this._cache = {
                    path: [this]
                }, this._children = [], this._params = [], this._segments = [], this._compiled = [], this.config = o = Object(a.o)(o, Le), this.pattern = n;
                for (var l, c, u, d = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, p = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, _ = [], f = 0, h = function(t) {
                        if (!e.nameValidator.test(t)) throw new Error("Invalid parameter name '" + t + "' in pattern '" + n + "'");
                        if (Object(a.t)(i._params, Object(s.o)("id", t))) throw new Error("Duplicate parameter name '" + t + "' in pattern '" + n + "'")
                    }, m = function(e, r) {
                        var o, s = e[2] || e[3],
                            l = r ? e[4] : e[4] || ("*" === e[1] ? "[\\s\\S]*" : null);
                        return {
                            id: s,
                            regexp: l,
                            segment: n.substring(f, e.index),
                            type: l ? t.type(l) || (o = l, Object(a.A)(t.type(r ? "query" : "path"), {
                                pattern: new RegExp(o, i.config.caseInsensitive ? "i" : void 0)
                            })) : null
                        }
                    };
                    (l = d.exec(n)) && !((c = m(l, !1)).segment.indexOf("?") >= 0);) h(c.id), this._params.push(r.fromPath(c.id, c.type, o.state)), this._segments.push(c.segment), _.push([c.segment, Object(a.P)(this._params)]), f = d.lastIndex;
                var g = (u = n.substring(f)).indexOf("?");
                if (g >= 0) {
                    var v = u.substring(g);
                    if (u = u.substring(0, g), v.length > 0)
                        for (f = 0; l = p.exec(v);) h((c = m(l, !0)).id), this._params.push(r.fromSearch(c.id, c.type, o.state)), f = d.lastIndex
                }
                this._segments.push(u), this._compiled = _.map(function(e) {
                    return Ce.apply(null, e)
                }).concat(Ce(u))
            }
            return e.encodeDashes = function(e) {
                return encodeURIComponent(e).replace(/-/g, function(e) {
                    return "%5C%" + e.charCodeAt(0).toString(16).toUpperCase()
                })
            }, e.pathSegmentsAndParams = function(e) {
                var n = e._segments,
                    t = e._params.filter(function(e) {
                        return e.location === F.PATH
                    });
                return Object(a.i)(n, t.concat(void 0)).reduce(a.T, []).filter(function(e) {
                    return "" !== e && Object(l.c)(e)
                })
            }, e.queryParams = function(e) {
                return e._params.filter(function(e) {
                    return e.location === F.SEARCH
                })
            }, e.compare = function(n, t) {
                var r = function(n) {
                        return n._cache.weights = n._cache.weights || function(n) {
                            return n._cache.segments = n._cache.segments || n._cache.path.map(e.pathSegmentsAndParams).reduce(a.T, []).reduce(I, []).map(function(e) {
                                return Object(l.l)(e) ? xe(e) : e
                            }).reduce(a.T, [])
                        }(n).map(function(e) {
                            return "/" === e ? 1 : Object(l.l)(e) ? 2 : e instanceof B ? 3 : void 0
                        })
                    },
                    o = r(n),
                    i = r(t);
                ! function(e, n, t) {
                    for (var r = Math.max(e.length, n.length); e.length < r;) e.push(t);
                    for (; n.length < r;) n.push(t)
                }(o, i, 0);
                var s, c, u = Object(a.i)(o, i);
                for (c = 0; c < u.length; c++)
                    if (0 !== (s = u[c][0] - u[c][1])) return s;
                return 0
            }, e.prototype.append = function(e) {
                return this._children.push(e), e._cache = {
                    path: this._cache.path.concat(e),
                    parent: this,
                    pattern: null
                }, e
            }, e.prototype.isRoot = function() {
                return this._cache.path[0] === this
            }, e.prototype.toString = function() {
                return this.pattern
            }, e.prototype.exec = function(e, n, t, r) {
                var o = this;
                void 0 === n && (n = {}), void 0 === r && (r = {});
                var i, c, u, d = (i = this._cache, c = "pattern", u = function() {
                    return new RegExp(["^", Object(a.S)(o._cache.path.map(Object(s.n)("_compiled"))).join(""), !1 === o.config.strict ? "/?" : "", "$"].join(""), o.config.caseInsensitive ? "i" : void 0)
                }, i[c] = i[c] || u()).exec(e);
                if (!d) return null;
                var p, _, f, h = this.parameters(),
                    m = h.filter(function(e) {
                        return !e.isSearch()
                    }),
                    g = h.filter(function(e) {
                        return e.isSearch()
                    }),
                    v = this._cache.path.map(function(e) {
                        return e._segments.length - 1
                    }).reduce(function(e, n) {
                        return e + n
                    }),
                    E = {};
                if (v !== d.length - 1) throw new Error("Unbalanced capture group in route '" + this.pattern + "'");
                for (var T = 0; T < v; T++) {
                    for (var R = m[T], b = d[T + 1], P = 0; P < R.replace.length; P++) R.replace[P].from === b && (b = R.replace[P].to);
                    b && !0 === R.array && (p = void 0, _ = void 0, f = void 0, _ = (p = function(e) {
                        return e.split("").reverse().join("")
                    })(b).split(/-(?!\\)/), f = Object(a.B)(_, p), b = Object(a.B)(f, function(e) {
                        return e.replace(/\\-/g, "-")
                    }).reverse()), Object(l.c)(b) && (b = R.type.decode(b)), E[R.id] = R.value(b)
                }
                return g.forEach(function(e) {
                    for (var t = n[e.id], r = 0; r < e.replace.length; r++) e.replace[r].from === t && (t = e.replace[r].to);
                    Object(l.c)(t) && (t = e.type.decode(t)), E[e.id] = e.value(t)
                }), t && (E["#"] = t), E
            }, e.prototype.parameters = function(e) {
                return void 0 === e && (e = {}), !1 === e.inherit ? this._params : Object(a.S)(this._cache.path.map(function(e) {
                    return e._params
                }))
            }, e.prototype.parameter = function(e, n) {
                var t = this;
                void 0 === n && (n = {});
                var r = this._cache.parent;
                return function() {
                    for (var n = 0, r = t._params; n < r.length; n++) {
                        var a = r[n];
                        if (a.id === e) return a
                    }
                }() || !1 !== n.inherit && r && r.parameter(e, n) || null
            }, e.prototype.validates = function(e) {
                return e = e || {}, this.parameters().filter(function(n) {
                    return e.hasOwnProperty(n.id)
                }).map(function(n) {
                    return t = n, r = e[n.id], !t || t.validates(r);
                    var t, r
                }).reduce(a.e, !0)
            }, e.prototype.format = function(n) {
                void 0 === n && (n = {});
                var t = this._cache.path,
                    r = t.map(e.pathSegmentsAndParams).reduce(a.T, []).map(function(e) {
                        return Object(l.l)(e) ? e : i(e)
                    }),
                    o = t.map(e.queryParams).reduce(a.T, []).map(i);
                if (r.concat(o).filter(function(e) {
                        return !1 === e.isValid
                    }).length) return null;

                function i(e) {
                    var t = e.value(n[e.id]),
                        r = e.validates(t),
                        a = e.isDefaultValue(t),
                        o = !!a && e.squash,
                        i = e.type.encode(t);
                    return {
                        param: e,
                        value: t,
                        isValid: r,
                        isDefaultValue: a,
                        squash: o,
                        encoded: i
                    }
                }
                var s = r.reduce(function(n, t) {
                        if (Object(l.l)(t)) return n + t;
                        var r = t.squash,
                            o = t.encoded,
                            i = t.param;
                        return !0 === r ? n.match(/\/$/) ? n.slice(0, -1) : n : Object(l.l)(r) ? n + r : !1 !== r ? n : null == o ? n : Object(l.a)(o) ? n + Object(a.B)(o, e.encodeDashes).join("-") : i.raw ? n + o : n + encodeURIComponent(o)
                    }, ""),
                    c = o.map(function(e) {
                        var n = e.param,
                            t = e.squash,
                            r = e.encoded,
                            o = e.isDefaultValue;
                        if (!(null == r || o && !1 !== t) && (Object(l.a)(r) || (r = [r]), 0 !== r.length)) return n.raw || (r = Object(a.B)(r, encodeURIComponent)), r.map(function(e) {
                            return n.id + "=" + e
                        })
                    }).filter(a.y).reduce(a.T, []).join("&");
                return s + (c ? "?" + c : "") + (n["#"] ? "#" + n["#"] : "")
            }, e.nameValidator = /^\w+([-.]+\w+)*(?:\[\])?$/, e
        }(),
        He = Object.assign || function(e) {
            for (var n, t = 1, r = arguments.length; t < r; t++)
                for (var a in n = arguments[t]) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
            return e
        },
        Me = function() {
            function e(e) {
                this.umf = e
            }
            return e.prototype.fromConfig = function(e, n, t) {
                return new B(e, n, F.CONFIG, this.umf, t)
            }, e.prototype.fromPath = function(e, n, t) {
                return new B(e, n, F.PATH, this.umf, t)
            }, e.prototype.fromSearch = function(e, n, t) {
                return new B(e, n, F.SEARCH, this.umf, t)
            }, e
        }(),
        Xe = function() {
            function e() {
                this.paramTypes = new z, this._isCaseInsensitive = !1, this._isStrictMode = !0, this._defaultSquashPolicy = !1, this.paramFactory = new Me(this), Object(a.r)(this, {
                    UrlMatcher: we,
                    Param: B
                })
            }
            return e.prototype.caseInsensitive = function(e) {
                return this._isCaseInsensitive = Object(l.c)(e) ? e : this._isCaseInsensitive
            }, e.prototype.strictMode = function(e) {
                return this._isStrictMode = Object(l.c)(e) ? e : this._isStrictMode
            }, e.prototype.defaultSquashPolicy = function(e) {
                if (Object(l.c)(e) && !0 !== e && !1 !== e && !Object(l.l)(e)) throw new Error("Invalid squash policy: " + e + ". Valid policies: false, true, arbitrary-string");
                return this._defaultSquashPolicy = Object(l.c)(e) ? e : this._defaultSquashPolicy
            }, e.prototype.compile = function(e, n) {
                var t = n && !n.state && n.params;
                n = t ? He({
                    state: {
                        params: t
                    }
                }, n) : n;
                var r = {
                    strict: this._isStrictMode,
                    caseInsensitive: this._isCaseInsensitive
                };
                return new we(e, this.paramTypes, this.paramFactory, Object(a.r)(r, n))
            }, e.prototype.isMatcher = function(e) {
                if (!Object(l.i)(e)) return !1;
                var n = !0;
                return Object(a.w)(we.prototype, function(t, r) {
                    Object(l.d)(t) && (n = n && Object(l.c)(e[r]) && Object(l.d)(e[r]))
                }), n
            }, e.prototype.type = function(e, n, t) {
                var r = this.paramTypes.type(e, n, t);
                return Object(l.c)(n) ? this : r
            }, e.prototype.$get = function() {
                return this.paramTypes.enqueue = !1, this.paramTypes._flushTypeQueue(), this
            }, e.prototype.dispose = function() {
                this.paramTypes.dispose()
            }, e
        }(),
        je = function() {
            function e(e) {
                this.router = e
            }
            return e.prototype.compile = function(e) {
                return this.router.urlMatcherFactory.compile(e)
            }, e.prototype.create = function(e, n) {
                var t = this,
                    r = Ee.isState,
                    a = Object(s.l)([
                        [l.l, function(e) {
                            return a(t.compile(e))
                        }],
                        [Object(s.h)(we), function(e) {
                            return t.fromUrlMatcher(e, n)
                        }],
                        [r, function(e) {
                            return t.fromState(e, t.router)
                        }],
                        [Object(s.h)(RegExp), function(e) {
                            return t.fromRegExp(e, n)
                        }],
                        [l.d, function(e) {
                            return new $e(e, n)
                        }]
                    ]),
                    o = a(e);
                if (!o) throw new Error("invalid 'what' in when()");
                return o
            }, e.prototype.fromUrlMatcher = function(e, n) {
                var t = n;
                Object(l.l)(n) && (n = this.router.urlMatcherFactory.compile(n)), Object(s.h)(we)(n) && (t = function(e) {
                    return n.format(e)
                });
                var r = {
                    urlMatcher: e,
                    matchPriority: function(n) {
                        var t = e.parameters().filter(function(e) {
                            return e.isOptional
                        });
                        return t.length ? t.filter(function(e) {
                            return n[e.id]
                        }).length / t.length : 1e-6
                    },
                    type: "URLMATCHER"
                };
                return Object(a.r)(new $e(function(n) {
                    var t = e.exec(n.path, n.search, n.hash);
                    return e.validates(t) && t
                }, t), r)
            }, e.prototype.fromState = function(e, n) {
                var t = {
                    state: e,
                    type: "STATE"
                };
                return Object(a.r)(this.fromUrlMatcher(e.url, function(t) {
                    var r = n.stateService,
                        a = n.globals;
                    r.href(e, t) !== r.href(a.current, a.params) && r.transitionTo(e, t, {
                        inherit: !0,
                        source: "url"
                    })
                }), t)
            }, e.prototype.fromRegExp = function(e, n) {
                if (e.global || e.sticky) throw new Error("Rule RegExp must not be global or sticky");
                var t = Object(l.l)(n) ? function(e) {
                        return n.replace(/\$(\$|\d{1,2})/, function(n, t) {
                            return e["$" === t ? 0 : Number(t)]
                        })
                    } : n,
                    r = {
                        regexp: e,
                        type: "REGEXP"
                    };
                return Object(a.r)(new $e(function(n) {
                    return e.exec(n.path)
                }, t), r)
            }, e.isUrlRule = function(e) {
                return e && ["type", "match", "handler"].every(function(n) {
                    return Object(l.c)(e[n])
                })
            }, e
        }(),
        $e = function() {
            return function(e, n) {
                var t = this;
                this.match = e, this.type = "RAW", this.matchPriority = function(e) {
                    return 0 - t.$id
                }, this.handler = n || a.y
            }
        }();
    var Ue;
    Ue = function(e, n) {
        var t = function(e, n) {
            return (n.priority || 0) - (e.priority || 0)
        }(e, n);
        return 0 !== t ? t : 0 !== (t = function(e, n) {
            var t = {
                STATE: 4,
                URLMATCHER: 4,
                REGEXP: 3,
                RAW: 2,
                OTHER: 1
            };
            return (t[e.type] || 0) - (t[n.type] || 0)
        }(e, n)) ? t : 0 !== (t = function(e, n) {
            return e.urlMatcher && n.urlMatcher ? we.compare(e.urlMatcher, n.urlMatcher) : 0
        }(e, n)) ? t : function(e, n) {
            var t = {
                STATE: !0,
                URLMATCHER: !0
            };
            return t[e.type] && t[n.type] ? 0 : (e.$id || 0) - (n.$id || 0)
        }(e, n)
    };
    var Fe = function() {
        function e(n) {
            this._sortFn = Ue, this._rules = [], this.interceptDeferred = !1, this._id = 0, this._sorted = !1, this._router = n, this.urlRuleFactory = new je(n), Object(a.n)(Object(s.p)(e.prototype), this, Object(s.p)(this))
        }
        return e.prototype.dispose = function() {
            this.listen(!1), this._rules = [], delete this._otherwiseFn
        }, e.prototype.sort = function(e) {
            this._rules = this.stableSort(this._rules, this._sortFn = e || this._sortFn), this._sorted = !0
        }, e.prototype.ensureSorted = function() {
            this._sorted || this.sort()
        }, e.prototype.stableSort = function(e, n) {
            var t = e.map(function(e, n) {
                return {
                    elem: e,
                    idx: n
                }
            });
            return t.sort(function(e, t) {
                var r = n(e.elem, t.elem);
                return 0 === r ? e.idx - t.idx : r
            }), t.map(function(e) {
                return e.elem
            })
        }, e.prototype.match = function(e) {
            var n = this;
            this.ensureSorted(), e = Object(a.r)({
                path: "",
                search: {},
                hash: ""
            }, e);
            var t = this.rules();
            this._otherwiseFn && t.push(this._otherwiseFn);
            for (var r, o, i, s = 0; s < t.length && (!r || 0 === this._sortFn(t[s], r.rule)); s++) {
                var l = (o = t[s], i = void 0, (i = o.match(e, n._router)) && {
                    match: i,
                    rule: o,
                    weight: o.matchPriority(i)
                });
                r = !r || l && l.weight > r.weight ? l : r
            }
            return r
        }, e.prototype.sync = function(e) {
            if (!e || !e.defaultPrevented) {
                var n = this._router,
                    t = n.urlService,
                    r = n.stateService,
                    a = {
                        path: t.path(),
                        search: t.search(),
                        hash: t.hash()
                    },
                    o = this.match(a);
                Object(s.l)([
                    [l.l, function(e) {
                        return t.url(e, !0)
                    }],
                    [G.isDef, function(e) {
                        return r.go(e.state, e.params, e.options)
                    }],
                    [Object(s.h)(G), function(e) {
                        return r.go(e.state(), e.params(), e.options())
                    }]
                ])(o && o.rule.handler(o.match, a, n))
            }
        }, e.prototype.listen = function(e) {
            var n = this;
            if (!1 !== e) return this._stopFn = this._stopFn || this._router.urlService.onChange(function(e) {
                return n.sync(e)
            });
            this._stopFn && this._stopFn(), delete this._stopFn
        }, e.prototype.update = function(e) {
            var n = this._router.locationService;
            e ? this.location = n.url() : n.url() !== this.location && n.url(this.location, !0)
        }, e.prototype.push = function(e, n, t) {
            var r = t && !!t.replace;
            this._router.urlService.url(e.format(n || {}), r)
        }, e.prototype.href = function(e, n, t) {
            var r = e.format(n);
            if (null == r) return null;
            t = t || {
                absolute: !1
            };
            var a = this._router.urlService.config,
                o = a.html5Mode();
            if (o || null === r || (r = "#" + a.hashPrefix() + r), r = function(e, n, t, r) {
                    return "/" === r ? e : n ? b(r) + e : t ? r.slice(1) + e : e
                }(r, o, t.absolute, a.baseHref()), !t.absolute || !r) return r;
            var i = !o && r ? "/" : "",
                s = a.port(),
                l = 80 === s || 443 === s ? "" : ":" + s;
            return [a.protocol(), "://", a.host(), l, i, r].join("")
        }, e.prototype.rule = function(e) {
            var n = this;
            if (!je.isUrlRule(e)) throw new Error("invalid rule");
            return e.$id = this._id++, e.priority = e.priority || 0, this._rules.push(e), this._sorted = !1,
                function() {
                    return n.removeRule(e)
                }
        }, e.prototype.removeRule = function(e) {
            Object(a.L)(this._rules, e)
        }, e.prototype.rules = function() {
            return this.ensureSorted(), this._rules.slice()
        }, e.prototype.otherwise = function(e) {
            var n = ke(e);
            this._otherwiseFn = this.urlRuleFactory.create(Object(s.p)(!0), n), this._sorted = !1
        }, e.prototype.initial = function(e) {
            var n = ke(e);
            this.rule(this.urlRuleFactory.create(function(e, n) {
                return 0 === n.globals.transitionHistory.size() && !!/^\/?$/.exec(e.path)
            }, n))
        }, e.prototype.when = function(e, n, t) {
            var r = this.urlRuleFactory.create(e, n);
            return Object(l.c)(t && t.priority) && (r.priority = t.priority), this.rule(r), r
        }, e.prototype.deferIntercept = function(e) {
            void 0 === e && (e = !0), this.interceptDeferred = e
        }, e
    }();

    function ke(e) {
        if (!(Object(l.d)(e) || Object(l.l)(e) || Object(s.h)(G)(e) || G.isDef(e))) throw new Error("'handler' must be a string, function, TargetState, or have a state: 'newtarget' property");
        return Object(l.d)(e) ? e : Object(s.p)(e)
    }
    var qe = function() {
            function e(e) {
                var n = this;
                this.router = e, this._uiViews = [], this._viewConfigs = [], this._viewConfigFactories = {}, this._listeners = [], this._pluginapi = {
                    _rootViewContext: this._rootViewContext.bind(this),
                    _viewConfigFactory: this._viewConfigFactory.bind(this),
                    _registeredUIView: function(e) {
                        return Object(a.t)(n._uiViews, function(t) {
                            return n.router.$id + "." + t.id === e
                        })
                    },
                    _registeredUIViews: function() {
                        return n._uiViews
                    },
                    _activeViewConfigs: function() {
                        return n._viewConfigs
                    },
                    _onSync: function(e) {
                        return n._listeners.push(e),
                            function() {
                                return Object(a.L)(n._listeners, e)
                            }
                    }
                }
            }
            return e.normalizeUIViewTarget = function(e, n) {
                void 0 === n && (n = "");
                var t = n.split("@"),
                    r = t[0] || "$default",
                    a = Object(l.l)(t[1]) ? t[1] : "^",
                    o = /^(\^(?:\.\^)*)\.(.*$)/.exec(r);
                o && (a = o[1], r = o[2]), "!" === r.charAt(0) && (r = r.substr(1), a = "");
                if (/^(\^(?:\.\^)*)$/.exec(a)) {
                    var i = a.split(".").reduce(function(e, n) {
                        return e.parent
                    }, e);
                    a = i.name
                } else "." === a && (a = e.name);
                return {
                    uiViewName: r,
                    uiViewContextAnchor: a
                }
            }, e.prototype._rootViewContext = function(e) {
                return this._rootContext = e || this._rootContext
            }, e.prototype._viewConfigFactory = function(e, n) {
                this._viewConfigFactories[e] = n
            }, e.prototype.createViewConfig = function(e, n) {
                var t = this._viewConfigFactories[n.$type];
                if (!t) throw new Error("ViewService: No view config factory registered for type " + n.$type);
                var r = t(e, n);
                return Object(l.a)(r) ? r : [r]
            }, e.prototype.deactivateViewConfig = function(e) {
                j.traceViewServiceEvent("<- Removing", e), Object(a.L)(this._viewConfigs, e)
            }, e.prototype.activateViewConfig = function(e) {
                j.traceViewServiceEvent("-> Registering", e), this._viewConfigs.push(e)
            }, e.prototype.sync = function() {
                var n = this,
                    t = this._uiViews.map(function(e) {
                        return [e.fqn, e]
                    }).reduce(a.h, {});

                function r(e) {
                    for (var n = e.viewDecl.$context, t = 0; ++t && n.parent;) n = n.parent;
                    return t
                }
                var o = Object(s.e)(function(e, n, t, r) {
                        return n * (e(t) - e(r))
                    }),
                    i = this._uiViews.sort(o(function(e) {
                        var n = function(e) {
                            return e && e.parent ? n(e.parent) + 1 : 1
                        };
                        return 1e4 * e.fqn.split(".").length + n(e.creationContext)
                    }, 1)).map(function(a) {
                        var i = n._viewConfigs.filter(e.matches(t, a));
                        return i.length > 1 && i.sort(o(r, -1)), {
                            uiView: a,
                            viewConfig: i[0]
                        }
                    }),
                    l = i.map(function(e) {
                        return e.viewConfig
                    }),
                    c = this._viewConfigs.filter(function(e) {
                        return !Object(a.z)(l, e)
                    }).map(function(e) {
                        return {
                            uiView: void 0,
                            viewConfig: e
                        }
                    });
                i.forEach(function(e) {
                    -1 !== n._uiViews.indexOf(e.uiView) && e.uiView.configUpdated(e.viewConfig)
                });
                var u = i.concat(c);
                this._listeners.forEach(function(e) {
                    return e(u)
                }), j.traceViewSync(u)
            }, e.prototype.registerUIView = function(e) {
                j.traceViewServiceUIViewEvent("-> Registering", e);
                var n = this._uiViews;
                return n.filter(function(n) {
                        return n.fqn === e.fqn && n.$type === e.$type
                    }).length && j.traceViewServiceUIViewEvent("!!!! duplicate uiView named:", e), n.push(e), this.sync(),
                    function() {
                        -1 !== n.indexOf(e) ? (j.traceViewServiceUIViewEvent("<- Deregistering", e), Object(a.L)(n)(e)) : j.traceViewServiceUIViewEvent("Tried removing non-registered uiView", e)
                    }
            }, e.prototype.available = function() {
                return this._uiViews.map(Object(s.n)("fqn"))
            }, e.prototype.active = function() {
                return this._uiViews.filter(Object(s.n)("$config")).map(Object(s.n)("name"))
            }, e.matches = function(e, n) {
                return function(t) {
                    if (n.$type !== t.viewDecl.$type) return !1;
                    var r = t.viewDecl,
                        o = r.$uiViewName.split("."),
                        i = n.fqn.split(".");
                    if (!Object(a.q)(o, i.slice(0 - o.length))) return !1;
                    var s = 1 - o.length || void 0,
                        l = i.slice(0, s).join("."),
                        c = e[l].creationContext;
                    return r.$uiViewContextAnchor === (c && c.name)
                }
            }, e
        }(),
        Ve = function() {
            function e() {
                this.params = new Z, this.lastStartedTransitionId = -1, this.transitionHistory = new c([], 1), this.successfulTransitions = new c([], 1)
            }
            return e.prototype.dispose = function() {
                this.transitionHistory.clear(), this.successfulTransitions.clear(), this.transition = null
            }, e
        }(),
        Ye = function(e) {
            return e.reduce(function(e, n) {
                return e[n] = Object(o.a)(n), e
            }, {
                dispose: a.E
            })
        },
        Be = ["url", "path", "search", "hash", "onChange"],
        ze = ["port", "protocol", "host", "baseHref", "html5Mode", "hashPrefix"],
        Ze = ["type", "caseInsensitive", "strictMode", "defaultSquashPolicy"],
        We = ["sort", "when", "initial", "otherwise", "rules", "rule", "removeRule"],
        Ge = ["deferIntercept", "listen", "sync", "match"],
        Qe = function() {
            function e(e, n) {
                void 0 === n && (n = !0), this.router = e, this.rules = {}, this.config = {};
                var t = function() {
                    return e.locationService
                };
                Object(a.n)(t, this, t, Be, n);
                var r = function() {
                    return e.locationConfig
                };
                Object(a.n)(r, this.config, r, ze, n);
                var o = function() {
                    return e.urlMatcherFactory
                };
                Object(a.n)(o, this.config, o, Ze);
                var i = function() {
                    return e.urlRouter
                };
                Object(a.n)(i, this.rules, i, We), Object(a.n)(i, this, i, Ge)
            }
            return e.prototype.url = function(e, n, t) {}, e.prototype.path = function() {}, e.prototype.search = function() {}, e.prototype.hash = function() {}, e.prototype.onChange = function(e) {}, e.prototype.parts = function() {
                return {
                    path: this.path(),
                    search: this.search(),
                    hash: this.hash()
                }
            }, e.prototype.dispose = function() {}, e.prototype.sync = function(e) {}, e.prototype.listen = function(e) {}, e.prototype.deferIntercept = function(e) {}, e.prototype.match = function(e) {}, e.locationServiceStub = Ye(Be), e.locationConfigStub = Ye(ze), e
        }(),
        Ke = 0,
        Je = function() {
            function e(e, n) {
                void 0 === e && (e = Qe.locationServiceStub), void 0 === n && (n = Qe.locationConfigStub), this.locationService = e, this.locationConfig = n, this.$id = Ke++, this._disposed = !1, this._disposables = [], this.trace = j, this.viewService = new qe(this), this.globals = new Ve, this.transitionService = new Pn(this), this.urlMatcherFactory = new Xe, this.urlRouter = new Fe(this), this.stateRegistry = new be(this), this.stateService = new An(this), this.urlService = new Qe(this), this._plugins = {}, this.viewService._pluginapi._rootViewContext(this.stateRegistry.root()), this.globals.$current = this.stateRegistry.root(), this.globals.current = this.globals.$current.self, this.disposable(this.globals), this.disposable(this.stateService), this.disposable(this.stateRegistry), this.disposable(this.transitionService), this.disposable(this.urlRouter), this.disposable(e), this.disposable(n)
            }
            return e.prototype.disposable = function(e) {
                this._disposables.push(e)
            }, e.prototype.dispose = function(e) {
                var n = this;
                e && Object(l.d)(e.dispose) ? e.dispose(this) : (this._disposed = !0, this._disposables.slice().forEach(function(e) {
                    try {
                        "function" == typeof e.dispose && e.dispose(n), Object(a.L)(n._disposables, e)
                    } catch (e) {}
                }))
            }, e.prototype.plugin = function(e, n) {
                void 0 === n && (n = {});
                var t = new e(this, n);
                if (!t.name) throw new Error("Required property `name` missing on plugin: " + t);
                return this._disposables.push(t), this._plugins[t.name] = t
            }, e.prototype.getPlugin = function(e) {
                return e ? this._plugins[e] : Object(a.U)(this._plugins)
            }, e
        }();

    function en(e) {
        e.addResolvable(ee.fromData(Je, e.router), ""), e.addResolvable(ee.fromData(ye, e), ""), e.addResolvable(ee.fromData("$transition$", e), ""), e.addResolvable(ee.fromData("$stateParams", e.params()), ""), e.entering().forEach(function(n) {
            e.addResolvable(ee.fromData("$state$", n), n)
        })
    }
    var nn = ["$transition$", ye],
        tn = Object(a.z)(nn),
        rn = function(e) {
            var n = Object(a.U)(e.treeChanges()).reduce(a.T, []).reduce(a.R, []),
                t = function(e) {
                    return tn(e.token) ? ee.fromData(e.token, null) : e
                };
            n.forEach(function(e) {
                e.resolvables = e.resolvables.map(t)
            })
        },
        an = function(e) {
            var n = e.to().redirectTo;
            if (n) {
                var t = e.router.stateService;
                return Object(l.d)(n) ? o.b.$q.when(n(e)).then(r) : r(n)
            }

            function r(n) {
                if (n) return n instanceof G ? n : Object(l.l)(n) ? t.target(n, e.params(), e.options()) : n.state || n.params ? t.target(n.state || e.to(), n.params || e.params(), e.options()) : void 0
            }
        };

    function on(e) {
        return function(n, t) {
            return (0, t.$$state()[e])(n, t)
        }
    }
    var sn = on("onExit"),
        ln = on("onRetain"),
        cn = on("onEnter"),
        un = function(e) {
            return new oe(e.treeChanges().to).resolvePath("EAGER", e).then(a.E)
        },
        dn = function(e, n) {
            return new oe(e.treeChanges().to).subContext(n.$$state()).resolvePath("LAZY", e).then(a.E)
        },
        pn = function(e) {
            return new oe(e.treeChanges().to).resolvePath("LAZY", e).then(a.E)
        },
        _n = function(e) {
            var n = o.b.$q,
                t = e.views("entering");
            if (t.length) return n.all(t.map(function(e) {
                return n.when(e.load())
            })).then(a.E)
        },
        fn = function(e) {
            var n = e.views("entering"),
                t = e.views("exiting");
            if (n.length || t.length) {
                var r = e.router.viewService;
                t.forEach(function(e) {
                    return r.deactivateViewConfig(e)
                }), n.forEach(function(e) {
                    return r.activateViewConfig(e)
                }), r.sync()
            }
        },
        hn = function(e) {
            var n = e.router.globals,
                t = function() {
                    n.transition === e && (n.transition = null)
                };
            e.onSuccess({}, function() {
                n.successfulTransitions.enqueue(e), n.$current = e.$to(), n.current = n.$current.self, Object(a.m)(e.params(), n.params)
            }, {
                priority: 1e4
            }), e.promise.then(t, t)
        },
        mn = function(e) {
            var n = e.options(),
                t = e.router.stateService,
                r = e.router.urlRouter;
            if ("url" !== n.source && n.location && t.$current.navigable) {
                var a = {
                    replace: "replace" === n.location
                };
                r.push(t.$current.navigable.url, t.params, a)
            }
            r.update(!0)
        },
        gn = function(e) {
            var n = e.router;
            var t = e.entering().filter(function(e) {
                return !!e.$$state().lazyLoad
            }).map(function(n) {
                return vn(e, n)
            });
            return o.b.$q.all(t).then(function() {
                if ("url" !== e.originalTransition().options().source) {
                    var t = e.targetState();
                    return n.stateService.target(t.identifier(), t.params(), t.options())
                }
                var r = n.urlService,
                    a = r.match(r.parts()),
                    o = a && a.rule;
                if (o && "STATE" === o.type) {
                    var i = o.state,
                        s = a.match;
                    return n.stateService.target(i, s, e.options())
                }
                n.urlService.sync()
            })
        };

    function vn(e, n) {
        var t = n.$$state().lazyLoad,
            r = t._promise;
        if (!r) {
            r = t._promise = o.b.$q.when(t(e, n)).then(function(n) {
                n && Array.isArray(n.states) && n.states.forEach(function(n) {
                    return e.router.stateRegistry.register(n)
                });
                return n
            }).then(function(e) {
                return delete n.lazyLoad, delete n.$$state().lazyLoad, delete t._promise, e
            }, function(e) {
                return delete t._promise, o.b.$q.reject(e)
            })
        }
        return r
    }
    var En = function() {
        return function(e, n, t, r, a, o, i, s) {
            void 0 === a && (a = !1), void 0 === o && (o = Ae.HANDLE_RESULT), void 0 === i && (i = Ae.REJECT_ERROR), void 0 === s && (s = !1), this.name = e, this.hookPhase = n, this.hookOrder = t, this.criteriaMatchPath = r, this.reverseSort = a, this.getResultHandler = o, this.getErrorHandler = i, this.synchronous = s
        }
    }();

    function Tn(e) {
        var n = e._ignoredReason();
        if (n) {
            j.traceTransitionIgnored(e);
            var t = e.router.globals.transition;
            return "SameAsCurrent" === n && t && t.abort(), d.ignored().toPromise()
        }
    }

    function Rn(e) {
        if (!e.valid()) throw new Error(e.error().toString())
    }
    var bn = {
            location: !0,
            relative: null,
            inherit: !1,
            notify: !0,
            reload: !1,
            custom: {},
            current: function() {
                return null
            },
            source: "unknown"
        },
        Pn = function() {
            function e(e) {
                this._transitionCount = 0, this._eventTypes = [], this._registeredHooks = {}, this._criteriaPaths = {}, this._router = e, this.$view = e.viewService, this._deregisterHookFns = {}, this._pluginapi = Object(a.n)(Object(s.p)(this), {}, Object(s.p)(this), ["_definePathType", "_defineEvent", "_getPathTypes", "_getEvents", "getHooks"]), this._defineCorePaths(), this._defineCoreEvents(), this._registerCoreTransitionHooks(), e.globals.successfulTransitions.onEvict(rn)
            }
            return e.prototype.onCreate = function(e, n, t) {}, e.prototype.onBefore = function(e, n, t) {}, e.prototype.onStart = function(e, n, t) {}, e.prototype.onExit = function(e, n, t) {}, e.prototype.onRetain = function(e, n, t) {}, e.prototype.onEnter = function(e, n, t) {}, e.prototype.onFinish = function(e, n, t) {}, e.prototype.onSuccess = function(e, n, t) {}, e.prototype.onError = function(e, n, t) {}, e.prototype.dispose = function(e) {
                Object(a.U)(this._registeredHooks).forEach(function(e) {
                    return e.forEach(function(n) {
                        n._deregistered = !0, Object(a.L)(e, n)
                    })
                })
            }, e.prototype.create = function(e, n) {
                return new ye(e, n, this._router)
            }, e.prototype._defineCoreEvents = function() {
                var e = me,
                    n = Ae,
                    t = this._criteriaPaths;
                this._defineEvent("onCreate", e.CREATE, 0, t.to, !1, n.LOG_REJECTED_RESULT, n.THROW_ERROR, !0), this._defineEvent("onBefore", e.BEFORE, 0, t.to), this._defineEvent("onStart", e.RUN, 0, t.to), this._defineEvent("onExit", e.RUN, 100, t.exiting, !0), this._defineEvent("onRetain", e.RUN, 200, t.retained), this._defineEvent("onEnter", e.RUN, 300, t.entering), this._defineEvent("onFinish", e.RUN, 400, t.to), this._defineEvent("onSuccess", e.SUCCESS, 0, t.to, !1, n.LOG_REJECTED_RESULT, n.LOG_ERROR, !0), this._defineEvent("onError", e.ERROR, 0, t.to, !1, n.LOG_REJECTED_RESULT, n.LOG_ERROR, !0)
            }, e.prototype._defineCorePaths = function() {
                var e = ge.STATE,
                    n = ge.TRANSITION;
                this._definePathType("to", n), this._definePathType("from", n), this._definePathType("exiting", e), this._definePathType("retained", e), this._definePathType("entering", e)
            }, e.prototype._defineEvent = function(e, n, t, r, a, o, i, s) {
                void 0 === a && (a = !1), void 0 === o && (o = Ae.HANDLE_RESULT), void 0 === i && (i = Ae.REJECT_ERROR), void 0 === s && (s = !1);
                var l = new En(e, n, t, r, a, o, i, s);
                this._eventTypes.push(l), De(this, this, l)
            }, e.prototype._getEvents = function(e) {
                return (Object(l.c)(e) ? this._eventTypes.filter(function(n) {
                    return n.hookPhase === e
                }) : this._eventTypes.slice()).sort(function(e, n) {
                    var t = e.hookPhase - n.hookPhase;
                    return 0 === t ? e.hookOrder - n.hookOrder : t
                })
            }, e.prototype._definePathType = function(e, n) {
                this._criteriaPaths[e] = {
                    name: e,
                    scope: n
                }
            }, e.prototype._getPathTypes = function() {
                return this._criteriaPaths
            }, e.prototype.getHooks = function(e) {
                return this._registeredHooks[e]
            }, e.prototype._registerCoreTransitionHooks = function() {
                var e = this._deregisterHookFns;
                e.addCoreResolves = this.onCreate({}, en), e.ignored = function(e) {
                    return e.onBefore({}, Tn, {
                        priority: -9999
                    })
                }(this), e.invalid = function(e) {
                    return e.onBefore({}, Rn, {
                        priority: -1e4
                    })
                }(this), e.redirectTo = function(e) {
                    return e.onStart({
                        to: function(e) {
                            return !!e.redirectTo
                        }
                    }, an)
                }(this), e.onExit = function(e) {
                    return e.onExit({
                        exiting: function(e) {
                            return !!e.onExit
                        }
                    }, sn)
                }(this), e.onRetain = function(e) {
                    return e.onRetain({
                        retained: function(e) {
                            return !!e.onRetain
                        }
                    }, ln)
                }(this), e.onEnter = function(e) {
                    return e.onEnter({
                        entering: function(e) {
                            return !!e.onEnter
                        }
                    }, cn)
                }(this), e.eagerResolve = function(e) {
                    return e.onStart({}, un, {
                        priority: 1e3
                    })
                }(this), e.lazyResolve = function(e) {
                    return e.onEnter({
                        entering: Object(s.p)(!0)
                    }, dn, {
                        priority: 1e3
                    })
                }(this), e.resolveAll = function(e) {
                    return e.onFinish({}, pn, {
                        priority: 1e3
                    })
                }(this), e.loadViews = function(e) {
                    return e.onFinish({}, _n)
                }(this), e.activateViews = function(e) {
                    return e.onSuccess({}, fn)
                }(this), e.updateGlobals = function(e) {
                    return e.onCreate({}, hn)
                }(this), e.updateUrl = function(e) {
                    return e.onSuccess({}, mn, {
                        priority: 9999
                    })
                }(this), e.lazyLoad = function(e) {
                    return e.onBefore({
                        entering: function(e) {
                            return !!e.lazyLoad
                        }
                    }, gn)
                }(this)
            }, e
        }(),
        An = function() {
            function e(n) {
                this.router = n, this.invalidCallbacks = [], this._defaultErrorHandler = function(e) {
                    e instanceof Error && e.stack ? (console.error(e), console.error(e.stack)) : e instanceof d ? (console.error(e.toString()), e.detail && e.detail.stack && console.error(e.detail.stack)) : console.error(e)
                };
                var t = Object.keys(e.prototype).filter(Object(s.i)(Object(a.z)(["current", "$current", "params", "transition"])));
                Object(a.n)(Object(s.p)(e.prototype), this, Object(s.p)(this), t)
            }
            return Object.defineProperty(e.prototype, "transition", {
                get: function() {
                    return this.router.globals.transition
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "params", {
                get: function() {
                    return this.router.globals.params
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "current", {
                get: function() {
                    return this.router.globals.current
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "$current", {
                get: function() {
                    return this.router.globals.$current
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.dispose = function() {
                this.defaultErrorHandler(a.E), this.invalidCallbacks = []
            }, e.prototype._handleInvalidTargetState = function(e, n) {
                var t = this,
                    r = Q.makeTargetState(this.router.stateRegistry, e),
                    a = this.router.globals,
                    i = function() {
                        return a.transitionHistory.peekTail()
                    },
                    s = i(),
                    l = new c(this.invalidCallbacks.slice()),
                    u = new oe(e).injector(),
                    p = function(e) {
                        if (e instanceof G) {
                            var n = e;
                            return (n = t.target(n.identifier(), n.params(), n.options())).valid() ? i() !== s ? d.superseded().toPromise() : t.transitionTo(n.identifier(), n.params(), n.options()) : d.invalid(n.error()).toPromise()
                        }
                    };
                return function e() {
                    var t = l.dequeue();
                    return void 0 === t ? d.invalid(n.error()).toPromise() : o.b.$q.when(t(n, r, u)).then(p).then(function(n) {
                        return n || e()
                    })
                }()
            }, e.prototype.onInvalid = function(e) {
                return this.invalidCallbacks.push(e),
                    function() {
                        Object(a.L)(this.invalidCallbacks)(e)
                    }.bind(this)
            }, e.prototype.reload = function(e) {
                return this.transitionTo(this.current, this.params, {
                    reload: !Object(l.c)(e) || e,
                    inherit: !1,
                    notify: !1
                })
            }, e.prototype.go = function(e, n, t) {
                var r = {
                        relative: this.$current,
                        inherit: !0
                    },
                    o = Object(a.o)(t, r, bn);
                return this.transitionTo(e, n, o)
            }, e.prototype.target = function(e, n, t) {
                if (void 0 === t && (t = {}), Object(l.i)(t.reload) && !t.reload.name) throw new Error("Invalid reload state object");
                var r = this.router.stateRegistry;
                if (t.reloadState = !0 === t.reload ? r.root() : r.matcher.find(t.reload, t.relative), t.reload && !t.reloadState) throw new Error("No such reload state '" + (Object(l.l)(t.reload) ? t.reload : t.reload.name) + "'");
                return new G(this.router.stateRegistry, e, n, t)
            }, e.prototype.getCurrentPath = function() {
                var e = this,
                    n = this.router.globals.successfulTransitions.peekTail();
                return n ? n.treeChanges().to : [new W(e.router.stateRegistry.root())]
            }, e.prototype.transitionTo = function(e, n, t) {
                var i = this;
                void 0 === n && (n = {}), void 0 === t && (t = {});
                var s = this.router,
                    l = s.globals;
                t = Object(a.o)(t, bn);
                t = Object(a.r)(t, {
                    current: function() {
                        return l.transition
                    }
                });
                var c = this.target(e, n, t),
                    u = this.getCurrentPath();
                if (!c.exists()) return this._handleInvalidTargetState(u, c);
                if (!c.valid()) return Object(a.O)(c.error());
                var p = function(e) {
                        return function(n) {
                            if (n instanceof d) {
                                var t = s.globals.lastStartedTransitionId === e.$id;
                                if (n.type === r.IGNORED) return t && s.urlRouter.update(), o.b.$q.when(l.current);
                                var a = n.detail;
                                if (n.type === r.SUPERSEDED && n.redirected && a instanceof G) {
                                    var c = e.redirect(a);
                                    return c.run().catch(p(c))
                                }
                                if (n.type === r.ABORTED) return t && s.urlRouter.update(), o.b.$q.reject(n)
                            }
                            return i.defaultErrorHandler()(n), o.b.$q.reject(n)
                        }
                    },
                    _ = this.router.transitionService.create(u, c),
                    f = _.run().catch(p(_));
                return Object(a.N)(f), Object(a.r)(f, {
                    transition: _
                })
            }, e.prototype.is = function(e, n, t) {
                t = Object(a.o)(t, {
                    relative: this.$current
                });
                var r = this.router.stateRegistry.matcher.find(e, t.relative);
                if (Object(l.c)(r)) {
                    if (this.$current !== r) return !1;
                    if (!n) return !0;
                    var o = r.parameters({
                        inherit: !0,
                        matchingKeys: n
                    });
                    return B.equals(o, B.values(o, n), this.params)
                }
            }, e.prototype.includes = function(e, n, t) {
                t = Object(a.o)(t, {
                    relative: this.$current
                });
                var r = Object(l.l)(e) && i.fromString(e);
                if (r) {
                    if (!r.matches(this.$current.name)) return !1;
                    e = this.$current.name
                }
                var o = this.router.stateRegistry.matcher.find(e, t.relative),
                    s = this.$current.includes;
                if (Object(l.c)(o)) {
                    if (!Object(l.c)(s[o.name])) return !1;
                    if (!n) return !0;
                    var c = o.parameters({
                        inherit: !0,
                        matchingKeys: n
                    });
                    return B.equals(c, B.values(c, n), this.params)
                }
            }, e.prototype.href = function(e, n, t) {
                var r = {
                    lossy: !0,
                    inherit: !0,
                    absolute: !1,
                    relative: this.$current
                };
                t = Object(a.o)(t, r), n = n || {};
                var o = this.router.stateRegistry.matcher.find(e, t.relative);
                if (!Object(l.c)(o)) return null;
                t.inherit && (n = this.params.$inherit(n, this.$current, o));
                var i = o && t.lossy ? o.navigable : o;
                return i && void 0 !== i.url && null !== i.url ? this.router.urlRouter.href(i.url, n, {
                    absolute: t.absolute
                }) : null
            }, e.prototype.defaultErrorHandler = function(e) {
                return this._defaultErrorHandler = e || this._defaultErrorHandler
            }, e.prototype.get = function(e, n) {
                var t = this.router.stateRegistry;
                return 0 === arguments.length ? t.get() : t.get(e, n || this.$current)
            }, e.prototype.lazyLoad = function(e, n) {
                var t = this.get(e);
                if (!t || !t.lazyLoad) throw new Error("Can not lazy load " + e);
                var r = this.getCurrentPath(),
                    a = Q.makeTargetState(this.router.stateRegistry, r);
                return vn(n = n || this.router.transitionService.create(r, a), t)
            }, e
        }(),
        Sn = {
            when: function(e) {
                return new Promise(function(n, t) {
                    return n(e)
                })
            },
            reject: function(e) {
                return new Promise(function(n, t) {
                    t(e)
                })
            },
            defer: function() {
                var e = {};
                return e.promise = new Promise(function(n, t) {
                    e.resolve = n, e.reject = t
                }), e
            },
            all: function(e) {
                if (Object(l.a)(e)) return Promise.all(e);
                if (Object(l.i)(e)) {
                    var n = Object.keys(e).map(function(n) {
                        return e[n].then(function(e) {
                            return {
                                key: n,
                                val: e
                            }
                        })
                    });
                    return Sn.all(n).then(function(e) {
                        return e.reduce(function(e, n) {
                            return e[n.key] = n.val, e
                        }, {})
                    })
                }
            }
        },
        Nn = {},
        Dn = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
        In = /([^\s,]+)/g,
        On = {
            get: function(e) {
                return Nn[e]
            },
            has: function(e) {
                return null != On.get(e)
            },
            invoke: function(e, n, t) {
                var r = Object(a.r)({}, Nn, t || {}),
                    o = On.annotate(e),
                    i = Object(a.l)(function(e) {
                        return r.hasOwnProperty(e)
                    }, function(e) {
                        return "DI can't find injectable: '" + e + "'"
                    }),
                    s = o.filter(i).map(function(e) {
                        return r[e]
                    });
                return Object(l.d)(e) ? e.apply(n, s) : e.slice(-1)[0].apply(n, s)
            },
            annotate: function(e) {
                if (!Object(l.e)(e)) throw new Error("Not an injectable function: " + e);
                if (e && e.$inject) return e.$inject;
                if (Object(l.a)(e)) return e.slice(0, -1);
                var n = e.toString().replace(Dn, "");
                return n.slice(n.indexOf("(") + 1, n.indexOf(")")).match(In) || []
            }
        },
        yn = function(e, n) {
            var t = n[0],
                r = n[1];
            return e.hasOwnProperty(t) ? Object(l.a)(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : e[t] = r, e
        },
        Cn = function(e) {
            return e.split("&").filter(a.y).map(S).reduce(yn, {})
        };

    function xn(e) {
        var n = function(e) {
                return e || ""
            },
            t = P(e).map(n),
            r = t[0],
            a = t[1],
            o = A(r).map(n);
        return {
            path: o[0],
            search: o[1],
            hash: a,
            url: e
        }
    }
    var Ln = function(e) {
        var n = e.path(),
            t = e.search(),
            r = e.hash(),
            o = Object.keys(t).map(function(e) {
                var n = t[e];
                return (Object(l.a)(n) ? n : [n]).map(function(n) {
                    return e + "=" + n
                })
            }).reduce(a.T, []).join("&");
        return n + (o ? "?" + o : "") + (r ? "#" + r : "")
    };

    function wn(e, n, t, r) {
        return function(a) {
            var o = a.locationService = new t(a),
                i = a.locationConfig = new r(a, n);
            return {
                name: e,
                service: o,
                configuration: i,
                dispose: function(e) {
                    e.dispose(o), e.dispose(i)
                }
            }
        }
    }
    var Hn, Mn = function() {
            function e(e, n) {
                var t = this;
                this.fireAfterUpdate = n, this._listeners = [], this._listener = function(e) {
                    return t._listeners.forEach(function(n) {
                        return n(e)
                    })
                }, this.hash = function() {
                    return xn(t._get()).hash
                }, this.path = function() {
                    return xn(t._get()).path
                }, this.search = function() {
                    return Cn(xn(t._get()).search)
                }, this._location = a.M.location, this._history = a.M.history
            }
            return e.prototype.url = function(e, n) {
                return void 0 === n && (n = !0), Object(l.c)(e) && e !== this._get() && (this._set(null, null, e, n), this.fireAfterUpdate && this._listeners.forEach(function(n) {
                    return n({
                        url: e
                    })
                })), Ln(this)
            }, e.prototype.onChange = function(e) {
                var n = this;
                return this._listeners.push(e),
                    function() {
                        return Object(a.L)(n._listeners, e)
                    }
            }, e.prototype.dispose = function(e) {
                Object(a.p)(this._listeners)
            }, e
        }(),
        Xn = (Hn = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, n) {
                e.__proto__ = n
            } || function(e, n) {
                for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t])
            },
            function(e, n) {
                function t() {
                    this.constructor = e
                }
                Hn(e, n), e.prototype = null === n ? Object.create(n) : (t.prototype = n.prototype, new t)
            }),
        jn = function(e) {
            function n(n) {
                var t = e.call(this, n, !1) || this;
                return a.M.addEventListener("hashchange", t._listener, !1), t
            }
            return Xn(n, e), n.prototype._get = function() {
                return N(this._location.hash)
            }, n.prototype._set = function(e, n, t, r) {
                this._location.hash = t
            }, n.prototype.dispose = function(n) {
                e.prototype.dispose.call(this, n), a.M.removeEventListener("hashchange", this._listener)
            }, n
        }(Mn),
        $n = function() {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, n) {
                e.__proto__ = n
            } || function(e, n) {
                for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t])
            };
            return function(n, t) {
                function r() {
                    this.constructor = n
                }
                e(n, t), n.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }
        }(),
        Un = function(e) {
            function n(n) {
                return e.call(this, n, !0) || this
            }
            return $n(n, e), n.prototype._get = function() {
                return this._url
            }, n.prototype._set = function(e, n, t, r) {
                this._url = t
            }, n
        }(Mn),
        Fn = function() {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, n) {
                e.__proto__ = n
            } || function(e, n) {
                for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t])
            };
            return function(n, t) {
                function r() {
                    this.constructor = n
                }
                e(n, t), n.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }
        }(),
        kn = function(e) {
            function n(n) {
                var t = e.call(this, n, !0) || this;
                return t._config = n.urlService.config, a.M.addEventListener("popstate", t._listener, !1), t
            }
            return Fn(n, e), n.prototype._getBasePrefix = function() {
                return b(this._config.baseHref())
            }, n.prototype._get = function() {
                var e = this._location,
                    n = e.pathname,
                    t = e.hash,
                    r = e.search;
                r = A(r)[1], t = P(t)[1];
                var a = this._getBasePrefix(),
                    o = n === this._config.baseHref(),
                    i = n.substr(0, a.length) === a;
                return (n = o ? "/" : i ? n.substring(a.length) : n) + (r ? "?" + r : "") + (t ? "#" + t : "")
            }, n.prototype._set = function(e, n, t, r) {
                var a = this._getBasePrefix(),
                    o = t && "/" !== t[0] ? "/" : "",
                    i = "" === t || "/" === t ? this._config.baseHref() : a + o + t;
                r ? this._history.replaceState(e, n, i) : this._history.pushState(e, n, i)
            }, n.prototype.dispose = function(n) {
                e.prototype.dispose.call(this, n), a.M.removeEventListener("popstate", this._listener)
            }, n
        }(Mn),
        qn = function() {
            return function() {
                var e = this;
                this.dispose = a.E, this._baseHref = "", this._port = 80, this._protocol = "http", this._host = "localhost", this._hashPrefix = "", this.port = function() {
                    return e._port
                }, this.protocol = function() {
                    return e._protocol
                }, this.host = function() {
                    return e._host
                }, this.baseHref = function() {
                    return e._baseHref
                }, this.html5Mode = function() {
                    return !1
                }, this.hashPrefix = function(n) {
                    return Object(l.c)(n) ? e._hashPrefix = n : e._hashPrefix
                }
            }
        }(),
        Vn = function() {
            function e(e, n) {
                void 0 === n && (n = !1), this._isHtml5 = n, this._baseHref = void 0, this._hashPrefix = ""
            }
            return e.prototype.port = function() {
                return location.port ? Number(location.port) : "https" === this.protocol() ? 443 : 80
            }, e.prototype.protocol = function() {
                return location.protocol.replace(/:/g, "")
            }, e.prototype.host = function() {
                return location.hostname
            }, e.prototype.html5Mode = function() {
                return this._isHtml5
            }, e.prototype.hashPrefix = function(e) {
                return Object(l.c)(e) ? this._hashPrefix = e : this._hashPrefix
            }, e.prototype.baseHref = function(e) {
                return Object(l.c)(e) && (this._baseHref = e), Object(l.m)(this._baseHref) && (this._baseHref = this.getBaseHref()), this._baseHref
            }, e.prototype.getBaseHref = function() {
                var e = document.getElementsByTagName("base")[0];
                return e && e.href ? e.href.replace(/^(https?:)?\/\/[^\/]*/, "") : location.pathname || "/"
            }, e.prototype.dispose = function() {}, e
        }();

    function Yn(e) {
        return o.b.$injector = On, o.b.$q = Sn, {
            name: "vanilla.services",
            $q: Sn,
            $injector: On,
            dispose: function() {
                return null
            }
        }
    }
    var Bn = wn("vanilla.hashBangLocation", !1, jn, Vn),
        zn = wn("vanilla.pushStateLocation", !0, kn, Vn),
        Zn = wn("vanilla.memoryLocation", !1, Un, qn),
        Wn = function() {
            function e() {}
            return e.prototype.dispose = function(e) {}, e
        }();
    t.d(n, "root", function() {
        return a.M
    }), t.d(n, "fromJson", function() {
        return a.x
    }), t.d(n, "toJson", function() {
        return a.Q
    }), t.d(n, "forEach", function() {
        return a.w
    }), t.d(n, "extend", function() {
        return a.r
    }), t.d(n, "equals", function() {
        return a.q
    }), t.d(n, "identity", function() {
        return a.y
    }), t.d(n, "noop", function() {
        return a.E
    }), t.d(n, "createProxyFunctions", function() {
        return a.n
    }), t.d(n, "inherit", function() {
        return a.A
    }), t.d(n, "inArray", function() {
        return a.z
    }), t.d(n, "_inArray", function() {
        return a.b
    }), t.d(n, "removeFrom", function() {
        return a.L
    }), t.d(n, "_removeFrom", function() {
        return a.d
    }), t.d(n, "pushTo", function() {
        return a.K
    }), t.d(n, "_pushTo", function() {
        return a.c
    }), t.d(n, "deregAll", function() {
        return a.p
    }), t.d(n, "defaults", function() {
        return a.o
    }), t.d(n, "mergeR", function() {
        return a.D
    }), t.d(n, "ancestors", function() {
        return a.f
    }), t.d(n, "pick", function() {
        return a.H
    }), t.d(n, "omit", function() {
        return a.F
    }), t.d(n, "pluck", function() {
        return a.I
    }), t.d(n, "filter", function() {
        return a.s
    }), t.d(n, "find", function() {
        return a.t
    }), t.d(n, "mapObj", function() {
        return a.C
    }), t.d(n, "map", function() {
        return a.B
    }), t.d(n, "values", function() {
        return a.U
    }), t.d(n, "allTrueR", function() {
        return a.e
    }), t.d(n, "anyTrueR", function() {
        return a.g
    }), t.d(n, "unnestR", function() {
        return a.T
    }), t.d(n, "flattenR", function() {
        return a.v
    }), t.d(n, "pushR", function() {
        return a.J
    }), t.d(n, "uniqR", function() {
        return a.R
    }), t.d(n, "unnest", function() {
        return a.S
    }), t.d(n, "flatten", function() {
        return a.u
    }), t.d(n, "assertPredicate", function() {
        return a.l
    }), t.d(n, "assertMap", function() {
        return a.k
    }), t.d(n, "assertFn", function() {
        return a.j
    }), t.d(n, "pairs", function() {
        return a.G
    }), t.d(n, "arrayTuples", function() {
        return a.i
    }), t.d(n, "applyPairs", function() {
        return a.h
    }), t.d(n, "tail", function() {
        return a.P
    }), t.d(n, "copy", function() {
        return a.m
    }), t.d(n, "_extend", function() {
        return a.a
    }), t.d(n, "silenceUncaughtInPromise", function() {
        return a.N
    }), t.d(n, "silentRejection", function() {
        return a.O
    }), t.d(n, "notImplemented", function() {
        return o.a
    }), t.d(n, "services", function() {
        return o.b
    }), t.d(n, "Glob", function() {
        return i
    }), t.d(n, "curry", function() {
        return s.e
    }), t.d(n, "compose", function() {
        return s.d
    }), t.d(n, "pipe", function() {
        return s.m
    }), t.d(n, "prop", function() {
        return s.n
    }), t.d(n, "propEq", function() {
        return s.o
    }), t.d(n, "parse", function() {
        return s.k
    }), t.d(n, "not", function() {
        return s.i
    }), t.d(n, "and", function() {
        return s.b
    }), t.d(n, "or", function() {
        return s.j
    }), t.d(n, "all", function() {
        return s.a
    }), t.d(n, "any", function() {
        return s.c
    }), t.d(n, "is", function() {
        return s.h
    }), t.d(n, "eq", function() {
        return s.f
    }), t.d(n, "val", function() {
        return s.p
    }), t.d(n, "invoke", function() {
        return s.g
    }), t.d(n, "pattern", function() {
        return s.l
    }), t.d(n, "isUndefined", function() {
        return l.m
    }), t.d(n, "isDefined", function() {
        return l.c
    }), t.d(n, "isNull", function() {
        return l.f
    }), t.d(n, "isNullOrUndefined", function() {
        return l.g
    }), t.d(n, "isFunction", function() {
        return l.d
    }), t.d(n, "isNumber", function() {
        return l.h
    }), t.d(n, "isString", function() {
        return l.l
    }), t.d(n, "isObject", function() {
        return l.i
    }), t.d(n, "isArray", function() {
        return l.a
    }), t.d(n, "isDate", function() {
        return l.b
    }), t.d(n, "isRegExp", function() {
        return l.k
    }), t.d(n, "isInjectable", function() {
        return l.e
    }), t.d(n, "isPromise", function() {
        return l.j
    }), t.d(n, "Queue", function() {
        return c
    }), t.d(n, "maxLength", function() {
        return p
    }), t.d(n, "padString", function() {
        return _
    }), t.d(n, "kebobString", function() {
        return f
    }), t.d(n, "functionToString", function() {
        return h
    }), t.d(n, "fnToString", function() {
        return m
    }), t.d(n, "stringify", function() {
        return E
    }), t.d(n, "beforeAfterSubstr", function() {
        return T
    }), t.d(n, "hostRegex", function() {
        return R
    }), t.d(n, "stripLastPathElement", function() {
        return b
    }), t.d(n, "splitHash", function() {
        return P
    }), t.d(n, "splitQuery", function() {
        return A
    }), t.d(n, "splitEqual", function() {
        return S
    }), t.d(n, "trimHashVal", function() {
        return N
    }), t.d(n, "splitOnDelim", function() {
        return D
    }), t.d(n, "joinNeighborsR", function() {
        return I
    }), t.d(n, "Category", function() {
        return C
    }), t.d(n, "Trace", function() {
        return X
    }), t.d(n, "trace", function() {
        return j
    }), t.d(n, "DefType", function() {
        return F
    }), t.d(n, "Param", function() {
        return B
    }), t.d(n, "ParamTypes", function() {
        return z
    }), t.d(n, "StateParams", function() {
        return Z
    }), t.d(n, "ParamType", function() {
        return $
    }), t.d(n, "PathNode", function() {
        return W
    }), t.d(n, "PathUtils", function() {
        return Q
    }), t.d(n, "resolvePolicies", function() {
        return K
    }), t.d(n, "defaultResolvePolicy", function() {
        return J
    }), t.d(n, "Resolvable", function() {
        return ee
    }), t.d(n, "NATIVE_INJECTOR_TOKEN", function() {
        return ae
    }), t.d(n, "ResolveContext", function() {
        return oe
    }), t.d(n, "resolvablesBuilder", function() {
        return he
    }), t.d(n, "StateBuilder", function() {
        return ve
    }), t.d(n, "StateObject", function() {
        return Ee
    }), t.d(n, "StateMatcher", function() {
        return Te
    }), t.d(n, "StateQueueManager", function() {
        return Re
    }), t.d(n, "StateRegistry", function() {
        return be
    }), t.d(n, "StateService", function() {
        return An
    }), t.d(n, "TargetState", function() {
        return G
    }), t.d(n, "TransitionHookPhase", function() {
        return me
    }), t.d(n, "TransitionHookScope", function() {
        return ge
    }), t.d(n, "HookBuilder", function() {
        return Ie
    }), t.d(n, "matchState", function() {
        return Se
    }), t.d(n, "RegisteredHook", function() {
        return Ne
    }), t.d(n, "makeEvent", function() {
        return De
    }), t.d(n, "RejectType", function() {
        return r
    }), t.d(n, "Rejection", function() {
        return d
    }), t.d(n, "Transition", function() {
        return ye
    }), t.d(n, "TransitionHook", function() {
        return Ae
    }), t.d(n, "TransitionEventType", function() {
        return En
    }), t.d(n, "defaultTransOpts", function() {
        return bn
    }), t.d(n, "TransitionService", function() {
        return Pn
    }), t.d(n, "UrlMatcher", function() {
        return we
    }), t.d(n, "ParamFactory", function() {
        return Me
    }), t.d(n, "UrlMatcherFactory", function() {
        return Xe
    }), t.d(n, "UrlRouter", function() {
        return Fe
    }), t.d(n, "UrlRuleFactory", function() {
        return je
    }), t.d(n, "BaseUrlRule", function() {
        return $e
    }), t.d(n, "UrlService", function() {
        return Qe
    }), t.d(n, "ViewService", function() {
        return qe
    }), t.d(n, "UIRouterGlobals", function() {
        return Ve
    }), t.d(n, "UIRouter", function() {
        return Je
    }), t.d(n, "$q", function() {
        return Sn
    }), t.d(n, "$injector", function() {
        return On
    }), t.d(n, "BaseLocationServices", function() {
        return Mn
    }), t.d(n, "HashLocationService", function() {
        return jn
    }), t.d(n, "MemoryLocationService", function() {
        return Un
    }), t.d(n, "PushStateLocationService", function() {
        return kn
    }), t.d(n, "MemoryLocationConfig", function() {
        return qn
    }), t.d(n, "BrowserLocationConfig", function() {
        return Vn
    }), t.d(n, "keyValsToObjectR", function() {
        return yn
    }), t.d(n, "getParams", function() {
        return Cn
    }), t.d(n, "parseUrl", function() {
        return xn
    }), t.d(n, "buildUrl", function() {
        return Ln
    }), t.d(n, "locationPluginFactory", function() {
        return wn
    }), t.d(n, "servicesPlugin", function() {
        return Yn
    }), t.d(n, "hashLocationPlugin", function() {
        return Bn
    }), t.d(n, "pushStateLocationPlugin", function() {
        return zn
    }), t.d(n, "memoryLocationPlugin", function() {
        return Zn
    }), t.d(n, "UIRouterPluginBase", function() {
        return Wn
    })
}]);
//# sourceMappingURL=app.js.map