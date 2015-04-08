/**
 * generator gulp tasks
 */
module.exports = function(require, dir){


    var gulp = require('gulp'),
        sass = require('gulp-ruby-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        minifycss = require('gulp-minify-css'),
        linker = require('gulp-linker'),
        fs = require('fs'),
        path = require('path'),
        argv = require('yargs').argv,
        af = require('generator-angular-flow')
        rename = require('gulp-rename');

    var config = af.getConfig();
    var baseDir = path.join(dir, config.baseDir);
    var module = af.normalizeModuleName(argv.module ? argv.module : '');
    var log = console.log;


    console.log('module', module, dir, baseDir)


    gulp.task('express', function() {
        var express = require('express');
        var app = express();
        app.use(express.static(__dirname));
        app.listen(4000);
    });

    gulp.task('default', ['styles','express', 'livereload', 'watch'], function() {

    });


    gulp.task('styles', function() {
        return sass(baseDir+module+'/_sass', {style: 'expanded', sourcemap: true })
            .on('error', function (err) {
                console.error('Error', err.message);
            })

            //return gulp.src('sale/_sass/*.scss')
            //    .pipe(sass({ style: 'expanded' }))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
            .pipe(gulp.dest(baseDir+'css/'+module));
        //.pipe(rename({suffix: '.min'}))
        //.pipe(minifycss())
        //.pipe(gulp.dest('css'));
    });

    gulp.task('watch', function() {
        gulp.watch(module+'/**/*.scss', ['styles']);
    });

    gulp.task('link', function() {
        return;
        var moduleConfig = getModule(module);

        /**
         * module scripts
         */
        var jsFiles = moduleConfig.js.map(function(file){
            var ex = '';
            if(file.charAt(0)==='!') {
                ex = '!';
                file = file.slice(1)
            }
            return ex+config.baseDir+moduleConfig.dirName+'/'+file;
        })
        log('js', jsFiles);

        var list = getBowerComponents();
        var bowerJsFiles = moduleConfig.bower_components.map(function(name){
            var files = list.filter(function(v){
                if(v.name == name) {
                    return true;
                }
            })[0].js;
            return config.baseDir+'bower_components/'+files;
        })
        log('bowerJsFiles', bowerJsFiles);

        /**
         * module styles
         */
        var cssFiles = moduleConfig.css.map(function(file){
            var ex = '';
            if(file.charAt(0)==='!') {
                ex = '!';
                file = file.slice(1)
            }
            return ex+config.baseDir+'/css/'+moduleConfig.dirName+'/'+file;
        })
        log('css', cssFiles);

        var scripts = bowerJsFiles.concat(jsFiles);
        // Read templates
        gulp.src(config.baseDir+'sale/index.html')
            // Link the JavaScript
            .pipe(linker({
                scripts: scripts,
                startTag: '<!--INJECT SCRIPTS-->',
                endTag: '<!--INJECT SCRIPTS END-->',
                fileTmpl: '<script src="/%s"></script>',
                relative: false,
                appRoot: config.baseDir
            }))
            // link the css
            .pipe(linker({
                scripts: cssFiles,
                startTag: '<!--INJECT STYLES-->',
                endTag: '<!--INJECT STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="/%s">',
                relative: false,
                appRoot: config.baseDir
            }))
            // Write modified files to www/
            .pipe(gulp.dest(config.baseDir+'sale'));
    });
}