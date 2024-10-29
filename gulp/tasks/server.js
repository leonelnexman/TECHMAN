const gulp = require("gulp");
const browseeSync = require("browser-sync");
const minimist = require("minimist");
const config = require("../config");

const args = minimist(process.argv.slice(2));
const server = browseeSync.create();

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me

gulp.task("server", (done) => {
  server.init({
    server: {
      baseDir: !config.production
        ? [config.dest.root, config.src.root]
        : config.dest.root,
      directory: false,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
    files: [
      `${config.dest.html}/*.html`,
      `${config.dest.css}/*.css`,
      `${config.dest.img}/**/*`,
    ],
    port: args.port || 8080,
    logLevel: "info", // 'debug', 'info', 'silent', 'warn'
    logConnections: false,
    logFileChanges: true,
    open: Boolean(args.open),
    notify: false,
    ghostMode: false,
    online: Boolean(args.tunnel),
    tunnel: args.tunnel || null,
  });
  done();
});

const build = (gulp) => gulp.parallel("server");

module.exports.build = build;
module.exports.server = server;
