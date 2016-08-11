var gulp = require('gulp');
var gutil = require('gulp-util');
var gsass = require('gulp-sass');
var server = require('gulp-express');

var paths = {
    sass: ['src/assets/scss/**/*.scss', '!src/assets/scss/mixins.scss', '!src/assets/scss/variables.scss']
};

gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(gsass().on('error', gutil.log))
        .pipe(gulp.dest('src/assets/css'));
});

gulp.task('default', ['sass']);

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
})

gulp.task('serve', function() {
    server.run(['server.js']);
    gulp.run('default');
    gulp.run('watch');
});
