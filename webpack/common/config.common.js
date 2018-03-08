const merge = require("webpack-merge");

const parts = require("./webpack.parts");

function isVendor({ resource }) {
  return (
    resource && resource.indexOf("node_modules") >= 0 && resource.match(/\.js$/)
  );
}

module.exports = PATHS =>
  merge([
    // parts.mode("development"),

    parts.output({
      path: PATHS.build,
      filename: "[name].js",
      publicPath: PATHS.contextPath,
      chunkFilename: "[name].chunk.js",
      library: "BeInformed"
    }),

    parts.addAlias("beinformed", PATHS.src + "/beinformed/"),

    // parts.optimization(),
    parts.extractBundles([
      {
        name: "vendor.universal",
        chunks: ["client", "server"],
        minChunks: isVendor
      },
      {
        name: "common.universal",
        chunks: ["client", "server"],
        minChunks: (module, count) => {
          return count >= 2 && !isVendor(module);
        }
      },
      {
        name: "manifest",
        minChunks: Infinity
      }
    ]),

    parts.filterMomentLocales(/en|nl/),

    parts.lintJavaScript({ include: PATHS.src }),
    parts.lintCSS({ include: PATHS.src }),
    parts.loadJavaScript({ include: PATHS.src }),
    parts.loadFonts({
      options: {
        name: "[name].[ext]"
      }
    }),
    parts.loadAssets({
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.scss$/,
        /\.json$/,
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.eot/,
        /\.ttf/,
        /\.woff/,
        /\.woff2/
      ],
      options: {
        name: "[name].[ext]"
      }
    }),

    parts.copy(
      {
        glob: "./src/**/LayoutHintConfig.json"
      },
      "LayoutHintConfig.json"
    ),

    parts.stats(),

    parts.watchOptions(),

    parts.progressBar()
  ]);
