const merge = require("webpack-merge");

const parts = require("./common/webpack.parts");

module.exports = PATHS =>
  merge([
    parts.clean(`${PATHS.build}/**/*`, {
      root: PATHS.root,
      verbose: false
    }),

    parts.entry("client", ["babel-polyfill", `${PATHS.src}/client.js`]),
    parts.entry("server", [`${PATHS.src}/server.js`]),

    parts.output({
      chunkFilename: "[name].chunk.js",
      filename: "[name].js"
    }),

    parts.extractCSS({
      use: ["css-loader", "sass-loader"]
    }),

    parts.loadImages(),

    parts.addImportsToServerHTML()
  ]);
