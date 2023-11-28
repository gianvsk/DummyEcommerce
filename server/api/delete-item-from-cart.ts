import { useLayerToken } from "~/composables/useLayerToken"

export default defineEventHandler(async(event) => {

    const product = await readBody(event)
    const organization = useRuntimeConfig().commercelayerOrganization
    const token = await useLayerToken()

    const deleteItem : any = await $fetch(`http://${organization}.commercelayer.io/api/line_items/${product.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json'
      }
    })

    return {
        status: 200,
        message: 'Item deleted'
    }

})