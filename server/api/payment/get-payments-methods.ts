import { useLayerToken } from "~/composables/useLayerToken"

export default defineEventHandler(async(event) => {

    const organization = useRuntimeConfig().commercelayerOrganization
    const token = await useLayerToken()

    const getPaymentMethods : any = await $fetch(`https://${organization}.commercelayer.io/api/payment_methods?filter[q][disabled_at_null]=true`, {
        headers: {
            Accept: 'application/vnd.api+json',
            Authorization: `Bearer ${token}`
        }
    })
    return getPaymentMethods
})