'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('../util.js');
var _ = require('underscore.string');
var inflection = require('inflection');
var fs = require('fs');
var path = require('path');

module.exports = yeoman.Base.extend({
    constructor: function (args, options) {
        yeoman.Base.apply(this, arguments);

        // module name is required
        this.argument('name', { type: String, required: true });
        this.setName(this.name);
    },
    /**
     * set module name
     *
     * @param name
     */
    setName: function (name) {
        this.dirName = this._.slugify(this._.humanize(name));
        this.name = this._.camelize(this.dirName, true);
        this.humanName = this._.humanize(this.dirName);
    },

    modules: null,
    getModules: function () {
        if(!this.modules) {
            var baseDir = this.config.get('baseDir');
            this.modules = fs.readdirSync(baseDir).filter(function(file) {
                if(fs.statSync(path.join(baseDir, file)).isDirectory() && fs.existsSync(path.join(baseDir, file, file+'-module.json'))) {
                    return true;
                } else {
                    return false;
                }
            }).map(function(dirName){
                return JSON.parse(fs.readFileSync(path.join(baseDir, dirName, dirName+'-module.json')));
            });
        }
        return this.modules;
    },
    getBowerComponents: function () {
        return require('../_angular-flow/module-list.js')
    },
    getModule: function(moduleName) {
        return this.getModules().find(function(m){
            if(m.name == moduleName) {
                return m;
            }
        })
    }
});


