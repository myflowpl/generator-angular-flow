'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');


module.exports = ScriptBase.extend({
    createFilterFiles: function () {

        var filePath = ['scripts', 'services'].concat(this.slugifiedPath).join('/');

        this.template(
            'service/templates/factory-tpl.js',
            path.join(this.appPath, filePath, this.dasherizedFullName + '-srv.js')
        );
        this.gruntLink();


        // pure state file name, used later for constructiin .js .html .scss file names
        this.templateFileName = this.fileDirParts.join('-');

        // state html template url
        this.templateUrl = [].concat(this.fileDirParts.slice(1), this.templateFileName+'.html').join('/');

        // css class name
        this.cssClassName = this.templateFileName+'-component';

        // controller name
        this.controllerName = this.file.camelName+'ComponentController';

        // controller name
        this.directiveName = this.file.camelLowName;

        /**
         * render templates
         */
        var jsFile = [].concat(this.fileDirParts.slice(1), this.templateFileName+'.js').join('/');
        var htmlFile = [].concat(this.fileDirParts.slice(1), this.templateFileName+'.html').join('/');
        var scssFile = [].concat(this.fileDirParts.slice(1), '_'+this.templateFileName+'.scss').join('/');

        // JS
        this.fs.copyTpl(
            this.templatePath('component-tpl.js'),
            this.destinationPath(jsFile),
            this
        );

        this.link();
    }
});
