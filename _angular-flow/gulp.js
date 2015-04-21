/**
 * generator gulp tasks
 */
module.exports = function(require, dir){

    //
    //var gulp = require('gulp'),
    //    sass = require('gulp-ruby-sass'),
    //    gsass = require('gulp-sass'),
    //    gulpMerge = require('gulp-merge'),
    //    sourcemaps = require('gulp-sourcemaps'),
    //    autoprefixer = require('gulp-autoprefixer'),
    //    minifycss = require('gulp-minify-css'),
    //    linker = require('gulp-linker'),
    //    fs = require('fs'),
    //    path = require('path'),
    //    argv = require('yargs').argv,
    //    connect = require('gulp-connect'),
    //    af = require('generator-angular-flow'),
    //     _ = require('lodash');
    //    rename = require('gulp-rename');
    //
    //var config = af.getConfig();
    //var baseDir = path.join(dir, config.baseDir);
    //var basePath = path.join(dir, config.basePath);
    //
    //var module = af.normalizeModuleName(argv.module ? argv.module : config.defaultModule);
    //
    //var log = console.log;
    //if(!module) {
    //    throw new Error('module parameter is required: gulp --module moduleName');
    //}
    //var moduleConfig = af.getModules(module);
    //
    //
    //console.log('module', module, dir, baseDir)
    //
    //
    //gulp.task('server', ['connect', 'link-sass', 'styles', 'link', 'watch'], function() {
    //
    //});
    //
    ///**
    // * gup compile and watch project
    // */
    //gulp.task('default', ['connect', 'link-sass', 'styles', 'link', 'watch'], function() {
    //
    //});
    //
    //gulp.task('connect', function(){
    //    connect.server({
    //        root: dir,
    //        livereload: true,
    //        port: 8888
    //    })
    //});
    //
    //
    //gulp.task('sass', function () {
    //    var modules = af.getModules().map(function(m){
    //        console.log(baseDir+m.dirName+'/_sass')
    //        return baseDir+m.dirName+'/_sass/*.scss';
    //    });
    //
    //    gulp.src(modules)
    //        .pipe(gsass())
    //        .pipe(gulp.dest(baseDir+'css/'));
    //});
    //
    //gulp.task('styles', function() {
    //    return sass(baseDir+module+'/_sass', {style: 'expanded', sourcemap: true })
    //        .on('error', function (err) {
    //            console.error('Error', err.message);
    //        })
    //        .pipe(sourcemaps.init())
    //        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    //        .pipe(sourcemaps.write())
    //        .pipe(gulp.dest(baseDir+'css/'+module))
    //        .pipe(connect.reload());
    //});
    //
    //gulp.task('styles-all', function() {
    //    var sources = [];
    //    af.getModules().map(function(m){
    //        console.log(baseDir+m.dirName+'/_sass')
    //        sources.push(
    //            sass(baseDir+m.dirName+'/_sass', {style: 'expanded', sourcemap: true })
    //                .on('error', function (err) {
    //                    console.error('Error', err.message);
    //                })
    //                //.pipe(sourcemaps.init())
    //                .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    //                //.pipe(sourcemaps.write())
    //                .pipe(gulp.dest(baseDir+'css/'+m.dirName))
    //        )
    //    })
    //
    //
    //    //return gulpMerge(sources).pipe(connect.reload());
    //});
    //
    //gulp.task('html', function () {
    //    gulp.src(af.getModules().map(function(m){
    //        return baseDir+ m.dirName+'/**/*.{html,js}';
    //    }))
    //    .pipe(connect.reload());
    //});
    //
    //gulp.task('watch', function() {
    //    var scss = af.getModules().map(function(m){
    //        return baseDir+ m.dirName+'/**/*.scss';
    //    })
    //
    //    var htmljs = af.getModules().map(function(m){
    //        return baseDir+ m.dirName+'/**/*.{html,js}';
    //    })
    //
    //    gulp.watch(scss, ['styles']);
    //    gulp.watch(htmljs, ['html']);
    //
    //    //gulp.watch(baseDir+module+'/**/*.json', ['json']);
    //});
    //
    //gulp.task('link-sass', function() {
    //
    //    var mixer   = require('generator-angular-flow/gulp-sass-mixer');
    //    af.getModules().forEach(function(m){
    //
    //        var sassDir = baseDir+ m.dirName+'/_sass';
    //
    //        gulp.src([
    //            baseDir+ m.dirName+'/_states/**/*.scss'
    //        ])
    //        .pipe(mixer({
    //            verbose: false,
    //            baseDir: sassDir,
    //            file: '_states.scss'
    //        }))
    //        .pipe(gulp.dest(sassDir));
    //
    //        gulp.src([
    //            '!'+baseDir+ m.dirName+'/_sass/**/*.scss',
    //            '!'+baseDir+ m.dirName+'/_states/**/*.scss',
    //            baseDir+ m.dirName+'/**/*.scss'
    //        ])
    //        .pipe(mixer({
    //            baseDir: sassDir,
    //            file: '_components.scss'
    //        }))
    //        .pipe(gulp.dest(sassDir));
    //    })
    //});
    //
    ///**
    // * link files to index.html
    // */
    //gulp.task('link', function() {
    //
    //    var modules = af.getModules();
    //
    //    // get all required bower componets from all modules
    //    var components = _.pluck(modules, 'bower_components')
    //
    //    // flatten to array of names
    //    components = _.flatten(components)
    //
    //    // remove duplicated names
    //    components = _.union(components)
    //
    //    // convert to array of configs
    //    components = af.getBowerComponents(components);
    //
    //    // convert to array of js files
    //    var componentsJsFiles = _.pluck(components, 'js');
    //    // flatten to array of files
    //    componentsJsFiles = _.flatten(componentsJsFiles).map(function(file){
    //        return baseDir+'bower_components/'+file;
    //    });
    //
    //    // convert to array of js files
    //    var componentsCssFiles = _.pluck(components, 'css');
    //    // flatten to array of fils
    //    componentsCssFiles = _.flatten(componentsCssFiles).map(function(file){
    //        return baseDir+'bower_components/'+file;
    //    });
    //
    //    //log('bower js files', componentsJsFiles)
    //    //log('bower css files', componentsCssFiles)
    //
    //    /**
    //     * all modules js files
    //     */
    //    var modulesJsFiles = modules.map(function(m){
    //        return m.js.map(function(file){
    //            var ex = '';
    //            if(file.charAt(0)==='!') {
    //                ex = '!';
    //                file = file.slice(1)
    //            }
    //            return ex+baseDir+ m.dirName+'/'+file;
    //        });
    //    })
    //    //flatten to array of names
    //    modulesJsFiles = _.flatten(modulesJsFiles)
    //
    //    //log('mod js file', modulesJsFiles)
    //
    //
    //    /**
    //     * all modules css files
    //     */
    //    var modulesCssFiles = moduleConfig.css.map(function(file){
    //        var ex = '';
    //        if(file.charAt(0)==='!') {
    //            ex = '!';
    //            file = file.slice(1)
    //        }
    //        return ex+baseDir+'css/'+moduleConfig.dirName+'/'+file;
    //    })
    //
    //    //var modulesCssFiles = modules.map(function(m){
    //    //    return m.css.map(function(file){
    //    //        var ex = '';
    //    //        if(file.charAt(0)==='!') {
    //    //            ex = '!';
    //    //            file = file.slice(1)
    //    //        }
    //    //        return ex+baseDir+'css/'+m.dirName+'/'+file;
    //    //    });
    //    //})
    //    // flatten to array of names
    //    modulesCssFiles = _.flatten(modulesCssFiles)
    //
    //
    //    //log('mod css file', modulesCssFiles)
    //    //log('componentsCssFiles css file', componentsCssFiles)
    //
    //
    //    var js = componentsJsFiles.concat(modulesJsFiles);
    //    var css = componentsCssFiles.concat(modulesCssFiles)
    //
    //    //log('JS', js);log('CSS', css);
    //
    //
    //    // Read templates
    //    gulp.src(baseDir+moduleConfig.dirName+'/index.html')
    //        // Link the JavaScript
    //        .pipe(linker({
    //            scripts: js,
    //            startTag: '<!--INJECT SCRIPTS-->',
    //            endTag: '<!--INJECT SCRIPTS END-->',
    //            fileTmpl: '<script src="%s"></script>',
    //            relative: false,
    //            appRoot: path.resolve(dir, '../')
    //        }))
    //        // link the css
    //        .pipe(linker({
    //            scripts: css,
    //            startTag: '<!--INJECT STYLES-->',
    //            endTag: '<!--INJECT STYLES END-->',
    //            fileTmpl: '<link rel="stylesheet" href="%s">',
    //            relative: false,
    //            appRoot: path.resolve(dir, '../')
    //        }))
    //        // Write modified files to www/
    //        .pipe(gulp.dest(baseDir+moduleConfig.dirName));
    //
    //});
}