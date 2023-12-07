export default defineEventHandler(async(event) : Promise<any> => {

    const axerveApiKey = useRuntimeConfig().axerveApiKey
    const axerveShopLogin = useRuntimeConfig().axerveShopLogin
    const { amount } = await readBody(event)
    const shopTransactionID = getCookie(event,'shopTransactionId')
    console.log('amount', amount)
    console.log('shopTransactionId', shopTransactionID)

    const captureCardPayment = await $fetch<any>('https://sandbox.gestpay.net/api/v1/payment/capture/', {
        method: "POST",
        headers: {
            Authorization: `apikey ${axerveApiKey}`,
        },
        body: {
            shopLogin: axerveShopLogin,
            amount: amount as string,
            currency: 'USD',
            shopTransactionID: shopTransactionID
        }
    })

    console.log(JSON.parse(captureCardPayment))
    return JSON.parse(captureCardPayment)

})