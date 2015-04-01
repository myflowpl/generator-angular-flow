'use strict';
var path = require('path');
var util = require('util');
var base = require('../_angular-flow/base');
var yeoman = require('yeoman-generator');


module.exports = base.extend({
    constructor: function (args, options) {
        yeoman.Base.apply(this, arguments);

    },

    default: function(){
        var baseDir = this.config.get('baseDir');
        if(baseDir) {
            // info about existing app
            this.log('____________________________________________________________________________');
            this.log('');
            this.log('Welcome to "'+this.config.get('name')+'" application!');
            this.log('');
            this.log('CREATED MODULES:');
            this.getModules().forEach(function(m){
                this.log('-> '+ m.dirName);
            }.bind(this))
            this.log('');
            this.log('AVAILABLE COMMANDS:');
            this.log('-> yo angular-flow:module {moduleName}                    - creates module');
            this.log('-> yo angular-flow:component {moduleName} {componentName} - creates component for module');
            this.log('-> yo angular-flow:state {moduleName} {stateNamePath}     - creates state for module');
            this.log('____________________________________________________________________________');

        } else {
            // ask if you want to crate new app
            this.log('____________________________________________________________________________');
            this.log('');
            this.log('Welcome to generator-angular-flow!!!');
            this.log('AngularJs Yeoman generator for large application.');
            this.log('____________________________________________________________________________');
            this.log('');
            this.log('Project not found');

            this.prompt({
                type: 'confirm',
                name: 'start',
                message: 'Do you want to create new project',
                default: true
            }, function (answers) {
                if(answers.start) {
                    this._startNewApp();
                }
            }.bind(this));
        }
    },

    /**
     * init new app
     */
    _startNewApp: function () {

        this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'application name',
                default: this.appname // Default to current folder
            },
            {
                type: 'input',
                name: 'baseDir',
                message: 'base directory',
                default: './' // Default to current folder
            },
            {
                type: 'input',
                name: 'basePath',
                message: 'Your angular app module name',
                default: '/' // Default to current folder name
            }
        ], function (answers) {
            answers.name = this._.camelize(this._.slugify(this._.humanize(answers.name)));
            this.appname = answers.name;

            this.config.set(answers);
            this.config.save();
        }.bind(this));
    },

    /**
     * ask for extra modules you want to include in your app
     */
    _promptModules: function () {
        var done = this.async();
        var modules = require('./module-list.js');
        var choices = [];
        for (var m in modules) {
            choices.push({
                value: modules[m],
                name: modules[m].name+' ('+modules[m].version+')',
                checked: !!modules[m].checked
            });
        }
        var prompts = [
            {
                type: 'checkbox',
                name: 'modules',
                message: 'Which modules would you like to include?',
                choices: choices
            }
        ];

        this.prompt(prompts, function (props) {

            this.bowerComponents = '';
            var angMods = [
                "ngAnimate",
                "ajoslin.promise-tracker",
                "cgBusy",
                "chieffancypants.loadingBar",
                "ui.router",
                "ui.bootstrap"
            ];
            for (var m in props.modules) {
                if(props.modules[m].moduleName) {
                    angMods.push(props.modules[m].moduleName);
                }
                if(props.modules[m].bowerName) {
                    this.bowerComponents = this.bowerComponents+',\n        "'+props.modules[m].bowerName+'": "'+props.modules[m].version+'"';
                }
            }
            this.angularModules = "\n    '" + angMods.join("',\n    '") + "'\n";
            done();
        }.bind(this));
    },

    /**
     * now all data are ready so create all required files
     */
    _createAppFiles: function () {
        /**
         * copy root files and directories
         */
        this.directory('root-tpls', '.');

        /**
         * copy public files and directories
         */
        this.directory('public-tpls', this.appPath);

        /**
         * create single files witch can't be process in batch
         *
         * .gitignore
         * Gruntfile.js
         */
        //TODO if file already exist, add the content to it
        this.src.copy('gitignore', '.gitignore');
        this.src.copy('gruntfile-tpl.js', 'Gruntfile.js');
    }
});
