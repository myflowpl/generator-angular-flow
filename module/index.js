'use strict';
var path = require('path');
var af = require('generator-angular-flow');
var yeoman = require('yeoman-generator');

module.exports = af.Base.extend({
    constructor: function (args, options) {
        yeoman.Base.apply(this, arguments);

        this._extend(this.config.getAll());

        this.argument('name', { type: String, required: false });
        if(this.name) {
            this._extend(this.normalizeName(this.name))
        }
    },

    default: function(){

        this.basePath = this.config.get('basePath');
        this.moduleBasePathFactoryName = this.name+'BasePath';

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
                this._extend(this.normalizeName(answers.name));
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

        var components = af.getBowerComponents().map(function(m){
            return {
                value: m,
                name: m.label+' ('+m.version+')'
            };
        });

        this.prompt([{
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include?',
            choices: modules
        },{
            type: 'checkbox',
            name: 'components',
            message: 'Which bower components would you like to include?',
            choices: components

        }], function (props) {

            this.angularModules = props.modules;
            this.bowerComponents = props.components;
            this._createModuleFiles();

        }.bind(this));
    },

    /**
     * we have module name, so we crate it
     */
    _createModuleFiles: function () {
        this.destinationRoot(path.join(this.destinationRoot(), this.baseDir, this.dirName));
        //this.destinationRoot(this.destinationRoot()+'/'+this.dirName)

        this.moduleBasePathFactoryName = this.name+'BasePath';

        this.angularModulesString = "\n"+this.angularModules.map(function(m){
            return '        "'+m+'"';
        }).join(",\n")+"\n    ";

        this.bowerComponentsString = "\n"+this.bowerComponents.map(function(m){
            return '        "'+ m.name+'"';
        }).join(",\n")+"\n    ";

        this.moduleModulesString = "\n"+this.bowerComponents.filter(function(m){
            return !!m.angular_module;
        }).map(function(m){
            return m.angular_module;
        }).concat(this.angularModules).map(function(m){
            return '    "'+m+'"';
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

});
