const merge = require("webpack-merge");
// const glob = require("glob");

const parts = require("./common/webpack.parts");

module.exports = PATHS =>
  merge([
    parts.clean(`${PATHS.build}/**/*`, {
      root: PATHS.root
    }),

    parts.entry("client", ["babel-polyfill", `${PATHS.src}/client.js`]),
    parts.entry("server", [`${PATHS.src}/server.js`]),

    parts.output({
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].chunk.js"
    }),

    parts.extractCSS({
      use: [
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        },
        parts.autoprefix({ options: { sourceMap: true } }),
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    }),

    parts.loadImages({
      options: {
        limit: 10000,
        name: "[name].[ext]"
      }
    }),

    parts.concatModules(),

    parts.minifyJavaScript(),

    parts.generateSourceMaps({ type: "source-map" }),

    // // parts.purifyCSS({
    // //   paths: glob.sync(`${PATHS.src}/**/*.js`, { nodir: true })
    // // }),

    parts.minifyCSS({
      options: {
        discardComments: {
          removeAll: true
        },
        // Run cssnano in safe mode to avoid
        // potentially unsafe transformations.
        safe: true
      }
    }),

    parts.optimizeImages(),

    parts.setFreeVariable("process.env.NODE_ENV", "production"),

    parts.addImportsToServerHTML()
  ]);
