const fs = require("fs");

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Otra Vez",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js",
        integrity:
          "sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA",
        crossorigin: "anonymous",
        defer: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",

    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: process.env.APIKEY,
          authDomain: process.env.AUTH_DOMAIN,
          projectId: process.env.PROJECT_ID,
          storageBucket: process.env.STORAGE_BUCKET,
          messagingSenderId: process.env.SENDER_ID,
          appId: process.env.APP_ID,
          measurementId: process.env.MEASUREMENT_ID
        },
        services: {
          firestore: {
            enablePersistence: {
              synchronizeTabs: true
            }
          },
          storage: true,
          analytics: {
            collectionEnabled: true
          },
          messaging: {
            createServiceWorker: true,
            fcmPublicVapidKey: process.env.FCM_PUBLIC_KEY,
            inject: fs.readFileSync("./serviceWorker.js")
          }
        }
      }
    ]
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    // icon: {
    //   source: "/static/pwa.png",
    //   fileName: "pwa.png"
    // },
    meta: {
      name: "Otra Vez",
      description: "Fashion friendly",
      theme_color: "#000000"
    },
    manifest: {
      lang: "en",
      name: "OtraVez",
      short_name: "OV",
      theme_color: "#000000",
      description: "Fashion friendly",
      background_color: "#000000",
      display: "standalone",
      scope: "/",
      start_url: "/"
    },
    workbox: {
      /* workbox options */
      offlineAnalytics: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
