'use strict';

angular.module('config')
    .factory('$modals', function ($modal) {
        var modals = {};
        return {
            open: function(name, data){
                var config = angular.deepExtend(angular.copy(this.defaults), modals[name]()||{});
                config = angular.deepExtend(config, data||{});
                return $modal.open(config);
            },
            defaults: {
                templateUrl: '/modals/default-modal-tpl.html'
            },
            register: function(name, config) {
                modals[name] = config;
            }
        };
    });
