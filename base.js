'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');
var inflection = require('inflection');
var fs = require('fs');
var af = require('./_angular-flow/af');
var path = require('path');
//console.log('af', af.getModules);
module.exports = yeoman.Base.extend({
    updateDocumentRoot: true,
    constructor: function (args, options) {
        yeoman.Base.apply(this, arguments);

        this._extend(this.config.getAll());

        // module name is required
        this.argument('name', { type: String, required: true });

        var fileArg = this.name;

        var parts = this.name.split('/');

        var mp = this.normalizeName(parts[0]);

        var m = af.getModules(mp.name);

        if(!m) {
            this.error('module "'+mp.dirName+'" not found');
        }
        this._extend(m);

        // set destination for this module
        if(this.updateDocumentRoot) {
            this.destinationRoot(path.join(this.destinationRoot(), this.baseDir, this.dirName));
        }

        this.fileParts = parts.map(function(n){
            return this.normalizeName(n);
        }.bind(this));
        this.file = this.normalizeName(fileArg.replace(/\//g, '-'));
        this.fileDirParts = this.fileParts.map(function(part){
            return part.dirName
        });

        // module base path factory
        this.moduleBasePathFactoryName = this.name+'BasePath';

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
        var camelLowName = this._.camelize(dirName, true);
        var humanName = this._.humanize(dirName);
        return {
            name: name,
            dirName: dirName,
            humanName: humanName,
            camelLowName: camelLowName,
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
     * link assets
     */
    link: function () {
        this.spawnCommand('gulp', ['link']);
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
        throw new Error(msg);
    }
});


