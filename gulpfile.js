// 1. 必要ライブラリ
const gulp = require("gulp");
const rename = require('gulp-rename');


//アイコンフォント作成用
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const iconFontOutputDirectory = "public/";
const runTimestamp = Math.round(Date.now() / 1000);
const fontName = 'iconfont'; // シンボルフォント名


//アイコンフォント ジェネレーター
const task_iconfont = () => {
  return gulp
    .src(['src/iconfont/svg/*.svg'])
    .pipe(iconfont({
      fontName: fontName, // required
      timestamp: runTimestamp,
      formats: ['ttf', 'eot', 'woff', 'svg'],
      normalize: true,
      fontHeight: 1001
    }))
    .on('glyphs', function (glyphs, options) {
      engine = 'lodash',
        consolidateOptions = {
          glyphs: glyphs,
          fontName: fontName,
          timestamp: runTimestamp,
          fontPath: '/fonts/', // フォントパスをCSSからの相対パスで指定
          className: 'iconfont', // CSSのフォントのクラス名を指定
        }
      // シンボルフォント用のscssを作成
      // src('src/templates/iconfont.scss')
      //     .pipe(consolidate(engine, consolidateOptions))
      //     .pipe(rename({ basename:fontName }))
      //     .pipe(dest('dest/css/')); // SCSSの吐き出し先を指定
      // シンボルフォント用のcssを作成
      gulp.src('src/iconfont/templates/iconfont.scss')
        .pipe(consolidate(engine, consolidateOptions))
        .pipe(rename({ basename: '_' + fontName }))
        .pipe(gulp.dest('src/styles/foundation/base/')); // SCSSの吐き出し先を指定
      gulp.src('src/iconfont/templates/iconfont-type.scss')
        .pipe(consolidate(engine, consolidateOptions))
        .pipe(rename({ basename: '_' + fontName + '-type' }))
        .pipe(gulp.dest('src/styles/foundation/base/')); // 型定義用SCSSの吐き出し先を指定
      gulp.src('src/iconfont/templates/iconfont.css')
        .pipe(consolidate(engine, consolidateOptions))
        .pipe(rename({ basename: fontName }))
        .pipe(gulp.dest('src/iconfont/')); // CSSの吐き出し先を指定
      // シンボルフォント一覧のサンプルHTMLを作成
      gulp.src('src/iconfont/templates/iconfont.html')
        .pipe(consolidate(engine, consolidateOptions))
        .pipe(rename({ basename: 'sample' }))
        .pipe(gulp.dest('src/iconfont/')); // サンプルHTMLの吐き出し先を指定
    })
    .pipe(gulp.dest(iconFontOutputDirectory + 'fonts/'));
};



//監視タスク
const task_watch = () => {
  const watches = [
    gulp.watch("src/iconfont/svg/*.svg", task_iconfont),
  ];

  watches.forEach((v) => {
    return v;
  });
};

//デフォルト実行タスク
exports.default = gulp.series(task_watch);

// exports.build = gulp.series(execute_sass_end_iconfont, task_imagemin, task_filecopy);
