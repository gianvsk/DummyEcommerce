import { useLayerToken } from "~/composables/useLayerToken";

export default defineEventHandler(async (event) => {
  const organization = useRuntimeConfig().commercelayerOrganization;
  const token = await useLayerToken();
  const userInfo = await readBody(event);

  const cartId = getCookie(event, "cartId");
  const user = userInfo.user;

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
            first_name: user.name,
            last_name: user.surname,
            line_1: user.address,
            city: user.city,
            zip_code: user.zipcode,
            state_code: user.state,
            country_code: user.country,
            phone: user.phone,
          },
        },
      },
    }
  );

  const getShipment = async () => {
    const shipment = await $fetch<any>(
      `https://${organization}.commercelayer.io/api/shipments`,
      {
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const shipmentId = shipment[0].id;

    const assignedShippingMethod = await $fetch<any>(
      `https://${organization}.commercelayer.io/api/shipments/${shipmentId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/vnd.api+json",
        },
        body: {
          data: {
            type: "shipments",
            id: shipmentId,
            relationships: {
              shipping_method: {
                data: {
                  type: "shipping_methods",
                  id: user.payment_method,
                },
              },
            },
          },
        },
      }
    );

    const setUser: any = await $fetch(
      `https://${organization}.commercelayer.io/api/orders/${cartId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
        body: {
          data: {
            type: "orders",
            id: cartId,
            attributes: {
              customer_email: user.email,
            },
            relationships: {
              billing_address: {
                data: {
                  type: "addresses",
                  id: createAddress.data.id,
                },
              },
              payment_method: {
                data: {
                  type: "payment_methods",
                  id: user.payment_method,
                },
              },
            },
          },
        },
      }
    );
  };

  /*   const placeOrder = await $fetch(
    `https://${organization}.commercelayer.io/api/orders/${cartId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      body: {
        data: {
          type: "orders",
          id: cartId,
          attributes: {
            _place: true,
          },
        },
      },
    }
  ); */
});
