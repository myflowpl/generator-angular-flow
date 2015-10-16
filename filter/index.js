'use strict';
var Base = require('../base-public.js');
var path = require('path');


module.exports = Base.extend({
    createFiles: function () {

        this.setFile(this.file.dirParts.slice(1));
        this.filterName = this.file.nameLowCamel;

        this.setFile(this.file.dirParts, '-filter');

        var file = path.join(this.module.dir, '_filters',  this.file.dir, this.file.name);
        var filePath = path.join(this.modulesDir, file);

        // JS
        this.fs.copyTpl(
            this.templatePath('filter-tpl.js'),
            this.destinationPath(filePath+'.js'),
            this
        );

        this.moduleAppendFile(file+'.js');
    }
});
