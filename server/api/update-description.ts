import { useLayerToken } from "~/composables/useLayerToken";
import { index } from "../../algolia/algolia";

export default defineEventHandler(async (event) => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const body = await readBody(event);

  const code = body.fields.code["en-US"];
  const updatedProduct = body.fields;

  const { data: productSku } = await $fetch<any>(
    `https://${organization}.commercelayer.io/api/skus?filter[q][code_eq]=${code}&fields[skus]=id,prices,stock_items`,
    {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const sku = productSku[0].id;

  const updateProduct = await $fetch<any>(
    `https://${organization}.commercelayer.io/api/skus/${sku}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.api+json",
      },
      body: {
        data: {
          type: "skus",
          id: sku,
          attributes: {
            name: updatedProduct.name["en-US"],
            description: updatedProduct.description["en-US"],
            metadata: {
              brand: updatedProduct.brand["en-US"],
            },
          },
        },
      },
    }
  );

  if (!updateProduct) {
    throw createError({ status: 500, message: "Item info not updated" });
  } else {
    index
      .partialUpdateObjects([
        {
          name: updatedProduct.name["en-US"],
          description: updatedProduct.description["en-US"],
          brand: updatedProduct.brand["en-US"],
          categories: updatedProduct.category["en-US"],
          objectID: sku,
        },
      ])
      .then(({ objectIDs }) => {
        console.log(objectIDs);
      });
  }

  return {
    statusCode: 200,
    message: "Item updated",
  };
});
