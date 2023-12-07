import { useLayerToken } from "~/composables/useLayerToken";

export default defineEventHandler(async(event) : Promise<any> =>  {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const payment_source_id = await readBody(event)

  const cartId = getCookie(event, "cartId");

    const placeOrder = await $fetch<any>(
    `https://${organization}.commercelayer.io/api/orders/${cartId}`,
    {
      method: "PATCH",
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json'
      },
      body: {
        data: {
          type: "orders",
          id: cartId,
          attributes: {
            payment_source_id: payment_source_id,
            _place: true,
          },
        },
      },
    }
  );

  return placeOrder
});
