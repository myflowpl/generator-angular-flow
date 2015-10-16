
var path = require('path');
var Base = require('../base-public');

module.exports = Base.extend({
    createFiles: function () {

        this.setFile(this.file.dirParts.slice(1), '-srv');

        console.log('FILE', this.file);

        var file = path.join(this.modulesDir, this.module.dir, '_services',  this.file.dir, this.file.name);

        // JS
        this.fs.copyTpl(
            this.templatePath('factory-tpl.js'),
            this.destinationPath(file+'.js'),
            this
        );

        this.moduleAppendFile(path.join(this.module.dir, '_states',  this.file.dir, this.file.name)+'.js');
    }
});
