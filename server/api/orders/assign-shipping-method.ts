import { useLayerToken } from "~/composables/useLayerToken";

export default defineEventHandler(async(event) : Promise<any> => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const {shippingMethodId} = await readBody(event);

  const shipment = await $fetch<any>(
    `https://${organization}.commercelayer.io/api/shipments`,
    {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const shipmentId = shipment.data[0].id;

  const assignedShippingMethod = await $fetch<any>(
    `https://${organization}.commercelayer.io/api/shipments/${shipmentId}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.api+json",
      },
      body: {
        data: {
          type: "shipments",
          id: shipmentId,
          relationships: {
            shipping_method: {
              data: {
                type: "shipping_methods",
                id: shippingMethodId,
              }
            }
          }
        }
      }
    }
  )

  return assignedShippingMethod.data && shipment.data ? 
    assignedShippingMethod :
    createError({status: 500, message: 'Shipping method not assigned to the order'} )
  
});
