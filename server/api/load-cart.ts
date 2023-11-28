import { useCart } from "~/composables/useCart";
import { useLayerToken } from "~/composables/useLayerToken";

export default defineEventHandler(async (event): Promise<any> => {

  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken()
  const cartId = getCookie(event,'cartId')

  const cartResults = await $fetch<any>(`https://${organization}.commercelayer.io/api/orders/${cartId}?include=line_items&fields[orders]=number,skus_count,formatted_subtotal_amount,formatted_discount_amount,formatted_shipping_amount,formatted_total_tax_amount,formatted_gift_card_amount,formatted_total_amount_with_taxes,line_items&fields[line_items]=item_type,image_url,name,sku_code,formatted_unit_amount,quantity,formatted_total_amount`, {
      headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${token}`,
        }
    })

  return {
    status: 200,
    message: 'Cart refreshed correctly',
    data: cartResults
  }

}); 
