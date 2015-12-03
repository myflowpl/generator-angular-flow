/**
 *
 */
var Base = require('../base-public.js');

module.exports = Base.extend({
    fileSuffix: '-res',
    nameSuffix: 'Res',
    fileSubDir: 'resources',
    createFiles: function () {

        this.copyFileTemplate('restmod.tpl', '.js', true);
    }
});