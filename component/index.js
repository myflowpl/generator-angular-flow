/**
 *
 */
var Base = require('../base-public.js');

module.exports = Base.extend({

    fileSliceDir: false,
    fileSubDir: 'components',

    createFiles: function () {

        this.copyFileTemplate('component-tpl.js', '.js', true);
        this.copyFileTemplate('component-tpl.html', '.html', false);
        this.copyFileTemplate('component-tpl.scss', '.scss', false);
    }
});