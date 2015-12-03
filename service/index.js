/**
 *
 */
var Base = require('../base-public.js');

module.exports = Base.extend({
    fileSuffix: '-srv',
    nameSuffix: 'Srv',
    fileSubDir: 'services',
    createFiles: function () {

        this.copyFileTemplate('factory-tpl.js', '.js', true);
    }
});