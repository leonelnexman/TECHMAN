const { obj } = require("through2");
const sharp = require("sharp");
const PluginError = require("plugin-error");
const prettyBytes = require("pretty-bytes");
const log = require("fancy-log");
const colors = require("ansi-colors");

const PLUGIN_NAME = "gulp-avif";
const ENABLED_FORMATS = ["png", "jpg", "jpeg"];

const optionsByDefualt = {
  quality: 90,
  lossless: false,
  speed: 5,
  chromaSubsampling: "4:2:0",
};

function avif(options) {
  return obj(async (file, enc, callback) => {
    const source = await sharp(file.contents);

    source
      .metadata()
      .then((metadata) => {
        if (!ENABLED_FORMATS.includes(metadata.format)) {
          throw new Error(`.${metadata.format} not supported`);
        }
      })
      .then(() => {
        return source.avif(Object.assign(optionsByDefualt, options)).toBuffer();
      })
      .then((stream) => {
        const originalSize = file.contents.length;
        const optimizedSize = stream.length;
        const saved = originalSize - optimizedSize;
        const percent = originalSize > 0 ? (saved / originalSize) * 100 : 0;
        const savedMsg = `saved ${prettyBytes(saved)} - ${percent
          .toFixed(1)
          .replace(/\.0$/, "")}%`;
        const msg = saved > 0 ? savedMsg : "already optimized";

        if (options.verbose) {
          log(
            `${PLUGIN_NAME}:`,
            colors.green("✔ ") + file.relative + colors.gray(` (${msg})`)
          );
        }

        file.contents = stream;
        file.extname = ".avif";
        callback(null, file);
      })
      .catch((err) => {
        callback(new PluginError(PLUGIN_NAME, err));
      });
  });
}

module.exports = avif;
