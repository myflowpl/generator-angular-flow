/**
 *
 */
var Base = require('../base-public.js');

module.exports = Base.extend({
    fileSliceDir: false,
    fileSuffix: '-modal',
    fileSubDir: 'modals',
    createFiles: function () {

        this.copyFileTemplate('modal-tpl.js', '.js', true);
        this.copyFileTemplate('modal-tpl.html', '.html', false);
        this.copyFileTemplate('modal-tpl.scss', '.scss', false);
    }
});