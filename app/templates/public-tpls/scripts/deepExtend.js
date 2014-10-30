'use strict';
angular.deepExtend = function (dst) {
    angular.forEach(arguments, function(obj) {
        if (obj !== dst) {
            angular.forEach(obj, function(value, key) {
                if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
                    angular.deepExtend(dst[key], value);
                } else {
                    dst[key] = angular.copy(value);
                }
            });
        }
    });
    return dst;
};