export const useCheckout = () => {

    const shippingMethods = useState('shippingMethods', () => [])
    const cartId = useCookie('cartId', {watch:true})

  const getShippingMethods = async () => {
    const { data } = await $fetch('/api/shipping/get-shipping-methods')
    console.log('shipping-methods', data)
    return data
  }

  const getPaymentMethods = async() => {
    const { data } = await $fetch('/api/payments/get-payments-methods')
    return data
  }

  const radioOptionsShippingMethods = (items: any[]) => {
    const shippingMethods = ref<any>([])
    items.map((el:any) =>
      shippingMethods.value = [...shippingMethods.value, {label: el.attributes.name + ' ' + el.attributes.price_amount_float + '$', value: el.id} ])
    return shippingMethods.value
  }

  const radioOptionsPaymentMethods = (items: any[]) => {
    const paymentMethods = ref<any>([])
    items.map((el:any) =>
      paymentMethods.value = [...paymentMethods.value, {label: el.attributes.name, value: el.id} ])
    return paymentMethods.value
  }

  const sendDataToAddress = async(address: any) => {
    const sentData = await $fetch('/api/addresses/create-address', {
      method: "POST",
      body: {
        address
      }
    })
    return sentData
  }

  const sendDataForShippingMethod = async(id: any) => {
    const sendDataShippingMethod = await $fetch('/api/orders/assign-shipping-method', {
      method: "POST",
      body: {
        shippingMethodId: id
      }
    })
    return sendDataShippingMethod
  }

  const sendDataForSettingOrder = async(user: any, id: any) => {
    const sendDataSetOrder = await $fetch('/api/orders/set-order', {
      method: "POST",
      body: {
        user,
        payment_method_id: id
      }
    })
    return sendDataSetOrder
  }

  const placeOrder = async(payment_source_id: string) => {
    const placedOrder = await $fetch('/api/orders/place-order', {
      method: "POST",
      body: {
        payment_source_id
      }
    })
    return placedOrder
  }

  return { getShippingMethods, 
            getPaymentMethods, 
            radioOptionsPaymentMethods, 
            radioOptionsShippingMethods, 
            sendDataToAddress, 
            sendDataForShippingMethod, 
            sendDataForSettingOrder,
            placeOrder 
          }

};
