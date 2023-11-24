import algoliasearch from 'algoliasearch'

export const algoliaClient = algoliasearch(process.env.NUXT_ALGOLIA_APPLICATION_ID!, 
                                    process.env.NUXT_ALGOLIA_ADMIN_API_KEY!)
    
export const index = algoliaClient.initIndex('products')