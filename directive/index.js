'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');

module.exports = ScriptBase.extend({
    createDirectiveFiles: function () {

        var filePath = ['scripts', 'directives'].concat(this.slugifiedPath).join('/');

        this.template(
            'directive/directive-tpl.js',
            path.join(this.appPath, filePath, this.dasherizedFullName + '.js')
        );
    }
});
