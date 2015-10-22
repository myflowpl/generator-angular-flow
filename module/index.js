'use strict';
var Base = require('../base-public');
var path = require('path');
var fs = require('fs');

module.exports = Base.extend({
    createFiles: function() {

        var file = path.join(this.srcDir, this.file.dir, this.module.dir);

        // JS
        this.fs.copyTpl(
            this.templatePath('module-tpl.js'),
            this.destinationPath(file+'-module.js'),
            this
        );

        var thisModuleFile = path.join(this.module.dir, this.module.dir+'-module.js');
        var moduleFile =  path.join(this.srcDir, 'app/app-module.js');

        var str = "require('../"+thisModuleFile+"'),";

        var that = this;
        fs.readFile(moduleFile, function (err, data) {
            if (err) {
                that.log('main module file not found:');
                that.log(moduleFile);
                return;
            };
            if(data.indexOf(str) >= 0){
                that.log('module already appended to app-module:');
                that.log(moduleFile);
                return;
            }
            data = (data+'').
                replace("angular.module('app',[", "angular.module('app',[\n    "+str);
            fs.writeFileSync(moduleFile, data);
            that.log('new module was created and added to app main module:')
            that.log(moduleFile);
        });
    }
});