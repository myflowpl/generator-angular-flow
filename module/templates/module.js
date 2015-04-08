'use strict';

angular.module('<%= name %>', [<%= moduleModulesString %>])
.constant('<%= moduleBasePathFactoryName %>', function(path){
    return '<%= basePath %><%= dirName %>/' + path||'';
});
