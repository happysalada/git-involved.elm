(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('./autotrack.custom.js');

var dimensions = {
  TRACKING_VERSION: 'dimension1',
  CLIENT_ID: 'dimension2',
  WINDOW_ID: 'dimension3',
  HIT_ID: 'dimension4',
  HIT_TIME: 'dimension5',
  HIT_TYPE: 'dimension6'
};

var metrics = {
  RESPONSE_END_TIME: 'metric1',
  DOM_LOAD_TIME: 'metric2',
  WINDOW_LOAD_TIME: 'metric3'
};

var TRACKING_VERSION = 'v1';

var uuid = function b(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};

var trackError = function trackError(error) {
  var fieldsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  ga('send', 'event', Object.assign({
    eventCategory: 'Script',
    eventAction: 'error',
    eventLabel: error && error.stack || '(not set)',
    nonInteraction: true
  }, fieldsObj));
};

var trackErrors = function trackErrors() {
  var loadErrorEvents = window.__e && window.__e.q || [];
  var fieldsObj = { eventAction: 'uncaught error' };

  // Replay any stored load error events.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = loadErrorEvents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var event = _step.value;

      trackError(event.error, fieldsObj);
    }

    // Add a new listener to track event immediately.
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  window.addEventListener('error', function (event) {
    trackError(event.error, fieldsObj);
  });
};

var sendNavigationTimingMetrics = function sendNavigationTimingMetrics() {
  // Only track performance in supporting browsers.
  if (!(window.performance && window.performance.timing)) return;

  // If the window hasn't loaded, run this function after the `load` event.
  if (document.readyState != 'complete') {
    window.addEventListener('load', sendNavigationTimingMetrics);
    return;
  }

  var nt = performance.timing;
  var navStart = nt.navigationStart;

  var responseEnd = Math.round(nt.responseEnd - navStart);
  var domLoaded = Math.round(nt.domContentLoadedEventStart - navStart);
  var windowLoaded = Math.round(nt.loadEventStart - navStart);
  // In some edge cases browsers return very obviously incorrect NT values,
  // e.g. 0, negative, or future times. This validates values before sending.
  var allValuesAreValid = function allValuesAreValid() {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
      values[_key] = arguments[_key];
    }

    return values.every(function (value) {
      return value > 0 && value < 1e6;
    });
  };

  if (allValuesAreValid(responseEnd, domLoaded, windowLoaded)) {
    var _ga;

    ga('send', 'event', (_ga = {
      eventCategory: 'Navigation Timing',
      eventAction: 'track',
      nonInteraction: true
    }, _defineProperty(_ga, metrics.RESPONSE_END_TIME, responseEnd), _defineProperty(_ga, metrics.DOM_LOAD_TIME, domLoaded), _defineProperty(_ga, metrics.WINDOW_LOAD_TIME, windowLoaded), _ga));
  }
};

// basic analytics loading
window.ga = window.ga || function () {
  (ga.q = ga.q || []).push(arguments);
};
ga('create', 'UA-99079083-1', 'auto');
ga('set', 'transport', 'beacon');
ga('set', dimensions.TRACKING_VERSION, TRACKING_VERSION);
ga('set', dimensions.WINDOW_ID, uuid());

// get the client Id from ga
ga(function (tracker) {
  var clientId = tracker.get('clientId');
  tracker.set(dimensions.CLIENT_ID, clientId);
});

ga(function (tracker) {
  var originalBuildHitTask = tracker.get('buildHitTask');
  tracker.set('buildHitTask', function (model) {
    model.set(dimensions.HIT_ID, uuid(), true);
    model.set(dimensions.HIT_TIME, new Date().toISOString().replace(/[TZ]/g, ' '), true);
    model.set(dimensions.HIT_TYPE, model.get('hitType'), true);

    originalBuildHitTask(model);
  });
});

ga('require', 'maxScrollTracker', {
  maxScrollMetricIndex: 4
});

ga('require', 'urlChangeTracker');

sendNavigationTimingMetrics();
trackErrors();

