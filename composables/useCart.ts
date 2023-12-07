import { useCookie } from "nuxt/app";

export const useCart = () => {
  const cart = useState("cart", () => []);
  const checkout = useState("checkout", () => []);
  const openCart = useState("openCart", () => false);
  const openCartModal = useState("openCartModal", () => false);
  const cartCookieId = useCookie("cartId");

  const refreshCart = async () => {
    const { data: refreshedCart } = await $fetch("/api/load-cart");
    cart.value = refreshedCart.included;
    checkout.value = refreshedCart.data.attributes;
  };

  const checkCookie = async () => {
    if (
      !cartCookieId.value ||
      cartCookieId.value === "" ||
      cartCookieId.value === undefined ||
      cartCookieId.value === null
    ) {
      const createCartId = await $fetch("/api/create-cart", {
        method: "POST",
      });
      cartCookieId.value = createCartId;
    }
    refreshCart();
    return true;
  };

/*   const emptyCart = () => {
    resetCartCookie();
    cart.value = [];
  };

  const resetCartCookie = () => {
    const cartCookieId = useCookie("cartId");
    cartCookieId.value = null;
    checkCookie();
  }; */

  const openModal = () => {
    openCart.value = !openCart.value;
  };

  const closeCart = () => {
    openCart.value = false;
  };

  const showCartModal = () => {
    openCartModal.value = !openCartModal.value;
  };

  const closeCartModal = () => {
    openCartModal.value = false;
  };

  return {
    cart,
    checkout,
    checkCookie,
    refreshCart,
    openCart,
    openModal,
    closeCart,
    openCartModal,
    showCartModal,
    closeCartModal,
    };
};
