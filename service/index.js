/**
 *
 */
var Base = require('../base-public.js');

module.exports = Base.extend({
    fileSuffix: '-service',
    nameSuffix: 'Service',
    fileSubDir: 'services',
    createFiles: function () {

        this.copyFileTemplate('service-tpl.ts', '.ts', true);
    }
});