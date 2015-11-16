'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var livereload = require('gulp-livereload');

/*
	A more sophisticated browserify build & watch
	https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
 */

// add custom browserify options here
var customOpts = {
  content: {
    entries: ['./src/scripts/content.js'],
    debug: true,
    dest: { fileName: 'content.js', path: './dist/scripts' }
  },
  background: {
    entries: ['./src/scripts/background.js'],
    debug: true,
    dest: { fileName: 'background.js', path: './dist/scripts' }
  }
};

function bundle(bundler, options) {
  options = options || {};
  return bundler.bundle()
    // log errors if they happen
    .on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source(options.fileName))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(options.path))
    .pipe(livereload());
}

// you can run `gulp js` to build the file
gulp.task('js:content', function(){
  var opts = assign({}, browserify.args, customOpts.content);
  var b = browserify(opts);
  // add transformations here
  // i.e. b.transform(coffeeify);
  return bundle(b, customOpts.content.dest);
});

// you can run `gulp js` to build the file
gulp.task('js:background', function(){
  var opts = assign({}, browserify.args, customOpts.background);
  var b = browserify(opts);
  // add transformations here
  // i.e. b.transform(coffeeify);
  return bundle(b, customOpts.background.dest);
});

gulp.task('watchify:content', function(){
  var opts = assign({}, watchify.args, customOpts.content);
  var b = watchify(browserify(opts));

  // add transformations here
  // i.e. b.transform(coffeeify);

  b.on('update', bundle.bind(null, b, customOpts.content.dest)); // on any dep update, runs the bundler
  b.on('log', util.log); // output build logs to terminal

  return bundle(b, customOpts.content.dest);
});

gulp.task('watchify:background', function(){
  var opts = assign({}, watchify.args, customOpts.background);
  var b = watchify(browserify(opts));

  // add transformations here
  // i.e. b.transform(coffeeify);

  b.on('update', bundle.bind(null, b, customOpts.background.dest)); // on any dep update, runs the bundler
  b.on('log', util.log); // output build logs to terminal

  return bundle(b, customOpts.background.dest);
});

gulp.task('assets', function(){
  gulp.src([
    './src/assets/**/*.*'
    ])
		.pipe(gulp.dest('./dist/assets'))
    .pipe(livereload());
});

gulp.task('manifest', function(){
  gulp.src([
    './src/manifest.json'
    ])
		.pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('clean', function(done) {
  del(['./dist'], done);
});

gulp.task('watch', ['watchify:content', 'watchify:background'], function() {
    livereload.listen();
    gulp.watch('./src/manifest.json', ['manifest']);
    gulp.watch(['./src/assets/**/*.*'], ['assets']);
});


gulp.task('build', ['js:content', 'js:background','assets', 'manifest']);

gulp.task('default', ['watch']);

// 'use strict';
//
// var gulp = require('gulp');
// var del = require('del');
// var livereload = require('gulp-livereload');
//
//
// gulp.task('assets', function(){
// 	gulp.src(['./src/**/*.{json,png,js}'])
// 		.pipe(gulp.dest('./dist'))
// 		.pipe(livereload());
// });
//
// gulp.task('clean', function(done) {
//   del(['./dist'], done);
// });
//
// gulp.task('watch', function() {
//     livereload.listen();
//     gulp.watch(['./src/**/*.{json,png,js}'], ['assets'])
// });
//
// gulp.task('build', ['assets']);
