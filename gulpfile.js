var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var webpack = require('webpack');
var gutil = require('gulp-util');

gulp.task('default', function() {
    var webpackConfig = require('./webpack.config');

    webpack(webpackConfig, function(err, stats) {
        if (err) { throw new gutil.PluginError('webpack', err); }
        gutil.log('[webpack]', stats.toString({}));
    });
    gulp.run('style');

    gulp.watch('style/*', [ 'style' ]);
});

gulp.task('style', function() {
    gulp.src('style/combined.less')
        .pipe(less({}))
        .pipe(gulp.dest('public'))
        .on('error', gutil.log);
});