ga('require', 'pageVisibilityTracker', {
  sendInitialPageview: true
});
// no longer needed because of pageVisibilityTracker
// ga('send', 'pageview');

},{"./autotrack.custom.js":2}],2:[function(require,module,exports){
(function (global){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    if (c.get || c.set) throw new TypeError("ES3 does not support getters and setters.");a != Array.prototype && a != Object.prototype && (a[b] = c.value);
  },
      f = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;function g() {
    g = function g() {};f.Symbol || (f.Symbol = ba);
  }var ca = 0;function ba(a) {
    return "jscomp_symbol_" + (a || "") + ca++;
  }
  function h() {
    g();var a = f.Symbol.iterator;a || (a = f.Symbol.iterator = f.Symbol("iterator"));"function" != typeof Array.prototype[a] && aa(Array.prototype, a, { configurable: !0, writable: !0, value: function value() {
        return k(this);
      } });h = function h() {};
  }function k(a) {
    var b = 0;return da(function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    });
  }function da(a) {
    h();a = { next: a };a[f.Symbol.iterator] = function () {
      return this;
    };return a;
  }
  function l(a) {
    if (!(a instanceof Array)) {
      h();var b = a[Symbol.iterator];a = b ? b.call(a) : k(a);for (var c = []; !(b = a.next()).done;) {
        c.push(b.value);
      }a = c;
    }return a;
  }function ea(a, b) {
    function c() {}c.prototype = b.prototype;a.N = b.prototype;a.prototype = new c();a.prototype.constructor = a;for (var d in b) {
      if (Object.defineProperties) {
        var e = Object.getOwnPropertyDescriptor(b, d);e && Object.defineProperty(a, d, e);
      } else a[d] = b[d];
    }
  }var fa = /:(80|443)$/,
      m = document.createElement("a"),
      n = {};
  function p(a) {
    a = a && "." != a ? a : location.href;if (n[a]) return n[a];m.href = a;if ("." == a.charAt(0) || "/" == a.charAt(0)) return p(m.href);var b = "80" == m.port || "443" == m.port ? "" : m.port,
        b = "0" == b ? "" : b,
        c = m.host.replace(fa, "");return n[a] = { hash: m.hash, host: c, hostname: m.hostname, href: m.href, origin: m.origin ? m.origin : m.protocol + "//" + c, pathname: "/" == m.pathname.charAt(0) ? m.pathname : "/" + m.pathname, port: b, protocol: m.protocol, search: m.search };
  }var q = [];
  function ha(a, b) {
    var c = this;this.context = a;this.u = b;this.f = (this.c = /Task$/.test(b)) ? a.get(b) : a[b];this.b = [];this.a = [];this.g = function (a) {
      for (var b = [], d = 0; d < arguments.length; ++d) {
        b[d - 0] = arguments[d];
      }return c.a[c.a.length - 1].apply(null, [].concat(l(b)));
    };this.c ? a.set(b, this.g) : a[b] = this.g;
  }function r(a, b, c) {
    a = t(a, b);a.b.push(c);u(a);
  }
  function v(a, b, c) {
    a = t(a, b);c = a.b.indexOf(c);-1 < c && (a.b.splice(c, 1), 0 < a.b.length ? u(a) : (c = q.indexOf(a), -1 < c && (q.splice(c, 1), a.c ? a.context.set(a.u, a.f) : a.context[a.u] = a.f)));
  }function u(a) {
    a.a = [];for (var b, c = 0; b = a.b[c]; c++) {
      var d = a.a[c - 1] || a.f.bind(a.context);a.a.push(b(d));
    }
  }function t(a, b) {
    var c = q.filter(function (c) {
      return c.context == a && c.u == b;
    })[0];c || (c = new ha(a, b), q.push(c));return c;
  }
  function w(a, b, c, d) {
    if ("function" == typeof d) {
      var e = c.get("buildHitTask");return { buildHitTask: function buildHitTask(c) {
          c.set(a, null, !0);c.set(b, null, !0);d(c, void 0, void 0);e(c);
        } };
    }return y({}, a, b);
  }function ia(a) {
    var b;return function (c) {
      for (var d = [], e = 0; e < arguments.length; ++e) {
        d[e - 0] = arguments[e];
      }clearTimeout(b);b = setTimeout(function () {
        return a.apply(null, [].concat(l(d)));
      }, 500);
    };
  }var z = {};
  function ja(a, b) {
    function c() {
      clearTimeout(e.timeout);e.send && v(a, "send", e.send);delete z[d];e.w.forEach(function (a) {
        return a();
      });
    }var d = a.get("trackingId"),
        e = z[d] = z[d] || {};clearTimeout(e.timeout);e.timeout = setTimeout(c, 0);e.w = e.w || [];e.w.push(b);e.send || (e.send = function (a) {
      return function (b) {
        for (var d = [], e = 0; e < arguments.length; ++e) {
          d[e - 0] = arguments[e];
        }c();a.apply(null, [].concat(l(d)));
      };
    }, r(a, "send", e.send));
  }
  var y = Object.assign || function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) {
      c[d - 1] = arguments[d];
    }for (var d = 0, e = c.length; d < e; d++) {
      var E = Object(c[d]),
          x;for (x in E) {
        Object.prototype.hasOwnProperty.call(E, x) && (a[x] = E[x]);
      }
    }return a;
  },
      A = function ka(b) {
    return b ? (b ^ 16 * Math.random() >> b / 4).toString(16) : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, ka);
  };
  function B(a, b) {
    var c = window.GoogleAnalyticsObject || "ga";window[c] = window[c] || function (a) {
      for (var b = [], d = 0; d < arguments.length; ++d) {
        b[d - 0] = arguments[d];
      }(window[c].q = window[c].q || []).push(b);
    };window.gaDevIds = window.gaDevIds || [];0 > window.gaDevIds.indexOf("i5iSjo") && window.gaDevIds.push("i5iSjo");window[c]("provide", a, b);window.gaplugins = window.gaplugins || {};window.gaplugins[a.charAt(0).toUpperCase() + a.slice(1)] = b;
  }function C() {
    this.a = {};
  }function la(a, b) {
    (a.a.externalSet = a.a.externalSet || []).push(b);
  }
  C.prototype.D = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) {
      c[d - 1] = arguments[d];
    }(this.a[a] = this.a[a] || []).forEach(function (a) {
      return a.apply(null, [].concat(l(c)));
    });
  };var D = {},
      F = !1,
      G;function H(a, b) {
    b = void 0 === b ? {} : b;this.a = {};this.b = a;this.l = b;this.i = null;
  }ea(H, C);function I(a, b, c) {
    a = ["autotrack", a, b].join(":");D[a] || (D[a] = new H(a, c), F || (window.addEventListener("storage", J), F = !0));return D[a];
  }
  function K() {
    if (null != G) return G;try {
      window.localStorage.setItem("autotrack", "autotrack"), window.localStorage.removeItem("autotrack"), G = !0;
    } catch (a) {
      G = !1;
    }return G;
  }H.prototype.get = function () {
    if (this.i) return this.i;if (K()) try {
      this.i = L(window.localStorage.getItem(this.b));
    } catch (a) {}return this.i = y({}, this.l, this.i);
  };H.prototype.set = function (a) {
    this.i = y({}, this.l, this.i, a);if (K()) try {
      var b = JSON.stringify(this.i);window.localStorage.setItem(this.b, b);
    } catch (c) {}
  };
  function M(a) {
    a.i = {};if (K()) try {
      window.localStorage.removeItem(a.b);
    } catch (b) {}
  }function ma(a) {
    delete D[a.b];Object.keys(D).length || (window.removeEventListener("storage", J), F = !1);
  }function J(a) {
    var b = D[a.key];if (b) {
      var c = y({}, b.l, L(a.oldValue));a = y({}, b.l, L(a.newValue));b.i = a;b.D("externalSet", a, c);
    }
  }function L(a) {
    var b = {};if (a) try {
      b = JSON.parse(a);
    } catch (c) {}return b;
  }var N = {};
  function O(a, b, c) {
    this.f = a;this.timeout = b || P;this.timeZone = c;this.b = this.b.bind(this);r(a, "sendHitTask", this.b);try {
      this.c = new Intl.DateTimeFormat("en-US", { timeZone: this.timeZone });
    } catch (d) {}this.a = I(a.get("trackingId"), "session", { hitTime: 0, isExpired: !1 });this.a.get().id || this.a.set({ id: A() });
  }function na(a, b, c) {
    var d = a.get("trackingId");return N[d] ? N[d] : N[d] = new O(a, b, c);
  }function Q(a) {
    return a.a.get().id;
  }
  O.prototype.isExpired = function (a) {
    a = void 0 === a ? Q(this) : a;if (a != Q(this)) return !0;a = this.a.get();if (a.isExpired) return !0;var b = a.hitTime;return b && (a = new Date(), b = new Date(b), a - b > 6E4 * this.timeout || this.c && this.c.format(a) != this.c.format(b)) ? !0 : !1;
  };O.prototype.b = function (a) {
    var b = this;return function (c) {
      a(c);var d = c.get("sessionControl");c = "start" == d || b.isExpired();var d = "end" == d,
          e = b.a.get();e.hitTime = +new Date();c && (e.isExpired = !1, e.id = A());d && (e.isExpired = !0);b.a.set(e);
    };
  };
  function oa(a) {
    v(a.f, "sendHitTask", a.b);ma(a.a);delete N[a.f.get("trackingId")];
  }var P = 30,
      R = { G: 1, H: 2, I: 3, J: 4, K: 5, L: 6, B: 7, M: 8, C: 9, A: 10 },
      S = Object.keys(R).length;function T(a, b) {
    a.set("\x26_av", "2.4.1");var c = a.get("\x26_au"),
        c = parseInt(c || "0", 16).toString(2);if (c.length < S) for (var d = S - c.length; d;) {
      c = "0" + c, d--;
    }b = S - b;c = c.substr(0, b) + 1 + c.substr(b + 1);a.set("\x26_au", parseInt(c || "0", 2).toString(16));
  }
  function U(a, b) {
    T(a, R.A);window.addEventListener && (this.b = y({ increaseThreshold: 20, sessionTimeout: P, fieldsObj: {} }, b), this.f = a, this.c = pa(this), this.g = ia(this.g.bind(this)), this.j = this.j.bind(this), this.a = I(a.get("trackingId"), "plugins/max-scroll-tracker"), this.h = na(a, this.b.sessionTimeout, this.b.timeZone), r(a, "set", this.j), qa(this));
  }function qa(a) {
    100 > (a.a.get()[a.c] || 0) && window.addEventListener("scroll", a.g);
  }
  U.prototype.g = function () {
    var a = document.documentElement,
        b = document.body,
        a = Math.min(100, Math.max(0, Math.round(window.pageYOffset / (Math.max(a.offsetHeight, a.scrollHeight, b.offsetHeight, b.scrollHeight) - window.innerHeight) * 100))),
        b = Q(this.h);b != this.a.get().sessionId && (M(this.a), this.a.set({ sessionId: b }));if (this.h.isExpired(this.a.get().sessionId)) M(this.a);else if (b = this.a.get()[this.c] || 0, a > b && (100 != a && 100 != b || window.removeEventListener("scroll", this.g), b = a - b, 100 == a || b >= this.b.increaseThreshold)) {
      var c = {};this.a.set((c[this.c] = a, c.sessionId = Q(this.h), c));a = { transport: "beacon", eventCategory: "Max Scroll", eventAction: "increase", eventValue: b, eventLabel: String(a), nonInteraction: !0 };this.b.maxScrollMetricIndex && (a["metric" + this.b.maxScrollMetricIndex] = b);this.f.send("event", w(a, this.b.fieldsObj, this.f, this.b.hitFilter));
    }
  };U.prototype.j = function (a) {
    var b = this;return function (c, d) {
      a(c, d);var e = {};("object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && null !== c ? c : (e[c] = d, e)).page && (c = b.c, b.c = pa(b), b.c != c && qa(b));
    };
  };
  function pa(a) {
    a = p(a.f.get("page") || a.f.get("location"));return a.pathname + a.search;
  }U.prototype.remove = function () {
    oa(this.h);window.removeEventListener("scroll", this.g);v(this.f, "set", this.j);
  };B("maxScrollTracker", U);var V = A();
  function W(a, b) {
    var c = this;T(a, R.B);document.visibilityState && (this.a = y({ sessionTimeout: P, visibleThreshold: 5E3, sendInitialPageview: !1, fieldsObj: {} }, b), this.b = a, this.h = document.visibilityState, this.o = null, this.v = !1, this.j = this.j.bind(this), this.f = this.f.bind(this), this.m = this.m.bind(this), this.s = this.s.bind(this), this.c = I(a.get("trackingId"), "plugins/page-visibility-tracker"), la(this.c, this.s), this.g = na(a, this.a.sessionTimeout, this.a.timeZone), r(a, "set", this.j), window.addEventListener("unload", this.m), document.addEventListener("visibilitychange", this.f), ja(this.b, function () {
      if ("visible" == document.visibilityState) c.a.sendInitialPageview && (X(c, { F: !0 }), c.v = !0), c.c.set({ time: +new Date(), state: "visible", pageId: V, sessionId: Q(c.g) });else if (c.a.sendInitialPageview && c.a.pageLoadsMetricIndex) {
        var a = {},
            a = (a.transport = "beacon", a.eventCategory = "Page Visibility", a.eventAction = "page load", a.eventLabel = "(not set)", a["metric" + c.a.pageLoadsMetricIndex] = 1, a.nonInteraction = !0, a);c.b.send("event", w(a, c.a.fieldsObj, c.b, c.a.hitFilter));
      }
    }));
  }
  W.prototype.f = function () {
    var a = this;if ("visible" == document.visibilityState || "hidden" == document.visibilityState) {
      var b = ra(this),
          c = { time: +new Date(), state: document.visibilityState, pageId: V, sessionId: Q(this.g) };"visible" == document.visibilityState && this.a.sendInitialPageview && !this.v && (X(this), this.v = !0);"hidden" == document.visibilityState && this.o && clearTimeout(this.o);this.g.isExpired(b.sessionId) ? (M(this.c), "hidden" == this.h && "visible" == document.visibilityState && (clearTimeout(this.o), this.o = setTimeout(function () {
        a.c.set(c);
        X(a, { hitTime: c.time });
      }, this.a.visibleThreshold))) : (b.pageId == V && "visible" == b.state && sa(this, b), this.c.set(c));this.h = document.visibilityState;
    }
  };function ra(a) {
    var b = a.c.get();"visible" == a.h && "hidden" == b.state && b.pageId != V && (b.state = "visible", b.pageId = V, a.c.set(b));return b;
  }
  function sa(a, b, c) {
    c = (c ? c : {}).hitTime;var d = { hitTime: c },
        d = (d ? d : {}).hitTime;(b = b.time ? (d || +new Date()) - b.time : 0) && b >= a.a.visibleThreshold && (b = Math.round(b / 1E3), d = { transport: "beacon", nonInteraction: !0, eventCategory: "Page Visibility", eventAction: "track", eventValue: b, eventLabel: "(not set)" }, c && (d.queueTime = +new Date() - c), a.a.visibleMetricIndex && (d["metric" + a.a.visibleMetricIndex] = b), a.b.send("event", w(d, a.a.fieldsObj, a.b, a.a.hitFilter)));
  }
  function X(a, b) {
    var c = b ? b : {};b = c.hitTime;var c = c.F,
        d = { transport: "beacon" };b && (d.queueTime = +new Date() - b);c && a.a.pageLoadsMetricIndex && (d["metric" + a.a.pageLoadsMetricIndex] = 1);a.b.send("pageview", w(d, a.a.fieldsObj, a.b, a.a.hitFilter));
  }W.prototype.j = function (a) {
    var b = this;return function (c, d) {
      var e = {},
          e = "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && null !== c ? c : (e[c] = d, e);e.page && e.page !== b.b.get("page") && "visible" == b.h && b.f();a(c, d);
    };
  };
  W.prototype.s = function (a, b) {
    a.time != b.time && (b.pageId != V || "visible" != b.state || this.g.isExpired(b.sessionId) || sa(this, b, { hitTime: a.time }));
  };W.prototype.m = function () {
    "hidden" != this.h && this.f();
  };W.prototype.remove = function () {
    ma(this.c);oa(this.g);v(this.b, "set", this.j);window.removeEventListener("unload", this.m);document.removeEventListener("visibilitychange", this.f);
  };B("pageVisibilityTracker", W);
  function Y(a, b) {
    T(a, R.C);history.pushState && window.addEventListener && (this.a = y({ shouldTrackUrlChange: this.shouldTrackUrlChange, trackReplaceState: !1, fieldsObj: {}, hitFilter: null }, b), this.g = a, this.h = location.pathname + location.search, this.c = this.c.bind(this), this.f = this.f.bind(this), this.b = this.b.bind(this), r(history, "pushState", this.c), r(history, "replaceState", this.f), window.addEventListener("popstate", this.b));
  }
  Y.prototype.c = function (a) {
    var b = this;return function (c) {
      for (var d = [], e = 0; e < arguments.length; ++e) {
        d[e - 0] = arguments[e];
      }a.apply(null, [].concat(l(d)));Z(b, !0);
    };
  };Y.prototype.f = function (a) {
    var b = this;return function (c) {
      for (var d = [], e = 0; e < arguments.length; ++e) {
        d[e - 0] = arguments[e];
      }a.apply(null, [].concat(l(d)));Z(b, !1);
    };
  };Y.prototype.b = function () {
    Z(this, !0);
  };
  function Z(a, b) {
    setTimeout(function () {
      var c = a.h,
          d = location.pathname + location.search;c != d && a.a.shouldTrackUrlChange.call(a, d, c) && (a.h = d, a.g.set({ page: d, title: document.title }), (b || a.a.trackReplaceState) && a.g.send("pageview", w({ transport: "beacon" }, a.a.fieldsObj, a.g, a.a.hitFilter)));
    }, 0);
  }Y.prototype.shouldTrackUrlChange = function (a, b) {
    return !(!a || !b);
  };Y.prototype.remove = function () {
    v(history, "pushState", this.c);v(history, "replaceState", this.f);window.removeEventListener("popstate", this.b);
  };
  B("urlChangeTracker", Y);
})();


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
