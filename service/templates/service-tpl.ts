import * as angular from 'angular';
/**
 * <%=name.nameLowCamel%> service
 */
export class <%= name.nameCamel %> {

    static $inject = []
    constructor () {}

}
angular.module('<%= module.name %>').service('<%= name.nameCamel %>', <%= name.nameCamel %>);
