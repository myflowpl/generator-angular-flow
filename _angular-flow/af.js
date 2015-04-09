/**
 * @module generator-angular-flow
 */

'use strict';
var fs = require('fs'),
    _ = require('lodash'),
    path = require('path')
    ;

module.exports = {
    //Base: require('./base'),
    gulp: require('./gulp'),
    bower_components: null,
    modules: null,
    config: null,
    getConfig: function(){
        if(this.config) {
            return this.config;
        }
        if(!fs.existsSync('.yo-rc.json')) {
            throw new Error('.yo-rc.json is required, you have to init your project, or run commands from project root folder')
        }
        this.config = JSON.parse(fs.readFileSync('.yo-rc.json'))['generator-angular-flow'];
        return this.config;
    },

    /**
     * get bower component config
     * all | by name | by array of names
     *
     * @param name
     * @returns {*}
     */
    getBowerComponents: function(name){

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
     * return list of configs of created modules
     * all | by name | by array of names
     *
     * @param name
     * @returns {*}
     */
    getModules: function(name) {
        if(!this.modules) {
            var baseDir = this.getConfig().baseDir;
            this.modules = fs.readdirSync(baseDir).filter(function(file) {
                if(fs.statSync(path.join(baseDir, file)).isDirectory() && fs.existsSync(path.join(baseDir, file, file+'-module.json'))) {
                    return true;
                } else {
                    return false;
                }
            }).map(function(dirName){
                return JSON.parse(fs.readFileSync(path.join(baseDir, dirName, dirName+'-module.json')));
            });
        }

        // return list if no name given
        if(arguments.length === 0) {
            return this.modules;
        }

        // if array, its array of names, so convert it to array of configs
        if(_.isArray(name)) {
            var modules = this.modules;
            return name.map(function(module_name){
                var c = _.find(modules, 'name', module_name);
                if(!c) {
                    throw new Error('module '+module_name+' not found!!!')
                }
                return c;
            })
        }

        // else its string, so return it's config
        if(!name) {
            throw new Error('module name is empty!!!')
        }
        var c = _.find(this.modules, 'name', name);
        if(!c) {
            throw new Error('module '+name+' not found!!!')
        }
        return c;
    },


    /**
     * converts user input string to normalized camel case name
     *
     * @param name
     */
    normalizeModuleName: function (str) {
        return _.camelCase(str);
    }
};