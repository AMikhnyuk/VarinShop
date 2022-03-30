var path = require("path");
var pkg = require("./package.json");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var config = {
  mode: "development",
  entry: {
    app: pkg.app.replace(".js", ".ts"),
  },

  output: {
    path: path.join(__dirname, "codebase"),
    publicPath: "/codebase/",
    filename: "[name].js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: "url-loader?limit=25000",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "less-loader"],
        }),
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".css", ".scss"],
    modules: ["./sources", "node_modules"],
    alias: {
      "jet-views": path.join(__dirname, "sources/views"),
      "jet-locales": path.join(__dirname, "sources/locales"),
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "node_modules/webix-jet/dist/types/index.d.ts",
          to: path.join(__dirname, "sources/interfaces/webix-jet.d.ts"),
        },
      ],
    }),
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: (filePath) => {
        return /^(?!.*(hot)).*/.test(filePath);
      },
    },
    proxy: {
      "/server": "http://localhost:3000",
    },
    static: {
      directory: path.join(__dirname, "./"),
    },
  },
};

module.exports = config;
