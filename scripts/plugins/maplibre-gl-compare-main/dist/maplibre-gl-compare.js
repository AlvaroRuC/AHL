! function i(o, r, s) {
    function h(t, e) {
        if (!r[t]) {
            if (!o[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (u) return u(t, !0);
                throw (e = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", e
            }
            n = r[t] = {
                exports: {}
            }, o[t][0].call(n.exports, function(e) {
                return h(o[t][1][e] || e)
            }, n, n.exports, i, o, r, s)
        }
        return r[t].exports
    }
    for (var u = "function" == typeof require && require, e = 0; e < s.length; e++) h(s[e]);
    return h
}({
    1: [function(e, t, n) {
        "use strict";
        var o = e("@mapbox/mapbox-gl-sync-move"),
            r = e("events").EventEmitter;

        function i(e, t, n, i) {
            if (this.options = i || {}, this._mapA = e, this._mapB = t, this._horizontal = "horizontal" === this.options.orientation, this._onDown = this._onDown.bind(this), this._onMove = this._onMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this), this._ev = new r, this._swiper = document.createElement("div"), this._swiper.className = this._horizontal ? "compare-swiper-horizontal" : "compare-swiper-vertical", this._controlContainer = document.createElement("div"), this._controlContainer.className = this._horizontal ? "maplibregl-compare maplibregl-compare-horizontal" : "maplibregl-compare", this._controlContainer.className = this._controlContainer.className, this._controlContainer.appendChild(this._swiper), "string" == typeof n && document.body.querySelectorAll) {
                i = document.body.querySelectorAll(n)[0];
                if (!i) throw new Error("Cannot find element with specified container selector.");
                i.appendChild(this._controlContainer)
            } else {
                if (!(n instanceof Element && n.appendChild)) throw new Error("Invalid container specified. Must be CSS selector or HTML element.");
                n.appendChild(this._controlContainer)
            }
            this._bounds = t.getContainer().getBoundingClientRect();
            i = (this._horizontal ? this._bounds.height : this._bounds.width) / 2;
            this._setPosition(i), this._clearSync = o(e, t), this._onResize = function() {
                this._bounds = t.getContainer().getBoundingClientRect(), this.currentPosition && this._setPosition(this.currentPosition)
            }.bind(this), t.on("resize", this._onResize), this.options && this.options.mousemove && (e.getContainer().addEventListener("mousemove", this._onMove), t.getContainer().addEventListener("mousemove", this._onMove)), this._swiper.addEventListener("mousedown", this._onDown), this._swiper.addEventListener("touchstart", this._onDown)
        }
        i.prototype = {
            _setPointerEvents: function(e) {
                this._controlContainer.style.pointerEvents = e, this._swiper.style.pointerEvents = e
            },
            _onDown: function(e) {
                e.touches ? (document.addEventListener("touchmove", this._onMove), document.addEventListener("touchend", this._onTouchEnd)) : (document.addEventListener("mousemove", this._onMove), document.addEventListener("mouseup", this._onMouseUp))
            },
            _setPosition: function(e) {
                e = Math.min(e, this._horizontal ? this._bounds.height : this._bounds.width);
                var t = this._horizontal ? "translate(0, " + e + "px)" : "translate(" + e + "px, 0)",
                    t = (this._controlContainer.style.transform = t, this._controlContainer.style.WebkitTransform = t, this._horizontal ? "rect(0, 999em, " + e + "px, 0)" : "rect(0, " + e + "px, " + this._bounds.height + "px, 0)"),
                    n = this._horizontal ? "rect(" + e + "px, 999em, " + this._bounds.height + "px,0)" : "rect(0, 999em, " + this._bounds.height + "px," + e + "px)";
                this._mapA.getContainer().style.clip = t, this._mapB.getContainer().style.clip = n, this.currentPosition = e
            },
            _onMove: function(e) {
                this.options && this.options.mousemove && this._setPointerEvents(e.touches ? "auto" : "none"), this._horizontal ? this._setPosition(this._getY(e)) : this._setPosition(this._getX(e))
            },
            _onMouseUp: function() {
                document.removeEventListener("mousemove", this._onMove), document.removeEventListener("mouseup", this._onMouseUp), this.fire("slideend", {
                    currentPosition: this.currentPosition
                })
            },
            _onTouchEnd: function() {
                document.removeEventListener("touchmove", this._onMove), document.removeEventListener("touchend", this._onTouchEnd), this.fire("slideend", {
                    currentPosition: this.currentPosition
                })
            },
            _getX: function(e) {
                e = (e = e.touches ? e.touches[0] : e).clientX - this._bounds.left;
                return e = (e = e < 0 ? 0 : e) > this._bounds.width ? this._bounds.width : e
            },
            _getY: function(e) {
                e = (e = e.touches ? e.touches[0] : e).clientY - this._bounds.top;
                return e = (e = e < 0 ? 0 : e) > this._bounds.height ? this._bounds.height : e
            },
            setSlider: function(e) {
                this._setPosition(e)
            },
            on: function(e, t) {
                return this._ev.on(e, t), this
            },
            fire: function(e, t) {
                return this._ev.emit(e, t), this
            },
            off: function(e, t) {
                return this._ev.removeListener(e, t), this
            },
            remove: function() {
                this._clearSync(), this._mapB.off("resize", this._onResize);
                var e = this._mapA.getContainer(),
                    e = (e && (e.style.clip = null, e.removeEventListener("mousemove", this._onMove)), this._mapB.getContainer());
                e && (e.style.clip = null, e.removeEventListener("mousemove", this._onMove)), this._swiper.removeEventListener("mousedown", this._onDown), this._swiper.removeEventListener("touchstart", this._onDown), this._controlContainer.remove()
            }
        }, window.maplibregl ? maplibregl.Compare = i : void 0 !== t && (t.exports = i)
    }, {
        "@mapbox/mapbox-gl-sync-move": 2,
        events: 3
    }],
    2: [function(e, t, n) {
        t.exports = function() {
            var e = arguments.length;
            if (1 === e) t = arguments[0];
            else
                for (var t = [], n = 0; n < e; n++) t.push(arguments[n]);
            var i = [];

            function o() {
                t.forEach(function(e, t) {
                    e.on("move", i[t])
                })
            }

            function r() {
                t.forEach(function(e, t) {
                    e.off("move", i[t])
                })
            }
            return t.forEach(function(e, n) {
                    i[n] = function(e, t) {
                        r(),
                            function(e, t) {
                                var n = e.getCenter(),
                                    i = e.getZoom(),
                                    o = e.getBearing(),
                                    r = e.getPitch();
                                t.forEach(function(e) {
                                    e.jumpTo({
                                        center: n,
                                        zoom: i,
                                        bearing: o,
                                        pitch: r
                                    })
                                })
                            }(e, t), o()
                    }.bind(null, e, t.filter(function(e, t) {
                        return t !== n
                    }))
                }), o(),
                function() {
                    r(), i = []
                }
        }
    }, {}],
    3: [function(a, e, f) {
        "use strict";
        var t = "object" == typeof Reflect ? Reflect : null,
            u = t && "function" == typeof t.apply ? t.apply : function(e, t, n) {
                return Function.prototype.apply.call(e, t, n)
            };
        var l = t && "function" == typeof t.ownKeys ? t.ownKeys : Object.getOwnPropertySymbols ? function(e) {
                return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
            } : function(e) {
                return Object.getOwnPropertyNames(e)
            },
            n = Number.isNaN || function(e) {
                return e != e
            };

        function i() {
            i.init.call(this)
        }
        e.exports = i, e.exports.once = function(h, u) {
            return new Promise(function(e, t) {
                function n(e) {
                    h.removeListener(u, i), t(e)
                }

                function i() {
                    "function" == typeof h.removeListener && h.removeListener("error", n), e([].slice.call(arguments))
                }
                var o, r, s;
                d(h, u, i, {
                    once: !0
                }), "error" !== u && (r = n, s = {
                    once: !0
                }, "function" == typeof(o = h).on && d(o, "error", r, s))
            })
        }, (i.EventEmitter = i).prototype._events = void 0, i.prototype._eventsCount = 0, i.prototype._maxListeners = void 0;
        var o = 10;

        function c(e) {
            if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
        }

        function s(e) {
            return void 0 === e._maxListeners ? i.defaultMaxListeners : e._maxListeners
        }

        function r(e, t, n, i) {
            var o, r;
            return c(n), void 0 === (o = e._events) ? (o = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== o.newListener && (e.emit("newListener", t, n.listener || n), o = e._events), r = o[t]), void 0 === r ? (r = o[t] = n, ++e._eventsCount) : ("function" == typeof r ? r = o[t] = i ? [n, r] : [r, n] : i ? r.unshift(n) : r.push(n), 0 < (o = s(e)) && r.length > o && !r.warned && (r.warned = !0, (i = new Error("Possible EventEmitter memory leak detected. " + r.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit")).name = "MaxListenersExceededWarning", i.emitter = e, i.type = t, i.count = r.length, n = i, console && console.warn && console.warn(n))), e
        }

        function h(e, t, n) {
            e = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n
            }, t = function() {
                if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            }.bind(e);
            return t.listener = n, e.wrapFn = t
        }

        function p(e, t, n) {
            e = e._events;
            if (void 0 === e) return [];
            e = e[t];
            {
                if (void 0 === e) return [];
                if ("function" == typeof e) return n ? [e.listener || e] : [e];
                if (n) {
                    for (var i = e, o = new Array(i.length), r = 0; r < o.length; ++r) o[r] = i[r].listener || i[r];
                    return o
                }
                return m(e, e.length)
            }
        }

        function v(e) {
            var t = this._events;
            if (void 0 !== t) {
                t = t[e];
                if ("function" == typeof t) return 1;
                if (void 0 !== t) return t.length
            }
            return 0
        }

        function m(e, t) {
            for (var n = new Array(t), i = 0; i < t; ++i) n[i] = e[i];
            return n
        }

        function d(n, i, o, r) {
            if ("function" == typeof n.on) r.once ? n.once(i, o) : n.on(i, o);
            else {
                if ("function" != typeof n.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof n);
                n.addEventListener(i, function e(t) {
                    r.once && n.removeEventListener(i, e), o(t)
                })
            }
        }
        Object.defineProperty(i, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
                return o
            },
            set: function(e) {
                if ("number" != typeof e || e < 0 || n(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                o = e
            }
        }), i.init = function() {
            void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
        }, i.prototype.setMaxListeners = function(e) {
            if ("number" != typeof e || e < 0 || n(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
            return this._maxListeners = e, this
        }, i.prototype.getMaxListeners = function() {
            return s(this)
        }, i.prototype.emit = function(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
            var i = "error" === e,
                o = this._events;
            if (void 0 !== o) i = i && void 0 === o.error;
            else if (!i) return !1;
            if (i) {
                if ((r = 0 < t.length ? t[0] : r) instanceof Error) throw r;
                i = new Error("Unhandled error." + (r ? " (" + r.message + ")" : ""));
                throw i.context = r, i
            }
            var r = o[e];
            if (void 0 === r) return !1;
            if ("function" == typeof r) u(r, this, t);
            else
                for (var s = r.length, h = m(r, s), n = 0; n < s; ++n) u(h[n], this, t);
            return !0
        }, i.prototype.on = i.prototype.addListener = function(e, t) {
            return r(this, e, t, !1)
        }, i.prototype.prependListener = function(e, t) {
            return r(this, e, t, !0)
        }, i.prototype.once = function(e, t) {
            return c(t), this.on(e, h(this, e, t)), this
        }, i.prototype.prependOnceListener = function(e, t) {
            return c(t), this.prependListener(e, h(this, e, t)), this
        }, i.prototype.off = i.prototype.removeListener = function(e, t) {
            var n, i, o, r, s;
            if (c(t), void 0 === (i = this._events)) return this;
            if (void 0 === (n = i[e])) return this;
            if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
            else if ("function" != typeof n) {
                for (o = -1, r = n.length - 1; 0 <= r; r--)
                    if (n[r] === t || n[r].listener === t) {
                        s = n[r].listener, o = r;
                        break
                    } if (o < 0) return this;
                if (0 === o) n.shift();
                else {
                    for (var h = n, u = o; u + 1 < h.length; u++) h[u] = h[u + 1];
                    h.pop()
                }
                1 === n.length && (i[e] = n[0]), void 0 !== i.removeListener && this.emit("removeListener", e, s || t)
            }
            return this
        }, i.prototype.removeAllListeners = function(e) {
            var t, n = this._events;
            if (void 0 === n) return this;
            if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]), this;
            if (0 === arguments.length) {
                for (var i, o = Object.keys(n), r = 0; r < o.length; ++r) "removeListener" !== (i = o[r]) && this.removeAllListeners(i);
                return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
            }
            if ("function" == typeof(t = n[e])) this.removeListener(e, t);
            else if (void 0 !== t)
                for (r = t.length - 1; 0 <= r; r--) this.removeListener(e, t[r]);
            return this
        }, i.prototype.listeners = function(e) {
            return p(this, e, !0)
        }, i.prototype.rawListeners = function(e) {
            return p(this, e, !1)
        }, i.listenerCount = function(e, t) {
            return "function" == typeof e.listenerCount ? e.listenerCount(t) : v.call(e, t)
        }, i.prototype.listenerCount = v, i.prototype.eventNames = function() {
            return 0 < this._eventsCount ? l(this._events) : []
        }
    }, {}]
}, {}, [1]);