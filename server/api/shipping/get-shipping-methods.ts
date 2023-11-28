import { useLayerToken } from "~/composables/useLayerToken"

export default defineEventHandler(async(event) => {

    const organization = useRuntimeConfig().commercelayerOrganization
    const token = await useLayerToken()

    const getShippingMethods : any = await $fetch(`https://${organization}.commercelayer.io/api/shipping_methods?filter[q][disabled_at_null]=true`, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.api+json'
        }
    })

    return getShippingMethods

})