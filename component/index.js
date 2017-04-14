/**
 *
 */
var Base = require('../base-public.js');

module.exports = Base.extend({

    fileSliceDir: false,
    fileSuffix: '-component',
    fileSubDir: 'components',

    createFiles: function () {

        this.copyFileTemplate('component-tpl.ts', '.ts', true);
        this.copyFileTemplate('component-tpl.html', '.html', false);
        this.copyFileTemplate('component-tpl.scss', '.scss', false);
    }
});