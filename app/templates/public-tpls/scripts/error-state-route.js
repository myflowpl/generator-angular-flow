'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider) {
        $stateProvider.state('error', {
            url: '^*path',
            controller: 'errorState',
            templateUrl: '/states/error/error-state.html'
        });
    });
