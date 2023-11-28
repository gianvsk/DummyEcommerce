import { useLayerToken } from "~/composables/useLayerToken";
import { index } from "~/algolia/algolia";

export default defineEventHandler(async (event) => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken()
  const body = await readBody(event);

  const code = body.fields.code["en-US"]
  const actualQuantity = body.fields.quantity["en-US"]

  const { data: productSku } = await $fetch<any>(
    `https://${organization}.commercelayer.io/api/skus?filter[q][code_eq]=${code}&fields[skus]=id,prices,stock_items`,
    {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const skuId = productSku[0].id
  const stockItemLink = productSku[0].relationships.stock_items.links.related

  const {data: stockItem} = await $fetch<any>(stockItemLink, {
    headers: {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
    },
  })

  const stockItemId = stockItem[0].id

  const newStockItemQuantity = await $fetch(
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

  if(!newStockItemQuantity) {
    throw createError({status: 500, message: 'Product quantity not updated'})
  } else {
    index.partialUpdateObjects([{quantity: actualQuantity, objectID: skuId}]).then(({ objectIDs }) => {
      console.log(objectIDs);
    });
  }

  return {
    status:200,
    message: 'Product quantity updated'
  }

})