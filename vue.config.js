const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: process.env.NODE_ENV !== 'production',
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/globalStyling/style.scss";',
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        // adding Swiper's custom elements
        options.compilerOptions = {
          isCustomElement: (tag) => {
            return tag.startsWith('swiper');
          },
        };
        return options;
      });
  },
});
