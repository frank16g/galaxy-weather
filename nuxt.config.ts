import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  // Clave pública 
  runtimeConfig: {
    public: {
      openWeatherKey: process.env.NUXT_PUBLIC_OPENWEATHER_KEY || ''
    }
  },

  app: {
    head: {
      title: 'Galaxy Weather',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  pages: true,
})
