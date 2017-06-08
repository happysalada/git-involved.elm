(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

},{}]},{},[1]);
