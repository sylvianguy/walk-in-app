'use strict'
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const historyApiFallback = require('connect-history-api-fallback');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
// const moment = require('moment');


gulp.task('js', () => {
	return browserify('src/app.js')
		.transform('babelify', {
			presets: ['es2015','react']
		})
		.bundle()
		.on('error',notify.onError({
			message: "Error: <%= error.message %>",
			title: 'Error in JS 💀'
		}))
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('public/'))
		.pipe(reload({stream:true}));
});

gulp.task('styl', function() {
  gulp.src('./src/stylus/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public/'))
    .pipe(reload({stream: true}));
});

gulp.task('bs', () => {
	browserSync.init({
		server: {
			baseDir: './'
		},
		middleware: [historyApiFallback()]
	});
});

gulp.task('default', ['js','bs', 'styl'], () => {
	gulp.watch('src/**/*.js',['js']);
	gulp.watch('./src/stylus/*.styl', ['styl']);
	// gulp.watch('src/stylus/main.css', reload);
});

