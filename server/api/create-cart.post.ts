import { useLayerToken } from "~/composables/useLayerToken"

export default defineEventHandler(async (event) => {

    const organization = useRuntimeConfig().commercelayerOrganization
    const token = await useLayerToken()

    const createCart : any = await $fetch(`https://${organization}.commercelayer.io/api/orders`, {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.api+json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/vnd.api+json'
        },
        body: {
            data: {
                type: "orders",
                attributes: {
                  language_code: "it"
                }
              }
        }
    })

    return createCart.data.id
})