'use strict';
var Base = require('../base-public');
var path = require('path');

module.exports = Base.extend({

    createFiles: function() {

        var dirParts = this.file.dirParts.slice(1);
        this.state = {
            name: this.file.dirParts.join('.'),
            url: '/'+this.file.dirParts.slice(this.file.dirParts.length-1),
            dirParts: dirParts,
            dir: dirParts.join('/'),
            file: {
                name: dirParts.join('-')+'-state'
            }
        };

        this.file.name = this.file.name+'-state';
        this.file.dir = this.file.dir+'-state';

        var file = path.join(this.srcDir, this.module.dir, '_states',  this.state.dir, this.file.name);

        // JS
        this.fs.copyTpl(
            this.templatePath('state-tpl.js'),
            this.destinationPath(file+'.js'),
            this
        );

        // HTML
        this.fs.copyTpl(
            this.templatePath('state-tpl.html'),
            this.destinationPath(file+'.html'),
            this
        );

        // SASS
        this.fs.copyTpl(
            this.templatePath('state-tpl.scss'),
            this.destinationPath(file+'.scss'),
            this
        );

        this.moduleAppendFile(path.join(this.module.dir, '_states',  this.state.dir, this.file.name)+'.js');
    }
});