import { useLayerToken } from "~/composables/useLayerToken";
import { index } from "../../algolia/algolia";
import { useGetProductByCode } from "~/composables/useGetProductByCode";

export default defineEventHandler(async (event) => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const body = await readBody(event);

  const actualCode = body.fields.code["en-US"];
  const updatedProduct = body.fields;

  const sku = await useGetProductByCode(actualCode, organization, token)

  const newProductInfo : any = await $fetch(
    `https://gianvitoshop.commercelayer.io/api/skus/${sku.id}`,
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
          id: sku.id,
          attributes: {
            name: updatedProduct.name['en-US'],
            description: updatedProduct.description['en-US'],
            metadata: {
                brand: updatedProduct.brand['en-US'], 
            }
          },
        },
      },
    }
  );

  index.partialUpdateObjects([
    {
        name: updatedProduct.name['en-US'],
        description: updatedProduct.description['en-US'],
        brand: updatedProduct.brand['en-US'],
        categories: updatedProduct.category['en-US'], 
        objectID: sku.id
    }])
    .then(({ objectIDs }) => {
        console.log(objectIDs);
  });

  if(!newProductInfo) {
    throw createError({status: 404, statusText: 'Product not updated'})
  }

  return {
    statusCode: 200, 
    message: 'Item updated'
  }
});
