
export const useUpdateProduct = () => {
  const { refreshCart } = useCart();

  const addItemSelectedQuantity = async (product: any, quantity: number) => {
    const addItemToCart = await $fetch(
      "/api/add-to-cart",
      {
        method: "POST",
        body: {
          data: {
            product: product,
            quantity: quantity,
          },
        },
      }
    );
    refreshCart();
    return addItemToCart;
  };

  const sendItemId = async (serverAPI: string, id: string) => {
    const itemId = await useFetch(serverAPI, {
      method: "POST",
      body: {
        id: id,
      },
    });
    refreshCart()
    return itemId
  };

  return { addItemSelectedQuantity, sendItemId };
};
