/**
 * <%=name.nameLowCamel%> filter
 */
angular.module('<%= module.name %>')
    .filter('<%= name.nameLowCamel %>', function () {
        return function (input) {
            return '<%= name.nameLowCamel %> filter: ' + input;
        };
    });
