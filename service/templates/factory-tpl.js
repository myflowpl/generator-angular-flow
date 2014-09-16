'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= cameledName %>Srv', function () {

        var _privateVar = 42;

        var _getMeaningOfLife = function () {
            return _privateVar;
        };

        return {
            getMeaningOfLife: _getMeaningOfLife
        };
    });
