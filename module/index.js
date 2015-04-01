'use strict';
var path = require('path');
var base = require('../_angular-flow/base');
var yeoman = require('yeoman-generator');

module.exports = base.extend({
    constructor: function (args, options) {
        yeoman.Base.apply(this, arguments);

        this.argument('name', { type: String, required: false });
        if(this.name) {
            this.setName(this.name)
        }
    },

    default: function(){

        var appPath = this.config.get('appPath');
        if(this.moduleName) {
            // modify existing module
            this.log('info about module: ', this.moduleName);
        } else {
            this.log('EXISTING MODULES:')
            var modules = this.getModules();
            modules.forEach(function(m){
                this.log('-> ', m.dirName);
            }.bind(this));
            this.log('');
            this._promptModuleName();
        }
    },
    _promptModuleName: function() {
        var modules = this.getModules();
        this.prompt([{
            type: 'input',
            name: 'name',
            message: 'create new module with name'
        }, {
            type: 'input',
            name: 'alias',
            message: 'do you want to create alias, best are 2 or 3 chars long'
        }], function (answers) {
            if(!answers.name) {
                this.log('ERROR: module name is required, type the name');
                this._promptModuleName();
            } else if (modules.indexOf(answers.name) >=0) {
                this.log('ERROR: module name exists, choose other name');
                this._promptModuleName(answers.name);
            } else {
                this.aliasName = answers.alias;
                this.setName(answers.name);
                if(!answers.alias) {
                    this.aliasName = this.dirName;
                }
                this._promptModules();
            }
        }.bind(this));
    },

    /**
     * ask for extra modules you want to include in your app
     */
    _promptModules: function () {
        var modules = this.getModules();

        this.prompt({
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include?',
            choices: modules
        }, function (props) {
            this.angularModules = props.modules;
            this._createModuleFiles();
        }.bind(this));
    },

    /**
     * we have module name, so we crate it
     */
    _createModuleFiles: function () {

        this.destinationRoot(this.destinationRoot()+'/'+this.dirName)

        this.angularModulesString = "\n"+this.angularModules.map(function(m){
            return "    '"+m+"'";
        }).join(",\n")+"\n";

        this.fs.copyTpl(
            this.templatePath('module.js'),
            this.destinationPath(this.dirName+'-module.js'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('module.json'),
            this.destinationPath(this.dirName+'-module.json'),
            this
        );

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('index.html'),
            this
        );
    }

    ///**
    // * ask for extra modules you want to include in your app
    // */
    //_promptBowerComponents: function () {
    //    var done = this.async();
    //    var modules = this.getBowerComponents();
    //    var choices = [];
    //    for (var m in modules) {
    //        choices.push({
    //            value: modules[m],
    //            name: modules[m].name+' ('+modules[m].version+')',
    //            checked: !!modules[m].checked
    //        });
    //    }
    //    var prompts = [
    //        {
    //            type: 'checkbox',
    //            name: 'modules',
    //            message: 'Which modules would you like to include?',
    //            choices: choices
    //        }
    //    ];
    //
    //    this.prompt(prompts, function (props) {
    //
    //        this.bowerComponents = '';
    //        var angMods = [
    //            "ngAnimate",
    //            "ajoslin.promise-tracker",
    //            "cgBusy",
    //            "chieffancypants.loadingBar",
    //            "ui.router",
    //            "ui.bootstrap"
    //        ];
    //        for (var m in props.modules) {
    //            if(props.modules[m].moduleName) {
    //                angMods.push(props.modules[m].moduleName);
    //            }
    //            if(props.modules[m].bowerName) {
    //                this.bowerComponents = this.bowerComponents+',\n        "'+props.modules[m].bowerName+'": "'+props.modules[m].version+'"';
    //            }
    //        }
    //        this.angularModules = "\n    '" + angMods.join("',\n    '") + "'\n";
    //        done();
    //    }.bind(this));
    //},

});
