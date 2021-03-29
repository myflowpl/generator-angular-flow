/**
 *
 */
var Base = require('../base-public.js');

module.exports = class extends Base {
    constructor() {
        super(...arguments);
        Object.assign(this, {
            fileSuffix: '-res',
            nameSuffix: 'Res',
            fileSubDir: 'resources',
        })
    }
    createFiles () {

        this.copyFileTemplate('restmod.tpl', '.js', true);
    }
};
