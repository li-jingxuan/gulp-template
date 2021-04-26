const gulp = require('gulp')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const cleanCss=require("gulp-clean-css")
const uglify = require("gulp-uglify")
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create()

gulp.task(
  'scss',
  function() {
    return gulp.src('./src/css/**/*.scss')
    .pipe(sass())
    // 不需要合并css
    // .pipe(concat('all.css'))
    .pipe(
      cleanCss({
        compatibility:"ie8" // 让css兼容到ie8
      })
    )
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest("./dist/css/"))
  }
)

gulp.task(
  'js',
  function() {
    return gulp.src('./src/js/**/*.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'))
  }
)

gulp.task(
  'html',
  function() {
    return gulp.src('./src/html/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/html/'))
  }
)

gulp.task(
  'image',
  function() {
    return gulp.src('./src/images/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest('./dist/images/'))
  }
)

// Glup默认任务，开发用 
gulp.task('default', gulp.series('js', 'scss', 'html', 'image', function() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: 'html/index.html',
    },
    port: 8080
  })

  // 项目启动先批量执行一次任务
  gulp.watch('./src/js/**/*.js', gulp.series('js')).on('change', browserSync.reload)
  gulp.watch('./src/css/**/*.scss', gulp.series('scss')).on('change', browserSync.reload)
  gulp.watch('./src/html/**/*.html', gulp.series('html')).on('change', browserSync.reload)
  gulp.watch('./src/image/**/*.image', gulp.series('image')).on('change', browserSync.reload)
}))
