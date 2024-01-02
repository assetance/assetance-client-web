import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
// eslint-disable-next-line no-unused-vars
export default defineConfig(({command, mode}) => {
  // eslint-disable-next-line no-undef , no-unused-vars
  const env = loadEnv(mode, process.cwd(), ''); // to use .env varaibles like so (env.<variable_name>)
  
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('swiper'),
          }
        }
      }),
      VueI18nPlugin({
        runtimeOnly: false,
        include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/localizer/**'),
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/globalStyling/style.scss";`,
        },
      },
    },
    build: {
      target: 'esnext'
    },
  }
})
