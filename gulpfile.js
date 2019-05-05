let gulp = require("gulp");
let ts = require("gulp-typescript");
let tsProject = ts.createProject("tsconfig.json");
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const debug = require('gulp-debug');
var sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
const del = require('del')
var inject = require('gulp-inject');
const isDevelopement = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


gulp.task("ts:component", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("docs"));
});

gulp.task("clean", function () {
    return del('./docs')
});
gulp.task("html:inject", function () {
    let target = gulp.src('./src/index.html');
    let sources = gulp.src('./docs/flower-navigation.js', {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./docs'));
});
gulp.task("styles:light", function () {
    return gulp.src('./src/html/components/flower-navigation/light/flower-navigation.scss')
        .pipe(gulpif(isDevelopement, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(debug({title: 'sass:'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulpif(isDevelopement,sourcemaps.write()))
        .pipe(debug({title: 'prefix:'}))
        .pipe(gulp.dest('./docs'))
});
gulp.task("styles:shadow", function () {
    return gulp.src('./src/html/components/flower-navigation/shadow/flower-navigation-custom.scss')
        .pipe(gulpif(isDevelopement, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(debug({title: 'sass:'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulpif(isDevelopement,sourcemaps.write()))
        .pipe(debug({title: 'prefix:'}))
        .pipe(gulp.dest('./docs'))
});
gulp.task('copy:favicon', function () {
    return  gulp.src('./src/favicon.ico')
        .pipe(gulp.dest('./docs/'));
});
gulp.task('copy:CNAME', function () {
    return  gulp.src('./src/CNAME')
        .pipe(gulp.dest('./docs/'));
});
gulp.task('img:component', function () {
    return  gulp.src('./src/webComponent.jpg')
        .pipe(gulp.dest('./docs/'));
});
gulp.task('copy:html-index', function () {
   return  gulp.src('./src/index.html')
        .pipe(gulp.dest('./docs/'));
});
gulp.task('copy:html-index', function () {
    return  gulp.src('./src/index.html')
        .pipe(gulp.dest('./docs/'));
});
gulp.task('copy:html-component', function () {
    return  gulp.src('./src/html/components/flower-navigation/flower-navigation.html')
        .pipe(gulp.dest('./docs/'));
});
gulp.task('default', gulp.series('clean','ts:component', gulp.parallel('styles:light', 'styles:shadow','copy:html-component','copy:favicon',"html:inject",'copy:CNAME', 'img:component')));
