'use strict';

angular.module('app')
    //.constant('Config', angular.deepExtend({
    //    viewsDir: 'views/',
    //    componentsDir: 'components/',
    //    statesDir: 'states/',
    //    environment: 'production', //development or production
    //    API: {
    //        protocol: window.location.protocol.split(':')[0], //Use the same protocol, host and port as the UI is hosted from bu default
    //        host: window.location.hostname,
    //        port: String(window.location.port || 80),
    //        path: '/api'
    //    }
    //}, angular._localConfig || {}))
    //.value('cgBusyTemplateName', 'views/angular-busy/default-spinner.html')
    //.factory('BaseUrl', function (Config) {
    //    return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + '/');
    //})
    //.factory('APIBaseUrl', function (Config) {
    //    return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + Config.API.path + '/');
    //})
    .config(function ($urlRouterProvider, $httpProvider) {

        // obsluga errorow 404
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise(function($injector, $location){
            $injector.invoke(function($state, $timeout){
                //$timeout(function(){
                    $state.go('error', {
                        location: false,
                        notify: false,
                        reload: false
                    })
                //})

            })
        });

    })
    .run(function($rootScope){



        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            pr('state change start', toState.name, toParams);
        })
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            pr('state change success', toState.name);
        })
        $rootScope.$on('$stateNotFound', function(event, toState, toParams, fromState, fromParams){
            pr('state not found', toState.name);
        })

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams){
            pr('state change error', arguments);
        })
    });
