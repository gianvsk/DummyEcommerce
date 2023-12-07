export default defineEventHandler(async (event): Promise<any> => {  const axerveShopLogin = useRuntimeConfig().axerveShopLogin;

  const { user, creditCard, paymentToken } = await readBody(event);

  const submitCardPayment = await $fetch<any>(
    "https://sandbox.gestpay.net/api/v1/payment/submit",
    {
      method: "POST",
      headers: {
        paymentToken: paymentToken,
      },
      body: {
        shopLogin: axerveShopLogin,
        paymentType: "CREDITCARD",
        buyer: {
          name: user.name,
          email: user.email,
        },
        paymentTypeDetails: {
          creditcard: {
            number: creditCard.number,
            expMonth: creditCard.expMonth,
            expYear: creditCard.expYear,
            CVV: creditCard.cvv,
            requestToken: "MASKEDPAN",
            DCC: "false",
          },
        },
      },
    }
  );

  return JSON.parse(submitCardPayment);
});
