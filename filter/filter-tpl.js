'use strict';

angular.module('<%= scriptAppName %>')
    .filter('<%= cameledFullName %>', function () {
        return function (input) {
            return '<%= cameledFullName %> filter: ' + input;
        };
    });
