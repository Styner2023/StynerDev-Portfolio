(() => {
    "use strict";
    var e, t, s, o = {
            10(e, t, s) {
                s.d(t, {
                    K: () => r,
                    S: () => i
                });
                var o = s(754);
                const i = async () => {
                    const e = r();
                    if (!e) throw new Error("No supported audio format found");
                    var t;
                    return await (t = `/midi-js/examples/soundfont/acoustic_grand_piano-${e}.js`, new Promise((e, s) => {
                        const o = document.createElement("script");
                        o.src = t, o.onload = () => e(), o.onerror = s, document.head.appendChild(o)
                    })), window.MIDI.Soundfont.acoustic_grand_piano
                };

                function r() {
                    if ("undefined" == typeof Audio) return null;
                    const e = new Audio,
                        t = e.canPlayType('audio/ogg; codecs="vorbis"');
                    if (!("probably" !== t && "maybe" !== t || (0, o.W_)() || (0, o.xt)(18))) return "ogg";
                    const s = e.canPlayType("audio/mpeg");
                    return "probably" === s || "maybe" === s ? "mp3" : null
                }
            },
            207(e, t, s) {
                s.d(t, {
                    W: () => o,
                    i: () => i
                });
                const o = e => {
                        if (e < 0) throw new RangeError("Midi note needs to be a positive number");
                        const t = e % 12,
                            s = Math.floor(e / 12) - 1;
                        return `${["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"][t]}${s}`
                    },
                    i = async () => {
                        try {
                            return (await s.e(652).then(s.bind(s, 652))).default
                        } catch (e) {
                            const t = e instanceof Error ? e.message : String(e);
                            throw new Error(`Failed to load notes map: ${t}`)
                        }
                    }
            },
            391(e, t, s) {
                s.d(t, {
                    G: () => o
                });
                const o = new Map([
                    ["min", "ₘ"],
                    ["maj", ""],
                    ["dim", "ᵈⁱᵐ"],
                    ["aug", "ᵃᵘᶢ"],
                    ["maj7", "ᵐᵃʲ⁷"],
                    ["min7", "ₘ⁷"],
                    ["hdim7", "ₘ⁷𝄬⁵"],
                    ["dim7", "ᵈⁱᵐ⁷"],
                    ["minmaj7", "ₘᵐᵃʲ⁷"],
                    ["aug7", "ᵃᵘᶢ⁷"],
                    ["maj6", "⁶"],
                    ["min6", "ₘ⁶"],
                    ["maj9", "ᵐᵃʲ⁹"],
                    ["min9", "ₘ⁹"],
                    ["9", "⁹"],
                    ["min11", "ₘ¹¹"],
                    ["min13", "ₘ¹³"],
                    ["maj13", "ᵐᵃʲ¹³"],
                    ["sus4", "ˢᵘˢ⁴"],
                    ["sus2", "ˢᵘˢ²"],
                    ["7sus4", "⁷ˢᵘˢ⁴"],
                    ["7(#9)", "⁷𝄰⁹"],
                    ["7", "⁷"],
                    ["5", "⁵"],
                    ["11", "¹¹"],
                    ["13", "¹³"],
                    ["1", "¹"],
                    ["b", "♭"],
                    ["#", "♯"],
                    ["add", "ᵃᵈᵈ"],
                    ["no", "ⁿᵒ"],
                    ["(", "⁽"],
                    ["(", "⁾"],
                    [",", "˒"],
                    ["N", "𝄽"],
                    ["/", "/"]
                ])
            },
            984(e, t, s) {
                s.d(t, {
                    C5: () => r,
                    CR: () => i,
                    HP: () => o,
                    XO: () => n,
                    eF: () => d,
                    lC: () => h,
                    pO: () => a
                });
                const o = {
                        maj: [
                            ["A", "#"],
                            ["Bb", "b"],
                            ["B", "#"],
                            ["C", "#"],
                            ["Db", "b"],
                            ["D", "#"],
                            ["Eb", "b"],
                            ["E", "#"],
                            ["F", "b"],
                            ["F#", "#"],
                            ["G", "#"],
                            ["Ab", "b"]
                        ],
                        min: [
                            ["A", "#"],
                            ["Bb", "b"],
                            ["B", "#"],
                            ["C", "b"],
                            ["C#", "#"],
                            ["D", "b"],
                            ["Eb", "b"],
                            ["E", "#"],
                            ["F", "b"],
                            ["F#", "#"],
                            ["G", "b"],
                            ["G#", "#"]
                        ]
                    },
                    i = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"],
                    r = {
                        b: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
                        "#": ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
                    },
                    n = ["maj", "min", "7", "maj7", "min7", "sus4", "5", "dim", "sus2", "7sus4", "9", "7(#9)", "min9", "maj9", "maj6", "min6", "hdim7", "aug"],
                    a = {
                        latInverse: {
                            Do: "C",
                            Re: "D",
                            Mi: "E",
                            Fa: "F",
                            Sol: "G",
                            La: "A",
                            Si: "B",
                            N: "N"
                        },
                        latin: {
                            C: "Do",
                            D: "Re",
                            E: "Mi",
                            F: "Fa",
                            G: "Sol",
                            A: "La",
                            B: "Si",
                            N: "N"
                        }
                    },
                    d = function() {
                        const e = {
                            min: {},
                            maj: {}
                        };
                        for (let t = 0; t < o.min.length; t++) e.min[o.min[t][0]] = t, e.maj[o.maj[t][0]] = t;
                        return e
                    }(),
                    h = function() {
                        const e = {};
                        for (let t = 0; t < r.b.length; t++) e[r.b[t]] = t, e[r["#"][t]] = t;
                        return e
                    }()
            },
            80(e, t, s) {
                s.d(t, {
                    CB: () => d,
                    E4: () => w,
                    JA: () => C,
                    Ri: () => m,
                    ZB: () => p,
                    _G: () => n,
                    qO: () => u,
                    rI: () => y,
                    s2: () => f,
                    sG: () => l,
                    vS: () => v,
                    wG: () => c,
                    y$: () => h
                });
                var o = s(391),
                    i = s(984),
                    r = s(699);
                const n = e => {
                        const t = e.split(a);
                        return {
                            root: t[0],
                            extension: t[1],
                            bassNote: t[2] ? t[2] : void 0
                        }
                    },
                    a = /\/|:/,
                    d = ({
                        root: e,
                        extension: t,
                        bassNote: s
                    }) => `${e}:${t}${void 0!==s?`/${s}`:""}`,
                    h = (e, t) => {
                        if ("N" === e) return {
                            label: "𝄽"
                        };
                        const [s, i, n] = e.split(a), d = `${("english"===t?s:(0,r.F8)(s,t)).replace("#","♯").replace("b","♭")}${o.G.get(i)}`;
                        return void 0 === n ? {
                            label: d
                        } : {
                            label: d,
                            bass: `/${("english"===t?n:(0,r.F8)(n,t)).replace("#","♯").replace("b","♭")}`
                        }
                    };

                function l(e) {
                    switch (e) {
                        case "guitar":
                            return "capoGuitar";
                        case "mandolin":
                            return "capoMandolin";
                        case "ukulele":
                            return "capoUkulele"
                    }
                }
                const c = (e, t = !1, s, o) => {
                        const i = h(e, s),
                            r = document.createElement("div");
                        r.className = "chord", r.classList.toggle("nolabel", t);
                        const n = document.createElement("div");
                        n.className = "label-wrapper";
                        const a = document.createElement("span");
                        a.className = "chord-label", a.textContent = i.label;
                        const d = document.createElement("span");
                        return d.className = "bass-label", d.textContent = i.bass ? ? "", n.append(a, d), r.append(n), r.dataset.handle = e, r.dataset.i = o ? .toString(), r
                    },
                    u = (e, t) => void 0 === t ? e : i.C5[t][i.lC[e]],
                    p = e => {
                        if ("N" === e) return "N";
                        const t = n(e),
                            s = t.root.at(1) ? ? t.bassNote ? .at(1);
                        if (void 0 !== s) {
                            const e = "b" === s ? "#" : "b",
                                o = u(t.root, e),
                                i = t.bassNote,
                                r = void 0 !== i ? u(i, e) : void 0;
                            return d({
                                root: o,
                                extension: t.extension,
                                bassNote: r
                            })
                        }
                        return e
                    },
                    m = ({
                        extension: e,
                        bassNote: t
                    }) => ("maj" === e || "min" === e) && void 0 === t,
                    f = (e, t) => {
                        if ("N" === e) return !1;
                        if ("latin" !== t) return e.split("/")[0].length > 6;
                        const {
                            root: s,
                            extension: o
                        } = n(e);
                        return (0, r.uK)(s).length + o.length + 1 > 6
                    };

                function y(e) {
                    return e.trim().split("\n").map(g)
                }
                const g = e => {
                        const t = e.split(";");
                        return {
                            beat: parseInt(t[0], 10),
                            from: parseFloat(t[2]),
                            handle: t[1],
                            to: parseFloat(t[3])
                        }
                    },
                    v = e => t => e[t],
                    C = e => t => {
                        if (0 === t.length) return;
                        const s = t.data("i");
                        return void 0 !== s ? v(e)(s) : void 0
                    },
                    w = e => t => {
                        if (!t) return;
                        const s = t.dataset.i;
                        return void 0 !== s ? v(e)(parseInt(s, 10)) : void 0
                    }
            },
            699(e, t, s) {
                s.d(t, {
                    F8: () => a,
                    I6: () => h,
                    d5: () => d,
                    uK: () => r,
                    w$: () => n
                });
                var o = s(519),
                    i = s(984);
                const r = e => {
                        const t = e[0],
                            s = e[1];
                        return ((0, o.aE)(i.pO.latin, t) ? i.pO.latin[t] : t) + (s ? ? "")
                    },
                    n = e => {
                        switch (e) {
                            case "Bb":
                                return "B";
                            case "B":
                                return "H";
                            default:
                                return e
                        }
                    },
                    a = (e, t) => {
                        switch (t) {
                            case "english":
                                return e;
                            case "german":
                                return n(e);
                            case "latin":
                                return r(e)
                        }
                    },
                    d = (e, t) => {
                        switch (t) {
                            case "english":
                                return e;
                            case "german":
                                return (e => e.replace("B", "Bb").replace("H", "B"))(e);
                            case "latin":
                                return (e => {
                                    const t = e.replace(/(.+)b|#/, "$1"),
                                        s = (0, o.aE)(i.pO.latInverse, t) ? i.pO.latInverse[t] : void 0,
                                        r = "N" === s ? void 0 : s;
                                    return void 0 === r ? null : r + (e.match(/b|#/) ? ? " ")[0].trim()
                                })(e)
                        }
                    },
                    h = e => t => {
                        const s = "OSX" === t ? "&#x2318;" : "ctrl";
                        return `<div class="chord-edit-tooltip"><span class="icon-edit" title="${e.edit_this_chord}"></span><div class="chord-edit-move"><span class="icon-caret-left" title="${e.edit_move_left} (${s} + &#11013;)"></span><span class="icon-caret-right" title="${e.edit_move_right} (${s} + &#10145;)"></span><span class="icon-delete" title="${e.remove_chord}"></span><span class="icon-paste" title="Select multiple chords to copy and paste"></span></div><div class="chord-edit-search"><p class="search-title" title="${e.edit_explain_rootnote}">${e.edit_rootnote}</p><input class="chord-search-input search-root" type="text"/><p>-</p><p class="search-title">${e.edit_chordtype}</p><input class="chord-search-input search-extension" type="text"/><p>/</p><p class="search-title">${e.edit_bassnote}</p><input class="chord-search-input search-bassNote" type="text"></input><span class="icon-check" title="${e.edit_save_chord}"></span><div class="chord-search-lists"></div></div></div>`
                    }
            },
            754(e, t, s) {
                s.d(t, {
                    W_: () => a,
                    nr: () => r,
                    xt: () => n
                });
                const o = /^((?!chrome|android).)*safari/i,
                    i = /Version\/(\d+)/,
                    r = () => o.test(navigator.userAgent),
                    n = e => {
                        const t = (() => {
                            if (!r()) return null;
                            const e = i.exec(navigator.userAgent),
                                t = e ? parseInt(e[1], 10) : NaN;
                            return Number.isFinite(t) ? t : null
                        })();
                        return null !== t && t >= e
                    },
                    a = () => /Firefox/i.test(navigator.userAgent) && /Mobile|Tablet|Android/i.test(navigator.userAgent)
            },
            519(e, t, s) {
                function o(e, t) {
                    return Object.hasOwn(e, t)
                }
                s.d(t, {
                    aE: () => o
                })
            }
        },
        i = {};

    function r(e) {
        var t = i[e];
        if (void 0 !== t) return t.exports;
        var s = i[e] = {
            exports: {}
        };
        return o[e].call(s.exports, s, s.exports, r), s.exports
    }
    r.m = o, r.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, {
            a: t
        }), t
    }, t = Object.getPrototypeOf ? e => Object.getPrototypeOf(e) : e => e.__proto__, r.t = function(s, o) {
        if (1 & o && (s = this(s)), 8 & o) return s;
        if ("object" == typeof s && s) {
            if (4 & o && s.__esModule) return s;
            if (16 & o && "function" == typeof s.then) return s
        }
        var i = Object.create(null);
        r.r(i);
        var n = {};
        e = e || [null, t({}), t([]), t(t)];
        for (var a = 2 & o && s;
            ("object" == typeof a || "function" == typeof a) && !~e.indexOf(a); a = t(a)) Object.getOwnPropertyNames(a).forEach(e => n[e] = () => s[e]);
        return n.default = () => s, r.d(i, n), i
    }, r.d = (e, t) => {
        for (var s in t) r.o(t, s) && !r.o(e, s) && Object.defineProperty(e, s, {
            enumerable: !0,
            get: t[s]
        })
    }, r.f = {}, r.e = e => Promise.all(Object.keys(r.f).reduce((t, s) => (r.f[s](e, t), t), [])), r.u = e => e + "-lib-chunk." + {
        268: "8e65b63489310ba65230",
        472: "9f01080a5de0fc84343f",
        652: "a4f081c003507035b110",
        818: "6fac6ef9e833a3f97683",
        951: "ee76171e76f457caab3d",
        988: "252b0eccc1fa9d5f108e"
    }[e] + ".js", r.miniCssF = e => "../css-bundles/" + e + "-lib-chunk.f87b683242af5d360466.css", r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), s = {}, r.l = (e, t, o, i) => {
        if (s[e]) s[e].push(t);
        else {
            var n, a;
            if (void 0 !== o)
                for (var d = document.getElementsByTagName("script"), h = 0; h < d.length; h++) {
                    var l = d[h];
                    if (l.getAttribute("src") == e) {
                        n = l;
                        break
                    }
                }
            n || (a = !0, (n = document.createElement("script")).charset = "utf-8", r.nc && n.setAttribute("nonce", r.nc), n.src = e), s[e] = [t];
            var c = (t, o) => {
                    n.onerror = n.onload = null, clearTimeout(u);
                    var i = s[e];
                    if (delete s[e], n.parentNode && n.parentNode.removeChild(n), i && i.forEach(e => e(o)), t) return t(o)
                },
                u = setTimeout(c.bind(null, void 0, {
                    type: "timeout",
                    target: n
                }), 12e4);
            n.onerror = c.bind(null, n.onerror), n.onload = c.bind(null, n.onload), a && document.head.appendChild(n)
        }
    }, r.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.p = "/js-bundles/", (() => {
        if ("undefined" != typeof document) {
            var e = {
                722: 0
            };
            r.f.miniCss = (t, s) => {
                e[t] ? s.push(e[t]) : 0 !== e[t] && {
                    268: 1
                }[t] && s.push(e[t] = (e => new Promise((t, s) => {
                    var o = r.miniCssF(e),
                        i = r.p + o;
                    if (((e, t) => {
                            for (var s = document.getElementsByTagName("link"), o = 0; o < s.length; o++) {
                                var i = (n = s[o]).getAttribute("data-href") || n.getAttribute("href");
                                if ("stylesheet" === n.rel && (i === e || i === t)) return n
                            }
                            var r = document.getElementsByTagName("style");
                            for (o = 0; o < r.length; o++) {
                                var n;
                                if ((i = (n = r[o]).getAttribute("data-href")) === e || i === t) return n
                            }
                        })(o, i)) return t();
                    ((e, t, s, o, i) => {
                        var n = document.createElement("link");
                        n.rel = "stylesheet", n.type = "text/css", r.nc && (n.nonce = r.nc), n.onerror = n.onload = s => {
                            if (n.onerror = n.onload = null, "load" === s.type) o();
                            else {
                                var r = s && s.type,
                                    a = s && s.target && s.target.href || t,
                                    d = new Error("Loading CSS chunk " + e + " failed.\n(" + r + ": " + a + ")");
                                d.name = "ChunkLoadError", d.code = "CSS_CHUNK_LOAD_FAILED", d.type = r, d.request = a, n.parentNode && n.parentNode.removeChild(n), i(d)
                            }
                        }, n.href = t, document.head.appendChild(n)
                    })(e, i, 0, t, s)
                }))(t).then(() => {
                    e[t] = 0
                }, s => {
                    throw delete e[t], s
                }))
            }
        }
    })(), (() => {
        var e = {
            722: 0
        };
        r.f.j = (t, s) => {
            var o = r.o(e, t) ? e[t] : void 0;
            if (0 !== o)
                if (o) s.push(o[2]);
                else {
                    var i = new Promise((s, i) => o = e[t] = [s, i]);
                    s.push(o[2] = i);
                    var n = r.p + r.u(t),
                        a = new Error;
                    r.l(n, s => {
                        if (r.o(e, t) && (0 !== (o = e[t]) && (e[t] = void 0), o)) {
                            var i = s && ("load" === s.type ? "missing" : s.type),
                                n = s && s.target && s.target.src;
                            a.message = "Loading chunk " + t + " failed.\n(" + i + ": " + n + ")", a.name = "ChunkLoadError", a.type = i, a.request = n, o[1](a)
                        }
                    }, "chunk-" + t, t)
                }
        };
        var t = (t, s) => {
                var o, i, [n, a, d] = s,
                    h = 0;
                if (n.some(t => 0 !== e[t])) {
                    for (o in a) r.o(a, o) && (r.m[o] = a[o]);
                    d && d(r)
                }
                for (t && t(s); h < n.length; h++) i = n[h], r.o(e, i) && e[i] && e[i][0](), e[i] = 0
            },
            s = globalThis.webpackChunk = globalThis.webpackChunk || [];
        s.forEach(t.bind(null, 0)), s.push = t.bind(null, s.push.bind(s))
    })();
    var n = r(754),
        a = r(80);

    function d(e) {
        return [...e.parentNode ? .children ? ? []].indexOf(e)
    }

    function h(e, ...t) {
        if (e) return e instanceof HTMLCollection || e instanceof NodeList ? [...e].forEach(e => e.classList.add(...t)) : void e.forEach(e => e.classList.add(...t))
    }

    function l(e, ...t) {
        if (e) return e instanceof HTMLCollection || e instanceof NodeList ? [...e].forEach(e => e.classList.remove(...t)) : void e.forEach(e => e.classList.remove(...t))
    }

    function c(e) {
        const t = e.getBoundingClientRect(),
            s = document.documentElement;
        return {
            top: t.top + window.scrollY - s.clientTop,
            left: t.left + window.scrollX - s.clientLeft
        }
    }

    function u(e) {
        if (!(e instanceof HTMLElement)) throw new TypeError(`Expected ${e} to be HTMLElement`)
    }
    class p {
        constructor(e, t, s, o) {
            this.beat = e.beat, this.from = e.from, this.to = e.to, this.idx = t, this.handle = e.handle, this.hidden = s, this.handleParts = void 0 !== o ? o : "N" === this.handle ? void 0 : (0, a._G)(this.handle), this.checkOverflow = this.checkOverflow.bind(this), this.getEnharmonic = this.getEnharmonic.bind(this), this.getLeft = this.getLeft.bind(this), this.getTop = this.getTop.bind(this), this.getViewHandle = this.getViewHandle.bind(this), this.isRest = this.isRest.bind(this), this.isLastOnRow = this.isLastOnRow.bind(this), this.isSimple = this.isSimple.bind(this), this.setHandle = this.setHandle.bind(this), this.setHidden = this.setHidden.bind(this), this.updateLabel = this.updateLabel.bind(this);
            const i = this.getViewHandle();
            this.currentViewHandle = i, this.el = (0, a.wG)(i, s, Chordify.chordLang, t), this.labels = this.el.children[0].children
        }
        checkOverflow() {
            if (void 0 === Chordify.song ? .chords) return console.error(new Error("Chordify.song missing"));
            if (void 0 === this.handleParts ? .bassNote) return;
            const e = (0, a.vS)(Chordify.song.chords)(this.idx - 1),
                t = this.overflow;
            if (this.el.classList.remove("hidden-overflow"), this.hidden && e && e.overflow) this.overflow = !0;
            else if (this.hidden) this.overflow = !1;
            else {
                if ("" === window.getComputedStyle(this.labels[1], ":before").content) return; {
                    const e = this.el.getBoundingClientRect().width;
                    if (void 0 === e) return console.error("elWidth missing");
                    this.overflow = this.labels[0].offsetWidth + this.labels[1].offsetWidth > e
                }
            }
            if (this.overflow) {
                const e = (0, a.vS)(Chordify.song.chords)(this.idx + 1),
                    t = void 0 !== e && e.hidden;
                this.el.classList.toggle("hidden-overflow", this.isLastOnRow() || !t)
            }
            t !== this.overflow && this.el.classList.toggle("overflow", this.overflow)
        }
        getEnharmonic() {
            return (0, a.ZB)(this.handle)
        }
        getViewHandle() {
            if (void 0 === this.handleParts) return "N";
            const e = {
                root: (0, a.qO)(this.handleParts.root, Chordify.song ? .accidental),
                extension: this.handleParts.extension,
                bassNote: void 0 !== this.handleParts.bassNote ? (0, a.qO)(this.handleParts.bassNote, Chordify.song ? .accidental) : void 0
            };
            if (Chordify.isPremium) {
                const t = Chordify.premium.getCompensatedViewHandle(e);
                return (0, a.CB)(t)
            }
            return (0, a.CB)(e)
        }
        getLeft() {
            return this.left = this.left ? ? c(this.el).left, this.left
        }
        getTop() {
            return this.top = this.top ? ? c(this.el).top, this.top
        }
        isLastOnRow() {
            if (void 0 === Chordify.song ? .chords) throw new Error("song.chords missing");
            const e = (0, a.vS)(Chordify.song.chords)(this.idx + 1);
            return void 0 === e || !Chordify.diagramsVisible && e.getTop() !== this.getTop()
        }
        isRest() {
            return "N" === this.handle
        }
        isSimple() {
            return "N" === this.handle || void 0 !== this.handleParts && (0, a.Ri)(this.handleParts)
        }
        setHandle(e, t) {
            this.handle !== e && (this.handle = e, this.handleParts = "N" === e ? void 0 : (0, a._G)(e), this.el.dataset.handle = e, this.updateLabel()), void 0 !== t && this.setHidden(t)
        }
        setHidden(e) {
            this.hidden = e, this.el.classList.toggle("nolabel", e)
        }
        updateLabel() {
            const e = this.getViewHandle();
            if (e === this.currentViewHandle) return;
            this.currentViewHandle = e;
            const t = (0, a.y$)(e, Chordify.chordLang);
            this.labels[0].textContent = t.label, void 0 !== t.bass ? (this.labels[1].textContent = t.bass, setTimeout(this.checkOverflow, 0)) : (this.labels[1].textContent = "", this.overflow && (this.el.classList.remove("overflow", "hidden-overflow"), this.overflow = !1))
        }
    }
    const m = (e, t, s) => {
            let o;
            return s ? (...s) => {
                void 0 === o ? (e(...s), o = setTimeout(() => {
                    o = void 0
                }, t)) : (clearTimeout(o), o = setTimeout(() => {
                    o = void 0, e(...s)
                }, t))
            } : (...s) => {
                void 0 !== o && clearTimeout(o), o = setTimeout(() => {
                    o = void 0, e(...s)
                }, t)
            }
        },
        f = (e, t, s = 0) => {
            const o = Math.min(t, s),
                i = Math.max(t, s),
                r = (e - o) % (i - o + 1);
            return r >= 0 ? o + r : i + r + 1
        },
        y = (e, t) => {
            void 0 === t && (t = location.search), e = e.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
            const s = new RegExp(`[\\?&]${e}=([^&#]*)`).exec(t);
            return null != s && decodeURIComponent(s[1].replace(/\+/g, " "))
        };

    function g(e, t) {
        if (null == e) throw new TypeError(t ? ? `Expected 'val' to be defined, but received ${e}`)
    }
    new Map;
    var v = r(519);
    class C {
        currentTime = 0;
        isReady = !1;
        speeds = {};
        state = "stopped";
        constructor(e) {
            this.events = {}, this.type = e
        }
        on = (e, t) => (void 0 === this.events[e] && (this.events[e] = []), this.events[e].push(t), () => {
            this.events[e] = this.events[e].filter(e => e !== t)
        });
        fire = e => {
            for (const t in this.events[e.name]) this.events[e.name][t] && this.events[e.name][t](e)
        };
        getSpeedForTempo(e) {
            const t = `${e}`;
            if ((0, v.aE)(this.speeds, t)) return this.speeds[t]
        }
        findTempoKeyBySpeed(e) {
            for (const t in this.speeds)
                if ((0, v.aE)(this.speeds, t) && this.speeds[t] === e) return t
        }
    }
    class w extends C {
        offset = 0;
        isTweening = !1;
        constructor(e, t) {
            super(e), this.speeds = {
                "-5": .5,
                "-4": .6,
                "-3": .7,
                "-2": .8,
                "-1": .9,
                0: 1,
                1: 1.1,
                2: 1.2,
                3: 1.3,
                4: 1.4,
                5: 1.5
            }, this.streamUrl = E(e, t)
        }
        initialize() {
            this.initializeHowler()
        }
        async initializeHowler() {
            const {
                Howl: e
            } = await r.e(472).then(r.t.bind(r, 472, 23));
            this.howl = new e({
                src: [this.streamUrl],
                format: ["mp3"],
                html5: !0,
                autoplay: !1,
                loop: !1,
                volume: 1,
                preload: !0,
                onload: () => {
                    this.isReady = !0, this.fire({
                        name: "ready"
                    })
                },
                onplay: () => {
                    this.tween(), this.state = "playing", this.fire({
                        name: "play"
                    })
                },
                onpause: () => {
                    this.stopTween(), this.state = "paused", this.fire({
                        name: "pause"
                    })
                },
                onend: () => {
                    this.handlePlaybackEnd()
                },
                onstop: () => {
                    this.stopTween(), this.state = "paused", this.fire({
                        name: "pause"
                    })
                },
                onloaderror: (e, t) => {
                    const s = new Error("Loading stream failed", {
                        cause: t
                    });
                    this.state = "stopped", this.fire({
                        name: "error",
                        reason: s
                    })
                },
                onplayerror: (e, t) => {
                    const s = new Error("Playing stream errored", {
                        cause: t
                    });
                    this.state = "stopped", this.fire({
                        name: "error",
                        reason: s
                    })
                }
            })
        }
        handlePlaybackEnd = () => {
            this.state = "stopped", this.stopTween(), this.fire({
                name: "stop"
            })
        };
        stopTween = () => {
            this.isTweening = !1, clearInterval(this.timer)
        };
        tween = () => {
            !0 !== this.isTweening && (this.isTweening = !0, this.timer = setInterval(() => {
                this.currentTime = this.howl ? .seek() ? ? 0, this.fire({
                    name: "pulse",
                    currentTime: this.currentTime + this.offset
                })
            }, 50))
        };
        action = e => {
            switch (g(this.howl, "Howl not initialized"), e.name) {
                case "mute":
                    this.howl.mute();
                    break;
                case "pause":
                case "play":
                    void 0 !== e.seekTo && this.seek(e.seekTo), "play" === e.name && "playing" !== this.state && this.howl.play(), "pause" === e.name && this.howl.pause();
                    break;
                case "playHead":
                    this.seek(e.seekTo);
                    break;
                case "stop":
                    this.howl.stop();
                    break;
                case "volume":
                    this.howl.volume(e.volume);
                    break;
                default:
                    ! function() {
                        throw new TypeError("never??")
                    }()
            }
        };
        seek = e => {
            this.currentTime = Math.max(0, e - this.offset), this.howl ? .seek(this.currentTime)
        };
        setSpeedInternal = e => {
            const t = this.getSpeedForTempo(e);
            return void 0 !== t && (this.howl ? .rate(t), !0)
        };
        dispose() {
            this.stopTween(), this.howl ? .unload(), this.howl = void 0
        }
    }
    const E = (e, t) => {
        switch (e) {
            case "file":
            case "soundcloud":
                return `//${globalThis.location.host}/api/v2/songs/${t.pseudoid}/stream`;
            case "rocketsongs":
            case "url":
                return t.stream
        }
    };
    class b extends w {
        constructor(e) {
            super("url", e);
            const t = "undefined" == typeof window ? null : function() {
                const e = (decodeURIComponent(window.document.cookie).split("; ").filter(e => "dzT" === e.split("=")[0])[0] || "").split("=")[1];
                return "" !== e ? e : void 0
            }() ? ? null;
            t && (this.streamUrl = `${L(e)}/${t}`)
        }
    }
    const L = e => `//${globalThis.location.host}/stream/deezer/${e.externalid}`;
    class S extends Error {
        name = "ChordifyLibraryError"
    }

    function T(e, t) {
        throw new S((e => e instanceof Error && e.message.length > 0 ? e.message : "string" == typeof e && e.length > 0 ? e : "Unknown error")(e), {
            cause: e
        })
    }
    class k extends w {
        constructor(e) {
            super("soundcloud", e);
            let t = !1;
            this.on("error", () => {
                if (!t) {
                    t = !0;
                    const {
                        pseudoid: s
                    } = e;
                    fetch(`/song/checkDeleted/${s}`).catch(T)
                }
            })
        }
        dispose() {}
    }
    class I extends C {
        currentSpeed = 1;
        constructor() {
            super("virtual"), this.speeds = {
                "-5": .5,
                "-4": .6,
                "-3": .7,
                "-2": .8,
                "-1": .9,
                0: 1,
                1: 1.1,
                2: 1.2,
                3: 1.3,
                4: 1.4,
                5: 1.5
            }, this.isReady = !0
        }
        initialize = () => {
            this.fire({
                name: "ready"
            })
        };
        action = e => {
            switch (e.name) {
                case "play":
                    void 0 !== e.seekTo && (this.currentTime = e.seekTo), this.startTween(), this.state = "playing", this.fire({
                        name: "play"
                    });
                    break;
                case "pause":
                    this.stopTween(), this.state = "paused", this.fire({
                        name: "pause"
                    });
                    break;
                case "stop":
                    this.stopTween(), this.currentTime = 0, this.state = "stopped", this.fire({
                        name: "stop"
                    });
                    break;
                case "playHead":
                    this.currentTime = e.seekTo, "playing" === this.state && this.startTween()
            }
        };
        setSpeedInternal = e => {
            const t = this.getSpeedForTempo(e);
            return void 0 !== t && (this.currentSpeed = t, "playing" === this.state && this.startTween(), !0)
        };
        startTween = () => {
            this.stopTween(), this.timer = setInterval(() => {
                this.currentTime += .05 * this.currentSpeed, this.fire({
                    name: "pulse",
                    currentTime: this.currentTime
                })
            }, 50)
        };
        stopTween = () => {
            this.timer && (clearInterval(this.timer), this.timer = void 0)
        };
        dispose() {
            this.stopTween()
        }
    }
    window.YT = window.YT ? ? {
        PlayerState: {
            UNSTARTED: -1,
            ENDED: 0,
            PLAYING: 1,
            PAUSED: 2,
            BUFFERING: 3,
            CUED: 5
        }
    };
    class P extends Error {
        name = "YoutubePlayerError"
    }
    class D extends C {
        errorHandled = !1;
        isDisposed = !1;
        isUserInited = !1;
        realSpeed = 1;
        timers = {};
        warnAfterDispose = e => {};
        constructor(e) {
            super("youtube"), this.config = {
                controls: e.ytCtrl
            }, this.videoId = e.externalid, this.lastSeek = (new Date).getTime(), this.speeds = {
                "-2": .5,
                "-1": .75,
                0: 1,
                1: 1.25,
                2: 1.5,
                3: 1.75,
                4: 2
            }, this.on("speed", () => this.getPlaybackRate())
        }
        initialize = () => {
            this.isDisposed = !1, window.addEventListener("message", this.onMessage), this.loadWrappedPlayer(this.getEmbedUrl())
        };
        onMessage = e => {
            if (this.isDisposed) this.warnAfterDispose("onMessage");
            else if (!("string" == typeof e.data.source && e.data.source.indexOf("react-") > -1) && e.origin === window.embedHost) {
                const {
                    cmd: t,
                    parms: s
                } = e.data;
                switch (t) {
                    case "onReady":
                        this.onReady();
                        break;
                    case "onError":
                        this.onError(s[0]);
                        break;
                    case "onStateChange":
                        this.onStateChange(s[0]);
                        break;
                    case "onYouTubeIframeAPIReady":
                        this.onYouTubeIframeAPIReady();
                        break;
                    case "setCurrentTime":
                        this.setCurrentTime(s[0]);
                        break;
                    case "setCurrentSpeed":
                        this.setCurrentSpeed(s[0])
                }
            }
        };
        getPlaybackRate = () => {
            this.sendMessage({
                cmd: "getPlaybackRate"
            })
        };
        setPlaybackRate = e => {
            this.sendMessage({
                cmd: "setPlaybackRate",
                parms: [e]
            })
        };
        playVideo = () => {
            this.sendMessage({
                cmd: "playVideo"
            })
        };
        pauseVideo = () => {
            this.sendMessage({
                cmd: "pauseVideo"
            })
        };
        stopVideo = () => {
            this.sendMessage({
                cmd: "stopVideo"
            })
        };
        mute = () => {
            this.sendMessage({
                cmd: "mute"
            })
        };
        unMute = () => {
            this.sendMessage({
                cmd: "unMute"
            })
        };
        setVolume = e => {
            document.body.className.indexOf("ios") > -1 || this.sendMessage({
                cmd: "setVolume",
                parms: [e]
            })
        };
        loadWrappedPlayer = e => {
            const t = document.createElement("iframe");
            t.id = "embedWrapper", t.src = e, t.style.border = "none", t.style.height = "100%", t.style.width = "100%", t.scrolling = "no", t.allow = "autoplay";
            const s = (0, n.nr)() ? "strict-origin-when-cross-origin" : "no-referrer";
            t.referrerPolicy = s;
            const o = document.getElementById("youtube");
            g(o), o.innerHTML = "", o.append(t), this.iframeEl = t
        };
        getEmbedUrl = () => {
            let e = `${window.embedHost}/youtube_embed.html?20231023`;
            return window.needsConsent && (e += "&nocookie=1"), e
        };
        sendMessage = e => {
            g(this.iframeEl), document.contains(this.iframeEl) && this.iframeEl.contentWindow ? this.iframeEl.contentWindow.postMessage(e, "*") : (e.cmd, document.contains(this.iframeEl))
        };
        onReady = () => {
            this.isReady = !0, this.unMute(), this.setVolume(100), this.fire({
                name: "ready"
            })
        };
        onError = e => {
            const t = new P(`Youtube iframe API error code: ${e}`);
            this.fire({
                name: "error",
                reason: t
            }), this.errorHandled || (fetch(`/api/internal/analytics/youtubeError/youtube:${this.videoId}/${e}`, {
                method: "POST"
            }), this.errorHandled = !0)
        };
        setCurrentTime = e => {
            this.currentTime = e
        };
        onYouTubeIframeAPIReady = () => {
            this.sendMessage({
                cmd: "initPlayer",
                parms: [{
                    videoId: this.videoId,
                    config: this.config
                }]
            })
        };
        setCurrentSpeed = e => {
            this.realSpeed = e
        };
        onStateChange = e => {
            e === YT.PlayerState.UNSTARTED || (e === YT.PlayerState.BUFFERING ? this.state = "buffering" : e === YT.PlayerState.PLAYING ? ("playing" !== this.state && (this.state = "playing", this.fire({
                name: "play"
            })), this.tween()) : e === YT.PlayerState.PAUSED ? (this.state = "paused", this.fire({
                name: "pause"
            }), clearInterval(this.timers.pulseInterval)) : e === YT.PlayerState.ENDED && (this.state = "stopped", this.fire({
                name: "stop"
            }), clearInterval(this.timers.pulseInterval)))
        };
        tween = () => {
            "playing" === this.state && (clearInterval(this.timers.pulseInterval), this.timers.pulseInterval = window.setInterval(() => {
                if (this.isDisposed) return this.warnAfterDispose("tween interval tick"), void clearInterval(this.timers.pulseInterval);
                const e = (new Date).getTime();
                if (void 0 !== this.lastSeekDestination && e - this.lastSeek > 500) return this.seekTo(this.lastSeekDestination), void(this.lastSeekDestination = void 0);
                e - this.lastSeek < 500 || (this.currentTime += .02, this.currentTime > 0 && this.fire({
                    name: "pulse",
                    currentTime: this.currentTime
                }))
            }, 20))
        };
        seekTo = e => {
            if (this.isDisposed) return this.warnAfterDispose("seekTo"), !1;
            const t = (new Date).getTime();
            return t - this.lastSeek < 500 ? (this.lastSeek = t, this.lastSeekDestination = e, !1) : (0 === e && (e = 1e-4), this.isReady ? (this.lastSeek = t, this.sendMessage({
                cmd: "seekTo",
                parms: [e]
            }), this.tween(), void(this.currentTime = e)) : (clearTimeout(this.timers.seekRetryTimeout), this.timers.seekRetryTimeout = window.setTimeout(() => {
                this.timers.seekRetryTimeout = void 0, this.isDisposed ? this.warnAfterDispose("seekTo retry timeout") : this.seekTo(e)
            }, 500), void(this.currentTime = e)))
        };
        action = e => {
            if (this.isDisposed) this.warnAfterDispose("action");
            else {
                if (!this.isReady) return this.timers.queuedActionTimeout && clearTimeout(this.timers.queuedActionTimeout), void(this.timers.queuedActionTimeout = window.setTimeout(() => {
                    this.timers.queuedActionTimeout = void 0, this.action(e)
                }, 500));
                switch (e.name) {
                    case "play":
                        return "playing" !== this.state && this.playVideo(), void 0 !== e.seekTo && this.seekTo(e.seekTo), void(window.isTouch && !this.isUserInited && (clearTimeout(this.timers.touchBufferingTimeout), this.timers.touchBufferingTimeout = window.setTimeout(() => {
                            this.timers.touchBufferingTimeout = void 0, this.isDisposed ? this.warnAfterDispose("touch buffering timeout") : "buffering" !== this.state || this.isUserInited || this.pauseVideo()
                        }, 2e3)));
                    case "playHead":
                        return void this.seekTo(e.seekTo);
                    case "pause":
                        this.pauseVideo();
                        break;
                    case "stop":
                        this.stopVideo();
                        break;
                    case "mute":
                        e.mute ? this.mute() : this.unMute();
                        break;
                    case "volume":
                        {
                            const t = 100 * e.volume;this.setVolume(t);
                            break
                        }
                }
            }
        };
        setSpeedInternal = e => {
            if (!Chordify.isPremium || !this.isReady) return !1;
            const t = this.getSpeedForTempo(e);
            return void 0 !== t && (this.setPlaybackRate(t), this.timers.speedCheckTimeout && clearTimeout(this.timers.speedCheckTimeout), this.timers.speedCheckTimeout = window.setTimeout(() => {
                if (this.isDisposed) return void this.warnAfterDispose("speed check timeout");
                if (this.realSpeed === t || !Chordify.isPremium) return;
                const e = this.findTempoKeyBySpeed(this.realSpeed);
                Chordify.premium.tempo = void 0 !== e ? parseInt(e, 10) : Chordify.premium.tempo
            }, 1e3), !0)
        };
        dispose() {
            this.isDisposed = !0, clearInterval(this.timers.pulseInterval), this.timers.pulseInterval = void 0, clearTimeout(this.timers.queuedActionTimeout), this.timers.queuedActionTimeout = void 0, clearTimeout(this.timers.seekRetryTimeout), this.timers.seekRetryTimeout = void 0, clearTimeout(this.timers.touchBufferingTimeout), this.timers.touchBufferingTimeout = void 0, clearTimeout(this.timers.speedCheckTimeout), this.timers.speedCheckTimeout = void 0, this.lastSeekDestination = void 0, this.iframeEl ? .remove(), this.iframeEl = void 0, window.removeEventListener("message", this.onMessage)
        }
    }
    var x = r(10),
        R = r(207);
    const A = {
        Legacy: async () => {
            const {
                createChordPlayer: e
            } = await r.e(818).then(r.bind(r, 818));
            return e()
        },
        ToneJS: async () => {
            const [e, t, s] = await Promise.all([Promise.all([r.e(988), r.e(951)]).then(r.bind(r, 951)).then(e => e.createChordPlayer), (0, R.i)(), (0, x.S)()]), o = e(e => (0, v.aE)(t, e) ? t[e] : (T(new Error(`Unknown chord or note: ${e}`)), []), s);
            return await o.init(), o
        }
    };
    let M;

    function O(e, t, s) {
        const {
            innerHeight: o,
            innerWidth: i
        } = e, r = i > o;
        return 3 === t ? r && i <= 630 || i <= 498 ? 2 : 4 : i <= 720 || r && o <= 590 && i <= 850 || s && i >= 990 && i <= 1200 ? 2 : 4
    }
    const V = "countoff-counter";
    class B {
        boundary = null;
        currentChordEl = null;
        currentChordIndex = 0;
        dragStartEl = null;
        hasMoved = !1;
        hasTouchMoved = !1;
        isDragging = !1;
        loopEndEl = null;
        loopStartEl = null;
        playTime = 0;
        isReady = !1;
        chordHeight = 50;
        isCountingOff = !1;
        play30Dispatched = !1;
        playTS = null;
        scrollAreaHeight = 0;
        mediaInteractorUnsubscribes = [];
        constructor(e, t) {
            this.isEmbed = self.location.pathname.indexOf("/embed/") >= 0, this.type = e.type, window.addEventListener("resize", this.updateSizes), this.updateSizes(), this.mediaInteractor = t, this.mediaInteractorUnsubscribes.push(t.on("pause", this.handlePlayerPause), t.on("play", this.handlePlayerPlay), t.on("pulse", this.handlePlayerPulse), t.on("ready", this.handlePlayerReady), t.on("stop", this.handlePlayerStop), t.on("error", this.handlePlayerError));
            const s = document.querySelector("#chords");
            u(s), s.addEventListener("click", this.handleChordClick), s.addEventListener("touchend", this.handleChordClick), s.addEventListener("mousedown", this.handleChordDragStart), s.addEventListener("touchstart", this.handleChordDragStart), s.addEventListener("mouseover", this.handleChordDragMove), s.addEventListener("touchmove", this.handleChordDragMove), this.chordsEl = s, window.addEventListener("scroll", this.updateScrollTimeout, {
                passive: !0
            }), document.body.addEventListener("mouseup", this.handleDragRelease), document.body.addEventListener("touchend", this.handleDragRelease), document.addEventListener("keyup", this.handleKeyUp), document.addEventListener("keypress", this.handleKeyUp), document.addEventListener("keydown", this.handleKeyDown), this.action = e => t.action(e), this.currentTime = t.currentTime || 0, this.isReady = t.isReady, this.on = (e, s) => t.on(e, s), this.speeds = t.speeds
        }
        get state() {
            return this.mediaInteractor.state
        }
        initialize = e => {
            if ("rocketsongs" === e.type && this.handlePlayerPreviewRocketSongs(e), "virtual" === e.type) {
                const e = .8;
                this.chordPlayback = (M || (M = (() => {
                    let e, t, s, o, i = 0;
                    return {
                        get state() {
                            return i
                        },
                        initialize: async () => {
                            1 !== i && 2 !== i && (i = 1, e = await (async () => {
                                try {
                                    return await A.Legacy()
                                } catch (e) {
                                    const t = e instanceof Error ? e.message : String(e);
                                    throw new Error(`Failed to create chord player: ${t}`)
                                }
                            })(), i = 2, t = (e => {
                                function t(t) {
                                    if (!t.detail.chordChange || !Chordify.chordsLoaded) return;
                                    const {
                                        chordEl: s,
                                        source: o
                                    } = t.detail.chordChange, i = (0, a.E4)(Chordify.song.chords)(s);
                                    let r = i ? .handleParts;
                                    void 0 !== i && void 0 !== r && "N" !== i.handle && ("pulse" === o && s.classList.contains("nolabel") || (Chordify.isPremium && (r = Chordify.premium.getCompensatedSoundHandle(r)), e.play(r)))
                                }
                                return window.document.addEventListener("ChordifyLibrary", t), () => {
                                    window.document.removeEventListener("ChordifyLibrary", t)
                                }
                            })(e), "undefined" != typeof Chordify && Chordify.player && (s = Chordify.player.on("pause", () => e ? .stop())), void 0 !== o && (e.setVolume(o), o = void 0))
                        },
                        setVolume: t => {
                            e ? e.setVolume(t) : o = t
                        },
                        stop: () => {
                            e ? .stop()
                        },
                        dispose: () => {
                            t ? .(), s ? .(), e ? .stop(), e = void 0, i = 0
                        }
                    }
                })()), M), this.chordPlayback.initialize(), this.chordPlayback.setVolume(e), Chordify.dispatchEvent({
                    chordsVolume: e
                })
            }
            this.isEmbed || "youtube" !== e.type ? this.initMediaPlayer() : this.dispatchEvent({
                ready: !1
            })
        };
        createLoopOptions = e => {
            if (!Chordify.chordsLoaded) return console.error("Chords not loaded");
            const t = document.createElement("div");
            t.classList.add("loop-options"), t.innerHTML = `<a href="#" class="icon-delete edit-only"><a href="#copy" class="loop-copy edit-only">${Lang.copy}</a><a href="#remove" class="icon-close"></a>`, e.append(t);
            const s = parseInt(e.dataset.i ? ? "0") - 1,
                o = (0, a.vS)(Chordify.song.chords)(s),
                i = void 0 === o || o.isLastOnRow();
            "edit" === Chordify.songView && i && (t.style.right = "auto", t.style.left = "0")
        };
        findNearestChord(e) {
            if (!Chordify.chordsLoaded) return console.error(new Error("Chordify.song missing")), {
                _type: "NoChords"
            };
            const t = Chordify.song.chords;
            let s = this.currentChordIndex,
                o = t.at(s + 1);
            if (void 0 === o) return {
                _type: "NotFound"
            };
            const i = s > 1 && e + .5 < t[s].from;
            if (!i && e + .1 < o.from) return {
                _type: "NoJump"
            };
            if (i) {
                for (; e + .1 < t[s].from;)
                    if (void 0 === t[--s]) {
                        s++;
                        break
                    }
                return o = t.at(s), void 0 === o ? {
                    _type: "NotFound"
                } : {
                    _type: "Ahead",
                    chord: o,
                    index: s
                }
            }
            for (s++; void 0 !== o && void 0 !== t.at(s) && e + .1 >= o.to;) o = t.at(++s);
            return void 0 === o ? {
                _type: "NotFound"
            } : {
                _type: "Behind",
                chord: o,
                index: s
            }
        }
        dispatchEvent = e => {
            Chordify.dispatchEvent({
                player: e
            })
        };
        getPlayDuration = () => null === this.playTS ? null : Date.now() - this.playTS;
        handleArrowKeys = e => {
            if (!Chordify.chordsLoaded) return console.error("Chords not loaded");
            if ("playing" === this.mediaInteractor.state || Chordify.noPlayerSync || this.isCountingOff || null === this.currentChordEl) return;
            if (("ArrowDown" === e.key || "ArrowUp" === e.key) && "diagrams" === Chordify.songView) return;
            if (("ArrowLeft" === e.key || "ArrowRight" === e.key) && (e.metaKey || e.ctrlKey || e.altKey)) return;
            e.preventDefault();
            const t = document.querySelector(".chord-edit"),
                s = parseInt(t ? .dataset.i ? ? this.currentChordEl.dataset.i ? ? "0", 10),
                o = (() => {
                    if ("ArrowRight" === e.key) return s + 1;
                    if ("ArrowLeft" === e.key) return s - 1;
                    const t = O(window, Chordify.song.barLength, Chordify.hasWideChords),
                        o = Chordify.song.barLength * t;
                    return "ArrowDown" === e.key ? s + o : s - o
                })(),
                i = Chordify.song.chords.length - 1,
                r = Math.max(o, 0),
                n = Math.min(r, i),
                d = (0, a.vS)(Chordify.song.chords)(n) ? .el;
            d && ("edit" === Chordify.songView && Chordify.editJSLoaded ? Chordify.edit.openEditTooltip(d) : this.setCurrentChord(d), this.scrollToChord(d))
        };
        handleChordClick = e => {
            if ("touchend" === e.type) return this.hasTouchMoved ? void(this.hasTouchMoved = !1) : e.stopPropagation();
            if (null === e.target) return;
            u(e.target);
            const t = e.target.closest(".chord");
            if (null === t || null !== e.target.closest(".loop-options")) return void e.preventDefault();
            if ("edit" === Chordify.songView && Chordify.editJSLoaded) {
                if (null !== e.target.closest(".chord-edit-tooltip")) return;
                return Chordify.edit.openEditTooltip(t), void("playing" !== this.mediaInteractor.state && this.currentChordEl ? .classList.remove("currentChord"))
            }
            if (Chordify.noPlayerSync) return;
            const s = Chordify.countOffEnabled;
            if (this.isCountingOff && this.cancelCountOff(), s) return this.setCurrentChord(t), this.scrollToChord(t), void this.startCountOff();
            this.play(t), Chordify.dispatchEvent({
                chordChange: {
                    chordEl: t,
                    source: "click"
                }
            })
        };
        handleChordDragStart = e => {
            if ("mousedown" === e.type && 0 !== e.button) return;
            if ("touchstart" === e.type && !Chordify.canCreateLoop) return;
            if (null === e.target) return;
            u(e.target);
            const t = e.target.closest(".chord");
            if (null === t) return;
            const s = e.target.getAttribute("href");
            if ("#remove" === s) return Chordify.removeLoop(e), e.stopPropagation();
            if ("#copy" === s) {
                const e = document.querySelectorAll(".loop");
                return h(e, "loop-fade-in"), setTimeout(() => l(e, "loop-fade-in"), 200), void(this.isDragging = !1)
            }
            const o = t.classList.contains("loop-first") || t.classList.contains("loop-last");
            ("touchstart" !== e.type || o) && (!o && t.classList.contains("loop") || ("touchstart" === e.type && e.stopPropagation(), this.isDragging = !0, this.hasMoved = !1, this.dragStartEl = t, this.boundary = null, t.classList.contains("loop-first") ? this.boundary = "first" : t.classList.contains("loop-last") && (this.boundary = "last"), document.onselectstart = function() {
                return !1
            }))
        };
        handleChordDragMove = e => {
            if ("touchmove" === e.type && (this.hasTouchMoved = !0), !Chordify.canCreateLoop || this.hasTouchMoved && !this.isDragging) return;
            if (null === e.target) return;
            let t;
            if (t = "touchmove" === e.type ? (e => {
                    if (void 0 === e.touches || void 0 === e.changedTouches || !this.isDragging) return null;
                    e.preventDefault();
                    const t = e.touches[0] || e.changedTouches[0],
                        s = t.clientX,
                        o = t.clientY;
                    return document.elementFromPoint(s, o)
                })(e) : e.target.closest(".chord"), !t) return;
            if (e.stopPropagation(), !this.isDragging || !t.classList.contains("chord")) return;
            e.preventDefault(), this.hasMoved = !0;
            const s = document.getElementById("chords") ? .children;
            if (document.querySelector(".loop-options") ? .remove(), this.boundary && this.loopEndEl && this.loopStartEl) return "first" === this.boundary && d(t) > d(this.loopEndEl) ? (this.dragStartEl = this.loopEndEl, this.loopStartEl.classList.remove("loop-first"), this.loopStartEl = this.loopEndEl, this.loopStartEl.classList.add("loop-first"), this.boundary = "last") : "last" === this.boundary && d(t) < d(this.loopStartEl) && (this.dragStartEl = this.loopStartEl, this.loopEndEl.classList.remove("loop-last"), this.loopEndEl = this.loopStartEl, this.loopStartEl.classList.add("loop-last"), this.boundary = "first"), "first" === this.boundary ? this.loopStartEl = t : this.loopEndEl = t, l(s, "loop", `loop-${this.boundary}`), h([...s ? ? []].slice(d(this.loopStartEl), d(this.loopEndEl) + 1), "loop"), void t.classList.add(`loop-${this.boundary}`);
            if (!this.dragStartEl) return;
            l(s, "loop", "loop-last", "loop-first");
            const o = d(t),
                i = d(this.dragStartEl);
            h([...document.getElementById("chords") ? .children ? ? []].slice(Math.min(i, o), Math.max(i, o)), "loop"), t.classList.add("loop"), this.dragStartEl.classList.add("loop")
        };
        handleChordsRendered = e => {
            const t = () => {
                const e = document.getElementById("chords");
                if (!e) return 0;
                const t = e.getBoundingClientRect(),
                    s = document.documentElement,
                    o = t.top + window.scrollY - s.clientTop;
                return Math.round(o)
            };
            let s = t();
            window.document.addEventListener("ChordifyLibrary", function(e) {
                if (void 0 === e.detail.chordChange) return;
                if ("diagrams" === Chordify.songView) return;
                const o = t(),
                    i = o - s;
                0 !== i && (s = o, Chordify.offsetPositions(0, i))
            });
            const o = this.getSongScrollContainer();
            o && (o.addEventListener("scroll", this.updateScrollTimeout, {
                passive: !0
            }), this.songScrollContainer = o), this.setCurrentChord(e), this.updateSizes()
        };
        handleControlClick = e => {
            "play" === e ? this.togglePlay() : "rewind" === e && this.doRewind()
        };
        handleDragRelease = e => {
            document.onselectstart = null;
            const t = document.getElementById("chords"),
                s = t ? .querySelectorAll(".loop");
            return this.isDragging && this.hasMoved ? (this.isDragging = !1, this.hasMoved = !1, void 0 === s || s.length < 2 ? (Chordify.removeLoop(e), e.stopPropagation()) : (document.querySelector(".loop-options") ? .remove(), this.loopStartEl = s[0], this.loopStartEl.classList.add("loop-first"), this.loopEndEl = s[s.length - 1], this.loopEndEl.classList.add("loop-last"), this.createLoopOptions(this.loopEndEl), t ? .classList.add("chords-loop"), document.querySelector(".function-select button") ? .classList.add("active"), Chordify.loop = {
                hasLoop: !0,
                loopChords: [...s]
            }, "edit" !== Chordify.songView && this.play(this.loopStartEl), void Chordify.dispatchEvent({
                loop: {
                    enabled: !0,
                    end: parseInt(this.loopEndEl.dataset.i ? ? "0", 10),
                    start: parseInt(this.loopStartEl.dataset.i ? ? "0", 10)
                }
            }))) : (this.isDragging = !1, void(this.hasMoved = !1))
        };
        handleKeyDown = e => {
            if (e.target) {
                if (u(e.target), "input" === e.target.tagName.toLowerCase() || "textarea" === e.target.tagName.toLowerCase() || "a" === e.target.tagName.toLowerCase()) {
                    const t = "edit" === Chordify.songView && (" " === e.key || "Spacebar" === e.key) && e.target.classList.contains("chord-edit-input"),
                        s = e.target.classList.contains("volume-slider") && " " === e.key;
                    if (!t && !s) return
                }
                if ("Enter" === e.key && "edit" === Chordify.songView && Chordify.editJSLoaded) {
                    const e = document.querySelector(".chord-edit");
                    if (!e || !Chordify.chordsLoaded) return;
                    const t = (0, a.E4)(Chordify.song.chords)(e);
                    if (!t) return;
                    return Chordify.edit.openEditTooltip(e), void Chordify.edit.toggleTooltipInput(t)
                }
                if (" " === e.key || "Spacebar" === e.key) return e.preventDefault(), this.togglePlay(), e.stopPropagation();
                "ArrowDown" !== e.key && "ArrowLeft" !== e.key && "ArrowRight" !== e.key && "ArrowUp" !== e.key || this.handleArrowKeys(e)
            }
        };
        handleKeyUp = e => {
            if (null !== e.target && (u(e.target), "input" !== e.target.tagName.toLowerCase() && "textarea" !== e.target.tagName.toLowerCase() && "a" !== e.target.tagName.toLowerCase())) return " " === e.key || "Spacebar" === e.key ? (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), e.stopPropagation()) : void 0
        };
        handlePlayerPreviewRocketSongs = e => {
            const t = `//www.rocketsongs.com/TrackOwners/RS-artist/Songs/${e.externalid.replace(":c","")}/RS-song?utm_source=Chordify&amp;utm_medium=Banner&amp;utm_content=Purchase+licensed+version&amp;utm_campaign=Chordify`,
                s = document.createElement("div");
            s.setAttribute("style", "background:#ddd;padding: 50px 0;"), s.setAttribute("id", "rocketsongsNotification"), s.innerHTML = `<p style="margin: 0 auto;max-width:466px;">You just played along with a Rocket Songs preview clip. In order to play the whole song you need to <a href="${t}" target="_blank">purchase the licensed version at Rocket Songs</a></p>`;
            const o = document.getElementById("chordsArea");
            o ? .append(s)
        };
        handlePlayerReady = () => {
            this.isReady = !0, "1" === y("play") && this.mediaInteractor.action({
                name: "play"
            }), this.dispatchEvent({
                ready: !0
            })
        };
        handlePlayerPause = () => {
            document.getElementById("song") ? .classList.remove("playing");
            const e = document.querySelector(".chord-edit");
            "edit" === Chordify.songView && e && this.setCurrentChord(e), this.playTime += this.getPlayDuration() ? ? 0, this.playTS = null, this.dispatchEvent({
                event: "pause"
            }), this.chordPlayback ? .stop()
        };
        handlePlayerPlay = () => {
            document.getElementById("song") ? .classList.add("playing"), window.innerWidth < 930 && window.innerHeight < 600 && document.body.classList.add("collapsed"), this.playTS = Date.now(), this.dispatchEvent({
                event: "play"
            })
        };
        handlePlayerPulse = ({
            currentTime: e
        }) => {
            if (!Chordify.chordsLoaded || Chordify.noPlayerSync) return;
            (this.getPlayDuration() ? ? 0) / 1e3 >= 30 && !this.play30Dispatched && (this.play30Dispatched = !0, this.dispatchEvent({
                event: "play30"
            }));
            const t = this.findNearestChord(e);
            if ("Behind" !== t._type && "Ahead" !== t._type) return;
            if (this.currentTime = e, this.currentChordIndex = t.index, "Ahead" === t._type) return void this.setCurrentChord(t.chord.el);
            const s = t.chord;
            if (Chordify.loop.hasLoop && this.currentChordEl && this.currentChordEl.classList.contains("loop-last") && document.body.classList.contains("user-premium")) {
                const e = Chordify.loop.loopChords[0];
                this.setCurrentChord(e), Chordify.dispatchEvent({
                    chordChange: {
                        chordEl: e,
                        source: "loop"
                    }
                });
                const t = (0, a.E4)(Chordify.song.chords)(e) ? .from;
                return this.mediaInteractor.action({
                    name: "play",
                    seekTo: t
                }), void this.scrollToChord(this.currentChordEl)
            }
            Chordify.dispatchEvent({
                chordChange: {
                    chordEl: s.el,
                    source: "pulse"
                }
            }), this.setCurrentChord(s.el), this.scrolledRecently || "diagrams" !== Chordify.songView && "leadsheet" !== Chordify.songView && 1 !== s.beat || this.scrollToChord(s.el)
        };
        handlePlayerStop = () => {
            if (Chordify.loop.hasLoop && this.currentChordEl ? .classList.contains("loop")) return;
            if (document.getElementById("song") ? .classList.remove("playing"), !Chordify.chordsLoaded) return;
            const e = Chordify.song.chords[0].el;
            this.setCurrentChord(e), this.scrollToChord(e), this.playTime += this.getPlayDuration() ? ? 0, this.playTS = null, this.dispatchEvent({
                event: "stop"
            })
        };
        handlePlayerError = e => {
            document.dispatchEvent(new CustomEvent("mediaPlayerError", {
                detail: e.reason
            }))
        };
        pause = () => {
            this.mediaInteractor.action({
                name: "pause"
            }), this.chordPlayback ? .stop()
        };
        play = e => {
            if (this.initMediaPlayer(), !Chordify.chordsLoaded || !e) return this.mediaInteractor.action({
                name: "play"
            });
            this.setCurrentChord(e), this.scrollChordsInView();
            const t = (0, a.E4)(Chordify.song.chords)(e);
            this.mediaInteractor.action({
                name: "play",
                seekTo: t ? .from ? ? 0
            }), Chordify.dispatchEvent({
                chordChange: {
                    chordEl: e,
                    source: "play"
                }
            })
        };
        startCountOff = () => {
            if (!Chordify.chordsLoaded) return void console.error(new Error("Chordify.song missing"));
            this.dispatchEvent({
                event: "play"
            });
            const e = (0, a.E4)(Chordify.song.chords)(this.currentChordEl);
            e && "youtube" === this.type ? (this.mediaInteractor.action({
                name: "playHead",
                seekTo: e.from
            }), this.mediaInteractor.action({
                name: "pause"
            })) : e && this.mediaInteractor.action({
                name: "pause",
                seekTo: e.from
            });
            let t = Chordify.song.barLength;
            const s = 1e3 / (Chordify.song.getSongBPM() / 60);
            this.isCountingOff = !0;
            const o = document.createElement("div");
            o.id = V;
            const i = document.createElement("div");
            i.className = "coc-number", i.innerHTML = t.toString(), o.appendChild(i), document.body.appendChild(o);
            const r = window.setInterval(() => {
                if (t -= 1, 0 === t) return this.stopCountOff(), void this.play();
                i && Chordify.song && (i.innerHTML = t.toString()), this.playMetronome(!1)
            }, s);
            this.playMetronome(!0), this.countOffInterval = r
        };
        stopCountOff = () => {
            this.isCountingOff = !1, window.clearInterval(this.countOffInterval), document.getElementById(V) ? .remove()
        };
        cancelCountOff = () => {
            this.dispatchEvent({
                event: "pause"
            }), this.stopCountOff()
        };
        loadMetronome = () => {
            delete this.metronomeAccent, delete this.metronome, this.metronomeAccent = new Audio("/audio/metronome/click_c5.mp3"), this.metronome = new Audio("/audio/metronome/click_c4.mp3"), this.metronomeAccent.volume = .5, this.metronome.volume = .5
        };
        playMetronome = e => {
            this.loadMetronome();
            const t = e ? this.metronomeAccent : this.metronome;
            void 0 !== t ? t.play() : console.error("Missing metronome sound")
        };
        scrolledRecently = !1;
        songScrollContainer = null;
        updateScrollTimeout = () => {
            this.scrolledRecently = !0, clearTimeout(this.scrollTimeout), setTimeout(() => {
                this.scrolledRecently = !1
            }, 1e3)
        };
        scrollChordsInView = () => {
            if (window.innerWidth < 600) {
                const e = document.getElementById("song");
                e && (Chordify.diagramsVisible || 0 === this.currentChordIndex) && e.scrollIntoView({
                    behavior: "smooth"
                })
            } else Chordify.diagramsVisible && window.scrollTo({
                top: 0,
                behavior: "instant"
            });
            Chordify.chordsLoaded && this.currentChordEl && this.currentChordIndex > 0 && this.scrollToChord(this.currentChordEl)
        };
        scrollToChord = e => {
            if (!Chordify.chordsLoaded) return console.error("Chords not loaded");
            if ("diagrams" === Chordify.songView || "leadsheet" === Chordify.songView) {
                const t = c(e).left,
                    s = document.getElementById("chordsScrollbox");
                if (!s) return;
                const o = t - c(s).left,
                    i = 9,
                    r = 4 === O(window, Chordify.song.barLength, Chordify.hasWideChords) ? e.offsetWidth * Chordify.song.barLength + 2 * i : i,
                    n = s.scrollLeft + o - r;
                return void(s.scrollLeft = n)
            }
            const t = (0, a.E4)(Chordify.song.chords)(e);
            if (!t) return;
            const s = this.getSongScrollContainer(),
                o = s ? s.scrollTop : window.scrollY,
                i = t.el.getBoundingClientRect().top + o,
                r = document.getElementById("song-page-sticky-header"),
                n = o + (r ? .getBoundingClientRect().bottom ? ? 0),
                d = o + this.scrollAreaHeight,
                h = () => {
                    const e = (this.scrollAreaHeight >= 4 * this.chordHeight ? i - this.chordHeight - 20 : i - 20) - n;
                    Math.abs(e) < 2 || (s ? s.scrollBy({
                        top: e,
                        behavior: "smooth"
                    }) : window.scrollBy({
                        top: e,
                        behavior: "smooth"
                    }))
                };
            if (i < n) return h();
            const l = Chordify.song.chords.at(-1);
            l && (l.el.getBoundingClientRect().top + o + this.chordHeight < d || h())
        };
        seek = e => {
            let t;
            if (this.initMediaPlayer(), "number" == typeof e) {
                const s = this.findNearestChord(e);
                if ("Behind" !== s._type && "Ahead" !== s._type) return;
                t = s.chord
            } else t = e;
            this.setCurrentChord(t.el), this.scrollToChord(t.el), this.mediaInteractor.action({
                name: "playHead",
                seekTo: t.from
            }), this.currentTime = t.from, Chordify.dispatchEvent({
                chordChange: {
                    chordEl: t.el,
                    source: "seek"
                }
            })
        };
        setCurrentChord = e => {
            Chordify.chordsLoaded && e.classList.contains("chord") && (null !== this.currentChordEl && (this.currentChordEl.classList.remove("currentChord"), this.rerenderElementSafari(this.currentChordEl)), Chordify.noPlayerSync || (this.currentChordIndex = parseInt(e.dataset.i ? ? "0", 10), e.classList.add("currentChord"), this.rerenderElementSafari(e), this.currentChordEl = e))
        };
        rerenderElementSafari = e => {
            (0, n.xt)(16) && (e.style.opacity = "0.99", setTimeout(function() {
                e.style.opacity = "1"
            }, 20))
        };
        doRewind = () => {
            Chordify.chordsLoaded && this.setCurrentChord(Chordify.song.chords[0].el), this.currentTime = 0;
            const e = (this.isCountingOff || "playing" === this.mediaInteractor.state) && Chordify.countOffEnabled && "edit" !== Chordify.songView;
            this.isCountingOff && this.cancelCountOff(), e ? this.startCountOff() : this.mediaInteractor.action({
                name: "playHead",
                seekTo: 0
            }), Chordify.diagramsVisible && document.getElementById("chordsScrollbox") ? .scrollTo({
                left: 0,
                behavior: "smooth"
            }), this.scrollChordsInView()
        };
        togglePlay = () => {
            const e = "playing" === this.mediaInteractor.state || this.isCountingOff ? "pause" : "play";
            if (Chordify.noPlayerSync) return "play" === e ? this.play() : this.pause();
            if (!Chordify.chordsLoaded) return console.warn("Chords not loaded");
            if (this.currentChordEl || (this.currentChordEl = Chordify.song.chords[0].el), "edit" === Chordify.songView && "play" === e) {
                const e = document.querySelector(".chord-edit"),
                    t = null === e ? this.currentChordEl : e;
                return void this.play(t)
            }
            return "play" === e && Chordify.countOffEnabled && !1 === this.isCountingOff ? (this.scrollToChord(this.currentChordEl), void this.startCountOff()) : (this.isCountingOff && this.cancelCountOff(), "play" === e ? this.play(this.currentChordEl) : this.pause())
        };
        getSongScrollContainer = () => {
            const e = document.getElementById("song");
            return e && e.scrollHeight > e.clientHeight ? e : null
        };
        updateSizes = () => {
            if (Chordify.diagramsVisible || !Chordify.chordsLoaded) return;
            const e = this.getSongScrollContainer();
            if (e) this.scrollAreaHeight = e.clientHeight;
            else if (this.scrollAreaHeight = window.innerHeight, Chordify.lyricsVisible && "chords" === Chordify.songView) {
                const e = 230,
                    t = document.getElementById("lyrics-root");
                this.scrollAreaHeight -= t ? .offsetHeight ? ? e
            } else(window.innerWidth < 990 && window.innerHeight > 590 || this.isEmbed) && (this.scrollAreaHeight -= 200);
            const t = this.currentChordEl ? ? Chordify.song.chords[0].el;
            this.chordHeight = t.offsetHeight
        };
        mediaInitialized = !1;
        initMediaPlayer = () => {
            this.mediaInitialized || (this.mediaInteractor.initialize(), this.mediaInitialized = !0)
        };
        dispose = () => {
            this.mediaInteractorUnsubscribes.forEach(e => e()), this.mediaInteractorUnsubscribes = [], window.removeEventListener("resize", this.updateSizes), window.removeEventListener("scroll", this.updateScrollTimeout), this.songScrollContainer ? .removeEventListener("scroll", this.updateScrollTimeout), document.body.removeEventListener("mouseup", this.handleDragRelease), document.body.removeEventListener("touchend", this.handleDragRelease), document.removeEventListener("keyup", this.handleKeyUp), document.removeEventListener("keypress", this.handleKeyUp), document.removeEventListener("keydown", this.handleKeyDown), this.chordsEl.removeEventListener("click", this.handleChordClick), this.chordsEl.removeEventListener("touchend", this.handleChordClick), this.chordsEl.removeEventListener("mousedown", this.handleChordDragStart), this.chordsEl.removeEventListener("touchstart", this.handleChordDragStart), this.chordsEl.removeEventListener("mouseover", this.handleChordDragMove), this.chordsEl.removeEventListener("touchmove", this.handleChordDragMove), void 0 !== this.countOffInterval && (clearInterval(this.countOffInterval), this.countOffInterval = void 0), this.mediaInteractor.dispose(), M ? .dispose(), M = void 0
        }
    }
    var N = r(984);
    class H {
        chordsByChordLevel = {};
        get canSimplify() {
            return "simple" === this.chordLevel || this.hasComplexChords()
        }
        constructor(e, t, s) {
            this.barLength = e.chordInfo.barLength, this.derivedBpm = e.chordInfo.derivedBpm, this.derivedKey = e.chordInfo.derivedKey, this.editUserId = e.chordInfo.editUserId ? ? void 0, this.versionId = e.versionId, this.id = e.pseudoId, this.chordLevel = t, this.edit = {
                accidental: void 0,
                offset: 0
            }, this.anacrusisPadding = 0;
            const [o, i] = this.derivedKey.split(":");
            if ("maj" !== (r = i) && "min" !== r) throw new Error(`Invalid interval: ${i}`);
            var r;
            if (!((e, t) => Object.hasOwn(N.eF[t], e))(o, i)) throw new Error(`Invalid root note: ${o} for interval: ${i}`);
            const n = f(N.eF[i][o] + s, 0, 11),
                [a, d] = N.HP[i][n];
            this.key = {
                accidental: d,
                interval: i,
                root: a
            }, this.setChordLevelChords(t, e.chords)
        }
        getChordAtTime = (e, t = 0) => {
            if (!this.chords) return;
            const s = this.chords;
            let o;
            return o = e >= s[s.length - 1].to ? s[s.length - 1].idx : s.find(t => t.to > e) ? .idx, void 0 !== o && o + t >= 0 ? s[o + t] : void 0
        };
        getElementIdx = e => {
            const t = document.getElementById("chords");
            return t ? [...t.children].findIndex(t => t === e.el) : 0
        };
        getSongBPM = () => {
            const e = Chordify.isPremium ? Chordify.premium.getPlayerSpeed() : null;
            return null !== e ? Math.round(e * this.derivedBpm) : this.derivedBpm
        };
        hasChordsForLevel = e => e in this.chordsByChordLevel;
        getSongKeyHandle = () => (0, a.CB)({
            root: this.key.root,
            extension: this.key.interval
        });
        invalidateChordLevelChords = () => {
            this.chordsByChordLevel = {}
        };
        addLineBreak = e => {
            const t = this.getElementIdx(e),
                s = O(window, this.barLength, Chordify.hasWideChords),
                o = this.barLength * s,
                i = o - 1 - (t - 1) % o + (e.beat - 1) + o;
            for (let t = 0; t < i; t++) {
                const t = document.createElement("div");
                t.className = "chord fake-chord section-padder", e.el.insertAdjacentElement("beforebegin", t)
            }
        };
        removeSections = () => {
            const e = document.getElementsByClassName("section-padder");
            for (let t = e.length - 1; t >= 0; --t) e[t].remove();
            Chordify.resetPositions(), Chordify.updateChordView(!1)
        };
        renderSection = e => {
            if (!Chordify.chordsLoaded) return console.error(new Error("chords not loaded"));
            const t = this.getChordAtTime(e.begin),
                s = this.getChordAtTime(e.end);
            t && s && (void 0 === (0, a.vS)(Chordify.song.chords)(s.idx + 1) || (this.addLineBreak(s), Chordify.resetPositions()))
        };
        renderSections = e => {
            e.forEach(this.renderSection)
        };
        setBarLength = e => {
            if (this.barLength = e, this.anacrusisPadding > e - 1) {
                const t = this.anacrusisPadding % (e - 1);
                if (Chordify.editJSLoaded) Chordify.edit.shiftChords(t);
                else {
                    const e = t - (this.anacrusisPadding - this.edit.offset);
                    this.setOffset(e)
                }
            }
        };
        setChordLevel = e => {
            this.chordLevel !== e && (this.chordLevel = e, this.updateChordsToChordLevel(e))
        };
        setChordLevelChords = (e, t) => {
            0 !== t.length && (this.chordsByChordLevel[e] = t.reduce((e, t, s) => (e[s] = t.handle, e), {}))
        };
        setEditData = e => {
            e.offset && (this.edit.offset = e.offset), void 0 !== e.accidental && null !== e.accidental && Chordify.changeAccidental("flat" === e.accidental ? "b" : "#")
        };
        setOffset = e => {
            const t = e - this.edit.offset,
                s = this.anacrusisPadding + t;
            this.anacrusisPadding = f(s, 0, this.barLength - 1), this.edit.offset = e, this.chords ? .forEach(e => {
                e.beat = e.beat + t
            })
        };
        shiftRoot = (e, t) => {
            const s = f(N.lC[e] + t, 0, 11),
                o = this.accidental ? ? this.key.accidental;
            return N.C5[o][s]
        };
        updateChordsToChordLevel = e => {
            if (!Chordify.chordsLoaded) return console.error(new Error("chords not loaded"));
            const t = this.chordsByChordLevel[e];
            if (void 0 === t) return void console.error(new Error(`chords for level ${e} not found`));
            const s = Chordify.song.chords;
            for (const e in t) {
                const o = t[e],
                    i = (0, a.vS)(s)(parseInt(e, 10));
                i && i.setHandle(o)
            }
            Chordify.updateChordView(!1)
        };
        getCurrentEditUser() {
            if (Chordify.editJSLoaded && Chordify.edit.editChanged) return Chordify.userId;
            const e = y("edit");
            return !1 !== e && "original" !== e ? e : void 0
        }
        hasComplexChords() {
            return !!this.chords && this.chords.some(e => !e.isSimple())
        }
    }
    class $ extends Error {
        constructor() {
            super("missing player")
        }
    }

    function _(e) {
        const t = e.target.name;
        q.forEach(e => e.classList.remove("active")), Chordify.changeInstrument(t), W(), document.querySelector(`.instruments button[name="${t}"]`) ? .classList.add("active")
    }
    window.Chordify = new class {
        constructor(e) {
            const {
                chordLang: t,
                userId: s,
                userPreferences: o
            } = e;
            this.canCreateLoop = !1, this.capoSetting = 0, this.chordLang = "english", this.chordsLoaded = !1, this.countOffEnabled = !1, this.diagramView = "animated", this.hasWideChords = !1, this.isPremium = !1, this.loop = {
                hasLoop: !1
            }, this.maxDuration = -1, this.maxDurationReached = !1, this.noPlayerSync = !1, this.playerInitialized = !1, this.transposeSetting = 0;
            const {
                promise: i,
                resolve: r
            } = Promise.withResolvers();
            this.domElementReady = i, this.renderChordsToEl = r, this.chordLang = t, this.userId = s, this.songView = o ? .preferredSongView ? ? void 0, this.diagramsVisible = "diagrams" === this.songView, this.instrument = o ? .preferredInstrument ? ? void 0, this.userSongSettings = {}, o ? .userSongSettings && void 0 !== o.preferredInstrument && this.setUserSongSettings(o.userSongSettings, o.preferredInstrument), this.updateChordView = m(this.updateChordView, 300, !0)
        }
        changeAccidental = e => {
            if (void 0 === this.song) return console.error(new Error("Chordify.song missing"));
            this.song.accidental !== e && (this.song.accidental = e, this.updateChordView(!0))
        };
        changeDiagramView = e => {
            this.noPlayerSync && "animated" === e || (this.diagramView = e, this.dispatchEvent({
                diagramView: e
            }))
        };
        changeInstrument = e => {
            if (e !== this.instrument && (this.instrument = e, this.dispatchEvent({
                    instrument: e
                }), Chordify.isPremium)) {
                const t = (0, a.sG)(e);
                if (void 0 === t) return Chordify.premium.changeCapo(0);
                const s = this.userSongSettings[t] ? ? 0;
                Chordify.premium.changeCapo(s)
            }
        };
        changeSections = e => {
            Chordify.dispatchEvent({
                sections: e
            })
        };
        changeView = e => {
            if (this.songView === e) return;
            const t = this.diagramsVisible,
                s = this.songView;
            this.diagramsVisible = "diagrams" === e, this.songView = e, this.dispatchEvent({
                songView: e
            }), "edit" !== s && "edit" !== this.songView || this.toggleEdit(), "edit" === s && this.updateChordView(!1), this.player && this.chordsLoaded && (this.player.updateSizes(), this.player.scrollChordsInView()), this.chordsLoaded && t !== this.diagramsVisible && this.updateOverflow(!1)
        };
        disablePlayerSync = () => {
            this.noPlayerSync = !0, this.changeDiagramView("summary");
            const e = this.player ? .currentChordEl ? ? document.querySelector("#chords .chord");
            e && this.player ? .setCurrentChord(e)
        };
        dispatchEvent = async e => {
            await this.domElementReady, document.dispatchEvent(new CustomEvent("ChordifyLibrary", {
                detail: e
            }))
        };
        chordsLoadedCallbacks = [];
        doWhenChordsLoaded = e => Chordify.chordsLoaded ? (e(Chordify.song), () => {}) : (this.chordsLoadedCallbacks.push(e), () => {
            this.chordsLoadedCallbacks = this.chordsLoadedCallbacks.filter(t => t !== e)
        });
        setChordsLoaded() {
            if (this.chordsLoaded = !0, !Chordify.chordsLoaded) return;
            const e = Chordify.song;
            this.chordsLoadedCallbacks.forEach(t => {
                t(e)
            }), this.chordsLoadedCallbacks = []
        }
        initLoop = () => this.doWhenChordsLoaded(e => {
            if (void 0 === this.player) return console.error(new $);
            const t = document.querySelector(".currentChord, .chord-edit"),
                s = document.querySelector("#chords .chord"),
                o = t ? ? s;
            if (!o) return;
            document.getElementById("chords") ? .classList.add("chords-loop"), this.canCreateLoop = !0;
            const i = (0, a.E4)(e.chords)(o) ? .idx ? ? 0,
                r = Math.min(i + 4 * e.barLength - 1, e.chords.length - 1),
                n = [];
            for (let t = i; t <= r; t++) {
                const s = (0, a.vS)(e.chords)(t);
                if (!s) break;
                const o = s.el;
                o.classList.add("loop"), n.push(o)
            }
            this.player.loopStartEl = o, this.player.loopStartEl.classList.add("loop-first"), this.player.loopEndEl = n[n.length - 1], this.player.loopEndEl.classList.add("loop-last"), this.player.createLoopOptions(this.player.loopEndEl), this.loop = {
                hasLoop: !0,
                loopChords: n
            }, this.dispatchEvent({
                loop: {
                    enabled: !0,
                    end: r,
                    start: i
                }
            })
        });
        removeLoop = e => {
            this.player ? (l(document.getElementsByClassName("loop"), "loop", "loop-first", "loop-last"), document.querySelector(".loop-options") ? .remove(), document.getElementById("chords") ? .classList.remove("chords-loop"), document.querySelector(".function-select button") ? .classList.remove("active"), this.loop = {
                hasLoop: !1
            }, this.player.hasMoved = !1, this.player.isDragging = !1, this.player.boundary = null, "edit" !== this.songView && (this.canCreateLoop = !1), void 0 !== e && (e.stopImmediatePropagation(), e.preventDefault(), e.stopPropagation()), this.dispatchEvent({
                loop: {
                    enabled: !1
                }
            })) : console.error(new $)
        };
        initPlayer = e => {
            const t = (e => {
                const {
                    type: t
                } = e;
                switch (t) {
                    case "deezer":
                        return new b(e);
                    case "virtual":
                        return new I;
                    case "youtube":
                        return new D(e);
                    case "soundcloud":
                        return new k(e);
                    default:
                        return new w(t, e)
                }
            })(e);
            this.player = new B(e, t), this.player.initialize(e), this.playerInitialized = !0
        };
        initSong = async (e, t) => {
            this.song = new H(e, t, this.transposeSetting);
            const s = this.renderChords(e.chords);
            this.doWhenChordsLoaded(e => {
                this.dispatchEvent({
                    chords: e.chords
                })
            });
            const o = await this.domElementReady;
            this.attachChordsToDOM(s, o)
        };
        renderChords = e => {
            if (void 0 === this.song) throw new Error("Chordify.song missing");
            const t = [];
            this.song.chords = t, this.maxDuration = document.body.classList.contains("user-premium") ? 1800 : 600, this.maxDurationReached = !1;
            let s = !0,
                o = null;
            const i = [],
                r = !1 !== y("version_id"),
                n = "simple" === this.song.chordLevel && !r;
            let d = !0;
            for (let r = 0; r < e.length; r++) {
                const h = e[r],
                    {
                        beat: l,
                        handle: c
                    } = h;
                if (1 === l && (s = !1), s) {
                    const e = l - 1;
                    for (let t = 0; t < e; t++) {
                        const e = document.createElement("div");
                        e.className = "fake-chord", i.push(e)
                    }
                    this.song.anacrusisPadding = e, s = !1
                }
                const u = o === c || o === (0, a.ZB)(c);
                let m = !1;
                const f = new p(h, r, u);
                t[r] = f, i.push(f.el), this.checkMaxDuration(f, e.length), m = n || f.isSimple(), d = d && m, this.hasWideChords = this.hasWideChords || !m && (0, a.s2)(c, this.chordLang), o = c
            }
            const h = document.createElement("div");
            return h.className = "chord", i.push(h), i
        };
        attachChordsToDOM = (e, t) => {
            const s = this.song,
                o = s ? .chords;
            if (void 0 === s || void 0 === o) return console.error(new Error("Chordify.song missing"));
            this.hasWideChords && t.classList.add("wide-chords"), t.innerHTML = "", e.forEach(e => t.appendChild(e)), t.scrollTo({
                left: 0
            }), o.forEach(e => e.checkOverflow());
            const i = document.querySelector(".max-duration");
            if (!this.diagramsVisible && this.maxDurationReached && i instanceof HTMLElement) {
                const e = document.getElementById("chordsArea") ? .getBoundingClientRect().width;
                i.style.width = `${e??-50}px`
            }
            this.setChordsLoaded(), s.canSimplify && this.updateOverflow(!0), this.player && o[0] && this.player.handleChordsRendered(o[0].el);
            let r = window.innerWidth;
            window.addEventListener("resize", m(() => {
                r !== window.innerWidth && (r = window.innerWidth, this.updateOverflow())
            }, 100, !1))
        };
        maxDurationReached = !1;
        checkMaxDuration = (e, t) => {
            if (void 0 === this.song) return console.error(new Error("Chordify.song missing"));
            const s = e.idx + this.song.anacrusisPadding,
                o = t + this.song.anacrusisPadding;
            if (!this.maxDurationReached && e.from > this.maxDuration && s % (4 * this.song.barLength) == 0 && s + 4 * this.song.barLength < o) {
                this.maxDurationReached = !0;
                const t = document.createElement("div");
                t.className = "max-duration", t.innerHTML = `<p>${Lang.max_duration}</p><a href="/premium" class="button-premium">${Lang.go_premium}</a>`;
                const s = document.getElementById("chordsArea") ? .getBoundingClientRect().width;
                t.style.width = `${s??-50}px`, e.el.append(t)
            }
            this.maxDurationReached && (e.setHidden(!0), e.el.style.setProperty("background", "rgba(250,250,250,0.5)", "important"))
        };
        setUserSongSettings = (e, t) => {
            const s = (0, a.sG)(t);
            this.transposeSetting = e.transpose ? ? 0, this.transposeSetting = f(this.transposeSetting, -5, 6), this.capoSetting = void 0 !== s ? e[s] ? ? 0 : 0, this.dispatchEvent({
                capo: this.capoSetting,
                transpose: this.transposeSetting
            })
        };
        toggleCountOff = e => {
            if (this.countOffEnabled = e ? ? !this.countOffEnabled, this.dispatchEvent({
                    countOff: this.countOffEnabled
                }), void 0 === this.player) return console.error("this.player missing");
            this.player.loadMetronome()
        };
        updateOverflow = (e = !0) => {
            if (!Chordify.chordsLoaded) return console.error("Chords not loaded");
            const t = Chordify.song.chords;
            Chordify.song.chords.forEach(s => {
                if (!e) {
                    const e = (0, a.vS)(t)(s.idx + 1);
                    if (e && !e.isLastOnRow()) return
                }
                s.checkOverflow()
            })
        };
        editJSState = "idle";
        get editJSLoaded() {
            return "ready" === this.editJSState
        }
        toggleEdit = async () => {
            var e;
            if ("loading" !== this.editJSState)
                if (Chordify.editJSLoaded) Chordify.edit.toggleEditMode();
                else try {
                    this.editJSState = "loading", await (e = "/js/jquery.min-2.0.3.js", document.querySelector(`script[src="${e}"]`) ? Promise.resolve() : new Promise((t, s) => {
                        const o = document.createElement("script");
                        o.src = e, o.onload = () => t(), o.onerror = s, document.head.appendChild(o)
                    })), await r.e(268).then(r.bind(r, 268)), this.editJSState = "ready", this.toggleEdit()
                } catch (e) {
                    this.editJSState = "idle", console.error(e)
                }
        };
        toggleLyricsVisible = e => {
            this.lyricsVisible !== e && (this.lyricsVisible = e, this.player ? .updateSizes(), this.dispatchEvent({
                lyrics: this.lyricsVisible
            }))
        };
        offsetPositions = (e, t) => {
            if (!Chordify.chordsLoaded) return console.error("Chords not loaded");
            Chordify.song.chords.forEach(s => {
                s.left = (s.left ? ? 0) + e, s.top = (s.top ? ? 0) + t
            })
        };
        resetPositions = () => {
            if (!Chordify.chordsLoaded) return console.error("Chords not loaded");
            Chordify.song.chords.forEach(e => {
                const t = c(e.el);
                e.left = t.left, e.top = t.top
            })
        };
        updateChordView = e => {
            this.doWhenChordsLoaded(t => {
                let s = !y("version_id");
                this.hasWideChords = !1;
                let o = "";
                t.chords.forEach(t => {
                    !t.isRest() && e && t.updateLabel();
                    const i = t.currentViewHandle;
                    t.setHidden(i === o), o = i, s = s && t.isSimple(), this.hasWideChords = this.hasWideChords || (0, a.s2)(t.handle, this.chordLang)
                });
                const i = document.getElementById("chords");
                i ? .classList.toggle("wide-chords", this.hasWideChords), this.dispatchEvent({
                    chords: t.chords
                })
            })
        };
        updateUserSongSettings = e => {
            Object.assign(this.userSongSettings, e)
        };
        utils = {
            handleToParts: a._G,
            partsToHandle: a.CB,
            parseChords: a.rI
        }
    }(window.chordifyLibraryProps), Chordify.instrument = initialInstrument ? ? "guitar", Chordify.changeView("diagrams");
    const q = document.querySelectorAll(".instruments button");

    function F(e) {
        const t = e.target.name;
        Chordify.changeView(t), U.forEach(e => e.classList.remove("active")), document.querySelector(`#viewToggle button[name="${t}"]`) ? .classList.add("active"), "diagrams" === t && W()
    }
    q.forEach(e => e.addEventListener("click", _));
    const U = document.querySelectorAll("#viewToggle button");
    U.forEach(e => e.addEventListener("click", F)), document.querySelector("button.button-play") ? .addEventListener("click", function() {
        window.Chordify.player ? .handleControlClick("play")
    }), document.addEventListener("ChordifyLibrary", function(e) {
        const {
            detail: t
        } = e;
        if (t.player && t.player.event) {
            const e = document.querySelector("button.button-play span");
            "play" === t.player.event ? (e ? .classList.remove("icon-caret-right"), e ? .classList.add("icon-pause")) : (e ? .classList.remove("icon-pause"), e ? .classList.add("icon-caret-right"))
        }
    });
    const j = {
            guitar: "0 0 326 281",
            mandolin: "0 0 254 281",
            piano: "0 0 506 225",
            ukulele: "0 0 254 281"
        },
        W = () => Chordify.doWhenChordsLoaded(e => {
            if (void 0 === Chordify.instrument) return;
            const t = document.querySelector("#diagrams");
            if (!t) throw new Error("missing diagram element");
            t.innerHTML = "";
            const s = {};
            e.chords.filter(e => !e.hidden).forEach(e => {
                const o = (e => {
                    if (void 0 === Chordify.instrument) return console.error("instrument missing"), null;
                    if (e.isRest()) {
                        const t = document.createElement("div");
                        return t.className = `diagram d-${e.idx}`, t.dataset.i = e.idx.toString(), t.innerHTML = '<span class="icon-rest"></span>', t
                    }
                    const t = document.querySelector("#user-data") ? .dataset.orientation ? ? "right",
                        o = e.currentViewHandle,
                        i = ((e, t, s) => {
                            if ("N" === e) {
                                const e = document.createElement("div");
                                return e.className = "diagram", e.innerHTML = '<span class="icon-rest"></span>', e
                            }
                            const o = encodeURIComponent(e.replace("/", encodeURIComponent("/"))),
                                i = new URLSearchParams;
                            i.append("handedness", s), (0, n.nr)() && i.append("inline_components", "true");
                            const r = `/api/v2/diagrams/instruments/${t}/chords/${o}?${i.toString()}#chord`,
                                d = document.createElement("div");
                            d.className = `diagram ${e}`, d.innerHTML = `<svg alt="${e}" viewBox="${j[t]}"><use href="${r}"></use></svg>`;
                            const h = (0, a.y$)(e, Chordify.chordLang),
                                l = document.createElement("div");
                            return l.innerHTML = `${h.label}${h.bass??""}`, l.className = "chord-label", d.append(l), d
                        })(o, Chordify.instrument, t);
                    return Object.hasOwn(s, o) || (s[o] = 1, i.classList.add("diagram-in-overview")), i.classList.add(`d-${e.idx}`), i.dataset.i = e.idx.toString(), i
                })(e);
                o && (t.append(o), o.addEventListener("click", K))
            }), t.classList.remove("diagrams-guitar", "diagrams-piano", "diagrams-ukulele"), t.classList.add(`diagrams-${Chordify.instrument}`), t.classList.toggle("diagrams-overview", "summary" === Chordify.diagramView);
            const o = document.querySelector(".currentChord");
            o && Y(o, !0),
                function() {
                    if (void 0 === Chordify.player) return console.error("Chordify.player missing");
                    const e = document.querySelector("#diagrams");
                    !G && Chordify.diagramsVisible && e && (G = !0, window.document.addEventListener("ChordifyLibrary", function(e) {
                        void 0 !== e.detail.chordChange && Y(e.detail.chordChange.chordEl)
                    }))
                }()
        });
    W();
    let z, G = !1;

    function K(e) {
        if (!(e.target instanceof Element)) return;
        if (void 0 === Chordify.player) return console.error("Chordify.player missing");
        if (!Chordify.chordsLoaded) return console.error("Chords not loaded");
        const t = e.target.closest(".diagram") ? .dataset.i,
            s = void 0 !== t ? (0, a.vS)(Chordify.song.chords)(parseInt(t, 10)) : void 0;
        void 0 !== s && (Y(s.el), Chordify.player.play(s.el))
    }

    function Y(e, t = !1) {
        const s = document.querySelector("#diagrams");
        if (Chordify.diagramsVisible && Chordify.song && !Chordify.noPlayerSync && s && (t || z !== e.dataset.handle)) {
            let t = parseInt(e.dataset.i ? ? "0", 10),
                o = s.querySelector(`.d-${t}`);
            if (!o)
                for (; t-- && (o = s.querySelector(`.d-${t}`), !(t < 0 || null !== o)););
            if (null === o) return;
            const i = c(o).left,
                r = c(s).left;
            if (document.querySelector(".diagram-current") ? .classList.remove("diagram-current"), window.innerWidth < 950) {
                const e = s.scrollLeft + i - r - 30;
                s.scrollTo({
                    left: e,
                    behavior: "smooth"
                })
            } else {
                const e = s.scrollLeft + i - r - o.offsetWidth - 70;
                s.scrollTo({
                    left: e,
                    behavior: "smooth"
                })
            }
            o.classList.add("diagram-current"), z = e.dataset.handle
        }
    }
    const J = document.querySelector("#song") ? .dataset;
    Chordify.initPlayer({
        externalid: J ? .externalid ? ? "",
        pseudoid: J ? .pseudoid ? ? "",
        stream: J ? .stream ? ? "",
        type: J ? .type ? ? "youtube",
        ytCtrl: !1
    }), "string" == typeof window.loadUrl && async function(e) {
        try {
            const t = await fetch(e);
            if (!t.ok) throw new Error("Failed to fetch chords");
            const s = await t.json(),
                o = (0, a.rI)(s.chords);
            Chordify.initSong({ ...s,
                chords: o
            }, "advanced")
        } catch {
            document.querySelector("#song") ? .append(Lang.no_rights)
        }
    }(window.loadUrl);
    const X = document.getElementById("chords");
    if (!X) throw new Error("can't render without chords el");
    Chordify.renderChordsToEl(X)
})();
//# sourceMappingURL=embed-lib-bundle.js.map