'use strict';
var af = require('generator-angular-flow');
var Base = require('generator-angular-flow/base');
var fs = require('fs');
var _ = require('lodash');
var yeoman = require('yeoman-generator');

module.exports = Base.extend({
    constructor: function (args, options) {
        yeoman.Base.apply(this, arguments);

    },
    updateDocumentRoot: false,
    default: function(){

        // get all required bower componets from all modules
        var components = _.pluck(af.getModules(), 'bower_components')

        // flatten to array of names
        components = _.flatten(components)

        // remove duplicated names
        components = _.union(components)

        // convert to array of configs
        components = af.getBowerComponents(components);

        // convert to array of bower installable names <name>#<version>
        components = components.map(function(m){
            return m.name+'#'+ m.version;
        })

        this.log('install bower components');
        this.bowerInstall(components, { 'saveDev': true });

    }
});
