'use strict';
var Base = require('../base-public');
var path = require('path');

module.exports = Base.extend({
    createFiles: function() {

        var file = path.join(this.modulesDir, this.file.dir, this.file.name);

        // JS
        this.fs.copyTpl(
            this.templatePath('component-tpl.js'),
            this.destinationPath(file+'.js'),
            this
        );

        // HTML
        this.fs.copyTpl(
            this.templatePath('component-tpl.html'),
            this.destinationPath(file+'.html'),
            this
        );

        // SASS
        this.fs.copyTpl(
            this.templatePath('component-tpl.scss'),
            this.destinationPath(file+'.scss'),
            this
        );

    }
});