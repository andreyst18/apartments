// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['@/assets/scss/main.scss', '@/assets/css/main.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;',
        },
      },
    },
  },
  modules: ['@nuxt/image', '@pinia/nuxt', '@nuxt/ui'],
  imports: {
    dirs: ['stores'],
  },
  ui: {
    colorMode: false,
  },
});
