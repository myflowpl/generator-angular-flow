'use strict';

var path = require('path');
var Base = require('../base-public');

module.exports = Base.extend({
    createModalFiles: function() {

        this.modalName = this.file.name;
        this.file.name = this.file.name+'-modal';
        this.file.dir = this.file.dir+'-modal';

        var file = path.join(this.srcDir, this.file.dir, this.file.name);

        // JS
        this.fs.copyTpl(
            this.templatePath('modal-tpl.js'),
            this.destinationPath(file+'.js'),
            this
        );

        // HTML
        this.fs.copyTpl(
            this.templatePath('modal-tpl.html'),
            this.destinationPath(file+'.html'),
            this
        );

        // SASS
        this.fs.copyTpl(
            this.templatePath('modal-tpl.scss'),
            this.destinationPath(file+'.scss'),
            this
        );

        this.moduleAppendFile(path.join(this.file.dir, this.file.name)+'.js');


    }
});