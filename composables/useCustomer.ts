export const useCustomer = () => {

    const createNewCustomer = async(user : any) => {
        const customerPaymentSource = await $fetch('/api/customers/create-customer-payment-source', {
            method: "POST",
            body: {
                user
            }
        })
        return customerPaymentSource
      }

    return { createNewCustomer }

}