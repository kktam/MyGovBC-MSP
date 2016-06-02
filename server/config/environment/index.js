'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'temp-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  headerFooterSvcUrl: 'https://layout.api.dev.cos.citz.gov.bc.ca/v1/theme1/',
};

// Export the config object based on the NODE_ENV
// ==============================================
let local = {}
try {
  local = require('./local.js')
}
catch (e) {
}

let localShared = {}
try {
  localShared = require('./local.shared.js')
}
catch (e) {
}

module.exports = _.merge(
  all,
  require('./shared'),
  localShared,
  require('./' + process.env.NODE_ENV + '.js') || {},
  local);