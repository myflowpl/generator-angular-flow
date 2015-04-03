

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

var module = gulp.env.module ? gulp.env.module : 'main';
console.log('module', module);

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: 4002}));
    app.use(express.static(__dirname));
    app.listen(4000);
});

gulp.task('default', ['styles','express', 'livereload', 'watch'], function() {

});


var tinylr;
gulp.task('livereload', function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(4002);
});

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('styles', function() {
    return sass(module+'/_sass', {style: 'expanded', sourcemap: true })
        .on('error', function (err) {
            console.error('Error', err.message);
        })

    //return gulp.src('sale/_sass/*.scss')
    //    .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('css/'+module));
        //.pipe(rename({suffix: '.min'}))
        //.pipe(minifycss())
        //.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch(module+'/**/*.scss', ['styles']);
});