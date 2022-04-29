const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index.ts',
  output: {
    filename: 'geovisto-map.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
        {
          test: /\.ts$|tsx/,
          loader: require.resolve("babel-loader"),
          options: {
            envName: 'development',
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