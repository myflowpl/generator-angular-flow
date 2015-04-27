'use strict';
var Base = require('../base');
var af = require('../_angular-flow/af');
var pr = console.log.bind(console);

module.exports = Base.extend({
    createStateFiles: function() {
        this.log('state for', this.aliasName, this.file.name);
        // module directory parts

        // pure state file name, used later for constructiin .js .html .scss file names
        this.templateFileName = this.fileDirParts.join('-')+'-state';

        // state html template url
        this.templateUrl = [this.fileDirParts[0], '_states'].concat(this.fileDirParts.slice(1), this.templateFileName+'.html').join('/');

        // css class name
        this.cssClassName = this.templateFileName;

        // controller name
        this.controllerName = this.file.camelName+'StateController';

        // state name
        this.stateName = this.fileDirParts.join('.'); //this.file.dirName.replace(/-/g, '.');

        // state url
        this.stateUrl = '/'+this.fileDirParts.slice(this.fileDirParts.length-1);

        //pr('tpl url', this.templateUrl)
        //pr('file name', this.templateFileName);

        /**
         * render templates
         */
        var jsFile = ['_states'].concat(this.fileDirParts.slice(1), this.templateFileName+'.js').join('/');
        var htmlFile = ['_states'].concat(this.fileDirParts.slice(1), this.templateFileName+'.html').join('/');
        var scssFile = ['_states'].concat(this.fileDirParts.slice(1), '_'+this.templateFileName+'.scss').join('/');

        // JS
        this.fs.copyTpl(
            this.templatePath('state-tpl.js'),
            this.destinationPath(jsFile),
            this
        );

        // HTML
        this.fs.copyTpl(
            this.templatePath('state-tpl.html'),
            this.destinationPath(htmlFile),
            this
        );

        // SASS
        this.fs.copyTpl(
            this.templatePath('state-tpl.scss'),
            this.destinationPath(scssFile),
            this
        );

        // link assets
        this.link();
    }
});