import { useCookie } from "nuxt/app";

export const useCart = () => {

  const cart = useState("cart", () => []);
  const checkout = useState("checkout", () => [])
  const openCart = useState("openCart", () => false)
  const openCartModal = useState("operCartModal", () => false)
  const organization = useRuntimeConfig().commercelayerOrganization

  const refreshCart = async () => {
    const refreshedCart = await $fetch("/api/load-cart");
    cart.value = refreshedCart.included
    checkout.value = refreshedCart.data.attributes
  };

  const checkCookie = async () => {
    const cartCookieId = useCookie("cartId", {watch: true})
    if (!cartCookieId.value) {
      const createCartId = await $fetch("/api/create-cart", {
        method: "POST",
      });
      cartCookieId.value = createCartId
    }
  };

  const deleteItemFromCart = async(id: string, token: string) => {
    const deleteItem = await $fetch(`http://${organization}.commercelayer.io/api/line_items/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json'
      }
    })
  }

  const openModal = () => {
    openCart.value = !openCart.value
  }

  const closeCart = () => {
    openCart.value = false
  }

  const showCartModal = () => {
    openCartModal.value = !openCartModal.value
  }

  const closeCartModal = () => {
    openCartModal.value = false
  }

  return { cart, checkout, checkCookie, refreshCart, deleteItemFromCart, openCart, openModal, closeCart, openCartModal, showCartModal, closeCartModal };
};
