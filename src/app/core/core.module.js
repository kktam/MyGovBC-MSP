'use strict';

const shared = angular.module('core.shared', []);

require('./directives/validation-test/validation-test.directive')(shared);

require('./services/constants')(shared);
require('./services/socket.factory')(shared);
require('./services/profile.factory')(shared);
require('./services/resolver.provider')(shared);
require('./services/lb-services');

export default shared;