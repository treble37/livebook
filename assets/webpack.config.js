const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

// Make sure NODE_ENV is set, so that @tailwindcss/jit is in watch mode in development.
process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = (env, options) => {
  const devMode = options.mode !== "production";

  return {
    mode: options.mode || "production",
    entry: {
      app: glob.sync("./vendor/**/*.js").concat(["./js/app.js"]),
    },
    output: {
      filename: "[name].js",
      path: path.resolve(
        __dirname,
        devMode ? "../tmp/static_dev/js" : "../static/js"
      ),
      publicPath: "/js/",
    },
    devtool: devMode ? "eval-cheap-module-source-map" : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.[s]?css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ttf|woff|woff2|eot|svg)$/,
          type: "asset/resource",
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "../css/app.css" }),
      new MonacoWebpackPlugin({
        languages: [
          "markdown",
          "elixir",
          "xml",
          "json",
          "sql",
          "html",
          "css",
          "javascript",
        ],
      }),
    ],
    optimization: {
      minimizer: ["...", new CssMinimizerPlugin()],
    },
  };
};
