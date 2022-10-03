const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "./", // 配置构建产物的相对路径
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        include: {
          and: [path.join(__dirname, "./src/")],
        },
        use: ["./lib/style-loader", "./lib/less-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(
      Object.assign({}, { inject: true, template: "./index.html" })
    ),
  ],
};
