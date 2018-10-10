var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    fileinclude = require('gulp-file-include'),
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    plumber = require('gulp-plumber'), // Чтоб при ошибке не падал сервер
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function () { // Создаем таск Sass
    return gulp.src('app/scss/**/*.scss') // Берем источник
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 9', 'ie 10'], {cascade: true})) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        host: 'localhost',
        port: 1337,
        notify: false // Отключаем уведомления
    });
});

gulp.task('fileinclude', function () {
    gulp.src(['app/templates/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

gulp.task('scripts', function () {
    return gulp.src(['app/js/libs/*.js'])
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', ['browser-sync', 'scripts'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/templates/*.html', ['fileinclude']);
    gulp.watch('app/chunks/*.html', ['fileinclude']);
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function () {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'sass', 'scripts'], function () {

    var buildCss = gulp.src(['app/css/style.css']) // Переносим стили в продакшн
        .pipe(gulp.dest('dist/css'));

    var buildImg = gulp.src('app/img/**/*') // Переносим шрифты в продакшн
        .pipe(gulp.dest('dist/img'));

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшн
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src(['app/js/libs.js', 'app/js/common.js']) // Переносим скрипты в продакшн
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшн
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
