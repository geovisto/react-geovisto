const path = require("path");
const baseConfig = require('../webpack.config.js');

module.exports = {
  
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ['style-loader', 'css-loader', 'sass-loader'],
  //     include: path.resolve(__dirname, '../'),
  //   });

  //   config.module.rules.push({
  //     test: /\.(ts|tsx)$/,
  //     loader: require.resolve("babel-loader"),
  //     options: {
  //       presets: [["react-app", { flow: false, typescript: true }]]
  //     }
  //   });

  //   config.resolve.extensions.push(".ts", ".tsx");

  //   return config;
  // },

  // presets: [path.resolve("./.storybook/scss-preset.js")],

  // webpackFinal: async (config) => {
  
  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ['style-loader', 'css-loader?modules&importLoaders', 'sass-loader'],
  //     include: path.resolve(__dirname, '../'),
  //   });

  //   return config;
  // },

  // module: {
  //   rules: [{
  //     test: /\.scss$/,
  //     use: ['style-loader', 'css-loader', 'sass-loader'],
  //     include: path.resolve(__dirname, '../'),
  //   },
  //   {
  //     test: /\.ts$|tsx/,
  //     exclude: /node_modules/,
  //     use: ['babel-loader']
  //   }]
  // },
  // resolve: {
  //   extensions: ['*', '.js', '.ts', '.tsx']
  // },

  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    // "@storybook/preset-scss",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  framework: "@storybook/react",
  core: {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config) => ({ 
    ...config, 
    module: {
      ...config.module, 
      // Replace Storybook's loaders with the loaders utilized by the main app.
      rules: baseConfig.module.rules
    }
  })
}