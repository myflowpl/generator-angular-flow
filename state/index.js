'use strict';
var base = require('../_angular-flow/base');

module.exports = base.extend({
    createStateFiles: function() {
this.log('state for', this.aliasName, this.file.name);
        var filePath = ['states'].concat(this.hierarchy).join('/');
        /**
        * template url for component directive
        */
        this.templateUrl = '/' + [filePath, this.dasherizedFullName + '-state.html'].join('/');
        this.stateName = this.file.dirName.replace(/-/g, '.');
        this.stateUrl = '/' + this.camelName;
        this.controllerName = this.file.camelName+'StateController';

        var dir = this.fileParts.map(function(part){
            return part.dirName
        });
        var fileName = dir.join('-')+'-state';
        dir = dir.slice(1);
        dir.unshift('_states');
        dir.push(fileName);
        var path = dir.join('/');
console.log('DIR', path);
        this.fs.copyTpl(
            this.templatePath('state-tpl.js'),
            this.destinationPath(path+'.js'),
            this
        );


        //this.template(
        //    'state/state-tpl.js',
        //    path.join(filePath, this.dasherizedFullName + '-state.js')
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