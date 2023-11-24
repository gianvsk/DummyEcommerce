export const getLayerToken = async () => {

    const config = useRuntimeConfig()

    const data = await $fetch<any>(
        "https://gianvitoshop.commercelayer.io/oauth/token",
        {
          method: "POST",
          body: {
            grant_type: "client_credentials",
            client_id: config.commercelayerClientId,
            client_secret: config.commercelayerSecredId,
            scope: `market:${config.commercelayerMarket}`,
          },
        }
      );

      return data
}