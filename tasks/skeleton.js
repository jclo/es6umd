/* eslint one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0,
  semi-style: 0 */

// -- Node modules
const del         = require('del')
    , gulp        = require('gulp')
    , runSequence = require('run-sequence')
    ;

// -- Local modules
const config = require('./config')
  ;

// -- Local constants
const { dist } = config
    ;

// -- Local variables


// -- Gulp Private Tasks

// Remove the previous '_dist':
gulp.task('remove', function() {
  del.sync([dist]);
});

// Create './dist' and populate it:
gulp.task('create', function() {
  return gulp.src(['./*.md', '!CHANGELOG.md'])
    .pipe(gulp.dest(dist));
});


// -- Gulp Public Tasks
gulp.task('skeleton', function(callback) {
  runSequence('remove', 'create', callback);
});
