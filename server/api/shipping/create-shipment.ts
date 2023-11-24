import { useLayerToken } from "~/composables/useLayerToken";

export default defineEventHandler(async (event) => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const cartId = getCookie(event, "cartId");

/*   const createShipping = await $fetch(
    `https://${organization}.commercelayer.io/api/shipments`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.api+json",
      },
      body: {
        data: {
          type: "shipments",
          relationships: {
            order: {
              data: {
                type: "orders",
                id: cartId
              }
            },
            inventory_stock_location: {
              data: {
                type: "inventory_stock_locations",
                id: "vjqRPSzXzW"
              }
            }
          }
        }
      },
    }
  ); */
});
