'use strict';

var gulp = require('gulp');
var del = require('del');
var livereload = require('gulp-livereload');


gulp.task('assets', function(){
	gulp.src(['./src/**/*.{json,png,js}'])
		.pipe(gulp.dest('./dist'))
		.pipe(livereload());
});

gulp.task('clean', function(done) {
  del(['./dist'], done);
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['./src/**/*.{json,png,js}'], ['assets'])
});

gulp.task('build', ['assets']);
