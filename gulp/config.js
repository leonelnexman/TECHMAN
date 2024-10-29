const log = require("fancy-log");
const colors = require("ansi-colors");
const minimist = require("minimist");
const errorHandler = require("./util/handle-errors");

const args = minimist(process.argv.slice(2));

const production =
  args.production || args.prod || args._.indexOf("build") !== -1 || false;
const destPath = "build";

const config = {
  env: "development",
  production,
  sourceMaps: !production,

  src: {
    root: "src",
    templates: "src/templates",
    templatesData: "src/templates/data",
    pagelist: "src/index.yaml",
    sass: "src/sass",
    // path for sass files that will be generated automatically via some of tasks
    sassGen: "src/sass/generated",
    js: "src/js",
    img: "src/img",
    svg: "src/img/svg",
    icons: "src/img/sprites",
    // path to png sources for sprite:png task
    iconsPng: "src/img/sprites/png",
    // path to svg sources for sprite:svg task
    iconsSvg: "src/img/sprites/svg",
    // path to svg sources for iconfont task
    iconsFont: "src/icons",
    fonts: "src/fonts",
    lib: "src/lib",
    data: "src/data",
  },
  dest: {
    root: destPath,
    html: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js`,
    img: `${destPath}/img`,
    fonts: `${destPath}/fonts`,
    lib: `${destPath}/lib`,
    data: `${destPath}/data`,
  },

  setEnv(env) {
    if (typeof env !== "string") return;
    this.env = env;
    this.production = env === "production";
    process.env.NODE_ENV = env;
  },

  logEnv() {
    log("Environment:", colors.white.bgRed(` ${process.env.NODE_ENV} `));
  },

  errorHandler,
};

config.setEnv(production ? "production" : "development");

module.exports = config;
