var requirejs, require, define;
! function(global, setTimeout) {
    function commentReplace(t, e) {
        return e || ""
    }

    function isFunction(t) {
        return "[object Function]" === ostring.call(t)
    }

    function isArray(t) {
        return "[object Array]" === ostring.call(t)
    }

    function each(t, e) {
        if (t) {
            var i;
            for (i = 0; i < t.length && (!t[i] || !e(t[i], i, t)); i += 1);
        }
    }

    function eachReverse(t, e) {
        if (t) {
            var i;
            for (i = t.length - 1; i > -1 && (!t[i] || !e(t[i], i, t)); i -= 1);
        }
    }

    function hasProp(t, e) {
        return hasOwn.call(t, e)
    }

    function getOwn(t, e) {
        return hasProp(t, e) && t[e]
    }

    function eachProp(t, e) {
        var i;
        for (i in t)
            if (hasProp(t, i) && e(t[i], i)) break
    }

    function mixin(t, e, i, n) {
        return e && eachProp(e, function(e, r) {
            !i && hasProp(t, r) || (!n || "object" != typeof e || !e || isArray(e) || isFunction(e) || e instanceof RegExp ? t[r] = e : (t[r] || (t[r] = {}), mixin(t[r], e, i, n)))
        }), t
    }

    function bind(t, e) {
        return function() {
            return e.apply(t, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(t) {
        throw t
    }

    function getGlobal(t) {
        if (!t) return t;
        var e = global;
        return each(t.split("."), function(t) {
            e = e[t]
        }), e
    }

    function makeError(t, e, i, n) {
        var r = new Error(e + "\nhttp://requirejs.org/docs/errors.html#" + t);
        return r.requireType = t, r.requireModules = n, i && (r.originalError = i), r
    }

    function newContext(t) {
        function e(t) {
            var e, i;
            for (e = 0; e < t.length; e++)
                if (i = t[e], "." === i) t.splice(e, 1), e -= 1;
                else if (".." === i) {
                if (0 === e || 1 === e && ".." === t[2] || ".." === t[e - 1]) continue;
                e > 0 && (t.splice(e - 1, 2), e -= 2)
            }
        }

        function i(t, i, n) {
            var r, s, o, a, l, h, c, u, d, f, p, m, g = i && i.split("/"),
                _ = T.map,
                v = _ && _["*"];
            if (t && (t = t.split("/"), c = t.length - 1, T.nodeIdCompat && jsSuffixRegExp.test(t[c]) && (t[c] = t[c].replace(jsSuffixRegExp, "")), "." === t[0].charAt(0) && g && (m = g.slice(0, g.length - 1), t = m.concat(t)), e(t), t = t.join("/")), n && _ && (g || v)) {
                o = t.split("/");
                t: for (a = o.length; a > 0; a -= 1) {
                    if (h = o.slice(0, a).join("/"), g)
                        for (l = g.length; l > 0; l -= 1)
                            if (s = getOwn(_, g.slice(0, l).join("/")), s && (s = getOwn(s, h))) {
                                u = s, d = a;
                                break t
                            }!f && v && getOwn(v, h) && (f = getOwn(v, h), p = a)
                }!u && f && (u = f, d = p), u && (o.splice(0, d, u), t = o.join("/"))
            }
            return r = getOwn(T.pkgs, t), r ? r : t
        }

        function n(t) {
            isBrowser && each(scripts(), function(e) {
                if (e.getAttribute("data-requiremodule") === t && e.getAttribute("data-requirecontext") === b.contextName) return e.parentNode.removeChild(e), !0
            })
        }

        function r(t) {
            var e = getOwn(T.paths, t);
            if (e && isArray(e) && e.length > 1) return e.shift(), b.require.undef(t), b.makeRequire(null, {
                skipMap: !0
            })([t]), !0
        }

        function s(t) {
            var e, i = t ? t.indexOf("!") : -1;
            return i > -1 && (e = t.substring(0, i), t = t.substring(i + 1, t.length)), [e, t]
        }

        function o(t, e, n, r) {
            var o, a, l, h, c = null,
                u = e ? e.name : null,
                d = t,
                f = !0,
                p = "";
            return t || (f = !1, t = "_@r" + (j += 1)), h = s(t), c = h[0], t = h[1], c && (c = i(c, u, r), a = getOwn(E, c)), t && (c ? p = n ? t : a && a.normalize ? a.normalize(t, function(t) {
                return i(t, u, r)
            }) : t.indexOf("!") === -1 ? i(t, u, r) : t : (p = i(t, u, r), h = s(p), c = h[0], p = h[1], n = !0, o = b.nameToUrl(p))), l = !c || a || n ? "" : "_unnormalized" + (O += 1), {
                prefix: c,
                name: p,
                parentMap: e,
                unnormalized: !!l,
                url: o,
                originalName: d,
                isDefine: f,
                id: (c ? c + "!" + p : p) + l
            }
        }

        function a(t) {
            var e = t.id,
                i = getOwn(S, e);
            return i || (i = S[e] = new b.Module(t)), i
        }

        function l(t, e, i) {
            var n = t.id,
                r = getOwn(S, n);
            !hasProp(E, n) || r && !r.defineEmitComplete ? (r = a(t), r.error && "error" === e ? i(r.error) : r.on(e, i)) : "defined" === e && i(E[n])
        }

        function h(t, e) {
            var i = t.requireModules,
                n = !1;
            e ? e(t) : (each(i, function(e) {
                var i = getOwn(S, e);
                i && (i.error = t, i.events.error && (n = !0, i.emit("error", t)))
            }), n || req.onError(t))
        }

        function c() {
            globalDefQueue.length && (each(globalDefQueue, function(t) {
                var e = t[0];
                "string" == typeof e && (b.defQueueMap[e] = !0), C.push(t)
            }), globalDefQueue = [])
        }

        function u(t) {
            delete S[t], delete P[t]
        }

        function d(t, e, i) {
            var n = t.map.id;
            t.error ? t.emit("error", t.error) : (e[n] = !0, each(t.depMaps, function(n, r) {
                var s = n.id,
                    o = getOwn(S, s);
                !o || t.depMatched[r] || i[s] || (getOwn(e, s) ? (t.defineDep(r, E[s]), t.check()) : d(o, e, i))
            }), i[n] = !0)
        }

        function f() {
            var t, e, i = 1e3 * T.waitSeconds,
                s = i && b.startTime + i < (new Date).getTime(),
                o = [],
                a = [],
                l = !1,
                c = !0;
            if (!v) {
                if (v = !0, eachProp(P, function(t) {
                        var i = t.map,
                            h = i.id;
                        if (t.enabled && (i.isDefine || a.push(t), !t.error))
                            if (!t.inited && s) r(h) ? (e = !0, l = !0) : (o.push(h), n(h));
                            else if (!t.inited && t.fetched && i.isDefine && (l = !0, !i.prefix)) return c = !1
                    }), s && o.length) return t = makeError("timeout", "Load timeout for modules: " + o, null, o), t.contextName = b.contextName, h(t);
                c && each(a, function(t) {
                    d(t, {}, {})
                }), s && !e || !l || !isBrowser && !isWebWorker || x || (x = setTimeout(function() {
                    x = 0, f()
                }, 50)), v = !1
            }
        }

        function p(t) {
            hasProp(E, t[0]) || a(o(t[0], null, !0)).init(t[1], t[2])
        }

        function m(t, e, i, n) {
            t.detachEvent && !isOpera ? n && t.detachEvent(n, e) : t.removeEventListener(i, e, !1)
        }

        function g(t) {
            var e = t.currentTarget || t.srcElement;
            return m(e, b.onScriptLoad, "load", "onreadystatechange"), m(e, b.onScriptError, "error"), {
                node: e,
                id: e && e.getAttribute("data-requiremodule")
            }
        }

        function _() {
            var t;
            for (c(); C.length;) {
                if (t = C.shift(), null === t[0]) return h(makeError("mismatch", "Mismatched anonymous define() module: " + t[t.length - 1]));
                p(t)
            }
            b.defQueueMap = {}
        }
        var v, y, b, w, x, T = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            S = {},
            P = {},
            k = {},
            C = [],
            E = {},
            A = {},
            R = {},
            j = 1,
            O = 1;
        return w = {
            require: function(t) {
                return t.require ? t.require : t.require = b.makeRequire(t.map)
            },
            exports: function(t) {
                if (t.usingExports = !0, t.map.isDefine) return t.exports ? E[t.map.id] = t.exports : t.exports = E[t.map.id] = {}
            },
            module: function(t) {
                return t.module ? t.module : t.module = {
                    id: t.map.id,
                    uri: t.map.url,
                    config: function() {
                        return getOwn(T.config, t.map.id) || {}
                    },
                    exports: t.exports || (t.exports = {})
                }
            }
        }, y = function(t) {
            this.events = getOwn(k, t.id) || {}, this.map = t, this.shim = getOwn(T.shim, t.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, y.prototype = {
            init: function(t, e, i, n) {
                n = n || {}, this.inited || (this.factory = e, i ? this.on("error", i) : this.events.error && (i = bind(this, function(t) {
                    this.emit("error", t)
                })), this.depMaps = t && t.slice(0), this.errback = i, this.inited = !0, this.ignore = n.ignore, n.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function(t, e) {
                this.depMatched[t] || (this.depMatched[t] = !0, this.depCount -= 1, this.depExports[t] = e)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, b.startTime = (new Date).getTime();
                    var t = this.map;
                    return this.shim ? void b.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return t.prefix ? this.callPlugin() : this.load()
                    })) : t.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function() {
                var t = this.map.url;
                A[t] || (A[t] = !0, b.load(this.map.id, t))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var t, e, i = this.map.id,
                        n = this.depExports,
                        r = this.exports,
                        s = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(s)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        r = b.execCb(i, s, n, r)
                                    } catch (e) {
                                        t = e
                                    } else r = b.execCb(i, s, n, r);
                                    if (this.map.isDefine && void 0 === r && (e = this.module, e ? r = e.exports : this.usingExports && (r = this.exports)), t) return t.requireMap = this.map, t.requireModules = this.map.isDefine ? [this.map.id] : null, t.requireType = this.map.isDefine ? "define" : "require", h(this.error = t)
                                } else r = s;
                                if (this.exports = r, this.map.isDefine && !this.ignore && (E[i] = r, req.onResourceLoad)) {
                                    var o = [];
                                    each(this.depMaps, function(t) {
                                        o.push(t.normalizedMap || t)
                                    }), req.onResourceLoad(b, this.map, o)
                                }
                                u(i), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else hasProp(b.defQueueMap, i) || this.fetch()
                }
            },
            callPlugin: function() {
                var t = this.map,
                    e = t.id,
                    n = o(t.prefix);
                this.depMaps.push(n), l(n, "defined", bind(this, function(n) {
                    var r, s, c, d = getOwn(R, this.map.id),
                        f = this.map.name,
                        p = this.map.parentMap ? this.map.parentMap.name : null,
                        m = b.makeRequire(t.parentMap, {
                            enableBuildCallback: !0
                        });
                    return this.map.unnormalized ? (n.normalize && (f = n.normalize(f, function(t) {
                        return i(t, p, !0)
                    }) || ""), s = o(t.prefix + "!" + f, this.map.parentMap, !0), l(s, "defined", bind(this, function(t) {
                        this.map.normalizedMap = s, this.init([], function() {
                            return t
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        })
                    })), c = getOwn(S, s.id), void(c && (this.depMaps.push(s), this.events.error && c.on("error", bind(this, function(t) {
                        this.emit("error", t)
                    })), c.enable()))) : d ? (this.map.url = b.nameToUrl(d), void this.load()) : (r = bind(this, function(t) {
                        this.init([], function() {
                            return t
                        }, null, {
                            enabled: !0
                        })
                    }), r.error = bind(this, function(t) {
                        this.inited = !0, this.error = t, t.requireModules = [e], eachProp(S, function(t) {
                            0 === t.map.id.indexOf(e + "_unnormalized") && u(t.map.id)
                        }), h(t)
                    }), r.fromText = bind(this, function(i, n) {
                        var s = t.name,
                            l = o(s),
                            c = useInteractive;
                        n && (i = n), c && (useInteractive = !1), a(l), hasProp(T.config, e) && (T.config[s] = T.config[e]);
                        try {
                            req.exec(i)
                        } catch (t) {
                            return h(makeError("fromtexteval", "fromText eval for " + e + " failed: " + t, t, [e]))
                        }
                        c && (useInteractive = !0), this.depMaps.push(l), b.completeLoad(s), m([s], r)
                    }), void n.load(t.name, m, r, T))
                })), b.enable(n, this), this.pluginMaps[n.id] = n
            },
            enable: function() {
                P[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(t, e) {
                    var i, n, r;
                    if ("string" == typeof t) {
                        if (t = o(t, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[e] = t, r = getOwn(w, t.id)) return void(this.depExports[e] = r(this));
                        this.depCount += 1, l(t, "defined", bind(this, function(t) {
                            this.undefed || (this.defineDep(e, t), this.check())
                        })), this.errback ? l(t, "error", bind(this, this.errback)) : this.events.error && l(t, "error", bind(this, function(t) {
                            this.emit("error", t)
                        }))
                    }
                    i = t.id, n = S[i], hasProp(w, i) || !n || n.enabled || b.enable(t, this)
                })), eachProp(this.pluginMaps, bind(this, function(t) {
                    var e = getOwn(S, t.id);
                    e && !e.enabled && b.enable(t, this)
                })), this.enabling = !1, this.check()
            },
            on: function(t, e) {
                var i = this.events[t];
                i || (i = this.events[t] = []), i.push(e)
            },
            emit: function(t, e) {
                each(this.events[t], function(t) {
                    t(e)
                }), "error" === t && delete this.events[t]
            }
        }, b = {
            config: T,
            contextName: t,
            registry: S,
            defined: E,
            urlFetched: A,
            defQueue: C,
            defQueueMap: {},
            Module: y,
            makeModuleMap: o,
            nextTick: req.nextTick,
            onError: h,
            configure: function(t) {
                if (t.baseUrl && "/" !== t.baseUrl.charAt(t.baseUrl.length - 1) && (t.baseUrl += "/"), "string" == typeof t.urlArgs) {
                    var e = t.urlArgs;
                    t.urlArgs = function(t, i) {
                        return (i.indexOf("?") === -1 ? "?" : "&") + e
                    }
                }
                var i = T.shim,
                    n = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(t, function(t, e) {
                    n[e] ? (T[e] || (T[e] = {}), mixin(T[e], t, !0, !0)) : T[e] = t
                }), t.bundles && eachProp(t.bundles, function(t, e) {
                    each(t, function(t) {
                        t !== e && (R[t] = e)
                    })
                }), t.shim && (eachProp(t.shim, function(t, e) {
                    isArray(t) && (t = {
                        deps: t
                    }), !t.exports && !t.init || t.exportsFn || (t.exportsFn = b.makeShimExports(t)), i[e] = t
                }), T.shim = i), t.packages && each(t.packages, function(t) {
                    var e, i;
                    t = "string" == typeof t ? {
                        name: t
                    } : t, i = t.name, e = t.location, e && (T.paths[i] = t.location), T.pkgs[i] = t.name + "/" + (t.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(S, function(t, e) {
                    t.inited || t.map.unnormalized || (t.map = o(e, null, !0))
                }), (t.deps || t.callback) && b.require(t.deps || [], t.callback)
            },
            makeShimExports: function(t) {
                function e() {
                    var e;
                    return t.init && (e = t.init.apply(global, arguments)), e || t.exports && getGlobal(t.exports)
                }
                return e
            },
            makeRequire: function(e, r) {
                function s(i, n, l) {
                    var c, u, d;
                    return r.enableBuildCallback && n && isFunction(n) && (n.__requireJsBuild = !0), "string" == typeof i ? isFunction(n) ? h(makeError("requireargs", "Invalid require call"), l) : e && hasProp(w, i) ? w[i](S[e.id]) : req.get ? req.get(b, i, e, s) : (u = o(i, e, !1, !0), c = u.id, hasProp(E, c) ? E[c] : h(makeError("notloaded", 'Module name "' + c + '" has not been loaded yet for context: ' + t + (e ? "" : ". Use require([])")))) : (_(), b.nextTick(function() {
                        _(), d = a(o(null, e)), d.skipMap = r.skipMap, d.init(i, n, l, {
                            enabled: !0
                        }), f()
                    }), s)
                }
                return r = r || {}, mixin(s, {
                    isBrowser: isBrowser,
                    toUrl: function(t) {
                        var n, r = t.lastIndexOf("."),
                            s = t.split("/")[0],
                            o = "." === s || ".." === s;
                        return r !== -1 && (!o || r > 1) && (n = t.substring(r, t.length), t = t.substring(0, r)), b.nameToUrl(i(t, e && e.id, !0), n, !0)
                    },
                    defined: function(t) {
                        return hasProp(E, o(t, e, !1, !0).id)
                    },
                    specified: function(t) {
                        return t = o(t, e, !1, !0).id, hasProp(E, t) || hasProp(S, t)
                    }
                }), e || (s.undef = function(t) {
                    c();
                    var i = o(t, e, !0),
                        r = getOwn(S, t);
                    r.undefed = !0, n(t), delete E[t], delete A[i.url], delete k[t], eachReverse(C, function(e, i) {
                        e[0] === t && C.splice(i, 1)
                    }), delete b.defQueueMap[t], r && (r.events.defined && (k[t] = r.events), u(t))
                }), s
            },
            enable: function(t) {
                var e = getOwn(S, t.id);
                e && a(t).enable()
            },
            completeLoad: function(t) {
                var e, i, n, s = getOwn(T.shim, t) || {},
                    o = s.exports;
                for (c(); C.length;) {
                    if (i = C.shift(), null === i[0]) {
                        if (i[0] = t, e) break;
                        e = !0
                    } else i[0] === t && (e = !0);
                    p(i)
                }
                if (b.defQueueMap = {}, n = getOwn(S, t), !e && !hasProp(E, t) && n && !n.inited) {
                    if (!(!T.enforceDefine || o && getGlobal(o))) return r(t) ? void 0 : h(makeError("nodefine", "No define call for " + t, null, [t]));
                    p([t, s.deps || [], s.exportsFn])
                }
                f()
            },
            nameToUrl: function(t, e, i) {
                var n, r, s, o, a, l, h, c = getOwn(T.pkgs, t);
                if (c && (t = c), h = getOwn(R, t)) return b.nameToUrl(h, e, i);
                if (req.jsExtRegExp.test(t)) a = t + (e || "");
                else {
                    for (n = T.paths, r = t.split("/"), s = r.length; s > 0; s -= 1)
                        if (o = r.slice(0, s).join("/"), l = getOwn(n, o)) {
                            isArray(l) && (l = l[0]), r.splice(0, s, l);
                            break
                        }
                    a = r.join("/"), a += e || (/^data\:|^blob\:|\?/.test(a) || i ? "" : ".js"), a = ("/" === a.charAt(0) || a.match(/^[\w\+\.\-]+:/) ? "" : T.baseUrl) + a
                }
                return T.urlArgs && !/^blob\:/.test(a) ? a + T.urlArgs(t, a) : a
            },
            load: function(t, e) {
                req.load(b, t, e)
            },
            execCb: function(t, e, i, n) {
                return e.apply(n, i)
            },
            onScriptLoad: function(t) {
                if ("load" === t.type || readyRegExp.test((t.currentTarget || t.srcElement).readyState)) {
                    interactiveScript = null;
                    var e = g(t);
                    b.completeLoad(e.id)
                }
            },
            onScriptError: function(t) {
                var e = g(t);
                if (!r(e.id)) {
                    var i = [];
                    return eachProp(S, function(t, n) {
                        0 !== n.indexOf("_@r") && each(t.depMaps, function(t) {
                            if (t.id === e.id) return i.push(n), !0
                        })
                    }), h(makeError("scripterror", 'Script error for "' + e.id + (i.length ? '", needed by: ' + i.join(", ") : '"'), t, [e.id]))
                }
            }
        }, b.require = b.makeRequire(), b
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(t) {
            if ("interactive" === t.readyState) return interactiveScript = t
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.3.3",
        commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(t, e, i, n) {
            var r, s, o = defContextName;
            return isArray(t) || "string" == typeof t || (s = t, isArray(e) ? (t = e, e = i, i = n) : t = []), s && s.context && (o = s.context), r = getOwn(contexts, o), r || (r = contexts[o] = req.s.newContext(o)), s && r.configure(s), r.require(t, e, i)
        }, req.config = function(t) {
            return req(t)
        }, req.nextTick = "undefined" != typeof setTimeout ? function(t) {
            setTimeout(t, 4)
        } : function(t) {
            t()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function(t) {
            req[t] = function() {
                var e = contexts[defContextName];
                return e.require[t].apply(e, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(t, e, i) {
            var n = t.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return n.type = t.scriptType || "text/javascript", n.charset = "utf-8", n.async = !0, n
        }, req.load = function(t, e, i) {
            var n, r = t && t.config || {};
            if (isBrowser) return n = req.createNode(r, e, i), n.setAttribute("data-requirecontext", t.contextName), n.setAttribute("data-requiremodule", e), !n.attachEvent || n.attachEvent.toString && n.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (n.addEventListener("load", t.onScriptLoad, !1), n.addEventListener("error", t.onScriptError, !1)) : (useInteractive = !0, n.attachEvent("onreadystatechange", t.onScriptLoad)), n.src = i, r.onNodeCreated && r.onNodeCreated(n, r, e, i), currentlyAddingScript = n, baseElement ? head.insertBefore(n, baseElement) : head.appendChild(n), currentlyAddingScript = null, n;
            if (isWebWorker) try {
                setTimeout(function() {}, 0), importScripts(i), t.completeLoad(e)
            } catch (n) {
                t.onError(makeError("importscripts", "importScripts failed for " + e + " at " + i, n, [e]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(t) {
            if (head || (head = t.parentNode), dataMain = t.getAttribute("data-main")) return mainScript = dataMain, cfg.baseUrl || mainScript.indexOf("!") !== -1 || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
        }), define = function(t, e, i) {
            var n, r;
            "string" != typeof t && (i = e, e = t, t = null), isArray(e) || (i = e, e = null), !e && isFunction(i) && (e = [], i.length && (i.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function(t, i) {
                e.push(i)
            }), e = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(e))), useInteractive && (n = currentlyAddingScript || getInteractiveScript(), n && (t || (t = n.getAttribute("data-requiremodule")), r = contexts[n.getAttribute("data-requirecontext")])), r ? (r.defQueue.push([t, e, i]), r.defQueueMap[t] = !0) : globalDefQueue.push([t, e, i])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function(text) {
            return eval(text)
        }, req(cfg)
    }
}(this, "undefined" == typeof setTimeout ? void 0 : setTimeout), define("../bower_components/requirejs/require", function() {}),
    function(t, e) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");
            return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function(t, e) {
        function i(t, e) {
            e = e || it;
            var i = e.createElement("script");
            i.text = t, e.head.appendChild(i).parentNode.removeChild(i)
        }

        function n(t) {
            var e = !!t && "length" in t && t.length,
                i = mt.type(t);
            return "function" !== i && !mt.isWindow(t) && ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }

        function r(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        }

        function s(t, e, i) {
            return mt.isFunction(e) ? mt.grep(t, function(t, n) {
                return !!e.call(t, n, t) !== i
            }) : e.nodeType ? mt.grep(t, function(t) {
                return t === e !== i
            }) : "string" != typeof e ? mt.grep(t, function(t) {
                return at.call(e, t) > -1 !== i
            }) : Pt.test(e) ? mt.filter(e, t, i) : (e = mt.filter(e, t), mt.grep(t, function(t) {
                return at.call(e, t) > -1 !== i && 1 === t.nodeType
            }))
        }

        function o(t, e) {
            for (;
                (t = t[e]) && 1 !== t.nodeType;);
            return t
        }

        function a(t) {
            var e = {};
            return mt.each(t.match(jt) || [], function(t, i) {
                e[i] = !0
            }), e
        }

        function l(t) {
            return t
        }

        function h(t) {
            throw t
        }

        function c(t, e, i, n) {
            var r;
            try {
                t && mt.isFunction(r = t.promise) ? r.call(t).done(e).fail(i) : t && mt.isFunction(r = t.then) ? r.call(t, e, i) : e.apply(void 0, [t].slice(n))
            } catch (t) {
                i.apply(void 0, [t])
            }
        }

        function u() {
            it.removeEventListener("DOMContentLoaded", u), t.removeEventListener("load", u), mt.ready()
        }

        function d() {
            this.expando = mt.expando + d.uid++
        }

        function f(t) {
            return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : qt.test(t) ? JSON.parse(t) : t)
        }

        function p(t, e, i) {
            var n;
            if (void 0 === i && 1 === t.nodeType)
                if (n = "data-" + e.replace($t, "-$&").toLowerCase(), i = t.getAttribute(n), "string" == typeof i) {
                    try {
                        i = f(i)
                    } catch (t) {}
                    Nt.set(t, e, i)
                } else i = void 0;
            return i
        }

        function m(t, e, i, n) {
            var r, s = 1,
                o = 20,
                a = n ? function() {
                    return n.cur()
                } : function() {
                    return mt.css(t, e, "")
                },
                l = a(),
                h = i && i[3] || (mt.cssNumber[e] ? "" : "px"),
                c = (mt.cssNumber[e] || "px" !== h && +l) && zt.exec(mt.css(t, e));
            if (c && c[3] !== h) {
                h = h || c[3], i = i || [], c = +l || 1;
                do s = s || ".5", c /= s, mt.style(t, e, c + h); while (s !== (s = a() / l) && 1 !== s && --o)
            }
            return i && (c = +c || +l || 0, r = i[1] ? c + (i[1] + 1) * i[2] : +i[2], n && (n.unit = h, n.start = c, n.end = r)), r
        }

        function g(t) {
            var e, i = t.ownerDocument,
                n = t.nodeName,
                r = Xt[n];
            return r ? r : (e = i.body.appendChild(i.createElement(n)), r = mt.css(e, "display"), e.parentNode.removeChild(e), "none" === r && (r = "block"), Xt[n] = r, r)
        }

        function _(t, e) {
            for (var i, n, r = [], s = 0, o = t.length; s < o; s++) n = t[s], n.style && (i = n.style.display, e ? ("none" === i && (r[s] = Mt.get(n, "display") || null, r[s] || (n.style.display = "")), "" === n.style.display && Ht(n) && (r[s] = g(n))) : "none" !== i && (r[s] = "none", Mt.set(n, "display", i)));
            for (s = 0; s < o; s++) null != r[s] && (t[s].style.display = r[s]);
            return t
        }

        function v(t, e) {
            var i;
            return i = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && r(t, e) ? mt.merge([t], i) : i
        }

        function y(t, e) {
            for (var i = 0, n = t.length; i < n; i++) Mt.set(t[i], "globalEval", !e || Mt.get(e[i], "globalEval"))
        }

        function b(t, e, i, n, r) {
            for (var s, o, a, l, h, c, u = e.createDocumentFragment(), d = [], f = 0, p = t.length; f < p; f++)
                if (s = t[f], s || 0 === s)
                    if ("object" === mt.type(s)) mt.merge(d, s.nodeType ? [s] : s);
                    else if (Yt.test(s)) {
                for (o = o || u.appendChild(e.createElement("div")), a = (Qt.exec(s) || ["", ""])[1].toLowerCase(), l = Gt[a] || Gt._default, o.innerHTML = l[1] + mt.htmlPrefilter(s) + l[2], c = l[0]; c--;) o = o.lastChild;
                mt.merge(d, o.childNodes), o = u.firstChild, o.textContent = ""
            } else d.push(e.createTextNode(s));
            for (u.textContent = "", f = 0; s = d[f++];)
                if (n && mt.inArray(s, n) > -1) r && r.push(s);
                else if (h = mt.contains(s.ownerDocument, s), o = v(u.appendChild(s), "script"), h && y(o), i)
                for (c = 0; s = o[c++];) Wt.test(s.type || "") && i.push(s);
            return u
        }

        function w() {
            return !0
        }

        function x() {
            return !1
        }

        function T() {
            try {
                return it.activeElement
            } catch (t) {}
        }

        function S(t, e, i, n, r, s) {
            var o, a;
            if ("object" == typeof e) {
                "string" != typeof i && (n = n || i, i = void 0);
                for (a in e) S(t, a, i, n, e[a], s);
                return t
            }
            if (null == n && null == r ? (r = i, n = i = void 0) : null == r && ("string" == typeof i ? (r = n, n = void 0) : (r = n, n = i, i = void 0)), r === !1) r = x;
            else if (!r) return t;
            return 1 === s && (o = r, r = function(t) {
                return mt().off(t), o.apply(this, arguments)
            }, r.guid = o.guid || (o.guid = mt.guid++)), t.each(function() {
                mt.event.add(this, e, r, n, i)
            })
        }

        function P(t, e) {
            return r(t, "table") && r(11 !== e.nodeType ? e : e.firstChild, "tr") ? mt(">tbody", t)[0] || t : t
        }

        function k(t) {
            return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
        }

        function C(t) {
            var e = re.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function E(t, e) {
            var i, n, r, s, o, a, l, h;
            if (1 === e.nodeType) {
                if (Mt.hasData(t) && (s = Mt.access(t), o = Mt.set(e, s), h = s.events)) {
                    delete o.handle, o.events = {};
                    for (r in h)
                        for (i = 0, n = h[r].length; i < n; i++) mt.event.add(e, r, h[r][i])
                }
                Nt.hasData(t) && (a = Nt.access(t), l = mt.extend({}, a), Nt.set(e, l))
            }
        }

        function A(t, e) {
            var i = e.nodeName.toLowerCase();
            "input" === i && Vt.test(t.type) ? e.checked = t.checked : "input" !== i && "textarea" !== i || (e.defaultValue = t.defaultValue)
        }

        function R(t, e, n, r) {
            e = st.apply([], e);
            var s, o, a, l, h, c, u = 0,
                d = t.length,
                f = d - 1,
                p = e[0],
                m = mt.isFunction(p);
            if (m || d > 1 && "string" == typeof p && !ft.checkClone && ne.test(p)) return t.each(function(i) {
                var s = t.eq(i);
                m && (e[0] = p.call(this, i, s.html())), R(s, e, n, r)
            });
            if (d && (s = b(e, t[0].ownerDocument, !1, t, r), o = s.firstChild, 1 === s.childNodes.length && (s = o), o || r)) {
                for (a = mt.map(v(s, "script"), k), l = a.length; u < d; u++) h = s, u !== f && (h = mt.clone(h, !0, !0), l && mt.merge(a, v(h, "script"))), n.call(t[u], h, u);
                if (l)
                    for (c = a[a.length - 1].ownerDocument, mt.map(a, C), u = 0; u < l; u++) h = a[u], Wt.test(h.type || "") && !Mt.access(h, "globalEval") && mt.contains(c, h) && (h.src ? mt._evalUrl && mt._evalUrl(h.src) : i(h.textContent.replace(se, ""), c))
            }
            return t
        }

        function j(t, e, i) {
            for (var n, r = e ? mt.filter(e, t) : t, s = 0; null != (n = r[s]); s++) i || 1 !== n.nodeType || mt.cleanData(v(n)), n.parentNode && (i && mt.contains(n.ownerDocument, n) && y(v(n, "script")), n.parentNode.removeChild(n));
            return t
        }

        function O(t, e, i) {
            var n, r, s, o, a = t.style;
            return i = i || le(t), i && (o = i.getPropertyValue(e) || i[e], "" !== o || mt.contains(t.ownerDocument, t) || (o = mt.style(t, e)), !ft.pixelMarginRight() && ae.test(o) && oe.test(e) && (n = a.width, r = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = o, o = i.width, a.width = n, a.minWidth = r, a.maxWidth = s)), void 0 !== o ? o + "" : o
        }

        function L(t, e) {
            return {
                get: function() {
                    return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                }
            }
        }

        function I(t) {
            if (t in pe) return t;
            for (var e = t[0].toUpperCase() + t.slice(1), i = fe.length; i--;)
                if (t = fe[i] + e, t in pe) return t
        }

        function D(t) {
            var e = mt.cssProps[t];
            return e || (e = mt.cssProps[t] = I(t) || t), e
        }

        function M(t, e, i) {
            var n = zt.exec(e);
            return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e
        }

        function N(t, e, i, n, r) {
            var s, o = 0;
            for (s = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0; s < 4; s += 2) "margin" === i && (o += mt.css(t, i + Bt[s], !0, r)), n ? ("content" === i && (o -= mt.css(t, "padding" + Bt[s], !0, r)), "margin" !== i && (o -= mt.css(t, "border" + Bt[s] + "Width", !0, r))) : (o += mt.css(t, "padding" + Bt[s], !0, r), "padding" !== i && (o += mt.css(t, "border" + Bt[s] + "Width", !0, r)));
            return o
        }

        function q(t, e, i) {
            var n, r = le(t),
                s = O(t, e, r),
                o = "border-box" === mt.css(t, "boxSizing", !1, r);
            return ae.test(s) ? s : (n = o && (ft.boxSizingReliable() || s === t.style[e]), s = parseFloat(s) || 0, s + N(t, e, i || (o ? "border" : "content"), n, r) + "px")
        }

        function $(t, e, i, n, r) {
            return new $.prototype.init(t, e, i, n, r)
        }

        function F() {
            ge && (it.hidden === !1 && t.requestAnimationFrame ? t.requestAnimationFrame(F) : t.setTimeout(F, mt.fx.interval), mt.fx.tick())
        }

        function z() {
            return t.setTimeout(function() {
                me = void 0
            }), me = mt.now()
        }

        function B(t, e) {
            var i, n = 0,
                r = {
                    height: t
                };
            for (e = e ? 1 : 0; n < 4; n += 2 - e) i = Bt[n], r["margin" + i] = r["padding" + i] = t;
            return e && (r.opacity = r.width = t), r
        }

        function H(t, e, i) {
            for (var n, r = (V.tweeners[e] || []).concat(V.tweeners["*"]), s = 0, o = r.length; s < o; s++)
                if (n = r[s].call(i, e, t)) return n
        }

        function U(t, e, i) {
            var n, r, s, o, a, l, h, c, u = "width" in e || "height" in e,
                d = this,
                f = {},
                p = t.style,
                m = t.nodeType && Ht(t),
                g = Mt.get(t, "fxshow");
            i.queue || (o = mt._queueHooks(t, "fx"), null == o.unqueued && (o.unqueued = 0, a = o.empty.fire, o.empty.fire = function() {
                o.unqueued || a()
            }), o.unqueued++, d.always(function() {
                d.always(function() {
                    o.unqueued--, mt.queue(t, "fx").length || o.empty.fire()
                })
            }));
            for (n in e)
                if (r = e[n], _e.test(r)) {
                    if (delete e[n], s = s || "toggle" === r, r === (m ? "hide" : "show")) {
                        if ("show" !== r || !g || void 0 === g[n]) continue;
                        m = !0
                    }
                    f[n] = g && g[n] || mt.style(t, n)
                }
            if (l = !mt.isEmptyObject(e), l || !mt.isEmptyObject(f)) {
                u && 1 === t.nodeType && (i.overflow = [p.overflow, p.overflowX, p.overflowY], h = g && g.display, null == h && (h = Mt.get(t, "display")), c = mt.css(t, "display"), "none" === c && (h ? c = h : (_([t], !0), h = t.style.display || h, c = mt.css(t, "display"), _([t]))), ("inline" === c || "inline-block" === c && null != h) && "none" === mt.css(t, "float") && (l || (d.done(function() {
                    p.display = h
                }), null == h && (c = p.display, h = "none" === c ? "" : c)), p.display = "inline-block")), i.overflow && (p.overflow = "hidden", d.always(function() {
                    p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
                })), l = !1;
                for (n in f) l || (g ? "hidden" in g && (m = g.hidden) : g = Mt.access(t, "fxshow", {
                    display: h
                }), s && (g.hidden = !m), m && _([t], !0), d.done(function() {
                    m || _([t]), Mt.remove(t, "fxshow");
                    for (n in f) mt.style(t, n, f[n])
                })), l = H(m ? g[n] : 0, n, d), n in g || (g[n] = l.start, m && (l.end = l.start, l.start = 0))
            }
        }

        function X(t, e) {
            var i, n, r, s, o;
            for (i in t)
                if (n = mt.camelCase(i), r = e[n], s = t[i], Array.isArray(s) && (r = s[1], s = t[i] = s[0]), i !== n && (t[n] = s, delete t[i]), o = mt.cssHooks[n], o && "expand" in o) {
                    s = o.expand(s), delete t[n];
                    for (i in s) i in t || (t[i] = s[i], e[i] = r)
                } else e[n] = r
        }

        function V(t, e, i) {
            var n, r, s = 0,
                o = V.prefilters.length,
                a = mt.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (r) return !1;
                    for (var e = me || z(), i = Math.max(0, h.startTime + h.duration - e), n = i / h.duration || 0, s = 1 - n, o = 0, l = h.tweens.length; o < l; o++) h.tweens[o].run(s);
                    return a.notifyWith(t, [h, s, i]), s < 1 && l ? i : (l || a.notifyWith(t, [h, 1, 0]), a.resolveWith(t, [h]), !1)
                },
                h = a.promise({
                    elem: t,
                    props: mt.extend({}, e),
                    opts: mt.extend(!0, {
                        specialEasing: {},
                        easing: mt.easing._default
                    }, i),
                    originalProperties: e,
                    originalOptions: i,
                    startTime: me || z(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(e, i) {
                        var n = mt.Tween(t, h.opts, e, i, h.opts.specialEasing[e] || h.opts.easing);
                        return h.tweens.push(n), n
                    },
                    stop: function(e) {
                        var i = 0,
                            n = e ? h.tweens.length : 0;
                        if (r) return this;
                        for (r = !0; i < n; i++) h.tweens[i].run(1);
                        return e ? (a.notifyWith(t, [h, 1, 0]), a.resolveWith(t, [h, e])) : a.rejectWith(t, [h, e]), this
                    }
                }),
                c = h.props;
            for (X(c, h.opts.specialEasing); s < o; s++)
                if (n = V.prefilters[s].call(h, t, c, h.opts)) return mt.isFunction(n.stop) && (mt._queueHooks(h.elem, h.opts.queue).stop = mt.proxy(n.stop, n)), n;
            return mt.map(c, H, h), mt.isFunction(h.opts.start) && h.opts.start.call(t, h), h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always), mt.fx.timer(mt.extend(l, {
                elem: t,
                anim: h,
                queue: h.opts.queue
            })), h
        }

        function Q(t) {
            var e = t.match(jt) || [];
            return e.join(" ")
        }

        function W(t) {
            return t.getAttribute && t.getAttribute("class") || ""
        }

        function G(t, e, i, n) {
            var r;
            if (Array.isArray(e)) mt.each(e, function(e, r) {
                i || Ee.test(t) ? n(t, r) : G(t + "[" + ("object" == typeof r && null != r ? e : "") + "]", r, i, n)
            });
            else if (i || "object" !== mt.type(e)) n(t, e);
            else
                for (r in e) G(t + "[" + r + "]", e[r], i, n)
        }

        function Y(t) {
            return function(e, i) {
                "string" != typeof e && (i = e, e = "*");
                var n, r = 0,
                    s = e.toLowerCase().match(jt) || [];
                if (mt.isFunction(i))
                    for (; n = s[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
            }
        }

        function J(t, e, i, n) {
            function r(a) {
                var l;
                return s[a] = !0, mt.each(t[a] || [], function(t, a) {
                    var h = a(e, i, n);
                    return "string" != typeof h || o || s[h] ? o ? !(l = h) : void 0 : (e.dataTypes.unshift(h), r(h), !1)
                }), l
            }
            var s = {},
                o = t === Fe;
            return r(e.dataTypes[0]) || !s["*"] && r("*")
        }

        function Z(t, e) {
            var i, n, r = mt.ajaxSettings.flatOptions || {};
            for (i in e) void 0 !== e[i] && ((r[i] ? t : n || (n = {}))[i] = e[i]);
            return n && mt.extend(!0, t, n), t
        }

        function K(t, e, i) {
            for (var n, r, s, o, a = t.contents, l = t.dataTypes;
                "*" === l[0];) l.shift(), void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
            if (n)
                for (r in a)
                    if (a[r] && a[r].test(n)) {
                        l.unshift(r);
                        break
                    }
            if (l[0] in i) s = l[0];
            else {
                for (r in i) {
                    if (!l[0] || t.converters[r + " " + l[0]]) {
                        s = r;
                        break
                    }
                    o || (o = r)
                }
                s = s || o
            }
            if (s) return s !== l[0] && l.unshift(s), i[s]
        }

        function tt(t, e, i, n) {
            var r, s, o, a, l, h = {},
                c = t.dataTypes.slice();
            if (c[1])
                for (o in t.converters) h[o.toLowerCase()] = t.converters[o];
            for (s = c.shift(); s;)
                if (t.responseFields[s] && (i[t.responseFields[s]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = s, s = c.shift())
                    if ("*" === s) s = l;
                    else if ("*" !== l && l !== s) {
                if (o = h[l + " " + s] || h["* " + s], !o)
                    for (r in h)
                        if (a = r.split(" "), a[1] === s && (o = h[l + " " + a[0]] || h["* " + a[0]])) {
                            o === !0 ? o = h[r] : h[r] !== !0 && (s = a[0], c.unshift(a[1]));
                            break
                        }
                if (o !== !0)
                    if (o && t.throws) e = o(e);
                    else try {
                        e = o(e)
                    } catch (t) {
                        return {
                            state: "parsererror",
                            error: o ? t : "No conversion from " + l + " to " + s
                        }
                    }
            }
            return {
                state: "success",
                data: e
            }
        }
        var et = [],
            it = t.document,
            nt = Object.getPrototypeOf,
            rt = et.slice,
            st = et.concat,
            ot = et.push,
            at = et.indexOf,
            lt = {},
            ht = lt.toString,
            ct = lt.hasOwnProperty,
            ut = ct.toString,
            dt = ut.call(Object),
            ft = {},
            pt = "3.2.0",
            mt = function(t, e) {
                return new mt.fn.init(t, e)
            },
            gt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            _t = /^-ms-/,
            vt = /-([a-z])/g,
            yt = function(t, e) {
                return e.toUpperCase()
            };
        mt.fn = mt.prototype = {
            jquery: pt,
            constructor: mt,
            length: 0,
            toArray: function() {
                return rt.call(this)
            },
            get: function(t) {
                return null == t ? rt.call(this) : t < 0 ? this[t + this.length] : this[t]
            },
            pushStack: function(t) {
                var e = mt.merge(this.constructor(), t);
                return e.prevObject = this, e
            },
            each: function(t) {
                return mt.each(this, t)
            },
            map: function(t) {
                return this.pushStack(mt.map(this, function(e, i) {
                    return t.call(e, i, e)
                }))
            },
            slice: function() {
                return this.pushStack(rt.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(t) {
                var e = this.length,
                    i = +t + (t < 0 ? e : 0);
                return this.pushStack(i >= 0 && i < e ? [this[i]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: ot,
            sort: et.sort,
            splice: et.splice
        }, mt.extend = mt.fn.extend = function() {
            var t, e, i, n, r, s, o = arguments[0] || {},
                a = 1,
                l = arguments.length,
                h = !1;
            for ("boolean" == typeof o && (h = o, o = arguments[a] || {}, a++), "object" == typeof o || mt.isFunction(o) || (o = {}), a === l && (o = this, a--); a < l; a++)
                if (null != (t = arguments[a]))
                    for (e in t) i = o[e], n = t[e], o !== n && (h && n && (mt.isPlainObject(n) || (r = Array.isArray(n))) ? (r ? (r = !1, s = i && Array.isArray(i) ? i : []) : s = i && mt.isPlainObject(i) ? i : {}, o[e] = mt.extend(h, s, n)) : void 0 !== n && (o[e] = n));
            return o
        }, mt.extend({
            expando: "jQuery" + (pt + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(t) {
                throw new Error(t)
            },
            noop: function() {},
            isFunction: function(t) {
                return "function" === mt.type(t)
            },
            isWindow: function(t) {
                return null != t && t === t.window
            },
            isNumeric: function(t) {
                var e = mt.type(t);
                return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
            },
            isPlainObject: function(t) {
                var e, i;
                return !(!t || "[object Object]" !== ht.call(t)) && (!(e = nt(t)) || (i = ct.call(e, "constructor") && e.constructor, "function" == typeof i && ut.call(i) === dt))
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            type: function(t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? lt[ht.call(t)] || "object" : typeof t
            },
            globalEval: function(t) {
                i(t)
            },
            camelCase: function(t) {
                return t.replace(_t, "ms-").replace(vt, yt)
            },
            each: function(t, e) {
                var i, r = 0;
                if (n(t))
                    for (i = t.length; r < i && e.call(t[r], r, t[r]) !== !1; r++);
                else
                    for (r in t)
                        if (e.call(t[r], r, t[r]) === !1) break; return t
            },
            trim: function(t) {
                return null == t ? "" : (t + "").replace(gt, "")
            },
            makeArray: function(t, e) {
                var i = e || [];
                return null != t && (n(Object(t)) ? mt.merge(i, "string" == typeof t ? [t] : t) : ot.call(i, t)), i
            },
            inArray: function(t, e, i) {
                return null == e ? -1 : at.call(e, t, i)
            },
            merge: function(t, e) {
                for (var i = +e.length, n = 0, r = t.length; n < i; n++) t[r++] = e[n];
                return t.length = r, t
            },
            grep: function(t, e, i) {
                for (var n, r = [], s = 0, o = t.length, a = !i; s < o; s++) n = !e(t[s], s), n !== a && r.push(t[s]);
                return r
            },
            map: function(t, e, i) {
                var r, s, o = 0,
                    a = [];
                if (n(t))
                    for (r = t.length; o < r; o++) s = e(t[o], o, i), null != s && a.push(s);
                else
                    for (o in t) s = e(t[o], o, i), null != s && a.push(s);
                return st.apply([], a)
            },
            guid: 1,
            proxy: function(t, e) {
                var i, n, r;
                if ("string" == typeof e && (i = t[e], e = t, t = i), mt.isFunction(t)) return n = rt.call(arguments, 2), r = function() {
                    return t.apply(e || this, n.concat(rt.call(arguments)))
                }, r.guid = t.guid = t.guid || mt.guid++, r
            },
            now: Date.now,
            support: ft
        }), "function" == typeof Symbol && (mt.fn[Symbol.iterator] = et[Symbol.iterator]), mt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
            lt["[object " + e + "]"] = e.toLowerCase()
        });
        var bt = function(t) {
            function e(t, e, i, n) {
                var r, s, o, a, l, h, c, d = e && e.ownerDocument,
                    p = e ? e.nodeType : 9;
                if (i = i || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return i;
                if (!n && ((e ? e.ownerDocument || e : z) !== L && O(e), e = e || L, D)) {
                    if (11 !== p && (l = _t.exec(t)))
                        if (r = l[1]) {
                            if (9 === p) {
                                if (!(o = e.getElementById(r))) return i;
                                if (o.id === r) return i.push(o), i
                            } else if (d && (o = d.getElementById(r)) && $(e, o) && o.id === r) return i.push(o), i
                        } else {
                            if (l[2]) return Z.apply(i, e.getElementsByTagName(t)), i;
                            if ((r = l[3]) && x.getElementsByClassName && e.getElementsByClassName) return Z.apply(i, e.getElementsByClassName(r)), i
                        }
                    if (x.qsa && !V[t + " "] && (!M || !M.test(t))) {
                        if (1 !== p) d = e, c = t;
                        else if ("object" !== e.nodeName.toLowerCase()) {
                            for ((a = e.getAttribute("id")) ? a = a.replace(wt, xt) : e.setAttribute("id", a = F), h = k(t), s = h.length; s--;) h[s] = "#" + a + " " + f(h[s]);
                            c = h.join(","), d = vt.test(t) && u(e.parentNode) || e
                        }
                        if (c) try {
                            return Z.apply(i, d.querySelectorAll(c)), i
                        } catch (t) {} finally {
                            a === F && e.removeAttribute("id")
                        }
                    }
                }
                return E(t.replace(at, "$1"), e, i, n)
            }

            function i() {
                function t(i, n) {
                    return e.push(i + " ") > T.cacheLength && delete t[e.shift()], t[i + " "] = n
                }
                var e = [];
                return t
            }

            function n(t) {
                return t[F] = !0, t
            }

            function r(t) {
                var e = L.createElement("fieldset");
                try {
                    return !!t(e)
                } catch (t) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function s(t, e) {
                for (var i = t.split("|"), n = i.length; n--;) T.attrHandle[i[n]] = e
            }

            function o(t, e) {
                var i = e && t,
                    n = i && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
                if (n) return n;
                if (i)
                    for (; i = i.nextSibling;)
                        if (i === e) return -1;
                return t ? 1 : -1
            }

            function a(t) {
                return function(e) {
                    var i = e.nodeName.toLowerCase();
                    return "input" === i && e.type === t
                }
            }

            function l(t) {
                return function(e) {
                    var i = e.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && e.type === t
                }
            }

            function h(t) {
                return function(e) {
                    return "form" in e ? e.parentNode && e.disabled === !1 ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && St(e) === t : e.disabled === t : "label" in e && e.disabled === t
                }
            }

            function c(t) {
                return n(function(e) {
                    return e = +e, n(function(i, n) {
                        for (var r, s = t([], i.length, e), o = s.length; o--;) i[r = s[o]] && (i[r] = !(n[r] = i[r]))
                    })
                })
            }

            function u(t) {
                return t && "undefined" != typeof t.getElementsByTagName && t
            }

            function d() {}

            function f(t) {
                for (var e = 0, i = t.length, n = ""; e < i; e++) n += t[e].value;
                return n
            }

            function p(t, e, i) {
                var n = e.dir,
                    r = e.next,
                    s = r || n,
                    o = i && "parentNode" === s,
                    a = H++;
                return e.first ? function(e, i, r) {
                    for (; e = e[n];)
                        if (1 === e.nodeType || o) return t(e, i, r);
                    return !1
                } : function(e, i, l) {
                    var h, c, u, d = [B, a];
                    if (l) {
                        for (; e = e[n];)
                            if ((1 === e.nodeType || o) && t(e, i, l)) return !0
                    } else
                        for (; e = e[n];)
                            if (1 === e.nodeType || o)
                                if (u = e[F] || (e[F] = {}), c = u[e.uniqueID] || (u[e.uniqueID] = {}), r && r === e.nodeName.toLowerCase()) e = e[n] || e;
                                else {
                                    if ((h = c[s]) && h[0] === B && h[1] === a) return d[2] = h[2];
                                    if (c[s] = d, d[2] = t(e, i, l)) return !0
                                } return !1
                }
            }

            function m(t) {
                return t.length > 1 ? function(e, i, n) {
                    for (var r = t.length; r--;)
                        if (!t[r](e, i, n)) return !1;
                    return !0
                } : t[0]
            }

            function g(t, i, n) {
                for (var r = 0, s = i.length; r < s; r++) e(t, i[r], n);
                return n
            }

            function _(t, e, i, n, r) {
                for (var s, o = [], a = 0, l = t.length, h = null != e; a < l; a++)(s = t[a]) && (i && !i(s, n, r) || (o.push(s), h && e.push(a)));
                return o
            }

            function v(t, e, i, r, s, o) {
                return r && !r[F] && (r = v(r)), s && !s[F] && (s = v(s, o)), n(function(n, o, a, l) {
                    var h, c, u, d = [],
                        f = [],
                        p = o.length,
                        m = n || g(e || "*", a.nodeType ? [a] : a, []),
                        v = !t || !n && e ? m : _(m, d, t, a, l),
                        y = i ? s || (n ? t : p || r) ? [] : o : v;
                    if (i && i(v, y, a, l), r)
                        for (h = _(y, f), r(h, [], a, l), c = h.length; c--;)(u = h[c]) && (y[f[c]] = !(v[f[c]] = u));
                    if (n) {
                        if (s || t) {
                            if (s) {
                                for (h = [], c = y.length; c--;)(u = y[c]) && h.push(v[c] = u);
                                s(null, y = [], h, l)
                            }
                            for (c = y.length; c--;)(u = y[c]) && (h = s ? tt(n, u) : d[c]) > -1 && (n[h] = !(o[h] = u))
                        }
                    } else y = _(y === o ? y.splice(p, y.length) : y), s ? s(null, o, y, l) : Z.apply(o, y)
                })
            }

            function y(t) {
                for (var e, i, n, r = t.length, s = T.relative[t[0].type], o = s || T.relative[" "], a = s ? 1 : 0, l = p(function(t) {
                        return t === e
                    }, o, !0), h = p(function(t) {
                        return tt(e, t) > -1
                    }, o, !0), c = [function(t, i, n) {
                        var r = !s && (n || i !== A) || ((e = i).nodeType ? l(t, i, n) : h(t, i, n));
                        return e = null, r
                    }]; a < r; a++)
                    if (i = T.relative[t[a].type]) c = [p(m(c), i)];
                    else {
                        if (i = T.filter[t[a].type].apply(null, t[a].matches), i[F]) {
                            for (n = ++a; n < r && !T.relative[t[n].type]; n++);
                            return v(a > 1 && m(c), a > 1 && f(t.slice(0, a - 1).concat({
                                value: " " === t[a - 2].type ? "*" : ""
                            })).replace(at, "$1"), i, a < n && y(t.slice(a, n)), n < r && y(t = t.slice(n)), n < r && f(t))
                        }
                        c.push(i)
                    }
                return m(c)
            }

            function b(t, i) {
                var r = i.length > 0,
                    s = t.length > 0,
                    o = function(n, o, a, l, h) {
                        var c, u, d, f = 0,
                            p = "0",
                            m = n && [],
                            g = [],
                            v = A,
                            y = n || s && T.find.TAG("*", h),
                            b = B += null == v ? 1 : Math.random() || .1,
                            w = y.length;
                        for (h && (A = o === L || o || h); p !== w && null != (c = y[p]); p++) {
                            if (s && c) {
                                for (u = 0, o || c.ownerDocument === L || (O(c), a = !D); d = t[u++];)
                                    if (d(c, o || L, a)) {
                                        l.push(c);
                                        break
                                    }
                                h && (B = b)
                            }
                            r && ((c = !d && c) && f--, n && m.push(c))
                        }
                        if (f += p, r && p !== f) {
                            for (u = 0; d = i[u++];) d(m, g, o, a);
                            if (n) {
                                if (f > 0)
                                    for (; p--;) m[p] || g[p] || (g[p] = Y.call(l));
                                g = _(g)
                            }
                            Z.apply(l, g), h && !n && g.length > 0 && f + i.length > 1 && e.uniqueSort(l)
                        }
                        return h && (B = b, A = v), m
                    };
                return r ? n(o) : o
            }
            var w, x, T, S, P, k, C, E, A, R, j, O, L, I, D, M, N, q, $, F = "sizzle" + 1 * new Date,
                z = t.document,
                B = 0,
                H = 0,
                U = i(),
                X = i(),
                V = i(),
                Q = function(t, e) {
                    return t === e && (j = !0), 0
                },
                W = {}.hasOwnProperty,
                G = [],
                Y = G.pop,
                J = G.push,
                Z = G.push,
                K = G.slice,
                tt = function(t, e) {
                    for (var i = 0, n = t.length; i < n; i++)
                        if (t[i] === e) return i;
                    return -1
                },
                et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                it = "[\\x20\\t\\r\\n\\f]",
                nt = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                rt = "\\[" + it + "*(" + nt + ")(?:" + it + "*([*^$|!~]?=)" + it + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + nt + "))|)" + it + "*\\]",
                st = ":(" + nt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + rt + ")*)|.*)\\)|)",
                ot = new RegExp(it + "+", "g"),
                at = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"),
                lt = new RegExp("^" + it + "*," + it + "*"),
                ht = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"),
                ct = new RegExp("=" + it + "*([^\\]'\"]*?)" + it + "*\\]", "g"),
                ut = new RegExp(st),
                dt = new RegExp("^" + nt + "$"),
                ft = {
                    ID: new RegExp("^#(" + nt + ")"),
                    CLASS: new RegExp("^\\.(" + nt + ")"),
                    TAG: new RegExp("^(" + nt + "|[*])"),
                    ATTR: new RegExp("^" + rt),
                    PSEUDO: new RegExp("^" + st),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + et + ")$", "i"),
                    needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")
                },
                pt = /^(?:input|select|textarea|button)$/i,
                mt = /^h\d$/i,
                gt = /^[^{]+\{\s*\[native \w/,
                _t = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                vt = /[+~]/,
                yt = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"),
                bt = function(t, e, i) {
                    var n = "0x" + e - 65536;
                    return n !== n || i ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                },
                wt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                xt = function(t, e) {
                    return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
                },
                Tt = function() {
                    O()
                },
                St = p(function(t) {
                    return t.disabled === !0 && ("form" in t || "label" in t)
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                Z.apply(G = K.call(z.childNodes), z.childNodes), G[z.childNodes.length].nodeType
            } catch (t) {
                Z = {
                    apply: G.length ? function(t, e) {
                        J.apply(t, K.call(e))
                    } : function(t, e) {
                        for (var i = t.length, n = 0; t[i++] = e[n++];);
                        t.length = i - 1
                    }
                }
            }
            x = e.support = {}, P = e.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, O = e.setDocument = function(t) {
                var e, i, n = t ? t.ownerDocument || t : z;
                return n !== L && 9 === n.nodeType && n.documentElement ? (L = n, I = L.documentElement, D = !P(L), z !== L && (i = L.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", Tt, !1) : i.attachEvent && i.attachEvent("onunload", Tt)), x.attributes = r(function(t) {
                    return t.className = "i", !t.getAttribute("className")
                }), x.getElementsByTagName = r(function(t) {
                    return t.appendChild(L.createComment("")), !t.getElementsByTagName("*").length
                }), x.getElementsByClassName = gt.test(L.getElementsByClassName), x.getById = r(function(t) {
                    return I.appendChild(t).id = F, !L.getElementsByName || !L.getElementsByName(F).length
                }), x.getById ? (T.filter.ID = function(t) {
                    var e = t.replace(yt, bt);
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                }, T.find.ID = function(t, e) {
                    if ("undefined" != typeof e.getElementById && D) {
                        var i = e.getElementById(t);
                        return i ? [i] : []
                    }
                }) : (T.filter.ID = function(t) {
                    var e = t.replace(yt, bt);
                    return function(t) {
                        var i = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                        return i && i.value === e
                    }
                }, T.find.ID = function(t, e) {
                    if ("undefined" != typeof e.getElementById && D) {
                        var i, n, r, s = e.getElementById(t);
                        if (s) {
                            if (i = s.getAttributeNode("id"), i && i.value === t) return [s];
                            for (r = e.getElementsByName(t), n = 0; s = r[n++];)
                                if (i = s.getAttributeNode("id"), i && i.value === t) return [s]
                        }
                        return []
                    }
                }), T.find.TAG = x.getElementsByTagName ? function(t, e) {
                    return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : x.qsa ? e.querySelectorAll(t) : void 0
                } : function(t, e) {
                    var i, n = [],
                        r = 0,
                        s = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; i = s[r++];) 1 === i.nodeType && n.push(i);
                        return n
                    }
                    return s
                }, T.find.CLASS = x.getElementsByClassName && function(t, e) {
                    if ("undefined" != typeof e.getElementsByClassName && D) return e.getElementsByClassName(t)
                }, N = [], M = [], (x.qsa = gt.test(L.querySelectorAll)) && (r(function(t) {
                    I.appendChild(t).innerHTML = "<a id='" + F + "'></a><select id='" + F + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && M.push("[*^$]=" + it + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || M.push("\\[" + it + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + F + "-]").length || M.push("~="), t.querySelectorAll(":checked").length || M.push(":checked"), t.querySelectorAll("a#" + F + "+*").length || M.push(".#.+[+~]")
                }), r(function(t) {
                    t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var e = L.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && M.push("name" + it + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && M.push(":enabled", ":disabled"), I.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && M.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), M.push(",.*:")
                })), (x.matchesSelector = gt.test(q = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && r(function(t) {
                    x.disconnectedMatch = q.call(t, "*"), q.call(t, "[s!='']:x"), N.push("!=", st)
                }), M = M.length && new RegExp(M.join("|")), N = N.length && new RegExp(N.join("|")), e = gt.test(I.compareDocumentPosition), $ = e || gt.test(I.contains) ? function(t, e) {
                    var i = 9 === t.nodeType ? t.documentElement : t,
                        n = e && e.parentNode;
                    return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                } : function(t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, Q = e ? function(t, e) {
                    if (t === e) return j = !0, 0;
                    var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return i ? i : (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & i || !x.sortDetached && e.compareDocumentPosition(t) === i ? t === L || t.ownerDocument === z && $(z, t) ? -1 : e === L || e.ownerDocument === z && $(z, e) ? 1 : R ? tt(R, t) - tt(R, e) : 0 : 4 & i ? -1 : 1)
                } : function(t, e) {
                    if (t === e) return j = !0, 0;
                    var i, n = 0,
                        r = t.parentNode,
                        s = e.parentNode,
                        a = [t],
                        l = [e];
                    if (!r || !s) return t === L ? -1 : e === L ? 1 : r ? -1 : s ? 1 : R ? tt(R, t) - tt(R, e) : 0;
                    if (r === s) return o(t, e);
                    for (i = t; i = i.parentNode;) a.unshift(i);
                    for (i = e; i = i.parentNode;) l.unshift(i);
                    for (; a[n] === l[n];) n++;
                    return n ? o(a[n], l[n]) : a[n] === z ? -1 : l[n] === z ? 1 : 0
                }, L) : L
            }, e.matches = function(t, i) {
                return e(t, null, null, i)
            }, e.matchesSelector = function(t, i) {
                if ((t.ownerDocument || t) !== L && O(t), i = i.replace(ct, "='$1']"), x.matchesSelector && D && !V[i + " "] && (!N || !N.test(i)) && (!M || !M.test(i))) try {
                    var n = q.call(t, i);
                    if (n || x.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
                } catch (t) {}
                return e(i, L, null, [t]).length > 0
            }, e.contains = function(t, e) {
                return (t.ownerDocument || t) !== L && O(t), $(t, e)
            }, e.attr = function(t, e) {
                (t.ownerDocument || t) !== L && O(t);
                var i = T.attrHandle[e.toLowerCase()],
                    n = i && W.call(T.attrHandle, e.toLowerCase()) ? i(t, e, !D) : void 0;
                return void 0 !== n ? n : x.attributes || !D ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }, e.escape = function(t) {
                return (t + "").replace(wt, xt)
            }, e.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, e.uniqueSort = function(t) {
                var e, i = [],
                    n = 0,
                    r = 0;
                if (j = !x.detectDuplicates, R = !x.sortStable && t.slice(0), t.sort(Q), j) {
                    for (; e = t[r++];) e === t[r] && (n = i.push(r));
                    for (; n--;) t.splice(i[n], 1)
                }
                return R = null, t
            }, S = e.getText = function(t) {
                var e, i = "",
                    n = 0,
                    r = t.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) i += S(t)
                    } else if (3 === r || 4 === r) return t.nodeValue
                } else
                    for (; e = t[n++];) i += S(e);
                return i
            }, T = e.selectors = {
                cacheLength: 50,
                createPseudo: n,
                match: ft,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(yt, bt), t[3] = (t[3] || t[4] || t[5] || "").replace(yt, bt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, i = !t[6] && t[2];
                        return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && ut.test(i) && (e = k(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(yt, bt).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function(t) {
                        var e = U[t + " "];
                        return e || (e = new RegExp("(^|" + it + ")" + t + "(" + it + "|$)")) && U(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, i, n) {
                        return function(r) {
                            var s = e.attr(r, t);
                            return null == s ? "!=" === i : !i || (s += "", "=" === i ? s === n : "!=" === i ? s !== n : "^=" === i ? n && 0 === s.indexOf(n) : "*=" === i ? n && s.indexOf(n) > -1 : "$=" === i ? n && s.slice(-n.length) === n : "~=" === i ? (" " + s.replace(ot, " ") + " ").indexOf(n) > -1 : "|=" === i && (s === n || s.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(t, e, i, n, r) {
                        var s = "nth" !== t.slice(0, 3),
                            o = "last" !== t.slice(-4),
                            a = "of-type" === e;
                        return 1 === n && 0 === r ? function(t) {
                            return !!t.parentNode
                        } : function(e, i, l) {
                            var h, c, u, d, f, p, m = s !== o ? "nextSibling" : "previousSibling",
                                g = e.parentNode,
                                _ = a && e.nodeName.toLowerCase(),
                                v = !l && !a,
                                y = !1;
                            if (g) {
                                if (s) {
                                    for (; m;) {
                                        for (d = e; d = d[m];)
                                            if (a ? d.nodeName.toLowerCase() === _ : 1 === d.nodeType) return !1;
                                        p = m = "only" === t && !p && "nextSibling"
                                    }
                                    return !0
                                }
                                if (p = [o ? g.firstChild : g.lastChild], o && v) {
                                    for (d = g, u = d[F] || (d[F] = {}), c = u[d.uniqueID] || (u[d.uniqueID] = {}), h = c[t] || [], f = h[0] === B && h[1], y = f && h[2], d = f && g.childNodes[f]; d = ++f && d && d[m] || (y = f = 0) || p.pop();)
                                        if (1 === d.nodeType && ++y && d === e) {
                                            c[t] = [B, f, y];
                                            break
                                        }
                                } else if (v && (d = e, u = d[F] || (d[F] = {}), c = u[d.uniqueID] || (u[d.uniqueID] = {}), h = c[t] || [], f = h[0] === B && h[1], y = f), y === !1)
                                    for (;
                                        (d = ++f && d && d[m] || (y = f = 0) || p.pop()) && ((a ? d.nodeName.toLowerCase() !== _ : 1 !== d.nodeType) || !++y || (v && (u = d[F] || (d[F] = {}), c = u[d.uniqueID] || (u[d.uniqueID] = {}), c[t] = [B, y]), d !== e)););
                                return y -= r, y === n || y % n === 0 && y / n >= 0
                            }
                        }
                    },
                    PSEUDO: function(t, i) {
                        var r, s = T.pseudos[t] || T.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                        return s[F] ? s(i) : s.length > 1 ? (r = [t, t, "", i], T.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                            for (var n, r = s(t, i), o = r.length; o--;) n = tt(t, r[o]), t[n] = !(e[n] = r[o])
                        }) : function(t) {
                            return s(t, 0, r)
                        }) : s
                    }
                },
                pseudos: {
                    not: n(function(t) {
                        var e = [],
                            i = [],
                            r = C(t.replace(at, "$1"));
                        return r[F] ? n(function(t, e, i, n) {
                            for (var s, o = r(t, null, n, []), a = t.length; a--;)(s = o[a]) && (t[a] = !(e[a] = s))
                        }) : function(t, n, s) {
                            return e[0] = t, r(e, null, s, i), e[0] = null, !i.pop()
                        }
                    }),
                    has: n(function(t) {
                        return function(i) {
                            return e(t, i).length > 0
                        }
                    }),
                    contains: n(function(t) {
                        return t = t.replace(yt, bt),
                            function(e) {
                                return (e.textContent || e.innerText || S(e)).indexOf(t) > -1
                            }
                    }),
                    lang: n(function(t) {
                        return dt.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(yt, bt).toLowerCase(),
                            function(e) {
                                var i;
                                do
                                    if (i = D ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-");
                                while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var i = t.location && t.location.hash;
                        return i && i.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === I
                    },
                    focus: function(t) {
                        return t === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: h(!1),
                    disabled: h(!0),
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !T.pseudos.empty(t)
                    },
                    header: function(t) {
                        return mt.test(t.nodeName)
                    },
                    input: function(t) {
                        return pt.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: c(function() {
                        return [0]
                    }),
                    last: c(function(t, e) {
                        return [e - 1]
                    }),
                    eq: c(function(t, e, i) {
                        return [i < 0 ? i + e : i]
                    }),
                    even: c(function(t, e) {
                        for (var i = 0; i < e; i += 2) t.push(i);
                        return t
                    }),
                    odd: c(function(t, e) {
                        for (var i = 1; i < e; i += 2) t.push(i);
                        return t
                    }),
                    lt: c(function(t, e, i) {
                        for (var n = i < 0 ? i + e : i; --n >= 0;) t.push(n);
                        return t
                    }),
                    gt: c(function(t, e, i) {
                        for (var n = i < 0 ? i + e : i; ++n < e;) t.push(n);
                        return t
                    })
                }
            }, T.pseudos.nth = T.pseudos.eq;
            for (w in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) T.pseudos[w] = a(w);
            for (w in {
                    submit: !0,
                    reset: !0
                }) T.pseudos[w] = l(w);
            return d.prototype = T.filters = T.pseudos, T.setFilters = new d, k = e.tokenize = function(t, i) {
                var n, r, s, o, a, l, h, c = X[t + " "];
                if (c) return i ? 0 : c.slice(0);
                for (a = t, l = [], h = T.preFilter; a;) {
                    n && !(r = lt.exec(a)) || (r && (a = a.slice(r[0].length) || a), l.push(s = [])), n = !1, (r = ht.exec(a)) && (n = r.shift(), s.push({
                        value: n,
                        type: r[0].replace(at, " ")
                    }), a = a.slice(n.length));
                    for (o in T.filter) !(r = ft[o].exec(a)) || h[o] && !(r = h[o](r)) || (n = r.shift(), s.push({
                        value: n,
                        type: o,
                        matches: r
                    }), a = a.slice(n.length));
                    if (!n) break
                }
                return i ? a.length : a ? e.error(t) : X(t, l).slice(0)
            }, C = e.compile = function(t, e) {
                var i, n = [],
                    r = [],
                    s = V[t + " "];
                if (!s) {
                    for (e || (e = k(t)), i = e.length; i--;) s = y(e[i]), s[F] ? n.push(s) : r.push(s);
                    s = V(t, b(r, n)), s.selector = t
                }
                return s
            }, E = e.select = function(t, e, i, n) {
                var r, s, o, a, l, h = "function" == typeof t && t,
                    c = !n && k(t = h.selector || t);
                if (i = i || [], 1 === c.length) {
                    if (s = c[0] = c[0].slice(0), s.length > 2 && "ID" === (o = s[0]).type && 9 === e.nodeType && D && T.relative[s[1].type]) {
                        if (e = (T.find.ID(o.matches[0].replace(yt, bt), e) || [])[0], !e) return i;
                        h && (e = e.parentNode), t = t.slice(s.shift().value.length)
                    }
                    for (r = ft.needsContext.test(t) ? 0 : s.length; r-- && (o = s[r], !T.relative[a = o.type]);)
                        if ((l = T.find[a]) && (n = l(o.matches[0].replace(yt, bt), vt.test(s[0].type) && u(e.parentNode) || e))) {
                            if (s.splice(r, 1), t = n.length && f(s), !t) return Z.apply(i, n), i;
                            break
                        }
                }
                return (h || C(t, c))(n, e, !D, i, !e || vt.test(t) && u(e.parentNode) || e), i
            }, x.sortStable = F.split("").sort(Q).join("") === F, x.detectDuplicates = !!j, O(), x.sortDetached = r(function(t) {
                return 1 & t.compareDocumentPosition(L.createElement("fieldset"))
            }), r(function(t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || s("type|href|height|width", function(t, e, i) {
                if (!i) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), x.attributes && r(function(t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || s("value", function(t, e, i) {
                if (!i && "input" === t.nodeName.toLowerCase()) return t.defaultValue
            }), r(function(t) {
                return null == t.getAttribute("disabled")
            }) || s(et, function(t, e, i) {
                var n;
                if (!i) return t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }), e
        }(t);
        mt.find = bt, mt.expr = bt.selectors, mt.expr[":"] = mt.expr.pseudos, mt.uniqueSort = mt.unique = bt.uniqueSort, mt.text = bt.getText, mt.isXMLDoc = bt.isXML, mt.contains = bt.contains, mt.escapeSelector = bt.escape;
        var wt = function(t, e, i) {
                for (var n = [], r = void 0 !== i;
                    (t = t[e]) && 9 !== t.nodeType;)
                    if (1 === t.nodeType) {
                        if (r && mt(t).is(i)) break;
                        n.push(t)
                    }
                return n
            },
            xt = function(t, e) {
                for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
                return i
            },
            Tt = mt.expr.match.needsContext,
            St = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
            Pt = /^.[^:#\[\.,]*$/;
        mt.filter = function(t, e, i) {
            var n = e[0];
            return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? mt.find.matchesSelector(n, t) ? [n] : [] : mt.find.matches(t, mt.grep(e, function(t) {
                return 1 === t.nodeType
            }))
        }, mt.fn.extend({
            find: function(t) {
                var e, i, n = this.length,
                    r = this;
                if ("string" != typeof t) return this.pushStack(mt(t).filter(function() {
                    for (e = 0; e < n; e++)
                        if (mt.contains(r[e], this)) return !0
                }));
                for (i = this.pushStack([]), e = 0; e < n; e++) mt.find(t, r[e], i);
                return n > 1 ? mt.uniqueSort(i) : i
            },
            filter: function(t) {
                return this.pushStack(s(this, t || [], !1))
            },
            not: function(t) {
                return this.pushStack(s(this, t || [], !0))
            },
            is: function(t) {
                return !!s(this, "string" == typeof t && Tt.test(t) ? mt(t) : t || [], !1).length
            }
        });
        var kt, Ct = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            Et = mt.fn.init = function(t, e, i) {
                var n, r;
                if (!t) return this;
                if (i = i || kt, "string" == typeof t) {
                    if (n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : Ct.exec(t), !n || !n[1] && e) return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
                    if (n[1]) {
                        if (e = e instanceof mt ? e[0] : e, mt.merge(this, mt.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : it, !0)), St.test(n[1]) && mt.isPlainObject(e))
                            for (n in e) mt.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                        return this
                    }
                    return r = it.getElementById(n[2]), r && (this[0] = r, this.length = 1), this
                }
                return t.nodeType ? (this[0] = t, this.length = 1, this) : mt.isFunction(t) ? void 0 !== i.ready ? i.ready(t) : t(mt) : mt.makeArray(t, this)
            };
        Et.prototype = mt.fn, kt = mt(it);
        var At = /^(?:parents|prev(?:Until|All))/,
            Rt = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        mt.fn.extend({
            has: function(t) {
                var e = mt(t, this),
                    i = e.length;
                return this.filter(function() {
                    for (var t = 0; t < i; t++)
                        if (mt.contains(this, e[t])) return !0
                })
            },
            closest: function(t, e) {
                var i, n = 0,
                    r = this.length,
                    s = [],
                    o = "string" != typeof t && mt(t);
                if (!Tt.test(t))
                    for (; n < r; n++)
                        for (i = this[n]; i && i !== e; i = i.parentNode)
                            if (i.nodeType < 11 && (o ? o.index(i) > -1 : 1 === i.nodeType && mt.find.matchesSelector(i, t))) {
                                s.push(i);
                                break
                            }
                return this.pushStack(s.length > 1 ? mt.uniqueSort(s) : s)
            },
            index: function(t) {
                return t ? "string" == typeof t ? at.call(mt(t), this[0]) : at.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                return this.pushStack(mt.uniqueSort(mt.merge(this.get(), mt(t, e))))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), mt.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return wt(t, "parentNode")
            },
            parentsUntil: function(t, e, i) {
                return wt(t, "parentNode", i)
            },
            next: function(t) {
                return o(t, "nextSibling")
            },
            prev: function(t) {
                return o(t, "previousSibling")
            },
            nextAll: function(t) {
                return wt(t, "nextSibling")
            },
            prevAll: function(t) {
                return wt(t, "previousSibling")
            },
            nextUntil: function(t, e, i) {
                return wt(t, "nextSibling", i)
            },
            prevUntil: function(t, e, i) {
                return wt(t, "previousSibling", i)
            },
            siblings: function(t) {
                return xt((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return xt(t.firstChild)
            },
            contents: function(t) {
                return r(t, "iframe") ? t.contentDocument : (r(t, "template") && (t = t.content || t), mt.merge([], t.childNodes))
            }
        }, function(t, e) {
            mt.fn[t] = function(i, n) {
                var r = mt.map(this, e, i);
                return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (r = mt.filter(n, r)), this.length > 1 && (Rt[t] || mt.uniqueSort(r), At.test(t) && r.reverse()), this.pushStack(r)
            }
        });
        var jt = /[^\x20\t\r\n\f]+/g;
        mt.Callbacks = function(t) {
            t = "string" == typeof t ? a(t) : mt.extend({}, t);
            var e, i, n, r, s = [],
                o = [],
                l = -1,
                h = function() {
                    for (r = r || t.once, n = e = !0; o.length; l = -1)
                        for (i = o.shift(); ++l < s.length;) s[l].apply(i[0], i[1]) === !1 && t.stopOnFalse && (l = s.length, i = !1);
                    t.memory || (i = !1), e = !1, r && (s = i ? [] : "")
                },
                c = {
                    add: function() {
                        return s && (i && !e && (l = s.length - 1, o.push(i)), function e(i) {
                            mt.each(i, function(i, n) {
                                mt.isFunction(n) ? t.unique && c.has(n) || s.push(n) : n && n.length && "string" !== mt.type(n) && e(n)
                            })
                        }(arguments), i && !e && h()), this
                    },
                    remove: function() {
                        return mt.each(arguments, function(t, e) {
                            for (var i;
                                (i = mt.inArray(e, s, i)) > -1;) s.splice(i, 1), i <= l && l--
                        }), this
                    },
                    has: function(t) {
                        return t ? mt.inArray(t, s) > -1 : s.length > 0
                    },
                    empty: function() {
                        return s && (s = []), this
                    },
                    disable: function() {
                        return r = o = [], s = i = "", this
                    },
                    disabled: function() {
                        return !s
                    },
                    lock: function() {
                        return r = o = [], i || e || (s = i = ""), this
                    },
                    locked: function() {
                        return !!r
                    },
                    fireWith: function(t, i) {
                        return r || (i = i || [], i = [t, i.slice ? i.slice() : i], o.push(i), e || h()), this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!n
                    }
                };
            return c
        }, mt.extend({
            Deferred: function(e) {
                var i = [
                        ["notify", "progress", mt.Callbacks("memory"), mt.Callbacks("memory"), 2],
                        ["resolve", "done", mt.Callbacks("once memory"), mt.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", mt.Callbacks("once memory"), mt.Callbacks("once memory"), 1, "rejected"]
                    ],
                    n = "pending",
                    r = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return s.done(arguments).fail(arguments), this
                        },
                        catch: function(t) {
                            return r.then(null, t)
                        },
                        pipe: function() {
                            var t = arguments;
                            return mt.Deferred(function(e) {
                                mt.each(i, function(i, n) {
                                    var r = mt.isFunction(t[n[4]]) && t[n[4]];
                                    s[n[1]](function() {
                                        var t = r && r.apply(this, arguments);
                                        t && mt.isFunction(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[n[0] + "With"](this, r ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        },
                        then: function(e, n, r) {
                            function s(e, i, n, r) {
                                return function() {
                                    var a = this,
                                        c = arguments,
                                        u = function() {
                                            var t, u;
                                            if (!(e < o)) {
                                                if (t = n.apply(a, c), t === i.promise()) throw new TypeError("Thenable self-resolution");
                                                u = t && ("object" == typeof t || "function" == typeof t) && t.then, mt.isFunction(u) ? r ? u.call(t, s(o, i, l, r), s(o, i, h, r)) : (o++, u.call(t, s(o, i, l, r), s(o, i, h, r), s(o, i, l, i.notifyWith))) : (n !== l && (a = void 0, c = [t]), (r || i.resolveWith)(a, c))
                                            }
                                        },
                                        d = r ? u : function() {
                                            try {
                                                u()
                                            } catch (t) {
                                                mt.Deferred.exceptionHook && mt.Deferred.exceptionHook(t, d.stackTrace), e + 1 >= o && (n !== h && (a = void 0, c = [t]), i.rejectWith(a, c))
                                            }
                                        };
                                    e ? d() : (mt.Deferred.getStackHook && (d.stackTrace = mt.Deferred.getStackHook()), t.setTimeout(d))
                                }
                            }
                            var o = 0;
                            return mt.Deferred(function(t) {
                                i[0][3].add(s(0, t, mt.isFunction(r) ? r : l, t.notifyWith)), i[1][3].add(s(0, t, mt.isFunction(e) ? e : l)), i[2][3].add(s(0, t, mt.isFunction(n) ? n : h))
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? mt.extend(t, r) : r
                        }
                    },
                    s = {};
                return mt.each(i, function(t, e) {
                    var o = e[2],
                        a = e[5];
                    r[e[1]] = o.add, a && o.add(function() {
                        n = a
                    }, i[3 - t][2].disable, i[0][2].lock), o.add(e[3].fire), s[e[0]] = function() {
                        return s[e[0] + "With"](this === s ? void 0 : this, arguments), this
                    }, s[e[0] + "With"] = o.fireWith
                }), r.promise(s), e && e.call(s, s), s
            },
            when: function(t) {
                var e = arguments.length,
                    i = e,
                    n = Array(i),
                    r = rt.call(arguments),
                    s = mt.Deferred(),
                    o = function(t) {
                        return function(i) {
                            n[t] = this, r[t] = arguments.length > 1 ? rt.call(arguments) : i, --e || s.resolveWith(n, r)
                        }
                    };
                if (e <= 1 && (c(t, s.done(o(i)).resolve, s.reject, !e), "pending" === s.state() || mt.isFunction(r[i] && r[i].then))) return s.then();
                for (; i--;) c(r[i], o(i), s.reject);
                return s.promise()
            }
        });
        var Ot = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        mt.Deferred.exceptionHook = function(e, i) {
            t.console && t.console.warn && e && Ot.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, i)
        }, mt.readyException = function(e) {
            t.setTimeout(function() {
                throw e
            })
        };
        var Lt = mt.Deferred();
        mt.fn.ready = function(t) {
            return Lt.then(t).catch(function(t) {
                mt.readyException(t)
            }), this
        }, mt.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(t) {
                (t === !0 ? --mt.readyWait : mt.isReady) || (mt.isReady = !0, t !== !0 && --mt.readyWait > 0 || Lt.resolveWith(it, [mt]))
            }
        }), mt.ready.then = Lt.then, "complete" === it.readyState || "loading" !== it.readyState && !it.documentElement.doScroll ? t.setTimeout(mt.ready) : (it.addEventListener("DOMContentLoaded", u), t.addEventListener("load", u));
        var It = function(t, e, i, n, r, s, o) {
                var a = 0,
                    l = t.length,
                    h = null == i;
                if ("object" === mt.type(i)) {
                    r = !0;
                    for (a in i) It(t, e, a, i[a], !0, s, o)
                } else if (void 0 !== n && (r = !0, mt.isFunction(n) || (o = !0), h && (o ? (e.call(t, n), e = null) : (h = e, e = function(t, e, i) {
                        return h.call(mt(t), i)
                    })), e))
                    for (; a < l; a++) e(t[a], i, o ? n : n.call(t[a], a, e(t[a], i)));
                return r ? t : h ? e.call(t) : l ? e(t[0], i) : s
            },
            Dt = function(t) {
                return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
            };
        d.uid = 1, d.prototype = {
            cache: function(t) {
                var e = t[this.expando];
                return e || (e = {}, Dt(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                    value: e,
                    configurable: !0
                }))), e
            },
            set: function(t, e, i) {
                var n, r = this.cache(t);
                if ("string" == typeof e) r[mt.camelCase(e)] = i;
                else
                    for (n in e) r[mt.camelCase(n)] = e[n];
                return r
            },
            get: function(t, e) {
                return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][mt.camelCase(e)]
            },
            access: function(t, e, i) {
                return void 0 === e || e && "string" == typeof e && void 0 === i ? this.get(t, e) : (this.set(t, e, i), void 0 !== i ? i : e)
            },
            remove: function(t, e) {
                var i, n = t[this.expando];
                if (void 0 !== n) {
                    if (void 0 !== e) {
                        Array.isArray(e) ? e = e.map(mt.camelCase) : (e = mt.camelCase(e), e = e in n ? [e] : e.match(jt) || []), i = e.length;
                        for (; i--;) delete n[e[i]]
                    }(void 0 === e || mt.isEmptyObject(n)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
                }
            },
            hasData: function(t) {
                var e = t[this.expando];
                return void 0 !== e && !mt.isEmptyObject(e)
            }
        };
        var Mt = new d,
            Nt = new d,
            qt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            $t = /[A-Z]/g;
        mt.extend({
            hasData: function(t) {
                return Nt.hasData(t) || Mt.hasData(t)
            },
            data: function(t, e, i) {
                return Nt.access(t, e, i)
            },
            removeData: function(t, e) {
                Nt.remove(t, e)
            },
            _data: function(t, e, i) {
                return Mt.access(t, e, i)
            },
            _removeData: function(t, e) {
                Mt.remove(t, e)
            }
        }), mt.fn.extend({
            data: function(t, e) {
                var i, n, r, s = this[0],
                    o = s && s.attributes;
                if (void 0 === t) {
                    if (this.length && (r = Nt.get(s), 1 === s.nodeType && !Mt.get(s, "hasDataAttrs"))) {
                        for (i = o.length; i--;) o[i] && (n = o[i].name, 0 === n.indexOf("data-") && (n = mt.camelCase(n.slice(5)), p(s, n, r[n])));
                        Mt.set(s, "hasDataAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof t ? this.each(function() {
                    Nt.set(this, t)
                }) : It(this, function(e) {
                    var i;
                    if (s && void 0 === e) {
                        if (i = Nt.get(s, t), void 0 !== i) return i;
                        if (i = p(s, t), void 0 !== i) return i
                    } else this.each(function() {
                        Nt.set(this, t, e)
                    })
                }, null, e, arguments.length > 1, null, !0)
            },
            removeData: function(t) {
                return this.each(function() {
                    Nt.remove(this, t)
                })
            }
        }), mt.extend({
            queue: function(t, e, i) {
                var n;
                if (t) return e = (e || "fx") + "queue", n = Mt.get(t, e), i && (!n || Array.isArray(i) ? n = Mt.access(t, e, mt.makeArray(i)) : n.push(i)), n || []
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var i = mt.queue(t, e),
                    n = i.length,
                    r = i.shift(),
                    s = mt._queueHooks(t, e),
                    o = function() {
                        mt.dequeue(t, e)
                    };
                "inprogress" === r && (r = i.shift(), n--), r && ("fx" === e && i.unshift("inprogress"), delete s.stop, r.call(t, o, s)), !n && s && s.empty.fire()
            },
            _queueHooks: function(t, e) {
                var i = e + "queueHooks";
                return Mt.get(t, i) || Mt.access(t, i, {
                    empty: mt.Callbacks("once memory").add(function() {
                        Mt.remove(t, [e + "queue", i])
                    })
                })
            }
        }), mt.fn.extend({
            queue: function(t, e) {
                var i = 2;
                return "string" != typeof t && (e = t,
                    t = "fx", i--), arguments.length < i ? mt.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                    var i = mt.queue(this, t, e);
                    mt._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && mt.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    mt.dequeue(this, t)
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, e) {
                var i, n = 1,
                    r = mt.Deferred(),
                    s = this,
                    o = this.length,
                    a = function() {
                        --n || r.resolveWith(s, [s])
                    };
                for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; o--;) i = Mt.get(s[o], t + "queueHooks"), i && i.empty && (n++, i.empty.add(a));
                return a(), r.promise(e)
            }
        });
        var Ft = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            zt = new RegExp("^(?:([+-])=|)(" + Ft + ")([a-z%]*)$", "i"),
            Bt = ["Top", "Right", "Bottom", "Left"],
            Ht = function(t, e) {
                return t = e || t, "none" === t.style.display || "" === t.style.display && mt.contains(t.ownerDocument, t) && "none" === mt.css(t, "display")
            },
            Ut = function(t, e, i, n) {
                var r, s, o = {};
                for (s in e) o[s] = t.style[s], t.style[s] = e[s];
                r = i.apply(t, n || []);
                for (s in e) t.style[s] = o[s];
                return r
            },
            Xt = {};
        mt.fn.extend({
            show: function() {
                return _(this, !0)
            },
            hide: function() {
                return _(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    Ht(this) ? mt(this).show() : mt(this).hide()
                })
            }
        });
        var Vt = /^(?:checkbox|radio)$/i,
            Qt = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            Wt = /^$|\/(?:java|ecma)script/i,
            Gt = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Gt.optgroup = Gt.option, Gt.tbody = Gt.tfoot = Gt.colgroup = Gt.caption = Gt.thead, Gt.th = Gt.td;
        var Yt = /<|&#?\w+;/;
        ! function() {
            var t = it.createDocumentFragment(),
                e = t.appendChild(it.createElement("div")),
                i = it.createElement("input");
            i.setAttribute("type", "radio"), i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), e.appendChild(i), ft.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", ft.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
        }();
        var Jt = it.documentElement,
            Zt = /^key/,
            Kt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            te = /^([^.]*)(?:\.(.+)|)/;
        mt.event = {
            global: {},
            add: function(t, e, i, n, r) {
                var s, o, a, l, h, c, u, d, f, p, m, g = Mt.get(t);
                if (g)
                    for (i.handler && (s = i, i = s.handler, r = s.selector), r && mt.find.matchesSelector(Jt, r), i.guid || (i.guid = mt.guid++), (l = g.events) || (l = g.events = {}), (o = g.handle) || (o = g.handle = function(e) {
                            return "undefined" != typeof mt && mt.event.triggered !== e.type ? mt.event.dispatch.apply(t, arguments) : void 0
                        }), e = (e || "").match(jt) || [""], h = e.length; h--;) a = te.exec(e[h]) || [], f = m = a[1], p = (a[2] || "").split(".").sort(), f && (u = mt.event.special[f] || {}, f = (r ? u.delegateType : u.bindType) || f, u = mt.event.special[f] || {}, c = mt.extend({
                        type: f,
                        origType: m,
                        data: n,
                        handler: i,
                        guid: i.guid,
                        selector: r,
                        needsContext: r && mt.expr.match.needsContext.test(r),
                        namespace: p.join(".")
                    }, s), (d = l[f]) || (d = l[f] = [], d.delegateCount = 0, u.setup && u.setup.call(t, n, p, o) !== !1 || t.addEventListener && t.addEventListener(f, o)), u.add && (u.add.call(t, c), c.handler.guid || (c.handler.guid = i.guid)), r ? d.splice(d.delegateCount++, 0, c) : d.push(c), mt.event.global[f] = !0)
            },
            remove: function(t, e, i, n, r) {
                var s, o, a, l, h, c, u, d, f, p, m, g = Mt.hasData(t) && Mt.get(t);
                if (g && (l = g.events)) {
                    for (e = (e || "").match(jt) || [""], h = e.length; h--;)
                        if (a = te.exec(e[h]) || [], f = m = a[1], p = (a[2] || "").split(".").sort(), f) {
                            for (u = mt.event.special[f] || {}, f = (n ? u.delegateType : u.bindType) || f, d = l[f] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = d.length; s--;) c = d[s], !r && m !== c.origType || i && i.guid !== c.guid || a && !a.test(c.namespace) || n && n !== c.selector && ("**" !== n || !c.selector) || (d.splice(s, 1), c.selector && d.delegateCount--, u.remove && u.remove.call(t, c));
                            o && !d.length && (u.teardown && u.teardown.call(t, p, g.handle) !== !1 || mt.removeEvent(t, f, g.handle), delete l[f])
                        } else
                            for (f in l) mt.event.remove(t, f + e[h], i, n, !0);
                    mt.isEmptyObject(l) && Mt.remove(t, "handle events")
                }
            },
            dispatch: function(t) {
                var e, i, n, r, s, o, a = mt.event.fix(t),
                    l = new Array(arguments.length),
                    h = (Mt.get(this, "events") || {})[a.type] || [],
                    c = mt.event.special[a.type] || {};
                for (l[0] = a, e = 1; e < arguments.length; e++) l[e] = arguments[e];
                if (a.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, a) !== !1) {
                    for (o = mt.event.handlers.call(this, a, h), e = 0;
                        (r = o[e++]) && !a.isPropagationStopped();)
                        for (a.currentTarget = r.elem, i = 0;
                            (s = r.handlers[i++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(s.namespace) || (a.handleObj = s, a.data = s.data, n = ((mt.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, l), void 0 !== n && (a.result = n) === !1 && (a.preventDefault(), a.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, a), a.result
                }
            },
            handlers: function(t, e) {
                var i, n, r, s, o, a = [],
                    l = e.delegateCount,
                    h = t.target;
                if (l && h.nodeType && !("click" === t.type && t.button >= 1))
                    for (; h !== this; h = h.parentNode || this)
                        if (1 === h.nodeType && ("click" !== t.type || h.disabled !== !0)) {
                            for (s = [], o = {}, i = 0; i < l; i++) n = e[i], r = n.selector + " ", void 0 === o[r] && (o[r] = n.needsContext ? mt(r, this).index(h) > -1 : mt.find(r, this, null, [h]).length), o[r] && s.push(n);
                            s.length && a.push({
                                elem: h,
                                handlers: s
                            })
                        }
                return h = this, l < e.length && a.push({
                    elem: h,
                    handlers: e.slice(l)
                }), a
            },
            addProp: function(t, e) {
                Object.defineProperty(mt.Event.prototype, t, {
                    enumerable: !0,
                    configurable: !0,
                    get: mt.isFunction(e) ? function() {
                        if (this.originalEvent) return e(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[t]
                    },
                    set: function(e) {
                        Object.defineProperty(this, t, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: e
                        })
                    }
                })
            },
            fix: function(t) {
                return t[mt.expando] ? t : new mt.Event(t)
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== T() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === T() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if (Vt.test(this.type) && this.click && r(this, "input")) return this.click(), !1
                    },
                    _default: function(t) {
                        return r(t.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            }
        }, mt.removeEvent = function(t, e, i) {
            t.removeEventListener && t.removeEventListener(e, i)
        }, mt.Event = function(t, e) {
            return this instanceof mt.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? w : x, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && mt.extend(this, e), this.timeStamp = t && t.timeStamp || mt.now(), void(this[mt.expando] = !0)) : new mt.Event(t, e)
        }, mt.Event.prototype = {
            constructor: mt.Event,
            isDefaultPrevented: x,
            isPropagationStopped: x,
            isImmediatePropagationStopped: x,
            isSimulated: !1,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = w, t && !this.isSimulated && t.preventDefault()
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = w, t && !this.isSimulated && t.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = w, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, mt.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(t) {
                var e = t.button;
                return null == t.which && Zt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && Kt.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
            }
        }, mt.event.addProp), mt.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(t, e) {
            mt.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var i, n = this,
                        r = t.relatedTarget,
                        s = t.handleObj;
                    return r && (r === n || mt.contains(n, r)) || (t.type = s.origType, i = s.handler.apply(this, arguments), t.type = e), i
                }
            }
        }), mt.fn.extend({
            on: function(t, e, i, n) {
                return S(this, t, e, i, n)
            },
            one: function(t, e, i, n) {
                return S(this, t, e, i, n, 1)
            },
            off: function(t, e, i) {
                var n, r;
                if (t && t.preventDefault && t.handleObj) return n = t.handleObj, mt(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                if ("object" == typeof t) {
                    for (r in t) this.off(r, e, t[r]);
                    return this
                }
                return e !== !1 && "function" != typeof e || (i = e, e = void 0), i === !1 && (i = x), this.each(function() {
                    mt.event.remove(this, t, i, e)
                })
            }
        });
        var ee = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            ie = /<script|<style|<link/i,
            ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
            re = /^true\/(.*)/,
            se = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        mt.extend({
            htmlPrefilter: function(t) {
                return t.replace(ee, "<$1></$2>")
            },
            clone: function(t, e, i) {
                var n, r, s, o, a = t.cloneNode(!0),
                    l = mt.contains(t.ownerDocument, t);
                if (!(ft.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || mt.isXMLDoc(t)))
                    for (o = v(a), s = v(t), n = 0, r = s.length; n < r; n++) A(s[n], o[n]);
                if (e)
                    if (i)
                        for (s = s || v(t), o = o || v(a), n = 0, r = s.length; n < r; n++) E(s[n], o[n]);
                    else E(t, a);
                return o = v(a, "script"), o.length > 0 && y(o, !l && v(t, "script")), a
            },
            cleanData: function(t) {
                for (var e, i, n, r = mt.event.special, s = 0; void 0 !== (i = t[s]); s++)
                    if (Dt(i)) {
                        if (e = i[Mt.expando]) {
                            if (e.events)
                                for (n in e.events) r[n] ? mt.event.remove(i, n) : mt.removeEvent(i, n, e.handle);
                            i[Mt.expando] = void 0
                        }
                        i[Nt.expando] && (i[Nt.expando] = void 0)
                    }
            }
        }), mt.fn.extend({
            detach: function(t) {
                return j(this, t, !0)
            },
            remove: function(t) {
                return j(this, t)
            },
            text: function(t) {
                return It(this, function(t) {
                    return void 0 === t ? mt.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                    })
                }, null, t, arguments.length)
            },
            append: function() {
                return R(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = P(this, t);
                        e.appendChild(t)
                    }
                })
            },
            prepend: function() {
                return R(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = P(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return R(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return R(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (mt.cleanData(v(t, !1)), t.textContent = "");
                return this
            },
            clone: function(t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function() {
                    return mt.clone(this, t, e)
                })
            },
            html: function(t) {
                return It(this, function(t) {
                    var e = this[0] || {},
                        i = 0,
                        n = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if ("string" == typeof t && !ie.test(t) && !Gt[(Qt.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = mt.htmlPrefilter(t);
                        try {
                            for (; i < n; i++) e = this[i] || {}, 1 === e.nodeType && (mt.cleanData(v(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (t) {}
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = [];
                return R(this, arguments, function(e) {
                    var i = this.parentNode;
                    mt.inArray(this, t) < 0 && (mt.cleanData(v(this)), i && i.replaceChild(e, this))
                }, t)
            }
        }), mt.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            mt.fn[t] = function(t) {
                for (var i, n = [], r = mt(t), s = r.length - 1, o = 0; o <= s; o++) i = o === s ? this : this.clone(!0), mt(r[o])[e](i), ot.apply(n, i.get());
                return this.pushStack(n)
            }
        });
        var oe = /^margin/,
            ae = new RegExp("^(" + Ft + ")(?!px)[a-z%]+$", "i"),
            le = function(e) {
                var i = e.ownerDocument.defaultView;
                return i && i.opener || (i = t), i.getComputedStyle(e)
            };
        ! function() {
            function e() {
                if (a) {
                    a.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", Jt.appendChild(o);
                    var e = t.getComputedStyle(a);
                    i = "1%" !== e.top, s = "2px" === e.marginLeft, n = "4px" === e.width, a.style.marginRight = "50%", r = "4px" === e.marginRight, Jt.removeChild(o), a = null
                }
            }
            var i, n, r, s, o = it.createElement("div"),
                a = it.createElement("div");
            a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", ft.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", o.appendChild(a), mt.extend(ft, {
                pixelPosition: function() {
                    return e(), i
                },
                boxSizingReliable: function() {
                    return e(), n
                },
                pixelMarginRight: function() {
                    return e(), r
                },
                reliableMarginLeft: function() {
                    return e(), s
                }
            }))
        }();
        var he = /^(none|table(?!-c[ea]).+)/,
            ce = /^--/,
            ue = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            de = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            fe = ["Webkit", "Moz", "ms"],
            pe = it.createElement("div").style;
        mt.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var i = O(t, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: "cssFloat"
            },
            style: function(t, e, i, n) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var r, s, o, a = mt.camelCase(e),
                        l = ce.test(e),
                        h = t.style;
                    return l || (e = D(a)), o = mt.cssHooks[e] || mt.cssHooks[a], void 0 === i ? o && "get" in o && void 0 !== (r = o.get(t, !1, n)) ? r : h[e] : (s = typeof i, "string" === s && (r = zt.exec(i)) && r[1] && (i = m(t, e, r), s = "number"), null != i && i === i && ("number" === s && (i += r && r[3] || (mt.cssNumber[a] ? "" : "px")), ft.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (h[e] = "inherit"), o && "set" in o && void 0 === (i = o.set(t, i, n)) || (l ? h.setProperty(e, i) : h[e] = i)), void 0)
                }
            },
            css: function(t, e, i, n) {
                var r, s, o, a = mt.camelCase(e),
                    l = ce.test(e);
                return l || (e = D(a)), o = mt.cssHooks[e] || mt.cssHooks[a], o && "get" in o && (r = o.get(t, !0, i)), void 0 === r && (r = O(t, e, n)), "normal" === r && e in de && (r = de[e]), "" === i || i ? (s = parseFloat(r), i === !0 || isFinite(s) ? s || 0 : r) : r
            }
        }), mt.each(["height", "width"], function(t, e) {
            mt.cssHooks[e] = {
                get: function(t, i, n) {
                    if (i) return !he.test(mt.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? q(t, e, n) : Ut(t, ue, function() {
                        return q(t, e, n)
                    })
                },
                set: function(t, i, n) {
                    var r, s = n && le(t),
                        o = n && N(t, e, n, "border-box" === mt.css(t, "boxSizing", !1, s), s);
                    return o && (r = zt.exec(i)) && "px" !== (r[3] || "px") && (t.style[e] = i, i = mt.css(t, e)), M(t, i, o)
                }
            }
        }), mt.cssHooks.marginLeft = L(ft.reliableMarginLeft, function(t, e) {
            if (e) return (parseFloat(O(t, "marginLeft")) || t.getBoundingClientRect().left - Ut(t, {
                marginLeft: 0
            }, function() {
                return t.getBoundingClientRect().left
            })) + "px"
        }), mt.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            mt.cssHooks[t + e] = {
                expand: function(i) {
                    for (var n = 0, r = {}, s = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++) r[t + Bt[n] + e] = s[n] || s[n - 2] || s[0];
                    return r
                }
            }, oe.test(t) || (mt.cssHooks[t + e].set = M)
        }), mt.fn.extend({
            css: function(t, e) {
                return It(this, function(t, e, i) {
                    var n, r, s = {},
                        o = 0;
                    if (Array.isArray(e)) {
                        for (n = le(t), r = e.length; o < r; o++) s[e[o]] = mt.css(t, e[o], !1, n);
                        return s
                    }
                    return void 0 !== i ? mt.style(t, e, i) : mt.css(t, e)
                }, t, e, arguments.length > 1)
            }
        }), mt.Tween = $, $.prototype = {
            constructor: $,
            init: function(t, e, i, n, r, s) {
                this.elem = t, this.prop = i, this.easing = r || mt.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = s || (mt.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var t = $.propHooks[this.prop];
                return t && t.get ? t.get(this) : $.propHooks._default.get(this)
            },
            run: function(t) {
                var e, i = $.propHooks[this.prop];
                return this.options.duration ? this.pos = e = mt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : $.propHooks._default.set(this), this
            }
        }, $.prototype.init.prototype = $.prototype, $.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = mt.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0)
                },
                set: function(t) {
                    mt.fx.step[t.prop] ? mt.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[mt.cssProps[t.prop]] && !mt.cssHooks[t.prop] ? t.elem[t.prop] = t.now : mt.style(t.elem, t.prop, t.now + t.unit)
                }
            }
        }, $.propHooks.scrollTop = $.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, mt.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            },
            _default: "swing"
        }, mt.fx = $.prototype.init, mt.fx.step = {};
        var me, ge, _e = /^(?:toggle|show|hide)$/,
            ve = /queueHooks$/;
        mt.Animation = mt.extend(V, {
                tweeners: {
                    "*": [function(t, e) {
                        var i = this.createTween(t, e);
                        return m(i.elem, t, zt.exec(e), i), i
                    }]
                },
                tweener: function(t, e) {
                    mt.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(jt);
                    for (var i, n = 0, r = t.length; n < r; n++) i = t[n], V.tweeners[i] = V.tweeners[i] || [], V.tweeners[i].unshift(e)
                },
                prefilters: [U],
                prefilter: function(t, e) {
                    e ? V.prefilters.unshift(t) : V.prefilters.push(t)
                }
            }), mt.speed = function(t, e, i) {
                var n = t && "object" == typeof t ? mt.extend({}, t) : {
                    complete: i || !i && e || mt.isFunction(t) && t,
                    duration: t,
                    easing: i && e || e && !mt.isFunction(e) && e
                };
                return mt.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in mt.fx.speeds ? n.duration = mt.fx.speeds[n.duration] : n.duration = mt.fx.speeds._default), null != n.queue && n.queue !== !0 || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                    mt.isFunction(n.old) && n.old.call(this), n.queue && mt.dequeue(this, n.queue)
                }, n
            }, mt.fn.extend({
                fadeTo: function(t, e, i, n) {
                    return this.filter(Ht).css("opacity", 0).show().end().animate({
                        opacity: e
                    }, t, i, n)
                },
                animate: function(t, e, i, n) {
                    var r = mt.isEmptyObject(t),
                        s = mt.speed(e, i, n),
                        o = function() {
                            var e = V(this, mt.extend({}, t), s);
                            (r || Mt.get(this, "finish")) && e.stop(!0)
                        };
                    return o.finish = o, r || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
                },
                stop: function(t, e, i) {
                    var n = function(t) {
                        var e = t.stop;
                        delete t.stop, e(i)
                    };
                    return "string" != typeof t && (i = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                        var e = !0,
                            r = null != t && t + "queueHooks",
                            s = mt.timers,
                            o = Mt.get(this);
                        if (r) o[r] && o[r].stop && n(o[r]);
                        else
                            for (r in o) o[r] && o[r].stop && ve.test(r) && n(o[r]);
                        for (r = s.length; r--;) s[r].elem !== this || null != t && s[r].queue !== t || (s[r].anim.stop(i), e = !1, s.splice(r, 1));
                        !e && i || mt.dequeue(this, t)
                    })
                },
                finish: function(t) {
                    return t !== !1 && (t = t || "fx"), this.each(function() {
                        var e, i = Mt.get(this),
                            n = i[t + "queue"],
                            r = i[t + "queueHooks"],
                            s = mt.timers,
                            o = n ? n.length : 0;
                        for (i.finish = !0, mt.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = s.length; e--;) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                        for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                        delete i.finish
                    })
                }
            }), mt.each(["toggle", "show", "hide"], function(t, e) {
                var i = mt.fn[e];
                mt.fn[e] = function(t, n, r) {
                    return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(B(e, !0), t, n, r)
                }
            }), mt.each({
                slideDown: B("show"),
                slideUp: B("hide"),
                slideToggle: B("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(t, e) {
                mt.fn[t] = function(t, i, n) {
                    return this.animate(e, t, i, n)
                }
            }), mt.timers = [], mt.fx.tick = function() {
                var t, e = 0,
                    i = mt.timers;
                for (me = mt.now(); e < i.length; e++) t = i[e], t() || i[e] !== t || i.splice(e--, 1);
                i.length || mt.fx.stop(), me = void 0
            }, mt.fx.timer = function(t) {
                mt.timers.push(t), mt.fx.start()
            }, mt.fx.interval = 13, mt.fx.start = function() {
                ge || (ge = !0, F())
            }, mt.fx.stop = function() {
                ge = null
            }, mt.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, mt.fn.delay = function(e, i) {
                return e = mt.fx ? mt.fx.speeds[e] || e : e, i = i || "fx", this.queue(i, function(i, n) {
                    var r = t.setTimeout(i, e);
                    n.stop = function() {
                        t.clearTimeout(r)
                    }
                })
            },
            function() {
                var t = it.createElement("input"),
                    e = it.createElement("select"),
                    i = e.appendChild(it.createElement("option"));
                t.type = "checkbox", ft.checkOn = "" !== t.value, ft.optSelected = i.selected, t = it.createElement("input"), t.value = "t", t.type = "radio", ft.radioValue = "t" === t.value
            }();
        var ye, be = mt.expr.attrHandle;
        mt.fn.extend({
            attr: function(t, e) {
                return It(this, mt.attr, t, e, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    mt.removeAttr(this, t)
                })
            }
        }), mt.extend({
            attr: function(t, e, i) {
                var n, r, s = t.nodeType;
                if (3 !== s && 8 !== s && 2 !== s) return "undefined" == typeof t.getAttribute ? mt.prop(t, e, i) : (1 === s && mt.isXMLDoc(t) || (r = mt.attrHooks[e.toLowerCase()] || (mt.expr.match.bool.test(e) ? ye : void 0)), void 0 !== i ? null === i ? void mt.removeAttr(t, e) : r && "set" in r && void 0 !== (n = r.set(t, i, e)) ? n : (t.setAttribute(e, i + ""), i) : r && "get" in r && null !== (n = r.get(t, e)) ? n : (n = mt.find.attr(t, e), null == n ? void 0 : n))
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!ft.radioValue && "radio" === e && r(t, "input")) {
                            var i = t.value;
                            return t.setAttribute("type", e), i && (t.value = i), e
                        }
                    }
                }
            },
            removeAttr: function(t, e) {
                var i, n = 0,
                    r = e && e.match(jt);
                if (r && 1 === t.nodeType)
                    for (; i = r[n++];) t.removeAttribute(i)
            }
        }), ye = {
            set: function(t, e, i) {
                return e === !1 ? mt.removeAttr(t, i) : t.setAttribute(i, i), i
            }
        }, mt.each(mt.expr.match.bool.source.match(/\w+/g), function(t, e) {
            var i = be[e] || mt.find.attr;
            be[e] = function(t, e, n) {
                var r, s, o = e.toLowerCase();
                return n || (s = be[o], be[o] = r, r = null != i(t, e, n) ? o : null, be[o] = s), r
            }
        });
        var we = /^(?:input|select|textarea|button)$/i,
            xe = /^(?:a|area)$/i;
        mt.fn.extend({
            prop: function(t, e) {
                return It(this, mt.prop, t, e, arguments.length > 1)
            },
            removeProp: function(t) {
                return this.each(function() {
                    delete this[mt.propFix[t] || t]
                })
            }
        }), mt.extend({
            prop: function(t, e, i) {
                var n, r, s = t.nodeType;
                if (3 !== s && 8 !== s && 2 !== s) return 1 === s && mt.isXMLDoc(t) || (e = mt.propFix[e] || e, r = mt.propHooks[e]), void 0 !== i ? r && "set" in r && void 0 !== (n = r.set(t, i, e)) ? n : t[e] = i : r && "get" in r && null !== (n = r.get(t, e)) ? n : t[e]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = mt.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : we.test(t.nodeName) || xe.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), ft.optSelected || (mt.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null
            },
            set: function(t) {
                var e = t.parentNode;
                e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
            }
        }), mt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            mt.propFix[this.toLowerCase()] = this
        }), mt.fn.extend({
            addClass: function(t) {
                var e, i, n, r, s, o, a, l = 0;
                if (mt.isFunction(t)) return this.each(function(e) {
                    mt(this).addClass(t.call(this, e, W(this)))
                });
                if ("string" == typeof t && t)
                    for (e = t.match(jt) || []; i = this[l++];)
                        if (r = W(i), n = 1 === i.nodeType && " " + Q(r) + " ") {
                            for (o = 0; s = e[o++];) n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                            a = Q(n), r !== a && i.setAttribute("class", a)
                        }
                return this
            },
            removeClass: function(t) {
                var e, i, n, r, s, o, a, l = 0;
                if (mt.isFunction(t)) return this.each(function(e) {
                    mt(this).removeClass(t.call(this, e, W(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof t && t)
                    for (e = t.match(jt) || []; i = this[l++];)
                        if (r = W(i), n = 1 === i.nodeType && " " + Q(r) + " ") {
                            for (o = 0; s = e[o++];)
                                for (; n.indexOf(" " + s + " ") > -1;) n = n.replace(" " + s + " ", " ");
                            a = Q(n), r !== a && i.setAttribute("class", a)
                        }
                return this
            },
            toggleClass: function(t, e) {
                var i = typeof t;
                return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : mt.isFunction(t) ? this.each(function(i) {
                    mt(this).toggleClass(t.call(this, i, W(this), e), e)
                }) : this.each(function() {
                    var e, n, r, s;
                    if ("string" === i)
                        for (n = 0, r = mt(this), s = t.match(jt) || []; e = s[n++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
                    else void 0 !== t && "boolean" !== i || (e = W(this), e && Mt.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || t === !1 ? "" : Mt.get(this, "__className__") || ""))
                })
            },
            hasClass: function(t) {
                var e, i, n = 0;
                for (e = " " + t + " "; i = this[n++];)
                    if (1 === i.nodeType && (" " + Q(W(i)) + " ").indexOf(e) > -1) return !0;
                return !1
            }
        });
        var Te = /\r/g;
        mt.fn.extend({
            val: function(t) {
                var e, i, n, r = this[0]; {
                    if (arguments.length) return n = mt.isFunction(t), this.each(function(i) {
                        var r;
                        1 === this.nodeType && (r = n ? t.call(this, i, mt(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : Array.isArray(r) && (r = mt.map(r, function(t) {
                            return null == t ? "" : t + ""
                        })), e = mt.valHooks[this.type] || mt.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r))
                    });
                    if (r) return e = mt.valHooks[r.type] || mt.valHooks[r.nodeName.toLowerCase()], e && "get" in e && void 0 !== (i = e.get(r, "value")) ? i : (i = r.value, "string" == typeof i ? i.replace(Te, "") : null == i ? "" : i)
                }
            }
        }), mt.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = mt.find.attr(t, "value");
                        return null != e ? e : Q(mt.text(t))
                    }
                },
                select: {
                    get: function(t) {
                        var e, i, n, s = t.options,
                            o = t.selectedIndex,
                            a = "select-one" === t.type,
                            l = a ? null : [],
                            h = a ? o + 1 : s.length;
                        for (n = o < 0 ? h : a ? o : 0; n < h; n++)
                            if (i = s[n], (i.selected || n === o) && !i.disabled && (!i.parentNode.disabled || !r(i.parentNode, "optgroup"))) {
                                if (e = mt(i).val(), a) return e;
                                l.push(e)
                            }
                        return l
                    },
                    set: function(t, e) {
                        for (var i, n, r = t.options, s = mt.makeArray(e), o = r.length; o--;) n = r[o], (n.selected = mt.inArray(mt.valHooks.option.get(n), s) > -1) && (i = !0);
                        return i || (t.selectedIndex = -1), s
                    }
                }
            }
        }), mt.each(["radio", "checkbox"], function() {
            mt.valHooks[this] = {
                set: function(t, e) {
                    if (Array.isArray(e)) return t.checked = mt.inArray(mt(t).val(), e) > -1
                }
            }, ft.checkOn || (mt.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        });
        var Se = /^(?:focusinfocus|focusoutblur)$/;
        mt.extend(mt.event, {
            trigger: function(e, i, n, r) {
                var s, o, a, l, h, c, u, d = [n || it],
                    f = ct.call(e, "type") ? e.type : e,
                    p = ct.call(e, "namespace") ? e.namespace.split(".") : [];
                if (o = a = n = n || it, 3 !== n.nodeType && 8 !== n.nodeType && !Se.test(f + mt.event.triggered) && (f.indexOf(".") > -1 && (p = f.split("."), f = p.shift(), p.sort()), h = f.indexOf(":") < 0 && "on" + f, e = e[mt.expando] ? e : new mt.Event(f, "object" == typeof e && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : mt.makeArray(i, [e]), u = mt.event.special[f] || {}, r || !u.trigger || u.trigger.apply(n, i) !== !1)) {
                    if (!r && !u.noBubble && !mt.isWindow(n)) {
                        for (l = u.delegateType || f, Se.test(l + f) || (o = o.parentNode); o; o = o.parentNode) d.push(o), a = o;
                        a === (n.ownerDocument || it) && d.push(a.defaultView || a.parentWindow || t)
                    }
                    for (s = 0;
                        (o = d[s++]) && !e.isPropagationStopped();) e.type = s > 1 ? l : u.bindType || f, c = (Mt.get(o, "events") || {})[e.type] && Mt.get(o, "handle"), c && c.apply(o, i), c = h && o[h], c && c.apply && Dt(o) && (e.result = c.apply(o, i), e.result === !1 && e.preventDefault());
                    return e.type = f, r || e.isDefaultPrevented() || u._default && u._default.apply(d.pop(), i) !== !1 || !Dt(n) || h && mt.isFunction(n[f]) && !mt.isWindow(n) && (a = n[h], a && (n[h] = null), mt.event.triggered = f, n[f](), mt.event.triggered = void 0, a && (n[h] = a)), e.result
                }
            },
            simulate: function(t, e, i) {
                var n = mt.extend(new mt.Event, i, {
                    type: t,
                    isSimulated: !0
                });
                mt.event.trigger(n, null, e)
            }
        }), mt.fn.extend({
            trigger: function(t, e) {
                return this.each(function() {
                    mt.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                var i = this[0];
                if (i) return mt.event.trigger(t, e, i, !0)
            }
        }), mt.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, e) {
            mt.fn[e] = function(t, i) {
                return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
            }
        }), mt.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        }), ft.focusin = "onfocusin" in t, ft.focusin || mt.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var i = function(t) {
                mt.event.simulate(e, t.target, mt.event.fix(t))
            };
            mt.event.special[e] = {
                setup: function() {
                    var n = this.ownerDocument || this,
                        r = Mt.access(n, e);
                    r || n.addEventListener(t, i, !0), Mt.access(n, e, (r || 0) + 1)
                },
                teardown: function() {
                    var n = this.ownerDocument || this,
                        r = Mt.access(n, e) - 1;
                    r ? Mt.access(n, e, r) : (n.removeEventListener(t, i, !0), Mt.remove(n, e))
                }
            }
        });
        var Pe = t.location,
            ke = mt.now(),
            Ce = /\?/;
        mt.parseXML = function(e) {
            var i;
            if (!e || "string" != typeof e) return null;
            try {
                i = (new t.DOMParser).parseFromString(e, "text/xml")
            } catch (t) {
                i = void 0
            }
            return i && !i.getElementsByTagName("parsererror").length || mt.error("Invalid XML: " + e), i
        };
        var Ee = /\[\]$/,
            Ae = /\r?\n/g,
            Re = /^(?:submit|button|image|reset|file)$/i,
            je = /^(?:input|select|textarea|keygen)/i;
        mt.param = function(t, e) {
            var i, n = [],
                r = function(t, e) {
                    var i = mt.isFunction(e) ? e() : e;
                    n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == i ? "" : i)
                };
            if (Array.isArray(t) || t.jquery && !mt.isPlainObject(t)) mt.each(t, function() {
                r(this.name, this.value)
            });
            else
                for (i in t) G(i, t[i], e, r);
            return n.join("&")
        }, mt.fn.extend({
            serialize: function() {
                return mt.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = mt.prop(this, "elements");
                    return t ? mt.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !mt(this).is(":disabled") && je.test(this.nodeName) && !Re.test(t) && (this.checked || !Vt.test(t))
                }).map(function(t, e) {
                    var i = mt(this).val();
                    return null == i ? null : Array.isArray(i) ? mt.map(i, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(Ae, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: i.replace(Ae, "\r\n")
                    }
                }).get()
            }
        });
        var Oe = /%20/g,
            Le = /#.*$/,
            Ie = /([?&])_=[^&]*/,
            De = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Me = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Ne = /^(?:GET|HEAD)$/,
            qe = /^\/\//,
            $e = {},
            Fe = {},
            ze = "*/".concat("*"),
            Be = it.createElement("a");
        Be.href = Pe.href, mt.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Pe.href,
                type: "GET",
                isLocal: Me.test(Pe.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": ze,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": mt.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? Z(Z(t, mt.ajaxSettings), e) : Z(mt.ajaxSettings, t)
            },
            ajaxPrefilter: Y($e),
            ajaxTransport: Y(Fe),
            ajax: function(e, i) {
                function n(e, i, n, a) {
                    var h, d, f, b, w, x = i;
                    c || (c = !0, l && t.clearTimeout(l), r = void 0, o = a || "", T.readyState = e > 0 ? 4 : 0, h = e >= 200 && e < 300 || 304 === e, n && (b = K(p, T, n)), b = tt(p, b, T, h), h ? (p.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (mt.lastModified[s] = w), w = T.getResponseHeader("etag"), w && (mt.etag[s] = w)), 204 === e || "HEAD" === p.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = b.state, d = b.data, f = b.error, h = !f)) : (f = x, !e && x || (x = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (i || x) + "", h ? _.resolveWith(m, [d, x, T]) : _.rejectWith(m, [T, x, f]), T.statusCode(y), y = void 0, u && g.trigger(h ? "ajaxSuccess" : "ajaxError", [T, p, h ? d : f]), v.fireWith(m, [T, x]), u && (g.trigger("ajaxComplete", [T, p]), --mt.active || mt.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (i = e, e = void 0), i = i || {};
                var r, s, o, a, l, h, c, u, d, f, p = mt.ajaxSetup({}, i),
                    m = p.context || p,
                    g = p.context && (m.nodeType || m.jquery) ? mt(m) : mt.event,
                    _ = mt.Deferred(),
                    v = mt.Callbacks("once memory"),
                    y = p.statusCode || {},
                    b = {},
                    w = {},
                    x = "canceled",
                    T = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (c) {
                                if (!a)
                                    for (a = {}; e = De.exec(o);) a[e[1].toLowerCase()] = e[2];
                                e = a[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function() {
                            return c ? o : null
                        },
                        setRequestHeader: function(t, e) {
                            return null == c && (t = w[t.toLowerCase()] = w[t.toLowerCase()] || t, b[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return null == c && (p.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (c) T.always(t[T.status]);
                                else
                                    for (e in t) y[e] = [y[e], t[e]];
                            return this
                        },
                        abort: function(t) {
                            var e = t || x;
                            return r && r.abort(e), n(0, e), this
                        }
                    };
                if (_.promise(T), p.url = ((e || p.url || Pe.href) + "").replace(qe, Pe.protocol + "//"), p.type = i.method || i.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(jt) || [""], null == p.crossDomain) {
                    h = it.createElement("a");
                    try {
                        h.href = p.url, h.href = h.href, p.crossDomain = Be.protocol + "//" + Be.host != h.protocol + "//" + h.host
                    } catch (t) {
                        p.crossDomain = !0
                    }
                }
                if (p.data && p.processData && "string" != typeof p.data && (p.data = mt.param(p.data, p.traditional)), J($e, p, i, T), c) return T;
                u = mt.event && p.global, u && 0 === mt.active++ && mt.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Ne.test(p.type), s = p.url.replace(Le, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Oe, "+")) : (f = p.url.slice(s.length), p.data && (s += (Ce.test(s) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (s = s.replace(Ie, "$1"), f = (Ce.test(s) ? "&" : "?") + "_=" + ke++ + f), p.url = s + f), p.ifModified && (mt.lastModified[s] && T.setRequestHeader("If-Modified-Since", mt.lastModified[s]), mt.etag[s] && T.setRequestHeader("If-None-Match", mt.etag[s])), (p.data && p.hasContent && p.contentType !== !1 || i.contentType) && T.setRequestHeader("Content-Type", p.contentType), T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + ze + "; q=0.01" : "") : p.accepts["*"]);
                for (d in p.headers) T.setRequestHeader(d, p.headers[d]);
                if (p.beforeSend && (p.beforeSend.call(m, T, p) === !1 || c)) return T.abort();
                if (x = "abort", v.add(p.complete), T.done(p.success), T.fail(p.error), r = J(Fe, p, i, T)) {
                    if (T.readyState = 1, u && g.trigger("ajaxSend", [T, p]), c) return T;
                    p.async && p.timeout > 0 && (l = t.setTimeout(function() {
                        T.abort("timeout")
                    }, p.timeout));
                    try {
                        c = !1, r.send(b, n)
                    } catch (t) {
                        if (c) throw t;
                        n(-1, t)
                    }
                } else n(-1, "No Transport");
                return T
            },
            getJSON: function(t, e, i) {
                return mt.get(t, e, i, "json")
            },
            getScript: function(t, e) {
                return mt.get(t, void 0, e, "script")
            }
        }), mt.each(["get", "post"], function(t, e) {
            mt[e] = function(t, i, n, r) {
                return mt.isFunction(i) && (r = r || n, n = i, i = void 0), mt.ajax(mt.extend({
                    url: t,
                    type: e,
                    dataType: r,
                    data: i,
                    success: n
                }, mt.isPlainObject(t) && t))
            }
        }), mt._evalUrl = function(t) {
            return mt.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0
            })
        }, mt.fn.extend({
            wrapAll: function(t) {
                var e;
                return this[0] && (mt.isFunction(t) && (t = t.call(this[0])), e = mt(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                    return t
                }).append(this)), this
            },
            wrapInner: function(t) {
                return mt.isFunction(t) ? this.each(function(e) {
                    mt(this).wrapInner(t.call(this, e))
                }) : this.each(function() {
                    var e = mt(this),
                        i = e.contents();
                    i.length ? i.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = mt.isFunction(t);
                return this.each(function(i) {
                    mt(this).wrapAll(e ? t.call(this, i) : t)
                })
            },
            unwrap: function(t) {
                return this.parent(t).not("body").each(function() {
                    mt(this).replaceWith(this.childNodes)
                }), this
            }
        }), mt.expr.pseudos.hidden = function(t) {
            return !mt.expr.pseudos.visible(t)
        }, mt.expr.pseudos.visible = function(t) {
            return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
        }, mt.ajaxSettings.xhr = function() {
            try {
                return new t.XMLHttpRequest
            } catch (t) {}
        };
        var He = {
                0: 200,
                1223: 204
            },
            Ue = mt.ajaxSettings.xhr();
        ft.cors = !!Ue && "withCredentials" in Ue, ft.ajax = Ue = !!Ue, mt.ajaxTransport(function(e) {
            var i, n;
            if (ft.cors || Ue && !e.crossDomain) return {
                send: function(r, s) {
                    var o, a = e.xhr();
                    if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (o in e.xhrFields) a[o] = e.xhrFields[o];
                    e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                    for (o in r) a.setRequestHeader(o, r[o]);
                    i = function(t) {
                        return function() {
                            i && (i = n = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? s(0, "error") : s(a.status, a.statusText) : s(He[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                binary: a.response
                            } : {
                                text: a.responseText
                            }, a.getAllResponseHeaders()))
                        }
                    }, a.onload = i(), n = a.onerror = i("error"), void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                        4 === a.readyState && t.setTimeout(function() {
                            i && n()
                        })
                    }, i = i("abort");
                    try {
                        a.send(e.hasContent && e.data || null)
                    } catch (t) {
                        if (i) throw t
                    }
                },
                abort: function() {
                    i && i()
                }
            }
        }), mt.ajaxPrefilter(function(t) {
            t.crossDomain && (t.contents.script = !1)
        }), mt.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(t) {
                    return mt.globalEval(t), t
                }
            }
        }), mt.ajaxPrefilter("script", function(t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
        }), mt.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var e, i;
                return {
                    send: function(n, r) {
                        e = mt("<script>").prop({
                            charset: t.scriptCharset,
                            src: t.url
                        }).on("load error", i = function(t) {
                            e.remove(), i = null, t && r("error" === t.type ? 404 : 200, t.type)
                        }), it.head.appendChild(e[0])
                    },
                    abort: function() {
                        i && i()
                    }
                }
            }
        });
        var Xe = [],
            Ve = /(=)\?(?=&|$)|\?\?/;
        mt.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = Xe.pop() || mt.expando + "_" + ke++;
                return this[t] = !0, t
            }
        }), mt.ajaxPrefilter("json jsonp", function(e, i, n) {
            var r, s, o, a = e.jsonp !== !1 && (Ve.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ve.test(e.data) && "data");
            if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = mt.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Ve, "$1" + r) : e.jsonp !== !1 && (e.url += (Ce.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
                return o || mt.error(r + " was not called"), o[0]
            }, e.dataTypes[0] = "json", s = t[r], t[r] = function() {
                o = arguments
            }, n.always(function() {
                void 0 === s ? mt(t).removeProp(r) : t[r] = s, e[r] && (e.jsonpCallback = i.jsonpCallback, Xe.push(r)), o && mt.isFunction(s) && s(o[0]), o = s = void 0
            }), "script"
        }), ft.createHTMLDocument = function() {
            var t = it.implementation.createHTMLDocument("").body;
            return t.innerHTML = "<form></form><form></form>", 2 === t.childNodes.length
        }(), mt.parseHTML = function(t, e, i) {
            if ("string" != typeof t) return [];
            "boolean" == typeof e && (i = e, e = !1);
            var n, r, s;
            return e || (ft.createHTMLDocument ? (e = it.implementation.createHTMLDocument(""), n = e.createElement("base"), n.href = it.location.href, e.head.appendChild(n)) : e = it), r = St.exec(t), s = !i && [], r ? [e.createElement(r[1])] : (r = b([t], e, s), s && s.length && mt(s).remove(), mt.merge([], r.childNodes))
        }, mt.fn.load = function(t, e, i) {
            var n, r, s, o = this,
                a = t.indexOf(" ");
            return a > -1 && (n = Q(t.slice(a)), t = t.slice(0, a)), mt.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (r = "POST"), o.length > 0 && mt.ajax({
                url: t,
                type: r || "GET",
                dataType: "html",
                data: e
            }).done(function(t) {
                s = arguments, o.html(n ? mt("<div>").append(mt.parseHTML(t)).find(n) : t)
            }).always(i && function(t, e) {
                o.each(function() {
                    i.apply(this, s || [t.responseText, e, t])
                })
            }), this
        }, mt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            mt.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), mt.expr.pseudos.animated = function(t) {
            return mt.grep(mt.timers, function(e) {
                return t === e.elem
            }).length
        }, mt.offset = {
            setOffset: function(t, e, i) {
                var n, r, s, o, a, l, h, c = mt.css(t, "position"),
                    u = mt(t),
                    d = {};
                "static" === c && (t.style.position = "relative"), a = u.offset(), s = mt.css(t, "top"), l = mt.css(t, "left"), h = ("absolute" === c || "fixed" === c) && (s + l).indexOf("auto") > -1, h ? (n = u.position(), o = n.top, r = n.left) : (o = parseFloat(s) || 0, r = parseFloat(l) || 0), mt.isFunction(e) && (e = e.call(t, i, mt.extend({}, a))), null != e.top && (d.top = e.top - a.top + o), null != e.left && (d.left = e.left - a.left + r), "using" in e ? e.using.call(t, d) : u.css(d)
            }
        }, mt.fn.extend({
            offset: function(t) {
                if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                    mt.offset.setOffset(this, t, e)
                });
                var e, i, n, r, s = this[0];
                if (s) return s.getClientRects().length ? (n = s.getBoundingClientRect(), e = s.ownerDocument, i = e.documentElement, r = e.defaultView, {
                    top: n.top + r.pageYOffset - i.clientTop,
                    left: n.left + r.pageXOffset - i.clientLeft
                }) : {
                    top: 0,
                    left: 0
                }
            },
            position: function() {
                if (this[0]) {
                    var t, e, i = this[0],
                        n = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === mt.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), r(t[0], "html") || (n = t.offset()), n = {
                        top: n.top + mt.css(t[0], "borderTopWidth", !0),
                        left: n.left + mt.css(t[0], "borderLeftWidth", !0)
                    }), {
                        top: e.top - n.top - mt.css(i, "marginTop", !0),
                        left: e.left - n.left - mt.css(i, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent; t && "static" === mt.css(t, "position");) t = t.offsetParent;
                    return t || Jt
                })
            }
        }), mt.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, e) {
            var i = "pageYOffset" === e;
            mt.fn[t] = function(n) {
                return It(this, function(t, n, r) {
                    var s;
                    return mt.isWindow(t) ? s = t : 9 === t.nodeType && (s = t.defaultView), void 0 === r ? s ? s[e] : t[n] : void(s ? s.scrollTo(i ? s.pageXOffset : r, i ? r : s.pageYOffset) : t[n] = r)
                }, t, n, arguments.length)
            }
        }), mt.each(["top", "left"], function(t, e) {
            mt.cssHooks[e] = L(ft.pixelPosition, function(t, i) {
                if (i) return i = O(t, e), ae.test(i) ? mt(t).position()[e] + "px" : i
            })
        }), mt.each({
            Height: "height",
            Width: "width"
        }, function(t, e) {
            mt.each({
                padding: "inner" + t,
                content: e,
                "": "outer" + t
            }, function(i, n) {
                mt.fn[n] = function(r, s) {
                    var o = arguments.length && (i || "boolean" != typeof r),
                        a = i || (r === !0 || s === !0 ? "margin" : "border");
                    return It(this, function(e, i, r) {
                        var s;
                        return mt.isWindow(e) ? 0 === n.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (s = e.documentElement, Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t])) : void 0 === r ? mt.css(e, i, a) : mt.style(e, i, r, a)
                    }, e, o ? r : void 0, o)
                }
            })
        }), mt.fn.extend({
            bind: function(t, e, i) {
                return this.on(t, null, e, i)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, i, n) {
                return this.on(e, t, i, n)
            },
            undelegate: function(t, e, i) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
            },
            holdReady: function(t) {
                t ? mt.readyWait++ : mt.ready(!0)
            }
        }), mt.isArray = Array.isArray, mt.parseJSON = JSON.parse, mt.nodeName = r, "function" == typeof define && define.amd && define("jquery", [], function() {
            return mt
        });
        var Qe = t.jQuery,
            We = t.$;
        return mt.noConflict = function(e) {
            return t.$ === mt && (t.$ = We), e && t.jQuery === mt && (t.jQuery = Qe), mt
        }, e || (t.jQuery = t.$ = mt), mt
    }),
    function() {
        function t(t) {
            function e(e, i, n, r, s, o) {
                for (; s >= 0 && s < o; s += t) {
                    var a = r ? r[s] : s;
                    n = i(n, e[a], a, e)
                }
                return n
            }
            return function(i, n, r, s) {
                n = y(n, s, 4);
                var o = !k(i) && v.keys(i),
                    a = (o || i).length,
                    l = t > 0 ? 0 : a - 1;
                return arguments.length < 3 && (r = i[o ? o[l] : l], l += t), e(i, n, r, o, l, a)
            }
        }

        function e(t) {
            return function(e, i, n) {
                i = b(i, n);
                for (var r = P(e), s = t > 0 ? 0 : r - 1; s >= 0 && s < r; s += t)
                    if (i(e[s], s, e)) return s;
                return -1
            }
        }

        function i(t, e, i) {
            return function(n, r, s) {
                var o = 0,
                    a = P(n);
                if ("number" == typeof s) t > 0 ? o = s >= 0 ? s : Math.max(s + a, o) : a = s >= 0 ? Math.min(s + 1, a) : s + a + 1;
                else if (i && s && a) return s = i(n, r), n[s] === r ? s : -1;
                if (r !== r) return s = e(c.call(n, o, a), v.isNaN), s >= 0 ? s + o : -1;
                for (s = t > 0 ? o : a - 1; s >= 0 && s < a; s += t)
                    if (n[s] === r) return s;
                return -1
            }
        }

        function n(t, e) {
            var i = j.length,
                n = t.constructor,
                r = v.isFunction(n) && n.prototype || a,
                s = "constructor";
            for (v.has(t, s) && !v.contains(e, s) && e.push(s); i--;) s = j[i], s in t && t[s] !== r[s] && !v.contains(e, s) && e.push(s)
        }
        var r = this,
            s = r._,
            o = Array.prototype,
            a = Object.prototype,
            l = Function.prototype,
            h = o.push,
            c = o.slice,
            u = a.toString,
            d = a.hasOwnProperty,
            f = Array.isArray,
            p = Object.keys,
            m = l.bind,
            g = Object.create,
            _ = function() {},
            v = function(t) {
                return t instanceof v ? t : this instanceof v ? void(this._wrapped = t) : new v(t)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = v), exports._ = v) : r._ = v, v.VERSION = "1.8.3";
        var y = function(t, e, i) {
                if (void 0 === e) return t;
                switch (null == i ? 3 : i) {
                    case 1:
                        return function(i) {
                            return t.call(e, i)
                        };
                    case 2:
                        return function(i, n) {
                            return t.call(e, i, n)
                        };
                    case 3:
                        return function(i, n, r) {
                            return t.call(e, i, n, r)
                        };
                    case 4:
                        return function(i, n, r, s) {
                            return t.call(e, i, n, r, s)
                        }
                }
                return function() {
                    return t.apply(e, arguments)
                }
            },
            b = function(t, e, i) {
                return null == t ? v.identity : v.isFunction(t) ? y(t, e, i) : v.isObject(t) ? v.matcher(t) : v.property(t)
            };
        v.iteratee = function(t, e) {
            return b(t, e, 1 / 0)
        };
        var w = function(t, e) {
                return function(i) {
                    var n = arguments.length;
                    if (n < 2 || null == i) return i;
                    for (var r = 1; r < n; r++)
                        for (var s = arguments[r], o = t(s), a = o.length, l = 0; l < a; l++) {
                            var h = o[l];
                            e && void 0 !== i[h] || (i[h] = s[h])
                        }
                    return i
                }
            },
            x = function(t) {
                if (!v.isObject(t)) return {};
                if (g) return g(t);
                _.prototype = t;
                var e = new _;
                return _.prototype = null, e
            },
            T = function(t) {
                return function(e) {
                    return null == e ? void 0 : e[t]
                }
            },
            S = Math.pow(2, 53) - 1,
            P = T("length"),
            k = function(t) {
                var e = P(t);
                return "number" == typeof e && e >= 0 && e <= S
            };
        v.each = v.forEach = function(t, e, i) {
            e = y(e, i);
            var n, r;
            if (k(t))
                for (n = 0, r = t.length; n < r; n++) e(t[n], n, t);
            else {
                var s = v.keys(t);
                for (n = 0, r = s.length; n < r; n++) e(t[s[n]], s[n], t)
            }
            return t
        }, v.map = v.collect = function(t, e, i) {
            e = b(e, i);
            for (var n = !k(t) && v.keys(t), r = (n || t).length, s = Array(r), o = 0; o < r; o++) {
                var a = n ? n[o] : o;
                s[o] = e(t[a], a, t)
            }
            return s
        }, v.reduce = v.foldl = v.inject = t(1), v.reduceRight = v.foldr = t(-1), v.find = v.detect = function(t, e, i) {
            var n;
            if (n = k(t) ? v.findIndex(t, e, i) : v.findKey(t, e, i), void 0 !== n && n !== -1) return t[n]
        }, v.filter = v.select = function(t, e, i) {
            var n = [];
            return e = b(e, i), v.each(t, function(t, i, r) {
                e(t, i, r) && n.push(t)
            }), n
        }, v.reject = function(t, e, i) {
            return v.filter(t, v.negate(b(e)), i)
        }, v.every = v.all = function(t, e, i) {
            e = b(e, i);
            for (var n = !k(t) && v.keys(t), r = (n || t).length, s = 0; s < r; s++) {
                var o = n ? n[s] : s;
                if (!e(t[o], o, t)) return !1
            }
            return !0
        }, v.some = v.any = function(t, e, i) {
            e = b(e, i);
            for (var n = !k(t) && v.keys(t), r = (n || t).length, s = 0; s < r; s++) {
                var o = n ? n[s] : s;
                if (e(t[o], o, t)) return !0
            }
            return !1
        }, v.contains = v.includes = v.include = function(t, e, i, n) {
            return k(t) || (t = v.values(t)), ("number" != typeof i || n) && (i = 0), v.indexOf(t, e, i) >= 0
        }, v.invoke = function(t, e) {
            var i = c.call(arguments, 2),
                n = v.isFunction(e);
            return v.map(t, function(t) {
                var r = n ? e : t[e];
                return null == r ? r : r.apply(t, i)
            })
        }, v.pluck = function(t, e) {
            return v.map(t, v.property(e))
        }, v.where = function(t, e) {
            return v.filter(t, v.matcher(e))
        }, v.findWhere = function(t, e) {
            return v.find(t, v.matcher(e))
        }, v.max = function(t, e, i) {
            var n, r, s = -(1 / 0),
                o = -(1 / 0);
            if (null == e && null != t) {
                t = k(t) ? t : v.values(t);
                for (var a = 0, l = t.length; a < l; a++) n = t[a], n > s && (s = n)
            } else e = b(e, i), v.each(t, function(t, i, n) {
                r = e(t, i, n), (r > o || r === -(1 / 0) && s === -(1 / 0)) && (s = t, o = r)
            });
            return s
        }, v.min = function(t, e, i) {
            var n, r, s = 1 / 0,
                o = 1 / 0;
            if (null == e && null != t) {
                t = k(t) ? t : v.values(t);
                for (var a = 0, l = t.length; a < l; a++) n = t[a], n < s && (s = n)
            } else e = b(e, i), v.each(t, function(t, i, n) {
                r = e(t, i, n), (r < o || r === 1 / 0 && s === 1 / 0) && (s = t, o = r)
            });
            return s
        }, v.shuffle = function(t) {
            for (var e, i = k(t) ? t : v.values(t), n = i.length, r = Array(n), s = 0; s < n; s++) e = v.random(0, s), e !== s && (r[s] = r[e]), r[e] = i[s];
            return r
        }, v.sample = function(t, e, i) {
            return null == e || i ? (k(t) || (t = v.values(t)), t[v.random(t.length - 1)]) : v.shuffle(t).slice(0, Math.max(0, e))
        }, v.sortBy = function(t, e, i) {
            return e = b(e, i), v.pluck(v.map(t, function(t, i, n) {
                return {
                    value: t,
                    index: i,
                    criteria: e(t, i, n)
                }
            }).sort(function(t, e) {
                var i = t.criteria,
                    n = e.criteria;
                if (i !== n) {
                    if (i > n || void 0 === i) return 1;
                    if (i < n || void 0 === n) return -1
                }
                return t.index - e.index
            }), "value")
        };
        var C = function(t) {
            return function(e, i, n) {
                var r = {};
                return i = b(i, n), v.each(e, function(n, s) {
                    var o = i(n, s, e);
                    t(r, n, o)
                }), r
            }
        };
        v.groupBy = C(function(t, e, i) {
            v.has(t, i) ? t[i].push(e) : t[i] = [e]
        }), v.indexBy = C(function(t, e, i) {
            t[i] = e
        }), v.countBy = C(function(t, e, i) {
            v.has(t, i) ? t[i]++ : t[i] = 1
        }), v.toArray = function(t) {
            return t ? v.isArray(t) ? c.call(t) : k(t) ? v.map(t, v.identity) : v.values(t) : []
        }, v.size = function(t) {
            return null == t ? 0 : k(t) ? t.length : v.keys(t).length
        }, v.partition = function(t, e, i) {
            e = b(e, i);
            var n = [],
                r = [];
            return v.each(t, function(t, i, s) {
                (e(t, i, s) ? n : r).push(t)
            }), [n, r]
        }, v.first = v.head = v.take = function(t, e, i) {
            if (null != t) return null == e || i ? t[0] : v.initial(t, t.length - e)
        }, v.initial = function(t, e, i) {
            return c.call(t, 0, Math.max(0, t.length - (null == e || i ? 1 : e)))
        }, v.last = function(t, e, i) {
            if (null != t) return null == e || i ? t[t.length - 1] : v.rest(t, Math.max(0, t.length - e))
        }, v.rest = v.tail = v.drop = function(t, e, i) {
            return c.call(t, null == e || i ? 1 : e)
        }, v.compact = function(t) {
            return v.filter(t, v.identity)
        };
        var E = function(t, e, i, n) {
            for (var r = [], s = 0, o = n || 0, a = P(t); o < a; o++) {
                var l = t[o];
                if (k(l) && (v.isArray(l) || v.isArguments(l))) {
                    e || (l = E(l, e, i));
                    var h = 0,
                        c = l.length;
                    for (r.length += c; h < c;) r[s++] = l[h++]
                } else i || (r[s++] = l)
            }
            return r
        };
        v.flatten = function(t, e) {
            return E(t, e, !1)
        }, v.without = function(t) {
            return v.difference(t, c.call(arguments, 1))
        }, v.uniq = v.unique = function(t, e, i, n) {
            v.isBoolean(e) || (n = i, i = e, e = !1), null != i && (i = b(i, n));
            for (var r = [], s = [], o = 0, a = P(t); o < a; o++) {
                var l = t[o],
                    h = i ? i(l, o, t) : l;
                e ? (o && s === h || r.push(l), s = h) : i ? v.contains(s, h) || (s.push(h), r.push(l)) : v.contains(r, l) || r.push(l)
            }
            return r
        }, v.union = function() {
            return v.uniq(E(arguments, !0, !0))
        }, v.intersection = function(t) {
            for (var e = [], i = arguments.length, n = 0, r = P(t); n < r; n++) {
                var s = t[n];
                if (!v.contains(e, s)) {
                    for (var o = 1; o < i && v.contains(arguments[o], s); o++);
                    o === i && e.push(s)
                }
            }
            return e
        }, v.difference = function(t) {
            var e = E(arguments, !0, !0, 1);
            return v.filter(t, function(t) {
                return !v.contains(e, t)
            })
        }, v.zip = function() {
            return v.unzip(arguments)
        }, v.unzip = function(t) {
            for (var e = t && v.max(t, P).length || 0, i = Array(e), n = 0; n < e; n++) i[n] = v.pluck(t, n);
            return i
        }, v.object = function(t, e) {
            for (var i = {}, n = 0, r = P(t); n < r; n++) e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
            return i
        }, v.findIndex = e(1), v.findLastIndex = e(-1), v.sortedIndex = function(t, e, i, n) {
            i = b(i, n, 1);
            for (var r = i(e), s = 0, o = P(t); s < o;) {
                var a = Math.floor((s + o) / 2);
                i(t[a]) < r ? s = a + 1 : o = a
            }
            return s
        }, v.indexOf = i(1, v.findIndex, v.sortedIndex), v.lastIndexOf = i(-1, v.findLastIndex), v.range = function(t, e, i) {
            null == e && (e = t || 0, t = 0), i = i || 1;
            for (var n = Math.max(Math.ceil((e - t) / i), 0), r = Array(n), s = 0; s < n; s++, t += i) r[s] = t;
            return r
        };
        var A = function(t, e, i, n, r) {
            if (!(n instanceof e)) return t.apply(i, r);
            var s = x(t.prototype),
                o = t.apply(s, r);
            return v.isObject(o) ? o : s
        };
        v.bind = function(t, e) {
            if (m && t.bind === m) return m.apply(t, c.call(arguments, 1));
            if (!v.isFunction(t)) throw new TypeError("Bind must be called on a function");
            var i = c.call(arguments, 2),
                n = function() {
                    return A(t, n, e, this, i.concat(c.call(arguments)))
                };
            return n
        }, v.partial = function(t) {
            var e = c.call(arguments, 1),
                i = function() {
                    for (var n = 0, r = e.length, s = Array(r), o = 0; o < r; o++) s[o] = e[o] === v ? arguments[n++] : e[o];
                    for (; n < arguments.length;) s.push(arguments[n++]);
                    return A(t, i, this, this, s)
                };
            return i
        }, v.bindAll = function(t) {
            var e, i, n = arguments.length;
            if (n <= 1) throw new Error("bindAll must be passed function names");
            for (e = 1; e < n; e++) i = arguments[e], t[i] = v.bind(t[i], t);
            return t
        }, v.memoize = function(t, e) {
            var i = function(n) {
                var r = i.cache,
                    s = "" + (e ? e.apply(this, arguments) : n);
                return v.has(r, s) || (r[s] = t.apply(this, arguments)), r[s]
            };
            return i.cache = {}, i
        }, v.delay = function(t, e) {
            var i = c.call(arguments, 2);
            return setTimeout(function() {
                return t.apply(null, i)
            }, e)
        }, v.defer = v.partial(v.delay, v, 1), v.throttle = function(t, e, i) {
            var n, r, s, o = null,
                a = 0;
            i || (i = {});
            var l = function() {
                a = i.leading === !1 ? 0 : v.now(), o = null, s = t.apply(n, r), o || (n = r = null)
            };
            return function() {
                var h = v.now();
                a || i.leading !== !1 || (a = h);
                var c = e - (h - a);
                return n = this, r = arguments, c <= 0 || c > e ? (o && (clearTimeout(o), o = null), a = h, s = t.apply(n, r), o || (n = r = null)) : o || i.trailing === !1 || (o = setTimeout(l, c)), s
            }
        }, v.debounce = function(t, e, i) {
            var n, r, s, o, a, l = function() {
                var h = v.now() - o;
                h < e && h >= 0 ? n = setTimeout(l, e - h) : (n = null, i || (a = t.apply(s, r), n || (s = r = null)))
            };
            return function() {
                s = this, r = arguments, o = v.now();
                var h = i && !n;
                return n || (n = setTimeout(l, e)), h && (a = t.apply(s, r), s = r = null), a
            }
        }, v.wrap = function(t, e) {
            return v.partial(e, t)
        }, v.negate = function(t) {
            return function() {
                return !t.apply(this, arguments)
            }
        }, v.compose = function() {
            var t = arguments,
                e = t.length - 1;
            return function() {
                for (var i = e, n = t[e].apply(this, arguments); i--;) n = t[i].call(this, n);
                return n
            }
        }, v.after = function(t, e) {
            return function() {
                if (--t < 1) return e.apply(this, arguments)
            }
        }, v.before = function(t, e) {
            var i;
            return function() {
                return --t > 0 && (i = e.apply(this, arguments)), t <= 1 && (e = null), i
            }
        }, v.once = v.partial(v.before, 2);
        var R = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            j = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
        v.keys = function(t) {
            if (!v.isObject(t)) return [];
            if (p) return p(t);
            var e = [];
            for (var i in t) v.has(t, i) && e.push(i);
            return R && n(t, e), e
        }, v.allKeys = function(t) {
            if (!v.isObject(t)) return [];
            var e = [];
            for (var i in t) e.push(i);
            return R && n(t, e), e
        }, v.values = function(t) {
            for (var e = v.keys(t), i = e.length, n = Array(i), r = 0; r < i; r++) n[r] = t[e[r]];
            return n
        }, v.mapObject = function(t, e, i) {
            e = b(e, i);
            for (var n, r = v.keys(t), s = r.length, o = {}, a = 0; a < s; a++) n = r[a], o[n] = e(t[n], n, t);
            return o
        }, v.pairs = function(t) {
            for (var e = v.keys(t), i = e.length, n = Array(i), r = 0; r < i; r++) n[r] = [e[r], t[e[r]]];
            return n
        }, v.invert = function(t) {
            for (var e = {}, i = v.keys(t), n = 0, r = i.length; n < r; n++) e[t[i[n]]] = i[n];
            return e
        }, v.functions = v.methods = function(t) {
            var e = [];
            for (var i in t) v.isFunction(t[i]) && e.push(i);
            return e.sort()
        }, v.extend = w(v.allKeys), v.extendOwn = v.assign = w(v.keys), v.findKey = function(t, e, i) {
            e = b(e, i);
            for (var n, r = v.keys(t), s = 0, o = r.length; s < o; s++)
                if (n = r[s], e(t[n], n, t)) return n
        }, v.pick = function(t, e, i) {
            var n, r, s = {},
                o = t;
            if (null == o) return s;
            v.isFunction(e) ? (r = v.allKeys(o), n = y(e, i)) : (r = E(arguments, !1, !1, 1), n = function(t, e, i) {
                return e in i
            }, o = Object(o));
            for (var a = 0, l = r.length; a < l; a++) {
                var h = r[a],
                    c = o[h];
                n(c, h, o) && (s[h] = c)
            }
            return s
        }, v.omit = function(t, e, i) {
            if (v.isFunction(e)) e = v.negate(e);
            else {
                var n = v.map(E(arguments, !1, !1, 1), String);
                e = function(t, e) {
                    return !v.contains(n, e)
                }
            }
            return v.pick(t, e, i)
        }, v.defaults = w(v.allKeys, !0), v.create = function(t, e) {
            var i = x(t);
            return e && v.extendOwn(i, e), i
        }, v.clone = function(t) {
            return v.isObject(t) ? v.isArray(t) ? t.slice() : v.extend({}, t) : t
        }, v.tap = function(t, e) {
            return e(t), t
        }, v.isMatch = function(t, e) {
            var i = v.keys(e),
                n = i.length;
            if (null == t) return !n;
            for (var r = Object(t), s = 0; s < n; s++) {
                var o = i[s];
                if (e[o] !== r[o] || !(o in r)) return !1
            }
            return !0
        };
        var O = function(t, e, i, n) {
            if (t === e) return 0 !== t || 1 / t === 1 / e;
            if (null == t || null == e) return t === e;
            t instanceof v && (t = t._wrapped), e instanceof v && (e = e._wrapped);
            var r = u.call(t);
            if (r !== u.call(e)) return !1;
            switch (r) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + t == "" + e;
                case "[object Number]":
                    return +t !== +t ? +e !== +e : 0 === +t ? 1 / +t === 1 / e : +t === +e;
                case "[object Date]":
                case "[object Boolean]":
                    return +t === +e
            }
            var s = "[object Array]" === r;
            if (!s) {
                if ("object" != typeof t || "object" != typeof e) return !1;
                var o = t.constructor,
                    a = e.constructor;
                if (o !== a && !(v.isFunction(o) && o instanceof o && v.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1
            }
            i = i || [], n = n || [];
            for (var l = i.length; l--;)
                if (i[l] === t) return n[l] === e;
            if (i.push(t), n.push(e), s) {
                if (l = t.length, l !== e.length) return !1;
                for (; l--;)
                    if (!O(t[l], e[l], i, n)) return !1
            } else {
                var h, c = v.keys(t);
                if (l = c.length, v.keys(e).length !== l) return !1;
                for (; l--;)
                    if (h = c[l], !v.has(e, h) || !O(t[h], e[h], i, n)) return !1
            }
            return i.pop(), n.pop(), !0
        };
        v.isEqual = function(t, e) {
            return O(t, e)
        }, v.isEmpty = function(t) {
            return null == t || (k(t) && (v.isArray(t) || v.isString(t) || v.isArguments(t)) ? 0 === t.length : 0 === v.keys(t).length)
        }, v.isElement = function(t) {
            return !(!t || 1 !== t.nodeType)
        }, v.isArray = f || function(t) {
            return "[object Array]" === u.call(t)
        }, v.isObject = function(t) {
            var e = typeof t;
            return "function" === e || "object" === e && !!t
        }, v.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(t) {
            v["is" + t] = function(e) {
                return u.call(e) === "[object " + t + "]"
            }
        }), v.isArguments(arguments) || (v.isArguments = function(t) {
            return v.has(t, "callee")
        }), "function" != typeof /./ && "object" != typeof Int8Array && (v.isFunction = function(t) {
            return "function" == typeof t || !1
        }), v.isFinite = function(t) {
            return isFinite(t) && !isNaN(parseFloat(t))
        }, v.isNaN = function(t) {
            return v.isNumber(t) && t !== +t
        }, v.isBoolean = function(t) {
            return t === !0 || t === !1 || "[object Boolean]" === u.call(t)
        }, v.isNull = function(t) {
            return null === t
        }, v.isUndefined = function(t) {
            return void 0 === t
        }, v.has = function(t, e) {
            return null != t && d.call(t, e)
        }, v.noConflict = function() {
            return r._ = s, this
        }, v.identity = function(t) {
            return t
        }, v.constant = function(t) {
            return function() {
                return t
            }
        }, v.noop = function() {}, v.property = T, v.propertyOf = function(t) {
            return null == t ? function() {} : function(e) {
                return t[e]
            }
        }, v.matcher = v.matches = function(t) {
            return t = v.extendOwn({}, t),
                function(e) {
                    return v.isMatch(e, t)
                }
        }, v.times = function(t, e, i) {
            var n = Array(Math.max(0, t));
            e = y(e, i, 1);
            for (var r = 0; r < t; r++) n[r] = e(r);
            return n
        }, v.random = function(t, e) {
            return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
        }, v.now = Date.now || function() {
            return (new Date).getTime()
        };
        var L = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            I = v.invert(L),
            D = function(t) {
                var e = function(e) {
                        return t[e]
                    },
                    i = "(?:" + v.keys(t).join("|") + ")",
                    n = RegExp(i),
                    r = RegExp(i, "g");
                return function(t) {
                    return t = null == t ? "" : "" + t, n.test(t) ? t.replace(r, e) : t
                }
            };
        v.escape = D(L), v.unescape = D(I), v.result = function(t, e, i) {
            var n = null == t ? void 0 : t[e];
            return void 0 === n && (n = i), v.isFunction(n) ? n.call(t) : n
        };
        var M = 0;
        v.uniqueId = function(t) {
            var e = ++M + "";
            return t ? t + e : e
        }, v.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var N = /(.)^/,
            q = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            $ = /\\|'|\r|\n|\u2028|\u2029/g,
            F = function(t) {
                return "\\" + q[t]
            };
        v.template = function(t, e, i) {
            !e && i && (e = i), e = v.defaults({}, e, v.templateSettings);
            var n = RegExp([(e.escape || N).source, (e.interpolate || N).source, (e.evaluate || N).source].join("|") + "|$", "g"),
                r = 0,
                s = "__p+='";
            t.replace(n, function(e, i, n, o, a) {
                return s += t.slice(r, a).replace($, F), r = a + e.length, i ? s += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'" : n ? s += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : o && (s += "';\n" + o + "\n__p+='"), e
            }), s += "';\n", e.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
            try {
                var o = new Function(e.variable || "obj", "_", s)
            } catch (t) {
                throw t.source = s, t
            }
            var a = function(t) {
                    return o.call(this, t, v)
                },
                l = e.variable || "obj";
            return a.source = "function(" + l + "){\n" + s + "}", a
        }, v.chain = function(t) {
            var e = v(t);
            return e._chain = !0, e
        };
        var z = function(t, e) {
            return t._chain ? v(e).chain() : e
        };
        v.mixin = function(t) {
            v.each(v.functions(t), function(e) {
                var i = v[e] = t[e];
                v.prototype[e] = function() {
                    var t = [this._wrapped];
                    return h.apply(t, arguments), z(this, i.apply(v, t))
                }
            })
        }, v.mixin(v), v.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
            var e = o[t];
            v.prototype[t] = function() {
                var i = this._wrapped;
                return e.apply(i, arguments), "shift" !== t && "splice" !== t || 0 !== i.length || delete i[0], z(this, i)
            }
        }), v.each(["concat", "join", "slice"], function(t) {
            var e = o[t];
            v.prototype[t] = function() {
                return z(this, e.apply(this._wrapped, arguments))
            }
        }), v.prototype.value = function() {
            return this._wrapped
        }, v.prototype.valueOf = v.prototype.toJSON = v.prototype.value, v.prototype.toString = function() {
            return "" + this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function() {
            return v
        })
    }.call(this),
    function(t) {
        var e = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global;
        if ("function" == typeof define && define.amd) define("backbone", ["underscore", "jquery", "exports"], function(i, n, r) {
            e.Backbone = t(e, r, i, n)
        });
        else if ("undefined" != typeof exports) {
            var i, n = require("underscore");
            try {
                i = require("jquery")
            } catch (t) {}
            t(e, exports, n, i)
        } else e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$)
    }(function(t, e, i, n) {
        var r = t.Backbone,
            s = Array.prototype.slice;
        e.VERSION = "1.3.3", e.$ = n, e.noConflict = function() {
            return t.Backbone = r, this
        }, e.emulateHTTP = !1, e.emulateJSON = !1;
        var o = function(t, e, n) {
                switch (t) {
                    case 1:
                        return function() {
                            return i[e](this[n])
                        };
                    case 2:
                        return function(t) {
                            return i[e](this[n], t)
                        };
                    case 3:
                        return function(t, r) {
                            return i[e](this[n], l(t, this), r)
                        };
                    case 4:
                        return function(t, r, s) {
                            return i[e](this[n], l(t, this), r, s)
                        };
                    default:
                        return function() {
                            var t = s.call(arguments);
                            return t.unshift(this[n]), i[e].apply(i, t)
                        }
                }
            },
            a = function(t, e, n) {
                i.each(e, function(e, r) {
                    i[r] && (t.prototype[r] = o(e, r, n))
                })
            },
            l = function(t, e) {
                return i.isFunction(t) ? t : i.isObject(t) && !e._isModel(t) ? h(t) : i.isString(t) ? function(e) {
                    return e.get(t)
                } : t
            },
            h = function(t) {
                var e = i.matches(t);
                return function(t) {
                    return e(t.attributes)
                }
            },
            c = e.Events = {},
            u = /\s+/,
            d = function(t, e, n, r, s) {
                var o, a = 0;
                if (n && "object" == typeof n) {
                    void 0 !== r && "context" in s && void 0 === s.context && (s.context = r);
                    for (o = i.keys(n); a < o.length; a++) e = d(t, e, o[a], n[o[a]], s)
                } else if (n && u.test(n))
                    for (o = n.split(u); a < o.length; a++) e = t(e, o[a], r, s);
                else e = t(e, n, r, s);
                return e
            };
        c.on = function(t, e, i) {
            return f(this, t, e, i)
        };
        var f = function(t, e, i, n, r) {
            if (t._events = d(p, t._events || {}, e, i, {
                    context: n,
                    ctx: t,
                    listening: r
                }), r) {
                var s = t._listeners || (t._listeners = {});
                s[r.id] = r
            }
            return t
        };
        c.listenTo = function(t, e, n) {
            if (!t) return this;
            var r = t._listenId || (t._listenId = i.uniqueId("l")),
                s = this._listeningTo || (this._listeningTo = {}),
                o = s[r];
            if (!o) {
                var a = this._listenId || (this._listenId = i.uniqueId("l"));
                o = s[r] = {
                    obj: t,
                    objId: r,
                    id: a,
                    listeningTo: s,
                    count: 0
                }
            }
            return f(t, e, n, this, o), this
        };
        var p = function(t, e, i, n) {
            if (i) {
                var r = t[e] || (t[e] = []),
                    s = n.context,
                    o = n.ctx,
                    a = n.listening;
                a && a.count++, r.push({
                    callback: i,
                    context: s,
                    ctx: s || o,
                    listening: a
                })
            }
            return t
        };
        c.off = function(t, e, i) {
            return this._events ? (this._events = d(m, this._events, t, e, {
                context: i,
                listeners: this._listeners
            }), this) : this
        }, c.stopListening = function(t, e, n) {
            var r = this._listeningTo;
            if (!r) return this;
            for (var s = t ? [t._listenId] : i.keys(r), o = 0; o < s.length; o++) {
                var a = r[s[o]];
                if (!a) break;
                a.obj.off(e, n, this)
            }
            return this
        };
        var m = function(t, e, n, r) {
            if (t) {
                var s, o = 0,
                    a = r.context,
                    l = r.listeners;
                if (e || n || a) {
                    for (var h = e ? [e] : i.keys(t); o < h.length; o++) {
                        e = h[o];
                        var c = t[e];
                        if (!c) break;
                        for (var u = [], d = 0; d < c.length; d++) {
                            var f = c[d];
                            n && n !== f.callback && n !== f.callback._callback || a && a !== f.context ? u.push(f) : (s = f.listening, s && 0 === --s.count && (delete l[s.id], delete s.listeningTo[s.objId]))
                        }
                        u.length ? t[e] = u : delete t[e]
                    }
                    return t
                }
                for (var p = i.keys(l); o < p.length; o++) s = l[p[o]], delete l[s.id], delete s.listeningTo[s.objId]
            }
        };
        c.once = function(t, e, n) {
            var r = d(g, {}, t, e, i.bind(this.off, this));
            return "string" == typeof t && null == n && (e = void 0), this.on(r, e, n)
        }, c.listenToOnce = function(t, e, n) {
            var r = d(g, {}, e, n, i.bind(this.stopListening, this, t));
            return this.listenTo(t, r)
        };
        var g = function(t, e, n, r) {
            if (n) {
                var s = t[e] = i.once(function() {
                    r(e, s), n.apply(this, arguments)
                });
                s._callback = n
            }
            return t
        };
        c.trigger = function(t) {
            if (!this._events) return this;
            for (var e = Math.max(0, arguments.length - 1), i = Array(e), n = 0; n < e; n++) i[n] = arguments[n + 1];
            return d(_, this._events, t, void 0, i), this
        };
        var _ = function(t, e, i, n) {
                if (t) {
                    var r = t[e],
                        s = t.all;
                    r && s && (s = s.slice()), r && v(r, n), s && v(s, [e].concat(n))
                }
                return t
            },
            v = function(t, e) {
                var i, n = -1,
                    r = t.length,
                    s = e[0],
                    o = e[1],
                    a = e[2];
                switch (e.length) {
                    case 0:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx);
                        return;
                    case 1:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx, s);
                        return;
                    case 2:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx, s, o);
                        return;
                    case 3:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx, s, o, a);
                        return;
                    default:
                        for (; ++n < r;)(i = t[n]).callback.apply(i.ctx, e);
                        return
                }
            };
        c.bind = c.on, c.unbind = c.off, i.extend(e, c);
        var y = e.Model = function(t, e) {
            var n = t || {};
            e || (e = {}), this.cid = i.uniqueId(this.cidPrefix), this.attributes = {}, e.collection && (this.collection = e.collection), e.parse && (n = this.parse(n, e) || {});
            var r = i.result(this, "defaults");
            n = i.defaults(i.extend({}, r, n), r), this.set(n, e), this.changed = {}, this.initialize.apply(this, arguments)
        };
        i.extend(y.prototype, c, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            cidPrefix: "c",
            initialize: function() {},
            toJSON: function(t) {
                return i.clone(this.attributes)
            },
            sync: function() {
                return e.sync.apply(this, arguments)
            },
            get: function(t) {
                return this.attributes[t]
            },
            escape: function(t) {
                return i.escape(this.get(t))
            },
            has: function(t) {
                return null != this.get(t)
            },
            matches: function(t) {
                return !!i.iteratee(t, this)(this.attributes)
            },
            set: function(t, e, n) {
                if (null == t) return this;
                var r;
                if ("object" == typeof t ? (r = t, n = e) : (r = {})[t] = e, n || (n = {}), !this._validate(r, n)) return !1;
                var s = n.unset,
                    o = n.silent,
                    a = [],
                    l = this._changing;
                this._changing = !0, l || (this._previousAttributes = i.clone(this.attributes), this.changed = {});
                var h = this.attributes,
                    c = this.changed,
                    u = this._previousAttributes;
                for (var d in r) e = r[d], i.isEqual(h[d], e) || a.push(d), i.isEqual(u[d], e) ? delete c[d] : c[d] = e, s ? delete h[d] : h[d] = e;
                if (this.idAttribute in r && (this.id = this.get(this.idAttribute)), !o) {
                    a.length && (this._pending = n);
                    for (var f = 0; f < a.length; f++) this.trigger("change:" + a[f], this, h[a[f]], n)
                }
                if (l) return this;
                if (!o)
                    for (; this._pending;) n = this._pending, this._pending = !1, this.trigger("change", this, n);
                return this._pending = !1, this._changing = !1, this
            },
            unset: function(t, e) {
                return this.set(t, void 0, i.extend({}, e, {
                    unset: !0
                }))
            },
            clear: function(t) {
                var e = {};
                for (var n in this.attributes) e[n] = void 0;
                return this.set(e, i.extend({}, t, {
                    unset: !0
                }))
            },
            hasChanged: function(t) {
                return null == t ? !i.isEmpty(this.changed) : i.has(this.changed, t)
            },
            changedAttributes: function(t) {
                if (!t) return !!this.hasChanged() && i.clone(this.changed);
                var e = this._changing ? this._previousAttributes : this.attributes,
                    n = {};
                for (var r in t) {
                    var s = t[r];
                    i.isEqual(e[r], s) || (n[r] = s)
                }
                return !!i.size(n) && n
            },
            previous: function(t) {
                return null != t && this._previousAttributes ? this._previousAttributes[t] : null
            },
            previousAttributes: function() {
                return i.clone(this._previousAttributes)
            },
            fetch: function(t) {
                t = i.extend({
                    parse: !0
                }, t);
                var e = this,
                    n = t.success;
                return t.success = function(i) {
                    var r = t.parse ? e.parse(i, t) : i;
                    return !!e.set(r, t) && (n && n.call(t.context, e, i, t), void e.trigger("sync", e, i, t))
                }, z(this, t), this.sync("read", this, t)
            },
            save: function(t, e, n) {
                var r;
                null == t || "object" == typeof t ? (r = t, n = e) : (r = {})[t] = e, n = i.extend({
                    validate: !0,
                    parse: !0
                }, n);
                var s = n.wait;
                if (r && !s) {
                    if (!this.set(r, n)) return !1
                } else if (!this._validate(r, n)) return !1;
                var o = this,
                    a = n.success,
                    l = this.attributes;
                n.success = function(t) {
                    o.attributes = l;
                    var e = n.parse ? o.parse(t, n) : t;
                    return s && (e = i.extend({}, r, e)), !(e && !o.set(e, n)) && (a && a.call(n.context, o, t, n), void o.trigger("sync", o, t, n))
                }, z(this, n), r && s && (this.attributes = i.extend({}, l, r));
                var h = this.isNew() ? "create" : n.patch ? "patch" : "update";
                "patch" !== h || n.attrs || (n.attrs = r);
                var c = this.sync(h, this, n);
                return this.attributes = l, c
            },
            destroy: function(t) {
                t = t ? i.clone(t) : {};
                var e = this,
                    n = t.success,
                    r = t.wait,
                    s = function() {
                        e.stopListening(), e.trigger("destroy", e, e.collection, t)
                    };
                t.success = function(i) {
                    r && s(), n && n.call(t.context, e, i, t),
                        e.isNew() || e.trigger("sync", e, i, t)
                };
                var o = !1;
                return this.isNew() ? i.defer(t.success) : (z(this, t), o = this.sync("delete", this, t)), r || s(), o
            },
            url: function() {
                var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || F();
                if (this.isNew()) return t;
                var e = this.get(this.idAttribute);
                return t.replace(/[^\/]$/, "$&/") + encodeURIComponent(e)
            },
            parse: function(t, e) {
                return t
            },
            clone: function() {
                return new this.constructor(this.attributes)
            },
            isNew: function() {
                return !this.has(this.idAttribute)
            },
            isValid: function(t) {
                return this._validate({}, i.extend({}, t, {
                    validate: !0
                }))
            },
            _validate: function(t, e) {
                if (!e.validate || !this.validate) return !0;
                t = i.extend({}, this.attributes, t);
                var n = this.validationError = this.validate(t, e) || null;
                return !n || (this.trigger("invalid", this, n, i.extend(e, {
                    validationError: n
                })), !1)
            }
        });
        var b = {
            keys: 1,
            values: 1,
            pairs: 1,
            invert: 1,
            pick: 0,
            omit: 0,
            chain: 1,
            isEmpty: 1
        };
        a(y, b, "attributes");
        var w = e.Collection = function(t, e) {
                e || (e = {}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, i.extend({
                    silent: !0
                }, e))
            },
            x = {
                add: !0,
                remove: !0,
                merge: !0
            },
            T = {
                add: !0,
                remove: !1
            },
            S = function(t, e, i) {
                i = Math.min(Math.max(i, 0), t.length);
                var n, r = Array(t.length - i),
                    s = e.length;
                for (n = 0; n < r.length; n++) r[n] = t[n + i];
                for (n = 0; n < s; n++) t[n + i] = e[n];
                for (n = 0; n < r.length; n++) t[n + s + i] = r[n]
            };
        i.extend(w.prototype, c, {
            model: y,
            initialize: function() {},
            toJSON: function(t) {
                return this.map(function(e) {
                    return e.toJSON(t)
                })
            },
            sync: function() {
                return e.sync.apply(this, arguments)
            },
            add: function(t, e) {
                return this.set(t, i.extend({
                    merge: !1
                }, e, T))
            },
            remove: function(t, e) {
                e = i.extend({}, e);
                var n = !i.isArray(t);
                t = n ? [t] : t.slice();
                var r = this._removeModels(t, e);
                return !e.silent && r.length && (e.changes = {
                    added: [],
                    merged: [],
                    removed: r
                }, this.trigger("update", this, e)), n ? r[0] : r
            },
            set: function(t, e) {
                if (null != t) {
                    e = i.extend({}, x, e), e.parse && !this._isModel(t) && (t = this.parse(t, e) || []);
                    var n = !i.isArray(t);
                    t = n ? [t] : t.slice();
                    var r = e.at;
                    null != r && (r = +r), r > this.length && (r = this.length), r < 0 && (r += this.length + 1);
                    var s, o, a = [],
                        l = [],
                        h = [],
                        c = [],
                        u = {},
                        d = e.add,
                        f = e.merge,
                        p = e.remove,
                        m = !1,
                        g = this.comparator && null == r && e.sort !== !1,
                        _ = i.isString(this.comparator) ? this.comparator : null;
                    for (o = 0; o < t.length; o++) {
                        s = t[o];
                        var v = this.get(s);
                        if (v) {
                            if (f && s !== v) {
                                var y = this._isModel(s) ? s.attributes : s;
                                e.parse && (y = v.parse(y, e)), v.set(y, e), h.push(v), g && !m && (m = v.hasChanged(_))
                            }
                            u[v.cid] || (u[v.cid] = !0, a.push(v)), t[o] = v
                        } else d && (s = t[o] = this._prepareModel(s, e), s && (l.push(s), this._addReference(s, e), u[s.cid] = !0, a.push(s)))
                    }
                    if (p) {
                        for (o = 0; o < this.length; o++) s = this.models[o], u[s.cid] || c.push(s);
                        c.length && this._removeModels(c, e)
                    }
                    var b = !1,
                        w = !g && d && p;
                    if (a.length && w ? (b = this.length !== a.length || i.some(this.models, function(t, e) {
                            return t !== a[e]
                        }), this.models.length = 0, S(this.models, a, 0), this.length = this.models.length) : l.length && (g && (m = !0), S(this.models, l, null == r ? this.length : r), this.length = this.models.length), m && this.sort({
                            silent: !0
                        }), !e.silent) {
                        for (o = 0; o < l.length; o++) null != r && (e.index = r + o), s = l[o], s.trigger("add", s, this, e);
                        (m || b) && this.trigger("sort", this, e), (l.length || c.length || h.length) && (e.changes = {
                            added: l,
                            removed: c,
                            merged: h
                        }, this.trigger("update", this, e))
                    }
                    return n ? t[0] : t
                }
            },
            reset: function(t, e) {
                e = e ? i.clone(e) : {};
                for (var n = 0; n < this.models.length; n++) this._removeReference(this.models[n], e);
                return e.previousModels = this.models, this._reset(), t = this.add(t, i.extend({
                    silent: !0
                }, e)), e.silent || this.trigger("reset", this, e), t
            },
            push: function(t, e) {
                return this.add(t, i.extend({
                    at: this.length
                }, e))
            },
            pop: function(t) {
                var e = this.at(this.length - 1);
                return this.remove(e, t)
            },
            unshift: function(t, e) {
                return this.add(t, i.extend({
                    at: 0
                }, e))
            },
            shift: function(t) {
                var e = this.at(0);
                return this.remove(e, t)
            },
            slice: function() {
                return s.apply(this.models, arguments)
            },
            get: function(t) {
                if (null != t) return this._byId[t] || this._byId[this.modelId(t.attributes || t)] || t.cid && this._byId[t.cid]
            },
            has: function(t) {
                return null != this.get(t)
            },
            at: function(t) {
                return t < 0 && (t += this.length), this.models[t]
            },
            where: function(t, e) {
                return this[e ? "find" : "filter"](t)
            },
            findWhere: function(t) {
                return this.where(t, !0)
            },
            sort: function(t) {
                var e = this.comparator;
                if (!e) throw new Error("Cannot sort a set without a comparator");
                t || (t = {});
                var n = e.length;
                return i.isFunction(e) && (e = i.bind(e, this)), 1 === n || i.isString(e) ? this.models = this.sortBy(e) : this.models.sort(e), t.silent || this.trigger("sort", this, t), this
            },
            pluck: function(t) {
                return this.map(t + "")
            },
            fetch: function(t) {
                t = i.extend({
                    parse: !0
                }, t);
                var e = t.success,
                    n = this;
                return t.success = function(i) {
                    var r = t.reset ? "reset" : "set";
                    n[r](i, t), e && e.call(t.context, n, i, t), n.trigger("sync", n, i, t)
                }, z(this, t), this.sync("read", this, t)
            },
            create: function(t, e) {
                e = e ? i.clone(e) : {};
                var n = e.wait;
                if (t = this._prepareModel(t, e), !t) return !1;
                n || this.add(t, e);
                var r = this,
                    s = e.success;
                return e.success = function(t, e, i) {
                    n && r.add(t, i), s && s.call(i.context, t, e, i)
                }, t.save(null, e), t
            },
            parse: function(t, e) {
                return t
            },
            clone: function() {
                return new this.constructor(this.models, {
                    model: this.model,
                    comparator: this.comparator
                })
            },
            modelId: function(t) {
                return t[this.model.prototype.idAttribute || "id"]
            },
            _reset: function() {
                this.length = 0, this.models = [], this._byId = {}
            },
            _prepareModel: function(t, e) {
                if (this._isModel(t)) return t.collection || (t.collection = this), t;
                e = e ? i.clone(e) : {}, e.collection = this;
                var n = new this.model(t, e);
                return n.validationError ? (this.trigger("invalid", this, n.validationError, e), !1) : n
            },
            _removeModels: function(t, e) {
                for (var i = [], n = 0; n < t.length; n++) {
                    var r = this.get(t[n]);
                    if (r) {
                        var s = this.indexOf(r);
                        this.models.splice(s, 1), this.length--, delete this._byId[r.cid];
                        var o = this.modelId(r.attributes);
                        null != o && delete this._byId[o], e.silent || (e.index = s, r.trigger("remove", r, this, e)), i.push(r), this._removeReference(r, e)
                    }
                }
                return i
            },
            _isModel: function(t) {
                return t instanceof y
            },
            _addReference: function(t, e) {
                this._byId[t.cid] = t;
                var i = this.modelId(t.attributes);
                null != i && (this._byId[i] = t), t.on("all", this._onModelEvent, this)
            },
            _removeReference: function(t, e) {
                delete this._byId[t.cid];
                var i = this.modelId(t.attributes);
                null != i && delete this._byId[i], this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function(t, e, i, n) {
                if (e) {
                    if (("add" === t || "remove" === t) && i !== this) return;
                    if ("destroy" === t && this.remove(e, n), "change" === t) {
                        var r = this.modelId(e.previousAttributes()),
                            s = this.modelId(e.attributes);
                        r !== s && (null != r && delete this._byId[r], null != s && (this._byId[s] = e))
                    }
                }
                this.trigger.apply(this, arguments)
            }
        });
        var P = {
            forEach: 3,
            each: 3,
            map: 3,
            collect: 3,
            reduce: 0,
            foldl: 0,
            inject: 0,
            reduceRight: 0,
            foldr: 0,
            find: 3,
            detect: 3,
            filter: 3,
            select: 3,
            reject: 3,
            every: 3,
            all: 3,
            some: 3,
            any: 3,
            include: 3,
            includes: 3,
            contains: 3,
            invoke: 0,
            max: 3,
            min: 3,
            toArray: 1,
            size: 1,
            first: 3,
            head: 3,
            take: 3,
            initial: 3,
            rest: 3,
            tail: 3,
            drop: 3,
            last: 3,
            without: 0,
            difference: 0,
            indexOf: 3,
            shuffle: 1,
            lastIndexOf: 3,
            isEmpty: 1,
            chain: 1,
            sample: 3,
            partition: 3,
            groupBy: 3,
            countBy: 3,
            sortBy: 3,
            indexBy: 3,
            findIndex: 3,
            findLastIndex: 3
        };
        a(w, P, "models");
        var k = e.View = function(t) {
                this.cid = i.uniqueId("view"), i.extend(this, i.pick(t, E)), this._ensureElement(), this.initialize.apply(this, arguments)
            },
            C = /^(\S+)\s*(.*)$/,
            E = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        i.extend(k.prototype, c, {
            tagName: "div",
            $: function(t) {
                return this.$el.find(t)
            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return this._removeElement(), this.stopListening(), this
            },
            _removeElement: function() {
                this.$el.remove()
            },
            setElement: function(t) {
                return this.undelegateEvents(), this._setElement(t), this.delegateEvents(), this
            },
            _setElement: function(t) {
                this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0]
            },
            delegateEvents: function(t) {
                if (t || (t = i.result(this, "events")), !t) return this;
                this.undelegateEvents();
                for (var e in t) {
                    var n = t[e];
                    if (i.isFunction(n) || (n = this[n]), n) {
                        var r = e.match(C);
                        this.delegate(r[1], r[2], i.bind(n, this))
                    }
                }
                return this
            },
            delegate: function(t, e, i) {
                return this.$el.on(t + ".delegateEvents" + this.cid, e, i), this
            },
            undelegateEvents: function() {
                return this.$el && this.$el.off(".delegateEvents" + this.cid), this
            },
            undelegate: function(t, e, i) {
                return this.$el.off(t + ".delegateEvents" + this.cid, e, i), this
            },
            _createElement: function(t) {
                return document.createElement(t)
            },
            _ensureElement: function() {
                if (this.el) this.setElement(i.result(this, "el"));
                else {
                    var t = i.extend({}, i.result(this, "attributes"));
                    this.id && (t.id = i.result(this, "id")), this.className && (t.class = i.result(this, "className")), this.setElement(this._createElement(i.result(this, "tagName"))), this._setAttributes(t)
                }
            },
            _setAttributes: function(t) {
                this.$el.attr(t)
            }
        }), e.sync = function(t, n, r) {
            var s = A[t];
            i.defaults(r || (r = {}), {
                emulateHTTP: e.emulateHTTP,
                emulateJSON: e.emulateJSON
            });
            var o = {
                type: s,
                dataType: "json"
            };
            if (r.url || (o.url = i.result(n, "url") || F()), null != r.data || !n || "create" !== t && "update" !== t && "patch" !== t || (o.contentType = "application/json", o.data = JSON.stringify(r.attrs || n.toJSON(r))), r.emulateJSON && (o.contentType = "application/x-www-form-urlencoded", o.data = o.data ? {
                    model: o.data
                } : {}), r.emulateHTTP && ("PUT" === s || "DELETE" === s || "PATCH" === s)) {
                o.type = "POST", r.emulateJSON && (o.data._method = s);
                var a = r.beforeSend;
                r.beforeSend = function(t) {
                    if (t.setRequestHeader("X-HTTP-Method-Override", s), a) return a.apply(this, arguments)
                }
            }
            "GET" === o.type || r.emulateJSON || (o.processData = !1);
            var l = r.error;
            r.error = function(t, e, i) {
                r.textStatus = e, r.errorThrown = i, l && l.call(r.context, t, e, i)
            };
            var h = r.xhr = e.ajax(i.extend(o, r));
            return n.trigger("request", n, h, r), h
        };
        var A = {
            create: "POST",
            update: "PUT",
            patch: "PATCH",
            delete: "DELETE",
            read: "GET"
        };
        e.ajax = function() {
            return e.$.ajax.apply(e.$, arguments)
        };
        var R = e.Router = function(t) {
                t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
            },
            j = /\((.*?)\)/g,
            O = /(\(\?)?:\w+/g,
            L = /\*\w+/g,
            I = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        i.extend(R.prototype, c, {
            initialize: function() {},
            route: function(t, n, r) {
                i.isRegExp(t) || (t = this._routeToRegExp(t)), i.isFunction(n) && (r = n, n = ""), r || (r = this[n]);
                var s = this;
                return e.history.route(t, function(i) {
                    var o = s._extractParameters(t, i);
                    s.execute(r, o, n) !== !1 && (s.trigger.apply(s, ["route:" + n].concat(o)), s.trigger("route", n, o), e.history.trigger("route", s, n, o))
                }), this
            },
            execute: function(t, e, i) {
                t && t.apply(this, e)
            },
            navigate: function(t, i) {
                return e.history.navigate(t, i), this
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = i.result(this, "routes");
                    for (var t, e = i.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
                }
            },
            _routeToRegExp: function(t) {
                return t = t.replace(I, "\\$&").replace(j, "(?:$1)?").replace(O, function(t, e) {
                    return e ? t : "([^/?]+)"
                }).replace(L, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
            },
            _extractParameters: function(t, e) {
                var n = t.exec(e).slice(1);
                return i.map(n, function(t, e) {
                    return e === n.length - 1 ? t || null : t ? decodeURIComponent(t) : null
                })
            }
        });
        var D = e.History = function() {
                this.handlers = [], this.checkUrl = i.bind(this.checkUrl, this), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
            },
            M = /^[#\/]|\s+$/g,
            N = /^\/+|\/+$/g,
            q = /#.*$/;
        D.started = !1, i.extend(D.prototype, c, {
            interval: 50,
            atRoot: function() {
                var t = this.location.pathname.replace(/[^\/]$/, "$&/");
                return t === this.root && !this.getSearch()
            },
            matchRoot: function() {
                var t = this.decodeFragment(this.location.pathname),
                    e = t.slice(0, this.root.length - 1) + "/";
                return e === this.root
            },
            decodeFragment: function(t) {
                return decodeURI(t.replace(/%25/g, "%2525"))
            },
            getSearch: function() {
                var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
                return t ? t[0] : ""
            },
            getHash: function(t) {
                var e = (t || this).location.href.match(/#(.*)$/);
                return e ? e[1] : ""
            },
            getPath: function() {
                var t = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
                return "/" === t.charAt(0) ? t.slice(1) : t
            },
            getFragment: function(t) {
                return null == t && (t = this._usePushState || !this._wantsHashChange ? this.getPath() : this.getHash()), t.replace(M, "")
            },
            start: function(t) {
                if (D.started) throw new Error("Backbone.history has already been started");
                if (D.started = !0, this.options = i.extend({
                        root: "/"
                    }, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._hasHashChange = "onhashchange" in window && (void 0 === document.documentMode || document.documentMode > 7), this._useHashChange = this._wantsHashChange && this._hasHashChange, this._wantsPushState = !!this.options.pushState, this._hasPushState = !(!this.history || !this.history.pushState), this._usePushState = this._wantsPushState && this._hasPushState, this.fragment = this.getFragment(), this.root = ("/" + this.root + "/").replace(N, "/"), this._wantsHashChange && this._wantsPushState) {
                    if (!this._hasPushState && !this.atRoot()) {
                        var e = this.root.slice(0, -1) || "/";
                        return this.location.replace(e + "#" + this.getPath()), !0
                    }
                    this._hasPushState && this.atRoot() && this.navigate(this.getHash(), {
                        replace: !0
                    })
                }
                if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                    this.iframe = document.createElement("iframe"), this.iframe.src = "javascript:0", this.iframe.style.display = "none", this.iframe.tabIndex = -1;
                    var n = document.body,
                        r = n.insertBefore(this.iframe, n.firstChild).contentWindow;
                    r.document.open(), r.document.close(), r.location.hash = "#" + this.fragment
                }
                var s = window.addEventListener || function(t, e) {
                    return attachEvent("on" + t, e)
                };
                if (this._usePushState ? s("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe ? s("hashchange", this.checkUrl, !1) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), !this.options.silent) return this.loadUrl()
            },
            stop: function() {
                var t = window.removeEventListener || function(t, e) {
                    return detachEvent("on" + t, e)
                };
                this._usePushState ? t("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe && t("hashchange", this.checkUrl, !1), this.iframe && (document.body.removeChild(this.iframe), this.iframe = null), this._checkUrlInterval && clearInterval(this._checkUrlInterval), D.started = !1
            },
            route: function(t, e) {
                this.handlers.unshift({
                    route: t,
                    callback: e
                })
            },
            checkUrl: function(t) {
                var e = this.getFragment();
                return e === this.fragment && this.iframe && (e = this.getHash(this.iframe.contentWindow)), e !== this.fragment && (this.iframe && this.navigate(e), void this.loadUrl())
            },
            loadUrl: function(t) {
                return !!this.matchRoot() && (t = this.fragment = this.getFragment(t), i.some(this.handlers, function(e) {
                    if (e.route.test(t)) return e.callback(t), !0
                }))
            },
            navigate: function(t, e) {
                if (!D.started) return !1;
                e && e !== !0 || (e = {
                    trigger: !!e
                }), t = this.getFragment(t || "");
                var i = this.root;
                "" !== t && "?" !== t.charAt(0) || (i = i.slice(0, -1) || "/");
                var n = i + t;
                if (t = this.decodeFragment(t.replace(q, "")), this.fragment !== t) {
                    if (this.fragment = t, this._usePushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, n);
                    else {
                        if (!this._wantsHashChange) return this.location.assign(n);
                        if (this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getHash(this.iframe.contentWindow)) {
                            var r = this.iframe.contentWindow;
                            e.replace || (r.document.open(), r.document.close()), this._updateHash(r.location, t, e.replace)
                        }
                    }
                    return e.trigger ? this.loadUrl(t) : void 0
                }
            },
            _updateHash: function(t, e, i) {
                if (i) {
                    var n = t.href.replace(/(javascript:|#).*$/, "");
                    t.replace(n + "#" + e)
                } else t.hash = "#" + e
            }
        }), e.history = new D;
        var $ = function(t, e) {
            var n, r = this;
            return n = t && i.has(t, "constructor") ? t.constructor : function() {
                return r.apply(this, arguments)
            }, i.extend(n, r, e), n.prototype = i.create(r.prototype, t), n.prototype.constructor = n, n.__super__ = r.prototype, n
        };
        y.extend = w.extend = R.extend = k.extend = D.extend = $;
        var F = function() {
                throw new Error('A "url" property or function must be specified')
            },
            z = function(t, e) {
                var i = e.error;
                e.error = function(n) {
                    i && i.call(e.context, t, n, e), t.trigger("error", t, n, e)
                }
            };
        return e
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("backbone-route-control", ["underscore", "backbone"], e) : "object" == typeof exports ? module.exports = e(require("underscore"), require("backbone")) : t.BackboneRouteControl = e(t._, t.Backbone)
    }(this, function(t, e) {
        var i = e.Router.extend({
            constructor: function(t) {
                t || (t = {}), t.controllers && (this.controllers = t.controllers), e.Router.prototype.constructor.call(this, t)
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = t.result(this, "routes");
                    for (var e, i = t.keys(this.routes); null != (e = i.pop());) {
                        var n = this.routes[e],
                            r = n.split("#"),
                            s = 2 === r.length;
                        if (s) {
                            var o, a, l, h;
                            a = r[0], o = this.controllers[a], h = r[1], l = o[h], this.route(e, n, t.bind(l, o))
                        } else this.route(e, n)
                    }
                }
            }
        });
        return i
    }), define("router/album", ["backbone-route-control"], function(t) {
        return t.extend({
            routes: {
                "s/:section/s/:subsection": "page#goToSection",
                "s/:section": "page#goToSection",
                "*notFound": "page#goToSection"
            }
        })
    }), define("component/base", ["backbone"], function(t) {
        return t.View.extend({
            _components: null,
            render: function() {
                this._components = []
            },
            registerComponent: function(t) {
                this._components.push(t)
            },
            getRegisteredComponentsRecursively: function() {
                return this._components.reduce(function(t, e) {
                    return t.push(e), e.getRegisteredComponentsRecursively && (t = t.concat(e.getRegisteredComponentsRecursively())), t
                }, [])
            }
        })
    }),
    function(t, e) {
        "use strict";
        var i = {},
            n = t.document,
            r = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!r.TweenLite) {
            var s, o, a, l, h, c = function(t) {
                    var e, i = t.split("."),
                        n = r;
                    for (e = 0; e < i.length; e++) n[i[e]] = n = n[i[e]] || {};
                    return n
                },
                u = c("com.greensock"),
                d = 1e-10,
                f = function(t) {
                    var e, i = [],
                        n = t.length;
                    for (e = 0; e !== n; i.push(t[e++]));
                    return i
                },
                p = function() {},
                m = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(),
                g = {},
                _ = function(n, s, o, a) {
                    this.sc = g[n] ? g[n].sc : [], g[n] = this, this.gsClass = null, this.func = o;
                    var l = [];
                    this.check = function(h) {
                        for (var u, d, f, p, m = s.length, v = m; --m > -1;)(u = g[s[m]] || new _(s[m], [])).gsClass ? (l[m] = u.gsClass, v--) : h && u.sc.push(this);
                        if (0 === v && o) {
                            if (d = ("com.greensock." + n).split("."), f = d.pop(), p = c(d.join("."))[f] = this.gsClass = o.apply(o, l), a)
                                if (r[f] = i[f] = p, "undefined" != typeof module && module.exports)
                                    if (n === e) {
                                        module.exports = i[e] = p;
                                        for (m in i) p[m] = i[m]
                                    } else i[e] && (i[e][f] = p);
                            else "function" == typeof define && define.amd && define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                                return p
                            });
                            for (m = 0; m < this.sc.length; m++) this.sc[m].check()
                        }
                    }, this.check(!0)
                },
                v = t._gsDefine = function(t, e, i, n) {
                    return new _(t, e, i, n)
                },
                y = u._class = function(t, e, i) {
                    return e = e || function() {}, v(t, [], function() {
                        return e
                    }, i), e
                };
            v.globals = r;
            var b = [0, 0, 1, 1],
                w = y("easing.Ease", function(t, e, i, n) {
                    this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? b.concat(e) : b
                }, !0),
                x = w.map = {},
                T = w.register = function(t, e, i, n) {
                    for (var r, s, o, a, l = e.split(","), h = l.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;)
                        for (s = l[h], r = n ? y("easing." + s, null, !0) : u.easing[s] || {}, o = c.length; --o > -1;) a = c[o], x[s + "." + a] = x[a + s] = r[a] = t.getRatio ? t : t[a] || new t
                };
            for (a = w.prototype, a._calcEnd = !1, a.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        n = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : t < .5 ? n / 2 : 1 - n / 2
                }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], o = s.length; --o > -1;) a = s[o] + ",Power" + o, T(new w(null, null, 1, o), a, "easeOut", !0), T(new w(null, null, 2, o), a, "easeIn" + (0 === o ? ",easeNone" : "")), T(new w(null, null, 3, o), a, "easeInOut");
            x.linear = u.easing.Linear.easeIn, x.swing = u.easing.Quad.easeInOut;
            var S = y("events.EventDispatcher", function(t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            a = S.prototype, a.addEventListener = function(t, e, i, n, r) {
                r = r || 0;
                var s, o, a = this._listeners[t],
                    c = 0;
                for (this !== l || h || l.wake(), null == a && (this._listeners[t] = a = []), o = a.length; --o > -1;) s = a[o], s.c === e && s.s === i ? a.splice(o, 1) : 0 === c && s.pr < r && (c = o + 1);
                a.splice(c, 0, {
                    c: e,
                    s: i,
                    up: n,
                    pr: r
                })
            }, a.removeEventListener = function(t, e) {
                var i, n = this._listeners[t];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === e) return void n.splice(i, 1)
            }, a.dispatchEvent = function(t) {
                var e, i, n, r = this._listeners[t];
                if (r)
                    for (e = r.length, e > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1;) n = r[e], n && (n.up ? n.c.call(n.s || i, {
                        type: t,
                        target: i
                    }) : n.c.call(n.s || i))
            };
            var P = t.requestAnimationFrame,
                k = t.cancelAnimationFrame,
                C = Date.now || function() {
                    return (new Date).getTime()
                },
                E = C();
            for (s = ["ms", "moz", "webkit", "o"], o = s.length; --o > -1 && !P;) P = t[s[o] + "RequestAnimationFrame"], k = t[s[o] + "CancelAnimationFrame"] || t[s[o] + "CancelRequestAnimationFrame"];
            y("Ticker", function(t, e) {
                var i, r, s, o, a, c = this,
                    u = C(),
                    f = !(e === !1 || !P) && "auto",
                    m = 500,
                    g = 33,
                    _ = "tick",
                    v = function(t) {
                        var e, n, l = C() - E;
                        l > m && (u += l - g), E += l, c.time = (E - u) / 1e3, e = c.time - a, (!i || e > 0 || t === !0) && (c.frame++, a += e + (e >= o ? .004 : o - e), n = !0), t !== !0 && (s = r(v)), n && c.dispatchEvent(_)
                    };
                S.call(c), c.time = c.frame = 0, c.tick = function() {
                    v(!0)
                }, c.lagSmoothing = function(t, e) {
                    m = t || 1 / d, g = Math.min(e, m, 0)
                }, c.sleep = function() {
                    null != s && (f && k ? k(s) : clearTimeout(s), r = p, s = null, c === l && (h = !1))
                }, c.wake = function(t) {
                    null !== s ? c.sleep() : t ? u += -E + (E = C()) : c.frame > 10 && (E = C() - m + 5), r = 0 === i ? p : f && P ? P : function(t) {
                        return setTimeout(t, 1e3 * (a - c.time) + 1 | 0)
                    }, c === l && (h = !0), v(2)
                }, c.fps = function(t) {
                    return arguments.length ? (i = t, o = 1 / (i || 60), a = this.time + o, void c.wake()) : i
                }, c.useRAF = function(t) {
                    return arguments.length ? (c.sleep(), f = t, void c.fps(i)) : f
                }, c.fps(t), setTimeout(function() {
                    "auto" === f && c.frame < 5 && "hidden" !== n.visibilityState && c.useRAF(!1)
                }, 1500)
            }), a = u.Ticker.prototype = new u.events.EventDispatcher, a.constructor = u.Ticker;
            var A = y("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, G) {
                    h || l.wake();
                    var i = this.vars.useFrames ? W : G;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            l = A.ticker = new u.Ticker, a = A.prototype, a._dirty = a._gc = a._initted = a._paused = !1, a._totalTime = a._time = 0, a._rawPrevTime = -1, a._next = a._last = a._onUpdate = a._timeline = a.timeline = null, a._paused = !1;
            var R = function() {
                h && C() - E > 2e3 && "hidden" !== n.visibilityState && l.wake();
                var t = setTimeout(R, 2e3);
                t.unref && t.unref()
            };
            R(), a.play = function(t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, a.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, a.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, a.seek = function(t, e) {
                return this.totalTime(Number(t), e !== !1)
            }, a.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
            }, a.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, a.render = function(t, e, i) {}, a.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this
            }, a.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7
            }, a._enabled = function(t, e) {
                return h || l.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, a._kill = function(t, e) {
                return this._enabled(!1, !1)
            }, a.kill = function(t, e) {
                return this._kill(t, e), this
            }, a._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, a._swapSelfInParams = function(t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, a._callback = function(t) {
                var e = this.vars,
                    i = e[t],
                    n = e[t + "Params"],
                    r = e[t + "Scope"] || e.callbackScope || this,
                    s = n ? n.length : 0;
                switch (s) {
                    case 0:
                        i.call(r);
                        break;
                    case 1:
                        i.call(r, n[0]);
                        break;
                    case 2:
                        i.call(r, n[0], n[1]);
                        break;
                    default:
                        i.apply(r, n)
                }
            }, a.eventCallback = function(t, e, i, n) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = m(i) && i.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, a.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, a.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, a.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, a.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, a.totalTime = function(t, e, i) {
                if (h || l.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (t < 0 && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), this._totalTime === t && 0 !== this._duration || (D.length && J(), this.render(t, e, !1), D.length && J())
                }
                return this
            }, a.progress = a.totalProgress = function(t, e) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
            }, a.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, a.endTime = function(t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, a.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || d, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, a.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, a.paused = function(t) {
                if (!arguments.length) return this._paused;
                var e, i, n = this._timeline;
                return t != this._paused && n && (h || t || l.wake(), e = n.rawTime(), i = e - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
            };
            var j = y("core.SimpleTimeline", function(t) {
                A.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            a = j.prototype = new A, a.constructor = j, a.kill()._gc = !1, a._first = a._last = a._recent = null, a._sortChildren = !1, a.add = a.insert = function(t, e, i, n) {
                var r, s;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren)
                    for (s = t._startTime; r && r._startTime > s;) r = r._prev;
                return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
            }, a._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, a.render = function(t, e, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
            }, a.rawTime = function() {
                return h || l.wake(), this._totalTime
            };
            var O = y("TweenLite", function(e, i, n) {
                    if (A.call(this, i, n), this.render = O.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : O.selector(e) || e;
                    var r, s, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? Q[O.defaultOverwrite] : "number" == typeof l ? l >> 0 : Q[l], (a || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])
                        for (this._targets = o = f(e), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) s = o[r], s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(f(s))) : (this._siblings[r] = Z(s, this, !1), 1 === l && this._siblings[r].length > 1 && tt(s, this, null, 1, this._siblings[r])) : (s = o[r--] = O.selector(s), "string" == typeof s && o.splice(r + 1, 1)) : o.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = Z(e, this, !1), 1 === l && this._siblings.length > 1 && tt(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -d, this.render(Math.min(0, -this._delay)))
                }, !0),
                L = function(e) {
                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                I = function(t, e) {
                    var i, n = {};
                    for (i in t) V[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!H[i] || H[i] && H[i]._autoCSS) || (n[i] = t[i], delete t[i]);
                    t.css = n
                };
            a = O.prototype = new A, a.constructor = O, a.kill()._gc = !1, a.ratio = 0, a._firstPT = a._targets = a._overwrittenProps = a._startAt = null, a._notifyPluginsOfEnabled = a._lazy = !1, O.version = "1.20.2", O.defaultEase = a._ease = new w(null, null, 1, 1), O.defaultOverwrite = "auto", O.ticker = l, O.autoSleep = 120, O.lagSmoothing = function(t, e) {
                l.lagSmoothing(t, e)
            }, O.selector = t.$ || t.jQuery || function(e) {
                var i = t.$ || t.jQuery;
                return i ? (O.selector = i, i(e)) : "undefined" == typeof n ? e : n.querySelectorAll ? n.querySelectorAll(e) : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
            var D = [],
                M = {},
                N = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                q = /[\+-]=-?[\.\d]/,
                $ = function(t) {
                    for (var e, i = this._firstPT, n = 1e-6; i;) e = i.blob ? 1 === t && this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s, i.m ? e = i.m(e, this._target || i.t) : e < n && e > -n && !i.blob && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                },
                F = function(t, e, i, n) {
                    var r, s, o, a, l, h, c, u = [],
                        d = 0,
                        f = "",
                        p = 0;
                    for (u.start = t, u.end = e, t = u[0] = t + "", e = u[1] = e + "", i && (i(u), t = u[0], e = u[1]), u.length = 0, r = t.match(N) || [], s = e.match(N) || [], n && (n._next = null, n.blob = 1, u._firstPT = u._applyPT = n), l = s.length, a = 0; a < l; a++) c = s[a], h = e.substr(d, e.indexOf(c, d) - d), f += h || !a ? h : ",", d += h.length, p ? p = (p + 1) % 5 : "rgba(" === h.substr(-5) && (p = 1), c === r[a] || r.length <= a ? f += c : (f && (u.push(f), f = ""), o = parseFloat(r[a]), u.push(o), u._firstPT = {
                        _next: u._firstPT,
                        t: u,
                        p: u.length - 1,
                        s: o,
                        c: ("=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2)) : parseFloat(c) - o) || 0,
                        f: 0,
                        m: p && p < 4 ? Math.round : 0
                    }), d += c.length;
                    return f += e.substr(d), f && u.push(f), u.setRatio = $, q.test(e) && (u.end = 0), u
                },
                z = function(t, e, i, n, r, s, o, a, l) {
                    "function" == typeof n && (n = n(l || 0, t));
                    var h, c = typeof t[e],
                        u = "function" !== c ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                        d = "get" !== i ? i : u ? o ? t[u](o) : t[u]() : t[e],
                        f = "string" == typeof n && "=" === n.charAt(1),
                        p = {
                            t: t,
                            p: e,
                            s: d,
                            f: "function" === c,
                            pg: 0,
                            n: r || e,
                            m: s ? "function" == typeof s ? s : Math.round : 0,
                            pr: 0,
                            c: f ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - d || 0
                        };
                    if (("number" != typeof d || "number" != typeof n && !f) && (o || isNaN(d) || !f && isNaN(n) || "boolean" == typeof d || "boolean" == typeof n ? (p.fp = o, h = F(d, f ? parseFloat(p.s) + p.c : n, a || O.defaultStringFilter, p), p = {
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 2,
                            pg: 0,
                            n: r || e,
                            pr: 0,
                            m: 0
                        }) : (p.s = parseFloat(d), f || (p.c = parseFloat(n) - p.s || 0))), p.c) return (p._next = this._firstPT) && (p._next._prev = p), this._firstPT = p, p
                },
                B = O._internals = {
                    isArray: m,
                    isSelector: L,
                    lazyTweens: D,
                    blobDif: F
                },
                H = O._plugins = {},
                U = B.tweenLookup = {},
                X = 0,
                V = B.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1,
                    yoyoEase: 1
                },
                Q = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    true: 1,
                    false: 0
                },
                W = A._rootFramesTimeline = new j,
                G = A._rootTimeline = new j,
                Y = 30,
                J = B.lazyRender = function() {
                    var t, e = D.length;
                    for (M = {}; --e > -1;) t = D[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                    D.length = 0
                };
            G._startTime = l.time, W._startTime = l.frame, G._active = W._active = !0, setTimeout(J, 1), A._updateRoot = O.render = function() {
                var t, e, i;
                if (D.length && J(), G.render((l.time - G._startTime) * G._timeScale, !1, !1), W.render((l.frame - W._startTime) * W._timeScale, !1, !1), D.length && J(), l.frame >= Y) {
                    Y = l.frame + (parseInt(O.autoSleep, 10) || 120);
                    for (i in U) {
                        for (e = U[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete U[i]
                    }
                    if (i = G._first, (!i || i._paused) && O.autoSleep && !W._first && 1 === l._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || l.sleep()
                    }
                }
            }, l.addEventListener("tick", A._updateRoot);
            var Z = function(t, e, i) {
                    var n, r, s = t._gsTweenID;
                    if (U[s || (t._gsTweenID = s = "t" + X++)] || (U[s] = {
                            target: t,
                            tweens: []
                        }), e && (n = U[s].tweens, n[r = n.length] = e, i))
                        for (; --r > -1;) n[r] === e && n.splice(r, 1);
                    return U[s].tweens
                },
                K = function(t, e, i, n) {
                    var r, s, o = t.vars.onOverwrite;
                    return o && (r = o(t, e, i, n)), o = O.onOverwrite, o && (s = o(t, e, i, n)), r !== !1 && s !== !1
                },
                tt = function(t, e, i, n, r) {
                    var s, o, a, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, s = 0; s < l; s++)
                            if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0);
                            else if (5 === n) break;
                        return o
                    }
                    var h, c = e._startTime + d,
                        u = [],
                        f = 0,
                        p = 0 === e._duration;
                    for (s = r.length; --s > -1;)(a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || et(e, 0, p), 0 === et(a, h, p) && (u[f++] = a)) : a._startTime <= c && a._startTime + a.totalDuration() / a._timeScale > c && ((p || !a._initted) && c - a._startTime <= 2e-10 || (u[f++] = a)));
                    for (s = f; --s > -1;)
                        if (a = u[s], 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
                            if (2 !== n && !K(a, e)) continue;
                            a._enabled(!1, !1) && (o = !0)
                        }
                    return o
                },
                et = function(t, e, i) {
                    for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline;) {
                        if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return s /= r, s > e ? s - e : i && s === e || !t._initted && s - e < 2 * d ? d : (s += t.totalDuration() / t._timeScale / r) > e + d ? 0 : s - e - d
                };
            a._init = function() {
                var t, e, i, n, r, s, o = this.vars,
                    a = this._overwrittenProps,
                    l = this._duration,
                    h = !!o.immediateRender,
                    c = o.ease;
                if (o.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                    for (n in o.startAt) r[n] = o.startAt[n];
                    if (r.overwrite = !1, r.immediateRender = !0, r.lazy = h && o.lazy !== !1, r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateScope = o.onUpdateScope || o.callbackScope || this, this._startAt = O.to(this.target, 0, r), h)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== l) return
                } else if (o.runBackwards && 0 !== l)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (h = !1), i = {};
                        for (n in o) V[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && o.lazy !== !1, i.immediateRender = h, this._startAt = O.to(this.target, 0, i), h) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = c = c ? c instanceof w ? c : "function" == typeof c ? new w(c, o.easeParams) : x[c] || O.defaultEase : O.defaultEase, o.easeParams instanceof Array && c.config && (this._ease = c.config.apply(c, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (s = this._targets.length, t = 0; t < s; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
                if (e && O._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = o.onUpdate, this._initted = !0
            }, a._initProps = function(e, i, n, r, s) {
                var o, a, l, h, c, u;
                if (null == e) return !1;
                M[e._gsTweenID] && J(), this.vars.css || e.style && e !== t && e.nodeType && H.css && this.vars.autoCSS !== !1 && I(this.vars, e);
                for (o in this.vars)
                    if (u = this.vars[o], V[o]) u && (u instanceof Array || u.push && m(u)) && u.join("").indexOf("{self}") !== -1 && (this.vars[o] = u = this._swapSelfInParams(u, this));
                    else if (H[o] && (h = new H[o])._onInitTween(e, this.vars[o], this, s)) {
                    for (this._firstPT = c = {
                            _next: this._firstPT,
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: o,
                            pg: 1,
                            pr: h._priority,
                            m: 0
                        }, a = h._overwriteProps.length; --a > -1;) i[h._overwriteProps[a]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), c._next && (c._next._prev = c)
                } else i[o] = z.call(this, e, o, "get", u, o, 0, null, this.vars.stringFilter, s);
                return r && this._kill(r, e) ? this._initProps(e, i, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && tt(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r, s)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (M[e._gsTweenID] = !0), l)
            }, a.render = function(t, e, i) {
                var n, r, s, o, a = this._time,
                    l = this._duration,
                    h = this._rawPrevTime;
                if (t >= l - 1e-7 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (h < 0 || t <= 0 && t >= -1e-7 || h === d && "isPause" !== this.data) && h !== t && (i = !0, h > d && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || h === t ? t : d);
                else if (t < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && h > 0) && (r = "onReverseComplete", n = this._reversed), t < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== d || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || h === t ? t : d)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var c = t / l,
                        u = this._easeType,
                        f = this._easePower;
                    (1 === u || 3 === u && c >= .5) && (c = 1 - c), 3 === u && (c *= 2), 1 === f ? c *= c : 2 === f ? c *= c * c : 3 === f ? c *= c * c * c : 4 === f && (c *= c * c * c * c), 1 === u ? this.ratio = 1 - c : 2 === u ? this.ratio = c : t / l < .5 ? this.ratio = c / 2 : this.ratio = 1 - c / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== a || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = h, D.push(this), void(this._lazy = [t, e]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== l || e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                    this._onUpdate && (t < 0 && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== a || n || i) && this._callback("onUpdate")), r && (this._gc && !i || (t < 0 && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === d && o !== d && (this._rawPrevTime = 0)))
                }
            }, a._kill = function(t, e, i) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : O.selector(e) || e;
                var n, r, s, o, a, l, h, c, u, d = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((m(e) || L(e)) && "number" != typeof e[0])
                    for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (n = this._targets.length; --n > -1;)
                            if (e === this._targets[n]) {
                                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (a) {
                        if (h = t || a, c = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (O.onOverwrite || this.vars.onOverwrite)) {
                            for (s in h) a[s] && (u || (u = []), u.push(s));
                            if ((u || !t) && !K(this, i, e, u)) return !1
                        }
                        for (s in h)(o = a[s]) && (d && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(h) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), c && (r[s] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, a.invalidate = function() {
                return this._notifyPluginsOfEnabled && O._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], A.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -d, this.render(Math.min(0, -this._delay))), this
            }, a._enabled = function(t, e) {
                if (h || l.wake(), t && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = Z(n[i], this, !0);
                    else this._siblings = Z(this.target, this, !0)
                }
                return A.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && O._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            }, O.to = function(t, e, i) {
                return new O(t, e, i)
            }, O.from = function(t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new O(t, e, i)
            }, O.fromTo = function(t, e, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new O(t, e, n)
            }, O.delayedCall = function(t, e, i, n, r) {
                return new O(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: n,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, O.set = function(t, e) {
                return new O(t, 0, e)
            }, O.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : O.selector(t) || t;
                var i, n, r, s;
                if ((m(t) || L(t)) && "number" != typeof t[0]) {
                    for (i = t.length, n = []; --i > -1;) n = n.concat(O.getTweensOf(t[i], e));
                    for (i = n.length; --i > -1;)
                        for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                } else if (t._gsTweenID)
                    for (n = Z(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                return n || []
            }, O.killTweensOf = O.killDelayedCallsTo = function(t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var n = O.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
            };
            var it = y("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = it.prototype
            }, !0);
            if (a = it.prototype, it.version = "1.19.0", it.API = 2, a._firstPT = null, a._addTween = z, a.setRatio = $, a._kill = function(t) {
                    var e, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, a._mod = a._roundProps = function(t) {
                    for (var e, i = this._firstPT; i;) e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")], e && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next
                }, O._onPluginEvent = function(t, e) {
                    var i, n, r, s, o, a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a;) {
                            for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                            (a._prev = n ? n._prev : s) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : s = a, a = o
                        }
                        a = e._firstPT = r
                    }
                    for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
                    return i
                }, it.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === it.API && (H[(new t[e])._propName] = t[e]);
                    return !0
                }, v.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        n = t.priority || 0,
                        r = t.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_mod",
                            mod: "_mod",
                            initAll: "_onInitAllProps"
                        },
                        o = y("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            it.call(this, i, n), this._overwriteProps = r || []
                        }, t.global === !0),
                        a = o.prototype = new it(i);
                    a.constructor = o, o.API = t.API;
                    for (e in s) "function" == typeof t[e] && (a[s[e]] = t[e]);
                    return o.version = t.version, it.activate([o]), o
                }, s = t._gsQueue) {
                for (o = 0; o < s.length; o++) s[o]();
                for (a in g) g[a].func || t.console.log("GSAP encountered missing dependency: " + a)
            }
            h = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite"), define("TweenLite", function() {});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
            var e, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
                s = r.com.greensock,
                o = 2 * Math.PI,
                a = Math.PI / 2,
                l = s._class,
                h = function(e, i) {
                    var n = l("easing." + e, function() {}, !0),
                        r = n.prototype = new t;
                    return r.constructor = n, r.getRatio = i, n
                },
                c = t.register || function() {},
                u = function(t, e, i, n, r) {
                    var s = l("easing." + t, {
                        easeOut: new e,
                        easeIn: new i,
                        easeInOut: new n
                    }, !0);
                    return c(s, t), s
                },
                d = function(t, e, i) {
                    this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                },
                f = function(e, i) {
                    var n = l("easing." + e, function(t) {
                            this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                        }, !0),
                        r = n.prototype = new t;
                    return r.constructor = n, r.getRatio = i, r.config = function(t) {
                        return new n(t)
                    }, n
                },
                p = u("Back", f("BackOut", function(t) {
                    return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                }), f("BackIn", function(t) {
                    return t * t * ((this._p1 + 1) * t - this._p1)
                }), f("BackInOut", function(t) {
                    return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                })),
                m = l("easing.SlowMo", function(t, e, i) {
                    e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                }, !0),
                g = m.prototype = new t;
            return g.constructor = m, g.getRatio = function(t) {
                var e = t + (.5 - t) * this._p;
                return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
            }, m.ease = new m(.7, .7), g.config = m.config = function(t, e, i) {
                return new m(t, e, i)
            }, e = l("easing.SteppedEase", function(t, e) {
                t = t || 1, this._p1 = 1 / t, this._p2 = t + (e ? 0 : 1), this._p3 = e ? 1 : 0
            }, !0), g = e.prototype = new t, g.constructor = e, g.getRatio = function(t) {
                return t < 0 ? t = 0 : t >= 1 && (t = .999999999), ((this._p2 * t | 0) + this._p3) * this._p1
            }, g.config = e.config = function(t, i) {
                return new e(t, i)
            }, i = l("easing.RoughEase", function(e) {
                e = e || {};
                for (var i, n, r, s, o, a, l = e.taper || "none", h = [], c = 0, u = 0 | (e.points || 20), f = u, p = e.randomize !== !1, m = e.clamp === !0, g = e.template instanceof t ? e.template : null, _ = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = p ? Math.random() : 1 / u * f, n = g ? g.getRatio(i) : i, "none" === l ? r = _ : "out" === l ? (s = 1 - i, r = s * s * _) : "in" === l ? r = i * i * _ : i < .5 ? (s = 2 * i, r = s * s * .5 * _) : (s = 2 * (1 - i), r = s * s * .5 * _), p ? n += Math.random() * r - .5 * r : f % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : n < 0 && (n = 0)), h[c++] = {
                    x: i,
                    y: n
                };
                for (h.sort(function(t, e) {
                        return t.x - e.x
                    }), a = new d(1, 1, null), f = u; --f > -1;) o = h[f], a = new d(o.x, o.y, a);
                this._prev = new d(0, 0, 0 !== a.t ? a : a.next)
            }, !0), g = i.prototype = new t, g.constructor = i, g.getRatio = function(t) {
                var e = this._prev;
                if (t > e.t) {
                    for (; e.next && t >= e.t;) e = e.next;
                    e = e.prev
                } else
                    for (; e.prev && t <= e.t;) e = e.prev;
                return this._prev = e, e.v + (t - e.t) / e.gap * e.c
            }, g.config = function(t) {
                return new i(t)
            }, i.ease = new i, u("Bounce", h("BounceOut", function(t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }), h("BounceIn", function(t) {
                return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : t < 2 / 2.75 ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
            }), h("BounceInOut", function(t) {
                var e = t < .5;
                return t = e ? 1 - 2 * t : 2 * t - 1, t < 1 / 2.75 ? t *= 7.5625 * t : t = t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
            })), u("Circ", h("CircOut", function(t) {
                return Math.sqrt(1 - (t -= 1) * t)
            }), h("CircIn", function(t) {
                return -(Math.sqrt(1 - t * t) - 1)
            }), h("CircInOut", function(t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            })), n = function(e, i, n) {
                var r = l("easing." + e, function(t, e) {
                        this._p1 = t >= 1 ? t : 1, this._p2 = (e || n) / (t < 1 ? t : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
                    }, !0),
                    s = r.prototype = new t;
                return s.constructor = r, s.getRatio = i, s.config = function(t, e) {
                    return new r(t, e)
                }, r
            }, u("Elastic", n("ElasticOut", function(t) {
                return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
            }, .3), n("ElasticIn", function(t) {
                return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2))
            }, .3), n("ElasticInOut", function(t) {
                return (t *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
            }, .45)), u("Expo", h("ExpoOut", function(t) {
                return 1 - Math.pow(2, -10 * t)
            }), h("ExpoIn", function(t) {
                return Math.pow(2, 10 * (t - 1)) - .001
            }), h("ExpoInOut", function(t) {
                return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
            })), u("Sine", h("SineOut", function(t) {
                return Math.sin(t * a)
            }), h("SineIn", function(t) {
                return -Math.cos(t * a) + 1
            }), h("SineInOut", function(t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            })), l("easing.EaseLookup", {
                find: function(e) {
                    return t.map[e]
                }
            }, !0), c(r.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), p
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function() {
        "use strict";
        var t = function() {
            return _gsScope.GreenSockGlobals || _gsScope
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.js"), module.exports = t()) : "function" == typeof define && define.amd && define("gsap.EasePack", ["TweenLite"], t)
    }();
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        var t = (_gsScope.document || {}).documentElement,
            e = _gsScope,
            i = function(i, n) {
                var r = "x" === n ? "Width" : "Height",
                    s = "scroll" + r,
                    o = "client" + r,
                    a = document.body;
                return i === e || i === t || i === a ? Math.max(t[s], a[s]) - (e["inner" + r] || t[o] || a[o]) : i[s] - i["offset" + r]
            },
            n = function(t) {
                return "string" == typeof t && (t = TweenLite.selector(t)), t.length && t !== e && t[0] && t[0].style && !t.nodeType && (t = t[0]), t === e || t.nodeType && t.style ? t : null
            },
            r = function(i, n) {
                var r = "scroll" + ("x" === n ? "Left" : "Top");
                return i === e && (null != i.pageXOffset ? r = "page" + n.toUpperCase() + "Offset" : i = null != t[r] ? t : document.body),
                    function() {
                        return i[r]
                    }
            },
            s = function(i, s) {
                var o = n(i).getBoundingClientRect(),
                    a = !s || s === e || s === document.body,
                    l = (a ? t : s).getBoundingClientRect(),
                    h = {
                        x: o.left - l.left,
                        y: o.top - l.top
                    };
                return !a && s && (h.x += r(s, "x")(), h.y += r(s, "y")()), h
            },
            o = function(t, e, n) {
                var r = typeof t;
                return isNaN(t) ? "number" === r || "string" === r && "=" === t.charAt(1) ? t : "max" === t ? i(e, n) : Math.min(i(e, n), s(t, e)[n]) : parseFloat(t)
            },
            a = _gsScope._gsDefine.plugin({
                propName: "scrollTo",
                API: 2,
                global: !0,
                version: "1.9.0",
                init: function(t, i, n) {
                    return this._wdw = t === e, this._target = t, this._tween = n, "object" != typeof i ? (i = {
                        y: i
                    }, "string" == typeof i.y && "max" !== i.y && "=" !== i.y.charAt(1) && (i.x = i.y)) : i.nodeType && (i = {
                        y: i,
                        x: i
                    }), this.vars = i, this._autoKill = i.autoKill !== !1, this.getX = r(t, "x"), this.getY = r(t, "y"), this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != i.x ? (this._addTween(this, "x", this.x, o(i.x, t, "x") - (i.offsetX || 0), "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != i.y ? (this._addTween(this, "y", this.y, o(i.y, t, "y") - (i.offsetY || 0), "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
                },
                set: function(t) {
                    this._super.setRatio.call(this, t);
                    var n = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                        r = this._wdw || !this.skipY ? this.getY() : this.yPrev,
                        s = r - this.yPrev,
                        o = n - this.xPrev,
                        l = a.autoKillThreshold;
                    this.x < 0 && (this.x = 0), this.y < 0 && (this.y = 0), this._autoKill && (!this.skipX && (o > l || o < -l) && n < i(this._target, "x") && (this.skipX = !0), !this.skipY && (s > l || s < -l) && r < i(this._target, "y") && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? e.scrollTo(this.skipX ? n : this.x, this.skipY ? r : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
                }
            }),
            l = a.prototype;
        a.max = i, a.getOffset = s, a.buildGetter = r, a.autoKillThreshold = 7, l._kill = function(t) {
            return t.scrollTo_x && (this.skipX = !0), t.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, t)
        }
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[t]
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.js"), module.exports = e()) : "function" == typeof define && define.amd && define("gsap.ScrollToPlugin", ["TweenLite"], e)
    }("ScrollToPlugin");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";

        function t(t, e, i, n, r, s) {
            return i = (parseFloat(i || 0) - parseFloat(t || 0)) * r, n = (parseFloat(n || 0) - parseFloat(e || 0)) * s, Math.sqrt(i * i + n * n)
        }

        function e(t) {
            return "string" != typeof t && t.nodeType || (t = _gsScope.TweenLite.selector(t), t.length && (t = t[0])), t
        }

        function i(t, e, i) {
            var n, r, s = t.indexOf(" ");
            return s === -1 ? (n = void 0 !== i ? i + "" : t, r = t) : (n = t.substr(0, s), r = t.substr(s + 1)), n = n.indexOf("%") !== -1 ? parseFloat(n) / 100 * e : parseFloat(n), r = r.indexOf("%") !== -1 ? parseFloat(r) / 100 * e : parseFloat(r), n > r ? [r, n] : [n, r]
        }

        function n(i) {
            if (!i) return 0;
            i = e(i);
            var n, r, s, o, a, h, c, u = i.tagName.toLowerCase(),
                d = 1,
                f = 1;
            "non-scaling-stroke" === i.getAttribute("vector-effect") && (f = i.getScreenCTM(), d = f.a, f = f.d);
            try {
                r = i.getBBox()
            } catch (t) {}
            if (r && (r.width || r.height) || "rect" !== u && "circle" !== u && "ellipse" !== u || (r = {
                    width: parseFloat(i.getAttribute("rect" === u ? "width" : "circle" === u ? "r" : "rx")),
                    height: parseFloat(i.getAttribute("rect" === u ? "height" : "circle" === u ? "r" : "ry"))
                }, "rect" !== u && (r.width *= 2, r.height *= 2)), "path" === u) o = i.style.strokeDasharray, i.style.strokeDasharray = "none", n = i.getTotalLength() || 0, d !== f && console.log("Warning: <path> length cannot be measured accurately when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."), n *= (d + f) / 2, i.style.strokeDasharray = o;
            else if ("rect" === u) n = 2 * r.width * d + 2 * r.height * f;
            else if ("line" === u) n = t(i.getAttribute("x1"), i.getAttribute("y1"), i.getAttribute("x2"), i.getAttribute("y2"), d, f);
            else if ("polyline" === u || "polygon" === u)
                for (s = i.getAttribute("points").match(l) || [], "polygon" === u && s.push(s[0], s[1]), n = 0, a = 2; a < s.length; a += 2) n += t(s[a - 2], s[a - 1], s[a], s[a + 1], d, f) || 0;
            else "circle" !== u && "ellipse" !== u || (h = r.width / 2 * d, c = r.height / 2 * f, n = Math.PI * (3 * (h + c) - Math.sqrt((3 * h + c) * (h + 3 * c))));
            return n || 0
        }

        function r(t, i) {
            if (!t) return [0, 0];
            t = e(t), i = i || n(t) + 1;
            var r = a(t),
                s = r.strokeDasharray || "",
                o = parseFloat(r.strokeDashoffset),
                l = s.indexOf(",");
            return l < 0 && (l = s.indexOf(" ")), s = l < 0 ? i : parseFloat(s.substr(0, l)) || 1e-5, s > i && (s = i), [Math.max(0, -o), Math.max(0, s - o)]
        }
        var s, o = _gsScope.document,
            a = o.defaultView ? o.defaultView.getComputedStyle : function() {},
            l = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
            h = ((_gsScope.navigator || {}).userAgent || "").indexOf("Edge") !== -1;
        s = _gsScope._gsDefine.plugin({
            propName: "drawSVG",
            API: 2,
            version: "0.1.4",
            global: !0,
            overwriteProps: ["drawSVG"],
            init: function(t, e, s, o) {
                if (!t.getBBox) return !1;
                var l, c, u, d, f = n(t) + 1;
                return this._style = t.style, "function" == typeof e && (e = e(o, t)), e === !0 || "true" === e ? e = "0 100%" : e ? (e + "").indexOf(" ") === -1 && (e = "0 " + e) : e = "0 0", l = r(t, f), c = i(e, f, l[0]), this._length = f + 10, 0 === l[0] && 0 === c[0] ? (u = Math.max(1e-5, c[1] - f), this._dash = f + u, this._offset = f - l[1] + u, this._addTween(this, "_offset", this._offset, f - c[1] + u, "drawSVG")) : (this._dash = l[1] - l[0] || 1e-6, this._offset = -l[0], this._addTween(this, "_dash", this._dash, c[1] - c[0] || 1e-5, "drawSVG"), this._addTween(this, "_offset", this._offset, -c[0], "drawSVG")), h && (d = a(t), c = d.strokeLinecap, "butt" !== c && c !== d.strokeLinejoin && (c = parseFloat(d.strokeMiterlimit), this._addTween(t.style, "strokeMiterlimit", c, c + 1e-4, "strokeMiterlimit"))), !0
            },
            set: function(t) {
                this._firstPT && (this._super.setRatio.call(this, t), this._style.strokeDashoffset = this._offset, 1 === t || 0 === t ? this._style.strokeDasharray = this._offset < .001 && this._length - this._dash <= 10 ? "none" : this._offset === this._dash ? "0px, 999999px" : this._dash + "px," + this._length + "px" : this._style.strokeDasharray = this._dash + "px," + this._length + "px")
            }
        }), s.getLength = n, s.getPosition = r
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[t]
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.js"), module.exports = e()) : "function" == typeof define && define.amd && define("gsap.DrawSVGPlugin", ["TweenLite"], e)
    }("DrawSVGPlugin");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var n = function(t) {
                        var e, i = [],
                            n = t.length;
                        for (e = 0; e !== n; i.push(t[e++]));
                        return i
                    },
                    r = function(t, e, i) {
                        var n, r, s = t.cycle;
                        for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
                        delete t.cycle
                    },
                    s = function(t, e, n) {
                        i.call(this, t, e, n), this._cycle = 0, this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = s.prototype.render
                    },
                    o = 1e-10,
                    a = i._internals,
                    l = a.isSelector,
                    h = a.isArray,
                    c = s.prototype = i.to({}, .1, {}),
                    u = [];
                s.version = "1.20.2", c.constructor = s, c.kill()._gc = !1, s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf, s.getTweensOf = i.getTweensOf, s.lagSmoothing = i.lagSmoothing, s.ticker = i.ticker, s.render = i.render, c.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), i.prototype.invalidate.call(this)
                }, c.updateTo = function(t, e) {
                    var n, r = this.ratio,
                        s = this.vars.immediateRender || t.immediateRender;
                    e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (n in t) this.vars[n] = t[n];
                    if (this._initted || s)
                        if (e) this._initted = !1, s && this.render(0, !0, !0);
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var o = this._totalTime;
                        this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1)
                    } else if (this._initted = !1, this._init(), this._time > 0 || s)
                        for (var a, l = 1 / (1 - r), h = this._firstPT; h;) a = h.s + h.c, h.c *= l, h.s = a - h.c, h = h._next;
                    return this
                }, c.render = function(t, e, n) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var r, s, l, h, c, u, d, f, p, m = this._dirty ? this.totalDuration() : this._totalDuration,
                        g = this._time,
                        _ = this._totalTime,
                        v = this._cycle,
                        y = this._duration,
                        b = this._rawPrevTime;
                    if (t >= m - 1e-7 && t >= 0 ? (this._totalTime = m, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = y, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, s = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === y && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (t = 0), (b < 0 || t <= 0 && t >= -1e-7 || b === o && "isPause" !== this.data) && b !== t && (n = !0, b > o && (s = "onReverseComplete")), this._rawPrevTime = f = !e || t || b === t ? t : o)) : t < 1e-7 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== _ || 0 === y && b > 0) && (s = "onReverseComplete", r = this._reversed), t < 0 && (this._active = !1, 0 === y && (this._initted || !this.vars.lazy || n) && (b >= 0 && (n = !0), this._rawPrevTime = f = !e || t || b === t ? t : o)), this._initted || (n = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (h = y + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && _ <= t && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 !== (1 & this._cycle) && (this._time = y - this._time, p = this._yoyoEase || this.vars.yoyoEase, p && (this._yoyoEase || (p !== !0 || this._initted ? this._yoyoEase = p = p === !0 ? this._ease : p instanceof Ease ? p : Ease.map[p] : (p = this.vars.ease, this._yoyoEase = p = p ? p instanceof Ease ? p : "function" == typeof p ? new Ease(p, this.vars.easeParams) : Ease.map[p] || i.defaultEase : i.defaultEase)), this.ratio = p ? 1 - p.getRatio((y - this._time) / y) : 0)), this._time > y ? this._time = y : this._time < 0 && (this._time = 0)), this._easeType && !p ? (c = this._time / y, u = this._easeType, d = this._easePower, (1 === u || 3 === u && c >= .5) && (c = 1 - c), 3 === u && (c *= 2), 1 === d ? c *= c : 2 === d ? c *= c * c : 3 === d ? c *= c * c * c : 4 === d && (c *= c * c * c * c), 1 === u ? this.ratio = 1 - c : 2 === u ? this.ratio = c : this._time / y < .5 ? this.ratio = c / 2 : this.ratio = 1 - c / 2) : p || (this.ratio = this._ease.getRatio(this._time / y))), g === this._time && !n && v === this._cycle) return void(_ !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = g, this._totalTime = _, this._rawPrevTime = b, this._cycle = v, a.lazyTweens.push(this), void(this._lazy = [t, e]);
                        !this._time || r || p ? r && this._ease._calcEnd && !p && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / y)
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== g && t >= 0 && (this._active = !0), 0 === _ && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, n) : s || (s = "_dummyGS")), this.vars.onStart && (0 === this._totalTime && 0 !== y || e || this._callback("onStart"))), l = this._firstPT; l;) l.f ? l.t[l.p](l.c * this.ratio + l.s) : l.t[l.p] = l.c * this.ratio + l.s, l = l._next;
                    this._onUpdate && (t < 0 && this._startAt && this._startTime && this._startAt.render(t, e, n), e || (this._totalTime !== _ || s) && this._callback("onUpdate")), this._cycle !== v && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), s && (this._gc && !n || (t < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[s] && this._callback(s), 0 === y && this._rawPrevTime === o && f !== o && (this._rawPrevTime = 0)))
                }, s.to = function(t, e, i) {
                    return new s(t, e, i)
                }, s.from = function(t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new s(t, e, i)
                }, s.fromTo = function(t, e, i, n) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new s(t, e, n)
                }, s.staggerTo = s.allTo = function(t, e, o, a, c, d, f) {
                    a = a || 0;
                    var p, m, g, _, v = 0,
                        y = [],
                        b = function() {
                            o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments), c.apply(f || o.callbackScope || this, d || u)
                        },
                        w = o.cycle,
                        x = o.startAt && o.startAt.cycle;
                    for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t))), t = t || [], a < 0 && (t = n(t), t.reverse(), a *= -1), p = t.length - 1, g = 0; g <= p; g++) {
                        m = {};
                        for (_ in o) m[_] = o[_];
                        if (w && (r(m, t, g), null != m.duration && (e = m.duration, delete m.duration)), x) {
                            x = m.startAt = {};
                            for (_ in o.startAt) x[_] = o.startAt[_];
                            r(m.startAt, t, g)
                        }
                        m.delay = v + (m.delay || 0), g === p && c && (m.onComplete = b), y[g] = new s(t[g], e, m), v += a
                    }
                    return y
                }, s.staggerFrom = s.allFrom = function(t, e, i, n, r, o, a) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, s.staggerTo(t, e, i, n, r, o, a)
                }, s.staggerFromTo = s.allFromTo = function(t, e, i, n, r, o, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, s.staggerTo(t, e, n, r, o, a, l)
                }, s.delayedCall = function(t, e, i, n, r) {
                    return new s(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: n,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        useFrames: r,
                        overwrite: 0
                    })
                }, s.set = function(t, e) {
                    return new s(t, 0, e)
                }, s.isTweening = function(t) {
                    return i.getTweensOf(t, !0).length > 0
                };
                var d = function(t, e) {
                        for (var n = [], r = 0, s = t._first; s;) s instanceof i ? n[r++] = s : (e && (n[r++] = s), n = n.concat(d(s, e)), r = n.length), s = s._next;
                        return n
                    },
                    f = s.getAllTweens = function(e) {
                        return d(t._rootTimeline, e).concat(d(t._rootFramesTimeline, e))
                    };
                s.killAll = function(t, i, n, r) {
                    null == i && (i = !0), null == n && (n = !0);
                    var s, o, a, l = f(0 != r),
                        h = l.length,
                        c = i && n && r;
                    for (a = 0; a < h; a++) o = l[a], (c || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
                }, s.killChildTweensOf = function(t, e) {
                    if (null != t) {
                        var r, o, c, u, d, f = a.tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t)), h(t))
                            for (u = t.length; --u > -1;) s.killChildTweensOf(t[u], e);
                        else {
                            r = [];
                            for (c in f)
                                for (o = f[c].target.parentNode; o;) o === t && (r = r.concat(f[c].tweens)), o = o.parentNode;
                            for (d = r.length,
                                u = 0; u < d; u++) e && r[u].totalTime(r[u].totalDuration()), r[u]._enabled(!1, !1)
                        }
                    }
                };
                var p = function(t, i, n, r) {
                    i = i !== !1, n = n !== !1, r = r !== !1;
                    for (var s, o, a = f(r), l = i && n && r, h = a.length; --h > -1;) o = a[h], (l || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && o.paused(t)
                };
                return s.pauseAll = function(t, e, i) {
                    p(!0, t, e, i)
                }, s.resumeAll = function(t, e, i) {
                    p(!1, t, e, i)
                }, s.globalTimeScale = function(e) {
                    var n = t._rootTimeline,
                        r = i.ticker.time;
                    return arguments.length ? (e = e || o, n._startTime = r - (r - n._startTime) * n._timeScale / e, n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale
                }, c.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                }, c.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                }, c.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, c.duration = function(e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                }, c.totalDuration = function(t) {
                    return arguments.length ? this._repeat === -1 ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, c.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, c.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, c.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, s
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var n = function(t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, n, r = this.vars;
                        for (n in r) i = r[n], l(i) && i.join("").indexOf("{self}") !== -1 && (r[n] = this._swapSelfInParams(i));
                        l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                    },
                    r = 1e-10,
                    s = i._internals,
                    o = n._internals = {},
                    a = s.isSelector,
                    l = s.isArray,
                    h = s.lazyTweens,
                    c = s.lazyRender,
                    u = _gsScope._gsDefine.globals,
                    d = function(t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i
                    },
                    f = function(t, e, i) {
                        var n, r, s = t.cycle;
                        for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
                        delete t.cycle
                    },
                    p = o.pauseCallback = function() {},
                    m = function(t) {
                        var e, i = [],
                            n = t.length;
                        for (e = 0; e !== n; i.push(t[e++]));
                        return i
                    },
                    g = n.prototype = new e;
                return n.version = "1.20.2", g.constructor = n, g.kill()._gc = g._forcingPlayhead = g._hasPause = !1, g.to = function(t, e, n, r) {
                    var s = n.repeat && u.TweenMax || i;
                    return e ? this.add(new s(t, e, n), r) : this.set(t, n, r)
                }, g.from = function(t, e, n, r) {
                    return this.add((n.repeat && u.TweenMax || i).from(t, e, n), r)
                }, g.fromTo = function(t, e, n, r, s) {
                    var o = r.repeat && u.TweenMax || i;
                    return e ? this.add(o.fromTo(t, e, n, r), s) : this.set(t, r, s)
                }, g.staggerTo = function(t, e, r, s, o, l, h, c) {
                    var u, p, g = new n({
                            onComplete: l,
                            onCompleteParams: h,
                            callbackScope: c,
                            smoothChildTiming: this.smoothChildTiming
                        }),
                        _ = r.cycle;
                    for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = m(t)), s = s || 0, s < 0 && (t = m(t), t.reverse(), s *= -1), p = 0; p < t.length; p++) u = d(r), u.startAt && (u.startAt = d(u.startAt), u.startAt.cycle && f(u.startAt, t, p)), _ && (f(u, t, p), null != u.duration && (e = u.duration, delete u.duration)), g.to(t[p], e, u, p * s);
                    return this.add(g, o)
                }, g.staggerFrom = function(t, e, i, n, r, s, o, a) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, s, o, a)
                }, g.staggerFromTo = function(t, e, i, n, r, s, o, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, s, o, a, l)
                }, g.call = function(t, e, n, r) {
                    return this.add(i.delayedCall(0, t, e, n), r)
                }, g.set = function(t, e, n) {
                    return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n)
                }, n.exportRoot = function(t, e) {
                    t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var r, s, o = new n(t),
                        a = o._timeline;
                    for (null == e && (e = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, r = a._first; r;) s = r._next, e && r instanceof i && r.target === r.vars.onComplete || o.add(r, r._startTime - r._delay), r = s;
                    return a.add(o, 0), o
                }, g.add = function(r, s, o, a) {
                    var h, c, u, d, f, p;
                    if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof t)) {
                        if (r instanceof Array || r && r.push && l(r)) {
                            for (o = o || "normal", a = a || 0, h = s, c = r.length, u = 0; u < c; u++) l(d = r[u]) && (d = new n({
                                tweens: d
                            })), this.add(d, h), "string" != typeof d && "function" != typeof d && ("sequence" === o ? h = d._startTime + d.totalDuration() / d._timeScale : "start" === o && (d._startTime -= d.delay())), h += a;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof r) return this.addLabel(r, s);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                        r = i.delayedCall(0, r)
                    }
                    if (e.prototype.add.call(this, r, s), r._time && r.render((this.rawTime() - r._startTime) * r._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (f = this, p = f.rawTime() > r._startTime; f._timeline;) p && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1), f = f._timeline;
                    return this
                }, g.remove = function(e) {
                    if (e instanceof t) {
                        this._remove(e, !1);
                        var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                        return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
                    }
                    if (e instanceof Array || e && e.push && l(e)) {
                        for (var n = e.length; --n > -1;) this.remove(e[n]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }, g._remove = function(t, i) {
                    e.prototype._remove.call(this, t, i);
                    var n = this._last;
                    return n ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, g.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }, g.insert = g.insertMultiple = function(t, e, i, n) {
                    return this.add(t, e || 0, i, n)
                }, g.appendMultiple = function(t, e, i, n) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
                }, g.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this
                }, g.addPause = function(t, e, n, r) {
                    var s = i.delayedCall(0, p, n, r || this);
                    return s.vars.onComplete = s.vars.onReverseComplete = e, s.data = "isPause", this._hasPause = !0, this.add(s, t)
                }, g.removeLabel = function(t) {
                    return delete this._labels[t], this
                }, g.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }, g._parseTimeOrLabel = function(e, i, n, r) {
                    var s, o;
                    if (r instanceof t && r.timeline === this) this.remove(r);
                    else if (r && (r instanceof Array || r.push && l(r)))
                        for (o = r.length; --o > -1;) r[o] instanceof t && r[o].timeline === this && this.remove(r[o]);
                    if (s = this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration, "string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - s : 0, n);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = s);
                    else {
                        if (o = e.indexOf("="), o === -1) return null == this._labels[e] ? n ? this._labels[e] = s + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)), e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, n) : s
                    }
                    return Number(e) + i
                }, g.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
                }, g.stop = function() {
                    return this.paused(!0)
                }, g.gotoAndPlay = function(t, e) {
                    return this.play(t, e)
                }, g.gotoAndStop = function(t, e) {
                    return this.pause(t, e)
                }, g.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, s, o, a, l, u, d, f = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._time,
                        m = this._startTime,
                        g = this._timeScale,
                        _ = this._paused;
                    if (t >= f - 1e-7 && t >= 0) this._totalTime = this._time = f, this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = f + 1e-4;
                    else if (t < 1e-7)
                        if (this._totalTime = this._time = 0, (0 !== p || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || t < 0 && this._rawPrevTime >= 0)) && (a = "onReverseComplete", s = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s)
                                for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                            t = 0, this._initted || (l = !0)
                        } else {
                        if (this._hasPause && !this._forcingPlayhead && !e) {
                            if (t >= p)
                                for (n = this._first; n && n._startTime <= t && !u;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (u = n), n = n._next;
                            else
                                for (n = this._last; n && n._startTime >= t && !u;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (u = n), n = n._prev;
                            u && (this._time = t = u._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        this._totalTime = this._time = this._rawPrevTime = t
                    }
                    if (this._time !== p && this._first || i || l || u) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0), 0 === p && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), d = this._time, d >= p)
                            for (n = this._first; n && (o = n._next, d === this._time && (!this._paused || _));)(n._active || n._startTime <= d && !n._paused && !n._gc) && (u === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
                        else
                            for (n = this._last; n && (o = n._prev, d === this._time && (!this._paused || _));) {
                                if (n._active || n._startTime <= p && !n._paused && !n._gc) {
                                    if (u === n) {
                                        for (u = n._prev; u && u.endTime() > this._time;) u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i), u = u._prev;
                                        u = null, this.pause()
                                    }
                                    n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                                }
                                n = o
                            }
                        this._onUpdate && (e || (h.length && c(), this._callback("onUpdate"))), a && (this._gc || m !== this._startTime && g === this._timeScale || (0 === this._time || f >= this.totalDuration()) && (s && (h.length && c(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
                    }
                }, g._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, g.getChildren = function(t, e, n, r) {
                    r = r || -9999999999;
                    for (var s = [], o = this._first, a = 0; o;) o._startTime < r || (o instanceof i ? e !== !1 && (s[a++] = o) : (n !== !1 && (s[a++] = o), t !== !1 && (s = s.concat(o.getChildren(!0, e, n)), a = s.length))), o = o._next;
                    return s
                }, g.getTweensOf = function(t, e) {
                    var n, r, s = this._gc,
                        o = [],
                        a = 0;
                    for (s && this._enabled(!0, !0), n = i.getTweensOf(t), r = n.length; --r > -1;)(n[r].timeline === this || e && this._contains(n[r])) && (o[a++] = n[r]);
                    return s && this._enabled(!1, !0), o
                }, g.recent = function() {
                    return this._recent
                }, g._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, g.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                    if (e)
                        for (n in s) s[n] >= i && (s[n] += t);
                    return this._uncache(!0)
                }, g._kill = function(t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
                    return r
                }, g.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return t !== !1 && (this._labels = {}), this._uncache(!0)
                }, g.invalidate = function() {
                    for (var e = this._first; e;) e.invalidate(), e = e._next;
                    return t.prototype.invalidate.call(this)
                }, g._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
                    return e.prototype._enabled.call(this, t, i)
                }, g.totalTime = function(e, i, n) {
                    this._forcingPlayhead = !0;
                    var r = t.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, r
                }, g.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                }, g.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, n = 0, r = this._last, s = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = e;
                            this._duration = this._totalDuration = n, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
                }, g.paused = function(e) {
                    if (!e)
                        for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                    return t.prototype.paused.apply(this, arguments)
                }, g.usesFrames = function() {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline
                }, g.rawTime = function(t) {
                    return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
                }, n
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                var n = function(e) {
                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                    },
                    r = 1e-10,
                    s = e._internals,
                    o = s.lazyTweens,
                    a = s.lazyRender,
                    l = _gsScope._gsDefine.globals,
                    h = new i(null, null, 1, 0),
                    c = n.prototype = new t;
                return c.constructor = n, c.kill()._gc = !1, n.version = "1.20.2", c.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                }, c.addCallback = function(t, i, n, r) {
                    return this.add(e.delayedCall(0, t, n, r), i)
                }, c.removeCallback = function(t, e) {
                    if (t)
                        if (null == e) this._kill(null, t);
                        else
                            for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                    return this
                }, c.removePause = function(e) {
                    return this.removeCallback(t._internals.pauseCallback, e)
                }, c.tweenTo = function(t, i) {
                    i = i || {};
                    var n, r, s, o = {
                            ease: h,
                            useFrames: this.usesFrames(),
                            immediateRender: !1
                        },
                        a = i.repeat && l.TweenMax || e;
                    for (r in i) o[r] = i[r];
                    return o.time = this._parseTimeOrLabel(t), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new a(this, n, o), o.onStart = function() {
                        s.target.paused(!0), s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
                    }, s
                }, c.tweenFromTo = function(t, e, i) {
                    i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [t],
                        callbackScope: this
                    }, i.immediateRender = i.immediateRender !== !1;
                    var n = this.tweenTo(e, i);
                    return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
                }, c.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, s, l, h, c, u, d, f, p = this._dirty ? this.totalDuration() : this._totalDuration,
                        m = this._duration,
                        g = this._time,
                        _ = this._totalTime,
                        v = this._startTime,
                        y = this._timeScale,
                        b = this._rawPrevTime,
                        w = this._paused,
                        x = this._cycle;
                    if (t >= p - 1e-7 && t >= 0) this._locked || (this._totalTime = p, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, h = "onComplete", c = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-7 || b < 0 || b === r) && b !== t && this._first && (c = !0, b > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = m, t = m + 1e-4);
                    else if (t < 1e-7)
                        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== g || 0 === m && b !== r && (b > 0 || t < 0 && b >= 0) && !this._locked) && (h = "onReverseComplete", s = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (c = s = !0, h = "onReverseComplete") : b >= 0 && this._first && (c = !0), this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s)
                                for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                            t = 0, this._initted || (c = !0)
                        } else if (0 === m && b < 0 && (c = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (u = m + this._repeatDelay, this._cycle = this._totalTime / u >> 0, 0 !== this._cycle && this._cycle === this._totalTime / u && _ <= t && this._cycle--, this._time = this._totalTime - this._cycle * u, this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, t = m + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e) {
                        if (t = this._time, t >= g || this._repeat && x !== this._cycle)
                            for (n = this._first; n && n._startTime <= t && !d;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (d = n), n = n._next;
                        else
                            for (n = this._last; n && n._startTime >= t && !d;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (d = n), n = n._prev;
                        d && d._startTime < m && (this._time = t = d._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    if (this._cycle !== x && !this._locked) {
                        var T = this._yoyo && 0 !== (1 & x),
                            S = T === (this._yoyo && 0 !== (1 & this._cycle)),
                            P = this._totalTime,
                            k = this._cycle,
                            C = this._rawPrevTime,
                            E = this._time;
                        if (this._totalTime = x * m, this._cycle < x ? T = !T : this._totalTime += m, this._time = g, this._rawPrevTime = 0 === m ? b - 1e-4 : b, this._cycle = x, this._locked = !0, g = T ? 0 : m, this.render(g, e, 0 === m), e || this._gc || this.vars.onRepeat && (this._cycle = k, this._locked = !1, this._callback("onRepeat")), g !== this._time) return;
                        if (S && (this._cycle = x, this._locked = !0, g = T ? m + 1e-4 : -1e-4, this.render(g, !0, !1)), this._locked = !1, this._paused && !w) return;
                        this._time = E, this._totalTime = P, this._cycle = k, this._rawPrevTime = C
                    }
                    if (!(this._time !== g && this._first || i || c || d)) return void(_ !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== _ && t > 0 && (this._active = !0), 0 === _ && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")), f = this._time, f >= g)
                        for (n = this._first; n && (l = n._next, f === this._time && (!this._paused || w));)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (d === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = l;
                    else
                        for (n = this._last; n && (l = n._prev, f === this._time && (!this._paused || w));) {
                            if (n._active || n._startTime <= g && !n._paused && !n._gc) {
                                if (d === n) {
                                    for (d = n._prev; d && d.endTime() > this._time;) d.render(d._reversed ? d.totalDuration() - (t - d._startTime) * d._timeScale : (t - d._startTime) * d._timeScale, e, i), d = d._prev;
                                    d = null, this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                            }
                            n = l
                        }
                    this._onUpdate && (e || (o.length && a(), this._callback("onUpdate"))), h && (this._locked || this._gc || v !== this._startTime && y === this._timeScale || (0 === this._time || p >= this.totalDuration()) && (s && (o.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this._callback(h)))
                }, c.getActive = function(t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var n, r, s = [],
                        o = this.getChildren(t, e, i),
                        a = 0,
                        l = o.length;
                    for (n = 0; n < l; n++) r = o[n], r.isActive() && (s[a++] = r);
                    return s
                }, c.getLabelAfter = function(t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(),
                        n = i.length;
                    for (e = 0; e < n; e++)
                        if (i[e].time > t) return i[e].name;
                    return null
                }, c.getLabelBefore = function(t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                        if (e[i].time < t) return e[i].name;
                    return null
                }, c.getLabelsArray = function() {
                    var t, e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = {
                        time: this._labels[t],
                        name: t
                    };
                    return e.sort(function(t, e) {
                        return t.time - e.time
                    }), e
                }, c.invalidate = function() {
                    return this._locked = !1, t.prototype.invalidate.call(this)
                }, c.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration() || 0
                }, c.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration() || 0
                }, c.totalDuration = function(e) {
                    return arguments.length ? this._repeat !== -1 && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, c.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, c.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, c.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, c.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, c.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }, n
            }, !0),
            function() {
                var t = 180 / Math.PI,
                    e = [],
                    i = [],
                    n = [],
                    r = {},
                    s = _gsScope._gsDefine.globals,
                    o = function(t, e, i, n) {
                        i === n && (i = n - (n - e) / 1e6), t === e && (e = t + (i - t) / 1e6), this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t
                    },
                    a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    l = function(t, e, i, n) {
                        var r = {
                                a: t
                            },
                            s = {},
                            o = {},
                            a = {
                                c: n
                            },
                            l = (t + e) / 2,
                            h = (e + i) / 2,
                            c = (i + n) / 2,
                            u = (l + h) / 2,
                            d = (h + c) / 2,
                            f = (d - u) / 8;
                        return r.b = l + (t - l) / 4, s.b = u + f, r.c = s.a = (r.b + s.b) / 2, s.c = o.a = (u + d) / 2, o.b = d - f, a.b = c + (n - c) / 4, o.c = a.a = (o.b + a.b) / 2, [r, s, o, a]
                    },
                    h = function(t, r, s, o, a) {
                        var h, c, u, d, f, p, m, g, _, v, y, b, w, x = t.length - 1,
                            T = 0,
                            S = t[0].a;
                        for (h = 0; h < x; h++) f = t[T], c = f.a, u = f.d, d = t[T + 1].d, a ? (y = e[h], b = i[h], w = (b + y) * r * .25 / (o ? .5 : n[h] || .5), p = u - (u - c) * (o ? .5 * r : 0 !== y ? w / y : 0), m = u + (d - u) * (o ? .5 * r : 0 !== b ? w / b : 0), g = u - (p + ((m - p) * (3 * y / (y + b) + .5) / 4 || 0))) : (p = u - (u - c) * r * .5, m = u + (d - u) * r * .5, g = u - (p + m) / 2), p += g, m += g, f.c = _ = p, 0 !== h ? f.b = S : f.b = S = f.a + .6 * (f.c - f.a), f.da = u - c, f.ca = _ - c, f.ba = S - c, s ? (v = l(c, S, _, u), t.splice(T, 1, v[0], v[1], v[2], v[3]), T += 4) : T++, S = m;
                        f = t[T], f.b = S, f.c = S + .4 * (f.d - S), f.da = f.d - f.a, f.ca = f.c - f.a, f.ba = S - f.a, s && (v = l(f.a, S, f.c, f.d), t.splice(T, 1, v[0], v[1], v[2], v[3]))
                    },
                    c = function(t, n, r, s) {
                        var a, l, h, c, u, d, f = [];
                        if (s)
                            for (t = [s].concat(t), l = t.length; --l > -1;) "string" == typeof(d = t[l][n]) && "=" === d.charAt(1) && (t[l][n] = s[n] + Number(d.charAt(0) + d.substr(2)));
                        if (a = t.length - 2, a < 0) return f[0] = new o(t[0][n], 0, 0, t[0][n]), f;
                        for (l = 0; l < a; l++) h = t[l][n], c = t[l + 1][n], f[l] = new o(h, 0, 0, c), r && (u = t[l + 2][n], e[l] = (e[l] || 0) + (c - h) * (c - h), i[l] = (i[l] || 0) + (u - c) * (u - c));
                        return f[l] = new o(t[l][n], 0, 0, t[l + 1][n]), f
                    },
                    u = function(t, s, o, l, u, d) {
                        var f, p, m, g, _, v, y, b, w = {},
                            x = [],
                            T = d || t[0];
                        u = "string" == typeof u ? "," + u + "," : a, null == s && (s = 1);
                        for (p in t[0]) x.push(p);
                        if (t.length > 1) {
                            for (b = t[t.length - 1], y = !0, f = x.length; --f > -1;)
                                if (p = x[f], Math.abs(T[p] - b[p]) > .05) {
                                    y = !1;
                                    break
                                }
                            y && (t = t.concat(), d && t.unshift(d), t.push(t[1]), d = t[t.length - 3])
                        }
                        for (e.length = i.length = n.length = 0, f = x.length; --f > -1;) p = x[f], r[p] = u.indexOf("," + p + ",") !== -1, w[p] = c(t, p, r[p], d);
                        for (f = e.length; --f > -1;) e[f] = Math.sqrt(e[f]), i[f] = Math.sqrt(i[f]);
                        if (!l) {
                            for (f = x.length; --f > -1;)
                                if (r[p])
                                    for (m = w[x[f]], v = m.length - 1, g = 0; g < v; g++) _ = m[g + 1].da / i[g] + m[g].da / e[g] || 0, n[g] = (n[g] || 0) + _ * _;
                            for (f = n.length; --f > -1;) n[f] = Math.sqrt(n[f])
                        }
                        for (f = x.length, g = o ? 4 : 1; --f > -1;) p = x[f], m = w[p], h(m, s, o, l, r[p]), y && (m.splice(0, g), m.splice(m.length - g, g));
                        return w
                    },
                    d = function(t, e, i) {
                        e = e || "soft";
                        var n, r, s, a, l, h, c, u, d, f, p, m = {},
                            g = "cubic" === e ? 3 : 2,
                            _ = "soft" === e,
                            v = [];
                        if (_ && i && (t = [i].concat(t)), null == t || t.length < g + 1) throw "invalid Bezier data";
                        for (d in t[0]) v.push(d);
                        for (h = v.length; --h > -1;) {
                            for (d = v[h], m[d] = l = [], f = 0, u = t.length, c = 0; c < u; c++) n = null == i ? t[c][d] : "string" == typeof(p = t[c][d]) && "=" === p.charAt(1) ? i[d] + Number(p.charAt(0) + p.substr(2)) : Number(p), _ && c > 1 && c < u - 1 && (l[f++] = (n + l[f - 2]) / 2), l[f++] = n;
                            for (u = f - g + 1, f = 0, c = 0; c < u; c += g) n = l[c], r = l[c + 1], s = l[c + 2], a = 2 === g ? 0 : l[c + 3], l[f++] = p = 3 === g ? new o(n, r, s, a) : new o(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
                            l.length = f
                        }
                        return m
                    },
                    f = function(t, e, i) {
                        for (var n, r, s, o, a, l, h, c, u, d, f, p = 1 / i, m = t.length; --m > -1;)
                            for (d = t[m], s = d.a, o = d.d - s, a = d.c - s, l = d.b - s, n = r = 0, c = 1; c <= i; c++) h = p * c, u = 1 - h, n = r - (r = (h * h * o + 3 * u * (h * a + u * l)) * h), f = m * i + c - 1, e[f] = (e[f] || 0) + n * n
                    },
                    p = function(t, e) {
                        e = e >> 0 || 6;
                        var i, n, r, s, o = [],
                            a = [],
                            l = 0,
                            h = 0,
                            c = e - 1,
                            u = [],
                            d = [];
                        for (i in t) f(t[i], o, e);
                        for (r = o.length, n = 0; n < r; n++) l += Math.sqrt(o[n]), s = n % e, d[s] = l, s === c && (h += l, s = n / e >> 0, u[s] = d, a[s] = h, l = 0, d = []);
                        return {
                            length: h,
                            lengths: a,
                            segments: u
                        }
                    },
                    m = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.8",
                        API: 2,
                        global: !0,
                        init: function(t, e, i) {
                            this._target = t, e instanceof Array && (e = {
                                values: e
                            }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                            var n, r, s, o, a, l = e.values || [],
                                h = {},
                                c = l[0],
                                f = e.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = f ? f instanceof Array ? f : [
                                ["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]
                            ] : null;
                            for (n in c) this._props.push(n);
                            for (s = this._props.length; --s > -1;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], h[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), a || h[n] !== l[0][n] && (a = h);
                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : d(l, e.type, h), this._segCount = this._beziers[n].length, this._timeRes) {
                                var m = p(this._beziers, this._timeRes);
                                this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (f = this._autoRotate)
                                for (this._initialRotations = [], f[0] instanceof Array || (this._autoRotate = f = [f]), s = f.length; --s > -1;) {
                                    for (o = 0; o < 3; o++) n = f[s][o], this._func[n] = "function" == typeof t[n] && t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)];
                                    n = f[s][2], this._initialRotations[s] = (this._func[n] ? this._func[n].call(this._target) : this._target[n]) || 0, this._overwriteProps.push(n)
                                }
                            return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(e) {
                            var i, n, r, s, o, a, l, h, c, u, d = this._segCount,
                                f = this._func,
                                p = this._target,
                                m = e !== this._startRatio;
                            if (this._timeRes) {
                                if (c = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && r < d - 1) {
                                    for (h = d - 1; r < h && (this._l2 = c[++r]) <= e;);
                                    this._l1 = c[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
                                } else if (e < this._l1 && r > 0) {
                                    for (; r > 0 && (this._l1 = c[--r]) >= e;);
                                    0 === r && e < this._l1 ? this._l1 = 0 : r++, this._l2 = c[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
                                }
                                if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < u.length - 1) {
                                    for (h = u.length - 1; r < h && (this._s2 = u[++r]) <= e;);
                                    this._s1 = u[r - 1], this._si = r
                                } else if (e < this._s1 && r > 0) {
                                    for (; r > 0 && (this._s1 = u[--r]) >= e;);
                                    0 === r && e < this._s1 ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
                                }
                                a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                            } else i = e < 0 ? 0 : e >= 1 ? d - 1 : d * e >> 0, a = (e - i * (1 / d)) * d;
                            for (n = 1 - a, r = this._props.length; --r > -1;) s = this._props[r], o = this._beziers[s][i], l = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a, this._mod[s] && (l = this._mod[s](l, p)), f[s] ? p[s](l) : p[s] = l;
                            if (this._autoRotate) {
                                var g, _, v, y, b, w, x, T = this._autoRotate;
                                for (r = T.length; --r > -1;) s = T[r][2], w = T[r][3] || 0, x = T[r][4] === !0 ? 1 : t, o = this._beziers[T[r][0]], g = this._beziers[T[r][1]], o && g && (o = o[i], g = g[i], _ = o.a + (o.b - o.a) * a, y = o.b + (o.c - o.b) * a, _ += (y - _) * a, y += (o.c + (o.d - o.c) * a - y) * a, v = g.a + (g.b - g.a) * a, b = g.b + (g.c - g.b) * a, v += (b - v) * a, b += (g.c + (g.d - g.c) * a - b) * a, l = m ? Math.atan2(b - v, y - _) * x + w : this._initialRotations[r], this._mod[s] && (l = this._mod[s](l, p)), f[s] ? p[s](l) : p[s] = l)
                            }
                        }
                    }),
                    g = m.prototype;
                m.bezierThrough = u, m.cubicToQuadratic = l, m._autoCSS = !0, m.quadraticToCubic = function(t, e, i) {
                    return new o(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                }, m._cssRegister = function() {
                    var t = s.CSSPlugin;
                    if (t) {
                        var e = t._internals,
                            i = e._parseToProxy,
                            n = e._setPluginRatio,
                            r = e.CSSPropTween;
                        e._registerComplexSpecialProp("bezier", {
                            parser: function(t, e, s, o, a, l) {
                                e instanceof Array && (e = {
                                    values: e
                                }), l = new m;
                                var h, c, u, d = e.values,
                                    f = d.length - 1,
                                    p = [],
                                    g = {};
                                if (f < 0) return a;
                                for (h = 0; h <= f; h++) u = i(t, d[h], o, a, l, f !== h), p[h] = u.end;
                                for (c in e) g[c] = e[c];
                                return g.values = p, a = new r(t, "bezier", 0, 0, u.pt, 2), a.data = u, a.plugin = l, a.setRatio = n, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (h = g.autoRotate === !0 ? 0 : Number(g.autoRotate), g.autoRotate = null != u.end.left ? [
                                    ["left", "top", "rotation", h, !1]
                                ] : null != u.end.x && [
                                    ["x", "y", "rotation", h, !1]
                                ]), g.autoRotate && (o._transform || o._enableTransforms(!1), u.autoRotate = o._target._gsTransform, u.proxy.rotation = u.autoRotate.rotation || 0, o._overwriteProps.push("rotation")), l._onInitTween(u.proxy, g, o._tween), a
                            }
                        })
                    }
                }, g._mod = function(t) {
                    for (var e, i = this._overwriteProps, n = i.length; --n > -1;) e = t[i[n]], e && "function" == typeof e && (this._mod[i[n]] = e)
                }, g._kill = function(t) {
                    var e, i, n = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);
                    if (n = this._autoRotate)
                        for (i = n.length; --i > -1;) t[n[i][2]] && n.splice(i, 1);
                    return this._super._kill.call(this, t)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                var i, n, r, s, o = function() {
                        t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
                    },
                    a = _gsScope._gsDefine.globals,
                    l = {},
                    h = o.prototype = new t("css");
                h.constructor = o, o.version = "1.20.0", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, h = "px", o.suffixMap = {
                    top: h,
                    right: h,
                    bottom: h,
                    left: h,
                    width: h,
                    height: h,
                    fontSize: h,
                    padding: h,
                    margin: h,
                    perspective: h,
                    lineHeight: ""
                };
                var c, u, d, f, p, m, g, _, v = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                    y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    b = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    w = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    x = /(?:\d|\-|\+|=|#|\.)*/g,
                    T = /opacity *= *([^)]*)/i,
                    S = /opacity:([^;]*)/i,
                    P = /alpha\(opacity *=.+?\)/i,
                    k = /^(rgb|hsl)/,
                    C = /([A-Z])/g,
                    E = /-([a-z])/gi,
                    A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    R = function(t, e) {
                        return e.toUpperCase()
                    },
                    j = /(?:Left|Right|Width)/i,
                    O = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    L = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    I = /,(?=[^\)]*(?:\(|$))/gi,
                    D = /[\s,\(]/i,
                    M = Math.PI / 180,
                    N = 180 / Math.PI,
                    q = {},
                    $ = {
                        style: {}
                    },
                    F = _gsScope.document || {
                        createElement: function() {
                            return $
                        }
                    },
                    z = function(t, e) {
                        return F.createElementNS ? F.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : F.createElement(t)
                    },
                    B = z("div"),
                    H = z("img"),
                    U = o._internals = {
                        _specialProps: l
                    },
                    X = (_gsScope.navigator || {}).userAgent || "",
                    V = function() {
                        var t = X.indexOf("Android"),
                            e = z("a");
                        return d = X.indexOf("Safari") !== -1 && X.indexOf("Chrome") === -1 && (t === -1 || parseFloat(X.substr(t + 8, 2)) > 3), p = d && parseFloat(X.substr(X.indexOf("Version/") + 8, 2)) < 6, f = X.indexOf("Firefox") !== -1, (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)) && (m = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
                    }(),
                    Q = function(t) {
                        return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    W = function(t) {
                        _gsScope.console && console.log(t)
                    },
                    G = "",
                    Y = "",
                    J = function(t, e) {
                        e = e || B;
                        var i, n, r = e.style;
                        if (void 0 !== r[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
                        return n >= 0 ? (Y = 3 === n ? "ms" : i[n], G = "-" + Y.toLowerCase() + "-", Y + t) : null
                    },
                    Z = F.defaultView ? F.defaultView.getComputedStyle : function() {},
                    K = o.getStyle = function(t, e, i, n, r) {
                        var s;
                        return V || "opacity" !== e ? (!n && t.style[e] ? s = t.style[e] : (i = i || Z(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(C, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : Q(t)
                    },
                    tt = U.convertToPixels = function(t, i, n, r, s) {
                        if ("px" === r || !r && "lineHeight" !== i) return n;
                        if ("auto" === r || !n) return 0;
                        var a, l, h, c = j.test(i),
                            u = t,
                            d = B.style,
                            f = n < 0,
                            p = 1 === n;
                        if (f && (n = -n), p && (n *= 100), "lineHeight" !== i || r)
                            if ("%" === r && i.indexOf("border") !== -1) a = n / 100 * (c ? t.clientWidth : t.clientHeight);
                            else {
                                if (d.cssText = "border:0 solid red;position:" + K(t, "position") + ";line-height:0;", "%" !== r && u.appendChild && "v" !== r.charAt(0) && "rem" !== r) d[c ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                                else {
                                    if (u = t.parentNode || F.body, K(u, "display").indexOf("flex") !== -1 && (d.position = "absolute"), l = u._gsCache, h = e.ticker.frame, l && c && l.time === h) return l.width * n / 100;
                                    d[c ? "width" : "height"] = n + r
                                }
                                u.appendChild(B), a = parseFloat(B[c ? "offsetWidth" : "offsetHeight"]), u.removeChild(B), c && "%" === r && o.cacheWidths !== !1 && (l = u._gsCache = u._gsCache || {}, l.time = h, l.width = a / n * 100), 0 !== a || s || (a = tt(t, i, n, r, !0))
                            } else l = Z(t).lineHeight, t.style.lineHeight = n, a = parseFloat(Z(t).lineHeight), t.style.lineHeight = l;
                        return p && (a /= 100), f ? -a : a
                    },
                    et = U.calculateOffset = function(t, e, i) {
                        if ("absolute" !== K(t, "position", i)) return 0;
                        var n = "left" === e ? "Left" : "Top",
                            r = K(t, "margin" + n, i);
                        return t["offset" + n] - (tt(t, e, parseFloat(r), r.replace(x, "")) || 0)
                    },
                    it = function(t, e) {
                        var i, n, r, s = {};
                        if (e = e || Z(t, null))
                            if (i = e.length)
                                for (; --i > -1;) r = e[i], r.indexOf("-transform") !== -1 && At !== r || (s[r.replace(E, R)] = e.getPropertyValue(r));
                            else
                                for (i in e) i.indexOf("Transform") !== -1 && Et !== i || (s[i] = e[i]);
                        else if (e = t.currentStyle || t.style)
                            for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(E, R)] = e[i]);
                        return V || (s.opacity = Q(t)), n = Ht(t, e, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, jt && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
                    },
                    nt = function(t, e, i, n, r) {
                        var s, o, a, l = {},
                            h = t.style;
                        for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || r && r[o]) && o.indexOf("Origin") === -1 && ("number" != typeof s && "string" != typeof s || (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(w, "") ? s : 0 : et(t, o), void 0 !== h[o] && (a = new vt(h, o, h[o], a))));
                        if (n)
                            for (o in n) "className" !== o && (l[o] = n[o]);
                        return {
                            difs: l,
                            firstMPT: a
                        }
                    },
                    rt = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    st = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    ot = function(t, e, i) {
                        if ("svg" === (t.nodeName + "").toLowerCase()) return (i || Z(t))[e] || 0;
                        if (t.getCTM && Ft(t)) return t.getBBox()[e] || 0;
                        var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            r = rt[e],
                            s = r.length;
                        for (i = i || Z(t, null); --s > -1;) n -= parseFloat(K(t, "padding" + r[s], i, !0)) || 0, n -= parseFloat(K(t, "border" + r[s] + "Width", i, !0)) || 0;
                        return n
                    },
                    at = function(t, e) {
                        if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                        null != t && "" !== t || (t = "0 0");
                        var i, n = t.split(" "),
                            r = t.indexOf("left") !== -1 ? "0%" : t.indexOf("right") !== -1 ? "100%" : n[0],
                            s = t.indexOf("top") !== -1 ? "0%" : t.indexOf("bottom") !== -1 ? "100%" : n[1];
                        if (n.length > 3 && !e) {
                            for (n = t.split(", ").join(",").split(","), t = [], i = 0; i < n.length; i++) t.push(at(n[i]));
                            return t.join(",")
                        }
                        return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && (r + "").indexOf("=") === -1) && (r = "50%"), t = r + " " + s + (n.length > 2 ? " " + n[2] : ""), e && (e.oxp = r.indexOf("%") !== -1, e.oyp = s.indexOf("%") !== -1, e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(r.replace(w, "")), e.oy = parseFloat(s.replace(w, "")), e.v = t), e || t
                    },
                    lt = function(t, e) {
                        return "function" == typeof t && (t = t(_, g)), "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
                    },
                    ht = function(t, e) {
                        return "function" == typeof t && (t = t(_, g)), null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
                    },
                    ct = function(t, e, i, n) {
                        var r, s, o, a, l, h = 1e-6;
                        return "function" == typeof t && (t = t(_, g)), null == t ? a = e : "number" == typeof t ? a = t : (r = 360, s = t.split("_"), l = "=" === t.charAt(1), o = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (t.indexOf("rad") === -1 ? 1 : N) - (l ? 0 : e), s.length && (n && (n[i] = e + o), t.indexOf("short") !== -1 && (o %= r, o !== o % (r / 2) && (o = o < 0 ? o + r : o - r)), t.indexOf("_cw") !== -1 && o < 0 ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : t.indexOf("ccw") !== -1 && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), a = e + o), a < h && a > -h && (a = 0), a
                    },
                    ut = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    dt = function(t, e, i) {
                        return t = t < 0 ? t + 1 : t > 1 ? t - 1 : t, 255 * (6 * t < 1 ? e + (i - e) * t * 6 : t < .5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                    },
                    ft = o.parseColor = function(t, e) {
                        var i, n, r, s, o, a, l, h, c, u, d;
                        if (t)
                            if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t];
                            else {
                                if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ut[t]) i = ut[t];
                                else if ("#" === t.charAt(0)) 4 === t.length && (n = t.charAt(1), r = t.charAt(2), s = t.charAt(3), t = "#" + n + n + r + r + s + s), t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & 255, 255 & t];
                                else if ("hsl" === t.substr(0, 3))
                                    if (i = d = t.match(v), e) {
                                        if (t.indexOf("=") !== -1) return t.match(y)
                                    } else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, l = Number(i[2]) / 100, r = l <= .5 ? l * (a + 1) : l + a - l * a, n = 2 * l - r, i.length > 3 && (i[3] = Number(t[3])), i[0] = dt(o + 1 / 3, n, r), i[1] = dt(o, n, r), i[2] = dt(o - 1 / 3, n, r);
                                else i = t.match(v) || ut.transparent;
                                i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                            } else i = ut.black;
                        return e && !d && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, h = Math.max(n, r, s), c = Math.min(n, r, s), l = (h + c) / 2, h === c ? o = a = 0 : (u = h - c, a = l > .5 ? u / (2 - h - c) : u / (h + c), o = h === n ? (r - s) / u + (r < s ? 6 : 0) : h === r ? (s - n) / u + 2 : (n - r) / u + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i
                    },
                    pt = function(t, e) {
                        var i, n, r, s = t.match(mt) || [],
                            o = 0,
                            a = "";
                        if (!s.length) return t;
                        for (i = 0; i < s.length; i++) n = s[i], r = t.substr(o, t.indexOf(n, o) - o), o += r.length + n.length, n = ft(n, e), 3 === n.length && n.push(1), a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                        return a + t.substr(o)
                    },
                    mt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                for (h in ut) mt += "|" + h + "\\b";
                mt = new RegExp(mt + ")", "gi"), o.colorStringFilter = function(t) {
                    var e, i = t[0] + " " + t[1];
                    mt.test(i) && (e = i.indexOf("hsl(") !== -1 || i.indexOf("hsla(") !== -1, t[0] = pt(t[0], e), t[1] = pt(t[1], e)), mt.lastIndex = 0
                }, e.defaultStringFilter || (e.defaultStringFilter = o.colorStringFilter);
                var gt = function(t, e, i, n) {
                        if (null == t) return function(t) {
                            return t
                        };
                        var r, s = e ? (t.match(mt) || [""])[0] : "",
                            o = t.split(s).join("").match(b) || [],
                            a = t.substr(0, t.indexOf(o[0])),
                            l = ")" === t.charAt(t.length - 1) ? ")" : "",
                            h = t.indexOf(" ") !== -1 ? " " : ",",
                            c = o.length,
                            u = c > 0 ? o[0].replace(v, "") : "";
                        return c ? r = e ? function(t) {
                            var e, d, f, p;
                            if ("number" == typeof t) t += u;
                            else if (n && I.test(t)) {
                                for (p = t.replace(I, "|").split("|"), f = 0; f < p.length; f++) p[f] = r(p[f]);
                                return p.join(",")
                            }
                            if (e = (t.match(mt) || [s])[0], d = t.split(e).join("").match(b) || [], f = d.length, c > f--)
                                for (; ++f < c;) d[f] = i ? d[(f - 1) / 2 | 0] : o[f];
                            return a + d.join(h) + h + e + l + (t.indexOf("inset") !== -1 ? " inset" : "")
                        } : function(t) {
                            var e, s, d;
                            if ("number" == typeof t) t += u;
                            else if (n && I.test(t)) {
                                for (s = t.replace(I, "|").split("|"), d = 0; d < s.length; d++) s[d] = r(s[d]);
                                return s.join(",")
                            }
                            if (e = t.match(b) || [], d = e.length, c > d--)
                                for (; ++d < c;) e[d] = i ? e[(d - 1) / 2 | 0] : o[d];
                            return a + e.join(h) + l
                        } : function(t) {
                            return t
                        }
                    },
                    _t = function(t) {
                        return t = t.split(","),
                            function(e, i, n, r, s, o, a) {
                                var l, h = (i + "").split(" ");
                                for (a = {}, l = 0; l < 4; l++) a[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                                return r.parse(e, a, s, o)
                            }
                    },
                    vt = (U._setPluginRatio = function(t) {
                        this.plugin.setRatio(t);
                        for (var e, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT, h = 1e-6; l;) e = a[l.v], l.r ? e = Math.round(e) : e < h && e > -h && (e = 0), l.t[l.p] = e, l = l._next;
                        if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(a.rotation, this.t) : a.rotation), 1 === t || 0 === t)
                            for (l = o.firstMPT, s = 1 === t ? "e" : "b"; l;) {
                                if (i = l.t, i.type) {
                                    if (1 === i.type) {
                                        for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                        i[s] = r
                                    }
                                } else i[s] = i.s + i.xs0;
                                l = l._next
                            }
                    }, function(t, e, i, n, r) {
                        this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                    }),
                    yt = (U._parseToProxy = function(t, e, i, n, r, s) {
                        var o, a, l, h, c, u = n,
                            d = {},
                            f = {},
                            p = i._transform,
                            m = q;
                        for (i._transform = null, q = e, n = c = i.parse(t, e, n, r), q = m, s && (i._transform = p, u && (u._prev = null, u._prev && (u._prev._next = null))); n && n !== u;) {
                            if (n.type <= 1 && (a = n.p, f[a] = n.s + n.c, d[a] = n.s, s || (h = new vt(n, "s", a, h, n.r), n.c = 0), 1 === n.type))
                                for (o = n.l; --o > 0;) l = "xn" + o, a = n.p + "_" + l, f[a] = n.data[l], d[a] = n[l], s || (h = new vt(n, l, a, h, n.rxp[l]));
                            n = n._next
                        }
                        return {
                            proxy: d,
                            end: f,
                            firstMPT: h,
                            pt: c
                        }
                    }, U.CSSPropTween = function(t, e, n, r, o, a, l, h, c, u, d) {
                        this.t = t, this.p = e, this.s = n, this.c = r, this.n = l || e, t instanceof yt || s.push(this.n), this.r = h, this.type = a || 0, c && (this.pr = c, i = !0), this.b = void 0 === u ? n : u, this.e = void 0 === d ? n + r : d, o && (this._next = o, o._prev = this)
                    }),
                    bt = function(t, e, i, n, r, s) {
                        var o = new yt(t, e, i, n - i, r, -1, s);
                        return o.b = i, o.e = o.xs0 = n, o
                    },
                    wt = o.parseComplex = function(t, e, i, n, r, s, a, l, h, u) {
                        i = i || s || "", "function" == typeof n && (n = n(_, g)), a = new yt(t, e, 0, 0, a, u ? 2 : 1, null, !1, l, i, n), n += "", r && mt.test(n + i) && (n = [i, n], o.colorStringFilter(n), i = n[0], n = n[1]);
                        var d, f, p, m, b, w, x, T, S, P, k, C, E, A = i.split(", ").join(",").split(" "),
                            R = n.split(", ").join(",").split(" "),
                            j = A.length,
                            O = c !== !1;
                        for (n.indexOf(",") === -1 && i.indexOf(",") === -1 || (A = A.join(" ").replace(I, ", ").split(" "), R = R.join(" ").replace(I, ", ").split(" "), j = A.length), j !== R.length && (A = (s || "").split(" "), j = A.length), a.plugin = h, a.setRatio = u, mt.lastIndex = 0, d = 0; d < j; d++)
                            if (m = A[d], b = R[d], T = parseFloat(m), T || 0 === T) a.appendXtra("", T, lt(b, T), b.replace(y, ""), O && b.indexOf("px") !== -1, !0);
                            else if (r && mt.test(m)) C = b.indexOf(")") + 1, C = ")" + (C ? b.substr(C) : ""), E = b.indexOf("hsl") !== -1 && V, P = b, m = ft(m, E), b = ft(b, E), S = m.length + b.length > 6, S && !V && 0 === b[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(R[d]).join("transparent")) : (V || (S = !1), E ? a.appendXtra(P.substr(0, P.indexOf("hsl")) + (S ? "hsla(" : "hsl("), m[0], lt(b[0], m[0]), ",", !1, !0).appendXtra("", m[1], lt(b[1], m[1]), "%,", !1).appendXtra("", m[2], lt(b[2], m[2]), S ? "%," : "%" + C, !1) : a.appendXtra(P.substr(0, P.indexOf("rgb")) + (S ? "rgba(" : "rgb("), m[0], b[0] - m[0], ",", !0, !0).appendXtra("", m[1], b[1] - m[1], ",", !0).appendXtra("", m[2], b[2] - m[2], S ? "," : C, !0), S && (m = m.length < 4 ? 1 : m[3], a.appendXtra("", m, (b.length < 4 ? 1 : b[3]) - m, C, !1))), mt.lastIndex = 0;
                        else if (w = m.match(v)) {
                            if (x = b.match(y), !x || x.length !== w.length) return a;
                            for (p = 0, f = 0; f < w.length; f++) k = w[f], P = m.indexOf(k, p), a.appendXtra(m.substr(p, P - p), Number(k), lt(x[f], k), "", O && "px" === m.substr(P + k.length, 2), 0 === f), p = P + k.length;
                            a["xs" + a.l] += m.substr(p)
                        } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + b : b;
                        if (n.indexOf("=") !== -1 && a.data) {
                            for (C = a.xs0 + a.data.s, d = 1; d < a.l; d++) C += a["xs" + d] + a.data["xn" + d];
                            a.e = C + a["xs" + d]
                        }
                        return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                    },
                    xt = 9;
                for (h = yt.prototype, h.l = h.pr = 0; --xt > 0;) h["xn" + xt] = 0, h["xs" + xt] = "";
                h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, n, r, s) {
                    var o = this,
                        a = o.l;
                    return o["xs" + a] += s && (a || o["xs" + a]) ? " " + t : t || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = e + i, o.rxp["xn" + a] = r, o["xn" + a] = e, o.plugin || (o.xfirst = new yt(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                        s: e + i
                    }, o.rxp = {}, o.s = e, o.c = i, o.r = r, o)) : (o["xs" + a] += e + (n || ""), o)
                };
                var Tt = function(t, e) {
                        e = e || {}, this.p = e.prefix ? J(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || gt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                    },
                    St = U._registerComplexSpecialProp = function(t, e, i) {
                        "object" != typeof e && (e = {
                            parser: i
                        });
                        var n, r, s = t.split(","),
                            o = e.defaultValue;
                        for (i = i || [o], n = 0; n < s.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || o, r = new Tt(s[n], e)
                    },
                    Pt = U._registerPluginProp = function(t) {
                        if (!l[t]) {
                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                            St(t, {
                                parser: function(t, i, n, r, s, o, h) {
                                    var c = a.com.greensock.plugins[e];
                                    return c ? (c._cssRegister(), l[n].parse(t, i, n, r, s, o, h)) : (W("Error: " + e + " js file not loaded."), s)
                                }
                            })
                        }
                    };
                h = Tt.prototype, h.parseComplex = function(t, e, i, n, r, s) {
                    var o, a, l, h, c, u, d = this.keyword;
                    if (this.multi && (I.test(i) || I.test(e) ? (a = e.replace(I, "|").split("|"), l = i.replace(I, "|").split("|")) : d && (a = [e], l = [i])), l) {
                        for (h = l.length > a.length ? l.length : a.length, o = 0; o < h; o++) e = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, d && (c = e.indexOf(d), u = i.indexOf(d), c !== u && (u === -1 ? a[o] = a[o].split(d).join("") : c === -1 && (a[o] += " " + d)));
                        e = a.join(", "), i = l.join(", ")
                    }
                    return wt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s)
                }, h.parse = function(t, e, i, n, s, o, a) {
                    return this.parseComplex(t.style, this.format(K(t, this.p, r, !1, this.dflt)), this.format(e), s, o)
                }, o.registerSpecialProp = function(t, e, i) {
                    St(t, {
                        parser: function(t, n, r, s, o, a, l) {
                            var h = new yt(t, r, 0, 0, o, 2, r, !1, i);
                            return h.plugin = a, h.setRatio = e(t, n, s._tween, r), h
                        },
                        priority: i
                    })
                }, o.useSVGTransformAttr = !0;
                var kt, Ct = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    Et = J("transform"),
                    At = G + "transform",
                    Rt = J("transformOrigin"),
                    jt = null !== J("perspective"),
                    Ot = U.Transform = function() {
                        this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = !(o.defaultForce3D === !1 || !jt) && (o.defaultForce3D || "auto")
                    },
                    Lt = _gsScope.SVGElement,
                    It = function(t, e, i) {
                        var n, r = F.createElementNS("http://www.w3.org/2000/svg", t),
                            s = /([a-z])([A-Z])/g;
                        for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                        return e.appendChild(r), r
                    },
                    Dt = F.documentElement || {},
                    Mt = function() {
                        var t, e, i, n = m || /Android/i.test(X) && !_gsScope.chrome;
                        return F.createElementNS && !n && (t = It("svg", Dt), e = It("rect", t, {
                            width: 100,
                            height: 50,
                            x: 100
                        }), i = e.getBoundingClientRect().width, e.style[Rt] = "50% 50%", e.style[Et] = "scaleX(0.5)", n = i === e.getBoundingClientRect().width && !(f && jt), Dt.removeChild(t)), n
                    }(),
                    Nt = function(t, e, i, n, r, s) {
                        var a, l, h, c, u, d, f, p, m, g, _, v, y, b, w = t._gsTransform,
                            x = Bt(t, !0);
                        w && (y = w.xOrigin, b = w.yOrigin), (!n || (a = n.split(" ")).length < 2) && (f = t.getBBox(), 0 === f.x && 0 === f.y && f.width + f.height === 0 && (f = {
                            x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                            y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                            width: 0,
                            height: 0
                        }), e = at(e).split(" "), a = [(e[0].indexOf("%") !== -1 ? parseFloat(e[0]) / 100 * f.width : parseFloat(e[0])) + f.x, (e[1].indexOf("%") !== -1 ? parseFloat(e[1]) / 100 * f.height : parseFloat(e[1])) + f.y]), i.xOrigin = c = parseFloat(a[0]), i.yOrigin = u = parseFloat(a[1]), n && x !== zt && (d = x[0], f = x[1], p = x[2], m = x[3], g = x[4], _ = x[5], v = d * m - f * p, v && (l = c * (m / v) + u * (-p / v) + (p * _ - m * g) / v, h = c * (-f / v) + u * (d / v) - (d * _ - f * g) / v, c = i.xOrigin = a[0] = l, u = i.yOrigin = a[1] = h)), w && (s && (i.xOffset = w.xOffset, i.yOffset = w.yOffset, w = i), r || r !== !1 && o.defaultSmoothOrigin !== !1 ? (l = c - y, h = u - b, w.xOffset += l * x[0] + h * x[2] - l, w.yOffset += l * x[1] + h * x[3] - h) : w.xOffset = w.yOffset = 0), s || t.setAttribute("data-svg-origin", a.join(" "))
                    },
                    qt = function(t) {
                        var e, i = z("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                            n = this.parentNode,
                            r = this.nextSibling,
                            s = this.style.cssText;
                        if (Dt.appendChild(i), i.appendChild(this), this.style.display = "block", t) try {
                            e = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = qt
                        } catch (t) {} else this._originalGetBBox && (e = this._originalGetBBox());
                        return r ? n.insertBefore(this, r) : n.appendChild(this), Dt.removeChild(i), this.style.cssText = s, e
                    },
                    $t = function(t) {
                        try {
                            return t.getBBox()
                        } catch (e) {
                            return qt.call(t, !0)
                        }
                    },
                    Ft = function(t) {
                        return !(!(Lt && t.getCTM && $t(t)) || t.parentNode && !t.ownerSVGElement)
                    },
                    zt = [1, 0, 0, 1, 0, 0],
                    Bt = function(t, e) {
                        var i, n, r, s, o, a, l = t._gsTransform || new Ot,
                            h = 1e5,
                            c = t.style;
                        if (Et ? n = K(t, At, null, !0) : t.currentStyle && (n = t.currentStyle.filter.match(O), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, !Et || !(a = "none" === Z(t).display) && t.parentNode || (a && (s = c.display, c.display = "block"), t.parentNode || (o = 1, Dt.appendChild(t)), n = K(t, At, null, !0), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? c.display = s : a && Qt(c, "display"), o && Dt.removeChild(t)), (l.svg || t.getCTM && Ft(t)) && (i && (c[Et] + "").indexOf("matrix") !== -1 && (n = c[Et], i = 0), r = t.getAttribute("transform"), i && r && (r.indexOf("matrix") !== -1 ? (n = r, i = 0) : r.indexOf("translate") !== -1 && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return zt;
                        for (r = (n || "").match(v) || [], xt = r.length; --xt > -1;) s = Number(r[xt]), r[xt] = (o = s - (s |= 0)) ? (o * h + (o < 0 ? -.5 : .5) | 0) / h + s : s;
                        return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
                    },
                    Ht = U.getTransform = function(t, i, n, r) {
                        if (t._gsTransform && n && !r) return t._gsTransform;
                        var s, a, l, h, c, u, d = n ? t._gsTransform || new Ot : new Ot,
                            f = d.scaleX < 0,
                            p = 2e-5,
                            m = 1e5,
                            g = jt ? parseFloat(K(t, Rt, i, !1, "0 0 0").split(" ")[2]) || d.zOrigin || 0 : 0,
                            _ = parseFloat(o.defaultTransformPerspective) || 0;
                        if (d.svg = !(!t.getCTM || !Ft(t)), d.svg && (Nt(t, K(t, Rt, i, !1, "50% 50%") + "", d, t.getAttribute("data-svg-origin")), kt = o.useSVGTransformAttr || Mt), s = Bt(t), s !== zt) {
                            if (16 === s.length) {
                                var v, y, b, w, x, T = s[0],
                                    S = s[1],
                                    P = s[2],
                                    k = s[3],
                                    C = s[4],
                                    E = s[5],
                                    A = s[6],
                                    R = s[7],
                                    j = s[8],
                                    O = s[9],
                                    L = s[10],
                                    I = s[12],
                                    D = s[13],
                                    M = s[14],
                                    q = s[11],
                                    $ = Math.atan2(A, L);
                                d.zOrigin && (M = -d.zOrigin, I = j * M - s[12], D = O * M - s[13], M = L * M + d.zOrigin - s[14]), d.rotationX = $ * N, $ && (w = Math.cos(-$), x = Math.sin(-$), v = C * w + j * x, y = E * w + O * x, b = A * w + L * x, j = C * -x + j * w, O = E * -x + O * w, L = A * -x + L * w, q = R * -x + q * w, C = v, E = y, A = b), $ = Math.atan2(-P, L), d.rotationY = $ * N, $ && (w = Math.cos(-$), x = Math.sin(-$), v = T * w - j * x, y = S * w - O * x, b = P * w - L * x, O = S * x + O * w, L = P * x + L * w, q = k * x + q * w, T = v, S = y, P = b), $ = Math.atan2(S, T), d.rotation = $ * N, $ && (w = Math.cos($), x = Math.sin($), v = T * w + S * x, y = C * w + E * x, b = j * w + O * x, S = S * w - T * x, E = E * w - C * x, O = O * w - j * x, T = v, C = y, j = b), d.rotationX && Math.abs(d.rotationX) + Math.abs(d.rotation) > 359.9 && (d.rotationX = d.rotation = 0, d.rotationY = 180 - d.rotationY), $ = Math.atan2(C, E), d.scaleX = (Math.sqrt(T * T + S * S + P * P) * m + .5 | 0) / m, d.scaleY = (Math.sqrt(E * E + A * A) * m + .5 | 0) / m, d.scaleZ = (Math.sqrt(j * j + O * O + L * L) * m + .5 | 0) / m, T /= d.scaleX, C /= d.scaleY, S /= d.scaleX, E /= d.scaleY, Math.abs($) > p ? (d.skewX = $ * N, C = 0, "simple" !== d.skewType && (d.scaleY *= 1 / Math.cos($))) : d.skewX = 0, d.perspective = q ? 1 / (q < 0 ? -q : q) : 0, d.x = I, d.y = D, d.z = M, d.svg && (d.x -= d.xOrigin - (d.xOrigin * T - d.yOrigin * C), d.y -= d.yOrigin - (d.yOrigin * S - d.xOrigin * E))
                            } else if (!jt || r || !s.length || d.x !== s[4] || d.y !== s[5] || !d.rotationX && !d.rotationY) {
                                var F = s.length >= 6,
                                    z = F ? s[0] : 1,
                                    B = s[1] || 0,
                                    H = s[2] || 0,
                                    U = F ? s[3] : 1;
                                d.x = s[4] || 0, d.y = s[5] || 0, l = Math.sqrt(z * z + B * B), h = Math.sqrt(U * U + H * H), c = z || B ? Math.atan2(B, z) * N : d.rotation || 0, u = H || U ? Math.atan2(H, U) * N + c : d.skewX || 0, d.scaleX = l, d.scaleY = h, d.rotation = c, d.skewX = u, jt && (d.rotationX = d.rotationY = d.z = 0, d.perspective = _, d.scaleZ = 1), d.svg && (d.x -= d.xOrigin - (d.xOrigin * z + d.yOrigin * H), d.y -= d.yOrigin - (d.xOrigin * B + d.yOrigin * U))
                            }
                            Math.abs(d.skewX) > 90 && Math.abs(d.skewX) < 270 && (f ? (d.scaleX *= -1, d.skewX += d.rotation <= 0 ? 180 : -180, d.rotation += d.rotation <= 0 ? 180 : -180) : (d.scaleY *= -1, d.skewX += d.skewX <= 0 ? 180 : -180)), d.zOrigin = g;
                            for (a in d) d[a] < p && d[a] > -p && (d[a] = 0)
                        }
                        return n && (t._gsTransform = d, d.svg && (kt && t.style[Et] ? e.delayedCall(.001, function() {
                            Qt(t.style, Et)
                        }) : !kt && t.getAttribute("transform") && e.delayedCall(.001, function() {
                            t.removeAttribute("transform")
                        }))), d
                    },
                    Ut = function(t) {
                        var e, i, n = this.data,
                            r = -n.rotation * M,
                            s = r + n.skewX * M,
                            o = 1e5,
                            a = (Math.cos(r) * n.scaleX * o | 0) / o,
                            l = (Math.sin(r) * n.scaleX * o | 0) / o,
                            h = (Math.sin(s) * -n.scaleY * o | 0) / o,
                            c = (Math.cos(s) * n.scaleY * o | 0) / o,
                            u = this.t.style,
                            d = this.t.currentStyle;
                        if (d) {
                            i = l, l = -h, h = -i, e = d.filter, u.filter = "";
                            var f, p, g = this.t.offsetWidth,
                                _ = this.t.offsetHeight,
                                v = "absolute" !== d.position,
                                y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + h + ", M22=" + c,
                                b = n.x + g * n.xPercent / 100,
                                w = n.y + _ * n.yPercent / 100;
                            if (null != n.ox && (f = (n.oxp ? g * n.ox * .01 : n.ox) - g / 2, p = (n.oyp ? _ * n.oy * .01 : n.oy) - _ / 2, b += f - (f * a + p * l), w += p - (f * h + p * c)), v ? (f = g / 2, p = _ / 2, y += ", Dx=" + (f - (f * a + p * l) + b) + ", Dy=" + (p - (f * h + p * c) + w) + ")") : y += ", sizingMethod='auto expand')", e.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1 ? u.filter = e.replace(L, y) : u.filter = y + " " + e, 0 !== t && 1 !== t || 1 === a && 0 === l && 0 === h && 1 === c && (v && y.indexOf("Dx=0, Dy=0") === -1 || T.test(e) && 100 !== parseFloat(RegExp.$1) || e.indexOf(e.indexOf("Alpha")) === -1 && u.removeAttribute("filter")), !v) {
                                var S, P, k, C = m < 8 ? 1 : -1;
                                for (f = n.ieOffsetX || 0, p = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((a < 0 ? -a : a) * g + (l < 0 ? -l : l) * _)) / 2 + b), n.ieOffsetY = Math.round((_ - ((c < 0 ? -c : c) * _ + (h < 0 ? -h : h) * g)) / 2 + w), xt = 0; xt < 4; xt++) P = st[xt], S = d[P], i = S.indexOf("px") !== -1 ? parseFloat(S) : tt(this.t, P, parseFloat(S), S.replace(x, "")) || 0, k = i !== n[P] ? xt < 2 ? -n.ieOffsetX : -n.ieOffsetY : xt < 2 ? f - n.ieOffsetX : p - n.ieOffsetY, u[P] = (n[P] = Math.round(i - k * (0 === xt || 2 === xt ? 1 : C))) + "px"
                            }
                        }
                    },
                    Xt = U.set3DTransformRatio = U.setTransformRatio = function(t) {
                        var e, i, n, r, s, o, a, l, h, c, u, d, p, m, g, _, v, y, b, w, x, T, S, P = this.data,
                            k = this.t.style,
                            C = P.rotation,
                            E = P.rotationX,
                            A = P.rotationY,
                            R = P.scaleX,
                            j = P.scaleY,
                            O = P.scaleZ,
                            L = P.x,
                            I = P.y,
                            D = P.z,
                            N = P.svg,
                            q = P.perspective,
                            $ = P.force3D,
                            F = P.skewY,
                            z = P.skewX;
                        if (F && (z += F, C += F), ((1 === t || 0 === t) && "auto" === $ && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !$) && !D && !q && !A && !E && 1 === O || kt && N || !jt) return void(C || z || N ? (C *= M, T = z * M, S = 1e5, i = Math.cos(C) * R, s = Math.sin(C) * R, n = Math.sin(C - T) * -j, o = Math.cos(C - T) * j, T && "simple" === P.skewType && (e = Math.tan(T - F * M), e = Math.sqrt(1 + e * e), n *= e, o *= e, F && (e = Math.tan(F * M), e = Math.sqrt(1 + e * e), i *= e, s *= e)), N && (L += P.xOrigin - (P.xOrigin * i + P.yOrigin * n) + P.xOffset, I += P.yOrigin - (P.xOrigin * s + P.yOrigin * o) + P.yOffset, kt && (P.xPercent || P.yPercent) && (g = this.t.getBBox(), L += .01 * P.xPercent * g.width, I += .01 * P.yPercent * g.height), g = 1e-6, L < g && L > -g && (L = 0), I < g && I > -g && (I = 0)), b = (i * S | 0) / S + "," + (s * S | 0) / S + "," + (n * S | 0) / S + "," + (o * S | 0) / S + "," + L + "," + I + ")", N && kt ? this.t.setAttribute("transform", "matrix(" + b) : k[Et] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix(" : "matrix(") + b) : k[Et] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix(" : "matrix(") + R + ",0,0," + j + "," + L + "," + I + ")");
                        if (f && (g = 1e-4, R < g && R > -g && (R = O = 2e-5), j < g && j > -g && (j = O = 2e-5), !q || P.z || P.rotationX || P.rotationY || (q = 0)), C || z) C *= M, _ = i = Math.cos(C), v = s = Math.sin(C), z && (C -= z * M, _ = Math.cos(C), v = Math.sin(C), "simple" === P.skewType && (e = Math.tan((z - F) * M), e = Math.sqrt(1 + e * e), _ *= e, v *= e, P.skewY && (e = Math.tan(F * M), e = Math.sqrt(1 + e * e), i *= e, s *= e))), n = -v, o = _;
                        else {
                            if (!(A || E || 1 !== O || q || N)) return void(k[Et] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) translate3d(" : "translate3d(") + L + "px," + I + "px," + D + "px)" + (1 !== R || 1 !== j ? " scale(" + R + "," + j + ")" : ""));
                            i = o = 1, n = s = 0
                        }
                        c = 1, r = a = l = h = u = d = 0, p = q ? -1 / q : 0, m = P.zOrigin, g = 1e-6, w = ",", x = "0", C = A * M, C && (_ = Math.cos(C), v = Math.sin(C), l = -v, u = p * -v, r = i * v, a = s * v, c = _, p *= _, i *= _, s *= _), C = E * M, C && (_ = Math.cos(C), v = Math.sin(C), e = n * _ + r * v, y = o * _ + a * v, h = c * v, d = p * v, r = n * -v + r * _, a = o * -v + a * _, c *= _, p *= _, n = e, o = y), 1 !== O && (r *= O, a *= O, c *= O, p *= O), 1 !== j && (n *= j, o *= j, h *= j, d *= j), 1 !== R && (i *= R, s *= R, l *= R, u *= R), (m || N) && (m && (L += r * -m, I += a * -m, D += c * -m + m), N && (L += P.xOrigin - (P.xOrigin * i + P.yOrigin * n) + P.xOffset, I += P.yOrigin - (P.xOrigin * s + P.yOrigin * o) + P.yOffset), L < g && L > -g && (L = x), I < g && I > -g && (I = x), D < g && D > -g && (D = 0)), b = P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix3d(" : "matrix3d(", b += (i < g && i > -g ? x : i) + w + (s < g && s > -g ? x : s) + w + (l < g && l > -g ? x : l), b += w + (u < g && u > -g ? x : u) + w + (n < g && n > -g ? x : n) + w + (o < g && o > -g ? x : o), E || A || 1 !== O ? (b += w + (h < g && h > -g ? x : h) + w + (d < g && d > -g ? x : d) + w + (r < g && r > -g ? x : r), b += w + (a < g && a > -g ? x : a) + w + (c < g && c > -g ? x : c) + w + (p < g && p > -g ? x : p) + w) : b += ",0,0,0,0,1,0,", b += L + w + I + w + D + w + (q ? 1 + -D / q : 1) + ")", k[Et] = b
                    };
                h = Ot.prototype, h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0, h.scaleX = h.scaleY = h.scaleZ = 1, St("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function(t, e, i, n, s, a, l) {
                        if (n._lastParsedTransform === l) return s;
                        n._lastParsedTransform = l;
                        var h, c = l.scale && "function" == typeof l.scale ? l.scale : 0;
                        "function" == typeof l[i] && (h = l[i], l[i] = e), c && (l.scale = c(_, t));
                        var u, d, f, p, m, v, y, b, w, x = t._gsTransform,
                            T = t.style,
                            S = 1e-6,
                            P = Ct.length,
                            k = l,
                            C = {},
                            E = "transformOrigin",
                            A = Ht(t, r, !0, k.parseTransform),
                            R = k.transform && ("function" == typeof k.transform ? k.transform(_, g) : k.transform);
                        if (A.skewType = k.skewType || A.skewType || o.defaultSkewType, n._transform = A, R && "string" == typeof R && Et) d = B.style, d[Et] = R, d.display = "block", d.position = "absolute", F.body.appendChild(B), u = Ht(B, null, !1), "simple" === A.skewType && (u.scaleY *= Math.cos(u.skewX * M)), A.svg && (v = A.xOrigin, y = A.yOrigin, u.x -= A.xOffset, u.y -= A.yOffset, (k.transformOrigin || k.svgOrigin) && (R = {}, Nt(t, at(k.transformOrigin), R, k.svgOrigin, k.smoothOrigin, !0), v = R.xOrigin, y = R.yOrigin, u.x -= R.xOffset - A.xOffset, u.y -= R.yOffset - A.yOffset), (v || y) && (b = Bt(B, !0), u.x -= v - (v * b[0] + y * b[2]), u.y -= y - (v * b[1] + y * b[3]))), F.body.removeChild(B), u.perspective || (u.perspective = A.perspective), null != k.xPercent && (u.xPercent = ht(k.xPercent, A.xPercent)), null != k.yPercent && (u.yPercent = ht(k.yPercent, A.yPercent));
                        else if ("object" == typeof k) {
                            if (u = {
                                    scaleX: ht(null != k.scaleX ? k.scaleX : k.scale, A.scaleX),
                                    scaleY: ht(null != k.scaleY ? k.scaleY : k.scale, A.scaleY),
                                    scaleZ: ht(k.scaleZ, A.scaleZ),
                                    x: ht(k.x, A.x),
                                    y: ht(k.y, A.y),
                                    z: ht(k.z, A.z),
                                    xPercent: ht(k.xPercent, A.xPercent),
                                    yPercent: ht(k.yPercent, A.yPercent),
                                    perspective: ht(k.transformPerspective, A.perspective)
                                }, m = k.directionalRotation, null != m)
                                if ("object" == typeof m)
                                    for (d in m) k[d] = m[d];
                                else k.rotation = m;
                                "string" == typeof k.x && k.x.indexOf("%") !== -1 && (u.x = 0, u.xPercent = ht(k.x, A.xPercent)), "string" == typeof k.y && k.y.indexOf("%") !== -1 && (u.y = 0, u.yPercent = ht(k.y, A.yPercent)), u.rotation = ct("rotation" in k ? k.rotation : "shortRotation" in k ? k.shortRotation + "_short" : "rotationZ" in k ? k.rotationZ : A.rotation, A.rotation, "rotation", C), jt && (u.rotationX = ct("rotationX" in k ? k.rotationX : "shortRotationX" in k ? k.shortRotationX + "_short" : A.rotationX || 0, A.rotationX, "rotationX", C), u.rotationY = ct("rotationY" in k ? k.rotationY : "shortRotationY" in k ? k.shortRotationY + "_short" : A.rotationY || 0, A.rotationY, "rotationY", C)), u.skewX = ct(k.skewX, A.skewX), u.skewY = ct(k.skewY, A.skewY)
                        }
                        for (jt && null != k.force3D && (A.force3D = k.force3D, p = !0), f = A.force3D || A.z || A.rotationX || A.rotationY || u.z || u.rotationX || u.rotationY || u.perspective, f || null == k.scale || (u.scaleZ = 1); --P > -1;) w = Ct[P], R = u[w] - A[w], (R > S || R < -S || null != k[w] || null != q[w]) && (p = !0, s = new yt(A, w, A[w], R, s), w in C && (s.e = C[w]), s.xs0 = 0, s.plugin = a, n._overwriteProps.push(s.n));
                        return R = k.transformOrigin, A.svg && (R || k.svgOrigin) && (v = A.xOffset, y = A.yOffset, Nt(t, at(R), u, k.svgOrigin, k.smoothOrigin), s = bt(A, "xOrigin", (x ? A : u).xOrigin, u.xOrigin, s, E), s = bt(A, "yOrigin", (x ? A : u).yOrigin, u.yOrigin, s, E), v === A.xOffset && y === A.yOffset || (s = bt(A, "xOffset", x ? v : A.xOffset, A.xOffset, s, E), s = bt(A, "yOffset", x ? y : A.yOffset, A.yOffset, s, E)), R = "0px 0px"), (R || jt && f && A.zOrigin) && (Et ? (p = !0, w = Rt, R = (R || K(t, w, r, !1, "50% 50%")) + "", s = new yt(T, w, 0, 0, s, -1, E), s.b = T[w], s.plugin = a, jt ? (d = A.zOrigin, R = R.split(" "), A.zOrigin = (R.length > 2 && (0 === d || "0px" !== R[2]) ? parseFloat(R[2]) : d) || 0, s.xs0 = s.e = R[0] + " " + (R[1] || "50%") + " 0px", s = new yt(A, "zOrigin", 0, 0, s, -1, s.n), s.b = d, s.xs0 = s.e = A.zOrigin) : s.xs0 = s.e = R) : at(R + "", A)), p && (n._transformType = A.svg && kt || !f && 3 !== this._transformType ? 2 : 3), h && (l[i] = h), c && (l.scale = c), s
                    },
                    prefix: !0
                }), St("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), St("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, s, o, a) {
                        e = this.format(e);
                        var l, h, c, u, d, f, p, m, g, _, v, y, b, w, x, T, S = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            P = t.style;
                        for (g = parseFloat(t.offsetWidth), _ = parseFloat(t.offsetHeight), l = e.split(" "), h = 0; h < S.length; h++) this.p.indexOf("border") && (S[h] = J(S[h])), d = u = K(t, S[h], r, !1, "0px"), d.indexOf(" ") !== -1 && (u = d.split(" "), d = u[0], u = u[1]), f = c = l[h], p = parseFloat(d), y = d.substr((p + "").length), b = "=" === f.charAt(1), b ? (m = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), m *= parseFloat(f), v = f.substr((m + "").length - (m < 0 ? 1 : 0)) || "") : (m = parseFloat(f), v = f.substr((m + "").length)), "" === v && (v = n[i] || y), v !== y && (w = tt(t, "borderLeft", p, y), x = tt(t, "borderTop", p, y), "%" === v ? (d = w / g * 100 + "%", u = x / _ * 100 + "%") : "em" === v ? (T = tt(t, "borderLeft", 1, "em"), d = w / T + "em", u = x / T + "em") : (d = w + "px", u = x + "px"), b && (f = parseFloat(d) + m + v, c = parseFloat(u) + m + v)), o = wt(P, S[h], d + " " + u, f + " " + c, !1, "0px", o);
                        return o
                    },
                    prefix: !0,
                    formatter: gt("0px 0px 0px 0px", !1, !0)
                }), St("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, n, s, o) {
                        return wt(t.style, i, this.format(K(t, i, r, !1, "0px 0px")), this.format(e), !1, "0px", s)
                    },
                    prefix: !0,
                    formatter: gt("0px 0px", !1, !0)
                }), St("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, i, n, s, o) {
                        var a, l, h, c, u, d, f = "background-position",
                            p = r || Z(t, null),
                            g = this.format((p ? m ? p.getPropertyValue(f + "-x") + " " + p.getPropertyValue(f + "-y") : p.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            _ = this.format(e);
                        if (g.indexOf("%") !== -1 != (_.indexOf("%") !== -1) && _.split(",").length < 2 && (d = K(t, "backgroundImage").replace(A, ""), d && "none" !== d)) {
                            for (a = g.split(" "), l = _.split(" "), H.setAttribute("src", d), h = 2; --h > -1;) g = a[h], c = g.indexOf("%") !== -1, c !== (l[h].indexOf("%") !== -1) && (u = 0 === h ? t.offsetWidth - H.width : t.offsetHeight - H.height, a[h] = c ? parseFloat(g) / 100 * u + "px" : parseFloat(g) / u * 100 + "%");
                            g = a.join(" ")
                        }
                        return this.parseComplex(t.style, g, _, s, o)
                    },
                    formatter: at
                }), St("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: function(t) {
                        return t += "", at(t.indexOf(" ") === -1 ? t + " " + t : t)
                    }
                }), St("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), St("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), St("transformStyle", {
                    prefix: !0
                }), St("backfaceVisibility", {
                    prefix: !0
                }), St("userSelect", {
                    prefix: !0
                }), St("margin", {
                    parser: _t("marginTop,marginRight,marginBottom,marginLeft")
                }), St("padding", {
                    parser: _t("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), St("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, i, n, s, o) {
                        var a, l, h;
                        return m < 9 ? (l = t.currentStyle, h = m < 8 ? " " : ",", a = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (a = this.format(K(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, s, o)
                    }
                }), St("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), St("autoRound,strictUnits", {
                    parser: function(t, e, i, n, r) {
                        return r
                    }
                }), St("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, i, n, s, o) {
                        var a = K(t, "borderTopWidth", r, !1, "0px"),
                            l = this.format(e).split(" "),
                            h = l[0].replace(x, "");
                        return "px" !== h && (a = parseFloat(a) / tt(t, "borderTopWidth", 1, h) + h), this.parseComplex(t.style, this.format(a + " " + K(t, "borderTopStyle", r, !1, "solid") + " " + K(t, "borderTopColor", r, !1, "#000")), l.join(" "), s, o)
                    },
                    color: !0,
                    formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(mt) || ["#000"])[0]
                    }
                }), St("borderWidth", {
                    parser: _t("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), St("float,cssFloat,styleFloat", {
                    parser: function(t, e, i, n, r, s) {
                        var o = t.style,
                            a = "cssFloat" in o ? "cssFloat" : "styleFloat";
                        return new yt(o, a, 0, 0, r, -1, i, !1, 0, o[a], e)
                    }
                });
                var Vt = function(t) {
                    var e, i = this.t,
                        n = i.filter || K(this.data, "filter") || "",
                        r = this.s + this.c * t | 0;
                    100 === r && (n.indexOf("atrix(") === -1 && n.indexOf("radient(") === -1 && n.indexOf("oader(") === -1 ? (i.removeAttribute("filter"), e = !K(this.data, "filter")) : (i.filter = n.replace(P, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), n.indexOf("pacity") === -1 ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(T, "opacity=" + r))
                };
                St("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(t, e, i, n, s, o) {
                        var a = parseFloat(K(t, "opacity", r, !1, "1")),
                            l = t.style,
                            h = "autoAlpha" === i;
                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), h && 1 === a && "hidden" === K(t, "visibility", r) && 0 !== e && (a = 0), V ? s = new yt(l, "opacity", a, e - a, s) : (s = new yt(l, "opacity", 100 * a, 100 * (e - a), s), s.xn1 = h ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = t, s.plugin = o, s.setRatio = Vt), h && (s = new yt(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
                    }
                });
                var Qt = function(t, e) {
                        e && (t.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e),
                            t.removeProperty(e.replace(C, "-$1").toLowerCase())) : t.removeAttribute(e))
                    },
                    Wt = function(t) {
                        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                            this.t.setAttribute("class", 0 === t ? this.b : this.e);
                            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Qt(i, e.p), e = e._next;
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                St("className", {
                    parser: function(t, e, n, s, o, a, l) {
                        var h, c, u, d, f, p = t.getAttribute("class") || "",
                            m = t.style.cssText;
                        if (o = s._classNamePT = new yt(t, n, 0, 0, o, 2), o.setRatio = Wt, o.pr = -11, i = !0, o.b = p, c = it(t, r), u = t._gsClassPT) {
                            for (d = {}, f = u.data; f;) d[f.p] = 1, f = f._next;
                            u.setRatio(1)
                        }
                        return t._gsClassPT = o, o.e = "=" !== e.charAt(1) ? e : p.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", o.e), h = nt(t, c, it(t), l, d), t.setAttribute("class", p), o.data = h.firstMPT, t.style.cssText = m, o = o.xfirst = s.parse(t, h.difs, o, a)
                    }
                });
                var Gt = function(t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var e, i, n, r, s, o = this.t.style,
                            a = l.transform.parse;
                        if ("all" === this.e) o.cssText = "", r = !0;
                        else
                            for (e = this.e.split(" ").join("").split(","), n = e.length; --n > -1;) i = e[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Rt : l[i].p), Qt(o, i);
                        r && (Qt(o, Et), s = this.t._gsTransform, s && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                    }
                };
                for (St("clearProps", {
                        parser: function(t, e, n, r, s) {
                            return s = new yt(t, n, 0, 0, s, 2), s.setRatio = Gt, s.e = e, s.pr = -10, s.data = r._tween, i = !0, s
                        }
                    }), h = "bezier,throwProps,physicsProps,physics2D".split(","), xt = h.length; xt--;) Pt(h[xt]);
                h = o.prototype, h._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function(t, e, a, h) {
                    if (!t.nodeType) return !1;
                    this._target = g = t, this._tween = a, this._vars = e, _ = h, c = e.autoRound, i = !1, n = e.suffixMap || o.suffixMap, r = Z(t, ""), s = this._overwriteProps;
                    var f, m, v, y, b, w, x, T, P, k = t.style;
                    if (u && "" === k.zIndex && (f = K(t, "zIndex", r), "auto" !== f && "" !== f || this._addLazySet(k, "zIndex", 0)), "string" == typeof e && (y = k.cssText, f = it(t, r), k.cssText = y + ";" + e, f = nt(t, f, it(t)).difs, !V && S.test(e) && (f.opacity = parseFloat(RegExp.$1)), e = f, k.cssText = y), e.className ? this._firstPT = m = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = m = this.parse(t, e, null), this._transformType) {
                        for (P = 3 === this._transformType, Et ? d && (u = !0, "" === k.zIndex && (x = K(t, "zIndex", r), "auto" !== x && "" !== x || this._addLazySet(k, "zIndex", 0)), p && this._addLazySet(k, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (P ? "visible" : "hidden"))) : k.zoom = 1, v = m; v && v._next;) v = v._next;
                        T = new yt(t, "transform", 0, 0, null, 2), this._linkCSSP(T, null, v), T.setRatio = Et ? Xt : Ut, T.data = this._transform || Ht(t, r, !0), T.tween = a, T.pr = -1, s.pop()
                    }
                    if (i) {
                        for (; m;) {
                            for (w = m._next, v = y; v && v.pr > m.pr;) v = v._next;
                            (m._prev = v ? v._prev : b) ? m._prev._next = m: y = m, (m._next = v) ? v._prev = m : b = m, m = w
                        }
                        this._firstPT = y
                    }
                    return !0
                }, h.parse = function(t, e, i, s) {
                    var o, a, h, u, d, f, p, m, v, y, b = t.style;
                    for (o in e) {
                        if (f = e[o], "function" == typeof f && (f = f(_, g)), a = l[o]) i = a.parse(t, f, o, this, i, s, e);
                        else {
                            if ("--" === o.substr(0, 2)) {
                                this._tween._propLookup[o] = this._addTween.call(this._tween, t.style, "setProperty", Z(t).getPropertyValue(o) + "", f + "", o, !1, o);
                                continue
                            }
                            d = K(t, o, r) + "", v = "string" == typeof f, "color" === o || "fill" === o || "stroke" === o || o.indexOf("Color") !== -1 || v && k.test(f) ? (v || (f = ft(f), f = (f.length > 3 ? "rgba(" : "rgb(") + f.join(",") + ")"), i = wt(b, o, d, f, !0, "transparent", i, 0, s)) : v && D.test(f) ? i = wt(b, o, d, f, !0, null, i, 0, s) : (h = parseFloat(d), p = h || 0 === h ? d.substr((h + "").length) : "", "" !== d && "auto" !== d || ("width" === o || "height" === o ? (h = ot(t, o, r), p = "px") : "left" === o || "top" === o ? (h = et(t, o, r), p = "px") : (h = "opacity" !== o ? 0 : 1, p = "")), y = v && "=" === f.charAt(1), y ? (u = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), u *= parseFloat(f), m = f.replace(x, "")) : (u = parseFloat(f), m = v ? f.replace(x, "") : ""), "" === m && (m = o in n ? n[o] : p), f = u || 0 === u ? (y ? u + h : u) + m : e[o], p !== m && ("" === m && "lineHeight" !== o || (u || 0 === u) && h && (h = tt(t, o, h, p), "%" === m ? (h /= tt(t, o, 100, "%") / 100, e.strictUnits !== !0 && (d = h + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? h /= tt(t, o, 1, m) : "px" !== m && (u = tt(t, o, u, m), m = "px"), y && (u || 0 === u) && (f = u + h + m))), y && (u += h), !h && 0 !== h || !u && 0 !== u ? void 0 !== b[o] && (f || f + "" != "NaN" && null != f) ? (i = new yt(b, o, u || h || 0, 0, i, -1, o, !1, 0, d, f), i.xs0 = "none" !== f || "display" !== o && o.indexOf("Style") === -1 ? f : d) : W("invalid " + o + " tween value: " + e[o]) : (i = new yt(b, o, h, u - h, i, 0, o, c !== !1 && ("px" === m || "zIndex" === o), 0, d, f), i.xs0 = m))
                        }
                        s && i && !i.plugin && (i.plugin = s)
                    }
                    return i
                }, h.setRatio = function(t) {
                    var e, i, n, r = this._firstPT,
                        s = 1e-6;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; r;) {
                                if (e = r.c * t + r.s, r.r ? e = Math.round(e) : e < s && e > -s && (e = 0), r.type)
                                    if (1 === r.type)
                                        if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                        else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                    r.t[r.p] = i
                                } else r.type === -1 ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                                else r.t[r.p] = e + r.xs0;
                                r = r._next
                            } else
                                for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                        else
                            for (; r;) {
                                if (2 !== r.type)
                                    if (r.r && r.type !== -1)
                                        if (e = Math.round(r.s + r.c), r.type) {
                                            if (1 === r.type) {
                                                for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                                r.t[r.p] = i
                                            }
                                        } else r.t[r.p] = e + r.xs0;
                                else r.t[r.p] = r.e;
                                else r.setRatio(t);
                                r = r._next
                            }
                }, h._enableTransforms = function(t) {
                    this._transform = this._transform || Ht(this._target, r, !0), this._transformType = this._transform.svg && kt || !t && 3 !== this._transformType ? 2 : 3
                };
                var Yt = function(t) {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                h._addLazySet = function(t, e, i) {
                    var n = this._firstPT = new yt(t, e, 0, 0, this._firstPT, 2);
                    n.e = i, n.setRatio = Yt, n.data = this
                }, h._linkCSSP = function(t, e, i, n) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                }, h._mod = function(t) {
                    for (var e = this._firstPT; e;) "function" == typeof t[e.p] && t[e.p] === Math.round && (e.r = 1), e = e._next
                }, h._kill = function(e) {
                    var i, n, r, s = e;
                    if (e.autoAlpha || e.alpha) {
                        s = {};
                        for (n in e) s[n] = e[n];
                        s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                    }
                    for (e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(e), n = i.plugin), i = i._next;
                    return t.prototype._kill.call(this, s)
                };
                var Jt = function(t, e, i) {
                    var n, r, s, o;
                    if (t.slice)
                        for (r = t.length; --r > -1;) Jt(t[r], e, i);
                    else
                        for (n = t.childNodes, r = n.length; --r > -1;) s = n[r], o = s.type, s.style && (e.push(it(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Jt(s, e, i)
                };
                return o.cascadeTo = function(t, i, n) {
                    var r, s, o, a, l = e.to(t, i, n),
                        h = [l],
                        c = [],
                        u = [],
                        d = [],
                        f = e._internals.reservedProps;
                    for (t = l._targets || l.target, Jt(t, c, d), l.render(i, !0, !0), Jt(t, u), l.render(0, !0, !0), l._enabled(!0), r = d.length; --r > -1;)
                        if (s = nt(d[r], c[r], u[r]), s.firstMPT) {
                            s = s.difs;
                            for (o in n) f[o] && (s[o] = n[o]);
                            a = {};
                            for (o in s) a[o] = c[r][o];
                            h.push(e.fromTo(d[r], i, a, s))
                        }
                    return h
                }, t.activate([o]), o
            }, !0),
            function() {
                var t = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        version: "1.6.0",
                        priority: -1,
                        API: 2,
                        init: function(t, e, i) {
                            return this._tween = i, !0
                        }
                    }),
                    e = function(t) {
                        for (; t;) t.f || t.blob || (t.m = Math.round), t = t._next
                    },
                    i = t.prototype;
                i._onInitAllProps = function() {
                    for (var t, i, n, r = this._tween, s = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","), o = s.length, a = {}, l = r._propLookup.roundProps; --o > -1;) a[s[o]] = Math.round;
                    for (o = s.length; --o > -1;)
                        for (t = s[o], i = r._firstPT; i;) n = i._next, i.pg ? i.t._mod(a) : i.n === t && (2 === i.f && i.t ? e(i.t._firstPT) : (this._add(i.t, t, i.s, i.c), n && (n._prev = i._prev), i._prev ? i._prev._next = n : r._firstPT === i && (r._firstPT = n), i._next = i._prev = null, r._propLookup[t] = l)), i = n;
                    return !1
                }, i._add = function(t, e, i, n) {
                    this._addTween(t, e, i, i + n, e, Math.round), this._overwriteProps.push(e)
                }
            }(),
            function() {
                _gsScope._gsDefine.plugin({
                    propName: "attr",
                    API: 2,
                    version: "0.6.1",
                    init: function(t, e, i, n) {
                        var r, s;
                        if ("function" != typeof t.setAttribute) return !1;
                        for (r in e) s = e[r], "function" == typeof s && (s = s(n, t)), this._addTween(t, "setAttribute", t.getAttribute(r) + "", s + "", r, !1, r), this._overwriteProps.push(r);
                        return !0
                    }
                })
            }(), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.3.1",
                API: 2,
                init: function(t, e, i, n) {
                    "object" != typeof e && (e = {
                        rotation: e
                    }), this.finals = {};
                    var r, s, o, a, l, h, c = e.useRadians === !0 ? 2 * Math.PI : 360,
                        u = 1e-6;
                    for (r in e) "useRadians" !== r && (a = e[r], "function" == typeof a && (a = a(n, t)), h = (a + "").split("_"), s = h[0], o = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), a = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? o + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, l = a - o, h.length && (s = h.join("_"), s.indexOf("short") !== -1 && (l %= c, l !== l % (c / 2) && (l = l < 0 ? l + c : l - c)), s.indexOf("_cw") !== -1 && l < 0 ? l = (l + 9999999999 * c) % c - (l / c | 0) * c : s.indexOf("ccw") !== -1 && l > 0 && (l = (l - 9999999999 * c) % c - (l / c | 0) * c)), (l > u || l < -u) && (this._addTween(t, r, o, o + l, r), this._overwriteProps.push(r)));
                    return !0
                },
                set: function(t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t);
                    else
                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                var e, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
                    s = r.com.greensock,
                    o = 2 * Math.PI,
                    a = Math.PI / 2,
                    l = s._class,
                    h = function(e, i) {
                        var n = l("easing." + e, function() {}, !0),
                            r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, n
                    },
                    c = t.register || function() {},
                    u = function(t, e, i, n, r) {
                        var s = l("easing." + t, {
                            easeOut: new e,
                            easeIn: new i,
                            easeInOut: new n
                        }, !0);
                        return c(s, t), s
                    },
                    d = function(t, e, i) {
                        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                    },
                    f = function(e, i) {
                        var n = l("easing." + e, function(t) {
                                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, r.config = function(t) {
                            return new n(t)
                        }, n
                    },
                    p = u("Back", f("BackOut", function(t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                    }), f("BackIn", function(t) {
                        return t * t * ((this._p1 + 1) * t - this._p1)
                    }), f("BackInOut", function(t) {
                        return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                    })),
                    m = l("easing.SlowMo", function(t, e, i) {
                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                    }, !0),
                    g = m.prototype = new t;
                return g.constructor = m, g.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }, m.ease = new m(.7, .7), g.config = m.config = function(t, e, i) {
                    return new m(t, e, i)
                }, e = l("easing.SteppedEase", function(t, e) {
                    t = t || 1, this._p1 = 1 / t, this._p2 = t + (e ? 0 : 1), this._p3 = e ? 1 : 0
                }, !0), g = e.prototype = new t, g.constructor = e, g.getRatio = function(t) {
                    return t < 0 ? t = 0 : t >= 1 && (t = .999999999), ((this._p2 * t | 0) + this._p3) * this._p1
                }, g.config = e.config = function(t, i) {
                    return new e(t, i)
                }, i = l("easing.RoughEase", function(e) {
                    e = e || {};
                    for (var i, n, r, s, o, a, l = e.taper || "none", h = [], c = 0, u = 0 | (e.points || 20), f = u, p = e.randomize !== !1, m = e.clamp === !0, g = e.template instanceof t ? e.template : null, _ = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = p ? Math.random() : 1 / u * f, n = g ? g.getRatio(i) : i, "none" === l ? r = _ : "out" === l ? (s = 1 - i, r = s * s * _) : "in" === l ? r = i * i * _ : i < .5 ? (s = 2 * i, r = s * s * .5 * _) : (s = 2 * (1 - i), r = s * s * .5 * _), p ? n += Math.random() * r - .5 * r : f % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : n < 0 && (n = 0)), h[c++] = {
                        x: i,
                        y: n
                    };
                    for (h.sort(function(t, e) {
                            return t.x - e.x
                        }), a = new d(1, 1, null), f = u; --f > -1;) o = h[f], a = new d(o.x, o.y, a);
                    this._prev = new d(0, 0, 0 !== a.t ? a : a.next)
                }, !0), g = i.prototype = new t, g.constructor = i, g.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev
                    } else
                        for (; e.prev && t <= e.t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                }, g.config = function(t) {
                    return new i(t)
                }, i.ease = new i, u("Bounce", h("BounceOut", function(t) {
                    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), h("BounceIn", function(t) {
                    return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : t < 2 / 2.75 ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), h("BounceInOut", function(t) {
                    var e = t < .5;
                    return t = e ? 1 - 2 * t : 2 * t - 1, t < 1 / 2.75 ? t *= 7.5625 * t : t = t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                })), u("Circ", h("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), h("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), h("CircInOut", function(t) {
                    return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })), n = function(e, i, n) {
                    var r = l("easing." + e, function(t, e) {
                            this._p1 = t >= 1 ? t : 1, this._p2 = (e || n) / (t < 1 ? t : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
                        }, !0),
                        s = r.prototype = new t;
                    return s.constructor = r, s.getRatio = i, s.config = function(t, e) {
                        return new r(t, e)
                    }, r
                }, u("Elastic", n("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
                }, .3), n("ElasticIn", function(t) {
                    return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2))
                }, .3), n("ElasticInOut", function(t) {
                    return (t *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
                }, .45)), u("Expo", h("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t)
                }), h("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), h("ExpoInOut", function(t) {
                    return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })), u("Sine", h("SineOut", function(t) {
                    return Math.sin(t * a)
                }), h("SineIn", function(t) {
                    return -Math.cos(t * a) + 1
                }), h("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })), l("easing.EaseLookup", {
                    find: function(e) {
                        return t.map[e]
                    }
                }, !0), c(r.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), p
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t, e) {
        "use strict";
        var i = {},
            n = t.document,
            r = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!r.TweenLite) {
            var s, o, a, l, h, c = function(t) {
                    var e, i = t.split("."),
                        n = r;
                    for (e = 0; e < i.length; e++) n[i[e]] = n = n[i[e]] || {};
                    return n
                },
                u = c("com.greensock"),
                d = 1e-10,
                f = function(t) {
                    var e, i = [],
                        n = t.length;
                    for (e = 0; e !== n; i.push(t[e++]));
                    return i
                },
                p = function() {},
                m = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(),
                g = {},
                _ = function(n, s, o, a) {
                    this.sc = g[n] ? g[n].sc : [], g[n] = this, this.gsClass = null, this.func = o;
                    var l = [];
                    this.check = function(h) {
                        for (var u, d, f, p, m = s.length, v = m; --m > -1;)(u = g[s[m]] || new _(s[m], [])).gsClass ? (l[m] = u.gsClass, v--) : h && u.sc.push(this);
                        if (0 === v && o) {
                            if (d = ("com.greensock." + n).split("."), f = d.pop(), p = c(d.join("."))[f] = this.gsClass = o.apply(o, l), a)
                                if (r[f] = i[f] = p, "undefined" != typeof module && module.exports)
                                    if (n === e) {
                                        module.exports = i[e] = p;
                                        for (m in i) p[m] = i[m]
                                    } else i[e] && (i[e][f] = p);
                            else "function" == typeof define && define.amd && define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                                return p
                            });
                            for (m = 0; m < this.sc.length; m++) this.sc[m].check()
                        }
                    }, this.check(!0)
                },
                v = t._gsDefine = function(t, e, i, n) {
                    return new _(t, e, i, n)
                },
                y = u._class = function(t, e, i) {
                    return e = e || function() {}, v(t, [], function() {
                        return e
                    }, i), e
                };
            v.globals = r;
            var b = [0, 0, 1, 1],
                w = y("easing.Ease", function(t, e, i, n) {
                    this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? b.concat(e) : b
                }, !0),
                x = w.map = {},
                T = w.register = function(t, e, i, n) {
                    for (var r, s, o, a, l = e.split(","), h = l.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;)
                        for (s = l[h], r = n ? y("easing." + s, null, !0) : u.easing[s] || {}, o = c.length; --o > -1;) a = c[o], x[s + "." + a] = x[a + s] = r[a] = t.getRatio ? t : t[a] || new t
                };
            for (a = w.prototype, a._calcEnd = !1, a.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        n = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : t < .5 ? n / 2 : 1 - n / 2
                }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], o = s.length; --o > -1;) a = s[o] + ",Power" + o, T(new w(null, null, 1, o), a, "easeOut", !0), T(new w(null, null, 2, o), a, "easeIn" + (0 === o ? ",easeNone" : "")), T(new w(null, null, 3, o), a, "easeInOut");
            x.linear = u.easing.Linear.easeIn, x.swing = u.easing.Quad.easeInOut;
            var S = y("events.EventDispatcher", function(t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            a = S.prototype, a.addEventListener = function(t, e, i, n, r) {
                r = r || 0;
                var s, o, a = this._listeners[t],
                    c = 0;
                for (this !== l || h || l.wake(), null == a && (this._listeners[t] = a = []), o = a.length; --o > -1;) s = a[o], s.c === e && s.s === i ? a.splice(o, 1) : 0 === c && s.pr < r && (c = o + 1);
                a.splice(c, 0, {
                    c: e,
                    s: i,
                    up: n,
                    pr: r
                })
            }, a.removeEventListener = function(t, e) {
                var i, n = this._listeners[t];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === e) return void n.splice(i, 1)
            }, a.dispatchEvent = function(t) {
                var e, i, n, r = this._listeners[t];
                if (r)
                    for (e = r.length, e > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1;) n = r[e], n && (n.up ? n.c.call(n.s || i, {
                        type: t,
                        target: i
                    }) : n.c.call(n.s || i))
            };
            var P = t.requestAnimationFrame,
                k = t.cancelAnimationFrame,
                C = Date.now || function() {
                    return (new Date).getTime()
                },
                E = C();
            for (s = ["ms", "moz", "webkit", "o"], o = s.length; --o > -1 && !P;) P = t[s[o] + "RequestAnimationFrame"], k = t[s[o] + "CancelAnimationFrame"] || t[s[o] + "CancelRequestAnimationFrame"];
            y("Ticker", function(t, e) {
                var i, r, s, o, a, c = this,
                    u = C(),
                    f = !(e === !1 || !P) && "auto",
                    m = 500,
                    g = 33,
                    _ = "tick",
                    v = function(t) {
                        var e, n, l = C() - E;
                        l > m && (u += l - g), E += l, c.time = (E - u) / 1e3, e = c.time - a, (!i || e > 0 || t === !0) && (c.frame++, a += e + (e >= o ? .004 : o - e), n = !0), t !== !0 && (s = r(v)), n && c.dispatchEvent(_)
                    };
                S.call(c), c.time = c.frame = 0, c.tick = function() {
                    v(!0)
                }, c.lagSmoothing = function(t, e) {
                    m = t || 1 / d, g = Math.min(e, m, 0)
                }, c.sleep = function() {
                    null != s && (f && k ? k(s) : clearTimeout(s), r = p, s = null, c === l && (h = !1))
                }, c.wake = function(t) {
                    null !== s ? c.sleep() : t ? u += -E + (E = C()) : c.frame > 10 && (E = C() - m + 5), r = 0 === i ? p : f && P ? P : function(t) {
                        return setTimeout(t, 1e3 * (a - c.time) + 1 | 0)
                    }, c === l && (h = !0), v(2)
                }, c.fps = function(t) {
                    return arguments.length ? (i = t, o = 1 / (i || 60), a = this.time + o, void c.wake()) : i
                }, c.useRAF = function(t) {
                    return arguments.length ? (c.sleep(), f = t, void c.fps(i)) : f
                }, c.fps(t), setTimeout(function() {
                    "auto" === f && c.frame < 5 && "hidden" !== n.visibilityState && c.useRAF(!1)
                }, 1500)
            }), a = u.Ticker.prototype = new u.events.EventDispatcher, a.constructor = u.Ticker;
            var A = y("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, G) {
                    h || l.wake();
                    var i = this.vars.useFrames ? W : G;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            l = A.ticker = new u.Ticker, a = A.prototype, a._dirty = a._gc = a._initted = a._paused = !1, a._totalTime = a._time = 0, a._rawPrevTime = -1, a._next = a._last = a._onUpdate = a._timeline = a.timeline = null, a._paused = !1;
            var R = function() {
                h && C() - E > 2e3 && "hidden" !== n.visibilityState && l.wake();
                var t = setTimeout(R, 2e3);
                t.unref && t.unref()
            };
            R(), a.play = function(t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, a.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, a.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, a.seek = function(t, e) {
                return this.totalTime(Number(t), e !== !1)
            }, a.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
            }, a.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, a.render = function(t, e, i) {}, a.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this
            }, a.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7
            }, a._enabled = function(t, e) {
                return h || l.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, a._kill = function(t, e) {
                return this._enabled(!1, !1)
            }, a.kill = function(t, e) {
                return this._kill(t, e), this
            }, a._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, a._swapSelfInParams = function(t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, a._callback = function(t) {
                var e = this.vars,
                    i = e[t],
                    n = e[t + "Params"],
                    r = e[t + "Scope"] || e.callbackScope || this,
                    s = n ? n.length : 0;
                switch (s) {
                    case 0:
                        i.call(r);
                        break;
                    case 1:
                        i.call(r, n[0]);
                        break;
                    case 2:
                        i.call(r, n[0], n[1]);
                        break;
                    default:
                        i.apply(r, n)
                }
            }, a.eventCallback = function(t, e, i, n) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = m(i) && i.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, a.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, a.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, a.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, a.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, a.totalTime = function(t, e, i) {
                if (h || l.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (t < 0 && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), this._totalTime === t && 0 !== this._duration || (D.length && J(), this.render(t, e, !1), D.length && J())
                }
                return this
            }, a.progress = a.totalProgress = function(t, e) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
            }, a.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, a.endTime = function(t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, a.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || d, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, a.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, a.paused = function(t) {
                if (!arguments.length) return this._paused;
                var e, i, n = this._timeline;
                return t != this._paused && n && (h || t || l.wake(), e = n.rawTime(), i = e - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
            };
            var j = y("core.SimpleTimeline", function(t) {
                A.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            a = j.prototype = new A, a.constructor = j, a.kill()._gc = !1, a._first = a._last = a._recent = null, a._sortChildren = !1, a.add = a.insert = function(t, e, i, n) {
                var r, s;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren)
                    for (s = t._startTime; r && r._startTime > s;) r = r._prev;
                return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
            }, a._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, a.render = function(t, e, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
            }, a.rawTime = function() {
                return h || l.wake(), this._totalTime
            };
            var O = y("TweenLite", function(e, i, n) {
                    if (A.call(this, i, n), this.render = O.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : O.selector(e) || e;
                    var r, s, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? Q[O.defaultOverwrite] : "number" == typeof l ? l >> 0 : Q[l], (a || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])
                        for (this._targets = o = f(e), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) s = o[r], s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(f(s))) : (this._siblings[r] = Z(s, this, !1), 1 === l && this._siblings[r].length > 1 && tt(s, this, null, 1, this._siblings[r])) : (s = o[r--] = O.selector(s), "string" == typeof s && o.splice(r + 1, 1)) : o.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = Z(e, this, !1), 1 === l && this._siblings.length > 1 && tt(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -d, this.render(Math.min(0, -this._delay)))
                }, !0),
                L = function(e) {
                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                I = function(t, e) {
                    var i, n = {};
                    for (i in t) V[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!H[i] || H[i] && H[i]._autoCSS) || (n[i] = t[i], delete t[i]);
                    t.css = n
                };
            a = O.prototype = new A, a.constructor = O, a.kill()._gc = !1, a.ratio = 0, a._firstPT = a._targets = a._overwrittenProps = a._startAt = null, a._notifyPluginsOfEnabled = a._lazy = !1, O.version = "1.20.2", O.defaultEase = a._ease = new w(null, null, 1, 1), O.defaultOverwrite = "auto", O.ticker = l, O.autoSleep = 120, O.lagSmoothing = function(t, e) {
                l.lagSmoothing(t, e)
            }, O.selector = t.$ || t.jQuery || function(e) {
                var i = t.$ || t.jQuery;
                return i ? (O.selector = i, i(e)) : "undefined" == typeof n ? e : n.querySelectorAll ? n.querySelectorAll(e) : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
            var D = [],
                M = {},
                N = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                q = /[\+-]=-?[\.\d]/,
                $ = function(t) {
                    for (var e, i = this._firstPT, n = 1e-6; i;) e = i.blob ? 1 === t && this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s, i.m ? e = i.m(e, this._target || i.t) : e < n && e > -n && !i.blob && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                },
                F = function(t, e, i, n) {
                    var r, s, o, a, l, h, c, u = [],
                        d = 0,
                        f = "",
                        p = 0;
                    for (u.start = t, u.end = e, t = u[0] = t + "", e = u[1] = e + "", i && (i(u), t = u[0], e = u[1]), u.length = 0, r = t.match(N) || [], s = e.match(N) || [], n && (n._next = null, n.blob = 1, u._firstPT = u._applyPT = n), l = s.length, a = 0; a < l; a++) c = s[a], h = e.substr(d, e.indexOf(c, d) - d), f += h || !a ? h : ",", d += h.length, p ? p = (p + 1) % 5 : "rgba(" === h.substr(-5) && (p = 1), c === r[a] || r.length <= a ? f += c : (f && (u.push(f), f = ""), o = parseFloat(r[a]), u.push(o), u._firstPT = {
                        _next: u._firstPT,
                        t: u,
                        p: u.length - 1,
                        s: o,
                        c: ("=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2)) : parseFloat(c) - o) || 0,
                        f: 0,
                        m: p && p < 4 ? Math.round : 0
                    }), d += c.length;
                    return f += e.substr(d), f && u.push(f), u.setRatio = $, q.test(e) && (u.end = 0), u
                },
                z = function(t, e, i, n, r, s, o, a, l) {
                    "function" == typeof n && (n = n(l || 0, t));
                    var h, c = typeof t[e],
                        u = "function" !== c ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                        d = "get" !== i ? i : u ? o ? t[u](o) : t[u]() : t[e],
                        f = "string" == typeof n && "=" === n.charAt(1),
                        p = {
                            t: t,
                            p: e,
                            s: d,
                            f: "function" === c,
                            pg: 0,
                            n: r || e,
                            m: s ? "function" == typeof s ? s : Math.round : 0,
                            pr: 0,
                            c: f ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - d || 0
                        };
                    if (("number" != typeof d || "number" != typeof n && !f) && (o || isNaN(d) || !f && isNaN(n) || "boolean" == typeof d || "boolean" == typeof n ? (p.fp = o, h = F(d, f ? parseFloat(p.s) + p.c : n, a || O.defaultStringFilter, p), p = {
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 2,
                            pg: 0,
                            n: r || e,
                            pr: 0,
                            m: 0
                        }) : (p.s = parseFloat(d), f || (p.c = parseFloat(n) - p.s || 0))), p.c) return (p._next = this._firstPT) && (p._next._prev = p), this._firstPT = p, p
                },
                B = O._internals = {
                    isArray: m,
                    isSelector: L,
                    lazyTweens: D,
                    blobDif: F
                },
                H = O._plugins = {},
                U = B.tweenLookup = {},
                X = 0,
                V = B.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1,
                    yoyoEase: 1
                },
                Q = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    true: 1,
                    false: 0
                },
                W = A._rootFramesTimeline = new j,
                G = A._rootTimeline = new j,
                Y = 30,
                J = B.lazyRender = function() {
                    var t, e = D.length;
                    for (M = {}; --e > -1;) t = D[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                    D.length = 0
                };
            G._startTime = l.time, W._startTime = l.frame, G._active = W._active = !0, setTimeout(J, 1), A._updateRoot = O.render = function() {
                var t, e, i;
                if (D.length && J(), G.render((l.time - G._startTime) * G._timeScale, !1, !1), W.render((l.frame - W._startTime) * W._timeScale, !1, !1), D.length && J(), l.frame >= Y) {
                    Y = l.frame + (parseInt(O.autoSleep, 10) || 120);
                    for (i in U) {
                        for (e = U[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete U[i]
                    }
                    if (i = G._first, (!i || i._paused) && O.autoSleep && !W._first && 1 === l._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || l.sleep()
                    }
                }
            }, l.addEventListener("tick", A._updateRoot);
            var Z = function(t, e, i) {
                    var n, r, s = t._gsTweenID;
                    if (U[s || (t._gsTweenID = s = "t" + X++)] || (U[s] = {
                            target: t,
                            tweens: []
                        }), e && (n = U[s].tweens, n[r = n.length] = e, i))
                        for (; --r > -1;) n[r] === e && n.splice(r, 1);
                    return U[s].tweens
                },
                K = function(t, e, i, n) {
                    var r, s, o = t.vars.onOverwrite;
                    return o && (r = o(t, e, i, n)), o = O.onOverwrite, o && (s = o(t, e, i, n)), r !== !1 && s !== !1
                },
                tt = function(t, e, i, n, r) {
                    var s, o, a, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, s = 0; s < l; s++)
                            if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0);
                            else if (5 === n) break;
                        return o
                    }
                    var h, c = e._startTime + d,
                        u = [],
                        f = 0,
                        p = 0 === e._duration;
                    for (s = r.length; --s > -1;)(a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || et(e, 0, p), 0 === et(a, h, p) && (u[f++] = a)) : a._startTime <= c && a._startTime + a.totalDuration() / a._timeScale > c && ((p || !a._initted) && c - a._startTime <= 2e-10 || (u[f++] = a)));
                    for (s = f; --s > -1;)
                        if (a = u[s], 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
                            if (2 !== n && !K(a, e)) continue;
                            a._enabled(!1, !1) && (o = !0)
                        }
                    return o
                },
                et = function(t, e, i) {
                    for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline;) {
                        if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return s /= r, s > e ? s - e : i && s === e || !t._initted && s - e < 2 * d ? d : (s += t.totalDuration() / t._timeScale / r) > e + d ? 0 : s - e - d
                };
            a._init = function() {
                var t, e, i, n, r, s, o = this.vars,
                    a = this._overwrittenProps,
                    l = this._duration,
                    h = !!o.immediateRender,
                    c = o.ease;
                if (o.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                    for (n in o.startAt) r[n] = o.startAt[n];
                    if (r.overwrite = !1, r.immediateRender = !0, r.lazy = h && o.lazy !== !1, r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateScope = o.onUpdateScope || o.callbackScope || this,
                        this._startAt = O.to(this.target, 0, r), h)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== l) return
                } else if (o.runBackwards && 0 !== l)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (h = !1), i = {};
                        for (n in o) V[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && o.lazy !== !1, i.immediateRender = h, this._startAt = O.to(this.target, 0, i), h) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = c = c ? c instanceof w ? c : "function" == typeof c ? new w(c, o.easeParams) : x[c] || O.defaultEase : O.defaultEase, o.easeParams instanceof Array && c.config && (this._ease = c.config.apply(c, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (s = this._targets.length, t = 0; t < s; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
                if (e && O._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = o.onUpdate, this._initted = !0
            }, a._initProps = function(e, i, n, r, s) {
                var o, a, l, h, c, u;
                if (null == e) return !1;
                M[e._gsTweenID] && J(), this.vars.css || e.style && e !== t && e.nodeType && H.css && this.vars.autoCSS !== !1 && I(this.vars, e);
                for (o in this.vars)
                    if (u = this.vars[o], V[o]) u && (u instanceof Array || u.push && m(u)) && u.join("").indexOf("{self}") !== -1 && (this.vars[o] = u = this._swapSelfInParams(u, this));
                    else if (H[o] && (h = new H[o])._onInitTween(e, this.vars[o], this, s)) {
                    for (this._firstPT = c = {
                            _next: this._firstPT,
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: o,
                            pg: 1,
                            pr: h._priority,
                            m: 0
                        }, a = h._overwriteProps.length; --a > -1;) i[h._overwriteProps[a]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), c._next && (c._next._prev = c)
                } else i[o] = z.call(this, e, o, "get", u, o, 0, null, this.vars.stringFilter, s);
                return r && this._kill(r, e) ? this._initProps(e, i, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && tt(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r, s)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (M[e._gsTweenID] = !0), l)
            }, a.render = function(t, e, i) {
                var n, r, s, o, a = this._time,
                    l = this._duration,
                    h = this._rawPrevTime;
                if (t >= l - 1e-7 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (h < 0 || t <= 0 && t >= -1e-7 || h === d && "isPause" !== this.data) && h !== t && (i = !0, h > d && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || h === t ? t : d);
                else if (t < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && h > 0) && (r = "onReverseComplete", n = this._reversed), t < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== d || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || h === t ? t : d)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var c = t / l,
                        u = this._easeType,
                        f = this._easePower;
                    (1 === u || 3 === u && c >= .5) && (c = 1 - c), 3 === u && (c *= 2), 1 === f ? c *= c : 2 === f ? c *= c * c : 3 === f ? c *= c * c * c : 4 === f && (c *= c * c * c * c), 1 === u ? this.ratio = 1 - c : 2 === u ? this.ratio = c : t / l < .5 ? this.ratio = c / 2 : this.ratio = 1 - c / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== a || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = h, D.push(this), void(this._lazy = [t, e]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== l || e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                    this._onUpdate && (t < 0 && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== a || n || i) && this._callback("onUpdate")), r && (this._gc && !i || (t < 0 && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === d && o !== d && (this._rawPrevTime = 0)))
                }
            }, a._kill = function(t, e, i) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : O.selector(e) || e;
                var n, r, s, o, a, l, h, c, u, d = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((m(e) || L(e)) && "number" != typeof e[0])
                    for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (n = this._targets.length; --n > -1;)
                            if (e === this._targets[n]) {
                                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (a) {
                        if (h = t || a, c = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (O.onOverwrite || this.vars.onOverwrite)) {
                            for (s in h) a[s] && (u || (u = []), u.push(s));
                            if ((u || !t) && !K(this, i, e, u)) return !1
                        }
                        for (s in h)(o = a[s]) && (d && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(h) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), c && (r[s] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, a.invalidate = function() {
                return this._notifyPluginsOfEnabled && O._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], A.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -d, this.render(Math.min(0, -this._delay))), this
            }, a._enabled = function(t, e) {
                if (h || l.wake(), t && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = Z(n[i], this, !0);
                    else this._siblings = Z(this.target, this, !0)
                }
                return A.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && O._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            }, O.to = function(t, e, i) {
                return new O(t, e, i)
            }, O.from = function(t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new O(t, e, i)
            }, O.fromTo = function(t, e, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new O(t, e, n)
            }, O.delayedCall = function(t, e, i, n, r) {
                return new O(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: n,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, O.set = function(t, e) {
                return new O(t, 0, e)
            }, O.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : O.selector(t) || t;
                var i, n, r, s;
                if ((m(t) || L(t)) && "number" != typeof t[0]) {
                    for (i = t.length, n = []; --i > -1;) n = n.concat(O.getTweensOf(t[i], e));
                    for (i = n.length; --i > -1;)
                        for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                } else if (t._gsTweenID)
                    for (n = Z(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                return n || []
            }, O.killTweensOf = O.killDelayedCallsTo = function(t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var n = O.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
            };
            var it = y("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = it.prototype
            }, !0);
            if (a = it.prototype, it.version = "1.19.0", it.API = 2, a._firstPT = null, a._addTween = z, a.setRatio = $, a._kill = function(t) {
                    var e, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, a._mod = a._roundProps = function(t) {
                    for (var e, i = this._firstPT; i;) e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")], e && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next
                }, O._onPluginEvent = function(t, e) {
                    var i, n, r, s, o, a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a;) {
                            for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                            (a._prev = n ? n._prev : s) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : s = a, a = o
                        }
                        a = e._firstPT = r
                    }
                    for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
                    return i
                }, it.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === it.API && (H[(new t[e])._propName] = t[e]);
                    return !0
                }, v.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        n = t.priority || 0,
                        r = t.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_mod",
                            mod: "_mod",
                            initAll: "_onInitAllProps"
                        },
                        o = y("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            it.call(this, i, n), this._overwriteProps = r || []
                        }, t.global === !0),
                        a = o.prototype = new it(i);
                    a.constructor = o, o.API = t.API;
                    for (e in s) "function" == typeof t[e] && (a[s[e]] = t[e]);
                    return o.version = t.version, it.activate([o]), o
                }, s = t._gsQueue) {
                for (o = 0; o < s.length; o++) s[o]();
                for (a in g) g[a].func || t.console.log("GSAP encountered missing dependency: " + a)
            }
            h = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"), define("TweenMax", ["gsap.EasePack", "gsap.ScrollToPlugin", "gsap.DrawSVGPlugin"], function() {}),
    function(t) {
        function e(t) {
            throw new RangeError(R[t])
        }

        function i(t, e) {
            for (var i = t.length, n = []; i--;) n[i] = e(t[i]);
            return n
        }

        function n(t, e) {
            var n = t.split("@"),
                r = "";
            n.length > 1 && (r = n[0] + "@", t = n[1]), t = t.replace(A, ".");
            var s = t.split("."),
                o = i(s, e).join(".");
            return r + o
        }

        function r(t) {
            for (var e, i, n = [], r = 0, s = t.length; r < s;) e = t.charCodeAt(r++), e >= 55296 && e <= 56319 && r < s ? (i = t.charCodeAt(r++), 56320 == (64512 & i) ? n.push(((1023 & e) << 10) + (1023 & i) + 65536) : (n.push(e), r--)) : n.push(e);
            return n
        }

        function s(t) {
            return i(t, function(t) {
                var e = "";
                return t > 65535 && (t -= 65536, e += L(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += L(t)
            }).join("")
        }

        function o(t) {
            return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : y
        }

        function a(t, e) {
            return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
        }

        function l(t, e, i) {
            var n = 0;
            for (t = i ? O(t / T) : t >> 1, t += O(t / e); t > j * w >> 1; n += y) t = O(t / j);
            return O(n + (j + 1) * t / (t + x))
        }

        function h(t) {
            var i, n, r, a, h, c, u, d, f, p, m = [],
                g = t.length,
                _ = 0,
                x = P,
                T = S;
            for (n = t.lastIndexOf(k), n < 0 && (n = 0), r = 0; r < n; ++r) t.charCodeAt(r) >= 128 && e("not-basic"), m.push(t.charCodeAt(r));
            for (a = n > 0 ? n + 1 : 0; a < g;) {
                for (h = _, c = 1, u = y; a >= g && e("invalid-input"), d = o(t.charCodeAt(a++)), (d >= y || d > O((v - _) / c)) && e("overflow"), _ += d * c, f = u <= T ? b : u >= T + w ? w : u - T, !(d < f); u += y) p = y - f, c > O(v / p) && e("overflow"), c *= p;
                i = m.length + 1, T = l(_ - h, i, 0 == h), O(_ / i) > v - x && e("overflow"), x += O(_ / i), _ %= i, m.splice(_++, 0, x)
            }
            return s(m)
        }

        function c(t) {
            var i, n, s, o, h, c, u, d, f, p, m, g, _, x, T, C = [];
            for (t = r(t), g = t.length, i = P, n = 0, h = S, c = 0; c < g; ++c) m = t[c], m < 128 && C.push(L(m));
            for (s = o = C.length, o && C.push(k); s < g;) {
                for (u = v, c = 0; c < g; ++c) m = t[c], m >= i && m < u && (u = m);
                for (_ = s + 1, u - i > O((v - n) / _) && e("overflow"), n += (u - i) * _, i = u, c = 0; c < g; ++c)
                    if (m = t[c], m < i && ++n > v && e("overflow"), m == i) {
                        for (d = n, f = y; p = f <= h ? b : f >= h + w ? w : f - h, !(d < p); f += y) T = d - p, x = y - p, C.push(L(a(p + T % x, 0))), d = O(T / x);
                        C.push(L(a(d, 0))), h = l(n, _, s == o), n = 0, ++s
                    }++n, ++i
            }
            return C.join("")
        }

        function u(t) {
            return n(t, function(t) {
                return C.test(t) ? h(t.slice(4).toLowerCase()) : t
            })
        }

        function d(t) {
            return n(t, function(t) {
                return E.test(t) ? "xn--" + c(t) : t
            })
        }
        var f = "object" == typeof exports && exports && !exports.nodeType && exports,
            p = "object" == typeof module && module && !module.nodeType && module,
            m = "object" == typeof global && global;
        m.global !== m && m.window !== m && m.self !== m || (t = m);
        var g, _, v = 2147483647,
            y = 36,
            b = 1,
            w = 26,
            x = 38,
            T = 700,
            S = 72,
            P = 128,
            k = "-",
            C = /^xn--/,
            E = /[^\x20-\x7E]/,
            A = /[\x2E\u3002\uFF0E\uFF61]/g,
            R = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            },
            j = y - b,
            O = Math.floor,
            L = String.fromCharCode;
        if (g = {
                version: "1.3.2",
                ucs2: {
                    decode: r,
                    encode: s
                },
                decode: h,
                encode: c,
                toASCII: d,
                toUnicode: u
            }, "function" == typeof define && "object" == typeof define.amd && define.amd) define("punycode", [], function() {
            return g
        });
        else if (f && p)
            if (module.exports == f) p.exports = g;
            else
                for (_ in g) g.hasOwnProperty(_) && (f[_] = g[_]);
        else t.punycode = g
    }(this), define("urijs/punycode", function() {}),
    function(t, e) {
        "use strict";
        "object" == typeof module && module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define("urijs/IPv6", e) : t.IPv6 = e(t)
    }(this, function(t) {
        "use strict";

        function e(t) {
            var e = t.toLowerCase(),
                i = e.split(":"),
                n = i.length,
                r = 8;
            "" === i[0] && "" === i[1] && "" === i[2] ? (i.shift(), i.shift()) : "" === i[0] && "" === i[1] ? i.shift() : "" === i[n - 1] && "" === i[n - 2] && i.pop(), n = i.length, i[n - 1].indexOf(".") !== -1 && (r = 7);
            var s;
            for (s = 0; s < n && "" !== i[s]; s++);
            if (s < r)
                for (i.splice(s, 1, "0000"); i.length < r;) i.splice(s, 0, "0000");
            for (var o, a = 0; a < r; a++) {
                o = i[a].split("");
                for (var l = 0; l < 3 && ("0" === o[0] && o.length > 1); l++) o.splice(0, 1);
                i[a] = o.join("")
            }
            var h = -1,
                c = 0,
                u = 0,
                d = -1,
                f = !1;
            for (a = 0; a < r; a++) f ? "0" === i[a] ? u += 1 : (f = !1, u > c && (h = d, c = u)) : "0" === i[a] && (f = !0, d = a, u = 1);
            u > c && (h = d, c = u), c > 1 && i.splice(h, c, ""), n = i.length;
            var p = "";
            for ("" === i[0] && (p = ":"), a = 0; a < n && (p += i[a], a !== n - 1); a++) p += ":";
            return "" === i[n - 1] && (p += ":"), p
        }

        function i() {
            return t.IPv6 === this && (t.IPv6 = n), this
        }
        var n = t && t.IPv6;
        return {
            best: e,
            noConflict: i
        }
    }),
    function(t, e) {
        "use strict";
        "object" == typeof module && module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define("urijs/SecondLevelDomains", e) : t.SecondLevelDomains = e(t)
    }(this, function(t) {
        "use strict";
        var e = t && t.SecondLevelDomains,
            i = {
                list: {
                    ac: " com gov mil net org ",
                    ae: " ac co gov mil name net org pro sch ",
                    af: " com edu gov net org ",
                    al: " com edu gov mil net org ",
                    ao: " co ed gv it og pb ",
                    ar: " com edu gob gov int mil net org tur ",
                    at: " ac co gv or ",
                    au: " asn com csiro edu gov id net org ",
                    ba: " co com edu gov mil net org rs unbi unmo unsa untz unze ",
                    bb: " biz co com edu gov info net org store tv ",
                    bh: " biz cc com edu gov info net org ",
                    bn: " com edu gov net org ",
                    bo: " com edu gob gov int mil net org tv ",
                    br: " adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ",
                    bs: " com edu gov net org ",
                    bz: " du et om ov rg ",
                    ca: " ab bc mb nb nf nl ns nt nu on pe qc sk yk ",
                    ck: " biz co edu gen gov info net org ",
                    cn: " ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ",
                    co: " com edu gov mil net nom org ",
                    cr: " ac c co ed fi go or sa ",
                    cy: " ac biz com ekloges gov ltd name net org parliament press pro tm ",
                    do: " art com edu gob gov mil net org sld web ",
                    dz: " art asso com edu gov net org pol ",
                    ec: " com edu fin gov info med mil net org pro ",
                    eg: " com edu eun gov mil name net org sci ",
                    er: " com edu gov ind mil net org rochest w ",
                    es: " com edu gob nom org ",
                    et: " biz com edu gov info name net org ",
                    fj: " ac biz com info mil name net org pro ",
                    fk: " ac co gov net nom org ",
                    fr: " asso com f gouv nom prd presse tm ",
                    gg: " co net org ",
                    gh: " com edu gov mil org ",
                    gn: " ac com gov net org ",
                    gr: " com edu gov mil net org ",
                    gt: " com edu gob ind mil net org ",
                    gu: " com edu gov net org ",
                    hk: " com edu gov idv net org ",
                    hu: " 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ",
                    id: " ac co go mil net or sch web ",
                    il: " ac co gov idf k12 muni net org ",
                    in : " ac co edu ernet firm gen gov i ind mil net nic org res ",
                    iq: " com edu gov i mil net org ",
                    ir: " ac co dnssec gov i id net org sch ",
                    it: " edu gov ",
                    je: " co net org ",
                    jo: " com edu gov mil name net org sch ",
                    jp: " ac ad co ed go gr lg ne or ",
                    ke: " ac co go info me mobi ne or sc ",
                    kh: " com edu gov mil net org per ",
                    ki: " biz com de edu gov info mob net org tel ",
                    km: " asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",
                    kn: " edu gov net org ",
                    kr: " ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ",
                    kw: " com edu gov net org ",
                    ky: " com edu gov net org ",
                    kz: " com edu gov mil net org ",
                    lb: " com edu gov net org ",
                    lk: " assn com edu gov grp hotel int ltd net ngo org sch soc web ",
                    lr: " com edu gov net org ",
                    lv: " asn com conf edu gov id mil net org ",
                    ly: " com edu gov id med net org plc sch ",
                    ma: " ac co gov m net org press ",
                    mc: " asso tm ",
                    me: " ac co edu gov its net org priv ",
                    mg: " com edu gov mil nom org prd tm ",
                    mk: " com edu gov inf name net org pro ",
                    ml: " com edu gov net org presse ",
                    mn: " edu gov org ",
                    mo: " com edu gov net org ",
                    mt: " com edu gov net org ",
                    mv: " aero biz com coop edu gov info int mil museum name net org pro ",
                    mw: " ac co com coop edu gov int museum net org ",
                    mx: " com edu gob net org ",
                    my: " com edu gov mil name net org sch ",
                    nf: " arts com firm info net other per rec store web ",
                    ng: " biz com edu gov mil mobi name net org sch ",
                    ni: " ac co com edu gob mil net nom org ",
                    np: " com edu gov mil net org ",
                    nr: " biz com edu gov info net org ",
                    om: " ac biz co com edu gov med mil museum net org pro sch ",
                    pe: " com edu gob mil net nom org sld ",
                    ph: " com edu gov i mil net ngo org ",
                    pk: " biz com edu fam gob gok gon gop gos gov net org web ",
                    pl: " art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ",
                    pr: " ac biz com edu est gov info isla name net org pro prof ",
                    ps: " com edu gov net org plo sec ",
                    pw: " belau co ed go ne or ",
                    ro: " arts com firm info nom nt org rec store tm www ",
                    rs: " ac co edu gov in org ",
                    sb: " com edu gov net org ",
                    sc: " com edu gov net org ",
                    sh: " co com edu gov net nom org ",
                    sl: " com edu gov net org ",
                    st: " co com consulado edu embaixada gov mil net org principe saotome store ",
                    sv: " com edu gob org red ",
                    sz: " ac co org ",
                    tr: " av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ",
                    tt: " aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",
                    tw: " club com ebiz edu game gov idv mil net org ",
                    mu: " ac co com gov net or org ",
                    mz: " ac co edu gov org ",
                    na: " co com ",
                    nz: " ac co cri geek gen govt health iwi maori mil net org parliament school ",
                    pa: " abo ac com edu gob ing med net nom org sld ",
                    pt: " com edu gov int net nome org publ ",
                    py: " com edu gov mil net org ",
                    qa: " com edu gov mil net org ",
                    re: " asso com nom ",
                    ru: " ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
                    rw: " ac co com edu gouv gov int mil net ",
                    sa: " com edu gov med net org pub sch ",
                    sd: " com edu gov info med net org tv ",
                    se: " a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ",
                    sg: " com edu gov idn net org per ",
                    sn: " art com edu gouv org perso univ ",
                    sy: " com edu gov mil net news org ",
                    th: " ac co go in mi net or ",
                    tj: " ac biz co com edu go gov info int mil name net nic org test web ",
                    tn: " agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
                    tz: " ac co go ne or ",
                    ua: " biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ",
                    ug: " ac co go ne or org sc ",
                    uk: " ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
                    us: " dni fed isa kids nsn ",
                    uy: " com edu gub mil net org ",
                    ve: " co com edu gob info mil net org web ",
                    vi: " co com k12 net org ",
                    vn: " ac biz com edu gov health info int name net org pro ",
                    ye: " co com gov ltd me net org plc ",
                    yu: " ac co edu gov org ",
                    za: " ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ",
                    zm: " ac co com edu gov net org sch ",
                    com: "ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ",
                    net: "gb jp se uk ",
                    org: "ae",
                    de: "com "
                },
                has: function(t) {
                    var e = t.lastIndexOf(".");
                    if (e <= 0 || e >= t.length - 1) return !1;
                    var n = t.lastIndexOf(".", e - 1);
                    if (n <= 0 || n >= e - 1) return !1;
                    var r = i.list[t.slice(e + 1)];
                    return !!r && r.indexOf(" " + t.slice(n + 1, e) + " ") >= 0
                },
                is: function(t) {
                    var e = t.lastIndexOf(".");
                    if (e <= 0 || e >= t.length - 1) return !1;
                    var n = t.lastIndexOf(".", e - 1);
                    if (n >= 0) return !1;
                    var r = i.list[t.slice(e + 1)];
                    return !!r && r.indexOf(" " + t.slice(0, e) + " ") >= 0
                },
                get: function(t) {
                    var e = t.lastIndexOf(".");
                    if (e <= 0 || e >= t.length - 1) return null;
                    var n = t.lastIndexOf(".", e - 1);
                    if (n <= 0 || n >= e - 1) return null;
                    var r = i.list[t.slice(e + 1)];
                    return r ? r.indexOf(" " + t.slice(n + 1, e) + " ") < 0 ? null : t.slice(n + 1) : null
                },
                noConflict: function() {
                    return t.SecondLevelDomains === this && (t.SecondLevelDomains = e), this
                }
            };
        return i
    }),
    function(t, e) {
        "use strict";
        "object" == typeof module && module.exports ? module.exports = e(require("./punycode"), require("./IPv6"), require("./SecondLevelDomains")) : "function" == typeof define && define.amd ? define("urijs/URI", ["./punycode", "./IPv6", "./SecondLevelDomains"], e) : t.URI = e(t.punycode, t.IPv6, t.SecondLevelDomains, t)
    }(this, function(t, e, i, n) {
        "use strict";

        function r(t, e) {
            var i = arguments.length >= 1,
                n = arguments.length >= 2;
            if (!(this instanceof r)) return i ? n ? new r(t, e) : new r(t) : new r;
            if (void 0 === t) {
                if (i) throw new TypeError("undefined is not a valid argument for URI");
                t = "undefined" != typeof location ? location.href + "" : ""
            }
            if (null === t && i) throw new TypeError("null is not a valid argument for URI");
            return this.href(t), void 0 !== e ? this.absoluteTo(e) : this
        }

        function s(t) {
            return t.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
        }

        function o(t) {
            return void 0 === t ? "Undefined" : String(Object.prototype.toString.call(t)).slice(8, -1)
        }

        function a(t) {
            return "Array" === o(t)
        }

        function l(t, e) {
            var i, n, r = {};
            if ("RegExp" === o(e)) r = null;
            else if (a(e))
                for (i = 0, n = e.length; i < n; i++) r[e[i]] = !0;
            else r[e] = !0;
            for (i = 0, n = t.length; i < n; i++) {
                var s = r && void 0 !== r[t[i]] || !r && e.test(t[i]);
                s && (t.splice(i, 1), n--, i--)
            }
            return t
        }

        function h(t, e) {
            var i, n;
            if (a(e)) {
                for (i = 0, n = e.length; i < n; i++)
                    if (!h(t, e[i])) return !1;
                return !0
            }
            var r = o(e);
            for (i = 0, n = t.length; i < n; i++)
                if ("RegExp" === r) {
                    if ("string" == typeof t[i] && t[i].match(e)) return !0
                } else if (t[i] === e) return !0;
            return !1
        }

        function c(t, e) {
            if (!a(t) || !a(e)) return !1;
            if (t.length !== e.length) return !1;
            t.sort(), e.sort();
            for (var i = 0, n = t.length; i < n; i++)
                if (t[i] !== e[i]) return !1;
            return !0
        }

        function u(t) {
            var e = /^\/+|\/+$/g;
            return t.replace(e, "")
        }

        function d(t) {
            return escape(t)
        }

        function f(t) {
            return encodeURIComponent(t).replace(/[!'()*]/g, d).replace(/\*/g, "%2A")
        }

        function p(t) {
            return function(e, i) {
                return void 0 === e ? this._parts[t] || "" : (this._parts[t] = e || null, this.build(!i), this)
            }
        }

        function m(t, e) {
            return function(i, n) {
                return void 0 === i ? this._parts[t] || "" : (null !== i && (i += "", i.charAt(0) === e && (i = i.substring(1))), this._parts[t] = i, this.build(!n), this)
            }
        }
        var g = n && n.URI;
        r.version = "1.18.10";
        var _ = r.prototype,
            v = Object.prototype.hasOwnProperty;
        r._parts = function() {
            return {
                protocol: null,
                username: null,
                password: null,
                hostname: null,
                urn: null,
                port: null,
                path: null,
                query: null,
                fragment: null,
                duplicateQueryParameters: r.duplicateQueryParameters,
                escapeQuerySpace: r.escapeQuerySpace
            }
        }, r.duplicateQueryParameters = !1, r.escapeQuerySpace = !0, r.protocol_expression = /^[a-z][a-z0-9.+-]*$/i, r.idn_expression = /[^a-z0-9\.-]/i, r.punycode_expression = /(xn--)/i, r.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, r.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/, r.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi, r.findUri = {
            start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
            end: /[\s\r\n]|$/,
            trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
            parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g
        }, r.defaultPorts = {
            http: "80",
            https: "443",
            ftp: "21",
            gopher: "70",
            ws: "80",
            wss: "443"
        }, r.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/, r.domAttributes = {
            a: "href",
            blockquote: "cite",
            link: "href",
            base: "href",
            script: "src",
            form: "action",
            img: "src",
            area: "href",
            iframe: "src",
            embed: "src",
            source: "src",
            track: "src",
            input: "src",
            audio: "src",
            video: "src"
        }, r.getDomAttribute = function(t) {
            if (t && t.nodeName) {
                var e = t.nodeName.toLowerCase();
                if ("input" !== e || "image" === t.type) return r.domAttributes[e]
            }
        }, r.encode = f, r.decode = decodeURIComponent, r.iso8859 = function() {
            r.encode = escape, r.decode = unescape
        }, r.unicode = function() {
            r.encode = f, r.decode = decodeURIComponent
        }, r.characters = {
            pathname: {
                encode: {
                    expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
                    map: {
                        "%24": "$",
                        "%26": "&",
                        "%2B": "+",
                        "%2C": ",",
                        "%3B": ";",
                        "%3D": "=",
                        "%3A": ":",
                        "%40": "@"
                    }
                },
                decode: {
                    expression: /[\/\?#]/g,
                    map: {
                        "/": "%2F",
                        "?": "%3F",
                        "#": "%23"
                    }
                }
            },
            reserved: {
                encode: {
                    expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
                    map: {
                        "%3A": ":",
                        "%2F": "/",
                        "%3F": "?",
                        "%23": "#",
                        "%5B": "[",
                        "%5D": "]",
                        "%40": "@",
                        "%21": "!",
                        "%24": "$",
                        "%26": "&",
                        "%27": "'",
                        "%28": "(",
                        "%29": ")",
                        "%2A": "*",
                        "%2B": "+",
                        "%2C": ",",
                        "%3B": ";",
                        "%3D": "="
                    }
                }
            },
            urnpath: {
                encode: {
                    expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,
                    map: {
                        "%21": "!",
                        "%24": "$",
                        "%27": "'",
                        "%28": "(",
                        "%29": ")",
                        "%2A": "*",
                        "%2B": "+",
                        "%2C": ",",
                        "%3B": ";",
                        "%3D": "=",
                        "%40": "@"
                    }
                },
                decode: {
                    expression: /[\/\?#:]/g,
                    map: {
                        "/": "%2F",
                        "?": "%3F",
                        "#": "%23",
                        ":": "%3A"
                    }
                }
            }
        }, r.encodeQuery = function(t, e) {
            var i = r.encode(t + "");
            return void 0 === e && (e = r.escapeQuerySpace), e ? i.replace(/%20/g, "+") : i
        }, r.decodeQuery = function(t, e) {
            t += "", void 0 === e && (e = r.escapeQuerySpace);
            try {
                return r.decode(e ? t.replace(/\+/g, "%20") : t)
            } catch (e) {
                return t
            }
        };
        var y, b = {
                encode: "encode",
                decode: "decode"
            },
            w = function(t, e) {
                return function(i) {
                    try {
                        return r[e](i + "").replace(r.characters[t][e].expression, function(i) {
                            return r.characters[t][e].map[i]
                        })
                    } catch (t) {
                        return i
                    }
                }
            };
        for (y in b) r[y + "PathSegment"] = w("pathname", b[y]), r[y + "UrnPathSegment"] = w("urnpath", b[y]);
        var x = function(t, e, i) {
            return function(n) {
                var s;
                s = i ? function(t) {
                    return r[e](r[i](t))
                } : r[e];
                for (var o = (n + "").split(t), a = 0, l = o.length; a < l; a++) o[a] = s(o[a]);
                return o.join(t)
            }
        };
        r.decodePath = x("/", "decodePathSegment"), r.decodeUrnPath = x(":", "decodeUrnPathSegment"), r.recodePath = x("/", "encodePathSegment", "decode"), r.recodeUrnPath = x(":", "encodeUrnPathSegment", "decode"), r.encodeReserved = w("reserved", "encode"), r.parse = function(t, e) {
            var i;
            return e || (e = {}), i = t.indexOf("#"), i > -1 && (e.fragment = t.substring(i + 1) || null, t = t.substring(0, i)), i = t.indexOf("?"), i > -1 && (e.query = t.substring(i + 1) || null, t = t.substring(0, i)), "//" === t.substring(0, 2) ? (e.protocol = null, t = t.substring(2), t = r.parseAuthority(t, e)) : (i = t.indexOf(":"), i > -1 && (e.protocol = t.substring(0, i) || null, e.protocol && !e.protocol.match(r.protocol_expression) ? e.protocol = void 0 : "//" === t.substring(i + 1, i + 3) ? (t = t.substring(i + 3), t = r.parseAuthority(t, e)) : (t = t.substring(i + 1), e.urn = !0))), e.path = t, e
        }, r.parseHost = function(t, e) {
            t = t.replace(/\\/g, "/");
            var i, n, r = t.indexOf("/");
            if (r === -1 && (r = t.length), "[" === t.charAt(0)) i = t.indexOf("]"), e.hostname = t.substring(1, i) || null, e.port = t.substring(i + 2, r) || null, "/" === e.port && (e.port = null);
            else {
                var s = t.indexOf(":"),
                    o = t.indexOf("/"),
                    a = t.indexOf(":", s + 1);
                a !== -1 && (o === -1 || a < o) ? (e.hostname = t.substring(0, r) || null, e.port = null) : (n = t.substring(0, r).split(":"), e.hostname = n[0] || null, e.port = n[1] || null)
            }
            return e.hostname && "/" !== t.substring(r).charAt(0) && (r++, t = "/" + t), t.substring(r) || "/"
        }, r.parseAuthority = function(t, e) {
            return t = r.parseUserinfo(t, e), r.parseHost(t, e)
        }, r.parseUserinfo = function(t, e) {
            var i, n = t.indexOf("/"),
                s = t.lastIndexOf("@", n > -1 ? n : t.length - 1);
            return s > -1 && (n === -1 || s < n) ? (i = t.substring(0, s).split(":"), e.username = i[0] ? r.decode(i[0]) : null, i.shift(), e.password = i[0] ? r.decode(i.join(":")) : null, t = t.substring(s + 1)) : (e.username = null, e.password = null), t
        }, r.parseQuery = function(t, e) {
            if (!t) return {};
            if (t = t.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, ""), !t) return {};
            for (var i, n, s, o = {}, a = t.split("&"), l = a.length, h = 0; h < l; h++) i = a[h].split("="), n = r.decodeQuery(i.shift(), e), s = i.length ? r.decodeQuery(i.join("="), e) : null, v.call(o, n) ? ("string" != typeof o[n] && null !== o[n] || (o[n] = [o[n]]), o[n].push(s)) : o[n] = s;
            return o
        }, r.build = function(t) {
            var e = "";
            return t.protocol && (e += t.protocol + ":"), t.urn || !e && !t.hostname || (e += "//"), e += r.buildAuthority(t) || "", "string" == typeof t.path && ("/" !== t.path.charAt(0) && "string" == typeof t.hostname && (e += "/"), e += t.path), "string" == typeof t.query && t.query && (e += "?" + t.query), "string" == typeof t.fragment && t.fragment && (e += "#" + t.fragment), e
        }, r.buildHost = function(t) {
            var e = "";
            return t.hostname ? (e += r.ip6_expression.test(t.hostname) ? "[" + t.hostname + "]" : t.hostname, t.port && (e += ":" + t.port), e) : ""
        }, r.buildAuthority = function(t) {
            return r.buildUserinfo(t) + r.buildHost(t)
        }, r.buildUserinfo = function(t) {
            var e = "";
            return t.username && (e += r.encode(t.username)), t.password && (e += ":" + r.encode(t.password)), e && (e += "@"), e
        }, r.buildQuery = function(t, e, i) {
            var n, s, o, l, h = "";
            for (s in t)
                if (v.call(t, s) && s)
                    if (a(t[s]))
                        for (n = {}, o = 0, l = t[s].length; o < l; o++) void 0 !== t[s][o] && void 0 === n[t[s][o] + ""] && (h += "&" + r.buildQueryParameter(s, t[s][o], i), e !== !0 && (n[t[s][o] + ""] = !0));
                    else void 0 !== t[s] && (h += "&" + r.buildQueryParameter(s, t[s], i));
            return h.substring(1)
        }, r.buildQueryParameter = function(t, e, i) {
            return r.encodeQuery(t, i) + (null !== e ? "=" + r.encodeQuery(e, i) : "")
        }, r.addQuery = function(t, e, i) {
            if ("object" == typeof e)
                for (var n in e) v.call(e, n) && r.addQuery(t, n, e[n]);
            else {
                if ("string" != typeof e) throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
                if (void 0 === t[e]) return void(t[e] = i);
                "string" == typeof t[e] && (t[e] = [t[e]]), a(i) || (i = [i]), t[e] = (t[e] || []).concat(i)
            }
        }, r.removeQuery = function(t, e, i) {
            var n, s, h;
            if (a(e))
                for (n = 0, s = e.length; n < s; n++) t[e[n]] = void 0;
            else if ("RegExp" === o(e))
                for (h in t) e.test(h) && (t[h] = void 0);
            else if ("object" == typeof e)
                for (h in e) v.call(e, h) && r.removeQuery(t, h, e[h]);
            else {
                if ("string" != typeof e) throw new TypeError("URI.removeQuery() accepts an object, string, RegExp as the first parameter");
                void 0 !== i ? "RegExp" === o(i) ? !a(t[e]) && i.test(t[e]) ? t[e] = void 0 : t[e] = l(t[e], i) : t[e] !== String(i) || a(i) && 1 !== i.length ? a(t[e]) && (t[e] = l(t[e], i)) : t[e] = void 0 : t[e] = void 0;
            }
        }, r.hasQuery = function(t, e, i, n) {
            switch (o(e)) {
                case "String":
                    break;
                case "RegExp":
                    for (var s in t)
                        if (v.call(t, s) && e.test(s) && (void 0 === i || r.hasQuery(t, s, i))) return !0;
                    return !1;
                case "Object":
                    for (var l in e)
                        if (v.call(e, l) && !r.hasQuery(t, l, e[l])) return !1;
                    return !0;
                default:
                    throw new TypeError("URI.hasQuery() accepts a string, regular expression or object as the name parameter")
            }
            switch (o(i)) {
                case "Undefined":
                    return e in t;
                case "Boolean":
                    var u = Boolean(a(t[e]) ? t[e].length : t[e]);
                    return i === u;
                case "Function":
                    return !!i(t[e], e, t);
                case "Array":
                    if (!a(t[e])) return !1;
                    var d = n ? h : c;
                    return d(t[e], i);
                case "RegExp":
                    return a(t[e]) ? !!n && h(t[e], i) : Boolean(t[e] && t[e].match(i));
                case "Number":
                    i = String(i);
                case "String":
                    return a(t[e]) ? !!n && h(t[e], i) : t[e] === i;
                default:
                    throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter")
            }
        }, r.joinPaths = function() {
            for (var t = [], e = [], i = 0, n = 0; n < arguments.length; n++) {
                var s = new r(arguments[n]);
                t.push(s);
                for (var o = s.segment(), a = 0; a < o.length; a++) "string" == typeof o[a] && e.push(o[a]), o[a] && i++
            }
            if (!e.length || !i) return new r("");
            var l = new r("").segment(e);
            return "" !== t[0].path() && "/" !== t[0].path().slice(0, 1) || l.path("/" + l.path()), l.normalize()
        }, r.commonPath = function(t, e) {
            var i, n = Math.min(t.length, e.length);
            for (i = 0; i < n; i++)
                if (t.charAt(i) !== e.charAt(i)) {
                    i--;
                    break
                }
            return i < 1 ? t.charAt(0) === e.charAt(0) && "/" === t.charAt(0) ? "/" : "" : ("/" === t.charAt(i) && "/" === e.charAt(i) || (i = t.substring(0, i).lastIndexOf("/")), t.substring(0, i + 1))
        }, r.withinString = function(t, e, i) {
            i || (i = {});
            var n = i.start || r.findUri.start,
                s = i.end || r.findUri.end,
                o = i.trim || r.findUri.trim,
                a = i.parens || r.findUri.parens,
                l = /[a-z0-9-]=["']?$/i;
            for (n.lastIndex = 0;;) {
                var h = n.exec(t);
                if (!h) break;
                var c = h.index;
                if (i.ignoreHtml) {
                    var u = t.slice(Math.max(c - 3, 0), c);
                    if (u && l.test(u)) continue
                }
                for (var d = c + t.slice(c).search(s), f = t.slice(c, d), p = -1;;) {
                    var m = a.exec(f);
                    if (!m) break;
                    var g = m.index + m[0].length;
                    p = Math.max(p, g)
                }
                if (f = p > -1 ? f.slice(0, p) + f.slice(p).replace(o, "") : f.replace(o, ""), !(f.length <= h[0].length || i.ignore && i.ignore.test(f))) {
                    d = c + f.length;
                    var _ = e(f, c, d, t);
                    void 0 !== _ ? (_ = String(_), t = t.slice(0, c) + _ + t.slice(d), n.lastIndex = c + _.length) : n.lastIndex = d
                }
            }
            return n.lastIndex = 0, t
        }, r.ensureValidHostname = function(e) {
            if (e.match(r.invalid_hostname_characters)) {
                if (!t) throw new TypeError('Hostname "' + e + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
                if (t.toASCII(e).match(r.invalid_hostname_characters)) throw new TypeError('Hostname "' + e + '" contains characters other than [A-Z0-9.-]')
            }
        }, r.noConflict = function(t) {
            if (t) {
                var e = {
                    URI: this.noConflict()
                };
                return n.URITemplate && "function" == typeof n.URITemplate.noConflict && (e.URITemplate = n.URITemplate.noConflict()), n.IPv6 && "function" == typeof n.IPv6.noConflict && (e.IPv6 = n.IPv6.noConflict()), n.SecondLevelDomains && "function" == typeof n.SecondLevelDomains.noConflict && (e.SecondLevelDomains = n.SecondLevelDomains.noConflict()), e
            }
            return n.URI === this && (n.URI = g), this
        }, _.build = function(t) {
            return t === !0 ? this._deferred_build = !0 : (void 0 === t || this._deferred_build) && (this._string = r.build(this._parts), this._deferred_build = !1), this
        }, _.clone = function() {
            return new r(this)
        }, _.valueOf = _.toString = function() {
            return this.build(!1)._string
        }, _.protocol = p("protocol"), _.username = p("username"), _.password = p("password"), _.hostname = p("hostname"), _.port = p("port"), _.query = m("query", "?"), _.fragment = m("fragment", "#"), _.search = function(t, e) {
            var i = this.query(t, e);
            return "string" == typeof i && i.length ? "?" + i : i
        }, _.hash = function(t, e) {
            var i = this.fragment(t, e);
            return "string" == typeof i && i.length ? "#" + i : i
        }, _.pathname = function(t, e) {
            if (void 0 === t || t === !0) {
                var i = this._parts.path || (this._parts.hostname ? "/" : "");
                return t ? (this._parts.urn ? r.decodeUrnPath : r.decodePath)(i) : i
            }
            return this._parts.urn ? this._parts.path = t ? r.recodeUrnPath(t) : "" : this._parts.path = t ? r.recodePath(t) : "/", this.build(!e), this
        }, _.path = _.pathname, _.href = function(t, e) {
            var i;
            if (void 0 === t) return this.toString();
            this._string = "", this._parts = r._parts();
            var n = t instanceof r,
                s = "object" == typeof t && (t.hostname || t.path || t.pathname);
            if (t.nodeName) {
                var o = r.getDomAttribute(t);
                t = t[o] || "", s = !1
            }
            if (!n && s && void 0 !== t.pathname && (t = t.toString()), "string" == typeof t || t instanceof String) this._parts = r.parse(String(t), this._parts);
            else {
                if (!n && !s) throw new TypeError("invalid input");
                var a = n ? t._parts : t;
                for (i in a) v.call(this._parts, i) && (this._parts[i] = a[i])
            }
            return this.build(!e), this
        }, _.is = function(t) {
            var e = !1,
                n = !1,
                s = !1,
                o = !1,
                a = !1,
                l = !1,
                h = !1,
                c = !this._parts.urn;
            switch (this._parts.hostname && (c = !1, n = r.ip4_expression.test(this._parts.hostname), s = r.ip6_expression.test(this._parts.hostname), e = n || s, o = !e, a = o && i && i.has(this._parts.hostname), l = o && r.idn_expression.test(this._parts.hostname), h = o && r.punycode_expression.test(this._parts.hostname)), t.toLowerCase()) {
                case "relative":
                    return c;
                case "absolute":
                    return !c;
                case "domain":
                case "name":
                    return o;
                case "sld":
                    return a;
                case "ip":
                    return e;
                case "ip4":
                case "ipv4":
                case "inet4":
                    return n;
                case "ip6":
                case "ipv6":
                case "inet6":
                    return s;
                case "idn":
                    return l;
                case "url":
                    return !this._parts.urn;
                case "urn":
                    return !!this._parts.urn;
                case "punycode":
                    return h
            }
            return null
        };
        var T = _.protocol,
            S = _.port,
            P = _.hostname;
        _.protocol = function(t, e) {
            if (void 0 !== t && t && (t = t.replace(/:(\/\/)?$/, ""), !t.match(r.protocol_expression))) throw new TypeError('Protocol "' + t + "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]");
            return T.call(this, t, e)
        }, _.scheme = _.protocol, _.port = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if (void 0 !== t && (0 === t && (t = null), t && (t += "", ":" === t.charAt(0) && (t = t.substring(1)), t.match(/[^0-9]/)))) throw new TypeError('Port "' + t + '" contains characters other than [0-9]');
            return S.call(this, t, e)
        }, _.hostname = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if (void 0 !== t) {
                var i = {},
                    n = r.parseHost(t, i);
                if ("/" !== n) throw new TypeError('Hostname "' + t + '" contains characters other than [A-Z0-9.-]');
                t = i.hostname
            }
            return P.call(this, t, e)
        }, _.origin = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if (void 0 === t) {
                var i = this.protocol(),
                    n = this.authority();
                return n ? (i ? i + "://" : "") + this.authority() : ""
            }
            var s = r(t);
            return this.protocol(s.protocol()).authority(s.authority()).build(!e), this
        }, _.host = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if (void 0 === t) return this._parts.hostname ? r.buildHost(this._parts) : "";
            var i = r.parseHost(t, this._parts);
            if ("/" !== i) throw new TypeError('Hostname "' + t + '" contains characters other than [A-Z0-9.-]');
            return this.build(!e), this
        }, _.authority = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if (void 0 === t) return this._parts.hostname ? r.buildAuthority(this._parts) : "";
            var i = r.parseAuthority(t, this._parts);
            if ("/" !== i) throw new TypeError('Hostname "' + t + '" contains characters other than [A-Z0-9.-]');
            return this.build(!e), this
        }, _.userinfo = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if (void 0 === t) {
                var i = r.buildUserinfo(this._parts);
                return i ? i.substring(0, i.length - 1) : i
            }
            return "@" !== t[t.length - 1] && (t += "@"), r.parseUserinfo(t, this._parts), this.build(!e), this
        }, _.resource = function(t, e) {
            var i;
            return void 0 === t ? this.path() + this.search() + this.hash() : (i = r.parse(t), this._parts.path = i.path, this._parts.query = i.query, this._parts.fragment = i.fragment, this.build(!e), this)
        }, _.subdomain = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if (void 0 === t) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var i = this._parts.hostname.length - this.domain().length - 1;
                return this._parts.hostname.substring(0, i) || ""
            }
            var n = this._parts.hostname.length - this.domain().length,
                o = this._parts.hostname.substring(0, n),
                a = new RegExp("^" + s(o));
            return t && "." !== t.charAt(t.length - 1) && (t += "."), t && r.ensureValidHostname(t), this._parts.hostname = this._parts.hostname.replace(a, t), this.build(!e), this
        }, _.domain = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if ("boolean" == typeof t && (e = t, t = void 0), void 0 === t) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var i = this._parts.hostname.match(/\./g);
                if (i && i.length < 2) return this._parts.hostname;
                var n = this._parts.hostname.length - this.tld(e).length - 1;
                return n = this._parts.hostname.lastIndexOf(".", n - 1) + 1, this._parts.hostname.substring(n) || ""
            }
            if (!t) throw new TypeError("cannot set domain empty");
            if (r.ensureValidHostname(t), !this._parts.hostname || this.is("IP")) this._parts.hostname = t;
            else {
                var o = new RegExp(s(this.domain()) + "$");
                this._parts.hostname = this._parts.hostname.replace(o, t)
            }
            return this.build(!e), this
        }, _.tld = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if ("boolean" == typeof t && (e = t, t = void 0), void 0 === t) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var n = this._parts.hostname.lastIndexOf("."),
                    r = this._parts.hostname.substring(n + 1);
                return e !== !0 && i && i.list[r.toLowerCase()] ? i.get(this._parts.hostname) || r : r
            }
            var o;
            if (!t) throw new TypeError("cannot set TLD empty");
            if (t.match(/[^a-zA-Z0-9-]/)) {
                if (!i || !i.is(t)) throw new TypeError('TLD "' + t + '" contains characters other than [A-Z0-9]');
                o = new RegExp(s(this.tld()) + "$"), this._parts.hostname = this._parts.hostname.replace(o, t)
            } else {
                if (!this._parts.hostname || this.is("IP")) throw new ReferenceError("cannot set TLD on non-domain host");
                o = new RegExp(s(this.tld()) + "$"), this._parts.hostname = this._parts.hostname.replace(o, t)
            }
            return this.build(!e), this
        }, _.directory = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if (void 0 === t || t === !0) {
                if (!this._parts.path && !this._parts.hostname) return "";
                if ("/" === this._parts.path) return "/";
                var i = this._parts.path.length - this.filename().length - 1,
                    n = this._parts.path.substring(0, i) || (this._parts.hostname ? "/" : "");
                return t ? r.decodePath(n) : n
            }
            var o = this._parts.path.length - this.filename().length,
                a = this._parts.path.substring(0, o),
                l = new RegExp("^" + s(a));
            return this.is("relative") || (t || (t = "/"), "/" !== t.charAt(0) && (t = "/" + t)), t && "/" !== t.charAt(t.length - 1) && (t += "/"), t = r.recodePath(t), this._parts.path = this._parts.path.replace(l, t), this.build(!e), this
        }, _.filename = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if ("string" != typeof t) {
                if (!this._parts.path || "/" === this._parts.path) return "";
                var i = this._parts.path.lastIndexOf("/"),
                    n = this._parts.path.substring(i + 1);
                return t ? r.decodePathSegment(n) : n
            }
            var o = !1;
            "/" === t.charAt(0) && (t = t.substring(1)), t.match(/\.?\//) && (o = !0);
            var a = new RegExp(s(this.filename()) + "$");
            return t = r.recodePath(t), this._parts.path = this._parts.path.replace(a, t), o ? this.normalizePath(e) : this.build(!e), this
        }, _.suffix = function(t, e) {
            if (this._parts.urn) return void 0 === t ? "" : this;
            if (void 0 === t || t === !0) {
                if (!this._parts.path || "/" === this._parts.path) return "";
                var i, n, o = this.filename(),
                    a = o.lastIndexOf(".");
                return a === -1 ? "" : (i = o.substring(a + 1), n = /^[a-z0-9%]+$/i.test(i) ? i : "", t ? r.decodePathSegment(n) : n)
            }
            "." === t.charAt(0) && (t = t.substring(1));
            var l, h = this.suffix();
            if (h) l = t ? new RegExp(s(h) + "$") : new RegExp(s("." + h) + "$");
            else {
                if (!t) return this;
                this._parts.path += "." + r.recodePath(t)
            }
            return l && (t = r.recodePath(t), this._parts.path = this._parts.path.replace(l, t)), this.build(!e), this
        }, _.segment = function(t, e, i) {
            var n = this._parts.urn ? ":" : "/",
                r = this.path(),
                s = "/" === r.substring(0, 1),
                o = r.split(n);
            if (void 0 !== t && "number" != typeof t && (i = e, e = t, t = void 0), void 0 !== t && "number" != typeof t) throw new Error('Bad segment "' + t + '", must be 0-based integer');
            if (s && o.shift(), t < 0 && (t = Math.max(o.length + t, 0)), void 0 === e) return void 0 === t ? o : o[t];
            if (null === t || void 0 === o[t])
                if (a(e)) {
                    o = [];
                    for (var l = 0, h = e.length; l < h; l++)(e[l].length || o.length && o[o.length - 1].length) && (o.length && !o[o.length - 1].length && o.pop(), o.push(u(e[l])))
                } else(e || "string" == typeof e) && (e = u(e), "" === o[o.length - 1] ? o[o.length - 1] = e : o.push(e));
            else e ? o[t] = u(e) : o.splice(t, 1);
            return s && o.unshift(""), this.path(o.join(n), i)
        }, _.segmentCoded = function(t, e, i) {
            var n, s, o;
            if ("number" != typeof t && (i = e, e = t, t = void 0), void 0 === e) {
                if (n = this.segment(t, e, i), a(n))
                    for (s = 0, o = n.length; s < o; s++) n[s] = r.decode(n[s]);
                else n = void 0 !== n ? r.decode(n) : void 0;
                return n
            }
            if (a(e))
                for (s = 0, o = e.length; s < o; s++) e[s] = r.encode(e[s]);
            else e = "string" == typeof e || e instanceof String ? r.encode(e) : e;
            return this.segment(t, e, i)
        };
        var k = _.query;
        return _.query = function(t, e) {
            if (t === !0) return r.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            if ("function" == typeof t) {
                var i = r.parseQuery(this._parts.query, this._parts.escapeQuerySpace),
                    n = t.call(this, i);
                return this._parts.query = r.buildQuery(n || i, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!e), this
            }
            return void 0 !== t && "string" != typeof t ? (this._parts.query = r.buildQuery(t, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!e), this) : k.call(this, t, e)
        }, _.setQuery = function(t, e, i) {
            var n = r.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            if ("string" == typeof t || t instanceof String) n[t] = void 0 !== e ? e : null;
            else {
                if ("object" != typeof t) throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
                for (var s in t) v.call(t, s) && (n[s] = t[s])
            }
            return this._parts.query = r.buildQuery(n, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), "string" != typeof t && (i = e), this.build(!i), this
        }, _.addQuery = function(t, e, i) {
            var n = r.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            return r.addQuery(n, t, void 0 === e ? null : e), this._parts.query = r.buildQuery(n, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), "string" != typeof t && (i = e), this.build(!i), this
        }, _.removeQuery = function(t, e, i) {
            var n = r.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            return r.removeQuery(n, t, e), this._parts.query = r.buildQuery(n, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), "string" != typeof t && (i = e), this.build(!i), this
        }, _.hasQuery = function(t, e, i) {
            var n = r.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            return r.hasQuery(n, t, e, i)
        }, _.setSearch = _.setQuery, _.addSearch = _.addQuery, _.removeSearch = _.removeQuery, _.hasSearch = _.hasQuery, _.normalize = function() {
            return this._parts.urn ? this.normalizeProtocol(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build() : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()
        }, _.normalizeProtocol = function(t) {
            return "string" == typeof this._parts.protocol && (this._parts.protocol = this._parts.protocol.toLowerCase(), this.build(!t)), this
        }, _.normalizeHostname = function(i) {
            return this._parts.hostname && (this.is("IDN") && t ? this._parts.hostname = t.toASCII(this._parts.hostname) : this.is("IPv6") && e && (this._parts.hostname = e.best(this._parts.hostname)), this._parts.hostname = this._parts.hostname.toLowerCase(), this.build(!i)), this
        }, _.normalizePort = function(t) {
            return "string" == typeof this._parts.protocol && this._parts.port === r.defaultPorts[this._parts.protocol] && (this._parts.port = null, this.build(!t)), this
        }, _.normalizePath = function(t) {
            var e = this._parts.path;
            if (!e) return this;
            if (this._parts.urn) return this._parts.path = r.recodeUrnPath(this._parts.path), this.build(!t), this;
            if ("/" === this._parts.path) return this;
            e = r.recodePath(e);
            var i, n, s, o = "";
            for ("/" !== e.charAt(0) && (i = !0, e = "/" + e), "/.." !== e.slice(-3) && "/." !== e.slice(-2) || (e += "/"), e = e.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/"), i && (o = e.substring(1).match(/^(\.\.\/)+/) || "", o && (o = o[0]));;) {
                if (n = e.search(/\/\.\.(\/|$)/), n === -1) break;
                0 !== n ? (s = e.substring(0, n).lastIndexOf("/"), s === -1 && (s = n), e = e.substring(0, s) + e.substring(n + 3)) : e = e.substring(3)
            }
            return i && this.is("relative") && (e = o + e.substring(1)), this._parts.path = e, this.build(!t), this
        }, _.normalizePathname = _.normalizePath, _.normalizeQuery = function(t) {
            return "string" == typeof this._parts.query && (this._parts.query.length ? this.query(r.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : this._parts.query = null, this.build(!t)), this
        }, _.normalizeFragment = function(t) {
            return this._parts.fragment || (this._parts.fragment = null, this.build(!t)), this
        }, _.normalizeSearch = _.normalizeQuery, _.normalizeHash = _.normalizeFragment, _.iso8859 = function() {
            var t = r.encode,
                e = r.decode;
            r.encode = escape, r.decode = decodeURIComponent;
            try {
                this.normalize()
            } finally {
                r.encode = t, r.decode = e
            }
            return this
        }, _.unicode = function() {
            var t = r.encode,
                e = r.decode;
            r.encode = f, r.decode = unescape;
            try {
                this.normalize()
            } finally {
                r.encode = t, r.decode = e
            }
            return this
        }, _.readable = function() {
            var e = this.clone();
            e.username("").password("").normalize();
            var i = "";
            if (e._parts.protocol && (i += e._parts.protocol + "://"), e._parts.hostname && (e.is("punycode") && t ? (i += t.toUnicode(e._parts.hostname), e._parts.port && (i += ":" + e._parts.port)) : i += e.host()), e._parts.hostname && e._parts.path && "/" !== e._parts.path.charAt(0) && (i += "/"), i += e.path(!0), e._parts.query) {
                for (var n = "", s = 0, o = e._parts.query.split("&"), a = o.length; s < a; s++) {
                    var l = (o[s] || "").split("=");
                    n += "&" + r.decodeQuery(l[0], this._parts.escapeQuerySpace).replace(/&/g, "%26"), void 0 !== l[1] && (n += "=" + r.decodeQuery(l[1], this._parts.escapeQuerySpace).replace(/&/g, "%26"))
                }
                i += "?" + n.substring(1)
            }
            return i += r.decodeQuery(e.hash(), !0)
        }, _.absoluteTo = function(t) {
            var e, i, n, s = this.clone(),
                o = ["protocol", "username", "password", "hostname", "port"];
            if (this._parts.urn) throw new Error("URNs do not have any generally defined hierarchical components");
            if (t instanceof r || (t = new r(t)), s._parts.protocol) return s;
            if (s._parts.protocol = t._parts.protocol, this._parts.hostname) return s;
            for (i = 0; n = o[i]; i++) s._parts[n] = t._parts[n];
            return s._parts.path ? (".." === s._parts.path.substring(-2) && (s._parts.path += "/"), "/" !== s.path().charAt(0) && (e = t.directory(), e = e ? e : 0 === t.path().indexOf("/") ? "/" : "", s._parts.path = (e ? e + "/" : "") + s._parts.path, s.normalizePath())) : (s._parts.path = t._parts.path, s._parts.query || (s._parts.query = t._parts.query)), s.build(), s
        }, _.relativeTo = function(t) {
            var e, i, n, s, o, a = this.clone().normalize();
            if (a._parts.urn) throw new Error("URNs do not have any generally defined hierarchical components");
            if (t = new r(t).normalize(), e = a._parts, i = t._parts, s = a.path(), o = t.path(), "/" !== s.charAt(0)) throw new Error("URI is already relative");
            if ("/" !== o.charAt(0)) throw new Error("Cannot calculate a URI relative to another relative URI");
            if (e.protocol === i.protocol && (e.protocol = null), e.username !== i.username || e.password !== i.password) return a.build();
            if (null !== e.protocol || null !== e.username || null !== e.password) return a.build();
            if (e.hostname !== i.hostname || e.port !== i.port) return a.build();
            if (e.hostname = null, e.port = null, s === o) return e.path = "", a.build();
            if (n = r.commonPath(s, o), !n) return a.build();
            var l = i.path.substring(n.length).replace(/[^\/]*$/, "").replace(/.*?\//g, "../");
            return e.path = l + e.path.substring(n.length) || "./", a.build()
        }, _.equals = function(t) {
            var e, i, n, s = this.clone(),
                o = new r(t),
                l = {},
                h = {},
                u = {};
            if (s.normalize(), o.normalize(), s.toString() === o.toString()) return !0;
            if (e = s.query(), i = o.query(), s.query(""), o.query(""), s.toString() !== o.toString()) return !1;
            if (e.length !== i.length) return !1;
            l = r.parseQuery(e, this._parts.escapeQuerySpace), h = r.parseQuery(i, this._parts.escapeQuerySpace);
            for (n in l)
                if (v.call(l, n)) {
                    if (a(l[n])) {
                        if (!c(l[n], h[n])) return !1
                    } else if (l[n] !== h[n]) return !1;
                    u[n] = !0
                }
            for (n in h)
                if (v.call(h, n) && !u[n]) return !1;
            return !0
        }, _.duplicateQueryParameters = function(t) {
            return this._parts.duplicateQueryParameters = !!t, this
        }, _.escapeQuerySpace = function(t) {
            return this._parts.escapeQuerySpace = !!t, this
        }, r
    }), this.createjs = this.createjs || {},
    function() {
        "use strict";
        var t = createjs.PreloadJS = createjs.PreloadJS || {};
        t.version = "0.6.2", t.buildDate = "Thu, 26 Nov 2015 20:44:31 GMT"
    }(), this.createjs = this.createjs || {}, createjs.extend = function(t, e) {
        "use strict";

        function i() {
            this.constructor = t
        }
        return i.prototype = e.prototype, t.prototype = new i
    }, this.createjs = this.createjs || {}, createjs.promote = function(t, e) {
        "use strict";
        var i = t.prototype,
            n = Object.getPrototypeOf && Object.getPrototypeOf(i) || i.__proto__;
        if (n) {
            i[(e += "_") + "constructor"] = n.constructor;
            for (var r in n) i.hasOwnProperty(r) && "function" == typeof n[r] && (i[e + r] = n[r])
        }
        return t
    }, this.createjs = this.createjs || {},
    function() {
        "use strict";
        createjs.proxy = function(t, e) {
            var i = Array.prototype.slice.call(arguments, 2);
            return function() {
                return t.apply(e, Array.prototype.slice.call(arguments, 0).concat(i))
            }
        }
    }(), this.createjs = this.createjs || {}, createjs.indexOf = function(t, e) {
        "use strict";
        for (var i = 0, n = t.length; n > i; i++)
            if (e === t[i]) return i;
        return -1
    }, this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e, i) {
            this.type = t, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!e, this.cancelable = !!i, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1
        }
        var e = t.prototype;
        e.preventDefault = function() {
            this.defaultPrevented = this.cancelable && !0
        }, e.stopPropagation = function() {
            this.propagationStopped = !0
        }, e.stopImmediatePropagation = function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        }, e.remove = function() {
            this.removed = !0
        }, e.clone = function() {
            return new t(this.type, this.bubbles, this.cancelable)
        }, e.set = function(t) {
            for (var e in t) this[e] = t[e];
            return this
        }, e.toString = function() {
            return "[Event (type=" + this.type + ")]"
        }, createjs.Event = t
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e, i) {
            this.Event_constructor("error"), this.title = t, this.message = e, this.data = i
        }
        var e = createjs.extend(t, createjs.Event);
        e.clone = function() {
            return new createjs.ErrorEvent(this.title, this.message, this.data)
        }, createjs.ErrorEvent = createjs.promote(t, "Event")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t() {
            this._listeners = null, this._captureListeners = null
        }
        var e = t.prototype;
        t.initialize = function(t) {
            t.addEventListener = e.addEventListener, t.on = e.on, t.removeEventListener = t.off = e.removeEventListener, t.removeAllEventListeners = e.removeAllEventListeners, t.hasEventListener = e.hasEventListener, t.dispatchEvent = e.dispatchEvent, t._dispatchEvent = e._dispatchEvent, t.willTrigger = e.willTrigger
        }, e.addEventListener = function(t, e, i) {
            var n;
            n = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
            var r = n[t];
            return r && this.removeEventListener(t, e, i), r = n[t], r ? r.push(e) : n[t] = [e], e
        }, e.on = function(t, e, i, n, r, s) {
            return e.handleEvent && (i = i || e, e = e.handleEvent), i = i || this, this.addEventListener(t, function(t) {
                e.call(i, t, r), n && t.remove()
            }, s)
        }, e.removeEventListener = function(t, e, i) {
            var n = i ? this._captureListeners : this._listeners;
            if (n) {
                var r = n[t];
                if (r)
                    for (var s = 0, o = r.length; o > s; s++)
                        if (r[s] == e) {
                            1 == o ? delete n[t] : r.splice(s, 1);
                            break
                        }
            }
        }, e.off = e.removeEventListener, e.removeAllEventListeners = function(t) {
            t ? (this._listeners && delete this._listeners[t], this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null
        }, e.dispatchEvent = function(t, e, i) {
            if ("string" == typeof t) {
                var n = this._listeners;
                if (!(e || n && n[t])) return !0;
                t = new createjs.Event(t, e, i)
            } else t.target && t.clone && (t = t.clone());
            try {
                t.target = this
            } catch (t) {}
            if (t.bubbles && this.parent) {
                for (var r = this, s = [r]; r.parent;) s.push(r = r.parent);
                var o, a = s.length;
                for (o = a - 1; o >= 0 && !t.propagationStopped; o--) s[o]._dispatchEvent(t, 1 + (0 == o));
                for (o = 1; a > o && !t.propagationStopped; o++) s[o]._dispatchEvent(t, 3)
            } else this._dispatchEvent(t, 2);
            return !t.defaultPrevented
        }, e.hasEventListener = function(t) {
            var e = this._listeners,
                i = this._captureListeners;
            return !!(e && e[t] || i && i[t])
        }, e.willTrigger = function(t) {
            for (var e = this; e;) {
                if (e.hasEventListener(t)) return !0;
                e = e.parent
            }
            return !1
        }, e.toString = function() {
            return "[EventDispatcher]"
        }, e._dispatchEvent = function(t, e) {
            var i, n = 1 == e ? this._captureListeners : this._listeners;
            if (t && n) {
                var r = n[t.type];
                if (!r || !(i = r.length)) return;
                try {
                    t.currentTarget = this
                } catch (t) {}
                try {
                    t.eventPhase = e
                } catch (t) {}
                t.removed = !1, r = r.slice();
                for (var s = 0; i > s && !t.immediatePropagationStopped; s++) {
                    var o = r[s];
                    o.handleEvent ? o.handleEvent(t) : o(t), t.removed && (this.off(t.type, o, 1 == e), t.removed = !1)
                }
            }
        }, createjs.EventDispatcher = t
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e) {
            this.Event_constructor("progress"), this.loaded = t, this.total = null == e ? 1 : e, this.progress = 0 == e ? 0 : this.loaded / this.total
        }
        var e = createjs.extend(t, createjs.Event);
        e.clone = function() {
            return new createjs.ProgressEvent(this.loaded, this.total)
        }, createjs.ProgressEvent = createjs.promote(t, "Event")
    }(window),
    function() {
        function t(e, n) {
            function s(t) {
                if (s[t] !== g) return s[t];
                var e;
                if ("bug-string-char-index" == t) e = "a" != "a" [0];
                else if ("json" == t) e = s("json-stringify") && s("json-parse");
                else {
                    var i, r = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                    if ("json-stringify" == t) {
                        var l = n.stringify,
                            c = "function" == typeof l && y;
                        if (c) {
                            (i = function() {
                                return 1
                            }).toJSON = i;
                            try {
                                c = "0" === l(0) && "0" === l(new o) && '""' == l(new a) && l(v) === g && l(g) === g && l() === g && "1" === l(i) && "[1]" == l([i]) && "[null]" == l([g]) && "null" == l(null) && "[null,null,null]" == l([g, v, null]) && l({
                                    a: [i, !0, !1, null, "\0\b\n\f\r\t"]
                                }) == r && "1" === l(null, i) && "[\n 1,\n 2\n]" == l([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == l(new h(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == l(new h(864e13)) && '"-000001-01-01T00:00:00.000Z"' == l(new h(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == l(new h(-1))
                            } catch (t) {
                                c = !1
                            }
                        }
                        e = c
                    }
                    if ("json-parse" == t) {
                        var u = n.parse;
                        if ("function" == typeof u) try {
                            if (0 === u("0") && !u(!1)) {
                                i = u(r);
                                var d = 5 == i.a.length && 1 === i.a[0];
                                if (d) {
                                    try {
                                        d = !u('"\t"')
                                    } catch (t) {}
                                    if (d) try {
                                        d = 1 !== u("01")
                                    } catch (t) {}
                                    if (d) try {
                                        d = 1 !== u("1.")
                                    } catch (t) {}
                                }
                            }
                        } catch (t) {
                            d = !1
                        }
                        e = d
                    }
                }
                return s[t] = !!e
            }
            e || (e = r.Object()), n || (n = r.Object());
            var o = e.Number || r.Number,
                a = e.String || r.String,
                l = e.Object || r.Object,
                h = e.Date || r.Date,
                c = e.SyntaxError || r.SyntaxError,
                u = e.TypeError || r.TypeError,
                d = e.Math || r.Math,
                f = e.JSON || r.JSON;
            "object" == typeof f && f && (n.stringify = f.stringify, n.parse = f.parse);
            var p, m, g, _ = l.prototype,
                v = _.toString,
                y = new h(-0xc782b5b800cec);
            try {
                y = -109252 == y.getUTCFullYear() && 0 === y.getUTCMonth() && 1 === y.getUTCDate() && 10 == y.getUTCHours() && 37 == y.getUTCMinutes() && 6 == y.getUTCSeconds() && 708 == y.getUTCMilliseconds()
            } catch (t) {}
            if (!s("json")) {
                var b = "[object Function]",
                    w = "[object Date]",
                    x = "[object Number]",
                    T = "[object String]",
                    S = "[object Array]",
                    P = "[object Boolean]",
                    k = s("bug-string-char-index");
                if (!y) var C = d.floor,
                    E = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                    A = function(t, e) {
                        return E[e] + 365 * (t - 1970) + C((t - 1969 + (e = +(e > 1))) / 4) - C((t - 1901 + e) / 100) + C((t - 1601 + e) / 400)
                    };
                if ((p = _.hasOwnProperty) || (p = function(t) {
                        var e, i = {};
                        return (i.__proto__ = null, i.__proto__ = {
                            toString: 1
                        }, i).toString != v ? p = function(t) {
                            var e = this.__proto__,
                                i = t in (this.__proto__ = null, this);
                            return this.__proto__ = e, i
                        } : (e = i.constructor, p = function(t) {
                            var i = (this.constructor || e).prototype;
                            return t in this && !(t in i && this[t] === i[t])
                        }), i = null, p.call(this, t)
                    }), m = function(t, e) {
                        var n, r, s, o = 0;
                        (n = function() {
                            this.valueOf = 0
                        }).prototype.valueOf = 0, r = new n;
                        for (s in r) p.call(r, s) && o++;
                        return n = r = null, o ? m = 2 == o ? function(t, e) {
                            var i, n = {},
                                r = v.call(t) == b;
                            for (i in t) r && "prototype" == i || p.call(n, i) || !(n[i] = 1) || !p.call(t, i) || e(i)
                        } : function(t, e) {
                            var i, n, r = v.call(t) == b;
                            for (i in t) r && "prototype" == i || !p.call(t, i) || (n = "constructor" === i) || e(i);
                            (n || p.call(t, i = "constructor")) && e(i)
                        } : (r = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], m = function(t, e) {
                            var n, s, o = v.call(t) == b,
                                a = !o && "function" != typeof t.constructor && i[typeof t.hasOwnProperty] && t.hasOwnProperty || p;
                            for (n in t) o && "prototype" == n || !a.call(t, n) || e(n);
                            for (s = r.length; n = r[--s]; a.call(t, n) && e(n));
                        }), m(t, e)
                    }, !s("json-stringify")) {
                    var R = {
                            92: "\\\\",
                            34: '\\"',
                            8: "\\b",
                            12: "\\f",
                            10: "\\n",
                            13: "\\r",
                            9: "\\t"
                        },
                        j = "000000",
                        O = function(t, e) {
                            return (j + (e || 0)).slice(-t)
                        },
                        L = "\\u00",
                        I = function(t) {
                            for (var e = '"', i = 0, n = t.length, r = !k || n > 10, s = r && (k ? t.split("") : t); n > i; i++) {
                                var o = t.charCodeAt(i);
                                switch (o) {
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 12:
                                    case 13:
                                    case 34:
                                    case 92:
                                        e += R[o];
                                        break;
                                    default:
                                        if (32 > o) {
                                            e += L + O(2, o.toString(16));
                                            break
                                        }
                                        e += r ? s[i] : t.charAt(i)
                                }
                            }
                            return e + '"'
                        },
                        D = function(t, e, i, n, r, s, o) {
                            var a, l, h, c, d, f, _, y, b, k, E, R, j, L, M, N;
                            try {
                                a = e[t]
                            } catch (t) {}
                            if ("object" == typeof a && a)
                                if (l = v.call(a), l != w || p.call(a, "toJSON")) "function" == typeof a.toJSON && (l != x && l != T && l != S || p.call(a, "toJSON")) && (a = a.toJSON(t));
                                else if (a > -1 / 0 && 1 / 0 > a) {
                                if (A) {
                                    for (d = C(a / 864e5), h = C(d / 365.2425) + 1970 - 1; A(h + 1, 0) <= d; h++);
                                    for (c = C((d - A(h, 0)) / 30.42); A(h, c + 1) <= d; c++);
                                    d = 1 + d - A(h, c), f = (a % 864e5 + 864e5) % 864e5, _ = C(f / 36e5) % 24, y = C(f / 6e4) % 60, b = C(f / 1e3) % 60, k = f % 1e3
                                } else h = a.getUTCFullYear(), c = a.getUTCMonth(), d = a.getUTCDate(), _ = a.getUTCHours(), y = a.getUTCMinutes(), b = a.getUTCSeconds(), k = a.getUTCMilliseconds();
                                a = (0 >= h || h >= 1e4 ? (0 > h ? "-" : "+") + O(6, 0 > h ? -h : h) : O(4, h)) + "-" + O(2, c + 1) + "-" + O(2, d) + "T" + O(2, _) + ":" + O(2, y) + ":" + O(2, b) + "." + O(3, k) + "Z"
                            } else a = null;
                            if (i && (a = i.call(e, t, a)), null === a) return "null";
                            if (l = v.call(a), l == P) return "" + a;
                            if (l == x) return a > -1 / 0 && 1 / 0 > a ? "" + a : "null";
                            if (l == T) return I("" + a);
                            if ("object" == typeof a) {
                                for (L = o.length; L--;)
                                    if (o[L] === a) throw u();
                                if (o.push(a), E = [], M = s, s += r, l == S) {
                                    for (j = 0, L = a.length; L > j; j++) R = D(j, a, i, n, r, s, o), E.push(R === g ? "null" : R);
                                    N = E.length ? r ? "[\n" + s + E.join(",\n" + s) + "\n" + M + "]" : "[" + E.join(",") + "]" : "[]"
                                } else m(n || a, function(t) {
                                    var e = D(t, a, i, n, r, s, o);
                                    e !== g && E.push(I(t) + ":" + (r ? " " : "") + e)
                                }), N = E.length ? r ? "{\n" + s + E.join(",\n" + s) + "\n" + M + "}" : "{" + E.join(",") + "}" : "{}";
                                return o.pop(), N
                            }
                        };
                    n.stringify = function(t, e, n) {
                        var r, s, o, a;
                        if (i[typeof e] && e)
                            if ((a = v.call(e)) == b) s = e;
                            else if (a == S) {
                            o = {};
                            for (var l, h = 0, c = e.length; c > h; l = e[h++], a = v.call(l), (a == T || a == x) && (o[l] = 1));
                        }
                        if (n)
                            if ((a = v.call(n)) == x) {
                                if ((n -= n % 1) > 0)
                                    for (r = "", n > 10 && (n = 10); r.length < n; r += " ");
                            } else a == T && (r = n.length <= 10 ? n : n.slice(0, 10));
                        return D("", (l = {}, l[""] = t, l), s, o, r, "", [])
                    }
                }
                if (!s("json-parse")) {
                    var M, N, q = a.fromCharCode,
                        $ = {
                            92: "\\",
                            34: '"',
                            47: "/",
                            98: "\b",
                            116: "\t",
                            110: "\n",
                            102: "\f",
                            114: "\r"
                        },
                        F = function() {
                            throw M = N = null, c()
                        },
                        z = function() {
                            for (var t, e, i, n, r, s = N, o = s.length; o > M;) switch (r = s.charCodeAt(M)) {
                                case 9:
                                case 10:
                                case 13:
                                case 32:
                                    M++;
                                    break;
                                case 123:
                                case 125:
                                case 91:
                                case 93:
                                case 58:
                                case 44:
                                    return t = k ? s.charAt(M) : s[M], M++, t;
                                case 34:
                                    for (t = "@", M++; o > M;)
                                        if (r = s.charCodeAt(M), 32 > r) F();
                                        else if (92 == r) switch (r = s.charCodeAt(++M)) {
                                        case 92:
                                        case 34:
                                        case 47:
                                        case 98:
                                        case 116:
                                        case 110:
                                        case 102:
                                        case 114:
                                            t += $[r], M++;
                                            break;
                                        case 117:
                                            for (e = ++M, i = M + 4; i > M; M++) r = s.charCodeAt(M), r >= 48 && 57 >= r || r >= 97 && 102 >= r || r >= 65 && 70 >= r || F();
                                            t += q("0x" + s.slice(e, M));
                                            break;
                                        default:
                                            F()
                                    } else {
                                        if (34 == r) break;
                                        for (r = s.charCodeAt(M), e = M; r >= 32 && 92 != r && 34 != r;) r = s.charCodeAt(++M);
                                        t += s.slice(e, M)
                                    }
                                    if (34 == s.charCodeAt(M)) return M++, t;
                                    F();
                                default:
                                    if (e = M, 45 == r && (n = !0, r = s.charCodeAt(++M)), r >= 48 && 57 >= r) {
                                        for (48 == r && (r = s.charCodeAt(M + 1), r >= 48 && 57 >= r) && F(), n = !1; o > M && (r = s.charCodeAt(M), r >= 48 && 57 >= r); M++);
                                        if (46 == s.charCodeAt(M)) {
                                            for (i = ++M; o > i && (r = s.charCodeAt(i), r >= 48 && 57 >= r); i++);
                                            i == M && F(), M = i
                                        }
                                        if (r = s.charCodeAt(M), 101 == r || 69 == r) {
                                            for (r = s.charCodeAt(++M), (43 == r || 45 == r) && M++, i = M; o > i && (r = s.charCodeAt(i), r >= 48 && 57 >= r); i++);
                                            i == M && F(), M = i
                                        }
                                        return +s.slice(e, M)
                                    }
                                    if (n && F(), "true" == s.slice(M, M + 4)) return M += 4, !0;
                                    if ("false" == s.slice(M, M + 5)) return M += 5, !1;
                                    if ("null" == s.slice(M, M + 4)) return M += 4, null;
                                    F()
                            }
                            return "$"
                        },
                        B = function(t) {
                            var e, i;
                            if ("$" == t && F(), "string" == typeof t) {
                                if ("@" == (k ? t.charAt(0) : t[0])) return t.slice(1);
                                if ("[" == t) {
                                    for (e = []; t = z(), "]" != t; i || (i = !0)) i && ("," == t ? (t = z(), "]" == t && F()) : F()), "," == t && F(), e.push(B(t));
                                    return e
                                }
                                if ("{" == t) {
                                    for (e = {}; t = z(), "}" != t; i || (i = !0)) i && ("," == t ? (t = z(), "}" == t && F()) : F()), ("," == t || "string" != typeof t || "@" != (k ? t.charAt(0) : t[0]) || ":" != z()) && F(), e[t.slice(1)] = B(z());
                                    return e
                                }
                                F()
                            }
                            return t
                        },
                        H = function(t, e, i) {
                            var n = U(t, e, i);
                            n === g ? delete t[e] : t[e] = n
                        },
                        U = function(t, e, i) {
                            var n, r = t[e];
                            if ("object" == typeof r && r)
                                if (v.call(r) == S)
                                    for (n = r.length; n--;) H(r, n, i);
                                else m(r, function(t) {
                                    H(r, t, i)
                                });
                            return i.call(t, e, r)
                        };
                    n.parse = function(t, e) {
                        var i, n;
                        return M = 0, N = "" + t, i = B(z()), "$" != z() && F(), M = N = null, e && v.call(e) == b ? U((n = {}, n[""] = i, n), "", e) : i
                    }
                }
            }
            return n.runInContext = t, n
        }
        var e = "function" == typeof define && define.amd,
            i = {
                function: !0,
                object: !0
            },
            n = i[typeof exports] && exports && !exports.nodeType && exports,
            r = i[typeof window] && window || this,
            s = n && i[typeof module] && module && !module.nodeType && "object" == typeof global && global;
        if (!s || s.global !== s && s.window !== s && s.self !== s || (r = s), n && !e) t(r, n);
        else {
            var o = r.JSON,
                a = r.JSON3,
                l = !1,
                h = t(r, r.JSON3 = {
                    noConflict: function() {
                        return l || (l = !0, r.JSON = o, r.JSON3 = a, o = a = null), h
                    }
                });
            r.JSON = {
                parse: h.parse,
                stringify: h.stringify
            }
        }
        e && define("preloadjs", [], function() {
            return h
        })
    }.call(this),
    function() {
        var t = {};
        t.appendToHead = function(e) {
            t.getHead().appendChild(e)
        }, t.getHead = function() {
            return document.head || document.getElementsByTagName("head")[0]
        }, t.getBody = function() {
            return document.body || document.getElementsByTagName("body")[0]
        }, createjs.DomUtils = t
    }(),
    function() {
        var t = {};
        t.parseXML = function(t, e) {
            var i = null;
            try {
                if (window.DOMParser) {
                    var n = new DOMParser;
                    i = n.parseFromString(t, e)
                }
            } catch (t) {}
            if (!i) try {
                i = new ActiveXObject("Microsoft.XMLDOM"),
                    i.async = !1, i.loadXML(t)
            } catch (t) {
                i = null
            }
            return i
        }, t.parseJSON = function(t) {
            if (null == t) return null;
            try {
                return JSON.parse(t)
            } catch (t) {
                throw t
            }
        }, createjs.DataUtils = t
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t() {
            this.src = null, this.type = null, this.id = null, this.maintainOrder = !1, this.callback = null, this.data = null, this.method = createjs.LoadItem.GET, this.values = null, this.headers = null, this.withCredentials = !1, this.mimeType = null, this.crossOrigin = null, this.loadTimeout = i.LOAD_TIMEOUT_DEFAULT
        }
        var e = t.prototype = {},
            i = t;
        i.LOAD_TIMEOUT_DEFAULT = 8e3, i.create = function(e) {
            if ("string" == typeof e) {
                var n = new t;
                return n.src = e, n
            }
            if (e instanceof i) return e;
            if (e instanceof Object && e.src) return null == e.loadTimeout && (e.loadTimeout = i.LOAD_TIMEOUT_DEFAULT), e;
            throw new Error("Type not recognized.")
        }, e.set = function(t) {
            for (var e in t) this[e] = t[e];
            return this
        }, createjs.LoadItem = i
    }(),
    function() {
        var t = {};
        t.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i, t.RELATIVE_PATT = /^[.\/]*?\//i, t.EXTENSION_PATT = /\/?[^\/]+\.(\w{1,5})$/i, t.parseURI = function(e) {
            var i = {
                absolute: !1,
                relative: !1
            };
            if (null == e) return i;
            var n = e.indexOf("?");
            n > -1 && (e = e.substr(0, n));
            var r;
            return t.ABSOLUTE_PATT.test(e) ? i.absolute = !0 : t.RELATIVE_PATT.test(e) && (i.relative = !0), (r = e.match(t.EXTENSION_PATT)) && (i.extension = r[1].toLowerCase()), i
        }, t.formatQueryString = function(t, e) {
            if (null == t) throw new Error("You must specify data.");
            var i = [];
            for (var n in t) i.push(n + "=" + escape(t[n]));
            return e && (i = i.concat(e)), i.join("&")
        }, t.buildPath = function(t, e) {
            if (null == e) return t;
            var i = [],
                n = t.indexOf("?");
            if (-1 != n) {
                var r = t.slice(n + 1);
                i = i.concat(r.split("&"))
            }
            return -1 != n ? t.slice(0, n) + "?" + this.formatQueryString(e, i) : t + "?" + this.formatQueryString(e, i)
        }, t.isCrossDomain = function(t) {
            var e = document.createElement("a");
            e.href = t.src;
            var i = document.createElement("a");
            i.href = location.href;
            var n = "" != e.hostname && (e.port != i.port || e.protocol != i.protocol || e.hostname != i.hostname);
            return n
        }, t.isLocal = function(t) {
            var e = document.createElement("a");
            return e.href = t.src, "" == e.hostname && "file:" == e.protocol
        }, t.isBinary = function(t) {
            switch (t) {
                case createjs.AbstractLoader.IMAGE:
                case createjs.AbstractLoader.BINARY:
                    return !0;
                default:
                    return !1
            }
        }, t.isImageTag = function(t) {
            return t instanceof HTMLImageElement
        }, t.isAudioTag = function(t) {
            return !!window.HTMLAudioElement && t instanceof HTMLAudioElement
        }, t.isVideoTag = function(t) {
            return !!window.HTMLVideoElement && t instanceof HTMLVideoElement
        }, t.isText = function(t) {
            switch (t) {
                case createjs.AbstractLoader.TEXT:
                case createjs.AbstractLoader.JSON:
                case createjs.AbstractLoader.MANIFEST:
                case createjs.AbstractLoader.XML:
                case createjs.AbstractLoader.CSS:
                case createjs.AbstractLoader.SVG:
                case createjs.AbstractLoader.JAVASCRIPT:
                case createjs.AbstractLoader.SPRITESHEET:
                    return !0;
                default:
                    return !1
            }
        }, t.getTypeByExtension = function(t) {
            if (null == t) return createjs.AbstractLoader.TEXT;
            switch (t.toLowerCase()) {
                case "jpeg":
                case "jpg":
                case "gif":
                case "png":
                case "webp":
                case "bmp":
                    return createjs.AbstractLoader.IMAGE;
                case "ogg":
                case "mp3":
                case "webm":
                    return createjs.AbstractLoader.SOUND;
                case "mp4":
                case "webm":
                case "ts":
                    return createjs.AbstractLoader.VIDEO;
                case "json":
                    return createjs.AbstractLoader.JSON;
                case "xml":
                    return createjs.AbstractLoader.XML;
                case "css":
                    return createjs.AbstractLoader.CSS;
                case "js":
                    return createjs.AbstractLoader.JAVASCRIPT;
                case "svg":
                    return createjs.AbstractLoader.SVG;
                default:
                    return createjs.AbstractLoader.TEXT
            }
        }, createjs.RequestUtils = t
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e, i) {
            this.EventDispatcher_constructor(), this.loaded = !1, this.canceled = !1, this.progress = 0, this.type = i, this.resultFormatter = null, this._item = t ? createjs.LoadItem.create(t) : null, this._preferXHR = e, this._result = null, this._rawResult = null, this._loadedItems = null, this._tagSrcAttribute = null, this._tag = null
        }
        var e = createjs.extend(t, createjs.EventDispatcher),
            i = t;
        i.POST = "POST", i.GET = "GET", i.BINARY = "binary", i.CSS = "css", i.IMAGE = "image", i.JAVASCRIPT = "javascript", i.JSON = "json", i.JSONP = "jsonp", i.MANIFEST = "manifest", i.SOUND = "sound", i.VIDEO = "video", i.SPRITESHEET = "spritesheet", i.SVG = "svg", i.TEXT = "text", i.XML = "xml", e.getItem = function() {
            return this._item
        }, e.getResult = function(t) {
            return t ? this._rawResult : this._result
        }, e.getTag = function() {
            return this._tag
        }, e.setTag = function(t) {
            this._tag = t
        }, e.load = function() {
            this._createRequest(), this._request.on("complete", this, this), this._request.on("progress", this, this), this._request.on("loadStart", this, this), this._request.on("abort", this, this), this._request.on("timeout", this, this), this._request.on("error", this, this);
            var t = new createjs.Event("initialize");
            t.loader = this._request, this.dispatchEvent(t), this._request.load()
        }, e.cancel = function() {
            this.canceled = !0, this.destroy()
        }, e.destroy = function() {
            this._request && (this._request.removeAllEventListeners(), this._request.destroy()), this._request = null, this._item = null, this._rawResult = null, this._result = null, this._loadItems = null, this.removeAllEventListeners()
        }, e.getLoadedItems = function() {
            return this._loadedItems
        }, e._createRequest = function() {
            this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
        }, e._createTag = function() {
            return null
        }, e._sendLoadStart = function() {
            this._isCanceled() || this.dispatchEvent("loadstart")
        }, e._sendProgress = function(t) {
            if (!this._isCanceled()) {
                var e = null;
                "number" == typeof t ? (this.progress = t, e = new createjs.ProgressEvent(this.progress)) : (e = t, this.progress = t.loaded / t.total, e.progress = this.progress, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0)), this.hasEventListener("progress") && this.dispatchEvent(e)
            }
        }, e._sendComplete = function() {
            if (!this._isCanceled()) {
                this.loaded = !0;
                var t = new createjs.Event("complete");
                t.rawResult = this._rawResult, null != this._result && (t.result = this._result), this.dispatchEvent(t)
            }
        }, e._sendError = function(t) {
            !this._isCanceled() && this.hasEventListener("error") && (null == t && (t = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")), this.dispatchEvent(t))
        }, e._isCanceled = function() {
            return !(null != window.createjs && !this.canceled)
        }, e.resultFormatter = null, e.handleEvent = function(t) {
            switch (t.type) {
                case "complete":
                    this._rawResult = t.target._response;
                    var e = this.resultFormatter && this.resultFormatter(this);
                    e instanceof Function ? e.call(this, createjs.proxy(this._resultFormatSuccess, this), createjs.proxy(this._resultFormatFailed, this)) : (this._result = e || this._rawResult, this._sendComplete());
                    break;
                case "progress":
                    this._sendProgress(t);
                    break;
                case "error":
                    this._sendError(t);
                    break;
                case "loadstart":
                    this._sendLoadStart();
                    break;
                case "abort":
                case "timeout":
                    this._isCanceled() || this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_" + t.type.toUpperCase() + "_ERROR"))
            }
        }, e._resultFormatSuccess = function(t) {
            this._result = t, this._sendComplete()
        }, e._resultFormatFailed = function(t) {
            this._sendError(t)
        }, e.buildPath = function(t, e) {
            return createjs.RequestUtils.buildPath(t, e)
        }, e.toString = function() {
            return "[PreloadJS AbstractLoader]"
        }, createjs.AbstractLoader = createjs.promote(t, "EventDispatcher")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e, i) {
            this.AbstractLoader_constructor(t, e, i), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", this.on("initialize", this._updateXHR, this)
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        e.load = function() {
            this._tag || (this._tag = this._createTag(this._item.src)), this._tag.preload = "auto", this._tag.load(), this.AbstractLoader_load()
        }, e._createTag = function() {}, e._createRequest = function() {
            this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
        }, e._updateXHR = function(t) {
            t.loader.setResponseType && t.loader.setResponseType("blob")
        }, e._formatResult = function(t) {
            if (this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR) {
                var e = window.URL || window.webkitURL,
                    i = t.getResult(!0);
                t.getTag().src = e.createObjectURL(i)
            }
            return t.getTag()
        }, createjs.AbstractMediaLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";
        var t = function(t) {
                this._item = t
            },
            e = createjs.extend(t, createjs.EventDispatcher);
        e.load = function() {}, e.destroy = function() {}, e.cancel = function() {}, createjs.AbstractRequest = createjs.promote(t, "EventDispatcher")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e, i) {
            this.AbstractRequest_constructor(t), this._tag = e, this._tagSrcAttribute = i, this._loadedHandler = createjs.proxy(this._handleTagComplete, this), this._addedToDOM = !1, this._startTagVisibility = null
        }
        var e = createjs.extend(t, createjs.AbstractRequest);
        e.load = function() {
            this._tag.onload = createjs.proxy(this._handleTagComplete, this), this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this), this._tag.onerror = createjs.proxy(this._handleError, this);
            var t = new createjs.Event("initialize");
            t.loader = this._tag, this.dispatchEvent(t), this._hideTag(), this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout), this._tag[this._tagSrcAttribute] = this._item.src, null == this._tag.parentNode && (window.document.body.appendChild(this._tag), this._addedToDOM = !0)
        }, e.destroy = function() {
            this._clean(), this._tag = null, this.AbstractRequest_destroy()
        }, e._handleReadyStateChange = function() {
            clearTimeout(this._loadTimeout);
            var t = this._tag;
            ("loaded" == t.readyState || "complete" == t.readyState) && this._handleTagComplete()
        }, e._handleError = function() {
            this._clean(), this.dispatchEvent("error")
        }, e._handleTagComplete = function() {
            this._rawResult = this._tag, this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult, this._clean(), this._showTag(), this.dispatchEvent("complete")
        }, e._handleTimeout = function() {
            this._clean(), this.dispatchEvent(new createjs.Event("timeout"))
        }, e._clean = function() {
            this._tag.onload = null, this._tag.onreadystatechange = null, this._tag.onerror = null, this._addedToDOM && null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag), clearTimeout(this._loadTimeout)
        }, e._hideTag = function() {
            this._startTagVisibility = this._tag.style.visibility, this._tag.style.visibility = "hidden"
        }, e._showTag = function() {
            this._tag.style.visibility = this._startTagVisibility
        }, e._handleStalled = function() {}, createjs.TagRequest = createjs.promote(t, "AbstractRequest")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e, i) {
            this.AbstractRequest_constructor(t), this._tag = e, this._tagSrcAttribute = i, this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
        }
        var e = createjs.extend(t, createjs.TagRequest);
        e.load = function() {
            var t = createjs.proxy(this._handleStalled, this);
            this._stalledCallback = t;
            var e = createjs.proxy(this._handleProgress, this);
            this._handleProgress = e, this._tag.addEventListener("stalled", t), this._tag.addEventListener("progress", e), this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1), this.TagRequest_load()
        }, e._handleReadyStateChange = function() {
            clearTimeout(this._loadTimeout);
            var t = this._tag;
            ("loaded" == t.readyState || "complete" == t.readyState) && this._handleTagComplete()
        }, e._handleStalled = function() {}, e._handleProgress = function(t) {
            if (t && !(t.loaded > 0 && 0 == t.total)) {
                var e = new createjs.ProgressEvent(t.loaded, t.total);
                this.dispatchEvent(e)
            }
        }, e._clean = function() {
            this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.removeEventListener("stalled", this._stalledCallback), this._tag.removeEventListener("progress", this._progressCallback), this.TagRequest__clean()
        }, createjs.MediaTagRequest = createjs.promote(t, "TagRequest")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t) {
            this.AbstractRequest_constructor(t), this._request = null, this._loadTimeout = null, this._xhrLevel = 1, this._response = null, this._rawResponse = null, this._canceled = !1, this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this), this._handleProgressProxy = createjs.proxy(this._handleProgress, this), this._handleAbortProxy = createjs.proxy(this._handleAbort, this), this._handleErrorProxy = createjs.proxy(this._handleError, this), this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this), this._handleLoadProxy = createjs.proxy(this._handleLoad, this), this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this), !this._createXHR(t)
        }
        var e = createjs.extend(t, createjs.AbstractRequest);
        t.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], e.getResult = function(t) {
            return t && this._rawResponse ? this._rawResponse : this._response
        }, e.cancel = function() {
            this.canceled = !0, this._clean(), this._request.abort()
        }, e.load = function() {
            if (null == this._request) return void this._handleError();
            null != this._request.addEventListener ? (this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1), this._request.addEventListener("progress", this._handleProgressProxy, !1), this._request.addEventListener("abort", this._handleAbortProxy, !1), this._request.addEventListener("error", this._handleErrorProxy, !1), this._request.addEventListener("timeout", this._handleTimeoutProxy, !1), this._request.addEventListener("load", this._handleLoadProxy, !1), this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1)) : (this._request.onloadstart = this._handleLoadStartProxy, this._request.onprogress = this._handleProgressProxy, this._request.onabort = this._handleAbortProxy, this._request.onerror = this._handleErrorProxy, this._request.ontimeout = this._handleTimeoutProxy, this._request.onload = this._handleLoadProxy, this._request.onreadystatechange = this._handleReadyStateChangeProxy), 1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));
            try {
                this._item.values && this._item.method != createjs.AbstractLoader.GET ? this._item.method == createjs.AbstractLoader.POST && this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)) : this._request.send()
            } catch (t) {
                this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, t))
            }
        }, e.setResponseType = function(t) {
            "blob" === t && (t = window.URL ? "blob" : "arraybuffer", this._responseType = t), this._request.responseType = t
        }, e.getAllResponseHeaders = function() {
            return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
        }, e.getResponseHeader = function(t) {
            return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(t) : null
        }, e._handleProgress = function(t) {
            if (t && !(t.loaded > 0 && 0 == t.total)) {
                var e = new createjs.ProgressEvent(t.loaded, t.total);
                this.dispatchEvent(e)
            }
        }, e._handleLoadStart = function() {
            clearTimeout(this._loadTimeout), this.dispatchEvent("loadstart")
        }, e._handleAbort = function(t) {
            this._clean(), this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, t))
        }, e._handleError = function(t) {
            this._clean(), this.dispatchEvent(new createjs.ErrorEvent(t.message))
        }, e._handleReadyStateChange = function() {
            4 == this._request.readyState && this._handleLoad()
        }, e._handleLoad = function() {
            if (!this.loaded) {
                this.loaded = !0;
                var t = this._checkError();
                if (t) return void this._handleError(t);
                if (this._response = this._getResponse(), "arraybuffer" === this._responseType) try {
                    this._response = new Blob([this._response])
                } catch (t) {
                    if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, "TypeError" === t.name && window.BlobBuilder) {
                        var e = new BlobBuilder;
                        e.append(this._response), this._response = e.getBlob()
                    }
                }
                this._clean(), this.dispatchEvent(new createjs.Event("complete"))
            }
        }, e._handleTimeout = function(t) {
            this._clean(), this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, t))
        }, e._checkError = function() {
            var t = parseInt(this._request.status);
            switch (t) {
                case 404:
                case 0:
                    return new Error(t)
            }
            return null
        }, e._getResponse = function() {
            if (null != this._response) return this._response;
            if (null != this._request.response) return this._request.response;
            try {
                if (null != this._request.responseText) return this._request.responseText
            } catch (t) {}
            try {
                if (null != this._request.responseXML) return this._request.responseXML
            } catch (t) {}
            return null
        }, e._createXHR = function(t) {
            var e = createjs.RequestUtils.isCrossDomain(t),
                i = {},
                n = null;
            if (window.XMLHttpRequest) n = new XMLHttpRequest, e && void 0 === n.withCredentials && window.XDomainRequest && (n = new XDomainRequest);
            else {
                for (var r = 0, o = s.ACTIVEX_VERSIONS.length; o > r; r++) {
                    var a = s.ACTIVEX_VERSIONS[r];
                    try {
                        n = new ActiveXObject(a);
                        break
                    } catch (t) {}
                }
                if (null == n) return !1
            }
            null == t.mimeType && createjs.RequestUtils.isText(t.type) && (t.mimeType = "text/plain; charset=utf-8"), t.mimeType && n.overrideMimeType && n.overrideMimeType(t.mimeType), this._xhrLevel = "string" == typeof n.responseType ? 2 : 1;
            var l = null;
            if (l = t.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(t.src, t.values) : t.src, n.open(t.method || createjs.AbstractLoader.GET, l, !0), e && n instanceof XMLHttpRequest && 1 == this._xhrLevel && (i.Origin = location.origin), t.values && t.method == createjs.AbstractLoader.POST && (i["Content-Type"] = "application/x-www-form-urlencoded"), e || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), t.headers)
                for (var h in t.headers) i[h] = t.headers[h];
            for (h in i) n.setRequestHeader(h, i[h]);
            return n instanceof XMLHttpRequest && void 0 !== t.withCredentials && (n.withCredentials = t.withCredentials), this._request = n, !0
        }, e._clean = function() {
            clearTimeout(this._loadTimeout), null != this._request.removeEventListener ? (this._request.removeEventListener("loadstart", this._handleLoadStartProxy), this._request.removeEventListener("progress", this._handleProgressProxy), this._request.removeEventListener("abort", this._handleAbortProxy), this._request.removeEventListener("error", this._handleErrorProxy), this._request.removeEventListener("timeout", this._handleTimeoutProxy), this._request.removeEventListener("load", this._handleLoadProxy), this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)) : (this._request.onloadstart = null, this._request.onprogress = null, this._request.onabort = null, this._request.onerror = null, this._request.ontimeout = null, this._request.onload = null, this._request.onreadystatechange = null)
        }, e.toString = function() {
            return "[PreloadJS XHRRequest]"
        }, createjs.XHRRequest = createjs.promote(t, "AbstractRequest")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e, i) {
            this.AbstractLoader_constructor(), this._plugins = [], this._typeCallbacks = {}, this._extensionCallbacks = {}, this.next = null, this.maintainScriptOrder = !0, this.stopOnError = !1, this._maxConnections = 1, this._availableLoaders = [createjs.ImageLoader, createjs.JavaScriptLoader, createjs.CSSLoader, createjs.JSONLoader, createjs.JSONPLoader, createjs.SoundLoader, createjs.ManifestLoader, createjs.SpriteSheetLoader, createjs.XMLLoader, createjs.SVGLoader, createjs.BinaryLoader, createjs.VideoLoader, createjs.TextLoader], this._defaultLoaderLength = this._availableLoaders.length, this.init(t, e, i)
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        e.init = function(t, e, i) {
            this.useXHR = !0, this.preferXHR = !0, this._preferXHR = !0, this.setPreferXHR(t), this._paused = !1, this._basePath = e, this._crossOrigin = i, this._loadStartWasDispatched = !1, this._currentlyLoadingScript = null, this._currentLoads = [], this._loadQueue = [], this._loadQueueBackup = [], this._loadItemsById = {}, this._loadItemsBySrc = {}, this._loadedResults = {}, this._loadedRawResults = {}, this._numItems = 0, this._numItemsLoaded = 0, this._scriptOrder = [], this._loadedScripts = [], this._lastProgress = NaN
        }, i.loadTimeout = 8e3, i.LOAD_TIMEOUT = 0, i.BINARY = createjs.AbstractLoader.BINARY, i.CSS = createjs.AbstractLoader.CSS, i.IMAGE = createjs.AbstractLoader.IMAGE, i.JAVASCRIPT = createjs.AbstractLoader.JAVASCRIPT, i.JSON = createjs.AbstractLoader.JSON, i.JSONP = createjs.AbstractLoader.JSONP, i.MANIFEST = createjs.AbstractLoader.MANIFEST, i.SOUND = createjs.AbstractLoader.SOUND, i.VIDEO = createjs.AbstractLoader.VIDEO, i.SVG = createjs.AbstractLoader.SVG, i.TEXT = createjs.AbstractLoader.TEXT, i.XML = createjs.AbstractLoader.XML, i.POST = createjs.AbstractLoader.POST, i.GET = createjs.AbstractLoader.GET, e.registerLoader = function(t) {
            if (!t || !t.canLoadItem) throw new Error("loader is of an incorrect type.");
            if (-1 != this._availableLoaders.indexOf(t)) throw new Error("loader already exists.");
            this._availableLoaders.unshift(t)
        }, e.unregisterLoader = function(t) {
            var e = this._availableLoaders.indexOf(t); - 1 != e && e < this._defaultLoaderLength - 1 && this._availableLoaders.splice(e, 1)
        }, e.setUseXHR = function(t) {
            return this.setPreferXHR(t)
        }, e.setPreferXHR = function(t) {
            return this.preferXHR = 0 != t && null != window.XMLHttpRequest, this.preferXHR
        }, e.removeAll = function() {
            this.remove()
        }, e.remove = function(t) {
            var e = null;
            if (t && !Array.isArray(t)) e = [t];
            else if (t) e = t;
            else if (arguments.length > 0) return;
            var i = !1;
            if (e) {
                for (; e.length;) {
                    var n = e.pop(),
                        r = this.getResult(n);
                    for (s = this._loadQueue.length - 1; s >= 0; s--)
                        if (o = this._loadQueue[s].getItem(), o.id == n || o.src == n) {
                            this._loadQueue.splice(s, 1)[0].cancel();
                            break
                        }
                    for (s = this._loadQueueBackup.length - 1; s >= 0; s--)
                        if (o = this._loadQueueBackup[s].getItem(), o.id == n || o.src == n) {
                            this._loadQueueBackup.splice(s, 1)[0].cancel();
                            break
                        }
                    if (r) this._disposeItem(this.getItem(n));
                    else
                        for (var s = this._currentLoads.length - 1; s >= 0; s--) {
                            var o = this._currentLoads[s].getItem();
                            if (o.id == n || o.src == n) {
                                this._currentLoads.splice(s, 1)[0].cancel(), i = !0;
                                break
                            }
                        }
                }
                i && this._loadNext()
            } else {
                this.close();
                for (var a in this._loadItemsById) this._disposeItem(this._loadItemsById[a]);
                this.init(this.preferXHR, this._basePath)
            }
        }, e.reset = function() {
            this.close();
            for (var t in this._loadItemsById) this._disposeItem(this._loadItemsById[t]);
            for (var e = [], i = 0, n = this._loadQueueBackup.length; n > i; i++) e.push(this._loadQueueBackup[i].getItem());
            this.loadManifest(e, !1)
        }, e.installPlugin = function(t) {
            if (null != t && null != t.getPreloadHandlers) {
                this._plugins.push(t);
                var e = t.getPreloadHandlers();
                if (e.scope = t, null != e.types)
                    for (var i = 0, n = e.types.length; n > i; i++) this._typeCallbacks[e.types[i]] = e;
                if (null != e.extensions)
                    for (i = 0, n = e.extensions.length; n > i; i++) this._extensionCallbacks[e.extensions[i]] = e
            }
        }, e.setMaxConnections = function(t) {
            this._maxConnections = t, !this._paused && this._loadQueue.length > 0 && this._loadNext()
        }, e.loadFile = function(t, e, i) {
            if (null == t) {
                var n = new createjs.ErrorEvent("PRELOAD_NO_FILE");
                return void this._sendError(n)
            }
            this._addItem(t, null, i), this.setPaused(e === !1)
        }, e.loadManifest = function(t, e, n) {
            var r = null,
                s = null;
            if (Array.isArray(t)) {
                if (0 == t.length) {
                    var o = new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");
                    return void this._sendError(o)
                }
                r = t
            } else if ("string" == typeof t) r = [{
                src: t,
                type: i.MANIFEST
            }];
            else {
                if ("object" != typeof t) {
                    var o = new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");
                    return void this._sendError(o)
                }
                if (void 0 !== t.src) {
                    if (null == t.type) t.type = i.MANIFEST;
                    else if (t.type != i.MANIFEST) {
                        var o = new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");
                        this._sendError(o)
                    }
                    r = [t]
                } else void 0 !== t.manifest && (r = t.manifest, s = t.path)
            }
            for (var a = 0, l = r.length; l > a; a++) this._addItem(r[a], s, n);
            this.setPaused(e === !1)
        }, e.load = function() {
            this.setPaused(!1)
        }, e.getItem = function(t) {
            return this._loadItemsById[t] || this._loadItemsBySrc[t]
        }, e.getResult = function(t, e) {
            var i = this._loadItemsById[t] || this._loadItemsBySrc[t];
            if (null == i) return null;
            var n = i.id;
            return e && this._loadedRawResults[n] ? this._loadedRawResults[n] : this._loadedResults[n]
        }, e.getItems = function(t) {
            var e = [];
            for (var i in this._loadItemsById) {
                var n = this._loadItemsById[i],
                    r = this.getResult(i);
                (t !== !0 || null != r) && e.push({
                    item: n,
                    result: r,
                    rawResult: this.getResult(i, !0)
                })
            }
            return e
        }, e.setPaused = function(t) {
            this._paused = t, this._paused || this._loadNext()
        }, e.close = function() {
            for (; this._currentLoads.length;) this._currentLoads.pop().cancel();
            this._scriptOrder.length = 0, this._loadedScripts.length = 0, this.loadStartWasDispatched = !1, this._itemCount = 0, this._lastProgress = NaN
        }, e._addItem = function(t, e, i) {
            var n = this._createLoadItem(t, e, i);
            if (null != n) {
                var r = this._createLoader(n);
                null != r && ("plugins" in r && (r.plugins = this._plugins), n._loader = r, this._loadQueue.push(r), this._loadQueueBackup.push(r), this._numItems++, this._updateProgress(), (this.maintainScriptOrder && n.type == createjs.LoadQueue.JAVASCRIPT || n.maintainOrder === !0) && (this._scriptOrder.push(n), this._loadedScripts.push(null)))
            }
        }, e._createLoadItem = function(t, e, i) {
            var n = createjs.LoadItem.create(t);
            if (null == n) return null;
            var r = "",
                s = i || this._basePath;
            if (n.src instanceof Object) {
                if (!n.type) return null;
                if (e) {
                    r = e;
                    var o = createjs.RequestUtils.parseURI(e);
                    null == s || o.absolute || o.relative || (r = s + r)
                } else null != s && (r = s)
            } else {
                var a = createjs.RequestUtils.parseURI(n.src);
                a.extension && (n.ext = a.extension), null == n.type && (n.type = createjs.RequestUtils.getTypeByExtension(n.ext));
                var l = n.src;
                if (!a.absolute && !a.relative)
                    if (e) {
                        r = e;
                        var o = createjs.RequestUtils.parseURI(e);
                        l = e + l, null == s || o.absolute || o.relative || (r = s + r)
                    } else null != s && (r = s);
                n.src = r + n.src
            }
            n.path = r, (void 0 === n.id || null === n.id || "" === n.id) && (n.id = l);
            var h = this._typeCallbacks[n.type] || this._extensionCallbacks[n.ext];
            if (h) {
                var c = h.callback.call(h.scope, n, this);
                if (c === !1) return null;
                c === !0 || null != c && (n._loader = c), a = createjs.RequestUtils.parseURI(n.src), null != a.extension && (n.ext = a.extension)
            }
            return this._loadItemsById[n.id] = n, this._loadItemsBySrc[n.src] = n, null == n.crossOrigin && (n.crossOrigin = this._crossOrigin), n
        }, e._createLoader = function(t) {
            if (null != t._loader) return t._loader;
            for (var e = this.preferXHR, i = 0; i < this._availableLoaders.length; i++) {
                var n = this._availableLoaders[i];
                if (n && n.canLoadItem(t)) return new n(t, e)
            }
            return null
        }, e._loadNext = function() {
            if (!this._paused) {
                this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = !0), this._numItems == this._numItemsLoaded ? (this.loaded = !0, this._sendComplete(), this.next && this.next.load && this.next.load()) : this.loaded = !1;
                for (var t = 0; t < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); t++) {
                    var e = this._loadQueue[t];
                    this._canStartLoad(e) && (this._loadQueue.splice(t, 1), t--, this._loadItem(e))
                }
            }
        }, e._loadItem = function(t) {
            t.on("fileload", this._handleFileLoad, this), t.on("progress", this._handleProgress, this), t.on("complete", this._handleFileComplete, this), t.on("error", this._handleError, this), t.on("fileerror", this._handleFileError, this), this._currentLoads.push(t), this._sendFileStart(t.getItem()), t.load()
        }, e._handleFileLoad = function(t) {
            t.target = null, this.dispatchEvent(t)
        }, e._handleFileError = function(t) {
            var e = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, t.item);
            this._sendError(e)
        }, e._handleError = function(t) {
            var e = t.target;
            this._numItemsLoaded++, this._finishOrderedItem(e, !0), this._updateProgress();
            var i = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, e.getItem());
            this._sendError(i), this.stopOnError ? this.setPaused(!0) : (this._removeLoadItem(e), this._cleanLoadItem(e), this._loadNext())
        }, e._handleFileComplete = function(t) {
            var e = t.target,
                i = e.getItem(),
                n = e.getResult();
            this._loadedResults[i.id] = n;
            var r = e.getResult(!0);
            null != r && r !== n && (this._loadedRawResults[i.id] = r), this._saveLoadedItems(e), this._removeLoadItem(e), this._finishOrderedItem(e) || this._processFinishedLoad(i, e), this._cleanLoadItem(e)
        }, e._saveLoadedItems = function(t) {
            var e = t.getLoadedItems();
            if (null !== e)
                for (var i = 0; i < e.length; i++) {
                    var n = e[i].item;
                    this._loadItemsBySrc[n.src] = n, this._loadItemsById[n.id] = n, this._loadedResults[n.id] = e[i].result, this._loadedRawResults[n.id] = e[i].rawResult
                }
        }, e._finishOrderedItem = function(t, e) {
            var i = t.getItem();
            if (this.maintainScriptOrder && i.type == createjs.LoadQueue.JAVASCRIPT || i.maintainOrder) {
                t instanceof createjs.JavaScriptLoader && (this._currentlyLoadingScript = !1);
                var n = createjs.indexOf(this._scriptOrder, i);
                return -1 != n && (this._loadedScripts[n] = e === !0 || i, this._checkScriptLoadOrder(), !0)
            }
            return !1
        }, e._checkScriptLoadOrder = function() {
            for (var t = this._loadedScripts.length, e = 0; t > e; e++) {
                var i = this._loadedScripts[e];
                if (null === i) break;
                if (i !== !0) {
                    var n = this._loadedResults[i.id];
                    i.type == createjs.LoadQueue.JAVASCRIPT && createjs.DomUtils.appendToHead(n);
                    var r = i._loader;
                    this._processFinishedLoad(i, r), this._loadedScripts[e] = !0
                }
            }
        }, e._processFinishedLoad = function(t, e) {
            if (this._numItemsLoaded++, !this.maintainScriptOrder && t.type == createjs.LoadQueue.JAVASCRIPT) {
                var i = e.getTag();
                createjs.DomUtils.appendToHead(i)
            }
            this._updateProgress(), this._sendFileComplete(t, e), this._loadNext()
        }, e._canStartLoad = function(t) {
            if (!this.maintainScriptOrder || t.preferXHR) return !0;
            var e = t.getItem();
            if (e.type != createjs.LoadQueue.JAVASCRIPT) return !0;
            if (this._currentlyLoadingScript) return !1;
            for (var i = this._scriptOrder.indexOf(e), n = 0; i > n;) {
                var r = this._loadedScripts[n];
                if (null == r) return !1;
                n++
            }
            return this._currentlyLoadingScript = !0, !0
        }, e._removeLoadItem = function(t) {
            for (var e = this._currentLoads.length, i = 0; e > i; i++)
                if (this._currentLoads[i] == t) {
                    this._currentLoads.splice(i, 1);
                    break
                }
        }, e._cleanLoadItem = function(t) {
            var e = t.getItem();
            e && delete e._loader
        }, e._handleProgress = function(t) {
            var e = t.target;
            this._sendFileProgress(e.getItem(), e.progress), this._updateProgress()
        }, e._updateProgress = function() {
            var t = this._numItemsLoaded / this._numItems,
                e = this._numItems - this._numItemsLoaded;
            if (e > 0) {
                for (var i = 0, n = 0, r = this._currentLoads.length; r > n; n++) i += this._currentLoads[n].progress;
                t += i / e * (e / this._numItems)
            }
            this._lastProgress != t && (this._sendProgress(t), this._lastProgress = t)
        }, e._disposeItem = function(t) {
            delete this._loadedResults[t.id], delete this._loadedRawResults[t.id], delete this._loadItemsById[t.id], delete this._loadItemsBySrc[t.src]
        }, e._sendFileProgress = function(t, e) {
            if (!this._isCanceled() && !this._paused && this.hasEventListener("fileprogress")) {
                var i = new createjs.Event("fileprogress");
                i.progress = e, i.loaded = e, i.total = 1, i.item = t, this.dispatchEvent(i)
            }
        }, e._sendFileComplete = function(t, e) {
            if (!this._isCanceled() && !this._paused) {
                var i = new createjs.Event("fileload");
                i.loader = e, i.item = t, i.result = this._loadedResults[t.id], i.rawResult = this._loadedRawResults[t.id], t.completeHandler && t.completeHandler(i), this.hasEventListener("fileload") && this.dispatchEvent(i)
            }
        }, e._sendFileStart = function(t) {
            var e = new createjs.Event("filestart");
            e.item = t, this.hasEventListener("filestart") && this.dispatchEvent(e)
        }, e.toString = function() {
            return "[PreloadJS LoadQueue]"
        }, createjs.LoadQueue = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.TEXT)
        }
        var e = (createjs.extend(t, createjs.AbstractLoader), t);
        e.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.TEXT
        }, createjs.TextLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.BINARY), this.on("initialize", this._updateXHR, this)
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.BINARY
        }, e._updateXHR = function(t) {
            t.loader.setResponseType("arraybuffer")
        }, createjs.BinaryLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.CSS), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "href", this._tag = document.createElement(e ? "style" : "link"), this._tag.rel = "stylesheet", this._tag.type = "text/css"
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.CSS
        }, e._formatResult = function(t) {
            if (this._preferXHR) {
                var e = t.getTag();
                if (e.styleSheet) e.styleSheet.cssText = t.getResult(!0);
                else {
                    var i = document.createTextNode(t.getResult(!0));
                    e.appendChild(i)
                }
            } else e = this._tag;
            return createjs.DomUtils.appendToHead(e), e
        }, createjs.CSSLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.IMAGE), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", createjs.RequestUtils.isImageTag(t) ? this._tag = t : createjs.RequestUtils.isImageTag(t.src) ? this._tag = t.src : createjs.RequestUtils.isImageTag(t.tag) && (this._tag = t.tag), null != this._tag ? this._preferXHR = !1 : this._tag = document.createElement("img"), this.on("initialize", this._updateXHR, this)
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.IMAGE
        }, e.load = function() {
            if ("" != this._tag.src && this._tag.complete) return void this._sendComplete();
            var t = this._item.crossOrigin;
            1 == t && (t = "Anonymous"),
                null == t || createjs.RequestUtils.isLocal(this._item.src) || (this._tag.crossOrigin = t), this.AbstractLoader_load()
        }, e._updateXHR = function(t) {
            t.loader.mimeType = "text/plain; charset=x-user-defined-binary", t.loader.setResponseType && t.loader.setResponseType("blob")
        }, e._formatResult = function() {
            return this._formatImage
        }, e._formatImage = function(t, e) {
            var i = this._tag,
                n = window.URL || window.webkitURL;
            if (this._preferXHR)
                if (n) {
                    var r = n.createObjectURL(this.getResult(!0));
                    i.src = r, i.addEventListener("load", this._cleanUpURL, !1), i.addEventListener("error", this._cleanUpURL, !1)
                } else i.src = this._item.src;
            i.complete ? t(i) : (i.onload = createjs.proxy(function() {
                t(this._tag)
            }, this), i.onerror = createjs.proxy(function() {
                e(_this._tag)
            }, this))
        }, e._cleanUpURL = function(t) {
            var e = window.URL || window.webkitURL;
            e.revokeObjectURL(t.target.src)
        }, createjs.ImageLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.JAVASCRIPT), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", this.setTag(document.createElement("script"))
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.JAVASCRIPT
        }, e._formatResult = function(t) {
            var e = t.getTag();
            return this._preferXHR && (e.text = t.getResult(!0)), e
        }, createjs.JavaScriptLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.JSON), this.resultFormatter = this._formatResult
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.JSON
        }, e._formatResult = function(t) {
            var e = null;
            try {
                e = createjs.DataUtils.parseJSON(t.getResult(!0))
            } catch (t) {
                var i = new createjs.ErrorEvent("JSON_FORMAT", null, t);
                return this._sendError(i), t
            }
            return e
        }, createjs.JSONLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t) {
            this.AbstractLoader_constructor(t, !1, createjs.AbstractLoader.JSONP), this.setTag(document.createElement("script")), this.getTag().type = "text/javascript"
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.JSONP
        }, e.cancel = function() {
            this.AbstractLoader_cancel(), this._dispose()
        }, e.load = function() {
            if (null == this._item.callback) throw new Error("callback is required for loading JSONP requests.");
            if (null != window[this._item.callback]) throw new Error("JSONP callback '" + this._item.callback + "' already exists on window. You need to specify a different callback or re-name the current one.");
            window[this._item.callback] = createjs.proxy(this._handleLoad, this), window.document.body.appendChild(this._tag), this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout), this._tag.src = this._item.src
        }, e._handleLoad = function(t) {
            this._result = this._rawResult = t, this._sendComplete(), this._dispose()
        }, e._handleTimeout = function() {
            this._dispose(), this.dispatchEvent(new createjs.ErrorEvent("timeout"))
        }, e._dispose = function() {
            window.document.body.removeChild(this._tag), delete window[this._item.callback], clearTimeout(this._loadTimeout)
        }, createjs.JSONPLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t) {
            this.AbstractLoader_constructor(t, null, createjs.AbstractLoader.MANIFEST), this.plugins = null, this._manifestQueue = null
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        i.MANIFEST_PROGRESS = .25, i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.MANIFEST
        }, e.load = function() {
            this.AbstractLoader_load()
        }, e._createRequest = function() {
            var t = this._item.callback;
            this._request = null != t ? new createjs.JSONPLoader(this._item) : new createjs.JSONLoader(this._item)
        }, e.handleEvent = function(t) {
            switch (t.type) {
                case "complete":
                    return this._rawResult = t.target.getResult(!0), this._result = t.target.getResult(), this._sendProgress(i.MANIFEST_PROGRESS), void this._loadManifest(this._result);
                case "progress":
                    return t.loaded *= i.MANIFEST_PROGRESS, this.progress = t.loaded / t.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0), void this._sendProgress(t)
            }
            this.AbstractLoader_handleEvent(t)
        }, e.destroy = function() {
            this.AbstractLoader_destroy(), this._manifestQueue.close()
        }, e._loadManifest = function(t) {
            if (t && t.manifest) {
                var e = this._manifestQueue = new createjs.LoadQueue;
                e.on("fileload", this._handleManifestFileLoad, this), e.on("progress", this._handleManifestProgress, this), e.on("complete", this._handleManifestComplete, this, !0), e.on("error", this._handleManifestError, this, !0);
                for (var i = 0, n = this.plugins.length; n > i; i++) e.installPlugin(this.plugins[i]);
                e.loadManifest(t)
            } else this._sendComplete()
        }, e._handleManifestFileLoad = function(t) {
            t.target = null, this.dispatchEvent(t)
        }, e._handleManifestComplete = function() {
            this._loadedItems = this._manifestQueue.getItems(!0), this._sendComplete()
        }, e._handleManifestProgress = function(t) {
            this.progress = t.progress * (1 - i.MANIFEST_PROGRESS) + i.MANIFEST_PROGRESS, this._sendProgress(this.progress)
        }, e._handleManifestError = function(t) {
            var e = new createjs.Event("fileerror");
            e.item = t.data, this.dispatchEvent(e)
        }, createjs.ManifestLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e) {
            this.AbstractMediaLoader_constructor(t, e, createjs.AbstractLoader.SOUND), createjs.RequestUtils.isAudioTag(t) ? this._tag = t : createjs.RequestUtils.isAudioTag(t.src) ? this._tag = t : createjs.RequestUtils.isAudioTag(t.tag) && (this._tag = createjs.RequestUtils.isAudioTag(t) ? t : t.src), null != this._tag && (this._preferXHR = !1)
        }
        var e = createjs.extend(t, createjs.AbstractMediaLoader),
            i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.SOUND
        }, e._createTag = function(t) {
            var e = document.createElement("audio");
            return e.autoplay = !1, e.preload = "none", e.src = t, e
        }, createjs.SoundLoader = createjs.promote(t, "AbstractMediaLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e) {
            this.AbstractMediaLoader_constructor(t, e, createjs.AbstractLoader.VIDEO), createjs.RequestUtils.isVideoTag(t) || createjs.RequestUtils.isVideoTag(t.src) ? (this.setTag(createjs.RequestUtils.isVideoTag(t) ? t : t.src), this._preferXHR = !1) : this.setTag(this._createTag())
        }
        var e = createjs.extend(t, createjs.AbstractMediaLoader),
            i = t;
        e._createTag = function() {
            return document.createElement("video")
        }, i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.VIDEO
        }, createjs.VideoLoader = createjs.promote(t, "AbstractMediaLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.SPRITESHEET), this._manifestQueue = null
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        i.SPRITESHEET_PROGRESS = .25, i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.SPRITESHEET
        }, e.destroy = function() {
            this.AbstractLoader_destroy, this._manifestQueue.close()
        }, e._createRequest = function() {
            var t = this._item.callback;
            this._request = null != t ? new createjs.JSONPLoader(this._item) : new createjs.JSONLoader(this._item)
        }, e.handleEvent = function(t) {
            switch (t.type) {
                case "complete":
                    return this._rawResult = t.target.getResult(!0), this._result = t.target.getResult(), this._sendProgress(i.SPRITESHEET_PROGRESS), void this._loadManifest(this._result);
                case "progress":
                    return t.loaded *= i.SPRITESHEET_PROGRESS, this.progress = t.loaded / t.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0), void this._sendProgress(t)
            }
            this.AbstractLoader_handleEvent(t)
        }, e._loadManifest = function(t) {
            if (t && t.images) {
                var e = this._manifestQueue = new createjs.LoadQueue(this._preferXHR, this._item.path, this._item.crossOrigin);
                e.on("complete", this._handleManifestComplete, this, !0), e.on("fileload", this._handleManifestFileLoad, this), e.on("progress", this._handleManifestProgress, this), e.on("error", this._handleManifestError, this, !0), e.loadManifest(t.images)
            }
        }, e._handleManifestFileLoad = function(t) {
            var e = t.result;
            if (null != e) {
                var i = this.getResult().images,
                    n = i.indexOf(t.item.src);
                i[n] = e
            }
        }, e._handleManifestComplete = function() {
            this._result = new createjs.SpriteSheet(this._result), this._loadedItems = this._manifestQueue.getItems(!0), this._sendComplete()
        }, e._handleManifestProgress = function(t) {
            this.progress = t.progress * (1 - i.SPRITESHEET_PROGRESS) + i.SPRITESHEET_PROGRESS, this._sendProgress(this.progress)
        }, e._handleManifestError = function(t) {
            var e = new createjs.Event("fileerror");
            e.item = t.data, this.dispatchEvent(e)
        }, createjs.SpriteSheetLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.SVG), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "data", e ? this.setTag(document.createElement("svg")) : (this.setTag(document.createElement("object")), this.getTag().type = "image/svg+xml")
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.SVG
        }, e._formatResult = function(t) {
            var e = createjs.DataUtils.parseXML(t.getResult(!0), "text/xml"),
                i = t.getTag();
            return !this._preferXHR && document.body.contains(i) && document.body.removeChild(i), null != e.documentElement ? (i.appendChild(e.documentElement), i.style.visibility = "visible", i) : e
        }, createjs.SVGLoader = createjs.promote(t, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.XML), this.resultFormatter = this._formatResult
        }
        var e = createjs.extend(t, createjs.AbstractLoader),
            i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.XML
        }, e._formatResult = function(t) {
            return createjs.DataUtils.parseXML(t.getResult(!0), "text/xml")
        }, createjs.XMLLoader = createjs.promote(t, "AbstractLoader")
    }(), define("createjs", ["preloadjs"], function() {
        return window.createjs
    });
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
            var n = function(e) {
                    t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                },
                r = 1e-10,
                s = e._internals,
                o = s.lazyTweens,
                a = s.lazyRender,
                l = _gsScope._gsDefine.globals,
                h = new i(null, null, 1, 0),
                c = n.prototype = new t;
            return c.constructor = n, c.kill()._gc = !1, n.version = "1.20.2", c.invalidate = function() {
                return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
            }, c.addCallback = function(t, i, n, r) {
                return this.add(e.delayedCall(0, t, n, r), i)
            }, c.removeCallback = function(t, e) {
                if (t)
                    if (null == e) this._kill(null, t);
                    else
                        for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                return this
            }, c.removePause = function(e) {
                return this.removeCallback(t._internals.pauseCallback, e)
            }, c.tweenTo = function(t, i) {
                i = i || {};
                var n, r, s, o = {
                        ease: h,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    },
                    a = i.repeat && l.TweenMax || e;
                for (r in i) o[r] = i[r];
                return o.time = this._parseTimeOrLabel(t), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new a(this, n, o), o.onStart = function() {
                    s.target.paused(!0), s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
                }, s
            }, c.tweenFromTo = function(t, e, i) {
                i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                    onComplete: this.seek,
                    onCompleteParams: [t],
                    callbackScope: this
                }, i.immediateRender = i.immediateRender !== !1;
                var n = this.tweenTo(e, i);
                return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
            }, c.render = function(t, e, i) {
                this._gc && this._enabled(!0, !1);
                var n, s, l, h, c, u, d, f, p = this._dirty ? this.totalDuration() : this._totalDuration,
                    m = this._duration,
                    g = this._time,
                    _ = this._totalTime,
                    v = this._startTime,
                    y = this._timeScale,
                    b = this._rawPrevTime,
                    w = this._paused,
                    x = this._cycle;
                if (t >= p - 1e-7 && t >= 0) this._locked || (this._totalTime = p, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, h = "onComplete", c = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-7 || b < 0 || b === r) && b !== t && this._first && (c = !0, b > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = m, t = m + 1e-4);
                else if (t < 1e-7)
                    if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== g || 0 === m && b !== r && (b > 0 || t < 0 && b >= 0) && !this._locked) && (h = "onReverseComplete", s = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (c = s = !0, h = "onReverseComplete") : b >= 0 && this._first && (c = !0), this._rawPrevTime = t;
                    else {
                        if (this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s)
                            for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                        t = 0, this._initted || (c = !0)
                    } else if (0 === m && b < 0 && (c = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (u = m + this._repeatDelay, this._cycle = this._totalTime / u >> 0, 0 !== this._cycle && this._cycle === this._totalTime / u && _ <= t && this._cycle--, this._time = this._totalTime - this._cycle * u, this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, t = m + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e) {
                    if (t = this._time, t >= g || this._repeat && x !== this._cycle)
                        for (n = this._first; n && n._startTime <= t && !d;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (d = n), n = n._next;
                    else
                        for (n = this._last; n && n._startTime >= t && !d;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (d = n), n = n._prev;
                    d && d._startTime < m && (this._time = t = d._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                if (this._cycle !== x && !this._locked) {
                    var T = this._yoyo && 0 !== (1 & x),
                        S = T === (this._yoyo && 0 !== (1 & this._cycle)),
                        P = this._totalTime,
                        k = this._cycle,
                        C = this._rawPrevTime,
                        E = this._time;
                    if (this._totalTime = x * m, this._cycle < x ? T = !T : this._totalTime += m, this._time = g, this._rawPrevTime = 0 === m ? b - 1e-4 : b, this._cycle = x, this._locked = !0, g = T ? 0 : m, this.render(g, e, 0 === m), e || this._gc || this.vars.onRepeat && (this._cycle = k, this._locked = !1, this._callback("onRepeat")), g !== this._time) return;
                    if (S && (this._cycle = x, this._locked = !0, g = T ? m + 1e-4 : -1e-4, this.render(g, !0, !1)), this._locked = !1, this._paused && !w) return;
                    this._time = E, this._totalTime = P, this._cycle = k, this._rawPrevTime = C
                }
                if (!(this._time !== g && this._first || i || c || d)) return void(_ !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== _ && t > 0 && (this._active = !0), 0 === _ && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")), f = this._time, f >= g)
                    for (n = this._first; n && (l = n._next, f === this._time && (!this._paused || w));)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (d === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = l;
                else
                    for (n = this._last; n && (l = n._prev, f === this._time && (!this._paused || w));) {
                        if (n._active || n._startTime <= g && !n._paused && !n._gc) {
                            if (d === n) {
                                for (d = n._prev; d && d.endTime() > this._time;) d.render(d._reversed ? d.totalDuration() - (t - d._startTime) * d._timeScale : (t - d._startTime) * d._timeScale, e, i), d = d._prev;
                                d = null, this.pause()
                            }
                            n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                        }
                        n = l
                    }
                this._onUpdate && (e || (o.length && a(), this._callback("onUpdate"))), h && (this._locked || this._gc || v !== this._startTime && y === this._timeScale || (0 === this._time || p >= this.totalDuration()) && (s && (o.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this._callback(h)))
            }, c.getActive = function(t, e, i) {
                null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                var n, r, s = [],
                    o = this.getChildren(t, e, i),
                    a = 0,
                    l = o.length;
                for (n = 0; n < l; n++) r = o[n], r.isActive() && (s[a++] = r);
                return s
            }, c.getLabelAfter = function(t) {
                t || 0 !== t && (t = this._time);
                var e, i = this.getLabelsArray(),
                    n = i.length;
                for (e = 0; e < n; e++)
                    if (i[e].time > t) return i[e].name;
                return null
            }, c.getLabelBefore = function(t) {
                null == t && (t = this._time);
                for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                    if (e[i].time < t) return e[i].name;
                return null
            }, c.getLabelsArray = function() {
                var t, e = [],
                    i = 0;
                for (t in this._labels) e[i++] = {
                    time: this._labels[t],
                    name: t
                };
                return e.sort(function(t, e) {
                    return t.time - e.time
                }), e
            }, c.invalidate = function() {
                return this._locked = !1, t.prototype.invalidate.call(this)
            }, c.progress = function(t, e) {
                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration() || 0
            }, c.totalProgress = function(t, e) {
                return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration() || 0
            }, c.totalDuration = function(e) {
                return arguments.length ? this._repeat !== -1 && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
            }, c.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
            }, c.repeat = function(t) {
                return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
            }, c.repeatDelay = function(t) {
                return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
            }, c.yoyo = function(t) {
                return arguments.length ? (this._yoyo = t, this) : this._yoyo
            }, c.currentLabel = function(t) {
                return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
            }, n
        }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
            var n = function(t) {
                    e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                    var i, n, r = this.vars;
                    for (n in r) i = r[n], l(i) && i.join("").indexOf("{self}") !== -1 && (r[n] = this._swapSelfInParams(i));
                    l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                },
                r = 1e-10,
                s = i._internals,
                o = n._internals = {},
                a = s.isSelector,
                l = s.isArray,
                h = s.lazyTweens,
                c = s.lazyRender,
                u = _gsScope._gsDefine.globals,
                d = function(t) {
                    var e, i = {};
                    for (e in t) i[e] = t[e];
                    return i
                },
                f = function(t, e, i) {
                    var n, r, s = t.cycle;
                    for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
                    delete t.cycle
                },
                p = o.pauseCallback = function() {},
                m = function(t) {
                    var e, i = [],
                        n = t.length;
                    for (e = 0; e !== n; i.push(t[e++]));
                    return i
                },
                g = n.prototype = new e;
            return n.version = "1.20.2", g.constructor = n, g.kill()._gc = g._forcingPlayhead = g._hasPause = !1, g.to = function(t, e, n, r) {
                var s = n.repeat && u.TweenMax || i;
                return e ? this.add(new s(t, e, n), r) : this.set(t, n, r)
            }, g.from = function(t, e, n, r) {
                return this.add((n.repeat && u.TweenMax || i).from(t, e, n), r)
            }, g.fromTo = function(t, e, n, r, s) {
                var o = r.repeat && u.TweenMax || i;
                return e ? this.add(o.fromTo(t, e, n, r), s) : this.set(t, r, s)
            }, g.staggerTo = function(t, e, r, s, o, l, h, c) {
                var u, p, g = new n({
                        onComplete: l,
                        onCompleteParams: h,
                        callbackScope: c,
                        smoothChildTiming: this.smoothChildTiming
                    }),
                    _ = r.cycle;
                for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = m(t)), s = s || 0, s < 0 && (t = m(t), t.reverse(), s *= -1), p = 0; p < t.length; p++) u = d(r), u.startAt && (u.startAt = d(u.startAt), u.startAt.cycle && f(u.startAt, t, p)), _ && (f(u, t, p), null != u.duration && (e = u.duration, delete u.duration)), g.to(t[p], e, u, p * s);
                return this.add(g, o)
            }, g.staggerFrom = function(t, e, i, n, r, s, o, a) {
                return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, s, o, a)
            }, g.staggerFromTo = function(t, e, i, n, r, s, o, a, l) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, s, o, a, l)
            }, g.call = function(t, e, n, r) {
                return this.add(i.delayedCall(0, t, e, n), r)
            }, g.set = function(t, e, n) {
                return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n)
            }, n.exportRoot = function(t, e) {
                t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                var r, s, o = new n(t),
                    a = o._timeline;
                for (null == e && (e = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, r = a._first; r;) s = r._next, e && r instanceof i && r.target === r.vars.onComplete || o.add(r, r._startTime - r._delay), r = s;
                return a.add(o, 0), o
            }, g.add = function(r, s, o, a) {
                var h, c, u, d, f, p;
                if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof t)) {
                    if (r instanceof Array || r && r.push && l(r)) {
                        for (o = o || "normal", a = a || 0, h = s, c = r.length, u = 0; u < c; u++) l(d = r[u]) && (d = new n({
                            tweens: d
                        })), this.add(d, h), "string" != typeof d && "function" != typeof d && ("sequence" === o ? h = d._startTime + d.totalDuration() / d._timeScale : "start" === o && (d._startTime -= d.delay())), h += a;
                        return this._uncache(!0)
                    }
                    if ("string" == typeof r) return this.addLabel(r, s);
                    if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                    r = i.delayedCall(0, r)
                }
                if (e.prototype.add.call(this, r, s), r._time && r.render((this.rawTime() - r._startTime) * r._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                    for (f = this, p = f.rawTime() > r._startTime; f._timeline;) p && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1), f = f._timeline;
                return this
            }, g.remove = function(e) {
                if (e instanceof t) {
                    this._remove(e, !1);
                    var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                    return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
                }
                if (e instanceof Array || e && e.push && l(e)) {
                    for (var n = e.length; --n > -1;) this.remove(e[n]);
                    return this
                }
                return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
            }, g._remove = function(t, i) {
                e.prototype._remove.call(this, t, i);
                var n = this._last;
                return n ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
            }, g.append = function(t, e) {
                return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
            }, g.insert = g.insertMultiple = function(t, e, i, n) {
                return this.add(t, e || 0, i, n)
            }, g.appendMultiple = function(t, e, i, n) {
                return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
            }, g.addLabel = function(t, e) {
                return this._labels[t] = this._parseTimeOrLabel(e), this
            }, g.addPause = function(t, e, n, r) {
                var s = i.delayedCall(0, p, n, r || this);
                return s.vars.onComplete = s.vars.onReverseComplete = e, s.data = "isPause", this._hasPause = !0, this.add(s, t)
            }, g.removeLabel = function(t) {
                return delete this._labels[t], this
            }, g.getLabelTime = function(t) {
                return null != this._labels[t] ? this._labels[t] : -1
            }, g._parseTimeOrLabel = function(e, i, n, r) {
                var s, o;
                if (r instanceof t && r.timeline === this) this.remove(r);
                else if (r && (r instanceof Array || r.push && l(r)))
                    for (o = r.length; --o > -1;) r[o] instanceof t && r[o].timeline === this && this.remove(r[o]);
                if (s = this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration, "string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - s : 0, n);
                if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = s);
                else {
                    if (o = e.indexOf("="), o === -1) return null == this._labels[e] ? n ? this._labels[e] = s + i : i : this._labels[e] + i;
                    i = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)), e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, n) : s
                }
                return Number(e) + i
            }, g.seek = function(t, e) {
                return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
            }, g.stop = function() {
                return this.paused(!0)
            }, g.gotoAndPlay = function(t, e) {
                return this.play(t, e)
            }, g.gotoAndStop = function(t, e) {
                return this.pause(t, e)
            }, g.render = function(t, e, i) {
                this._gc && this._enabled(!0, !1);
                var n, s, o, a, l, u, d, f = this._dirty ? this.totalDuration() : this._totalDuration,
                    p = this._time,
                    m = this._startTime,
                    g = this._timeScale,
                    _ = this._paused;
                if (t >= f - 1e-7 && t >= 0) this._totalTime = this._time = f, this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = f + 1e-4;
                else if (t < 1e-7)
                    if (this._totalTime = this._time = 0, (0 !== p || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || t < 0 && this._rawPrevTime >= 0)) && (a = "onReverseComplete", s = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t;
                    else {
                        if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s)
                            for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                        t = 0, this._initted || (l = !0)
                    } else {
                    if (this._hasPause && !this._forcingPlayhead && !e) {
                        if (t >= p)
                            for (n = this._first; n && n._startTime <= t && !u;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (u = n), n = n._next;
                        else
                            for (n = this._last; n && n._startTime >= t && !u;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (u = n), n = n._prev;
                        u && (this._time = t = u._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    this._totalTime = this._time = this._rawPrevTime = t
                }
                if (this._time !== p && this._first || i || l || u) {
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0), 0 === p && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), d = this._time, d >= p)
                        for (n = this._first; n && (o = n._next, d === this._time && (!this._paused || _));)(n._active || n._startTime <= d && !n._paused && !n._gc) && (u === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
                    else
                        for (n = this._last; n && (o = n._prev, d === this._time && (!this._paused || _));) {
                            if (n._active || n._startTime <= p && !n._paused && !n._gc) {
                                if (u === n) {
                                    for (u = n._prev; u && u.endTime() > this._time;) u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i), u = u._prev;
                                    u = null, this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                            }
                            n = o
                        }
                    this._onUpdate && (e || (h.length && c(), this._callback("onUpdate"))), a && (this._gc || m !== this._startTime && g === this._timeScale || (0 === this._time || f >= this.totalDuration()) && (s && (h.length && c(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
                }
            }, g._hasPausedChild = function() {
                for (var t = this._first; t;) {
                    if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
                    t = t._next
                }
                return !1
            }, g.getChildren = function(t, e, n, r) {
                r = r || -9999999999;
                for (var s = [], o = this._first, a = 0; o;) o._startTime < r || (o instanceof i ? e !== !1 && (s[a++] = o) : (n !== !1 && (s[a++] = o), t !== !1 && (s = s.concat(o.getChildren(!0, e, n)), a = s.length))), o = o._next;
                return s
            }, g.getTweensOf = function(t, e) {
                var n, r, s = this._gc,
                    o = [],
                    a = 0;
                for (s && this._enabled(!0, !0), n = i.getTweensOf(t), r = n.length; --r > -1;)(n[r].timeline === this || e && this._contains(n[r])) && (o[a++] = n[r]);
                return s && this._enabled(!1, !0), o
            }, g.recent = function() {
                return this._recent
            }, g._contains = function(t) {
                for (var e = t.timeline; e;) {
                    if (e === this) return !0;
                    e = e.timeline
                }
                return !1
            }, g.shiftChildren = function(t, e, i) {
                i = i || 0;
                for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                if (e)
                    for (n in s) s[n] >= i && (s[n] += t);
                return this._uncache(!0)
            }, g._kill = function(t, e) {
                if (!t && !e) return this._enabled(!1, !1);
                for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
                return r
            }, g.clear = function(t) {
                var e = this.getChildren(!1, !0, !0),
                    i = e.length;
                for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                return t !== !1 && (this._labels = {}), this._uncache(!0)
            }, g.invalidate = function() {
                for (var e = this._first; e;) e.invalidate(), e = e._next;
                return t.prototype.invalidate.call(this)
            }, g._enabled = function(t, i) {
                if (t === this._gc)
                    for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
                return e.prototype._enabled.call(this, t, i)
            }, g.totalTime = function(e, i, n) {
                this._forcingPlayhead = !0;
                var r = t.prototype.totalTime.apply(this, arguments);
                return this._forcingPlayhead = !1, r
            }, g.duration = function(t) {
                return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
            }, g.totalDuration = function(t) {
                if (!arguments.length) {
                    if (this._dirty) {
                        for (var e, i, n = 0, r = this._last, s = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = e;
                        this._duration = this._totalDuration = n, this._dirty = !1
                    }
                    return this._totalDuration
                }
                return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
            }, g.paused = function(e) {
                if (!e)
                    for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                return t.prototype.paused.apply(this, arguments)
            }, g.usesFrames = function() {
                for (var e = this._timeline; e._timeline;) e = e._timeline;
                return e === t._rootFramesTimeline
            }, g.rawTime = function(t) {
                return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
            }, n
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[t]
        };
        "undefined" != typeof module && module.exports ? (require("./TweenLite.js"), module.exports = e()) : "function" == typeof define && define.amd && define("TimelineMax", ["TweenLite"], e)
    }("TimelineMax"), define("Expo", ["TweenMax"], function() {
        return window.Expo
    }), define("component/loader", ["jquery", "backbone", "TweenMax", "TimelineMax", "Expo"], function(t, e, i, n, r) {
        return e.View.extend({
            render: function() {
                this.$elLoadingBar = this.$el.find(".loading-bar"), this.$el.find(".loading-text").addClass("active")
            },
            conceal: function() {
                var e = new t.Deferred;
                this.$elLoadingBar.addClass("reverse");
                var i = new n({
                    onComplete: e.resolve,
                    onOverwrite: e.resolve
                });
                return i.to(this.$elLoadingBar, .7, {
                    scaleY: 0,
                    ease: r.easeInOut
                }, 0).to(this.$el, .5, {
                    autoAlpha: 0,
                    onComplete: e.resolve,
                    onOverwrite: e.resolve
                }, .53), e.promise()
            },
            setProgress: function(e) {
                var n = new t.Deferred;
                return i.to(this.$elLoadingBar, .75, {
                    scaleY: e,
                    onComplete: n.resolve,
                    onOverwrite: n.resolve
                }), n.promise()
            }
        })
    }), define("component/page/base", ["jquery", "backbone", "component/base", "TweenMax", "urijs/URI", "createjs", "component/loader"], function(t, e, i, n, r, s, o) {
        return i.extend({
            _overlays: null,
            _activeOverlay: null,
            _preloadPromise: null,
            render: function() {
                return i.prototype.render.apply(this, arguments), this._cLoader = new o({
                    el: this.$el.find(">.component-loader")
                }), this._cLoader.render(), this.registerComponent(this._cLoader), this.$elPageTransition = this.$el.find(">.page-transition"), this.$elOverlays = this.$el.find(">.component-overlay-text"), t(window).on("resize", this.refreshOrientation.bind(this)), this.refreshOrientation(), this
            },
            refreshOrientation: function() {
                var e = t(window).height() > t(window).width();
                t(document.documentElement).toggleClass("orientation-profile", e).toggleClass("orientation-landscape", !e)
            },
            transitionPage: function() {
                var e = new t.Deferred;
                return n.to(this.$elPageTransition, .25, {
                    autoAlpha: 1,
                    onComplete: e.resolve
                }), e.promise()
            },
            preload: function() {
                if (!this._preloadPromise) {
                    var e = new t.Deferred,
                        i = this.getRegisteredComponentsRecursively().reduce(function(t, e) {
                            return e.getPreloadUrls && (t = t.concat(e.getPreloadUrls())), t
                        }, []);
                    if (i.length) {
                        var n = new s.LoadQueue;
                        n.on("progress", function(t) {
                            var i = this._cLoader.setProgress(t.progress);
                            t.progress >= 1 && i.then(e.resolve)
                        }.bind(this)), i.forEach(function(t) {
                            n.loadFile(t)
                        })
                    } else this._cLoader.setProgress(1).then(e.resolve);
                    this._preloadPromise = e.promise()
                }
                return this._preloadPromise
            },
            revealContent: function(t) {
                return this._cLoader.conceal()
            },
            revealOverlay: function(t) {
                var e = null;
                if (this._overlays.some(function(i) {
                        if (t === i.model.id) return e = i, !0
                    }), !e) throw new Error("Overlay not found. (id: " + t + ")");
                return e.reveal()
            },
            _navigate: function(t) {
                var i = new r,
                    n = new r(t).absoluteTo(i);
                i.clone().hash("").equals(n.clone().hash("")) ? i.hash() == n.hash() ? e.history.loadUrl(e.history.fragment) : e.history.navigate(n.hash(), {
                    trigger: !0
                }) : this.transitionPage().then(function() {
                    window.location = n.toString()
                })
            },
            _navigateHandler: function(t) {
                "_blank" != t.target && (t.preventDefault(), this._navigate(t.url))
            }
        })
    }),
    function() {
        "use strict";
        var t, e;
        e = null, t = function(t) {
            var i, n;
            return null == t && (t = !1), null == e || t ? "loading" === document.readyState ? null : (i = document.createElement("div"), n = document.createElement("div"), i.style.width = n.style.width = i.style.height = n.style.height = "100px", i.style.overflow = "scroll", n.style.overflow = "hidden", document.body.appendChild(i), document.body.appendChild(n), e = Math.abs(i.scrollHeight - n.scrollHeight), document.body.removeChild(i), document.body.removeChild(n), e) : e
        }, "function" == typeof define && define.amd ? define("scrollbar-width", [], function() {
            return t
        }) : "undefined" != typeof exports ? module.exports = t : this.getScrollbarWidth = t
    }.call(this), define("Power1", ["TweenMax"], function() {
        return window.Power1
    }), define("Power2", ["TweenMax"], function() {
        return window.Power2
    }), define("lib/pad", [], function() {
        return function(t, e, i) {
            return i = i || "0", t += "", t.length >= e ? t : new Array(e - t.length + 1).join(i) + t
        }
    }), define("lib/qualaroo", [], function() {
        return {
            push: function() {
                window._kiq && window._kiq.push.apply(window._kiq, arguments)
            }
        }
    }), define("lib/Survey", ["jquery", "./qualaroo"], function(t, e) {
        var i = function(e) {
            this.options = t.extend({
                surveyIds: [],
                duration: 2e4,
                enabled: !0
            }, e), this._timeouts = {}
        };
        return t.extend(i.prototype, {
            options: null,
            _timeouts: null,
            _hasShownSurvey: !1,
            updatePlayback: function(t, e) {
                this.options.enabled && (this.wasSurveyShown() || (e ? this._timeouts[t] || (this._timeouts[t] = window.setTimeout(this.showSurvey.bind(this), this.options.duration)) : (window.clearTimeout(this._timeouts[t]), delete this._timeouts[t])))
            },
            wasSurveyShown: function() {
                return this._hasShownSurvey
            },
            showSurvey: function() {
                var t = this.options.surveyIds,
                    i = t[Math.floor(Math.random() * t.length)];
                e.push(["showSurvey", i]), this._hasShownSurvey = !0, Object.keys(this._timeouts).forEach(function(t) {
                    window.clearTimeout(this._timeouts[t]), delete this._timeouts[t]
                }.bind(this))
            }
        }), i
    }), ! function(t, e, i) {
        function n(t, e) {
            return typeof t === e
        }

        function r() {
            var t, e, i, r, s, o, a;
            for (var l in y)
                if (y.hasOwnProperty(l)) {
                    if (t = [], e = y[l], e.name && (t.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length))
                        for (i = 0; i < e.options.aliases.length; i++) t.push(e.options.aliases[i].toLowerCase());
                    for (r = n(e.fn, "function") ? e.fn() : e.fn, s = 0; s < t.length; s++) o = t[s], a = o.split("."), 1 === a.length ? w[a[0]] = r : (!w[a[0]] || w[a[0]] instanceof Boolean || (w[a[0]] = new Boolean(w[a[0]])), w[a[0]][a[1]] = r), x.push((r ? "" : "no-") + a.join("-"))
                }
        }

        function s(t) {
            var e = T.className,
                i = w._config.classPrefix || "";
            if (S && (e = e.baseVal), w._config.enableJSClass) {
                var n = new RegExp("(^|\\s)" + i + "no-js(\\s|$)");
                e = e.replace(n, "$1" + i + "js$2")
            }
            w._config.enableClasses && (e += " " + i + t.join(" " + i), S ? T.className.baseVal = e : T.className = e)
        }

        function o() {
            return "function" != typeof e.createElement ? e.createElement(arguments[0]) : S ? e.createElementNS.call(e, "http://www.w3.org/2000/svg", arguments[0]) : e.createElement.apply(e, arguments)
        }

        function a(t, e) {
            return !!~("" + t).indexOf(e)
        }

        function l() {
            var t = e.body;
            return t || (t = o(S ? "svg" : "body"), t.fake = !0), t
        }

        function h(t, i, n, r) {
            var s, a, h, c, u = "modernizr",
                d = o("div"),
                f = l();
            if (parseInt(n, 10))
                for (; n--;) h = o("div"), h.id = r ? r[n] : u + (n + 1), d.appendChild(h);
            return s = o("style"), s.type = "text/css", s.id = "s" + u, (f.fake ? f : d).appendChild(s), f.appendChild(d), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(e.createTextNode(t)), d.id = u, f.fake && (f.style.background = "", f.style.overflow = "hidden", c = T.style.overflow, T.style.overflow = "hidden", T.appendChild(f)), a = i(d, t), f.fake ? (f.parentNode.removeChild(f), T.style.overflow = c, T.offsetHeight) : d.parentNode.removeChild(d), !!a
        }

        function c(t) {
            return t.replace(/([A-Z])/g, function(t, e) {
                return "-" + e.toLowerCase()
            }).replace(/^ms-/, "-ms-")
        }

        function u(e, i, n) {
            var r;
            if ("getComputedStyle" in t) {
                r = getComputedStyle.call(t, e, i);
                var s = t.console;
                if (null !== r) n && (r = r.getPropertyValue(n));
                else if (s) {
                    var o = s.error ? "error" : "log";
                    s[o].call(s, "getComputedStyle returning null, its possible modernizr test results are inaccurate")
                }
            } else r = !i && e.currentStyle && e.currentStyle[n];
            return r
        }

        function d(e, n) {
            var r = e.length;
            if ("CSS" in t && "supports" in t.CSS) {
                for (; r--;)
                    if (t.CSS.supports(c(e[r]), n)) return !0;
                return !1
            }
            if ("CSSSupportsRule" in t) {
                for (var s = []; r--;) s.push("(" + c(e[r]) + ":" + n + ")");
                return s = s.join(" or "), h("@supports (" + s + ") { #modernizr { position: absolute; } }", function(t) {
                    return "absolute" == u(t, null, "position")
                })
            }
            return i
        }

        function f(t) {
            return t.replace(/([a-z])-([a-z])/g, function(t, e, i) {
                return e + i.toUpperCase()
            }).replace(/^-/, "")
        }

        function p(t, e, r, s) {
            function l() {
                c && (delete A.style, delete A.modElem)
            }
            if (s = !n(s, "undefined") && s, !n(r, "undefined")) {
                var h = d(t, r);
                if (!n(h, "undefined")) return h
            }
            for (var c, u, p, m, g, _ = ["modernizr", "tspan", "samp"]; !A.style && _.length;) c = !0, A.modElem = o(_.shift()), A.style = A.modElem.style;
            for (p = t.length, u = 0; p > u; u++)
                if (m = t[u], g = A.style[m], a(m, "-") && (m = f(m)), A.style[m] !== i) {
                    if (s || n(r, "undefined")) return l(), "pfx" != e || m;
                    try {
                        A.style[m] = r
                    } catch (t) {}
                    if (A.style[m] != g) return l(), "pfx" != e || m
                }
            return l(), !1
        }

        function m(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }

        function g(t, e, i) {
            var r;
            for (var s in t)
                if (t[s] in e) return i === !1 ? t[s] : (r = e[t[s]], n(r, "function") ? m(r, i || e) : r);
            return !1
        }

        function _(t, e, i, r, s) {
            var o = t.charAt(0).toUpperCase() + t.slice(1),
                a = (t + " " + C.join(o + " ") + o).split(" ");
            return n(e, "string") || n(e, "undefined") ? p(a, e, r, s) : (a = (t + " " + R.join(o + " ") + o).split(" "), g(a, e, i))
        }

        function v(t, e, n) {
            return _(t, i, i, e, n)
        }
        var y = [],
            b = {
                _version: "3.5.0",
                _config: {
                    classPrefix: "",
                    enableClasses: !0,
                    enableJSClass: !0,
                    usePrefixes: !0
                },
                _q: [],
                on: function(t, e) {
                    var i = this;
                    setTimeout(function() {
                        e(i[t])
                    }, 0)
                },
                addTest: function(t, e, i) {
                    y.push({
                        name: t,
                        fn: e,
                        options: i
                    })
                },
                addAsyncTest: function(t) {
                    y.push({
                        name: null,
                        fn: t
                    })
                }
            },
            w = function() {};
        w.prototype = b, w = new w;
        var x = [],
            T = e.documentElement,
            S = "svg" === T.nodeName.toLowerCase(),
            P = b._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
        b._prefixes = P;
        var k = "Moz O ms Webkit",
            C = b._config.usePrefixes ? k.split(" ") : [];
        b._cssomPrefixes = C;
        var E = {
            elem: o("modernizr")
        };
        w._q.push(function() {
            delete E.elem
        });
        var A = {
            style: E.elem.style
        };
        w._q.unshift(function() {
            delete A.style
        });
        var R = b._config.usePrefixes ? k.toLowerCase().split(" ") : [];
        b._domPrefixes = R, b.testAllProps = _, b.testAllProps = v;
        var j = "CSS" in t && "supports" in t.CSS,
            O = "supportsCSS" in t;
        w.addTest("supports", j || O), w.addTest("cssfilters", function() {
            if (w.supports) return v("filter", "blur(2px)");
            var t = o("a");
            return t.style.cssText = P.join("filter:blur(2px); "), !!t.style.length && (e.documentMode === i || e.documentMode > 9)
        }), w.addTest("csspointerevents", function() {
            var t = o("a").style;
            return t.cssText = "pointer-events:auto", "auto" === t.pointerEvents
        }), r(), s(x), delete b.addTest, delete b.addAsyncTest;
        for (var L = 0; L < w._q.length; L++) w._q[L]();
        t.Modernizr = w
    }(window, document), define("modernizr", function(t) {
        return function() {
            var e;
            return e || t.Modernizr
        }
    }(this)), define("component/widget/language", ["jquery", "backbone", "TweenMax", "Power2"], function(t, e, i, n) {
        return e.View.extend({
            _expanded: !1,
            _closeHandler: null,
            render: function() {
                this.$elToggle = this.$el.find(".toggle").on("click", function() {
                    this.toggle()
                }.bind(this)), this.$elList = this.$el.find(".list"), this.$elOptions = this.$el.find(".option").on("click", function(e) {
                    this.trigger("navigate", {
                        url: t(e.currentTarget).attr("href"),
                        preventDefault: function() {
                            e.preventDefault()
                        }
                    })
                }.bind(this));
                var e = this.getCurrentLocale();
                return this.$elOptions.each(function(i, n) {
                    if (t(n).data("locale") == e) return t(n).hide(), !1
                }), this.$elToggle.find(".text").text(this.getLanguageNameByLocale(e)), this._closeHandler = function(e) {
                    this._expanded && (t.contains(this.$el[0], e.target) || this.$el[0] === e.target || this.toggle(!1))
                }.bind(this), this
            },
            toggle: function(e) {
                e = void 0 === e ? !this._expanded : !!e, this.$el.toggleClass("expanded", e), i.to(this.$elList, .3, {
                    autoAlpha: e ? 1 : 0
                }), e ? t(window).on("click", this._closeHandler) : t(window).off("click", this._closeHandler), this._expanded = e
            },
            getCurrentLocale: function() {
                var t = this.$elToggle.data("current-locale");
                return "en" == t.substr(0, 2) ? t = "en_US" : "es_AR" == t && (t = "es_ES"), t
            },
            getLanguageNameByLocale: function(e) {
                var i = this.$elOptions.toArray().map(function(e) {
                        return {
                            id: t(e).data("locale"),
                            name: t(e).text()
                        }
                    }),
                    n = null;
                return i.some(function(t) {
                    if (t.id == e) return n = t.name, !0
                }), n
            }
        })
    }), define("component/widget/miniplayer", ["jquery", "backbone"], function(t, e) {
        return e.View.extend({
            render: function() {
                return this.$el.find(".control").on("click", function(e) {
                    var i = t(e.currentTarget).data("action");
                    "pausePlay" == i && (i = this.$el.hasClass("paused") ? "play" : "pause"), this.trigger("change:playback", {
                        action: i
                    })
                }.bind(this)), this
            },
            setIsPlaying: function(t) {
                this.$el.toggleClass("playing", t).toggleClass("paused", !t)
            }
        })
    }), define("component/widget/ticker", ["jquery", "backbone"], function(t, e) {
        return e.View.extend({
            render: function() {
                return this.$elInner = this.$el.find(".inner"), this.$elText = this.$el.find(".text"), this
            },
            setText: function(t) {
                var e = this.$elText.text();
                return e == t ? this : (this.$elText.text(t), this.$elInner.removeClass("active"), void this.$elInner[0].offsetWidth, this.$elInner.addClass("active"), this)
            },
            toggle: function(t) {
                return this.$elInner.toggleClass("paused", !t), this
            }
        })
    }), define("component/navigation", ["jquery", "backbone", "TweenMax", "component/widget/language", "component/widget/miniplayer", "component/widget/ticker"], function(t, e, i, n, r, s) {
        return e.View.extend({
            _closeButtonTimeline: null,
            render: function() {
                this.$elNavItems = this.$el.find(".nav-item"), this.$elBandMembersNav = this.$el.find(".band-members-nav"), this.$elBandMembers = this.$elBandMembersNav.find(".member"), this.$el.find(".nav-logo").on("click", function(e) {
                    this.trigger("navigate", {
                        url: t(e.currentTarget).attr("href"),
                        preventDefault: function() {
                            e.preventDefault()
                        }
                    })
                }.bind(this)), this.$elNavItems.on("click", function(e) {
                    this.trigger("navigate", {
                        url: t(e.currentTarget).attr("href"),
                        target: t(e.currentTarget).attr("target"),
                        preventDefault: function() {
                            e.preventDefault()
                        }
                    })
                }.bind(this)), this._cwLanguage = new n({
                    el: this.$el.find(".component-widget-language")
                }), this._cwLanguage.render().on("navigate", function(t) {
                    this.trigger("navigate", t)
                }.bind(this)), this._cwMiniplayer = new r({
                    el: this.$el.find(".component-widget-miniplayer")
                }), this._cwMiniplayer.render().on("change:playback", function(t) {
                    this.trigger("change:playback", t)
                }.bind(this)), this._cwTicker = new s({
                    el: this.$el.find(".component-widget-ticker")
                }), this._cwTicker.render(), this.$elBandMembersNav.find("a").on("click", function(e) {
                    this.trigger("navigate", {
                        url: t(e.currentTarget).attr("href"),
                        preventDefault: function() {
                            e.preventDefault()
                        }
                    })
                }.bind(this)), this.$elCloseButton = this.$el.find(".top-nav .global-close");
                var o = this.$elCloseButton.find(".circle");
                this._closeButtonTimeline = i.fromTo(o, 1, {
                    drawSVG: "0% 0%"
                }, {
                    drawSVG: "0% 100%",
                    ease: "Power0.easeNone",
                    paused: !0
                }), this.$elMobNav = this.$el.find(".mob-nav"), this.$elMobNavToggle = this.$el.find(".mob-nav-btn"), this.$elMobNavToggle.on("click", function(t) {
                    var e = "on" == this.$elMobNav.attr("data-active");
                    e ? this.mobNavClose() : this.mobNavOpen()
                }.bind(this)), e.history.on("route", function(t) {
                    this.mobNavClose()
                }.bind(this)), this.setActiveSection(null)
            },
            mobNavOpen: function() {
                this.$elMobNav.attr("data-active", "on"), this.$elMobNavToggle.attr("data-active", "on")
            },
            mobNavClose: function() {
                this.$elMobNav.attr("data-active", "off"), this.$elMobNavToggle.attr("data-active", "off")
            },
            setActiveSection: function(e, i, n) {
                n = t.extend({
                    bandSubnavEnabled: !1
                }, n);
                var r = this.$elNavItems.removeClass("active").filter(function(i, n) {
                    return t(n).data("id") == e && t(n).data("is-current-page")
                });
                this.$elBandMembersNav.toggleClass("active", n.bandSubnavEnabled), n.bandSubnavEnabled && this.$elBandMembers.removeClass("current").filter(function(e, n) {
                    return t(n).data("member-id") == i
                }).addClass("current"), r.length || (r = this.$elNavItems.filter(function(e, i) {
                    return !t(i).data("id") && t(i).data("is-current-page")
                })), r.addClass("active")
            },
            concealControls: function() {
                this.$el.addClass("hide-controls")
            },
            revealControls: function() {
                this.$el.removeClass("hide-controls")
            },
            toggleCloseButton: function(t, e, i) {
                t = !!t, this.$elCloseButton.toggleClass("active", t), this.$elCloseButton.off("click"), t && this.$elCloseButton.on("click", i), this._closeButtonTimeline.progress(e)
            }
        })
    }), define("lib/parseUrlFromBackgroundImageCss", [], function() {
        return function(t) {
            var e = /^url\((['"]?)(.*)\1\)$/.exec(t);
            return e = e ? window.decodeURI(e[2]) : null
        }
    }), define("component/atmosphere/abyss", ["jquery", "component/base", "lib/parseUrlFromBackgroundImageCss"], function(t, e, i) {
        return e.extend({
            render: function() {
                return e.prototype.render.apply(this, arguments), this.$elBgFlat = this.$el.find(".bg-flat"), this.$elVideoContainer = this.$el.find(".video-container"), this.$elVideo = this.$elVideoContainer.find(".video"), this.$elBgDark = this.$el.find(".bg-dark-overlay"), t(window).on("resize", this.refresh.bind(this)), this.refresh(), this
            },
            refresh: function() {
                var t, e, i = this.$elVideo.data("width"),
                    n = this.$elVideo.data("height"),
                    r = i / n,
                    s = this.$elVideoContainer.width(),
                    o = this.$elVideoContainer.height(),
                    a = s / o;
                r > a ? (t = r * o, e = o) : (t = s, e = s / r), this.$elVideo.css({
                    left: (s - t) / 2,
                    top: (o - e) / 2,
                    width: t,
                    height: e
                })
            },
            getPreloadUrls: function() {
                return [".bg-flat"].map(function(t) {
                    return i(this.$el.find(t).css("background-image"))
                }.bind(this)).filter(function(t) {
                    return !!t
                })
            }
        })
    }), define("component/atmosphere/brink", ["jquery", "component/base", "lib/parseUrlFromBackgroundImageCss"], function(t, e, i) {
        return e.extend({
            render: function() {
                return e.prototype.render.apply(this, arguments), this.$elImage = this.$el.find(".image"), this
            },
            getPreloadUrls: function() {
                var t = i(this.$elImage.css("background-image"));
                return t ? [t] : []
            }
        })
    }), define("component/section/base", ["jquery", "component/base"], function(t, e) {
        return e.extend({
            _subsections: null,
            render: function() {
                return e.prototype.render.apply(this, arguments), this.$elContent = this.$el.find(">.inner >.content"), this._subsections = [], this
            },
            getSubsections: function() {
                return this._subsections
            },
            getSubsectionById: function(t) {
                var e = null;
                return this._subsections.some(function(i) {
                    if (i.id == t) return e = i, !0
                }), e
            },
            getVideos: function() {
                return []
            },
            pauseVideo: function() {},
            excludeVideosFromPlaylist: function() {
                return !1
            },
            refreshScroll: function(t) {}
        })
    }), define("lib/YouTube", ["jquery"], function(t) {
        return {
            _apiDeferred: null,
            fetchApi: function() {
                if (!this._apiDeferred) {
                    var e = new t.Deferred;
                    window.onYouTubeIframeAPIReady = function() {
                        e.resolve(window.YT)
                    }, t.ajax({
                        url: "//www.youtube.com/iframe_api",
                        dataType: "script",
                        timeout: 4e3
                    }).fail(e.reject), this._apiDeferred = e
                }
                return this._apiDeferred.promise()
            }
        }
    }),
    function(t) {
        "function" == typeof define && define.amd ? define("jquery-deferred-timeout", ["jquery"], t) : t(jQuery)
    }(function(t) {
        t.extend({
            DeferredTimeout: function(e) {
                var i = new t.Deferred;
                if (e <= 0) return i.resolve();
                var n = window.setTimeout(i.resolve, e);
                return i.always(function() {
                    window.clearTimeout(n)
                })
            }
        })
    }),
    function(t, e, i, n) {
        function r(e, i) {
            this.settings = null, this.options = t.extend({}, r.Defaults, i), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: {
                    start: null,
                    current: null
                },
                direction: null
            }, this._states = {
                current: {},
                tags: {
                    initializing: ["busy"],
                    animating: ["busy"],
                    dragging: ["interacting"]
                }
            }, t.each(["onResize", "onThrottledResize"], t.proxy(function(e, i) {
                this._handlers[i] = t.proxy(this[i], this)
            }, this)), t.each(r.Plugins, t.proxy(function(t, e) {
                this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
            }, this)), t.each(r.Workers, t.proxy(function(e, i) {
                this._pipe.push({
                    filter: i.filter,
                    run: t.proxy(i.run, this)
                })
            }, this)), this.setup(), this.initialize()
        }
        r.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: e,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            refreshClass: "owl-refresh",
            loadedClass: "owl-loaded",
            loadingClass: "owl-loading",
            rtlClass: "owl-rtl",
            responsiveClass: "owl-responsive",
            dragClass: "owl-drag",
            itemClass: "owl-item",
            stageClass: "owl-stage",
            stageOuterClass: "owl-stage-outer",
            grabClass: "owl-grab"
        }, r.Width = {
            Default: "default",
            Inner: "inner",
            Outer: "outer"
        }, r.Type = {
            Event: "event",
            State: "state"
        }, r.Plugins = {}, r.Workers = [{
            filter: ["width", "settings"],
            run: function() {
                this._width = this.$element.width()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                t.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                this.$stage.children(".cloned").remove()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                var e = this.settings.margin || "",
                    i = !this.settings.autoWidth,
                    n = this.settings.rtl,
                    r = {
                        width: "auto",
                        "margin-left": n ? e : "",
                        "margin-right": n ? "" : e
                    };
                !i && this.$stage.children().css(r), t.css = r
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                    i = null,
                    n = this._items.length,
                    r = !this.settings.autoWidth,
                    s = [];
                for (t.items = {
                        merge: !1,
                        width: e
                    }; n--;) i = this._mergers[n], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = i > 1 || t.items.merge, s[n] = r ? e * i : this._items[n].width();
                this._widths = s
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                var e = [],
                    i = this._items,
                    n = this.settings,
                    r = Math.max(2 * n.items, 4),
                    s = 2 * Math.ceil(i.length / 2),
                    o = n.loop && i.length ? n.rewind ? r : Math.max(r, s) : 0,
                    a = "",
                    l = "";
                for (o /= 2; o--;) e.push(this.normalize(e.length / 2, !0)), a += i[e[e.length - 1]][0].outerHTML, e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), l = i[e[e.length - 1]][0].outerHTML + l;
                this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, n = 0, r = 0, s = []; ++i < e;) n = s[i - 1] || 0, r = this._widths[this.relative(i)] + this.settings.margin, s.push(n + r * t);
                this._coordinates = s
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                var t = this.settings.stagePadding,
                    e = this._coordinates,
                    i = {
                        width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                        "padding-left": t || "",
                        "padding-right": t || ""
                    };
                this.$stage.css(i)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                var e = this._coordinates.length,
                    i = !this.settings.autoWidth,
                    n = this.$stage.children();
                if (i && t.items.merge)
                    for (; e--;) t.css.width = this._widths[this.relative(e)], n.eq(e).css(t.css);
                else i && (t.css.width = t.items.width, n.css(t.css))
            }
        }, {
            filter: ["items"],
            run: function() {
                this._coordinates.length < 1 && this.$stage.removeAttr("style")
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
            }
        }, {
            filter: ["position"],
            run: function() {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"],
            run: function() {
                var t, e, i, n, r = this.settings.rtl ? 1 : -1,
                    s = 2 * this.settings.stagePadding,
                    o = this.coordinates(this.current()) + s,
                    a = o + this.width() * r,
                    l = [];
                for (i = 0, n = this._coordinates.length; i < n; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + s * r, (this.op(t, "<=", o) && this.op(t, ">", a) || this.op(e, "<", o) && this.op(e, ">", a)) && l.push(i);
                this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
            }
        }], r.prototype.initialize = function() {
            if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
                var e, i, r;
                e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n, r = this.$element.children(i).width(), e.length && r <= 0 && this.preloadAutoWidthImages(e)
            }
            this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
        }, r.prototype.setup = function() {
            var e = this.viewport(),
                i = this.options.responsive,
                n = -1,
                r = null;
            i ? (t.each(i, function(t) {
                t <= e && t > n && (n = Number(t))
            }), r = t.extend({}, this.options, i[n]), "function" == typeof r.stagePadding && (r.stagePadding = r.stagePadding()), delete r.responsive, r.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + n))) : r = t.extend({}, this.options), this.trigger("change", {
                property: {
                    name: "settings",
                    value: r
                }
            }), this._breakpoint = n, this.settings = r, this.invalidate("settings"), this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            })
        }, r.prototype.optionsLogic = function() {
            this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
        }, r.prototype.prepare = function(e) {
            var i = this.trigger("prepare", {
                content: e
            });
            return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
                content: i.data
            }), i.data
        }, r.prototype.update = function() {
            for (var e = 0, i = this._pipe.length, n = t.proxy(function(t) {
                    return this[t]
                }, this._invalidated), r = {}; e < i;)(this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(r), e++;
            this._invalidated = {}, !this.is("valid") && this.enter("valid")
        }, r.prototype.width = function(t) {
            switch (t = t || r.Width.Default) {
                case r.Width.Inner:
                case r.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin
            }
        }, r.prototype.refresh = function() {
            this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
        }, r.prototype.onThrottledResize = function() {
            e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
        }, r.prototype.onResize = function() {
            return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
        }, r.prototype.registerEventHandlers = function() {
            t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
                return !1
            })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
        }, r.prototype.onDragStart = function(e) {
            var n = null;
            3 !== e.which && (t.support.transform ? (n = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), n = {
                x: n[16 === n.length ? 12 : 4],
                y: n[16 === n.length ? 13 : 5]
            }) : (n = this.$stage.position(), n = {
                x: this.settings.rtl ? n.left + this.$stage.width() - this.width() + this.settings.margin : n.left,
                y: n.top
            }), this.is("animating") && (t.support.transform ? this.animate(n.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = n, this._drag.stage.current = n, this._drag.pointer = this.pointer(e), t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy(function(e) {
                var n = this.difference(this._drag.pointer, this.pointer(e));
                t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(n.x) < Math.abs(n.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
            }, this)))
        }, r.prototype.onDragMove = function(t) {
            var e = null,
                i = null,
                n = null,
                r = this.difference(this._drag.pointer, this.pointer(t)),
                s = this.difference(this._drag.stage.start, r);
            this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, s.x = ((s.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), n = this.settings.pullDrag ? -1 * r.x / 5 : 0, s.x = Math.max(Math.min(s.x, e + n), i + n)), this._drag.stage.current = s, this.animate(s.x))
        }, r.prototype.onDragEnd = function(e) {
            var n = this.difference(this._drag.pointer, this.pointer(e)),
                r = this._drag.stage.current,
                s = n.x > 0 ^ this.settings.rtl ? "left" : "right";
            t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== n.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(r.x, 0 !== n.x ? s : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = s, (Math.abs(n.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
                return !1
            })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
        }, r.prototype.closest = function(e, i) {
            var n = -1,
                r = 30,
                s = this.width(),
                o = this.coordinates();
            return this.settings.freeDrag || t.each(o, t.proxy(function(t, a) {
                return "left" === i && e > a - r && e < a + r ? n = t : "right" === i && e > a - s - r && e < a - s + r ? n = t + 1 : this.op(e, "<", a) && this.op(e, ">", o[t + 1] || a - s) && (n = "left" === i ? t + 1 : t), n === -1
            }, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? n = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (n = e = this.maximum())), n
        }, r.prototype.animate = function(e) {
            var i = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
                transform: "translate3d(" + e + "px,0px,0px)",
                transition: this.speed() / 1e3 + "s"
            }) : i ? this.$stage.animate({
                left: e + "px"
            }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
                left: e + "px"
            })
        }, r.prototype.is = function(t) {
            return this._states.current[t] && this._states.current[t] > 0
        }, r.prototype.current = function(t) {
            if (t === n) return this._current;
            if (0 === this._items.length) return n;
            if (t = this.normalize(t), this._current !== t) {
                var e = this.trigger("change", {
                    property: {
                        name: "position",
                        value: t
                    }
                });
                e.data !== n && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                    property: {
                        name: "position",
                        value: this._current
                    }
                })
            }
            return this._current
        }, r.prototype.invalidate = function(e) {
            return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function(t, e) {
                return e
            })
        }, r.prototype.reset = function(t) {
            t = this.normalize(t), t !== n && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
        }, r.prototype.normalize = function(t, e) {
            var i = this._items.length,
                r = e ? 0 : this._clones.length;
            return !this.isNumeric(t) || i < 1 ? t = n : (t < 0 || t >= i + r) && (t = ((t - r / 2) % i + i) % i + r / 2), t
        }, r.prototype.relative = function(t) {
            return t -= this._clones.length / 2, this.normalize(t, !0)
        }, r.prototype.maximum = function(t) {
            var e, i, n, r = this.settings,
                s = this._coordinates.length;
            if (r.loop) s = this._clones.length / 2 + this._items.length - 1;
            else if (r.autoWidth || r.merge) {
                for (e = this._items.length, i = this._items[--e].width(), n = this.$element.width(); e-- && (i += this._items[e].width() + this.settings.margin, !(i > n)););
                s = e + 1
            } else s = r.center ? this._items.length - 1 : this._items.length - r.items;
            return t && (s -= this._clones.length / 2), Math.max(s, 0)
        }, r.prototype.minimum = function(t) {
            return t ? 0 : this._clones.length / 2
        }, r.prototype.items = function(t) {
            return t === n ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
        }, r.prototype.mergers = function(t) {
            return t === n ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
        }, r.prototype.clones = function(e) {
            var i = this._clones.length / 2,
                r = i + this._items.length,
                s = function(t) {
                    return t % 2 === 0 ? r + t / 2 : i - (t + 1) / 2
                };
            return e === n ? t.map(this._clones, function(t, e) {
                return s(e)
            }) : t.map(this._clones, function(t, i) {
                return t === e ? s(i) : null
            })
        }, r.prototype.speed = function(t) {
            return t !== n && (this._speed = t), this._speed
        }, r.prototype.coordinates = function(e) {
            var i, r = 1,
                s = e - 1;
            return e === n ? t.map(this._coordinates, t.proxy(function(t, e) {
                return this.coordinates(e)
            }, this)) : (this.settings.center ? (this.settings.rtl && (r = -1, s = e + 1), i = this._coordinates[e], i += (this.width() - i + (this._coordinates[s] || 0)) / 2 * r) : i = this._coordinates[s] || 0, i = Math.ceil(i))
        }, r.prototype.duration = function(t, e, i) {
            return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
        }, r.prototype.to = function(t, e) {
            var i = this.current(),
                n = null,
                r = t - this.relative(i),
                s = (r > 0) - (r < 0),
                o = this._items.length,
                a = this.minimum(),
                l = this.maximum();
            this.settings.loop ? (!this.settings.rewind && Math.abs(r) > o / 2 && (r += s * -1 * o), t = i + r, n = ((t - a) % o + o) % o + a, n !== t && n - r <= l && n - r > 0 && (i = n - r, t = n, this.reset(i))) : this.settings.rewind ? (l += 1, t = (t % l + l) % l) : t = Math.max(a, Math.min(l, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
        }, r.prototype.next = function(t) {
            t = t || !1, this.to(this.relative(this.current()) + 1, t)
        }, r.prototype.prev = function(t) {
            t = t || !1, this.to(this.relative(this.current()) - 1, t)
        }, r.prototype.onTransitionEnd = function(t) {
            return (t === n || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.leave("animating"), void this.trigger("translated"))
        }, r.prototype.viewport = function() {
            var n;
            return this.options.responsiveBaseElement !== e ? n = t(this.options.responsiveBaseElement).width() : e.innerWidth ? n = e.innerWidth : i.documentElement && i.documentElement.clientWidth ? n = i.documentElement.clientWidth : console.warn("Can not detect viewport width."), n
        }, r.prototype.replace = function(e) {
            this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function() {
                return 1 === this.nodeType
            }).each(t.proxy(function(t, e) {
                e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
            }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
        }, r.prototype.add = function(e, i) {
            var r = this.relative(this._current);
            i = i === n ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
                    content: e,
                    position: i
                }), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
                this._items[r] && this.reset(this._items[r].index()), this.invalidate("items"), this.trigger("added", {
                    content: e,
                    position: i
                })
        }, r.prototype.remove = function(t) {
            t = this.normalize(t, !0), t !== n && (this.trigger("remove", {
                content: this._items[t],
                position: t
            }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
                content: null,
                position: t
            }))
        }, r.prototype.preloadAutoWidthImages = function(e) {
            e.each(t.proxy(function(e, i) {
                this.enter("pre-loading"), i = t(i), t(new Image).one("load", t.proxy(function(t) {
                    i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
                }, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
            }, this))
        }, r.prototype.destroy = function() {
            this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), this.settings.responsive !== !1 && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
            for (var n in this._plugins) this._plugins[n].destroy();
            this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
        }, r.prototype.op = function(t, e, i) {
            var n = this.settings.rtl;
            switch (e) {
                case "<":
                    return n ? t > i : t < i;
                case ">":
                    return n ? t < i : t > i;
                case ">=":
                    return n ? t <= i : t >= i;
                case "<=":
                    return n ? t >= i : t <= i
            }
        }, r.prototype.on = function(t, e, i, n) {
            t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
        }, r.prototype.off = function(t, e, i, n) {
            t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
        }, r.prototype.trigger = function(e, i, n, s, o) {
            var a = {
                    item: {
                        count: this._items.length,
                        index: this.current()
                    }
                },
                l = t.camelCase(t.grep(["on", e, n], function(t) {
                    return t
                }).join("-").toLowerCase()),
                h = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({
                    relatedTarget: this
                }, a, i));
            return this._supress[e] || (t.each(this._plugins, function(t, e) {
                e.onTrigger && e.onTrigger(h)
            }), this.register({
                type: r.Type.Event,
                name: e
            }), this.$element.trigger(h), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, h)), h
        }, r.prototype.enter = function(e) {
            t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
                this._states.current[e] === n && (this._states.current[e] = 0), this._states.current[e]++
            }, this))
        }, r.prototype.leave = function(e) {
            t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
                this._states.current[e]--
            }, this))
        }, r.prototype.register = function(e) {
            if (e.type === r.Type.Event) {
                if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
                    var i = t.event.special[e.name]._default;
                    t.event.special[e.name]._default = function(t) {
                        return !i || !i.apply || t.namespace && t.namespace.indexOf("owl") !== -1 ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments)
                    }, t.event.special[e.name].owl = !0
                }
            } else e.type === r.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function(i, n) {
                return t.inArray(i, this._states.tags[e.name]) === n
            }, this)))
        }, r.prototype.suppress = function(e) {
            t.each(e, t.proxy(function(t, e) {
                this._supress[e] = !0
            }, this))
        }, r.prototype.release = function(e) {
            t.each(e, t.proxy(function(t, e) {
                delete this._supress[e]
            }, this))
        }, r.prototype.pointer = function(t) {
            var i = {
                x: null,
                y: null
            };
            return t = t.originalEvent || t || e.event, t = t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, t.pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
        }, r.prototype.isNumeric = function(t) {
            return !isNaN(parseFloat(t))
        }, r.prototype.difference = function(t, e) {
            return {
                x: t.x - e.x,
                y: t.y - e.y
            }
        }, t.fn.owlCarousel = function(e) {
            var i = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var n = t(this),
                    s = n.data("owl.carousel");
                s || (s = new r(this, "object" == typeof e && e), n.data("owl.carousel", s), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(e, i) {
                    s.register({
                        type: r.Type.Event,
                        name: i
                    }), s.$element.on(i + ".owl.carousel.core", t.proxy(function(t) {
                        t.namespace && t.relatedTarget !== this && (this.suppress([i]), s[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
                    }, s))
                })), "string" == typeof e && "_" !== e.charAt(0) && s[e].apply(s, i)
            })
        }, t.fn.owlCarousel.Constructor = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this._core = e, this._interval = null, this._visible = null, this._handlers = {
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoRefresh && this.watch()
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        r.Defaults = {
            autoRefresh: !0,
            autoRefreshInterval: 500
        }, r.prototype.watch = function() {
            this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
        }, r.prototype.refresh = function() {
            this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
        }, r.prototype.destroy = function() {
            var t, i;
            e.clearInterval(this._interval);
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this._core = e, this._loaded = [], this._handlers = {
                "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function(e) {
                    if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                        for (var i = this._core.settings, r = i.center && Math.ceil(i.items / 2) || i.items, s = i.center && r * -1 || 0, o = (e.property && e.property.value !== n ? e.property.value : this._core.current()) + s, a = this._core.clones().length, l = t.proxy(function(t, e) {
                                this.load(e)
                            }, this); s++ < r;) this.load(a / 2 + this._core.relative(o)), a && t.each(this._core.clones(this._core.relative(o)), l), o++
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        r.Defaults = {
            lazyLoad: !1
        }, r.prototype.load = function(i) {
            var n = this._core.$stage.children().eq(i),
                r = n && n.find(".owl-lazy");
            !r || t.inArray(n.get(0), this._loaded) > -1 || (r.each(t.proxy(function(i, n) {
                var r, s = t(n),
                    o = e.devicePixelRatio > 1 && s.attr("data-src-retina") || s.attr("data-src");
                this._core.trigger("load", {
                    element: s,
                    url: o
                }, "lazy"), s.is("img") ? s.one("load.owl.lazy", t.proxy(function() {
                    s.css("opacity", 1), this._core.trigger("loaded", {
                        element: s,
                        url: o
                    }, "lazy")
                }, this)).attr("src", o) : (r = new Image, r.onload = t.proxy(function() {
                    s.css({
                        "background-image": 'url("' + o + '")',
                        opacity: "1"
                    }), this._core.trigger("loaded", {
                        element: s,
                        url: o
                    }, "lazy")
                }, this), r.src = o)
            }, this)), this._loaded.push(n.get(0)))
        }, r.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Lazy = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this._core = e, this._handlers = {
                "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoHeight && this.update()
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
                }, this),
                "loaded.owl.lazy": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        r.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        }, r.prototype.update = function() {
            var e = this._core._current,
                i = e + this._core.settings.items,
                n = this._core.$stage.children().toArray().slice(e, i),
                r = [],
                s = 0;
            t.each(n, function(e, i) {
                r.push(t(i).height())
            }), s = Math.max.apply(null, r), this._core.$stage.parent().height(s).addClass(this._core.settings.autoHeightClass)
        }, r.prototype.destroy = function() {
            var t, e;
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this._core = e, this._videos = {}, this._playing = null, this._handlers = {
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.register({
                        type: "state",
                        name: "playing",
                        tags: ["interacting"]
                    })
                }, this),
                "resize.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
                }, this),
                "refreshed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && "position" === t.property.name && this._playing && this.stop()
                }, this),
                "prepared.owl.carousel": t.proxy(function(e) {
                    if (e.namespace) {
                        var i = t(e.content).find(".owl-video");
                        i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
                    }
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
                this.play(t)
            }, this))
        };
        r.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        }, r.prototype.fetch = function(t, e) {
            var i = function() {
                    return t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube"
                }(),
                n = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
                r = t.attr("data-width") || this._core.settings.videoWidth,
                s = t.attr("data-height") || this._core.settings.videoHeight,
                o = t.attr("href");
            if (!o) throw new Error("Missing video URL.");
            if (n = o.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), n[3].indexOf("youtu") > -1) i = "youtube";
            else if (n[3].indexOf("vimeo") > -1) i = "vimeo";
            else {
                if (!(n[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
                i = "vzaar"
            }
            n = n[6], this._videos[o] = {
                type: i,
                id: n,
                width: r,
                height: s
            }, e.attr("data-video", o), this.thumbnail(t, this._videos[o])
        }, r.prototype.thumbnail = function(e, i) {
            var n, r, s, o = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
                a = e.find("img"),
                l = "src",
                h = "",
                c = this._core.settings,
                u = function(t) {
                    r = '<div class="owl-video-play-icon"></div>', n = c.lazyLoad ? '<div class="owl-video-tn ' + h + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(n), e.after(r)
                };
            return e.wrap('<div class="owl-video-wrapper"' + o + "></div>"), this._core.settings.lazyLoad && (l = "data-src", h = "owl-lazy"), a.length ? (u(a.attr(l)), a.remove(), !1) : void("youtube" === i.type ? (s = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg", u(s)) : "vimeo" === i.type ? t.ajax({
                type: "GET",
                url: "//vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(t) {
                    s = t[0].thumbnail_large, u(s)
                }
            }) : "vzaar" === i.type && t.ajax({
                type: "GET",
                url: "//vzaar.com/api/videos/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(t) {
                    s = t.framegrab_url, u(s)
                }
            }))
        }, r.prototype.stop = function() {
            this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
        }, r.prototype.play = function(e) {
            var i, n = t(e.target),
                r = n.closest("." + this._core.settings.itemClass),
                s = this._videos[r.attr("data-video")],
                o = s.width || "100%",
                a = s.height || this._core.$stage.height();
            this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), r = this._core.items(this._core.relative(r.index())), this._core.reset(r.index()), "youtube" === s.type ? i = '<iframe width="' + o + '" height="' + a + '" src="//www.youtube.com/embed/' + s.id + "?autoplay=1&rel=0&v=" + s.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === s.type ? i = '<iframe src="//player.vimeo.com/video/' + s.id + '?autoplay=1" width="' + o + '" height="' + a + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === s.type && (i = '<iframe frameborder="0"height="' + a + '"width="' + o + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + s.id + '/player?autoplay=true"></iframe>'), t('<div class="owl-video-frame">' + i + "</div>").insertAfter(r.find(".owl-video")), this._playing = r.addClass("owl-video-playing"))
        }, r.prototype.isInFullScreen = function() {
            var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
            return e && t(e).parent().hasClass("owl-video-frame")
        }, r.prototype.destroy = function() {
            var t, e;
            this._core.$element.off("click.owl.video");
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Video = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this.core = e, this.core.options = t.extend({}, r.Defaults, this.core.options), this.swapping = !0, this.previous = n, this.next = n, this.handlers = {
                "change.owl.carousel": t.proxy(function(t) {
                    t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
                }, this),
                "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                    t.namespace && (this.swapping = "translated" == t.type)
                }, this),
                "translate.owl.carousel": t.proxy(function(t) {
                    t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        r.Defaults = {
            animateOut: !1,
            animateIn: !1
        }, r.prototype.swap = function() {
            if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
                this.core.speed(0);
                var e, i = t.proxy(this.clear, this),
                    n = this.core.$stage.children().eq(this.previous),
                    r = this.core.$stage.children().eq(this.next),
                    s = this.core.settings.animateIn,
                    o = this.core.settings.animateOut;
                this.core.current() !== this.previous && (o && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.one(t.support.animation.end, i).css({
                    left: e + "px"
                }).addClass("animated owl-animated-out").addClass(o)), s && r.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(s))
            }
        }, r.prototype.clear = function(e) {
            t(e.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
        }, r.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Animate = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this._core = e, this._timeout = null, this._paused = !1, this._handlers = {
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
                }, this),
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoplay && this.play()
                }, this),
                "play.owl.autoplay": t.proxy(function(t, e, i) {
                    t.namespace && this.play(e, i)
                }, this),
                "stop.owl.autoplay": t.proxy(function(t) {
                    t.namespace && this.stop()
                }, this),
                "mouseover.owl.autoplay": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this),
                "mouseleave.owl.autoplay": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
                }, this),
                "touchstart.owl.core": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this),
                "touchend.owl.core": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this.play()
                }, this)
            }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, r.Defaults, this._core.options)
        };
        r.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }, r.prototype.play = function(t, e) {
            this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
        }, r.prototype._getNextTimeout = function(n, r) {
            return this._timeout && e.clearTimeout(this._timeout), e.setTimeout(t.proxy(function() {
                this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(r || this._core.settings.autoplaySpeed)
            }, this), n || this._core.settings.autoplayTimeout)
        }, r.prototype._setAutoPlayInterval = function() {
            this._timeout = this._getNextTimeout()
        }, r.prototype.stop = function() {
            this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"))
        }, r.prototype.pause = function() {
            this._core.is("rotating") && (this._paused = !0)
        }, r.prototype.destroy = function() {
            var t, e;
            this.stop();
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.autoplay = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        "use strict";
        var r = function(e) {
            this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            }, this._handlers = {
                "prepared.owl.carousel": t.proxy(function(e) {
                    e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
                }, this),
                "added.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
                }, this),
                "remove.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && "position" == t.property.name && this.draw()
                }, this),
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
                }, this),
                "refreshed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers)
        };
        r.Defaults = {
            nav: !1,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        }, r.prototype.initialize = function() {
            var e, i = this._core.settings;
            this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function(t) {
                this.prev(i.navSpeed)
            }, this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function(t) {
                this.next(i.navSpeed)
            }, this)), i.dotsData || (this._templates = [t("<div>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", t.proxy(function(e) {
                var n = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
                e.preventDefault(), this.to(n, i.dotsSpeed)
            }, this));
            for (e in this._overrides) this._core[e] = t.proxy(this[e], this)
        }, r.prototype.destroy = function() {
            var t, e, i, n;
            for (t in this._handlers) this.$element.off(t, this._handlers[t]);
            for (e in this._controls) this._controls[e].remove();
            for (n in this.overides) this._core[n] = this._overrides[n];
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, r.prototype.update = function() {
            var t, e, i, n = this._core.clones().length / 2,
                r = n + this._core.items().length,
                s = this._core.maximum(!0),
                o = this._core.settings,
                a = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
            if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy)
                for (this._pages = [], t = n, e = 0, i = 0; t < r; t++) {
                    if (e >= a || 0 === e) {
                        if (this._pages.push({
                                start: Math.min(s, t - n),
                                end: t - n + a - 1
                            }), Math.min(s, t - n) === s) break;
                        e = 0, ++i
                    }
                    e += this._core.mergers(this._core.relative(t))
                }
        }, r.prototype.draw = function() {
            var e, i = this._core.settings,
                n = this._core.items().length <= i.items,
                r = this._core.relative(this._core.current()),
                s = i.loop || i.rewind;
            this._controls.$relative.toggleClass("disabled", !i.nav || n), i.nav && (this._controls.$previous.toggleClass("disabled", !s && r <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !s && r >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !i.dots || n), i.dots && (e = this._pages.length - this._controls.$absolute.children().length, i.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
        }, r.prototype.onTrigger = function(e) {
            var i = this._core.settings;
            e.page = {
                index: t.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
            }
        }, r.prototype.current = function() {
            var e = this._core.relative(this._core.current());
            return t.grep(this._pages, t.proxy(function(t, i) {
                return t.start <= e && t.end >= e
            }, this)).pop()
        }, r.prototype.getPosition = function(e) {
            var i, n, r = this._core.settings;
            return "page" == r.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length, e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += r.slideBy : i -= r.slideBy), i
        }, r.prototype.next = function(e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
        }, r.prototype.prev = function(e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
        }, r.prototype.to = function(e, i, n) {
            var r;
            !n && this._pages.length ? (r = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % r + r) % r].start, i)) : t.proxy(this._overrides.to, this._core)(e, i)
        }, t.fn.owlCarousel.Constructor.Plugins.Navigation = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        "use strict";
        var r = function(i) {
            this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
                "initialized.owl.carousel": t.proxy(function(i) {
                    i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
                }, this),
                "prepared.owl.carousel": t.proxy(function(e) {
                    if (e.namespace) {
                        var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                        if (!i) return;
                        this._hashes[i] = e.content
                    }
                }, this),
                "changed.owl.carousel": t.proxy(function(i) {
                    if (i.namespace && "position" === i.property.name) {
                        var n = this._core.items(this._core.relative(this._core.current())),
                            r = t.map(this._hashes, function(t, e) {
                                return t === n ? e : null
                            }).join();
                        if (!r || e.location.hash.slice(1) === r) return;
                        e.location.hash = r
                    }
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function(t) {
                var i = e.location.hash.substring(1),
                    r = this._core.$stage.children(),
                    s = this._hashes[i] && r.index(this._hashes[i]);
                s !== n && s !== this._core.current() && this._core.to(this._core.relative(s), !1, !0)
            }, this))
        };
        r.Defaults = {
            URLhashListener: !1
        }, r.prototype.destroy = function() {
            var i, n;
            t(e).off("hashchange.owl.navigation");
            for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
            for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Hash = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        function r(e, i) {
            var r = !1,
                s = e.charAt(0).toUpperCase() + e.slice(1);
            return t.each((e + " " + a.join(s + " ") + s).split(" "), function(t, e) {
                if (o[e] !== n) return r = !i || e, !1
            }), r
        }

        function s(t) {
            return r(t, !0)
        }
        var o = t("<support>").get(0).style,
            a = "Webkit Moz O ms".split(" "),
            l = {
                transition: {
                    end: {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        transition: "transitionend"
                    }
                },
                animation: {
                    end: {
                        WebkitAnimation: "webkitAnimationEnd",
                        MozAnimation: "animationend",
                        OAnimation: "oAnimationEnd",
                        animation: "animationend"
                    }
                }
            },
            h = {
                csstransforms: function() {
                    return !!r("transform")
                },
                csstransforms3d: function() {
                    return !!r("perspective")
                },
                csstransitions: function() {
                    return !!r("transition")
                },
                cssanimations: function() {
                    return !!r("animation")
                }
            };
        h.csstransitions() && (t.support.transition = new String(s("transition")), t.support.transition.end = l.transition.end[t.support.transition]), h.cssanimations() && (t.support.animation = new String(s("animation")), t.support.animation.end = l.animation.end[t.support.animation]), h.csstransforms() && (t.support.transform = new String(s("transform")), t.support.transform3d = h.csstransforms3d())
    }(window.Zepto || window.jQuery, window, document), define("jquery-owl-carousel", function() {}), define("component/section/album", ["jquery", "./base", "lib/YouTube", "TweenMax", "jquery-deferred-timeout", "jquery-owl-carousel"], function(t, e, i, n) {
        return e.extend({
            _player: null,
            _playerPromise: null,
            _currentTrackIndex: 0,
            _isPlayerOpen: !1,
            _openPlayerDeferred: null,
            _closePlayerDeferred: null,
            render: function() {
                e.prototype.render.apply(this, arguments), this.$elTracksVideoCarousel = this.$el.find(".js-tracks-video-carousel"), this.model.trackYoutubeIDs = this.$elTracksVideoCarousel.data("youtube-ids").split(","), this.model.trackNames = this.$el.find(".playing-video-info li h2").toArray().map(function(e) {
                    return t(e).text()
                }), this.$elYouTubeEmbedWrap = this.$el.find(".js-youtube-embed-wrap"), this.$elPlayer = this.$el.find(".player"), this._updateTrackRotation(this._currentTrackIndex), this.$elPlay = this.$el.find(".component-button-play"), this.$el.find(".current-video >.cover").on("click", function(t) {
                    this.playVideo()
                }.bind(this)).on("mouseenter mouseleave", function(t) {
                    this.$elPlay.toggleClass("hover", "mouseenter" == t.type)
                }.bind(this)), this.$elClosePlayerButton = this.$el.find(".js-close-youtube-player").on("click", function(t) {
                    this._closePlayer()
                }.bind(this)), this.$el.find(".js-prev-video").on("click", function(t) {
                    this.prevVideo()
                }.bind(this)), this.$el.find(".js-next-video").on("click", function(t) {
                    this.nextVideo()
                }.bind(this));
                var i = this.$el.find(".track-number-carousel-container");
                this.$elCarousel = i.find(".carousel");
                var n = i.find(".carousel-wrapper"),
                    r = this.$elCarousel.find(".track-button").length,
                    s = r % 2 == 1 ? r : r + 1,
                    o = this.$elCarousel.find(".track-button").width(),
                    a = n.width();
                s * o > a && (s = a % o, s = r % 2 == 1 ? r : r - 1), n.css("width", s * o), this.$elCarousel.owlCarousel({
                    center: !0,
                    items: s,
                    loop: !0,
                    mouseDrag: !1,
                    touchDrag: !1,
                    pullDrag: !1,
                    freeDrag: !1,
                    dots: !1
                }).on("click", ".track-button", function(e) {
                    var i = t(e.currentTarget).data("index");
                    this.goToVideoByIndex(i)
                }.bind(this)), this._getPlayer()
            },
            getPreloadUrls: function() {
                return this.$el.find("[data-preload]").toArray().map(function(e) {
                    return t(e).attr("data-preload")
                })
            },
            _openPlayer: function() {
                if (this._openPlayerDeferred) return this._openPlayerDeferred.promise();
                if (this._closePlayerDeferred && this._closePlayerDeferred.resolve(), this._isPlayerOpen) return (new t.Deferred).resolve().promise();
                this._isPlayerOpen = !0, this.trigger("player:opening"), this.$elYouTubeEmbedWrap.show();
                var e = window.setTimeout(function() {
                    this.$elTracksVideoCarousel.attr("data-video-state", "open")
                }.bind(this), 20);
                return this._openPlayerDeferred = new t.DeferredTimeout(720).always(function() {
                    window.clearTimeout(e), this._openPlayerDeferred = null, this.$elClosePlayerButton.prop("disabled", !1), this.trigger("player:opened")
                }.bind(this)), this._openPlayerDeferred.promise()
            },
            _closePlayer: function() {
                return this._closePlayerDeferred ? this._closePlayerDeferred.promise() : (this._openPlayerDeferred && this._openPlayerDeferred.resolve(), this._isPlayerOpen ? (this._isPlayerOpen = !1, this.trigger("player:closing"), this.$elTracksVideoCarousel.attr("data-video-state", "closed"), this._closePlayerDeferred = new t.DeferredTimeout(400).always(function() {
                    this.pauseVideo(), this.$elYouTubeEmbedWrap.hide(), this._closePlayerDeferred = null, this.$elClosePlayerButton.prop("disabled", !0), this.trigger("player:closed")
                }.bind(this)), this._closePlayerDeferred.promise()) : (new t.Deferred).resolve().promise())
            },
            nextVideo: function() {
                this.goToVideoByIndex(this._currentTrackIndex + 1)
            },
            prevVideo: function() {
                this.goToVideoByIndex(this._currentTrackIndex - 1)
            },
            goToVideoByIndex: function(e, i) {
                var n = (this._currentTrackIndex, this._normalizeIndex(e)),
                    r = this.model.trackYoutubeIDs[n];
                this._execFnOnPlayer(function(e) {
                    return this._isPlayerOpen ? e.loadVideoById(r) : e.cueVideoById(r), (new t.Deferred).resolve().promise()
                }.bind(this)), this._updateTrackRotation(n), this.$elCarousel.trigger("to.owl.carousel", [e]), this._currentTrackIndex = n
            },
            pauseVideo: function() {
                return this._getPlayer().then(function(t) {
                    t.pauseVideo()
                })
            },
            playVideo: function() {
                return this._openPlayer(), this._execFnOnPlayer(function(e) {
                    return e.playVideo(), (new t.Deferred).resolve().promise()
                })
            },
            getVideos: function() {
                return this.model.trackNames.map(function(t, e) {
                    return {
                        index: e,
                        name: t
                    }
                })
            },
            _execFnOnPlayer: function(t) {
                var e = this._getPlayer();
                return "resolved" == e.state() ? t(this._player) : e.then(t)
            },
            _updateTrackRotation: function(t) {
                this.$el.find(".prev-video .overflow-list-wrap ul").css({
                    transform: "translateY(" + this._normalizeIndex(t - 1) * -100 + "%)"
                }), this.$el.find(".current-video .overflow-list-wrap ul").css({
                    transform: "translateY(" + t * -100 + "%)"
                }), this.$el.find(".next-video .overflow-list-wrap ul").css({
                    transform: "translateY(" + this._normalizeIndex(t + 1) * -100 + "%)"
                })
            },
            _normalizeIndex: function(t) {
                var e = this.model.trackYoutubeIDs.length;
                return (t % e + e) % e
            },
            _getPlayer: function() {
                if (!this._playerPromise) {
                    var e = new t.Deferred;
                    i.fetchApi().then(function(t) {
                        var i = new t.Player(this.$elPlayer[0], {
                            videoId: this.model.trackYoutubeIDs[this._currentTrackIndex],
                            suggestedQuality: "hd1080",
                            playerVars: {
                                autoplay: 0,
                                controls: 1,
                                iv_load_policy: 3,
                                showinfo: 0,
                                rel: 0,
                                origin: document.domain,
                                start: 0,
                                wmode: "opaque",
                                playsinline: !0
                            },
                            events: {
                                onReady: function() {
                                    this._player = i, e.resolve(i)
                                }.bind(this),
                                onError: function() {
                                    e.reject()
                                },
                                onStateChange: function(e) {
                                    switch (this.trigger("change:playback", {
                                        data: e.data,
                                        track: {
                                            index: this._currentTrackIndex,
                                            name: this.model.trackNames[this._currentTrackIndex]
                                        }
                                    }), e.data) {
                                        case t.PlayerState.PLAYING:
                                            this._isPlayerOpen || this.pauseVideo();
                                            break;
                                        case t.PlayerState.ENDED:
                                            this.nextVideo()
                                    }
                                }.bind(this)
                            }
                        })
                    }.bind(this)), this._playerPromise = e.promise()
                }
                return this._playerPromise
            }
        })
    }), define("component/section/band", ["jquery", "./base", "TweenMax", "Power2"], function(t, e, i, n) {
        return e.extend({
            render: function() {
                e.prototype.render.apply(this, arguments), this.$elFullBand = this.$el.find(".full-band"), this.$el.find(".hotspot").on("mouseenter mouseleave", function(e) {
                    var i = t(e.currentTarget).data("id");
                    this.$el.find('.members .member[data-id="' + i + '"]').toggleClass("hovering", "mouseenter" == e.type)
                }.bind(this)).on("click", function(e) {
                    this.trigger("navigate", {
                        url: "#s/" + this.model.id + "/s/" + t(e.currentTarget).data("id"),
                        preventDefault: function() {}
                    })
                }.bind(this)), this.$elBandMembers = this.$el.find(".band-members >.band-member"), this._subsections = this.$el.find("[data-subsection-id]").toArray().map(function(e) {
                    return {
                        id: t(e).data("subsection-id"),
                        $el: t(e)
                    }
                }), this.$elReadMoreWrap = this.$el.find(".read-more-wrap"), this.$elStoryContent = this.$el.find(".subsection.story .content"), this.$elStorySections = this.$elStoryContent.find(".sections .section"), this.$el.find(".action.read-more").on("click", function() {
                    this.toggleStory(!0)
                }.bind(this)), t(window).on("resize", this.refresh.bind(this)), this.refresh()
            },
            fullBandReveal: function() {
                this.$elFullBand.addClass("revealed")
            },
            fullBandConceal: function() {
                this.$elFullBand.removeClass("revealed")
            },
            toggleStory: function(e) {
                if (e = !!e, this.$elStoryContent.toggleClass("expanded", e), e) i.to(this.$elStoryContent, .5, {
                    "max-height": 2 * t(window).height(),
                    ease: n.easeIn,
                    onComplete: function() {
                        this.$elStoryContent.css("max-height", "none"), this.$elReadMoreWrap.addClass("hidden")
                    }.bind(this)
                });
                else {
                    this.trigger("navigate", {
                        url: "#s/band/s/story",
                        preventDefault: function() {}
                    });
                    var r = this.$elStoryContent.height();
                    i.fromTo(this.$elStoryContent, .6, {
                        "max-height": r
                    }, {
                        "max-height": this.$elStoryContent.css("max-height", "").css("max-height"),
                        ease: n.easeOut,
                        delay: .3,
                        onStart: function() {
                            this.$elReadMoreWrap.removeClass("hidden")
                        }.bind(this),
                        onComplete: function() {
                            this.$elStoryContent.css("max-height", "")
                        }.bind(this)
                    })
                }
                this.trigger("resize")
            },
            isStoryExpanded: function() {
                return this.$elStoryContent.hasClass("expanded")
            },
            refreshScroll: function(e) {
                var i = t(window).height(),
                    n = .6 * i;
                this.getSubsections().forEach(function(t) {
                    var e = t.$el.offset().top < n;
                    if (t.$el.attr("data-active", e ? "on" : "off"), "story" == t.id) {
                        var r = t.$el.offset().top * -1,
                            s = t.$el.height() - .4 * i,
                            o = r >= 0 - .25 * i && r < s,
                            a = r / s;
                        a < 0 && (a = 0), a > 1 && (a = 1), this.trigger("story:active", {
                            state: o && this.isStoryExpanded(),
                            progress: a,
                            closeCallback: function() {
                                this.toggleStory(!1)
                            }.bind(this)
                        })
                    }
                }.bind(this));
                var r = .7 * i;
                this.$elStorySections.each(function(e, i) {
                    i = t(i);
                    var n = i.offset().top < r;
                    i.attr("data-active", n ? "on" : "off")
                }.bind(this))
            },
            refresh: function() {
                this.$elBandMembers.each(function(e, i) {
                    var n = t(i).find(".part.info").height();
                    t(i).find(".part.image").height(n)
                })
            }
        })
    }), define("lib/gtm", [], function() {
        return {
            event: function(t, e, i, n, r) {
                this.push({
                    event: t,
                    eventCategory: e,
                    eventAction: i,
                    eventLabel: n,
                    eventValue: r
                })
            },
            analyticsEvent: function(t, e, i, n) {
                this.event("analyticsEvent", t, e, i, n)
            },
            push: function(t) {
                var e = window.dataLayer;
                try {
                    e.push(t)
                } catch (t) {}
            }
        }
    }), define("component/section/download", ["jquery", "./base", "lib/gtm"], function(t, e, i) {
        return e.extend({
            render: function() {
                return e.prototype.render.apply(this, arguments), this.$el.find(".action.download").on("click", function(t) {
                    i.analyticsEvent("Click Action", "Click", "Signup Download Click")
                }), this
            }
        })
    }), define("component/section/footer", ["jquery", "./base"], function(t, e) {
        return e.extend({
            render: function() {
                e.prototype.render.apply(this, arguments)
            }
        })
    }), define("component/section/lyric", ["jquery", "./base", "TweenMax", "Power2"], function(t, e, i, n) {
        return e.extend({
            render: function() {
                e.prototype.render.apply(this, arguments), this.$elOpenLyrics = this.$el.find(".js-open-lyrics"), this._renderTracks(), this.$elOpenLyrics.on("click", function(e) {
                    var i = t(this);
                    "on" == i.attr("data-active") ? i.attr("data-active", "off") : i.attr("data-active", "on")
                })
            },
            _renderTracks: function() {
                this.$elOpenLyrics.filter(".track").each(function() {
                    var e = t(this).find(".lyrics-content-wrap >.inner"),
                        i = e.html();
                    i = t.trim(i);
                    var n = t();
                    i.split(/<br>\s*(?:<br>)+/).forEach(function(e) {
                        var i = t("<p></p>");
                        e.split(/<br>/).forEach(function(e, n, r) {
                            i.append(document.createTextNode(t.trim(e))), n + 1 < r.length && i.append(t("<br />"))
                        }), n = n.add(i)
                    }), e.html(n)
                })
            }
        })
    }), define("component/section/masthead", ["jquery", "./base", "lib/parseUrlFromBackgroundImageCss", "modernizr"], function(t, e, i, n) {
        return e.extend({
            _containers: null,
            render: function() {
                e.prototype.render.apply(this, arguments), this._containers = [this._renderContainer(this.$elContent.find(".component-section-masthead-content-container"))]
            },
            _renderContainer: function(e) {
                var i = e.find(">.inner"),
                    n = e.find(".component-button-play").on("mouseenter mouseleave", function(e) {
                        t(e.currentTarget).toggleClass("hover", "mouseenter" == e.type)
                    }.bind(this)).on("click", function(t) {
                        this.trigger("play:click")
                    }.bind(this)),
                    r = e.find(".pentakill-marque").on("click", function(t) {
                        this.trigger("mask:click")
                    }.bind(this)),
                    s = r.find(".marque-mask");
                return {
                    el: e,
                    elInner: i,
                    elPlayButton: n,
                    elPlayButtonContainer: e.find(".play-button-container"),
                    elMarque: r,
                    elMask: s
                }
            },
            revealMask: function() {
                this._containers.forEach(function(t) {
                    t.elInner.attr("data-active", "on")
                })
            },
            revealPlayButton: function() {
                this._containers.forEach(function(t) {
                    t.elPlayButtonContainer.addClass("active"), t.elPlayButton.prop("disabled", "")
                })
            },
            toggleMaskGlitch: function(t) {
                this._containers.forEach(function(e) {
                    e.elMarque.toggleClass("glitch", t)
                })
            },
            getElMask: function() {
                return this._containers.reduce(function(t, e) {
                    return t.add(e.elMask)
                }, t())
            },
            getElInner: function() {
                return this._containers.reduce(function(t, e) {
                    return t.add(e.elInner)
                }, t())
            },
            cloneContentContainer: function() {
                var t = this._renderContainer(this._containers[0].el.clone());
                return this._containers.push(t), t
            },
            refreshScroll: function(t) {
                if (n.csspointerevents) {
                    var e = this._containers[0];
                    e.el.css("top", t + 46)
                }
            },
            getContainer: function(t) {
                return this._containers[t]
            },
            getPreloadUrls: function() {
                return [".marque-numerals >.inner", ".marque-mask .the-mask"].map(function(t) {
                    return i(this.$el.find(t).css("background-image"))
                }.bind(this)).filter(function(t) {
                    return !!t
                })
            }
        })
    }), define("component/section/tour", ["jquery", "./base"], function(t, e) {
        return e.extend({
            render: function() {
                return e.prototype.render.apply(this, arguments), this
            }
        })
    }), define("component/section/video", ["jquery", "./base", "lib/YouTube", "TweenMax"], function(t, e, i, n) {
        return e.extend({
            _player: null,
            _openPlayerPromise: null,
            render: function() {
                return e.prototype.render.apply(this, arguments), this.$elCover = this.$el.find(".cover"), this.$elPlay = this.$elCover.find(".component-button-play"), this.$elPlayer = this.$el.find(".player"), this.model.youtubeId = this.$elPlayer.data("youtube-id"), this.model.name = this.$elCover.find(".name").text(), this.model.includeInPlaylist = !!this.$el.find(".player-container").data("include-in-playlist"), this.$elCover.on("click", function(t) {
                    this.playVideo()
                }.bind(this)).on("mouseenter mouseleave", function(t) {
                    this.$elPlay.toggleClass("hover", "mouseenter" == t.type)
                }.bind(this)), this._getPlayer(), this
            },
            getPreloadUrls: function() {
                return this.$el.find("[data-preload]").toArray().map(function(e) {
                    return t(e).attr("data-preload")
                })
            },
            _openPlayer: function() {
                if (!this._openPlayerPromise) {
                    var e = new t.Deferred;
                    n.to(this.$elCover, .3, {
                        autoAlpha: 0,
                        onComplete: e.resolve,
                        onOverwrite: e.resolve
                    }), this._openPlayerPromise = e.promise()
                }
                return this._openPlayerPromise
            },
            playVideo: function() {
                function e(e) {
                    return e.playVideo(), (new t.Deferred).resolve().promise()
                }
                this._openPlayer();
                var i = this._getPlayer();
                return "resolved" == i.state() ? e(this._player) : i.then(e)
            },
            pauseVideo: function() {
                return this._getPlayer().then(function(t) {
                    t.pauseVideo()
                })
            },
            goToVideoByIndex: function(t, e) {
                e && this.playVideo()
            },
            excludeVideosFromPlaylist: function() {
                return !this.model.includeInPlaylist
            },
            getVideos: function() {
                return [{
                    index: 0,
                    name: this.model.name
                }]
            },
            _getPlayer: function() {
                if (!this._playerPromise) {
                    var e = new t.Deferred;
                    i.fetchApi().then(function(t) {
                        var i = new t.Player(this.$elPlayer[0], {
                            videoId: this.model.youtubeId,
                            suggestedQuality: "hd1080",
                            playerVars: {
                                autoplay: 0,
                                controls: 1,
                                iv_load_policy: 3,
                                showinfo: 0,
                                rel: 0,
                                origin: document.domain,
                                start: 0,
                                wmode: "opaque",
                                playsinline: !0
                            },
                            events: {
                                onReady: function() {
                                    this._player = i, e.resolve(i)
                                }.bind(this),
                                onError: function() {
                                    e.reject()
                                },
                                onStateChange: function(t) {
                                    this.trigger("change:playback", {
                                        data: t.data,
                                        track: {
                                            index: 0,
                                            name: this.model.name
                                        }
                                    })
                                }.bind(this)
                            }
                        })
                    }.bind(this)), this._playerPromise = e.promise()
                }
                return this._playerPromise
            }
        })
    }), define("component/container/scrollable", ["jquery", "component/base", "component/section/album", "component/section/band", "component/section/download", "component/section/footer", "component/section/lyric", "component/section/masthead", "component/section/tour", "component/section/video", "TweenMax", "Power2"], function(t, e, i, n, r, s, o, a, l, h, c, u) {
        return e.extend({
            _clsMap: {
                album: i,
                band: n,
                download: r,
                footer: s,
                lyric: o,
                masthead: a,
                tour: l,
                video: h
            },
            _sections: null,
            render: function() {
                e.prototype.render.apply(this, arguments), this.$elInner = this.$el.find(">.inner"), this._sections = this.$elInner.find(">.component-section-base").toArray().map(function(e) {
                    var i = t(e).data("type"),
                        n = this._clsMap[i];
                    if (!n) throw new Error("Section component not supported. (type: " + i + ")");
                    var r = new n({
                        el: e,
                        model: {
                            id: t(e).data("id"),
                            navigationId: t(e).data("navigation-id")
                        }
                    });
                    r.render(), this.registerComponent(r);
                    var s = function() {
                        var t = null;
                        if (this._sections.some(function(e, i) {
                                if (e === r) return t = i, !0
                            }), null === t) throw new Error("Failed to find section index. (sectionId: " + r.model.id + ")");
                        var e = t + 1;
                        return e < this._sections.length ? this._sections[e] : null
                    }.bind(this);
                    return r.on("mask:click", function() {
                        if (r instanceof a) {
                            var t = s();
                            t && this.trigger("navigate", {
                                url: "#s/" + t.model.id,
                                preventDefault: function() {}
                            })
                        }
                    }.bind(this)).on("play:click", function() {
                        if (r instanceof a) {
                            var t = s();
                            t && (this.trigger("navigate", {
                                url: "#s/" + t.model.id,
                                preventDefault: function() {}
                            }), t.playVideo && t.playVideo())
                        }
                    }.bind(this)).on("navigate", function(t) {
                        this.trigger("navigate", t)
                    }.bind(this)).on("change:playback", function(e) {
                        this.trigger("change:playback", t.extend({
                            section: r
                        }, e)), 1 === e.data && this._sections.forEach(function(t) {
                            t !== r && "function" == typeof t.pauseVideo && t.pauseVideo()
                        })
                    }.bind(this)).on("story:active", function(t) {
                        this.trigger("closable-section:active", t)
                    }.bind(this)).on("resize", function(t) {
                        this.refresh()
                    }.bind(this)).on("open:overlay", function(t) {
                        this.trigger("open:overlay", t)
                    }.bind(this)), r
                }.bind(this)).filter(function(t) {
                    return !!t
                }), this.$elInner.on("scroll", this.refresh.bind(this)), t(window).on("resize", this.refresh.bind(this)), this.refresh()
            },
            refresh: function() {
                var t = this.getActiveSection(),
                    e = this.getActiveSubsection(t),
                    i = this.$elInner.scrollTop();
                this._sections.forEach(function(t) {
                    t.refreshScroll(i)
                }), this.trigger("active:section", {
                    section: t,
                    subsection: e
                }), this.trigger("scroll", {
                    el: this.$elInner,
                    sections: this._sections
                })
            },
            getActiveSection: function() {
                var t = this._sections[0],
                    e = this.$elInner.offset().top;
                return this._sections.some(function(i) {
                    var n = i.$el.outerHeight(!0) - i.$el.outerHeight();
                    return !(i.$el.offset().top - n - e <= 50) || void(t = i)
                }), t
            },
            getActiveSubsection: function(t) {
                t = t || this.getActiveSection();
                var e = t.getSubsections(),
                    i = this.$elInner.offset().top,
                    n = null;
                return e.some(function(t) {
                    return !(t.$el.offset().top - i <= 50) || void(n = t)
                }), n
            },
            getSections: function() {
                return this._sections
            },
            conceal: function() {
                this.$el.addClass("concealed")
            },
            reveal: function() {
                this.$el.removeClass("concealed")
            },
            goToSectionById: function(t, e) {
                var i = t ? this.getSectionById(t) : this._sections[0],
                    n = i.$el.outerHeight(!0) - i.$el.outerHeight(),
                    r = i.$el.offset().top - n;
                if (e) {
                    var s = i.getSubsectionById(e);
                    s && (r = s.$el.offset().top)
                }
                c.to(this.$elInner, .8, {
                    scrollTo: r + this.$elInner.scrollTop(),
                    ease: u.easeInOut
                })
            },
            getSectionById: function(t) {
                var e = null;
                if (this._sections.some(function(i) {
                        if (i.model.id == t) return e = i, !0
                    }), !e) throw new Error("Section not found. (id: " + t + ")");
                return e
            }
        })
    }), define("lib/popup", [], function() {
        return function(t, e, i, n) {
            var r = window.screen.width / 2 - i / 2,
                s = window.screen.height / 2 - n / 2,
                o = window.open(t, e, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + i + ", height=" + n + ", top=" + s + ", left=" + r);
            return o && o.focus && o.focus(), o
        }
    }), define("component/widget/toolbox", ["jquery", "backbone", "lib/popup", "TweenMax", "Power2"], function(t, e, i, n, r) {
        return e.View.extend({
            render: function() {
                return this.$elShare = this.$el.find(".share").on("touchstart", function(e) {
                    var i = t(e.currentTarget).hasClass("active");
                    i || (e.preventDefault(), t(e.currentTarget).addClass("active touch"))
                }).on("mouseenter mouseleave", function(e) {
                    t(e.currentTarget).hasClass("touch") || t(e.currentTarget).toggleClass("active mouse", "mouseenter" == e.type)
                }), this.$elShare.find(".action").on("touchstart", function(e) {
                    t(e.currentTarget).addClass("touch")
                }).on("click", function(e) {
                    e.preventDefault();
                    var n = t(e.currentTarget).attr("href");
                    i(n, void 0, 500, 500), this.$elShare.hasClass("mouse") || (t(e.currentTarget).removeClass("touch"), this.$elShare.removeClass("active touch"))
                }.bind(this)).on("mouseenter mouseleave", function(e) {
                    t(e.currentTarget).hasClass("touch") || t(e.currentTarget).toggleClass("active", "mouseenter" == e.type)
                }), this.$el.find(".download").on("click", function(e) {
                    this.trigger("navigate", {
                        url: t(e.currentTarget).attr("href"),
                        preventDefault: function() {
                            e.preventDefault()
                        }
                    })
                }.bind(this)), this
            },
            conceal: function() {
                n.to(this.$el, .3, {
                    autoAlpha: 0,
                    ease: r.easeInOut
                })
            },
            reveal: function() {
                n.to(this.$el, .3, {
                    autoAlpha: 1,
                    ease: r.easeInOut,
                    clearProps: "visibility,opacity"
                })
            },
            revealShare: function() {
                this.$elShare.removeClass("mobile-hidden")
            },
            concealShare: function() {
                this.$elShare.addClass("mobile-hidden")
            }
        })
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("../bower_components/scrollmagic/scrollmagic/uncompressed/ScrollMagic", e) : "object" == typeof exports ? module.exports = e() : t.ScrollMagic = e()
    }(this, function() {
        "use strict";
        var t = function() {
            r.log(2, "(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.")
        };
        t.version = "2.0.5", window.addEventListener("mousewheel", function() {});
        var e = "data-scrollmagic-pin-spacer";
        t.Controller = function(n) {
            var s, o, a = "ScrollMagic.Controller",
                l = "FORWARD",
                h = "REVERSE",
                c = "PAUSED",
                u = i.defaults,
                d = this,
                f = r.extend({}, u, n),
                p = [],
                m = !1,
                g = 0,
                _ = c,
                v = !0,
                y = 0,
                b = !0,
                w = function() {
                    for (var e in f) u.hasOwnProperty(e) || (R(2, 'WARNING: Unknown option "' + e + '"'), delete f[e]);
                    if (f.container = r.get.elements(f.container)[0], !f.container) throw R(1, "ERROR creating object " + a + ": No valid scroll container supplied"), a + " init failed.";
                    v = f.container === window || f.container === document.body || !document.body.contains(f.container), v && (f.container = window), y = S(), f.container.addEventListener("resize", E), f.container.addEventListener("scroll", E), f.refreshInterval = parseInt(f.refreshInterval) || u.refreshInterval, x(), R(3, "added new " + a + " controller (v" + t.version + ")")
                },
                x = function() {
                    f.refreshInterval > 0 && (o = window.setTimeout(A, f.refreshInterval))
                },
                T = function() {
                    return f.vertical ? r.get.scrollTop(f.container) : r.get.scrollLeft(f.container)
                },
                S = function() {
                    return f.vertical ? r.get.height(f.container) : r.get.width(f.container)
                },
                P = this._setScrollPos = function(t) {
                    f.vertical ? v ? window.scrollTo(r.get.scrollLeft(), t) : f.container.scrollTop = t : v ? window.scrollTo(t, r.get.scrollTop()) : f.container.scrollLeft = t
                },
                k = function() {
                    if (b && m) {
                        var t = r.type.Array(m) ? m : p.slice(0);
                        m = !1;
                        var e = g;
                        g = d.scrollPos();
                        var i = g - e;
                        0 !== i && (_ = i > 0 ? l : h), _ === h && t.reverse(), t.forEach(function(e, i) {
                            R(3, "updating Scene " + (i + 1) + "/" + t.length + " (" + p.length + " total)"), e.update(!0)
                        }), 0 === t.length && f.loglevel >= 3 && R(3, "updating 0 Scenes (nothing added to controller)")
                    }
                },
                C = function() {
                    s = r.rAF(k)
                },
                E = function(t) {
                    R(3, "event fired causing an update:", t.type), "resize" == t.type && (y = S(), _ = c), m !== !0 && (m = !0, C())
                },
                A = function() {
                    if (!v && y != S()) {
                        var t;
                        try {
                            t = new Event("resize", {
                                bubbles: !1,
                                cancelable: !1
                            })
                        } catch (e) {
                            t = document.createEvent("Event"), t.initEvent("resize", !1, !1)
                        }
                        f.container.dispatchEvent(t)
                    }
                    p.forEach(function(t, e) {
                        t.refresh()
                    }), x()
                },
                R = this._log = function(t, e) {
                    f.loglevel >= t && (Array.prototype.splice.call(arguments, 1, 0, "(" + a + ") ->"), r.log.apply(window, arguments))
                };
            this._options = f;
            var j = function(t) {
                if (t.length <= 1) return t;
                var e = t.slice(0);
                return e.sort(function(t, e) {
                    return t.scrollOffset() > e.scrollOffset() ? 1 : -1
                }), e
            };
            return this.addScene = function(e) {
                if (r.type.Array(e)) e.forEach(function(t, e) {
                    d.addScene(t)
                });
                else if (e instanceof t.Scene) {
                    if (e.controller() !== d) e.addTo(d);
                    else if (p.indexOf(e) < 0) {
                        p.push(e), p = j(p), e.on("shift.controller_sort", function() {
                            p = j(p)
                        });
                        for (var i in f.globalSceneOptions) e[i] && e[i].call(e, f.globalSceneOptions[i]);
                        R(3, "adding Scene (now " + p.length + " total)")
                    }
                } else R(1, "ERROR: invalid argument supplied for '.addScene()'");
                return d
            }, this.removeScene = function(t) {
                if (r.type.Array(t)) t.forEach(function(t, e) {
                    d.removeScene(t)
                });
                else {
                    var e = p.indexOf(t);
                    e > -1 && (t.off("shift.controller_sort"), p.splice(e, 1), R(3, "removing Scene (now " + p.length + " left)"), t.remove())
                }
                return d
            }, this.updateScene = function(e, i) {
                return r.type.Array(e) ? e.forEach(function(t, e) {
                    d.updateScene(t, i)
                }) : i ? e.update(!0) : m !== !0 && e instanceof t.Scene && (m = m || [], m.indexOf(e) == -1 && m.push(e), m = j(m), C()), d
            }, this.update = function(t) {
                return E({
                    type: "resize"
                }), t && k(), d
            }, this.scrollTo = function(i, n) {
                if (r.type.Number(i)) P.call(f.container, i, n);
                else if (i instanceof t.Scene) i.controller() === d ? d.scrollTo(i.scrollOffset(), n) : R(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", i);
                else if (r.type.Function(i)) P = i;
                else {
                    var s = r.get.elements(i)[0];
                    if (s) {
                        for (; s.parentNode.hasAttribute(e);) s = s.parentNode;
                        var o = f.vertical ? "top" : "left",
                            a = r.get.offset(f.container),
                            l = r.get.offset(s);
                        v || (a[o] -= d.scrollPos()), d.scrollTo(l[o] - a[o], n)
                    } else R(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", i)
                }
                return d
            }, this.scrollPos = function(t) {
                return arguments.length ? (r.type.Function(t) ? T = t : R(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."), d) : T.call(d)
            }, this.info = function(t) {
                var e = {
                    size: y,
                    vertical: f.vertical,
                    scrollPos: g,
                    scrollDirection: _,
                    container: f.container,
                    isDocument: v
                };
                return arguments.length ? void 0 !== e[t] ? e[t] : void R(1, 'ERROR: option "' + t + '" is not available') : e
            }, this.loglevel = function(t) {
                return arguments.length ? (f.loglevel != t && (f.loglevel = t), d) : f.loglevel
            }, this.enabled = function(t) {
                return arguments.length ? (b != t && (b = !!t, d.updateScene(p, !0)), d) : b
            }, this.destroy = function(t) {
                window.clearTimeout(o);
                for (var e = p.length; e--;) p[e].destroy(t);
                return f.container.removeEventListener("resize", E), f.container.removeEventListener("scroll", E), r.cAF(s), R(3, "destroyed " + a + " (reset: " + (t ? "true" : "false") + ")"), null
            }, w(), d
        };
        var i = {
            defaults: {
                container: window,
                vertical: !0,
                globalSceneOptions: {},
                loglevel: 2,
                refreshInterval: 100
            }
        };
        t.Controller.addOption = function(t, e) {
            i.defaults[t] = e
        }, t.Controller.extend = function(e) {
            var i = this;
            t.Controller = function() {
                return i.apply(this, arguments), this.$super = r.extend({}, this), e.apply(this, arguments) || this
            }, r.extend(t.Controller, i), t.Controller.prototype = i.prototype, t.Controller.prototype.constructor = t.Controller
        }, t.Scene = function(i) {
            var s, o, a = "ScrollMagic.Scene",
                l = "BEFORE",
                h = "DURING",
                c = "AFTER",
                u = n.defaults,
                d = this,
                f = r.extend({}, u, i),
                p = l,
                m = 0,
                g = {
                    start: 0,
                    end: 0
                },
                _ = 0,
                v = !0,
                y = function() {
                    for (var t in f) u.hasOwnProperty(t) || (w(2, 'WARNING: Unknown option "' + t + '"'), delete f[t]);
                    for (var e in u) A(e);
                    C()
                },
                b = {};
            this.on = function(t, e) {
                return r.type.Function(e) ? (t = t.trim().split(" "), t.forEach(function(t) {
                    var i = t.split("."),
                        n = i[0],
                        r = i[1];
                    "*" != n && (b[n] || (b[n] = []), b[n].push({
                        namespace: r || "",
                        callback: e
                    }))
                })) : w(1, "ERROR when calling '.on()': Supplied callback for '" + t + "' is not a valid function!"), d
            }, this.off = function(t, e) {
                return t ? (t = t.trim().split(" "), t.forEach(function(t, i) {
                    var n = t.split("."),
                        r = n[0],
                        s = n[1] || "",
                        o = "*" === r ? Object.keys(b) : [r];
                    o.forEach(function(t) {
                        for (var i = b[t] || [], n = i.length; n--;) {
                            var r = i[n];
                            !r || s !== r.namespace && "*" !== s || e && e != r.callback || i.splice(n, 1)
                        }
                        i.length || delete b[t]
                    })
                }), d) : (w(1, "ERROR: Invalid event name supplied."), d)
            }, this.trigger = function(e, i) {
                if (e) {
                    var n = e.trim().split("."),
                        r = n[0],
                        s = n[1],
                        o = b[r];
                    w(3, "event fired:", r, i ? "->" : "", i || ""), o && o.forEach(function(e, n) {
                        s && s !== e.namespace || e.callback.call(d, new t.Event(r, e.namespace, d, i))
                    })
                } else w(1, "ERROR: Invalid event name supplied.");
                return d
            }, d.on("change.internal", function(t) {
                "loglevel" !== t.what && "tweenChanges" !== t.what && ("triggerElement" === t.what ? S() : "reverse" === t.what && d.update())
            }).on("shift.internal", function(t) {
                x(), d.update()
            });
            var w = this._log = function(t, e) {
                f.loglevel >= t && (Array.prototype.splice.call(arguments, 1, 0, "(" + a + ") ->"), r.log.apply(window, arguments))
            };
            this.addTo = function(e) {
                return e instanceof t.Controller ? o != e && (o && o.removeScene(d), o = e, C(), T(!0), S(!0), x(), o.info("container").addEventListener("resize", P), e.addScene(d), d.trigger("add", {
                    controller: o
                }), w(3, "added " + a + " to controller"), d.update()) : w(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller"), d
            }, this.enabled = function(t) {
                return arguments.length ? (v != t && (v = !!t, d.update(!0)), d) : v
            }, this.remove = function() {
                if (o) {
                    o.info("container").removeEventListener("resize", P);
                    var t = o;
                    o = void 0, t.removeScene(d), d.trigger("remove"), w(3, "removed " + a + " from controller")
                }
                return d
            }, this.destroy = function(t) {
                return d.trigger("destroy", {
                    reset: t
                }), d.remove(), d.off("*.*"), w(3, "destroyed " + a + " (reset: " + (t ? "true" : "false") + ")"), null
            }, this.update = function(t) {
                if (o)
                    if (t)
                        if (o.enabled() && v) {
                            var e, i = o.info("scrollPos");
                            e = f.duration > 0 ? (i - g.start) / (g.end - g.start) : i >= g.start ? 1 : 0, d.trigger("update", {
                                startPos: g.start,
                                endPos: g.end,
                                scrollPos: i
                            }), d.progress(e)
                        } else R && p === h && O(!0);
                else o.updateScene(d, !1);
                return d
            }, this.refresh = function() {
                return T(), S(), d
            }, this.progress = function(t) {
                if (arguments.length) {
                    var e = !1,
                        i = p,
                        n = o ? o.info("scrollDirection") : "PAUSED",
                        r = f.reverse || t >= m;
                    if (0 === f.duration ? (e = m != t, m = t < 1 && r ? 0 : 1, p = 0 === m ? l : h) : t < 0 && p !== l && r ? (m = 0, p = l, e = !0) : t >= 0 && t < 1 && r ? (m = t, p = h, e = !0) : t >= 1 && p !== c ? (m = 1, p = c, e = !0) : p !== h || r || O(), e) {
                        var s = {
                                progress: m,
                                state: p,
                                scrollDirection: n
                            },
                            a = p != i,
                            u = function(t) {
                                d.trigger(t, s)
                            };
                        a && i !== h && (u("enter"), u(i === l ? "start" : "end")), u("progress"), a && p !== h && (u(p === l ? "start" : "end"), u("leave"))
                    }
                    return d
                }
                return m
            };
            var x = function() {
                    g = {
                        start: _ + f.offset
                    }, o && f.triggerElement && (g.start -= o.info("size") * f.triggerHook), g.end = g.start + f.duration
                },
                T = function(t) {
                    if (s) {
                        var e = "duration";
                        E(e, s.call(d)) && !t && (d.trigger("change", {
                            what: e,
                            newval: f[e]
                        }), d.trigger("shift", {
                            reason: e
                        }))
                    }
                },
                S = function(t) {
                    var i = 0,
                        n = f.triggerElement;
                    if (o && n) {
                        for (var s = o.info(), a = r.get.offset(s.container), l = s.vertical ? "top" : "left"; n.parentNode.hasAttribute(e);) n = n.parentNode;
                        var h = r.get.offset(n);
                        s.isDocument || (a[l] -= o.scrollPos()), i = h[l] - a[l]
                    }
                    var c = i != _;
                    _ = i, c && !t && d.trigger("shift", {
                        reason: "triggerElementPosition"
                    })
                },
                P = function(t) {
                    f.triggerHook > 0 && d.trigger("shift", {
                        reason: "containerResize"
                    })
                },
                k = r.extend(n.validate, {
                    duration: function(t) {
                        if (r.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
                            var e = parseFloat(t) / 100;
                            t = function() {
                                return o ? o.info("size") * e : 0
                            }
                        }
                        if (r.type.Function(t)) {
                            s = t;
                            try {
                                t = parseFloat(s())
                            } catch (e) {
                                t = -1
                            }
                        }
                        if (t = parseFloat(t), !r.type.Number(t) || t < 0) throw s ? (s = void 0, ['Invalid return value of supplied function for option "duration":', t]) : ['Invalid value for option "duration":', t];
                        return t
                    }
                }),
                C = function(t) {
                    t = arguments.length ? [t] : Object.keys(k), t.forEach(function(t, e) {
                        var i;
                        if (k[t]) try {
                            i = k[t](f[t])
                        } catch (e) {
                            i = u[t];
                            var n = r.type.String(e) ? [e] : e;
                            r.type.Array(n) ? (n[0] = "ERROR: " + n[0], n.unshift(1), w.apply(this, n)) : w(1, "ERROR: Problem executing validation callback for option '" + t + "':", e.message)
                        } finally {
                            f[t] = i
                        }
                    })
                },
                E = function(t, e) {
                    var i = !1,
                        n = f[t];
                    return f[t] != e && (f[t] = e, C(t), i = n != f[t]), i
                },
                A = function(t) {
                    d[t] || (d[t] = function(e) {
                        return arguments.length ? ("duration" === t && (s = void 0), E(t, e) && (d.trigger("change", {
                            what: t,
                            newval: f[t]
                        }), n.shifts.indexOf(t) > -1 && d.trigger("shift", {
                            reason: t
                        })), d) : f[t]
                    })
                };
            this.controller = function() {
                return o
            }, this.state = function() {
                return p
            }, this.scrollOffset = function() {
                return g.start
            }, this.triggerPosition = function() {
                var t = f.offset;
                return o && (t += f.triggerElement ? _ : o.info("size") * d.triggerHook()), t
            };
            var R, j;
            d.on("shift.internal", function(t) {
                var e = "duration" === t.reason;
                (p === c && e || p === h && 0 === f.duration) && O(), e && L()
            }).on("progress.internal", function(t) {
                O()
            }).on("add.internal", function(t) {
                L()
            }).on("destroy.internal", function(t) {
                d.removePin(t.reset)
            });
            var O = function(t) {
                    if (R && o) {
                        var e = o.info(),
                            i = j.spacer.firstChild;
                        if (t || p !== h) {
                            var n = {
                                    position: j.inFlow ? "relative" : "absolute",
                                    top: 0,
                                    left: 0
                                },
                                s = r.css(i, "position") != n.position;
                            j.pushFollowers ? f.duration > 0 && (p === c && 0 === parseFloat(r.css(j.spacer, "padding-top")) ? s = !0 : p === l && 0 === parseFloat(r.css(j.spacer, "padding-bottom")) && (s = !0)) : n[e.vertical ? "top" : "left"] = f.duration * m, r.css(i, n), s && L()
                        } else {
                            "fixed" != r.css(i, "position") && (r.css(i, {
                                position: "fixed"
                            }), L());
                            var a = r.get.offset(j.spacer, !0),
                                u = f.reverse || 0 === f.duration ? e.scrollPos - g.start : Math.round(m * f.duration * 10) / 10;
                            a[e.vertical ? "top" : "left"] += u, r.css(j.spacer.firstChild, {
                                top: a.top,
                                left: a.left
                            })
                        }
                    }
                },
                L = function() {
                    if (R && o && j.inFlow) {
                        var t = p === h,
                            e = o.info("vertical"),
                            i = j.spacer.firstChild,
                            n = r.isMarginCollapseType(r.css(j.spacer, "display")),
                            s = {};
                        j.relSize.width || j.relSize.autoFullWidth ? t ? r.css(R, {
                            width: r.get.width(j.spacer)
                        }) : r.css(R, {
                            width: "100%"
                        }) : (s["min-width"] = r.get.width(e ? R : i, !0, !0), s.width = t ? s["min-width"] : "auto"), j.relSize.height ? t ? r.css(R, {
                            height: r.get.height(j.spacer) - (j.pushFollowers ? f.duration : 0)
                        }) : r.css(R, {
                            height: "100%"
                        }) : (s["min-height"] = r.get.height(e ? i : R, !0, !n), s.height = t ? s["min-height"] : "auto"), j.pushFollowers && (s["padding" + (e ? "Top" : "Left")] = f.duration * m, s["padding" + (e ? "Bottom" : "Right")] = f.duration * (1 - m)), r.css(j.spacer, s)
                    }
                },
                I = function() {
                    o && R && p === h && !o.info("isDocument") && O()
                },
                D = function() {
                    o && R && p === h && ((j.relSize.width || j.relSize.autoFullWidth) && r.get.width(window) != r.get.width(j.spacer.parentNode) || j.relSize.height && r.get.height(window) != r.get.height(j.spacer.parentNode)) && L()
                },
                M = function(t) {
                    o && R && p === h && !o.info("isDocument") && (t.preventDefault(), o._setScrollPos(o.info("scrollPos") - ((t.wheelDelta || t[o.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -t.detail)))
                };
            this.setPin = function(t, i) {
                var n = {
                    pushFollowers: !0,
                    spacerClass: "scrollmagic-pin-spacer"
                };
                if (i = r.extend({}, n, i), t = r.get.elements(t)[0], !t) return w(1, "ERROR calling method 'setPin()': Invalid pin element supplied."), d;
                if ("fixed" === r.css(t, "position")) return w(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."), d;
                if (R) {
                    if (R === t) return d;
                    d.removePin()
                }
                R = t;
                var s = R.parentNode.style.display,
                    o = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
                R.parentNode.style.display = "none";
                var a = "absolute" != r.css(R, "position"),
                    l = r.css(R, o.concat(["display"])),
                    h = r.css(R, ["width", "height"]);
                R.parentNode.style.display = s, !a && i.pushFollowers && (w(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled."), i.pushFollowers = !1), window.setTimeout(function() {
                    R && 0 === f.duration && i.pushFollowers && w(2, "WARNING: pushFollowers =", !0, "has no effect, when scene duration is 0.")
                }, 0);
                var c = R.parentNode.insertBefore(document.createElement("div"), R),
                    u = r.extend(l, {
                        position: a ? "relative" : "absolute",
                        boxSizing: "content-box",
                        mozBoxSizing: "content-box",
                        webkitBoxSizing: "content-box"
                    });
                if (a || r.extend(u, r.css(R, ["width", "height"])), r.css(c, u), c.setAttribute(e, ""), r.addClass(c, i.spacerClass), j = {
                        spacer: c,
                        relSize: {
                            width: "%" === h.width.slice(-1),
                            height: "%" === h.height.slice(-1),
                            autoFullWidth: "auto" === h.width && a && r.isMarginCollapseType(l.display)
                        },
                        pushFollowers: i.pushFollowers,
                        inFlow: a
                    }, !R.___origStyle) {
                    R.___origStyle = {};
                    var p = R.style,
                        m = o.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
                    m.forEach(function(t) {
                        R.___origStyle[t] = p[t] || ""
                    })
                }
                return j.relSize.width && r.css(c, {
                    width: h.width
                }), j.relSize.height && r.css(c, {
                    height: h.height
                }), c.appendChild(R), r.css(R, {
                    position: a ? "relative" : "absolute",
                    margin: "auto",
                    top: "auto",
                    left: "auto",
                    bottom: "auto",
                    right: "auto"
                }), (j.relSize.width || j.relSize.autoFullWidth) && r.css(R, {
                    boxSizing: "border-box",
                    mozBoxSizing: "border-box",
                    webkitBoxSizing: "border-box"
                }), window.addEventListener("scroll", I), window.addEventListener("resize", I), window.addEventListener("resize", D), R.addEventListener("mousewheel", M), R.addEventListener("DOMMouseScroll", M), w(3, "added pin"), O(), d
            }, this.removePin = function(t) {
                if (R) {
                    if (p === h && O(!0), t || !o) {
                        var i = j.spacer.firstChild;
                        if (i.hasAttribute(e)) {
                            var n = j.spacer.style,
                                s = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
                            margins = {}, s.forEach(function(t) {
                                margins[t] = n[t] || ""
                            }), r.css(i, margins)
                        }
                        j.spacer.parentNode.insertBefore(i, j.spacer), j.spacer.parentNode.removeChild(j.spacer), R.parentNode.hasAttribute(e) || (r.css(R, R.___origStyle), delete R.___origStyle)
                    }
                    window.removeEventListener("scroll", I), window.removeEventListener("resize", I), window.removeEventListener("resize", D), R.removeEventListener("mousewheel", M), R.removeEventListener("DOMMouseScroll", M), R = void 0, w(3, "removed pin (reset: " + (t ? "true" : "false") + ")")
                }
                return d
            };
            var N, q = [];
            return d.on("destroy.internal", function(t) {
                d.removeClassToggle(t.reset)
            }), this.setClassToggle = function(t, e) {
                var i = r.get.elements(t);
                return 0 !== i.length && r.type.String(e) ? (q.length > 0 && d.removeClassToggle(), N = e, q = i, d.on("enter.internal_class leave.internal_class", function(t) {
                    var e = "enter" === t.type ? r.addClass : r.removeClass;
                    q.forEach(function(t, i) {
                        e(t, N)
                    })
                }), d) : (w(1, "ERROR calling method 'setClassToggle()': Invalid " + (0 === i.length ? "element" : "classes") + " supplied."), d)
            }, this.removeClassToggle = function(t) {
                return t && q.forEach(function(t, e) {
                    r.removeClass(t, N)
                }), d.off("start.internal_class end.internal_class"), N = void 0, q = [], d
            }, y(), d
        };
        var n = {
            defaults: {
                duration: 0,
                offset: 0,
                triggerElement: void 0,
                triggerHook: .5,
                reverse: !0,
                loglevel: 2
            },
            validate: {
                offset: function(t) {
                    if (t = parseFloat(t), !r.type.Number(t)) throw ['Invalid value for option "offset":', t];
                    return t
                },
                triggerElement: function(t) {
                    if (t = t || void 0) {
                        var e = r.get.elements(t)[0];
                        if (!e) throw ['Element defined in option "triggerElement" was not found:', t];
                        t = e
                    }
                    return t
                },
                triggerHook: function(t) {
                    var e = {
                        onCenter: .5,
                        onEnter: 1,
                        onLeave: 0
                    };
                    if (r.type.Number(t)) t = Math.max(0, Math.min(parseFloat(t), 1));
                    else {
                        if (!(t in e)) throw ['Invalid value for option "triggerHook": ', t];
                        t = e[t]
                    }
                    return t
                },
                reverse: function(t) {
                    return !!t
                },
                loglevel: function(t) {
                    if (t = parseInt(t), !r.type.Number(t) || t < 0 || t > 3) throw ['Invalid value for option "loglevel":', t];
                    return t
                }
            },
            shifts: ["duration", "offset", "triggerHook"]
        };
        t.Scene.addOption = function(e, i, r, s) {
            e in n.defaults ? t._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + e + "', because it already exists.") : (n.defaults[e] = i, n.validate[e] = r, s && n.shifts.push(e))
        }, t.Scene.extend = function(e) {
            var i = this;
            t.Scene = function() {
                return i.apply(this, arguments), this.$super = r.extend({}, this), e.apply(this, arguments) || this
            }, r.extend(t.Scene, i), t.Scene.prototype = i.prototype, t.Scene.prototype.constructor = t.Scene
        }, t.Event = function(t, e, i, n) {
            n = n || {};
            for (var r in n) this[r] = n[r];
            return this.type = t, this.target = this.currentTarget = i, this.namespace = e || "", this.timeStamp = this.timestamp = Date.now(), this
        };
        var r = t._util = function(t) {
            var e, i = {},
                n = function(t) {
                    return parseFloat(t) || 0
                },
                r = function(e) {
                    return e.currentStyle ? e.currentStyle : t.getComputedStyle(e)
                },
                s = function(e, i, s, o) {
                    if (i = i === document ? t : i, i === t) o = !1;
                    else if (!p.DomElement(i)) return 0;
                    e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
                    var a = (s ? i["offset" + e] || i["outer" + e] : i["client" + e] || i["inner" + e]) || 0;
                    if (s && o) {
                        var l = r(i);
                        a += "Height" === e ? n(l.marginTop) + n(l.marginBottom) : n(l.marginLeft) + n(l.marginRight)
                    }
                    return a
                },
                o = function(t) {
                    return t.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function(t) {
                        return t[1].toUpperCase()
                    })
                };
            i.extend = function(t) {
                for (t = t || {}, e = 1; e < arguments.length; e++)
                    if (arguments[e])
                        for (var i in arguments[e]) arguments[e].hasOwnProperty(i) && (t[i] = arguments[e][i]);
                return t
            }, i.isMarginCollapseType = function(t) {
                return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(t) > -1
            };
            var a = 0,
                l = ["ms", "moz", "webkit", "o"],
                h = t.requestAnimationFrame,
                c = t.cancelAnimationFrame;
            for (e = 0; !h && e < l.length; ++e) h = t[l[e] + "RequestAnimationFrame"], c = t[l[e] + "CancelAnimationFrame"] || t[l[e] + "CancelRequestAnimationFrame"];
            h || (h = function(e) {
                var i = (new Date).getTime(),
                    n = Math.max(0, 16 - (i - a)),
                    r = t.setTimeout(function() {
                        e(i + n)
                    }, n);
                return a = i + n, r
            }), c || (c = function(e) {
                t.clearTimeout(e)
            }), i.rAF = h.bind(t), i.cAF = c.bind(t);
            var u = ["error", "warn", "log"],
                d = t.console || {};
            for (d.log = d.log || function() {}, e = 0; e < u.length; e++) {
                var f = u[e];
                d[f] || (d[f] = d.log)
            }
            i.log = function(t) {
                (t > u.length || t <= 0) && (t = u.length);
                var e = new Date,
                    i = ("0" + e.getHours()).slice(-2) + ":" + ("0" + e.getMinutes()).slice(-2) + ":" + ("0" + e.getSeconds()).slice(-2) + ":" + ("00" + e.getMilliseconds()).slice(-3),
                    n = u[t - 1],
                    r = Array.prototype.splice.call(arguments, 1),
                    s = Function.prototype.bind.call(d[n], d);
                r.unshift(i), s.apply(d, r)
            };
            var p = i.type = function(t) {
                return Object.prototype.toString.call(t).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
            };
            p.String = function(t) {
                return "string" === p(t)
            }, p.Function = function(t) {
                return "function" === p(t)
            }, p.Array = function(t) {
                return Array.isArray(t)
            }, p.Number = function(t) {
                return !p.Array(t) && t - parseFloat(t) + 1 >= 0
            }, p.DomElement = function(t) {
                return "object" == typeof HTMLElement ? t instanceof HTMLElement : t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName
            };
            var m = i.get = {};
            return m.elements = function(e) {
                var i = [];
                if (p.String(e)) try {
                    e = document.querySelectorAll(e)
                } catch (t) {
                    return i
                }
                if ("nodelist" === p(e) || p.Array(e))
                    for (var n = 0, r = i.length = e.length; n < r; n++) {
                        var s = e[n];
                        i[n] = p.DomElement(s) ? s : m.elements(s)
                    } else(p.DomElement(e) || e === document || e === t) && (i = [e]);
                return i
            }, m.scrollTop = function(e) {
                return e && "number" == typeof e.scrollTop ? e.scrollTop : t.pageYOffset || 0
            }, m.scrollLeft = function(e) {
                return e && "number" == typeof e.scrollLeft ? e.scrollLeft : t.pageXOffset || 0
            }, m.width = function(t, e, i) {
                return s("width", t, e, i)
            }, m.height = function(t, e, i) {
                return s("height", t, e, i)
            }, m.offset = function(t, e) {
                var i = {
                    top: 0,
                    left: 0
                };
                if (t && t.getBoundingClientRect) {
                    var n = t.getBoundingClientRect();
                    i.top = n.top, i.left = n.left, e || (i.top += m.scrollTop(), i.left += m.scrollLeft())
                }
                return i
            }, i.addClass = function(t, e) {
                e && (t.classList ? t.classList.add(e) : t.className += " " + e)
            }, i.removeClass = function(t, e) {
                e && (t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " "))
            }, i.css = function(t, e) {
                if (p.String(e)) return r(t)[o(e)];
                if (p.Array(e)) {
                    var i = {},
                        n = r(t);
                    return e.forEach(function(t, e) {
                        i[t] = n[o(t)]
                    }), i
                }
                for (var s in e) {
                    var a = e[s];
                    a == parseFloat(a) && (a += "px"), t.style[o(s)] = a
                }
            }, i
        }(window || {});
        return t.Scene.prototype.addIndicators = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"), this
        }, t.Scene.prototype.removeIndicators = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"), this
        }, t.Scene.prototype.setTween = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"), this
        }, t.Scene.prototype.removeTween = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"), this
        }, t.Scene.prototype.setVelocity = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"), this
        }, t.Scene.prototype.removeVelocity = function() {
            return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"), this
        }, t
    }), define("lib/ScrollMagic", ["ScrollMagic"], function(t) {
        return t.Controller.addOption("refreshInterval", 0), t
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("ScrollMagic.gsap", ["ScrollMagic", "TweenMax", "TimelineMax"], e) : "object" == typeof exports ? (require("gsap"), e(require("scrollmagic"), TweenMax, TimelineMax)) : e(t.ScrollMagic || t.jQuery && t.jQuery.ScrollMagic, t.TweenMax || t.TweenLite, t.TimelineMax || t.TimelineLite)
    }(this, function(t, e, i) {
        "use strict";
        var n = "animation.gsap",
            r = window.console || {},
            s = Function.prototype.bind.call(r.error || r.log || function() {}, r);
        t || s("(" + n + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs."), e || s("(" + n + ") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs."), t.Scene.addOption("tweenChanges", !1, function(t) {
            return !!t
        }), t.Scene.extend(function() {
            var t, r = this,
                s = function() {
                    r._log && (Array.prototype.splice.call(arguments, 1, 0, "(" + n + ")", "->"), r._log.apply(this, arguments))
                };
            r.on("progress.plugin_gsap", function() {
                o()
            }), r.on("destroy.plugin_gsap", function(t) {
                r.removeTween(t.reset)
            });
            var o = function() {
                if (t) {
                    var e = r.progress(),
                        i = r.state();
                    t.repeat && t.repeat() === -1 ? "DURING" === i && t.paused() ? t.play() : "DURING" === i || t.paused() || t.pause() : e != t.progress() && (0 === r.duration() ? e > 0 ? t.play() : t.reverse() : r.tweenChanges() && t.tweenTo ? t.tweenTo(e * t.duration()) : t.progress(e).pause())
                }
            };
            r.setTween = function(n, a, l) {
                var h;
                arguments.length > 1 && (arguments.length < 3 && (l = a, a = 1), n = e.to(n, a, l));
                try {
                    h = i ? new i({
                        smoothChildTiming: !0
                    }).add(n) : n, h.pause()
                } catch (t) {
                    return s(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject"), r
                }
                if (t && r.removeTween(), t = h, n.repeat && n.repeat() === -1 && (t.repeat(-1), t.yoyo(n.yoyo())), r.tweenChanges() && !t.tweenTo && s(2, "WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic."), t && r.controller() && r.triggerElement() && r.loglevel() >= 2) {
                    var c = e.getTweensOf(r.triggerElement()),
                        u = r.controller().info("vertical");
                    c.forEach(function(t, e) {
                        var i = t.vars.css || t.vars,
                            n = u ? void 0 !== i.top || void 0 !== i.bottom : void 0 !== i.left || void 0 !== i.right;
                        if (n) return s(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!"), !1
                    })
                }
                if (parseFloat(TweenLite.version) >= 1.14)
                    for (var d, f, p = t.getChildren ? t.getChildren(!0, !0, !1) : [t], m = function() {
                            s(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another")
                        }, g = 0; g < p.length; g++) d = p[g], f !== m && (f = d.vars.onOverwrite, d.vars.onOverwrite = function() {
                        f && f.apply(this, arguments), m.apply(this, arguments)
                    });
                return s(3, "added tween"), o(), r
            }, r.removeTween = function(e) {
                return t && (e && t.progress(0).pause(), t.kill(), t = void 0, s(3, "removed tween (reset: " + (e ? "true" : "false") + ")")), r
            }
        })
    }), define("component/page/album", ["jquery", "./base", "scrollbar-width", "TweenMax", "TimelineMax", "Power1", "Power2", "lib/pad", "lib/qualaroo", "lib/Survey", "modernizr", "component/navigation", "component/atmosphere/abyss", "component/atmosphere/brink", "component/container/scrollable", "component/widget/toolbox", "component/section/album", "component/section/band", "component/section/masthead", "ScrollMagic", "ScrollMagic.gsap"], function(t, e, i, n, r, s, o, a, l, h, c, u, d, f, p, m, g, _, v, y) {
        return e.extend({
            _cNavigation: null,
            _ccScrollable: null,
            _cwToolbox: null,
            _caAbyss: null,
            _caBrink: null,
            _currentSectionVideo: null,
            _currentSectionVideoIsPlaying: !1,
            render: function() {
                e.prototype.render.apply(this, arguments);
                var t = i();
                this.$el.addClass("loading"), this._cNavigation = new u({
                    el: this.$el.find(">.component-navigation").css("width", "calc(100% - " + t + "px)")
                }), this._cNavigation.render(), this.registerComponent(this._cNavigation), this._cNavigation.on("navigate", this._navigateHandler.bind(this)), this._cwToolbox = new m({
                    el: this.$el.find(">.component-widget-toolbox")
                }), this._cwToolbox.render().on("navigate", this._navigateHandler.bind(this)), this.registerComponent(this._cwToolbox);
                var n = new h({
                    surveyIds: this.model.qualaroo.afterVideoPlayingSurveyIds
                });
                this._ccScrollable = new p({
                    el: this.$el.find(">.component-container-scrollable")
                }), this._ccScrollable.render(), this.registerComponent(this._ccScrollable), this._ccScrollable.on("active:section", function(t) {
                    this._cNavigation.setActiveSection(t.section.model.navigationId || t.section.model.id, t.subsection ? t.subsection.id : null, {
                        bandSubnavEnabled: "band" == t.section.model.id
                    })
                }.bind(this)).on("scroll", function(t) {
                    var e = t.el.height(),
                        i = t.el.prop("scrollHeight"),
                        n = t.el.scrollTop(),
                        r = i - e - e / 2;
                    n > r ? this._cwToolbox.revealShare() : this._cwToolbox.concealShare()
                }.bind(this)).on("navigate", this._navigateHandler.bind(this)).on("closable-section:active", function(t) {
                    this._cNavigation.toggleCloseButton(t.state, t.progress, t.closeCallback)
                }.bind(this)).on("change:playback", function(t) {
                    var e = t.section.cid + "_" + t.track.index;
                    switch (t.data) {
                        case 1:
                            n.updatePlayback(e, !0);
                            break;
                        case 2:
                            n.updatePlayback(e, !1)
                    }
                }.bind(this)).on("open:overlay", function(t) {
                    this.revealOverlay(t.id)
                }.bind(this)), this._ccScrollable.refresh(), this._caAbyss = new d({
                    el: this.$el.find(">.component-atmosphere-abyss")
                }), this._caAbyss.render(), this.registerComponent(this._caAbyss), this.$elAtmosphereBrink = this.$el.find(">.component-atmosphere-brink"), c.csspointerevents ? (this._caBrink = new f({
                    el: this.$elAtmosphereBrink.css("width", "calc(100% - " + t + "px)")
                }), this._caBrink.render(), this.registerComponent(this._caBrink)) : this.$elAtmosphereBrink.remove(), this.on("overlay:reveal", function() {
                    this._cNavigation.concealControls(), this._ccScrollable.conceal(), this._cwToolbox.conceal()
                }.bind(this)).on("overlay:conceal", function() {
                    this._cNavigation.revealControls(), this._ccScrollable.reveal(), this._cwToolbox.reveal()
                }.bind(this));
                var r = this._ccScrollable.getSections().reduce(function(t, e) {
                    return e.excludeVideosFromPlaylist() ? [] : (e.getVideos().forEach(function(i) {
                        t.push({
                            section: e,
                            video: i
                        })
                    }), t)
                }, []);
                return this._ccScrollable.getSections().forEach(function(t) {
                    t.on("change:playback", function(e) {
                        var i = 1 === e.data || 3 === e.data,
                            n = null,
                            s = null;
                        if (r.some(function(i, r) {
                                if (t === i.section && e.track.index === i.video.index) return n = i, s = r, !0
                            }), !n) return void(i && (this._cNavigation._cwMiniplayer.setIsPlaying(!1), this._currentSectionVideo = null, this._currentSectionVideoIsPlaying = !1));
                        if (i || !this._currentSectionVideo || this._currentSectionVideo === n) {
                            this._cNavigation._cwMiniplayer.setIsPlaying(i);
                            var o = n ? a(s + 1, 2) + ". " + n.video.name : "";
                            this._cNavigation._cwTicker.setText(o).toggle(i), this._currentSectionVideo = n, this._currentSectionVideoIsPlaying = i
                        }
                    }.bind(this))
                }.bind(this)), this._cNavigation._cwMiniplayer.on("change:playback", function(t) {
                    var e = this._currentSectionVideo,
                        i = this._currentSectionVideoIsPlaying,
                        n = function(t) {
                            var e = 0;
                            return r.some(function(i, n) {
                                if (i === t) return e = n, !0
                            }), e
                        },
                        s = function(t) {
                            var e = r.length;
                            return (t % e + e) % e
                        },
                        o = function(t) {
                            t.section instanceof g && (t.section._scrolledToOnce || (this._navigate("#s/" + t.section.model.id), t.section._scrolledToOnce = !0))
                        }.bind(this);
                    switch (t.action) {
                        case "play":
                            e || (e = r[0]), o(e), e.section.playVideo();
                            break;
                        case "pause":
                            this._ccScrollable.getSections().forEach(function(t) {
                                t.pauseVideo()
                            });
                            break;
                        case "prev":
                            e = e ? r[s(n(e) - 1)] : r[r.length - 1], o(e), e.section.goToVideoByIndex(e.video.index, i), this._currentSectionVideo = e;
                            break;
                        case "next":
                            e = e ? r[s(n(e) + 1)] : r[0], o(e), e.section.goToVideoByIndex(e.video.index, i), this._currentSectionVideo = e
                    }
                }.bind(this)), this._renderMastheadTween(), this._renderBandTween(), this
            },
            _renderBandTween: function() {
                var e = this._ccScrollable.getSections(),
                    i = null,
                    r = null;
                if (e.some(function(t, e, n) {
                        if (t instanceof _) return i = t, n.length > e + 1 && (r = n[e + 1]), !0
                    }), i) {
                    var s = new y.Controller({
                            container: this._ccScrollable.$elInner[0]
                        }),
                        o = new y.Scene({
                            offset: 200,
                            duration: 500,
                            triggerElement: i.el,
                            triggerHook: .99
                        }).setTween(n.to(this._caAbyss.$elBgDark, 1, {
                            opacity: 1
                        })).on("progress", function(t) {
                            this._mastheadTween && this._mastheadTween.progress(1)
                        }.bind(this)).addTo(s),
                        a = new y.Scene({
                            triggerElement: i.el,
                            triggerHook: .4
                        }).on("progress", function(t) {
                            t.progress > 0 ? i.fullBandReveal() : i.fullBandConceal()
                        }.bind(this)).addTo(s);
                    if (r) var l = new y.Scene({
                        offset: -300,
                        triggerElement: r.el,
                        triggerHook: 1
                    }).on("progress", function(t) {
                        this._caAbyss.$elBgDark.css("opacity", t.progress ? .7 : 1)
                    }.bind(this)).addTo(s);
                    t(window).on("resize", function() {
                        o.refresh(), a.refresh(), l && l.refresh(), s.update(!0)
                    })
                }
            },
            _renderMastheadTween: function() {
                if (!c.csspointerevents) return void this._caAbyss.$elBgDark.css("opacity", 1);
                var e = this.getSectionsByClass(v)[0];
                if (e) {
                    var n = e.cloneContentContainer();
                    n.el.insertAfter(this._caBrink.$el).css("width", "calc(100% - " + i() + "px)"), e.getContainer(0).elPlayButton.on("mouseenter mouseleave", function(t) {
                        n.elPlayButton.toggleClass("hover", "mouseenter" == t.type)
                    }.bind(this));
                    var o = this._ccScrollable.getSections()[1],
                        a = new r({
                            paused: !0
                        }).fromTo(this._caBrink.$elImage, 1, {
                            scale: 1
                        }, {
                            scale: 2.7,
                            ease: s.easeIn
                        }, 0).fromTo(this._caAbyss.$elBgDark, 1, {
                            opacity: 0
                        }, {
                            opacity: .7
                        }, 0).fromTo(e.getElMask().toArray(), .7, {
                            scale: 1
                        }, {
                            scale: 1.4,
                            ease: "Power0.easeNone"
                        }, 0).fromTo([this._caAbyss.$elBgFlat, this._caAbyss.$elVideoContainer], 1, {
                            scale: 1
                        }, {
                            scale: 1.2,
                            ease: s.easeIn
                        }, 0).fromTo(o.$el, .2, {
                            opacity: 0
                        }, {
                            opacity: 1
                        }, .75);
                    t(window).on("resize", function() {
                        this.destroyMastheadScrollMagic(), this.createMastheadScrollMagic(e, o, a)
                    }.bind(this)), this.createMastheadScrollMagic(e, o, a)
                }
            },
            createMastheadScrollMagic: function(e, i, r) {
                var s = 300 + (t(window).height() < 650 ? 650 - t(window).height() : 0);
                e.$el.css("margin-bottom", s), this._smController = new y.Controller({
                    container: this._ccScrollable.$elInner[0]
                });
                new y.Scene({
                    offset: -s,
                    duration: 800,
                    triggerElement: i.el,
                    triggerHook: .99
                }).on("progress", function(t) {
                    t.progress >= .7 && e.getElInner().addClass("mask-zoom"), t.progress >= .4 && (e.getElInner().addClass("titles-out"), e.getContainer(0).el.css("display", "none")), t.progress < .4 && (e.getElInner().removeClass("mask-zoom titles-out"), e.getContainer(0).el.css("display", "")), this._mastheadTween = n.fromTo(r, .6, {
                        progress: r.progress()
                    }, {
                        progress: t.progress,
                        onComplete: function() {
                            this._mastheadTween = null
                        }.bind(this)
                    })
                }.bind(this)).addTo(this._smController)
            },
            destroyMastheadScrollMagic: function() {
                this._smController.destroy()
            },
            revealContent: function() {
                var t = e.prototype.revealContent.apply(this, arguments),
                    i = this._ccScrollable.getActiveSection() instanceof v;
                this.$el.removeClass("loading"), this.animateMasthead(i, t), i && (this._caBrink && n.fromTo(this._caBrink.$elImage, 1.4, {
                    scale: 1.15
                }, {
                    scale: 1
                }), n.fromTo(this._cwToolbox.$el, .48, {
                    y: 10,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    delay: 2.5,
                    clearProps: "all",
                    ease: o.easeInOut
                })), this.model.qualaroo && this.model.qualaroo.onLoadSurveyId && Math.random() >= .5 && window.setTimeout(function() {
                    l.push(["showSurvey", this.model.qualaroo.onLoadSurveyId])
                }.bind(this), 1e4)
            },
            animateMasthead: function(t, e) {
                var i = this.getSectionsByClass(v)[0];
                if (i) return t && e && c.csspointerevents ? void e.then(function() {
                    i.revealMask(), i.revealPlayButton(), i.toggleMaskGlitch(!0), setTimeout(function() {
                        i.toggleMaskGlitch(!1)
                    }, 600)
                }.bind(this)) : (i.revealMask(), void i.revealPlayButton())
            },
            getSectionsByClass: function(t) {
                return this._ccScrollable.getSections().filter(function(e) {
                    return e instanceof t
                })
            },
            goToSection: function(t, e) {
                this._activeOverlay && this._activeOverlay.conceal(), this._ccScrollable.goToSectionById(t, e)
            }
        })
    }), define("main", ["jquery", "backbone", "router/album", "component/page/album", "modernizr"], function(t, e, i, n) {
        return {
            run: function(r) {
                var s = new n({
                    el: t("body").find(".component-page-album"),
                    model: {
                        qualaroo: r.qualaroo
                    }
                });
                s.render(), s.preload().then(function() {
                    s.revealContent()
                });
                new i({
                    controllers: {
                        page: s
                    }
                });
                e.history.start({
                    pushState: !1
                })
            }
        }
    });