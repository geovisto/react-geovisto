const path = require("path");

module.exports = {
  
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // config.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   loader: require.resolve("babel-loader"),
    //   options: {
    //     presets: [["react-app", { flow: false, typescript: true }]]
    //   }
    // });

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },

  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
  ],
  framework: "@storybook/react",
  core: {
    "builder": "@storybook/builder-webpack5"
  }
}