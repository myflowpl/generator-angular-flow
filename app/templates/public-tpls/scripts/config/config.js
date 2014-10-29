'use strict';

angular.module('<%= scriptAppName %>')
    .service('config', function(){
        var config = angular.deepExtend({
            viewsDir: 'views/',
            componentsDir: 'components/',
            statesDir: 'states/',
            environment: 'production', //development or production
            api: {
                protocol: window.location.protocol.split(':')[0], //Use the same protocol, host and port as the UI is hosted from bu default
                host: window.location.hostname,
                port: String(window.location.port || 80),
                path: '/api'
            }
        }, angular._localConfig || {});
        angular.extend(config, window.__config||{user:{id:null}});
        return config;
    })
    .value('cgBusyDefaults',{
        message:'Loading...',
        backdrop: true,
        templateUrl: '/views/angular-busy/default-spinner.html',
        delay: 0,
        minDuration: 500
    })
    .factory('baseUrl', function (config) {
        return (config.api.protocol + '://' + config.api.host + ':' + config.api.port + '/');
    })
    .factory('apiBaseUrl', function (config) {
        return (config.api.protocol + '://' + config.api.host + ':' + config.api.port + config.api.path + '/');
    });
