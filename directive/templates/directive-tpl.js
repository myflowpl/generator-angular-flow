/**
 * @ngdoc directive
 * @name <%= filterName %>
 * @restrict A
 * @description
 *
 */
angular.module('<%= module.name %>')

    .directive('<%= filterName %>', function () {
        return {
            restrict: 'A',
            link: function link(scope, element, attrs) {

            }
        };
    });