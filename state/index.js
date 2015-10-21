'use strict';
var Base = require('../base-public');
var path = require('path');
var fs = require('fs');

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
        this.filePath = file;

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

        // require this state inside of module
        this.moduleAppendFile(path.join(this.module.dir, '_states',  this.state.dir, this.file.name)+'.js');


        // append this module to state
        this._menuAppend(path.join(this.srcDir, 'app', '_states',  'app-state.html'), this.state.name);
    },
    _menuAppend: function(file, stateName) {
        var str = '<li role="presentation" ui-sref-active="active"><a ui-sref="'+stateName+'">'+stateName+'</a></li><!--menu-item-->';

        fs.readFile(file, function (err, data) {
            if (err) throw err;
            console.log('filedata' ,data);
            data = (data+'').
                replace('<!--menu-item-->', "\n                "+str);
            fs.writeFileSync(file, data);
        });

    }
});