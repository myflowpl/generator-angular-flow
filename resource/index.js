
var path = require('path');
var Base = require('../base-public');

module.exports = Base.extend({
    createFiles: function () {

        this.setFile(this.file.dirParts.slice(1), '-res');

        var file = path.join(this.module.dir, '_resources',  this.file.dir, this.file.name);
        var filePath = path.join(this.modulesDir, file);

        // JS
        this.fs.copyTpl(
            this.templatePath('restmod.tpl'),
            this.destinationPath(filePath+'.js'),
            this
        );

        this.moduleAppendFile(file+'.js');
    }
});
