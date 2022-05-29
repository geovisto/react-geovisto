const baseConfig = require('../webpack.config.js');

module.exports = {

  framework: "@storybook/react",

  core: {
    "builder": "@storybook/builder-webpack5"
  },

  // The first story is specified as the "default story" shown when storybook starts
  stories: [
    "../src/stories/ReactGeovistoMap.stories.tsx",
    "../src/stories/*.stories.@(ts|tsx)"],

  addons: [
    'storybook-dark-mode',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],

  webpackFinal: async (config) => ({ 
    ...config, 
    module: {
      ...config.module, 
      // Replace Storybook's loaders with the loaders utilized by the main app.
      rules: baseConfig.module.rules
    }
  })
} 