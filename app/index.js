'use strict';
var path = require('path');
var util = require('util');
var af = require('generator-angular-flow');
var yeoman = require('yeoman-generator');
var _ = require('lodash');


module.exports = af.Base.extend({
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
                message: 'base path (url)',
                default: '/' // Default to current folder name
            }
        ], function (answers) {
            answers.name = this._.camelize(this._.slugify(this._.humanize(answers.name)));
            this.appname = answers.name;
            answers.baseDir = _.trimRight(answers.baseDir, '/')+'/';
            answers.basePath = _.trimRight(answers.basePath, '/')+'/';
            this.config.set(answers);
            this.config.save();
            this._createAppFiles();
        }.bind(this));
    },

    /**
     * now all data are ready so create all required files
     */
    _createAppFiles: function () {
        this.baseDir = this.config.get('baseDir');
        this.name = this.config.get('name');

        this.bowerDir = this.baseDir+'bower_components';

        this.fs.copyTpl(
            this.templatePath('Gulpfile.js'),
            this.destinationPath('Gulpfile.js'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('bower.json'),
            this.destinationPath('bower.json'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('bowerrc'),
            this.destinationPath('.bowerrc'),
            this
        );

    }
});
