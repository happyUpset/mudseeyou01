// https://nuxt.com/docs/api/configuration/nuxt-config
import {
  APP_TITLE,
  APP_DESCRIPTION,
  APP_KEY_WORDS,
  APP_SITE_NAME,
  APP_IMAGE,
  APP_URL,
  APP_SHORT_TITLE
} from "./const/base";
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: '/api',
      version: process.env.npm_package_version,
    }
  },
  devtools: { enabled: true },

  css: ['~/assets/css/main.css','~/assets/css/basic.sass'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // titleTemplate: '',
      titleTemplate: `%s - ${APP_TITLE}`,
      meta: [
        // <meta name="description" content="My amazing site">
        {property: 'og:url', content: APP_URL},
        {property: 'og:title', content: APP_TITLE},
        {
          name: 'description',
          content: APP_DESCRIPTION
        },
        {name: 'keywords', content: APP_KEY_WORDS},
        {
          property: 'og:description',
          content: APP_DESCRIPTION
        },
        {property: 'og:type', content: 'website'},
        {property: 'og:country-name', content: 'Taiwan'},
        {property: 'og:site_name', content: APP_SITE_NAME},
        {property: 'og:image', content: APP_IMAGE},
      ],
    },
  },
  plugins: [
    // { src: '@/plugins/clarity.js', mode: 'client' }, // 微軟監聽系統
    { src: '@/plugins/client.ts', mode: 'client' },
    { src: '@/plugins/swiper.ts', mode: 'client' },
    { src: '@/plugins/svg.ts', mode: 'client'},
  ],
  modules: ['@pinia/nuxt', '@vite-pwa/nuxt',
    '@nuxtjs/svg-sprite'],
  pwa: {
    manifest: {
      name: APP_TITLE,
      short_name: APP_SHORT_TITLE,
      description: APP_DESCRIPTION,
      display: "fullscreen",
      background_color: "#fff",
      theme_color: "#fff",
      // start_url: '/step/landing',
      lang: 'zh-Hant-TW',
      icons:[
        // {
        //   src: 'images/icon64.png',
        //   sizes: '64x64',
        //   type: 'image/png',
        // },
        // {
        //   src: 'images/icon144.png',
        //   sizes: '144x144',
        //   type: 'image/png',
        // },
        // {
        //   src: 'images/icon192.png',
        //   sizes: '192x192',
        //   type: 'image/png',
        // },
        {
          src: 'images/app-512x512.jpg',
          // sizes: '512x512',
          type: 'image/jpg',
        },
      ]
      // crossorigin: 'use-credentials'
    },
    workbox:{
      // navigateFallback: '/',
      // globPatterns: ['**/*.{js,css}'],
      navigateFallback: null,
      globPatterns: ['**/*.{js,css}'],
    },
    devOptions:{
      enabled: true,
      type: 'module'
    }
  },
  // modules: ['@pinia/nuxt','@nuxtjs/tailwindcss','nuxt-icons'],
  nitro: {
    routeRules: {
      '/api/**': {
        // proxy: 'https://iot.maieric.com/api/**',
        proxy: 'https://pingpongapi.marsfootball.com.tw/api/**',
        cors: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/routes/**': {
        // proxy: 'https://iot.maieric.com/api/**',
        proxy: 'https://pingpongapi.marsfootball.com.tw/api/**',
        cors: true,
      },
    },
  },
})
