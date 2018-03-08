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

    parts.extractCSS({
      use: [
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    }),

    parts.loadImages(),

    // parts.generateSourceMaps({ type: "source-map" }),
    parts.generateSourceMaps({ type: "cheap-module-source-map" }),

    parts.addImportsToServerHTML()
  ]);
