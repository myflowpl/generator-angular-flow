'use strict';

angular.module('<%= scriptAppName %>')
    /**
     * this state is special and it has to be included as the last one in order to handle unknow routes (code 404)
     * therefore we moved the route configuration to /scripts/error-state-route.js
     */
    .controller('errorState', function ($scope) {

    });
