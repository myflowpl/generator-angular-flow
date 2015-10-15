'use strict';
var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');
var _ = require('underscore.string');
var inflection = require('inflection');
var fs = require('fs');
var af = require('./_angular-flow/af');
var path = require('path');
//console.log('af', af.getModules);
module.exports = generators.Base.extend({

    publicDir: './', // public dir of the frontend app parts
    modulesDir: './modules', // public dir of the frontend app parts
    module: {
        name: '', // angular module name
        dir: '', // module directory name
        path: '', // full path to module dir
    },
    file: {
        name: '', // dasshed name of the file, includes module name and all path
        label: '', // label is human redable title version of name
        nameLowCamel: '', // camelcase with firs lower letter, ideal for dirctive name
        nameCamel: '', // camecase of the name, ideal for controller or js clsass name
        parts:[]
    },

    constructor: function (args, options) {

        generators.Base.apply(this, arguments);

        // config props
        this.publicDir = this.config.get('publicDir') || this.publicDir;
        this.modulesDir = path.join(this.publicDir, 'modules');

        // module name is required
        this.argument('name', { type: String, required: true });

        // set module and file properties based on user input
        var parts = this.name.split('/');
        this.setModule(parts[0]);
        this.setFile(parts);

        // test if module exists
        if(!fs.existsSync(this.module.path)) {
            //throw new Error('Module "'+this.module.dir+'" does not exist');
        }
        console.log('MODULE', this.module);
        console.log('FILE', this.file);return;

        // set destination for this module
        //if(this.updateDocumentRoot) {
        //    this.destinationRoot(path.join(this.destinationRoot(), this.baseDir, this.dirName));
        //}

    },

    /**
     * sets this
     *
     * @param name
     */
    setModule: function (name) {
        var dir = this._.slugify(this._.humanize(name));
        var name = this._.camelize(dir, true);
        var nameCamel = this._.classify(dir);
        var label = this._.humanize(dir);

        this.module = {
            name: name,
            dir: dir,
            paht: path.join(this.publicDir,dir),
            label: label,
            nameCamel: nameCamel
        }
    },

    setFile: function(parts) {

        this.file = this.normalizeName(this.name.replace(/\//g, '-'));
        this.file.dirParts = parts.map(function(n){
            return this._.slugify(this._.humanize(n));
        }.bind(this));
        this.file.dir = this.file.dirParts.join('/');
    },

    /**
     * converts user input string to normalized file/module names
     *
     * @param name
     */
    normalizeName: function (str) {
        var dir = this._.slugify(this._.humanize(str));
        var label = this._.humanize(dir);
        var nameCamel = this._.classify(dir);
        var nameLowCamel = this._.camelize(dir, true);
        return {
            name: dir,
            label: label,
            nameLowCamel: nameLowCamel,
            nameCamel: nameCamel
        }
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


