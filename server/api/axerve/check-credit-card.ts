export default defineEventHandler(async(event) : Promise<any> => {

    const axerveApiKey = useRuntimeConfig().axerveApiKey
    const axerveShopLogin = useRuntimeConfig().axerveShopLogin
    const { creditCard } = await readBody(event) 
    const shopTransactionID = getCookie(event,'shopTransactionId')

    const checkCreditCardNumber = await $fetch<any>('https://sandbox.gestpay.net/api/v1/check/creditCard/', {
        method: "POST",
        headers: {
            Authorization: `apikey ${axerveApiKey}`
        },
        body: {
            shopLogin: axerveShopLogin,
            shopTransactionID: shopTransactionID,
            creditcard: {
                number: creditCard.number,
                expMonth: creditCard.expMonth,
                expYear: creditCard.expYear,
                CVV: creditCard.cvv
            }
        }
    })

    return JSON.parse(checkCreditCardNumber)

})