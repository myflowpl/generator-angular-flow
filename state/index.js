'use strict';
var base = require('../_angular-flow/base');

module.exports = base.extend({
    createStateFiles: function() {
this.log('state for', this.aliasName, this.fileName);
        //var filePath = ['states'].concat(this.hierarchy).join('/');
        ///**
        // * template url for component directive
        // */
        //this.templateUrl = '/' + [filePath, this.dasherizedFullName + '-state.html'].join('/');
        //this.stateName = this.dottedName;
        //this.stateUrl = '/' + this.cameledName;
        //this.template(
        //    'state/state-tpl.js',
        //    path.join(this.appPath, filePath, this.dasherizedFullName + '-state.js')
        //);
        //this.template(
        //    'state/state-tpl.html',
        //    path.join(this.appPath, filePath, this.dasherizedFullName + '-state.html')
        //);
        //this.template(
        //    'state/state-tpl.scss',
        //    path.join(this.appPath, filePath, '_' + this.dasherizedFullName + '-state.scss')
        //);
        //this.addStyleToStateScss(['..', filePath, this.dasherizedFullName+'-state'].join('/'));
        //this.gruntLink();
    }
});