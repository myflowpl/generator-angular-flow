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
        var dirParts = this.file.dirParts.slice(1).slice(0, -1);
        this.parent = {
            name: this.file.dirParts.join('.'),
            url: '/'+this.file.dirParts.slice(this.file.dirParts.length-1),
            dirParts: dirParts,
            dir: dirParts.join('/'),
            file: {
                name: this.file.dirParts.slice(0, -1).join('-')+'-state'
            }
        };
        console.log('paretn', this.parent);
        console.log('state', this.state);
        console.log('file', this.file);

        this.parentStr = '';
        if(!this.state.dir) {
            this.parentStr = "\n            parent: 'app',"
        }

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
        if(!this.state.dir) {
            // append to main app module
            var parentFile = path.join(this.srcDir, 'app', '_states',  'app-state.html');
        } else {
            // append to paret state
            var parentFile = path.join(this.srcDir, this.module.dir, '_states',  this.parent.dir, this.parent.file.name)+'.html';
        }
        console.log('parent file', parentFile);
        this._menuAppend(parentFile, this.state.name);
    },
    _menuAppend: function(file, stateName) {
        var str = '<li role="presentation" ui-sref-active="active"><a ui-sref="'+stateName+'">'+stateName+'</a></li><!--menu-item-->';
        var that = this;
        fs.readFile(file, function (err, data) {
            if (err) {
                that.log('error with appending new menu item to parent, fine not found:');
                that.log(file);
                return;
            };
            data = (data+'').
                replace('<!--menu-item-->', "\n                "+str);
            fs.writeFileSync(file, data);
            that.log('new menu item was added to paret state:')
            that.log(file);
        });

    }
});