'use strict';

var path = require('path');
var Base = require('generator-angular-flow/base');
var af = require('generator-angular-flow');
var pr = console.log.bind(console);

module.exports = Base.extend({
    createModalFiles: function() {

        this.modalName = this.fileDirParts.join('-');

        // pure state file name, used later for constructiin .js .html .scss file names
        this.templateFileName = this.fileDirParts.join('-')+'-modal';

        // state html template url
        this.templateUrl = [].concat(this.fileDirParts, this.templateFileName+'.html').join('/');

        // css class name
        this.cssClassName = this.templateFileName;

        // controller name
        this.controllerName = this.file.camelName+'ModalController';

        // controller name
        this.directiveName = this.file.camelLowName;

        this.fileDirParts = this.fileDirParts.slice(0, -1).concat(this.fileDirParts.slice(-1)+'-modal');
        /**
         * render templates
         */
        var jsFile = [].concat(this.fileDirParts.slice(1), this.templateFileName+'.js').join('/');
        var htmlFile = [].concat(this.fileDirParts.slice(1), this.templateFileName+'.html').join('/');
        var scssFile = [].concat(this.fileDirParts.slice(1), '_'+this.templateFileName+'.scss').join('/');

        // JS
        this.fs.copyTpl(
            this.templatePath('modal-tpl.js'),
            this.destinationPath(jsFile),
            this
        );

        // HTML
        this.fs.copyTpl(
            this.templatePath('modal-tpl.html'),
            this.destinationPath(htmlFile),
            this
        );

        // SASS
        this.fs.copyTpl(
            this.templatePath('modal-tpl.scss'),
            this.destinationPath(scssFile),
            this
        );

        //this.link();


    }
});