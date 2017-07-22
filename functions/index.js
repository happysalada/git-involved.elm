'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const secureCompare = require('secure-compare');
admin.initializeApp(functions.config().firebase);
const axios = require('axios');


function handleError(err, res) {
  console.error(err);
  res.status(500).send(err);
  return Promise.reject(err);
}

exports.javascript = functions.https.onRequest((req, res) => {
  const jsRef = admin.database().ref('javascript')
  return jsRef.once('value').then(dataSnapshot => {
    res.status(200).send(dataSnapshot.val());
  }).catch((err) => handleError(err, res));
});

exports.setJavascript = functions.https.onRequest((req, res) => {
  const cronKey = req.query.key;

  // Exit if the keys don't match
  if (!secureCompare(cronKey, functions.config().cron.key)) {
    console.log('The key provided in the request does not match the key set in the environment. Check that', key,
        'matches the cron.key attribute in `firebase env:get`');
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the ' +
        'cron.key environment variable.');
    return;
  }

  const jsRef = admin.database().ref('javascript')
  axios.get('https://api.github.com/search/issues?q=language:Javascript+is:open&sort=updated&limit=30')
    .then(jsonResponse => jsRef.set(jsonResponse.data))
    .then(() => res.status(200).send('Issues were written to the db'))
  .catch((err) => handleError(err, res));
});
