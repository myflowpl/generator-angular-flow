'use strict';
var Base = require('../base-public');
var path = require('path');
var fs = require('fs');

module.exports = Base.extend({
    fileSliceDir: false,
    fileSuffix: '-state',
    fileSubDir: '_states',
    setName: function(name, suffix){
        this.fileName = this.fileName.replace(/\./g, '/');
        Base.prototype.setName.call(this, this.fileName, suffix);
    },
    createFiles: function() {

        this.state = {
            name: this.file.dirParts.join('.'),
            url: '/'+this.file.dirParts.slice(-1),
        };

        this.parent = {
            name: this.name.dirParts.slice(0,-1).join('.'),
            dir: this.name.dirParts.slice(0, -1).join('/'),
            file: {
                name: this.file.dirParts.slice(0, -1).join('-')+this.fileSuffix
            }
        };

        this.parentStr = '';
        if(!this.parent.name) {
            this.parentStr = "\n            parent: 'app',"
        }

        this.filePath = path.join(this.srcDir, this.module.dir, '_states',  this.file.dir, this.file.name)+'.html';

        console.log("STATE\n",   this.state);
        console.log("PARENT\n", this.parent);
        console.log("PARENT STR\n", this.parentStr);
        console.log("FILE PATH\n", this.filePath);

        this.copyFileTemplate('state-tpl-js.tpl', '.js', true);
        this.copyFileTemplate('state-tpl.html', '.html', false);
        this.copyFileTemplate('state-tpl.scss', '.scss', false);

        this._menuAppend();
    },

    /**
     * insert link to this state in app state menu or to it's parent menu
     */
    _menuAppend: function() {

        if(!this.parent.name) {
            // append to main app module
            var file = path.join(this.srcDir, 'app', '_states', 'app',  'app-state.html');
        } else {
            // append to paret state
            var file = path.join(this.srcDir, this.module.dir, '_states',  this.parent.dir, this.parent.file.name)+'.html';
        }

        this.log.info('add', this.state.name, 'state as new menu item in', file)
        var str = '<li role="presentation" ui-sref-active="active"><a ui-sref="'+this.state.name+'">'+this.state.name+'</a></li><!--menu-item-->';
        var that = this;
        fs.readFile(file, function (err, data) {
            if (err) {
                return that.log.info('error, file not found:', file);
            };
            data = (data+'').
                replace('<!--menu-item-->', "\n                "+str);
            fs.writeFileSync(file, data);
            that.log.info('success, item menu added', that.state.name);
        });

    }
});