import { useLayerToken } from "~/composables/useLayerToken"

export default defineEventHandler(async(event) : Promise<any> => {

    const organization = useRuntimeConfig().commercelayerOrganization
    const token = await useLayerToken()
    const user = await readBody(event)

    const createCustomer = await $fetch(`https://${organization}.commercelayer.io/api/customers`, {
        method: "POST",
        headers: {
            Accept: "application/vnd.api+json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/vnd.api+json"
        },
        body: {
            data: {
                type: "customers",
                attributes: {
                  email: user.email
                }
              }
        }
    })

    console.log('createCustomer', createCustomer)
    return createCustomer

})