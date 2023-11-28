import { useLayerToken } from "~/composables/useLayerToken";
import { index } from "~/algolia/algolia";

export default defineEventHandler(async (event) => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const body = await readBody(event);

  const code = body.fields.code["en-US"];
  const actualPrice = body.fields.price["en-US"];

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
  const priceLink = productSku[0].relationships.prices.links.related;

  const { data: productPrice } = await $fetch<any>(priceLink, {
    headers: {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
    },
  });

  const priceId = productPrice[0].id

  const productNewPrice = await $fetch<any>(
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
            sku_code: code,
            amount_cents: actualPrice,
            compare_at_amount_cents: null
          },
        },
      },
    }
  )

  if (!productNewPrice) {
    throw createError({ status: 500, message: "Product price not updated" });
  } else {
    index
      .partialUpdateObjects([{ price: actualPrice / 100, objectID: skuId }])
      .then(({ objectIDs }) => {
        console.log(objectIDs);
      });
  }

  return {
    status: 200,
    message: "Product price updated",
  };
});
