// Copyright IBM Corp. 2015,2019. All Rights Reserved.
// Node module: generator-loopback
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';
const Promise= require('bluebird');

module.exports = function(app, cb) {

  const AccessToken = app.models.AccessToken;
  const User = app.models.User;

  const email = 'admin@example.com'
  const password = 's3cr3t';
  const accessToken = 's3cr3t';

  return Promise.resolve()
  .then(() => User.findOne({where: { email } }))
  .then(res => (res ? res : User.create({email, password })))
  .then(user => AccessToken.upsert({id: accessToken, userId: user.id }))
  .then(token => console.log('Access Token', token.id))
  .asCallback(cb)
};
