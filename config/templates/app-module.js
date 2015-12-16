/**
 * Main module
 */

require('angular');

angular.module('app',[
    'ngAnimate',
    'ngSanitize',
    'angularModals',
    'cgBusy',
    'angular-loading-bar',
    'ui.bootstrap',
    'ui.router'
]);

module.exports = 'app';

require('./config.js');
require('./services/api-srv.js');
require('./_states/app/app-state.js');
require('./_states/error/error-state.js');
require('./_states/index/index-state.js');
