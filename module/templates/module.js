'use strict';

angular.module('<%= name %>', [<%= angularModulesString %>])
.constant('<%= moduleBasePathFactoryName %>', function(path){
    return '<%= basePath %><%= dirName %>/' + path||'';
});
