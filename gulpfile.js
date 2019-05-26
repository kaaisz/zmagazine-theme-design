const gulp = require('gulp');
const { series, watch } = require('gulp');
const { src, dest } = require('gulp');
const path = require('path');
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./package.json'));
const assetsPath = path.resolve(pkg.path.assetsDir);

// to compile sass
const sass = require('gulp-sass');

// add vender prefix
const autoprefixer = require('gulp-autoprefixer');

// error handling
const plumber = require('gulp-plumber');

function compileSass() {
  return gulp.src(path.join(assetsPath, 'scss/main.scss'))
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(
      {
        browsers: ['last 2 versions'],
        cascade: false
      }
    ))
    .pipe(gulp.dest(path.join(assetsPath, 'css')))
}

function watchSass() {
  return gulp.watch(path.join(assetsPath, 'sass/**/*.scss'), gulp.task('sass'));
}

exports.default = series(compileSass, watchSass);