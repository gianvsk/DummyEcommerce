import { useLayerToken } from "~/composables/useLayerToken"

export default defineEventHandler(async (event) : Promise<any> => {

    const organization = useRuntimeConfig().commercelayerOrganization
    const cartId = getCookie(event, 'cartId')

    const token = await useLayerToken()

    const getCartId = await $fetch<any>(`https://${organization}.commercelayer.io/api/orders?${cartId}`, {
        headers: {
            Accept: 'application/vnd.api+json',
            Authorization: `Bearer ${token}`
        }
    })

    return getCartId
})