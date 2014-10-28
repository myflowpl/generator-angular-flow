'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.when('', '/');
    });
