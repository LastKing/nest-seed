/**
 * Created by Rain on 2019-08-06
 */
const { join } = require('path');

const gulp = require('gulp');
const ts = require('gulp-typescript');
const rimraf = require('rimraf');

const tsProject = ts.createProject('tsconfig.build.json');

gulp.task('clean', function (cb) {
  rimraf(join(__dirname, './dist/**/*'), cb);
});

gulp.task('ts compiler', function () {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(tsProject.options.outDir));
});

gulp.task('copy static file', function () {
  return gulp.src('src/**/*.proto').pipe(gulp.dest(tsProject.options.outDir));
});

gulp.task('default', gulp.series('clean', 'ts compiler', 'copy static file'));
