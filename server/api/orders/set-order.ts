import { useLayerToken } from "~/composables/useLayerToken"

export default defineEventHandler(async(event) => {

    const organization = useRuntimeConfig().commercelayerOrganization
    const token = await useLayerToken()
    const cartId = getCookie(event, 'cartId')
    const {user, payment_method_id} = await readBody(event)

    const setUser: any = await $fetch(
        `https://${organization}.commercelayer.io/api/orders/${cartId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
          body: {
            data: {
              type: "orders",
              id: cartId,
              attributes: {
                customer_email: user.email,
                _shipping_address_same_as_billing: true
              },
              relationships: {
                billing_address: {
                  data: {
                    type: "addresses",
                    id: payment_method_id,
                  },
                },
                shipping_address: {
                  data: {
                    type: "addresses",
                    id: payment_method_id,
                  },
                },
                payment_method: {
                  data: {
                    type: "payment_methods",
                    id: user.payment_method,
                  },
                },
              },
            },
          },
        }
      );

      return setUser.data ? 
        setUser : createError({status: 500, message: 'Order not set'})

    })