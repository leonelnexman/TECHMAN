const del = require("del");
const log = require("fancy-log");
const colors = require("ansi-colors");
const config = require("../config");

const build = () =>
  function () {
    return del([config.dest.root]).then((paths) =>
      log("Deleted:", colors.magenta(paths.join("\n")))
    );
  };

module.exports.build = build;
