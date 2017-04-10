var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('default', function () {
    return gulp.src('src/index.js')
            .pipe(rename({basename: 'dist'}))
            .pipe(gulp.dest('dist'))
            .pipe(rename({suffix: '.min',basename: 'dist'}))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
});