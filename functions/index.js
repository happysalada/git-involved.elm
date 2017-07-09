/**
 * Copyright 2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Datastore = require('@google-cloud/datastore');

// Instantiates a client
const datastore = Datastore();

function sendDataFromStore (key, res) {
  return datastore.get(key).then(([entity]) => {
    if (!entity) throw new Error(`Nothing in ${key.path.join('/')}.`);
    res.status(200).send(entity);
  }).catch((err) => handleError(err, res));
}

function setDataToStore (req, res, key) {
  if (!req.body) throw new Error('No value provided to store');
  console.log('updated');
  console.log(req.body);
  const entity = {
    key: key,
    data: [{
      name: "githubResponse",
      value: JSON.stringify(req.body),
      excludeFromIndexes: true
      }]
  };

  return datastore.save(entity)
    .then(() => res.status(200).send(`Entity ${key.path.join('/')} saved.`))
    .catch((err) => handleError(err, res));
}

function handleError(err, res) {
  console.error(err);
  res.status(500).send(err);
  return Promise.reject(err);
}

exports.javascript = function javascript (req, res) {
  const key = datastore.key(["Issues", "Javascript"]);
  if (req.method == 'GET') return sendDataFromStore(key, res);
  if (req.method == 'POST') return setDataToStore(req, res, key);
  res.status(500).send({ error: "You can GET or POST, that's it!" });
};
