'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');


module.exports = ScriptBase.extend({
    createFilterFiles: function () {

        var filePath = ['scripts', 'resources'].concat(this.slugifiedPath).join('/');
        this.resName = this.cameledName.charAt(0).toUpperCase() + this.cameledName.slice(1) + 'Res';
        this.template(
            'resource/resource-tpl.js',
            path.join(this.appPath, filePath, this.dasherizedFullName + '-res.js')
        );
    }
});
