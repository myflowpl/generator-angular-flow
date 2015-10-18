
var path = require('path');
var Base = require('../base-public');

module.exports = Base.extend({
    createFiles: function () {

        this.setFile(this.file.dirParts.slice(1), '-srv');

        var file = path.join(this.module.dir, '_services',  this.file.dir, this.file.name);
        var filePath = path.join(this.srcDir, file);

        // JS
        this.fs.copyTpl(
            this.templatePath('factory-tpl.js'),
            this.destinationPath(filePath+'.js'),
            this
        );

        this.moduleAppendFile(file+'.js');
    }
});
