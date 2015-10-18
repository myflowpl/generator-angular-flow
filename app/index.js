'use strict';
var path = require('path');
var Base = require('../base-public');
var yeoman = require('yeoman-generator');
var _ = require('lodash');


module.exports = Base.extend({
    constructor: function (args, options) {
        yeoman.Base.apply(this, arguments);

    },

    defaults: {
        publicDir: 'public',
        srcDir: 'src',
        distDir: 'dist',
        configModule: 'app',
        defaultModule: 'app'
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
            af.getModules().forEach(function(m){
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
            this.log('Welcome to angular-flow Yeoman generator!!!');
            this.log('AngularJs+Webpack boilerplate for large application.');
            this.log('____________________________________________________________________________');
            this.log('');
            this.log('Project not found');

            this.prompt({
                type: 'list',
                name: 'start',
                message: 'Do you want to create new one ?',
                default: 1,
                choices: [
                    {value: 0, name: 'no'},
                    {value: 1, name: 'yes'},
                    {value: 2, name: 'yes (advanced users)'},
                ]
            }, function (answers) {
                if(answers.start === 1) {
                    this._createApp(this.defaults);
                } else if (answers.start === 2) {
                    this._advancedQuestions();
                }
            }.bind(this));
        }
    },

    /**
     * init new app
     */
    _advancedQuestions: function () {

        this.prompt([
            {
                type: 'input',
                name: 'publicDir',
                message: 'base directory for your front-end code',
                default: this.defaults.publicDir
            },
            {
                type: 'input',
                name: 'srcDir',
                message: 'source directory, for all your source code',
                default: this.defaults.srcDir
            },
            {
                type: 'input',
                name: 'distDir',
                message: 'distribution directory, for all your builds',
                default: this.defaults.distDir
            },
            {
                type: 'input',
                name: 'configModule',
                message: 'configuration module name',
                default: this.defaults.configModule
            },
            {
                type: 'input',
                name: 'defaultModule',
                message: 'configuration module name',
                default: this.defaults.defaultModule
            },

        ], this._createApp.bind(this));
    },

    /**
     * now all data are ready so create all required files
     */
    _createApp: function (answers) {

        this.config.set(answers);
        //this.config.save();

        this.fs.copyTpl(
            this.templatePath('root'),
            this.destinationPath(),
            this
        );
        this.fs.copy(
            this.templatePath('public'),
            this.destinationPath('public'),
            this
        );
        this.fs.copyTpl(this.templatePath('root/.gitignore'),this.destinationPath('.gitignore'),this);
        this.fs.copyTpl(this.templatePath('root/.jshintrc'),this.destinationPath('.jshintrc'),this);
        this.fs.copyTpl(this.templatePath('root/.editorconfig'),this.destinationPath('.editorconfig'),this);
        this.fs.copyTpl(this.templatePath('root/.gitattributes'),this.destinationPath('.gitattributes'),this);

        //this.spawnCommand('sudo', ['npm', 'install', 'underscore'], {'saveDev':true});
    }
});
