import { v4 as uuidv4 } from 'uuid'
import { useCustomer } from './useCustomer';

export const usePayment = () => {
  const paymentToken = ref();
  const paymentId = ref();
  const { checkout, refreshCart } = useCart()
  const { createNewCustomer } = useCustomer()

  const currentCheckout = ref<any>(checkout)
  const cookieTransactionId = useCookie('shopTransactionId')

  const createTransactionId = () => {
    const shopTransactionID = uuidv4()
    cookieTransactionId.value = shopTransactionID
  }

  const createPaymentSource = async() => {
    const createdPaymentSource = await $fetch('/api/payments/create-payment-source')
    return createdPaymentSource
  }

  const checkCreditCard = async(creditCard: any) => {
    const checkedCreditCard = await $fetch("/api/axerve/check-credit-card", {
        method: "POST",
        body: {
            creditCard,
        }
    });
    return checkedCreditCard;
  };

  const submitPayment = async (user: any, creditCard: any) : Promise<any> => {
    const sendPaymentToken = await $fetch("api/axerve/submit-payment", {
      method: "POST",
      body: {
        user,
        creditCard,
        paymentToken: paymentToken.value
      },
    });

    return sendPaymentToken
  };

  const capturePayment = async() => {
    await refreshCart()
    const capturedPayment = await $fetch('/api/axerve/capture-payment', {
      method: "POST",
      body: {
        amount: currentCheckout.value.formatted_total_amount_with_taxes.slice(1, currentCheckout.value.formatted_total_amount_with_taxes.length).replaceAll(',', '')
      }
    })
    return capturedPayment
  }

  const createPayment = async (data: any) => {
    createTransactionId()
    const paymentCreated = await $fetch("/api/axerve/create-payment", {
        method: "POST",
        body: {
            checkout: currentCheckout.value.formatted_total_amount_with_taxes.slice(1, currentCheckout.value.formatted_total_amount_with_taxes.length).replaceAll(',', '')
        }
    });
    paymentToken.value = paymentCreated.payload.paymentToken;
    paymentId.value = paymentCreated.payload.paymentID;

    const user = {
        name: data.name,
        email: data.email,
      };
      const creditCard = {
        number: data.card_number,
        expMonth: data.card_expiring_date.slice(0,2),
        expYear: data.card_expiring_date.slice(3),
        cvv: data.card_cvc,
      };
    const newCustomer = await createNewCustomer(user)
    const creditCartChecked = await checkCreditCard(creditCard);
    if(creditCartChecked) {
    const submitCardPayment = await submitPayment(user, creditCard)
        if(submitCardPayment) {
            const paymentLink = submitCardPayment.payload.userRedirect.href
            navigateTo(paymentLink, {external: true})
            return {submitCardPayment}
        }
    }
  };

  return { createPayment, capturePayment, createPaymentSource }
};
