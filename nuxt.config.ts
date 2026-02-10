// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET
  },
  modules: ['@pinia/nuxt'],
  css: ['./app/assets/css/main.css','~/assets/css/responsive.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app:{
    pageTransition:{ name:"page",mode:"in-out"}
  }
})



