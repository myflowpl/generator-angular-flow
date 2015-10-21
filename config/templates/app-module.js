/**
 * Main module
 */

// vendors css
require('bootstrap/dist/css/bootstrap.css');
require('angular-busy2/angular-busy.css');

// app global css
require('./_styles/global.scss');

require('./debug.js');
require('angular');

angular.module('app',[
    require('angular-modals'),
    require('angular-busy2'),
    require('angular-ui-router'),
    require('angular-ui-bootstrap'),
]);

module.exports = 'app';

require('./config.js');
require('./_services/api-srv.js');
require('./_directives/confirm-message-directive.js');
require('./_states/app-state.js');
require('./_states/error/app-error-state.js');
require('./_states/index/app-index-state.js');
