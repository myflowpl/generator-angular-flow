'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider) {
        $stateProvider.state('index', {
            url: '/',
            controller: 'indexState',
            templateUrl: '/states/index/index-state.html'
        });
    })
    .controller('indexState', function ($scope) {

    });
