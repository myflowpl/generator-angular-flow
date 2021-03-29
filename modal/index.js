/**
 *
 */
var Base = require('../base-public.js');
module.exports = class extends Base {
    constructor() {
        super(...arguments);
        Object.assign(this, {
            fileSliceDir: false,
            fileSuffix: '-modal',
            fileSubDir: 'modals',
        })
    }
    createFiles () {

        this.copyFileTemplate('modal-tpl.ts', '.ts', true);
        this.copyFileTemplate('modal-tpl.html', '.html', false);
        this.copyFileTemplate('modal-tpl.scss', '.scss', false);
    }
};
