/**
 * common bundle
 */

// vendors css
require('bootstrap/dist/css/bootstrap.css');
require('angular-busy2/angular-busy.css');

// app global css
require('./styles/global.scss');

// vendors js
require('./libs/debug.js');

require('angular');
require('angular-modals');
require('angular-busy2');
require('angular-ui-router');
require('angular-ui-bootstrap');

module.exports = 'common';