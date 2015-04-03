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

        var fileArg = this.name;

        var parts = this.name.split('/');

        var mp = this.normalizeName(parts[0]);

        var m = this.getModule(mp.name);

        if(!m) {
            this.error('module "'+mp.dirName+'" not found');
        }
        this._extend(m);

        // set destination for this module
        this.destinationRoot(this.destinationRoot()+'/'+this.dirName)

        this.fileParts = parts.map(function(n){
            return this.normalizeName(n);
        }.bind(this));
        this.file = this.normalizeName(fileArg.replace(/\//g, '-'));
        this.fileDirParts = this.fileParts.map(function(part){
            return part.dirName
        });

        // module base path factory
        this.moduleBasePathFactoryName = this.name+'BasePath';

        //console.log(this.file);
        //console.log(this.fileParts);



    },

    /**
     * converts user input string to normalized file/module names
     *
     * @param name
     */
    normalizeName: function (str) {
        var dirName = this._.slugify(this._.humanize(str));
        var name = this._.camelize(dirName, true);
        var camelName = this._.classify(dirName);
        var humanName = this._.humanize(dirName);
        return {
            name: name,
            dirName: dirName,
            humanName: humanName,
            camelName: camelName
        }
    },

    /**
     * extend this object with given object props
     *
     * @param obj
     * @private
     */
    _extend: function (obj) {
        util._extend(this, obj);
    },
    /**
     * display error message
     *
     * @param msg
     */
    error: function (msg) {
        this.log('____________________________________________________________________________');
        this.log('');
        this.log('ERROR !!!');
        this.log('');
        this.log(msg);
        this.log('____________________________________________________________________________');
        this.log('');
        throw new String(msg);
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
        return this.getModules().filter(function(m){
            return (m.name == moduleName);
        })[0];
    }
});


