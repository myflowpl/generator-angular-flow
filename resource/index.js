'use strict';

var path = require('path');
var Base = require('../base-public');
var af = require('../_angular-flow/af');
var pr = console.log.bind(console);

module.exports = Base.extend({
    createResourceFiles: function () {

        // pure state file name, used later for constructiin .js .html .scss file names
        this.templateFileName = this.fileDirParts.slice(1).join('-');

        // service name
        this.serviceName = this._.classify(this.fileDirParts.slice(1).concat('res').join('-'), false);

        // controller name
        this.resName = this.fileDirParts.slice(1).join('-');

        /**
         * render templates
         */
        var jsFile = [].concat('_resources', this.templateFileName+'-res.js').join('/');

        //// JS
        this.fs.copyTpl(
            this.templatePath('resource-tpl.js'),
            this.destinationPath(jsFile),
            this
        );

        this.link();
    }
});
