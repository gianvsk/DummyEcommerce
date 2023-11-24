import { useLayerToken } from "~/composables/useLayerToken";
import { index } from '../../algolia/algolia'
import { useGetProductByCode } from "~/composables/useGetProductByCode";

export default defineEventHandler(async (event) => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const body = await readBody(event);

  const actualCode = body.fields.code["en-US"]
  const actualQuantity = body.fields.quantity["en-US"]

  const sku = await useGetProductByCode(actualCode, organization, token)
  
  const stockItemLink = sku.relationships.stock_items.links.related

  const stockItem : any = await $fetch(stockItemLink, {
    headers: {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
    },
  });

  const stockItemId = stockItem.data[0].id

  const newQuantity = await $fetch(
    `https://${organization}.commercelayer.io/api/stock_items/${stockItemId}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.api+json",
      },
      body: {
        data: {
          type: "stock_items",
          id: stockItemId,
          attributes: {
            quantity: actualQuantity
          },
        },
      },
    }
  );

  index.partialUpdateObjects([{quantity: actualQuantity, objectID: sku.id}]).then(({ objectIDs }) => {
    console.log(objectIDs);
  });

  return {
    status:200,
    message: 'Product quantity updated'
  }

})