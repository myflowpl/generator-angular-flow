'use strict';
var path = require('path');
var Base = require('../base-public');
var yeoman = require('yeoman-generator');
var _ = require('lodash');


module.exports = class extends Base {
    constructor() {
        super(...arguments);
        Object.assign(this, {
        })
    }

    default(){
        this.fs.copy(
            this.templatePath('./'),
            this.destinationPath('public/src/app'),
            this
        );
    }
};
