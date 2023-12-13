const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

//создание сервера в реальном времени
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
} 

//перенос html в dist
function html() {
  return gulp.src('src/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

//склеивание в bundle.css в папку dist
function css() {
  return gulp.src('src/blocks/**/*.css')
        .pipe(plumber())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

//перенос изображений
function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
}

//перенос скриптов
function scripts() {
  return gulp.src('src/scripts/**/*.{js}')
            .pipe(gulp.dest('dist/scripts'))
            .pipe(browserSync.reload({stream: true}));
}

//Очистка папки dist
function clean() {
  return del('dist');
}

//отслеживание
function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/scripts/**/*.{js}'], scripts);
}

//очистить папку dist и в параллельном режиме выполним задачи сборки HTML, CSS и изображений.
const build = gulp.series(clean, gulp.parallel(html, css, images, scripts));

//параллельное выполнение build и отслеживание
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images;
exports.clean = clean; 

exports.watchapp = watchapp;
exports.build = build; 
exports.default = watchapp; 