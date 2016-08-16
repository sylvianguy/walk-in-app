'use strict'
const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const historyApiFallback = require('connect-history-api-fallback');


gulp.task('js', () => {
	browserify('src/app.js')
		.transform('babelify', {
			presets: ['es2015','react']
		})
		.bundle()	
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('public/'))
		.pipe(reload({stream:true}));
});

gulp.task('bs', () => {
	browserSync.init({
		server: {
			baseDir: './'
		},
		middleware: [historyApiFallback()]
	});
});

gulp.task('default', ['js','bs'], () => {
	gulp.watch('src/**/*.js',['js']);
	gulp.watch('./public/style.css',reload);
});