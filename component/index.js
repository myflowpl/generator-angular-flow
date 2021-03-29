/**
 *
 */
var Base = require('../base-public.js');

module.exports = class extends Base{
    constructor() {
        super(...arguments);
        Object.assign(this, {
            fileSliceDir: false,
            fileSuffix: '-component',
            fileSubDir: 'components',
        })
    }

    createFiles () {

        this.copyFileTemplate('component-tpl.ts', '.ts', true);
        this.copyFileTemplate('component-tpl.html', '.html', false);
        this.copyFileTemplate('component-tpl.scss', '.scss', false);
    }
};
