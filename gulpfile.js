var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var del = require("del");

var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var cssnano = require("gulp-cssnano");
var data = require("gulp-data");
var nunjucksRender = require("gulp-nunjucks-render");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify-es").default;

// Sass files
gulp.task("sass", function() {
  return gulp
    .src("app/styles/index.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cssnano())
    .pipe(rename("style.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({ stream: true }));
});

// Image files
gulp.task("img", function() {
  return gulp
    .src("app/img/**/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(gulp.dest("dist/img"));
});

// JavaScript files
gulp.task("js", function() {
  return gulp
    .src("app/js/**/*.js")
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// HTML + Nunjucks files
gulp.task("nunjucks", function() {
  return gulp
    .src("app/pages/**/*.+(html|njk|nunjucks)")
    .pipe(
      data(function() {
        return require("./app/data.json");
      })
    )
    .pipe(
      nunjucksRender({
        path: ["app/templates"]
      })
    )
    .pipe(gulp.dest("dist"));
});

// This task ensures that the nunjucks task is complete before reloading the browser
gulp.task("nunjucks-html-watch", ["nunjucks"], function() {
  browserSync.reload();
});

// Remove dist dir
gulp.task("rmvdist", function() {
  return del.sync("dist");
});

// Server + watching scss/html files
gulp.task("serve", ["sass", "nunjucks-html-watch"], function() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

  gulp.watch("app/styles/**/*.scss", ["sass"]);
  gulp.watch("app/pages/**/*.+(html|njk|nunjucks)", ["nunjucks-html-watch"]);
});

// Compile project
gulp.task("build-project", ["sass", "js", "img", "nunjucks"]);
gulp.task("default", ["rmvdist", "build-project", "serve"]);
