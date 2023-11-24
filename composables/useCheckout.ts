export const useCheckout = () => {

    const shippingMethods = useState('shippingMethods', () => [])
    const cartId = useCookie('cartId', {watch:true})

  const getShippingMethods = async () => {
    const { data } = await $fetch('/api/shipping/get-shipping-methods')
    return data
  }

  const getPaymentMethods = async() => {
    const { data } = await $fetch('/api/payment/get-payments-methods')
    return data
  }

  const radioOptionsShippingMethods = (items: any[]) => {
    const shippingMethods = ref<any>([])
    items.map((el:any) =>
      shippingMethods.value = [...shippingMethods.value, {label: el.attributes.name, value: el.id} ])
    return shippingMethods.value
  }

  const radioOptionsPaymentMethods = (items: any[]) => {
    const paymentMethods = ref<any>([])
    items.map((el:any) =>
      paymentMethods.value = [...paymentMethods.value, {label: el.attributes.name, value: el.id} ])
    return paymentMethods.value
  }

  return { getShippingMethods, getPaymentMethods, radioOptionsPaymentMethods, radioOptionsShippingMethods }

};
