'use strict';
var af = require('generator-angular-flow');
var Base = require('generator-angular-flow/base');

module.exports = Base.extend({
    createComponentFiles: function() {

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

        // HTML
        this.fs.copyTpl(
            this.templatePath('component-tpl.html'),
            this.destinationPath(htmlFile),
            this
        );

        // SASS
        this.fs.copyTpl(
            this.templatePath('component-tpl.scss'),
            this.destinationPath(scssFile),
            this
        );

        this.link();
    }
});