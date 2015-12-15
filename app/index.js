'use strict';
var path = require('path');
var Base = require('../base-public');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var fs = require('fs');


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
        if(this.config.get('publicDir')) {
            // info about existing app
            this.log('____________________________________________________________________________');
            this.log('');
            this.log('Welcome to angular-flow generated application!');
            this.log('');
            this.log('CREATED MODULES:');
            this.getModules().forEach(function(m){
                this.log('-> '+ m);
            }.bind(this))
            this.log('');
            this.log('AVAILABLE COMMANDS:');
            this.log('-> yo angular-flow:module {moduleName}                      ');
            this.log('-> yo angular-flow:component {moduleName/componentName}     ');
            this.log('-> yo angular-flow:state {moduleName/your-state/path/parts} ');
            this.log('____________________________________________________________________________');

        } else {
            // ask if you want to crate new app
            this.log('____________________________________________________________________________');
            this.log('');
            this.log('Welcome to angular-flow Yeoman generator!!!');
            this.log('AngularJs+Webpack boilerplate for large application.');
            this.log('____________________________________________________________________________');
            this.log('');

            this.prompt({
                type: 'list',
                name: 'start',
                message: 'Project not found, do you want to create one?',
                default: 1,
                choices: [
                    {value: 0, name: 'no'},
                    {value: 1, name: 'yes'},
                    //{value: 2, name: 'yes (advanced users)'}, //TODO in next version
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
        this.fs.copyTpl(this.templatePath('root-hidden/gitignore'),this.destinationPath('.gitignore'),this);
        this.fs.copyTpl(this.templatePath('root-hidden/jshintrc'),this.destinationPath('.jshintrc'),this);
        this.fs.copyTpl(this.templatePath('root-hidden/editorconfig'),this.destinationPath('.editorconfig'),this);
        this.fs.copyTpl(this.templatePath('root-hidden/gitattributes'),this.destinationPath('.gitattributes'),this);

        this.invoke('angular-flow:config');

        this.spawnCommand('npm', ['install'], {'saveDev':true});
    }

});
