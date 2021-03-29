/**
 *
 */
var Base = require('../base-public.js');

module.exports = class extends Base {
    constructor() {
        super(...arguments);
        Object.assign(this, {
            fileSuffix: '-filter',
            fileSubDir: 'filters',
        })
    }
    createFiles () {

        this.copyFileTemplate('filter-tpl.js', '.js', true);
    }
};
