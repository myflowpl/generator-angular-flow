'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');


module.exports = ScriptBase.extend({
    createFilterFiles: function () {

        var filePath = ['scripts', 'services'].concat(this.slugifiedPath).join('/');

        this.template(
            'service/templates/factory-tpl.js',
            path.join(this.appPath, filePath, this.dasherizedFullName + '-srv.js')
        );
    }
});
