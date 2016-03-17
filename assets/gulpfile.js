/*--------------------------*\
    Gulp 构建脚本
\*--------------------------*/
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var buildPath = "./dist";
var srcPath = "./src";

// //HTML处理
// gulp.task('build-html',function(){
//   gulp.src(srcPath + "/views/**/*.html")
//         .pipe(plugins.htmlmin({collapseWhitespace: true})) /* {collapseWhitespace: true} */
//         .pipe(gulp.dest(buildPath + '/views'));
// });

// 图片处理
gulp.task('build-images',function(){
  gulp.src(srcPath + "/images/**/*.{gif,jpg,png}")
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(buildPath + '/images'));
});

// js图片处理
gulp.task('build-js-images',function(){
  gulp.src(srcPath + "/lib/**/*.{gif,jpg,png}")
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(buildPath + '/lib'));
});

// js图片处理
gulp.task('topic-images',function(){
  gulp.src(srcPath + "/topic/**/*.{gif,jpg,png}")
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(buildPath + '/topic'));
});

//css 处理
gulp.task("build-css", function () {
    gulp.src(srcPath + "/css/**/*.css")
        .pipe(plugins.minifyCss({compatibility: "ie7"}))
        // .pipe(plugins.rename(function (path) {
        //     path.basename += ".min";
        // }))
        .pipe(gulp.dest(buildPath + "/css"));
});

//css 处理
gulp.task("topic-css", function () {
    gulp.src(srcPath + "/topic/**/*.css")
        .pipe(plugins.minifyCss({compatibility: "ie7"}))
        // .pipe(plugins.rename(function (path) {
        //     path.basename += ".min";
        // }))
        .pipe(gulp.dest(buildPath + "/topic"));
});

// 处理 js组件中的css
gulp.task("lib-css", function () {
    gulp.src(srcPath + "/lib/**/*.css")
        .pipe(plugins.minifyCss({compatibility: "ie7"}))
        // .pipe(plugins.rename(function (path) {
        //     path.basename += ".min";
        // }))
        .pipe(gulp.dest(buildPath + "/lib"));
});

// JavaScript lib
gulp.task("js-lib", function () {
    gulp.src(['srcPath + "/lib/**/*.js"', '!/webuploader/'])
        .pipe(plugins.uglify()) //{mangle:false} 不压缩变量名称
        // .pipe(plugins.rename(function (path) {
        //     path.basename += ".min";
        // }))
        .pipe(gulp.dest(buildPath + "/lib"));
});

// JavaScript pages
gulp.task("js-pages", function () {
    var config = {
        mangle: {except: ['define', 'require', 'module', 'exports']},
        compress: false
    };
    gulp.src(srcPath + "/pages/**/*.js")
        .pipe(plugins.uglify(config))
        .pipe(gulp.dest(buildPath + "/pages"));
});

// JavaScript pages
gulp.task("qtydfont", function () {
    gulp.src(srcPath + "/fonts/**/*")
        // .pipe(plugins.uglify(config))
        .pipe(gulp.dest(buildPath + "/fonts"));
});

//build html
// gulp.watch(srcPath + "/static/**/*.html", ["build-html"]);

// build images
gulp.watch(srcPath + "/images/**/*", ["build-images"]);
// build images
gulp.watch(srcPath + "/lib/**/*", ["build-js-images"]);

// build images
gulp.watch(srcPath + "/topic/**/*", ["topic-images"]);

// build css
gulp.watch(srcPath + "/css/**/*", ["build-css"]);

// build css
gulp.watch(srcPath + "/topic/**/*", ["topic-css"]);

// ui dialog css
gulp.watch(srcPath + "/modules/**/*.css", ["lib-css"]);

// JavaScript lib
gulp.watch(srcPath + "/lib/**/*.js", ["js-lib"]);

// JavaScript page
gulp.watch(srcPath + "/pages/**/*.js", ["js-pages"]);

// JavaScript page
gulp.watch(srcPath + "/pages/**/*", ["qtydfont"]);

// gulp命令默认启动
gulp.task("default", ["qtydfont","build-images","build-js-images","topic-images","build-css","lib-css","topic-css","js-lib","js-pages"]);