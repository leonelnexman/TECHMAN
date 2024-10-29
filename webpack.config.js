const webpack = require('webpack');
const path = require('path');
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const config = require('./gulp/config');

function createConfig(env) {
  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  const isProduction = env === 'production';

  const webpackConfig = {
    mode: isProduction ? 'production' : 'development',
    context: path.join(__dirname, config.src.js),
    entry: {
      app: './app.js',
    },
    output: {
      path: path.join(__dirname, config.dest.js),
      filename: '[name].js',
      publicPath: 'js/',
    },
    devtool: isProduction ?
        'source-map' :
        'eval-cheap-module-source-map',
    plugins: [
      new ESLintPlugin({
        exclude: [
          `/node_modules/`,
          `${__dirname}/src/js/lib/`
        ],
        fix: true,
        cache: true,
      }),
      new webpack.DefinePlugin({
        'process.env.DEV': !isProduction
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new webpack.NoEmitOnErrorsPlugin(),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false,
      }),

      new WebpackBar()
    ],
    // resolve: {
    //   extensions: ['.js'],
    //   alias: {
    //     TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
    //     TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
    //     TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
    //     TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js')
    //   },
    // },
    optimization: {
      minimize: isProduction,
      //   splitChunks: {
      //       cacheGroups: {
      //           vendor: {
      //               chunks: 'initial',
      //               test: /node_modules|bower_components/,
      //               name: 'vendor',
      //               enforce: true,
      //           },
      //       },
      //   },
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2015'  // Syntax to compile to (see options below for possible values)
        })
      ]
    },
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   loader: 'babel-loader',
        //   exclude: [
        //     path.resolve(__dirname, 'node_modules'),
        //   ],
        // },
        {
          test: /\.js$/,
          loader: 'esbuild-loader',
          options: {
            target: 'es2015'  // Syntax to compile to (see options below for possible values)
          }
        },
        {test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/},
        {test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/}
      ],
    },
  };

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
