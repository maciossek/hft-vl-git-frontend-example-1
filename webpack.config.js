const resolve = require("path").resolve;
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = function(env) {
  const config = {
    entry: {
      main: [
        "webpack-dev-server/client?http://0.0.0.0:3001",
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        "./index.js"
        // the entry point of our app
      ]
    },
    output: {
      filename: "[name].[hash].js",
      chunkFilename: "[name].[hash].js",
      // the output bundle

      path: resolve(__dirname, "./dist"),

      publicPath: "/"
      // necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, "./src"),
    devtool: "source-map",
    watch: false,
    devServer: {
      contentBase: resolve(__dirname, "./dist"),
      // match the output path

      publicPath: "/"
      // match the output `publicPath`
    },

    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: devMode
              }
            },
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: ["file-loader"]
        },
        {
          test: /\.html$/i,
          loader: "html-loader"
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, "./src/index.html"),
        hash: false,
        filename: "index.html",
        inject: "body",
        minify: {
          collapseWhitespace: true
        }
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: devMode ? "[name].css" : "[name].[hash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
      }),
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Tether: "tether",
        "window.Tether": "tether",
        Popper: ["popper.js", "default"]
      })
    ]
  };

  return config;
};
