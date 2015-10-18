/**
 * Main module
 */
require('bootstrap/dist/css/bootstrap.css');
require('./_styles/global.scss');

require('./debug.js');
require('angular');

angular.module('app',[
    require('angular-modals'),
    require('angular-ui-router'),
    require('angular-ui-bootstrap'),
]);

module.exports = 'app';

require('./config');