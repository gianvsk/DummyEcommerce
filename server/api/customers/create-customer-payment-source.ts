import { useLayerToken } from "~/composables/useLayerToken"

export default defineEventHandler(async(event) => {

    const organization = useRuntimeConfig().commercelayerOrganization
    const token = await useLayerToken()

})