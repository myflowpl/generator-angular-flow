'use strict';

angular.module('app')
    .constant('config', (function(){

        // create your config here
        return {

        };

    })())
    .config(function ($urlRouterProvider, config, $httpProvider, $locationProvider) {

        // you can put it in if statement or something
        $locationProvider.html5Mode(false);

        // 404 hanler
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise(function($injector, $location){

            $injector.invoke(function($state, $timeout){
                $state.go('app.error', {
                    location: false,
                    notify: false,
                    reload: false
                })
            })
        });

        // when you expect json response but you don't get one, convert it to error and reject promise
        $httpProvider.interceptors.push(function ($q) {
            return {
                response: function (response) {
                    if(response.config.responseType == 'json' || response.config.headers['Content-Type'] == "application/json;charset=utf-8" || response.headers()['content-type'] === "application/json; charset=utf-8"){
                        if(angular.isString(response.data)) {
                            // convert it to error object
                            response.status = 400;
                            response.statusText = 'Bad JSON Response';
                            response.data = {
                                detail: 'JSON parse error',
                                responseText: response.data,
                                status: 400
                            };
                            return $q.reject(response);
                        }
                    }
                    return response;
                }
            };
        });

    })
    .run(function($rootScope){

        /**
         * in case you need it
         */
        //$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        //    pr('state change start', toState.name, arguments);
        //})
        //$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        //    pr('state change success', toState.name, arguments);
        //})
        //$rootScope.$on('$stateNotFound', function(event, toState, toParams, fromState, fromParams){
        //    pr('state not found', toState.name, arguments);
        //})
        //
        //$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams){
        //    pr('state change error', arguments);
        //})
    });
