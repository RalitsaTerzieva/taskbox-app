/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/testing-library",
    "@storybook/test-runner"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
