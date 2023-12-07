import { useLayerToken } from "~/composables/useLayerToken";

export default defineEventHandler(async (event) => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const {address} = await readBody(event);

  const createAddress: any = await $fetch(
    `https://${organization}.commercelayer.io/api/addresses`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      body: {
        data: {
            type: "addresses",
            attributes: {
              first_name: address.first_name,
              last_name: address.last_name,
              line_1: address.line_1,
              city: address.city,
              zip_code: address.zip_code,
              state_code: address.state_code,
              country_code: address.country_code,
              phone: address.phone
            }
          }
      },
    }
  );
  
  return createAddress.data;
});
