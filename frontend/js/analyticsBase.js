const dimensions = {
  TRACKING_VERSION: 'dimension1',
  CLIENT_ID: 'dimension2',
  WINDOW_ID: 'dimension3',
  HIT_ID: 'dimension4',
  HIT_TIME: 'dimension5',
  HIT_TYPE: 'dimension6',
};

const TRACKING_VERSION = 'v1';

const uuid = function b(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) :
      ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};

const trackError = (error, fieldsObj = {}) => {
  ga('send', 'event', Object.assign({
    eventCategory: 'Script',
    eventAction: 'error',
    eventLabel: (error && error.stack) || '(not set)',
    nonInteraction: true,
  }, fieldsObj));
};

const trackErrors = () => {
  const loadErrorEvents = window.__e && window.__e.q || [];
  const fieldsObj = {eventAction: 'uncaught error'};

  // Replay any stored load error events.
  for (let event of loadErrorEvents) {
    trackError(event.error, fieldsObj);
  }

  // Add a new listener to track event immediately.
  window.addEventListener('error', (event) => {
    trackError(event.error, fieldsObj);
  });
};

// basic analytics loading
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};
ga('create', 'UA-99079083-1', 'auto');
ga('set', 'transport', 'beacon');
ga('set', dimensions.TRACKING_VERSION, TRACKING_VERSION);
ga('set', dimensions.WINDOW_ID, uuid());
ga('send', 'pageview');

// get the client Id from ga
ga((tracker) => {
  var clientId = tracker.get('clientId');
  tracker.set(dimensions.CLIENT_ID, clientId);
});

ga((tracker) => {
  const originalBuildHitTask = tracker.get('buildHitTask');
  tracker.set('buildHitTask', (model) => {
    model.set(dimensions.HIT_ID, uuid(), true);
    model.set(dimensions.HIT_TIME, (new Date()).toISOString().replace(/[TZ]/g, ' '), true);
    model.set(dimensions.HIT_TYPE, model.get('hitType'), true);

    originalBuildHitTask(model);
  });
});

console.log('ga loaded');

trackErrors()






