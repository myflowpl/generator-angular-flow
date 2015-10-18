'use strict';

angular.module('app')
    .factory('apiSrv', function ($http) {

        var basePath = '/api/';

        function success(response) {
            return response.data.data;
        }
        return {
            get: function(url, params, options){
                return $http.get(basePath+url, params, options).then(success);
            }
        };
    });
