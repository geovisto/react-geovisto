const path = require('path');

// Required for babel-preset-react-app
const mode = 'development';
process.env.NODE_ENV = mode;

module.exports = {
  mode: mode,
  output: {
    filename: 'react-geovisto.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
        {
          test: /\.ts$|tsx/,
          loader: require.resolve("babel-loader"),
          options: {
            presets: [["react-app", { flow: false, typescript: true }]]
          }
        },
        {
          test:  /\.(s?css)$/i,// /\.s[ac]ss$/i,
            use: [
              "style-loader", // Creates `style` nodes from JS strings
              "css-loader", // Translates CSS into CommonJS
              "sass-loader", // Compiles Sass to CSS
              'postcss-loader'
            ],
        },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  }
};