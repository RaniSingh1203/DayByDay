// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
      dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

    // Public variables (if needed)
    public: {}
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



