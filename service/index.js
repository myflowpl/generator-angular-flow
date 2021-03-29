/**
 *
 */
var Base = require('../base-public.js');

module.exports = class extends Base {
    constructor() {
        super(...arguments);
        Object.assign(this, {
            fileSuffix: '-service',
            nameSuffix: 'Service',
            fileSubDir: 'services',
        })
    }
    createFiles () {

        this.copyFileTemplate('service-tpl.ts', '.ts', true);
    }
};
