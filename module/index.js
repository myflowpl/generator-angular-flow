'use strict';
var Base = require('../base-public');
var path = require('path');
var fs = require('fs');

module.exports = Base.extend({
    nameRequired: false, // is name argument required

    createFiles: function() {

        var file = path.join(this.srcDir, this.module.dir, this.module.dir);

        // JS
        this.fs.copyTpl(
            this.templatePath('module-tpl.js'),
            this.destinationPath(file+'-module.js'),
            this
        );

        var thisModuleFile = path.join(this.module.dir, this.module.dir+'-module.js').replace(/\\/g, '/');
        var moduleFile =  path.join(this.srcDir, 'app/app-module.js');

        var str = "require('../"+thisModuleFile+"'),";

        var that = this;
        fs.readFile(moduleFile, function (err, data) {
            if (err) {
                that.log.info('main module file not found:', moduleFile);
                return;
            };
            if(data.indexOf(str) >= 0){
                that.log.info('module already appended to app-module:', moduleFile);
                return;
            }
            //TODO this is very bad and quick solution, but works for now :D
            data = (data+''). replace("angular.module('app',[", "angular.module('app',[\n    "+str);
            fs.writeFileSync(moduleFile, data);
            that.log.ok('new module was created and added to app main module:', moduleFile)
        });
    }
});