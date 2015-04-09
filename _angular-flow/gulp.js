/**
 * generator gulp tasks
 */
module.exports = function(require, dir){


    var gulp = require('gulp'),
        sass = require('gulp-ruby-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        autoprefixer = require('gulp-autoprefixer'),
        minifycss = require('gulp-minify-css'),
        linker = require('gulp-linker'),
        fs = require('fs'),
        path = require('path'),
        argv = require('yargs').argv,
        connect = require('gulp-connect'),
        af = require('generator-angular-flow'),
         _ = require('lodash');
        rename = require('gulp-rename');

    var config = af.getConfig();
    var baseDir = path.join(dir, config.baseDir);

    var module = af.normalizeModuleName(argv.module ? argv.module : config.defaultModule);

    var log = console.log;
    if(!module) {
        throw new Error('module parameter is required: gulp --module moduleName');
    }
    var moduleConfig = af.getModules(module);


    console.log('module', module, dir, baseDir)


    gulp.task('default', ['connect', 'styles', 'link', 'watch'], function() {

    });

    gulp.task('connect', function(){
        connect.server({
            root: baseDir,
            livereload: true,
            port: 8888
        })
    });


    gulp.task('styles', function() {
        return sass(baseDir+module+'/_sass', {style: 'expanded', sourcemap: true })
            .on('error', function (err) {
                console.error('Error', err.message);
            })
            .pipe(sourcemaps.init())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(baseDir+'css/'+module))
            .pipe(connect.reload());
    });

    gulp.task('html', function () {
        gulp.src(baseDir+module+'/**/*.{html,js}')
            .pipe(connect.reload());
    });

    gulp.task('watch', function() {
        gulp.watch(baseDir+module+'/**/*.scss', ['styles']);
        gulp.watch(baseDir+module+'/**/*.{html,js}', ['html']);
        //gulp.watch(baseDir+module+'/**/*.json', ['json']);
    });

    gulp.task('link-sass', function() {
        var map   = require('map-stream');

        gulp.src(baseDir+'/**/*.scss')
            .pipe(map(function(file, cb){
                console.log(file.path);
                cb(null, file);
            }));
    });

    /**
     * link files to index.html
     */
    gulp.task('link', function() {

        var modules = af.getModules();

        // get all required bower componets from all modules
        var components = _.pluck(modules, 'bower_components')

        // flatten to array of names
        components = _.flatten(components)

        // remove duplicated names
        components = _.union(components)

        // convert to array of configs
        components = af.getBowerComponents(components);

        // convert to array of js files
        var componentsJsFiles = _.pluck(components, 'js');
        // flatten to array of files
        componentsJsFiles = _.flatten(componentsJsFiles).map(function(file){
            return baseDir+'bower_components/'+file;
        });

        // convert to array of js files
        var componentsCssFiles = _.pluck(components, 'css');
        // flatten to array of fils
        componentsCssFiles = _.flatten(componentsCssFiles);

        //log('bower js files', componentsJsFiles)
        //log('bower css files', componentsCssFiles)

        /**
         * all modules js files
         */
        var modulesJsFiles = modules.map(function(m){
            return m.js.map(function(file){
                var ex = '';
                if(file.charAt(0)==='!') {
                    ex = '!';
                    file = file.slice(1)
                }
                return ex+baseDir+ m.dirName+'/'+file;
            });
        })
        // flatten to array of names
        modulesJsFiles = _.flatten(modulesJsFiles)

        //log('mod js file', modulesJsFiles)


        /**
         * all modules css files
         */
        var modulesCssFiles = modules.map(function(m){
            return m.css.map(function(file){
                var ex = '';
                if(file.charAt(0)==='!') {
                    ex = '!';
                    file = file.slice(1)
                }
                return ex+baseDir+'css/'+m.dirName+'/'+file;
            });
        })
        // flatten to array of names
        modulesCssFiles = _.flatten(modulesCssFiles)

        //log('mod css file', modulesCssFiles)


        var js = componentsJsFiles.concat(modulesJsFiles);
        var css = componentsCssFiles.concat(modulesCssFiles)

        //log('JS', js);log('CSS', css);

        // Read templates
        gulp.src(baseDir+moduleConfig.dirName+'/index.html')
            // Link the JavaScript
            .pipe(linker({
                scripts: js,
                startTag: '<!--INJECT SCRIPTS-->',
                endTag: '<!--INJECT SCRIPTS END-->',
                fileTmpl: '<script src="/%s"></script>',
                relative: false,
                appRoot: baseDir
            }))
            // link the css
            .pipe(linker({
                scripts: css,
                startTag: '<!--INJECT STYLES-->',
                endTag: '<!--INJECT STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="/%s">',
                relative: false,
                appRoot: baseDir
            }))
            // Write modified files to www/
            .pipe(gulp.dest(baseDir+moduleConfig.dirName));

    });
}