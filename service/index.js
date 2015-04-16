'use strict';

var path = require('path');
var Base = require('generator-angular-flow/base');
var af = require('generator-angular-flow');
var pr = console.log.bind(console);

module.exports = Base.extend({
    createFilterFiles: function () {

        // pure state file name, used later for constructiin .js .html .scss file names
        this.templateFileName = this.fileDirParts.slice(1).join('-');

        // controller name
        this.directiveName = this._.camelize(this.fileDirParts.slice(1).join('-'), true);

        /**
         * render templates
         */
        var jsFile = [].concat('_services', this.templateFileName+'-srv.js').join('/');

        //// JS
        this.fs.copyTpl(
            this.templatePath('factory-tpl.js'),
            this.destinationPath(jsFile),
            this
        );

        this.link();
    }
});
