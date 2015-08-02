var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var runSequence = require('run-sequence');
var uglify = require('webpack').optimize.UglifyJsPlugin;

var paths = {
  app: [
    /* angular app */
    'app/scripts/**/*.js',
    'app/scripts/app.js',
    'app/views/*.html',
  ],
  less: [
    './node_modules/bootstrap/less/bootstrap.less',
    './app/less/*.less'
  ]
}
gulp.task('app', function() {
  return gulp.src(paths.app)
    .pipe(webpack({
      devtool: "source-map",
      output: {
        filename: "app.js",
        sourceMapFilename: "app.js.map"
      },
      resolve: {
        alias: {
          module: __dirname + '/app/scripts/app.js',
          templates: __dirname + '/app/templates'
        }
      },
      module: {
        loaders: [
          {
              test: /\.html$/,
              loader: "ng-cache"
          }
        ]
      }
    }))
    .pipe(gulp.dest('app/dist'));
});
gulp.task('compile', function() {
  return gulp.src(paths.app)
    .pipe(webpack({
      output: {
        filename: "app.js"
      },
      resolve: {
        alias: {
          module: __dirname + '/app/scripts/app.js',
          templates: __dirname + '/app/templates'
        }
      },
      module: {
        loaders: [
          { test: /\.html$/, loader: "ng-cache" }
        ]
      },
      plugins: [
        new uglify({ minimize: true })
      ]
    }))
    .pipe(gulp.dest('app/dist'));
});

gulp.task('less', function () {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./app/dist'));
});

gulp.task('default', function() {
  runSequence(['app', 'less']);
});

gulp.task('watch', function() {
  runSequence(
    ['app', 'less'],
    function() {
      gulp.watch(paths.app, ['app']);
      gulp.watch(paths.less, ['less']);
    }
  );

});
