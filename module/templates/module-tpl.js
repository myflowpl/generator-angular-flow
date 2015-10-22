/**
 * <%= module.name %> module
 */
require('angular');

angular.module('<%= module.name %>',[
     require('angular-ui-router'),
     require('angular-ui-bootstrap'),
     require('angular-modals')
]);

module.exports = '<%= module.name %>';

// require module components here
