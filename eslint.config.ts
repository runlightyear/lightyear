import customConfig from "./packages/util/eslint-config-custom";

export default [
  {
    // This tells ESLint to load the config from the package `eslint-config-custom`
    ...customConfig,
    settings: {
      next: {
        rootDir: ["apps/*/"],
      },
    },
  },
];
