'use strict';
var path = require('path');
var util = require('util');
var base = require('../_angular-flow/base');
var yeoman = require('yeoman-generator');
var fs = require('fs');

module.exports = base.extend({
    updateDocumentRoot: false,
    default: function(){

        this.log('install bower components');
        var list = this.getBowerComponents();
        var components = this.bower_components.map(function(name){
            return list.filter(function(v){
                if(v.name == name) {
                    return true;
                }
            })[0];
        });
        var install = components.map(function(m){
            return m.name+'#'+ m.version;
        })
        //console.log(list);
        //console.log(install);

        this.bowerInstall(install, { 'saveDev': true });

    },
});
