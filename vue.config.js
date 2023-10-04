const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/globalStyling/style.scss";',
      },
    },
  },
});
