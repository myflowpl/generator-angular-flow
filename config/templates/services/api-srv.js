'use strict';

angular.module('app')
    .factory('apiSrv', function ($http, $q) {

        var basePath = '/api/';

        /**
         * success callback, return data, skip the request envelope
         */
        function success(response) {
            return response.data;
        }

        /**
         * error callback, make sure response.data is always object
         */
        function error(res){
            if(angular.isString(res.data)) {
                res.data = {detail: res.statusText+' ('+res.status+')', responseText: res.data};
            };
            return $q.reject(res);
        }

        return {
            get: function(url, params, options){
                return $http.get(basePath+url, params, options).then(success, error);
            },
            post: function(url, params, options){
                return $http.post(basePath+url, params, options).then(success, error);
            }
        };
    });
