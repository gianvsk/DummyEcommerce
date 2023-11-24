// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss',
            '@nuxtjs/algolia',
            '@nuxt/image',
            '@formkit/nuxt',
            'nuxt-swiper'
            ],
  algolia: {
    apiKey: process.env.NUXT_ALGOLIA_SEARCH_API_KEY,
    applicationId: process.env.NUXT_ALGOLIA_APPLICATION_ID,
    instantSearch: {
      theme: 'algolia'
    }
  },
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true
  },
  runtimeConfig: {
    commercelayerClientId: process.env.NUXT_COMMERCE_LAYER_CLIENT_ID,
    commercelayerSecredId: process.env.NUXT_COMMERCE_LAYER_SECRET_ID,
    commercelayerMarket: process.env.NUXT_COMMERCE_LAYER_MARKET,
    commercelayerOrganization: process.env.NUXT_COMMERCE_LAYER_ORGANIZATION,
    nuxtAlgoliaApplicationID: process.env.NUXT_ALGOLIA_APPLICATION_ID,
    nuxtAlgoliaSearchApiKey: process.env.NUXT_ALGOLIA_SEARCH_API_KEY,
    nuxtAlgoliaAdminApiKey: process.env.NUXT_ALGOLIA_ADMIN_API_KEY
  }
})
