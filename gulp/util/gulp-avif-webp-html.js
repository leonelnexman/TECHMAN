const { obj } = require("through2");
const PluginError = require("plugin-error");

const ENABLED_FORMATS = [".jpg", ".png", ".jpeg", "JPG"];

const pictureRender = (url, imgTag) => {
  return `<picture><source srcset="${url[1]}" type="image/webp">${imgTag}</picture>`;
};

function webpHTML() {
  return obj(async function (file, enc, callback) {
    const self = this;

    if (file.isNull()) {
      callback(null, file);
      return;
    }

    if (file.isStream()) {
      callback(
        new PluginError("gulp-avif-webp-html", "Streaming not supported")
      );
      return;
    }

    try {
      let inPicture = false;

      const data = file.contents
        .toString()
        .split("\n")
        .map((line) => {
          if (line.indexOf("<picture") + 1) inPicture = true;
          if (line.indexOf("</picture") + 1) inPicture = false;

          if (line.indexOf("<img") + 1 && !inPicture) {
            const Re = /<img([^>]+)src=[\"\'](\S+)[\"\']([^>\/]+)\/?>/gi;
            const regexpArray = Re.exec(line);

            if (regexpArray === null) return line;

            const imgTag = regexpArray[0];
            const srcImage = regexpArray[2];
            let newAvifUrl = srcImage;
            let newWebpUrl = srcImage;

            if (imgTag.indexOf("data") + 1) return line;

            const even = (el) => srcImage.indexOf(el) !== -1;
            if (!ENABLED_FORMATS.some(even)) return line;

            ENABLED_FORMATS.forEach((ext) => {
              newWebpUrl = newWebpUrl.replace(ext, ".webp");
              newAvifUrl = newAvifUrl.replace(ext, ".avif");
            });

            const newHTML = pictureRender([newAvifUrl, newWebpUrl], imgTag);

            return line.replace(imgTag, newHTML);
          }
          return line;
        })
        .join("\n");

      file.contents = new Buffer.from(data);
      this.push(file);
    } catch (err) {
      callback(new PluginError("gulp-avif-webp-html", err));
    }

    callback();
  });
}

module.exports = webpHTML;
