
var Base = require('../base-public.js');
var path = require('path');

module.exports = Base.extend({
    createFiles: function () {

        this.setFile(this.file.dirParts.slice(1));
        this.filterName = this.file.nameLowCamel;

        this.setFile(this.file.dirParts, '-directive');

        var file = path.join(this.module.dir, '_directives', this.file.name);
        var filePath = path.join(this.srcDir, file);

        // JS
        this.fs.copyTpl(
            this.templatePath('directive-tpl.js'),
            this.destinationPath(filePath+'.js'),
            this
        );

        this.moduleAppendFile(file+'.js');
    }
});
