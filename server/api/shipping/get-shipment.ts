import { useLayerToken } from "~/composables/useLayerToken"

export default defineEventHandler(async(event) => {

    const organization = useRuntimeConfig().commercelayerOrganization
    const token = await useLayerToken()

    const getShipment : any = await $fetch(`https://${organization}.commercelayer.io/api/shipments`, {
        headers: {
            Accept: 'application/vnd.api+json',
            Authorization: `Bearer ${token}`
        }
    })
    return getShipment
})