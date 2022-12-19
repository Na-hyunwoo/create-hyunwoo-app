const HtmlWebpackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");
const { getOptions } = require("eslint-webpack-plugin/types/options");

module.exports = (env, option) => {
  return {
    entry: "./index.js",
    output: {
      path: path.join(__dirname, "/build"),
      publicPath: "/",
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(css|scss|sass)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", "scss"],
    },
    devServer: {
      contentBase: path.join(__dirname, "/build"),
      publicPath: "/",
      hot: true,
      inline: true,
      host: "localhost",
      port: 3000,
      historyApiFallback: true,
    },
    devtool: getOptions.mode === "production" ? false : "inline-source-map",
    plugins: [
      new ErrorOverlayPlugin(),
      new CleanWebpackPlugin(),
      new ESLintPlugin(),
      new HtmlWebpackPlugin({
        template: "index.html",
        favicon: "./assets/favicon.icon",
      }),
      new WebpackManifestPlugin({
        fileName: "manifest.json",
        basePath: "./assets/",
      })
    ],
    target: "web",
    performance: {
      hints: false,
    }
  }
}