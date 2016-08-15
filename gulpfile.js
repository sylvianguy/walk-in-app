'use strict'
const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('js', () => {
	browserify('src/app.js')
		.transform('babelify', {
			presets: ['es2015','react']
		})
		.bundle()	
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('public/'));
});

gulp.task('default', ['js'], () => {
	gulp.watch('src/**/*.js',['js']);
});