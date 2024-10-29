const gulp = require("gulp");
const plumber = require("gulp-plumber");
const spritesmith = require("gulp.spritesmith");
const buffer = require("vinyl-buffer");
const imagemin = require("gulp-imagemin");
const merge = require("merge-stream");
const config = require("../config");

gulp.task("sprite:png", () => {
  const spritesData = gulp
    .src(`${config.src.iconsPng}/*.png`)
    .pipe(
      plumber({
        errorHandler: config.errorHandler,
      })
    )
    .pipe(
      spritesmith({
        imgName: "sprite.png",
        cssName: "_sprite-png.scss",
        imgPath: "../img/sprite.png",
        // retinaSrcFilter: `${config.src.iconsPng  }/*@2x.png`,
        // retinaImgName: 'sprite@2x.png',
        // retinaImgPath: '../img/sprite@2x.png',
        padding: 2,
        algorithm: "binary-tree",
        cssTemplate: `${__dirname}/sprite-png/_sprites.hbs`, // _sprites-retina.hbs
        // ,
        // cssVarMap: function(sprite) {
        //     sprite.name = 'icon-' + sprite.name;
        // }
      })
    );

  return merge(
    spritesData.img
      .pipe(buffer())
      .pipe(
        imagemin({
          optimizationLevel: 3,
        })
      )
      .pipe(gulp.dest(config.dest.img)),
    spritesData.css.pipe(gulp.dest(config.src.sassGen))
  );
});

const build = (gulp) => gulp.series("sprite:png");
const watch = (gulp) => () =>
  gulp.watch(`${config.src.iconsPng}/*.png`, gulp.parallel("sprite:png"));

module.exports.build = build;
module.exports.watch = watch;
