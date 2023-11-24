import {ref} from 'vue'

export const useLastOrderId = async (token: string) => {

    const config = useRuntimeConfig().commercelayerOrganization
  
    const orders : any = await $fetch(`https://${config}.commercelayer.io/api/orders/`, {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`
      }
    });

    return orders.data[orders.data.length-1] 

  };