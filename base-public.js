
var path = require('path');
var generators = require('yeoman-generator');
var _ = require('underscore.string');
var fs = require('fs');

module.exports = generators.Base.extend({

    publicDir: './', // public dir of the frontend app parts
    modulesDir: './modules', // public dir of the frontend app parts
    module: {
        name: '', // angular module name
        nameCamel: '', // camelcse version of name, ideal for js class name
        label: '', // module human name
        dir: '', // module directory name
        path: '', // full path to module dir
    },
    file: {
        name: '', // dasshed name of the file, includes module name and all path
        label: '', // label is human redable title version of name
        nameLowCamel: '', // camelcase with firs lower letter, ideal for dirctive name
        nameCamel: '', // camecase of the name, ideal for controller or js clsass name
        dir: '',
        dirParts: ''
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

        console.log("MODULE\n", this.module);
        console.log("FILE\n", this.file);

        // test if module exists
        var moduleFile = this.module.path
        if((this.options.namespace === 'angular-flow:module') && fs.existsSync(moduleFile)) {
            throw new Error('Module "'+this.module.dir+'" already exist, can\'t overwrite it');
        }
        if((this.options.namespace !== 'angular-flow:module') && !fs.existsSync(moduleFile)) {
            throw new Error('Module "'+this.module.dir+'" does not exist, create id first with angular-flow:module [name] command' );
        }


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
            path: path.join(this.modulesDir,dir),
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
     * return list of created modules names
     *
     * @returns []
     */
    getModules: function() {
        if(!this.modules) {
            var baseDir = this.modulesDir;
            this.modules = fs.readdirSync(baseDir).filter(function(file) {
                if(fs.statSync(path.join(baseDir, file)).isDirectory()) {
                    return true;
                } else {
                    return false;
                }
            });
        }
        return this.modules;
    },

    /**
     * get component config
     * all | by name | by array of names
     *
     * @param name
     * @returns {*}
     */
    getComponents: function(name){

        if(this.bower_components === null) {
            this.bower_components = [];
            if(fs.existsSync('bower-components.json')) {
                this.bower_components = JSON.parse(fs.readFileSync('bower-components.json'));
            }

            this.bower_components = this.bower_components.concat(JSON.parse(fs.readFileSync(__dirname+'/bower-components.json')));
        }
        // return list if no name given
        if(arguments.length === 0) {
            return this.bower_components;
        }

        // if array, its array of names, so convert it to array of configs
        if(_.isArray(name)) {
            var bower_components = this.bower_components;
            return name.map(function(component_name){
                var c = _.find(bower_components, 'name', component_name);
                if(!c) {
                    throw new Error('bower component "'+component_name+'" not found!!!')
                }
                return c;
            })
        }

        // else its string, so return it's config
        if(!name) {
            throw new Error('bower component name is empty!!!')
        }
        var c = _.find(this.bower_components, 'name', name);
        if(!c) {
            throw new Error('bower component '+name+' not found!!!')
        }
        return c;

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
     * creates require() with provided file inside of main module file
     * file has to have module directory as it's first part of the url
     *
     * @param file
     */
    moduleAppendFile: function(file) {
        var moduleFile =  path.join(this.modulesDir, this.module.dir, this.module.dir)+'-module.js';
        var parts = file.split('/').splice(1);
        var str = "require('./"+parts.join('/')+"');";

        var data = fs.readFileSync(moduleFile);
        if(data.indexOf(str) < 0){
            fs.appendFileSync(moduleFile, "\n"+str);
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


