const gulp = require("gulp");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const svgStore = require("gulp-svgstore");
const rename = require("gulp-rename");
const cheerio = require("cheerio");
const gulpcheerio = require("gulp-cheerio");
const through2 = require("through2");
const consolidate = require("gulp-consolidate");
const config = require("../config");

gulp.task("sprite:svg", () =>
  gulp
    .src(`${config.src.iconsSvg}/*.svg`)
    .pipe(
      imagemin([
        imagemin.svgo({
          multipass: true,
          js2svg: {
            pretty: true,
            indent: 2,
          },
          plugins: [
            "sortAttrs",
            "removeDesc",
            "cleanupIDs",
            {
              name: "removeViewBox",
              active: false,
            },
            "mergePaths",
          ],
        }),
      ])
    )
    .pipe(
      gulpcheerio({
        run($, file) {
          $('[fill]:not([fill="currentColor"])').removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          const $svg = $("svg");
          let w;
          let h;
          let size;
          if ($svg.attr("height")) {
            w = $svg.attr("width").replace(/\D/g, "");
            h = $svg.attr("height").replace(/\D/g, "");
          } else {
            size = $svg.attr("viewbox").split(" ").splice(2);
            [w, h] = size;
            $svg.attr("width", parseInt(w, 10));
            $svg.attr("height", parseInt(h, 10));
          }
          $svg.attr("viewBox", `0 0 ${parseInt(w, 10)} ${parseInt(h, 10)}`);
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(
      plumber({
        errorHandler: config.errorHandler,
      })
    )
    .pipe(rename({ prefix: "icon-" }))
    .pipe(svgStore({ inlineSvg: false }))
    .pipe(
      through2.obj(function (file, encoding, cb) {
        const $ = cheerio.load(file.contents.toString(), { xmlMode: true });
        const data = $("svg > symbol")
          .map(function () {
            const $this = $(this);
            const size = $this.attr("viewBox").split(" ").splice(2);
            const name = $this.attr("id");
            const ratio = size[0] / size[1]; // symbol width / symbol height
            const fill = $this
              .find('[fill]:not([fill="currentColor"])')
              .attr("fill");
            const stroke = $this.find("[stroke]").attr("stroke");

            return {
              name,
              ratio: +ratio.toFixed(2),
              fill: fill || "initial",
              stroke: stroke || "initial",
            };
          })
          .get();
        this.push(file);
        gulp
          .src(`${__dirname}/sprite-svg/_sprite-svg.scss`)
          .pipe(
            consolidate("lodash", {
              symbols: data,
            })
          )
          .pipe(gulp.dest(config.src.sassGen));
        cb();
      })
    )
    .pipe(rename({ basename: "sprite" }))
    .pipe(gulp.dest(config.dest.img))
);

const build = (gulp) => gulp.series("sprite:svg");
const watch = (gulp) => () =>
  gulp.watch(`${config.src.iconsSvg}/*.svg`, gulp.parallel("sprite:svg"));

module.exports.build = build;
module.exports.watch = watch;
