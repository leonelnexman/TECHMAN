const gulp = require("gulp");
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("../util/gulp-avif");
const config = require("../config");

gulp.task("copy:img", () =>
  gulp
    .src([
      `${config.src.img}/**/*.{jpg,png,jpeg,webp,svg,gif}`,
      `!${config.src.img}/svgo/**/*.*`,
      `!${config.src.img}/compressed/*`,
      `!${config.src.img}/sprites/**/*.*`,
    ])
    .pipe(
      cache(
        imagemin(
          [
            imagemin.gifsicle({
              interlaced: true,
              optimizationLevel: 3,
            }),
            imagemin.mozjpeg({
              quality: 85,
            }),
            imagemin.optipng(),
            imagemin.svgo({
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            }),
          ],
          {
            verbose: true,
          }
        )
      )
    )
    .pipe(gulp.dest(config.dest.img))
);

gulp.task("copy:webp", () =>
  gulp
    .src([
      `${config.src.img}/**/*.{jpg,png,jpeg}`,
      `!${config.src.img}/compressed/**`,
      `!${config.src.img}/sprites/**`,
    ])
    .pipe(
      cache(
        webp({
          quality: 75,
        }),
        {
          name: "webp",
        }
      )
    )
    .pipe(gulp.dest(config.dest.img))
);

gulp.task("copy:avif", () =>
  gulp
    .src([
      `${config.src.img}/**/*.{jpg,png,jpeg}`,
      `!${config.src.img}/compressed/**`,
      `!${config.src.img}/sprites/**`,
    ])
    .pipe(
      cache(
        avif({
          quality: 70,
          verbose: true,
        }),
        {
          name: "avif",
        }
      )
    )
    .pipe(gulp.dest(config.dest.img))
);

gulp.task("copy:compressed", () =>
  gulp
    .src(`${config.src.img}/compressed/*.{jpg,png,jpeg,gif}`)
    .pipe(
      avif({
        lossless: true,
      })
    )
    .pipe(gulp.dest(config.dest.img))

    .pipe(
      gulp.src(
        `${config.src.img}/compressed/*.{jpg,png,jpeg,webp,avif,svg,gif}`
      )
    )
    .pipe(gulp.dest(config.dest.img))

    .pipe(
      gulp.src(`${config.src.img}/compressed/*.{jpg,png,jpeg,avif,svg,gif}`)
    )
    .pipe(
      webp({
        nearLossless: 80,
      })
    )
    .pipe(gulp.dest(config.dest.img))
);

gulp.task("copy:video", () =>
  gulp.src(`${config.src.img}/**/*.mp4`).pipe(gulp.dest(config.dest.img))
);

gulp.task("copy:fonts", () =>
  gulp
    .src(`${config.src.fonts}/*.{ttf,eot,woff,woff2}`)
    .pipe(gulp.dest(config.dest.fonts))
);

gulp.task("copy:data", () =>
  gulp.src(`${config.src.data}/**/*.*`).pipe(gulp.dest(config.dest.data))
);

gulp.task("copy:lib", () =>
  gulp.src(`${config.src.lib}/**/*.*`).pipe(gulp.dest(config.dest.lib))
);

gulp.task("copy:rootfiles", () =>
  gulp.src(`${config.src.root}/*.*`).pipe(gulp.dest(config.dest.root))
);

const build = (gulp) =>
  gulp.series(
    "copy:img",
    "copy:webp",
    // 'copy:avif',
    "copy:compressed",
    "copy:video",
    "copy:fonts",
    "copy:rootfiles"
  );
const watch = (gulp) => () =>
  gulp.watch(
    `${config.src.img}/**/*`,
    gulp.parallel(
      "copy:img",
      "copy:webp",
      // 'copy:avif',
      "copy:compressed",
      "copy:fonts"
    )
  );

module.exports.build = build;
module.exports.watch = watch;
