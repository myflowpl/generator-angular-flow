'use strict';
var path = require('path');
var Base = require('../base-public');
var yeoman = require('yeoman-generator');
var _ = require('lodash');


module.exports = Base.extend({
    constructor: function (args, options) {
        yeoman.Base.apply(this, arguments);

    },

    default: function(){
        this.fs.copy(
            this.templatePath('./'),
            this.destinationPath('public/src/app'),
            this
        );
    },
});
