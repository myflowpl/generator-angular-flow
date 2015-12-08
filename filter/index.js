/**
 *
 */
var Base = require('../base-public.js');

module.exports = Base.extend({
    fileSuffix: '-filter',
    fileSubDir: 'filters',
    createFiles: function () {

        this.copyFileTemplate('filter-tpl.js', '.js', true);
    }
});
