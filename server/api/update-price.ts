import { useLayerToken } from "~/composables/useLayerToken";
import { index } from '../../algolia/algolia'
import { useGetProductByCode } from "~/composables/useGetProductByCode";

export default defineEventHandler(async (event) => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const body = await readBody(event);

  const actualCode = body.fields.code["en-US"]
  const actualPrice = body.fields.price["en-US"]

  const sku = await useGetProductByCode(actualCode, organization, token)
  
  const priceLink = sku.relationships.prices.links.related;

  const price : any = await $fetch(priceLink, {
    headers: {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
    },
  });

  const priceId = price.data[0].id;

  const newPrice = await $fetch(
    `https://${organization}.commercelayer.io/api/prices/${priceId}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.api+json",
      },
      body: {
        data: {
          type: "prices",
          id: priceId,
          attributes: {
            sku_code: actualCode,
            amount_cents: actualPrice,
            compare_at_amount_cents: null
          },
        },
      },
    }
  );

  index.partialUpdateObjects([{price: actualPrice / 100, objectID: sku.id}]).then(({ objectIDs }) => {
    console.log(objectIDs);
  });

  return {
    status:200,
    message: 'Product price updated'
  }

});
