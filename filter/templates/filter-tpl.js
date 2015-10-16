/**
 * <%=filterName%> filter
 */
angular.module('<%= module.name %>')
    .filter('<%= filterName %>', function () {
        return function (input) {
            return '<%= filterName %> filter: ' + input;
        };
    });
