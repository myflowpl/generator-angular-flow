/**
 * @ngdoc directive
 * @name <%= name.nameLowCamel %>
 * @restrict A
 * @description
 *
 */
angular.module('<%= module.name %>')

    .directive('<%= name.nameLowCamel %>', function () {
        return {
            restrict: 'A',
            link: function link(scope, element, attrs) {

            }
        };
    });