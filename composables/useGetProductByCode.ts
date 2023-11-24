type categoryType = {
  type: 'skus' | 'prices' | 'stock_items'
}

export const useGetProductByCode = async( skuCode: string, organization: string, token: string ) => {

    const {data: productSku} = await $fetch<any>(
        `https://${organization}.commercelayer.io/api/skus?filter[q][code_eq]=${skuCode}&fields[skus]=id,prices`,
        {
          headers: {
            Accept: "application/vnd.api+json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
    return productSku[0]
}