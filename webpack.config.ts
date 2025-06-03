import path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

const config: webpack.Configuration = {
  entry: "./src/ts/script.ts",
  mode: "none",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "./src/js/")
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: () => false
          }
        }
      })
    ]
  }
};

export default config;
