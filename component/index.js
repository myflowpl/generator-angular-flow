'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

module.exports = ScriptBase.extend({
    createComponentFiles: function() {

        var filePath = ['components'].concat(this.hierarchy).join('/');
        /**
         * template url for component directive
         */
        this.templateUrl = '/' + [filePath, this.dasherizedFullName + '.html'].join('/');
        this.template(
            'component/component-tpl.js',
            path.join(this.appPath, filePath, this.dasherizedFullName + '.js')
        );
        this.template(
            'component/component-tpl.html',
            path.join(this.appPath, filePath, this.dasherizedFullName + '.html')
        );
        this.template(
            'component/component-tpl.scss',
            path.join(this.appPath, filePath, '_' + this.dasherizedFullName + '.scss')
        );
        this.addStyleToComponentScss(['..', filePath, this.dasherizedFullName].join('/'));
        this.gruntLink();
    }
});