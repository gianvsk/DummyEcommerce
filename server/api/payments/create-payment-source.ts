import { useLayerToken } from "~/composables/useLayerToken";

export default defineEventHandler(async (event) : Promise<any> => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const cartId = getCookie(event, 'cartId')
  console.log('CARtD', cartId)

  const createNewPaymentSource = await $fetch(
    `http://${organization}.commercelayer.io/api/wire_transfers`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.api+json",
      },
      body: {
        data: {
          type: "wire_transfers",
          attributes: {},
          relationships: {
            order: {
              data: {
                type: "orders",
                id: cartId,
              },
            },
          },
        },
      },
    }
  );
  
  console.log('yes')

  return createNewPaymentSource
});
