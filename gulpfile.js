var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cache = require('gulp-cache');
var del = require('del');
var path = require('path');
var fileinclude = require('gulp-file-include');

const dir = {
    src: {
      path: "./src/",
      images: "./src/img/",
      data: "./src/assets/",
      css: "./src/css/",
      js: "./src/js/",
      commonFiles: "./src/common/",
      pages: "./src/pages/"
    },
    dist: {
      path: "./dist/",
      images: "./dist/img/",
      data: "./dist/assets/",
      css: "./dist/css/",
      js: "./dist/js/",
      commonFiles: "./dist/common/",
      pages: "./dist/pages/"
    }
  };

  const extension = {
    template: "*.html",
    style: "*",
    image: "*",
    script: "*.js",
    data: "*"
  };

  gulp.task('browser-sync', function () {
    browserSync.init({
      server: {
        baseDir: 'dist',
        routes: {
          '/about': 'dist/pages/about.html',
          '/contact': 'dist/pages/contact.html',
          '/services': 'dist/pages/services.html',
          '/home': 'dist/index.html'
        }
      }
    })
  });

  function reload() {
    browserSync.reload();
  }

  function cleanDist(){
    return del([`${dir.dist.path}`]);
  }

  function copyhtml() {
    return gulp.src(`${dir.src.path + extension.template}`,{ since: gulp.lastRun(copyhtml) })
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
      .pipe(gulp.dest(`${dir.dist.path}`))
      .pipe(browserSync.reload({ stream: true }));
  }

  function copyPagehtml() {
    return gulp.src(`${dir.src.pages + extension.template}`, { since: gulp.lastRun(copyPagehtml) })
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
      .pipe(gulp.dest(`${dir.dist.pages}`))
      .pipe(browserSync.reload({ stream: true }));
  }

  function copyCommonFiles() {
    return gulp.src(`${dir.src.commonFiles + extension.template}`, { since: gulp.lastRun(copyCommonFiles) })
      .pipe(gulp.dest(`${dir.dist.commonFiles}`))
      .pipe(browserSync.reload({ stream: true }));
  }

  function copyImage() {
    return gulp.src(`${dir.src.images + extension.image}`, { since: gulp.lastRun(copyImage) })
      .pipe(gulp.dest(`${dir.dist.images}`))
      .pipe(browserSync.reload({ stream: true }));
  }

  function copyDataFiles() {
    return gulp.src(`${dir.src.data + extension.data}`, { since: gulp.lastRun(copyDataFiles) })
      .pipe(gulp.dest(`${dir.dist.data}`))
      .pipe(browserSync.reload({ stream: true }));
  }
  
  function copyCSS() {
    return gulp.src(`${dir.src.css + extension.style}`, { since: gulp.lastRun(copyCSS) })
      .pipe(gulp.dest(`${dir.dist.css}`))
      .pipe(browserSync.reload({ stream: true }));
  }

  function copyJS() {
    return gulp.src(`${dir.src.js + extension.script}`, { since: gulp.lastRun(copyJS) })
      .pipe(gulp.dest(`${dir.dist.js}`))
      .pipe(browserSync.reload({ stream: true }));
  }

  
  function watchhtml() {
    return gulp.watch(`${dir.src.path + extension.template}`, gulp.parallel(copyhtml));
  }

  function watchPagehtml() {
    return gulp.watch(`${dir.src.pages + extension.template}`, gulp.parallel(copyPagehtml));
  }

  function watchCommonFiles() {
    return gulp.watch(`${dir.src.commonFiles + extension.template}`, gulp.parallel(copyCommonFiles));
  }

  function watchCSS() {
    return gulp.watch(`${dir.src.css + extension.style}`, gulp.series(copyCSS, function (done) {
      browserSync.reload();
      done();
    }))
      .on('unlink', function (filepath) {
        var filePathFromSrc = path.relative(path.resolve(`${dir.src.css}`), filepath);
        var destFilePath = path.resolve(`${dir.dist.css}`, filePathFromSrc);
        del.sync(destFilePath);
        reload();
      });
  }

  function watchJS() {
    return gulp.watch(`${dir.src.js + extension.script}`, gulp.parallel(copyJS))
      .on('unlink', function (filepath) {
        var filePathFromSrc = path.relative(path.resolve(`${dir.src.js}`), filepath);
        var destFilePath = path.resolve(`${dir.dist.js}`, filePathFromSrc);
        del.sync(destFilePath);
        reload();
      });
  }
  
  function watchImage() {
    return gulp.watch(`${dir.src.images + extension.image}`, gulp.parallel(copyImage))
      .on('unlink', function (filepath) {
        var filePathFromSrc = path.relative(path.resolve(`${dir.src.images}`), filepath);
        var destFilePath = path.resolve(`${dir.dist.images}`, filePathFromSrc);
        del.sync(destFilePath);
        reload();
      });
  }

  function watchDataFiles() {
    return gulp.watch(`${dir.src.data + extension.data}`, gulp.parallel(copyDataFiles))
      .on('unlink', function (filepath) {
        var filePathFromSrc = path.relative(path.resolve(`${dir.src.data}`), filepath);
        var destFilePath = path.resolve(`${dir.dist.data}`, filePathFromSrc);
        del.sync(destFilePath);
        reload();
      });
  }


gulp.task('copy', gulp.parallel(copyCSS, copyJS, copyCommonFiles, copyPagehtml, copyhtml, copyPagehtml, copyImage, copyDataFiles));
gulp.task('watch', gulp.parallel(watchPagehtml, watchCommonFiles, watchhtml, watchCSS, watchJS, watchImage, watchJS, watchDataFiles));
gulp.task('default',gulp.series(cleanDist, gulp.parallel('browser-sync','copy', 'watch')));
   

