const path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.BABEL_ENV || process.env.NODE_ENV;

module.exports = {
  mode: "development",
  //devtool: "none",
  entry: './src/index.ts',
  output: {
    filename: 'geovisto-map.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
        // {
        //     test: /\.(ts|tsx)$/,
        //     exclude: /node_modules/,
        //     use: [ "babel-loader" ]
        // },
        {
          test: /\.ts$|tsx/,
          loader: require.resolve("babel-loader"),
          options: {
            envName: 'development',
            presets: [["react-app", { flow: false, typescript: true }]]
          }
        },
        // {
        //     test: /\.tsx?$/,
        //     loader: "ts-loader"
        // },
        {
          test:  /\.(s?css)$/i,// /\.s[ac]ss$/i,
            use: [
              "style-loader", // Creates `style` nodes from JS strings
              "css-loader", // Translates CSS into CommonJS
              "sass-loader", // Compiles Sass to CSS
              'postcss-loader'
            ],
        },
        // {
        //     test: /\.(eot|woff|ttf|gif|png|jpe?g|svg)/,
        //     use: [ "file-loader" ]
        // },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  /*devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },*/
};