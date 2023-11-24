import { useLayerToken } from "~/composables/useLayerToken";

export default defineEventHandler(async (event) => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const product = await readBody(event);
  const currentProduct = product.data.product;
  const currentQuantity = product.data.quantity;
  const cookieCartId = getCookie(event, "cartId");

  if (currentProduct.name !== "Apple Airpods Pro White") {
    const addItemToCart: any = await $fetch(
      `https://${organization}.commercelayer.io/api/line_items`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
        body: {
          data: {
            type: "line_items",
            attributes: {
              sku_code: currentProduct.code,
              name: currentProduct.name,
              quantity: currentQuantity,
              item_type: "skus",
              _update_quantity: true,
            },
            relationships: {
              order: {
                data: {
                  type: "orders",
                  id: cookieCartId,
                },
              },
              item: {
                data: {
                  type: "skus",
                  id: currentProduct.objectID,
                },
              },
            },
          },
        },
      }
    );
  } else {
    return createError({ statusCode: 500, message: "It doesn t work" });
  }

  return {
    status: 200,
    message: "Item added",
  };
});
