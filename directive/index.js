/**
 *
 */
var Base = require('../base-public.js');

module.exports = Base.extend({
    fileSuffix: '-directive',
    fileSubDir: 'directives',
    createFiles: function () {

        this.copyFileTemplate('directive-tpl.js', '.js', true);
    }
});