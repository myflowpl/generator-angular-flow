'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');

module.exports = ScriptBase.extend({
    createDirectiveFiles: function () {

        var filePath = ['scripts', 'controllers'].concat(this.slugifiedPath).join('/');

        this.template(
            'controller/controller-tpl.js',
            path.join(this.appPath, filePath, this.dasherizedFullName + '-ctrl.js')
        );
        this.gruntLink();
    }
});
