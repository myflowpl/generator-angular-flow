
var path = require('path');
var generators = require('yeoman-generator');
var _ = require('underscore.string');
var fs = require('fs');

module.exports = generators.Base.extend({

    publicDir: './', // public dir of the frontend app parts
    srcDir: './src', // soruce dir, contains all ng modules created by generator
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

    moduleRequired: true, // is name argument required
    nameRequired: true, // is name argument required
    nameDescription: 'in most cases it\'s file name you want to generate', // give the halp description of the name argument

    nameSuffix: '',  // suffix for name attribute

    fileSuffix: '', // suffix for name file
    fileSubDir: '', // suffix for name file
    /**
     * remove one last level of dir for the file,
     * example: when set to true
     * user/login/form
     * will be
     *     user/login/user-login-form.js
     * otherwise
     *     user/login/form/user-login-form.js
     */
    fileSliceDir: true,

    /**
     * prepare basic stuff for sub generators
     *
     * @param args
     * @param options
     */
    constructor: function (args, options) {

        generators.Base.apply(this, arguments);
        if(!this.config.get('publicDir')) {
            this.error("you have to init your app with yo angular-flow command, or make sure you run commands at root level of your project");
        }

        // config props
        this.publicDir = this.config.get('publicDir') || this.publicDir;
        this.srcDir = path.join(this.publicDir, this.config.get('srcDir'));

        // module name is required
        this.argument('moduleName', { type: String, required: false });

        // subGenerator name is optional, depends on this.requiredName prop, witch you can be overwrite
        this.argument('fileName', { type: String, required: false });

        if(!this.moduleName) {
            this.log.error('Module name is required, try:    yo:'+this.options.namespace+' [moduleName]');
            this.log('available modules: ', this.getModules());
            this.exit();
        }
        if(this.nameRequired && !this.fileName) {
            this.log.error('Name is required, try:            yo:'+this.options.namespace+' [moduleName] [fileName]');
            this.log(this.nameDescription);
            this.exit();
        }

        // set module and file properties based on user input
        this.setModule(this.moduleName);
        this.setName(this.fileName, this.nameSuffix);
        this.setFile(this.fileName, this.fileSuffix);

        // console.log("MODULE\n", this.module);
        // console.log("NAME\n", this.name);
        // console.log("FILE\n", this.file);

        // test if module exists
        var moduleFile = this.module.path;
        // if we createin new module, tyr if it already exists
        if((this.options.namespace === 'angular-flow:module') && fs.existsSync(moduleFile)) {
            this.error('Module "'+this.module.dir+'" already exist, can\'t overwrite it');
        }
        // if you create somethink for the module, test if it exists
        if((this.options.namespace !== 'angular-flow:module') && !fs.existsSync(moduleFile)) {
            this.error('Module "'+this.module.dir+'" does not exist, create it first with angular-flow:module [moduleName]' );
        }
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
            path: path.join(this.srcDir,dir).replace(/\\/g, '/'),
            label: label,
            nameCamel: nameCamel
        }
    },

    setFile: function(name, sufix) {
        name = name||'';
        sufix = sufix||'';
        this.file = this.normalizeName(name.replace(/\//g, '-')+sufix);
        console.log('FILE', this.file)
        this.file.dirParts = name.split('/').map(function(n){
            return this._.slugify(this._.humanize(n));
        }.bind(this));
        this.file.dir = this.file.dirParts.join('/');
    },

    setName: function(name, sufix) {
        name = name||'';
        sufix = sufix||'';
        this.name = this.normalizeName(name.replace(/\//g, '-')+sufix);
        this.name.dirParts = name.split('/').map(function(n){
            return this._.slugify(this._.humanize(n));
        }.bind(this));
        this.name.dir = this.name.dirParts.join('/');
    },

    /**
     * return list of created modules names
     *
     * @returns []
     */
    getModules: function() {
        if(!this.modules) {
            var baseDir = './public/src';//todo get this from config
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
     * converts user input string to normalized file/module names
     *
     * @param name
     */
    normalizeName: function (str) {
        var dir = this._.slugify(this._.humanize(str));
        var name = dir;
        if(str.substr(-6)=='-modal') {
            name = str.substr(0, str.length-6)+'.modal'
        }
        if(str.substr(-8)==='-service') {
            name = str.substr(0, str.length-8)+'.service'
        }
        var label = this._.humanize(dir);
        var nameCamel = this._.classify(dir);
        var nameLowCamel = this._.camelize(dir, true);
        if(dir.substr(-10)==='-component') {
            name = str.substr(0, str.length-10)+'.component'
            label = this._.humanize(dir);
            nameCamel = this._.classify(dir);
            nameLowCamel = this._.camelize(dir, true);
            dir = str.substr(0, str.length-10)
        }
        return {
            dir: dir,
            name: name,
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
        var moduleFile =  path.join(this.srcDir, this.module.dir, this.module.dir)+'-module.js';
        var file = file.replace(/\\/g, '/');// no matter win or unix we use unix style
        var str = "require('./"+file+"');";

        var data = fs.readFileSync(moduleFile);
        if(data.indexOf(str) < 0){
            fs.appendFileSync(moduleFile, "\n"+str);
            this.log.info(str, 'appended to', moduleFile);
        } else {
            this.log.info(str, 'already exists in', moduleFile);
        }
    },

    /**
     *
     * @param templateFile template file from subgen template folders
     * @param ext file extenasion (with dot included), to append to dest file
     * @param appendToModule, append the file to module
     */
    copyFileTemplate: function (templateFile, ext, appendToModule) {

        var filePath = this.file.dirParts.join('/');
        if(this.fileSliceDir) {
            filePath = this.file.dirParts.slice(0,-1).join('/');
        }
        var file = path.join(this.fileSubDir,filePath, this.file.name);
        var filePath = path.join(this.srcDir, this.module.dir, file);

        this.fs.copyTpl(
            this.templatePath(templateFile),
            this.destinationPath(filePath+ext),
            this
        );
        if(appendToModule) {
            this.moduleAppendFile(file);
        }
    },

    /**
     * display error message
     *
     * @param msg
     */
    error: function (msg, err) {
        if(arguments.length==1) err = '';
        this.log.error(msg, err);
        this.log('');
        this.exit();
    },

    /**
     * exits process
     *
     * @param msg
     */
    exit: function () {
        process.exit(1);
    }


    /**
     * get component config
     * all | by name | by array of names
     *
     * @param name
     * @returns {*}
     */
    //getComponents: function(name){
    //
    //    if(this.bower_components === null) {
    //        this.bower_components = [];
    //        if(fs.existsSync('bower-components.json')) {
    //            this.bower_components = JSON.parse(fs.readFileSync('bower-components.json'));
    //        }
    //
    //        this.bower_components = this.bower_components.concat(JSON.parse(fs.readFileSync(__dirname+'/bower-components.json')));
    //    }
    //    // return list if no name given
    //    if(arguments.length === 0) {
    //        return this.bower_components;
    //    }
    //
    //    // if array, its array of names, so convert it to array of configs
    //    if(_.isArray(name)) {
    //        var bower_components = this.bower_components;
    //        return name.map(function(component_name){
    //            var c = _.find(bower_components, 'name', component_name);
    //            if(!c) {
    //                this.error('bower component "'+component_name+'" not found!!!')
    //            }
    //            return c;
    //        })
    //    }
    //
    //    // else its string, so return it's config
    //    if(!name) {
    //        this.error('bower component name is empty!!!')
    //    }
    //    var c = _.find(this.bower_components, 'name', name);
    //    if(!c) {
    //        this.error('bower component '+name+' not found!!!')
    //    }
    //    return c;
    //
    //},

});


