
export default defineEventHandler(async(event): Promise<any> => {
    const axerveKey = useRuntimeConfig().axerveApiKey
    const axerveShopLogin = useRuntimeConfig().axerveShopLogin
    const { checkout } = await readBody(event)
    const shopTransactionID = getCookie(event,'shopTransactionId')

    const createNewPayment = await $fetch<any>('https://sandbox.gestpay.net/api/v1/payment/create/', {
        method: "POST",
        headers: {
            Authorization: `apikey ${axerveKey}`,
            "Content-Type": 'application/json'
        },
        body: {
            shopLogin: axerveShopLogin,
            amount: checkout as string,
            currency: 'USD',
            shopTransactionID: shopTransactionID
        }
    })

    return JSON.parse(createNewPayment)

})