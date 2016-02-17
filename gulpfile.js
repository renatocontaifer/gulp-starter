var gulp = require( 'gulp' );
var browserSync = require('browser-sync').create();
var sass = require( 'gulp-sass');
var bourbon = require('node-bourbon');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

// BrowserSync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Sass
gulp.task('sass', function () {
  return gulp.src('./assets/stylesheets/main.sass')
    .pipe(sass({
      sourcemap: true,
      includePaths: require('node-bourbon').includePaths
    }).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./assets/stylesheets'))
    .pipe(browserSync.stream());
});

// Watch
gulp.task( 'watch', ['sass', 'browser-sync'], function() {
  gulp.watch( './assets/stylesheets/**/*.sass', ['sass']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['watch']);
