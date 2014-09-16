'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

module.exports = ScriptBase.extend({
    createModalFiles: function() {

        var filePath = ['modals'].concat(this.hierarchy).join('/');
        /**
         * template url for modal directive
         */
        this.templateUrl = '/' + [filePath, this.dasherizedFullName + '.html'].join('/');
        this.template(
            'modal/modal-tpl.js',
            path.join(this.appPath, filePath, this.dasherizedFullName + '.js')
        );
        this.template(
            'modal/modal-tpl.html',
            path.join(this.appPath, filePath, this.dasherizedFullName + '.html')
        );
        this.template(
            'modal/modal-tpl.scss',
            path.join(this.appPath, filePath, '_' + this.dasherizedFullName + '.scss')
        );
        this.addStyleToModalScss(['..', filePath, this.dasherizedFullName].join('/'));
    }
});