'use strict';
var Base = require('../base-public');
var path = require('path');

module.exports = Base.extend({
    createFiles: function() {

        var file = path.join(this.srcDir, this.file.dir, this.module.dir);

        // JS
        this.fs.copyTpl(
            this.templatePath('module-tpl.js'),
            this.destinationPath(file+'-module.js'),
            this
        );

    }
});