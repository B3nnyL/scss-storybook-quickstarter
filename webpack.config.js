const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: ["./src/main.scss"],
  output: {
    path: __dirname + "/dist/"
  },
  module: {
    rules: [
      /*
      your other rules for JavaScript transpiling go in here
      */
      {
        // css / sass / scss loader for webpack
        test: /\.(css|sass|scss)$/,
        use: [ExtractCssChunks.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
            ascii_only: true
          },
          compress: {
            comparisons: false
          }
        }
      })
    ]
  },
  plugins: [
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
      orderWarning: true, // Disable to remove warnings about conflicting order between imports
      reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      cssModules: true // if you use cssModules, this can help.
    })
  ]
};
