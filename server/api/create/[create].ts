import { CommerceLayer } from "@commercelayer/sdk";
import { index } from '../../../algolia/algolia'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const lastEntry: any = await $fetch(
    `https://graphql.contentful.com/content/v1/spaces/yqj1oyq7i4yc/environments/master/`,
    {
      method: "POST",
      body: {
        query:
          "query{productCollection(limit:1,order:sys_publishedAt_DESC){items{name,id,sku,code,price,description,image{url},category,piecesPerPack,weight,doNotShip,doNotTrack,quantity}}}",
      },
      headers: { Authorization: `Bearer ${process.env.CONTENTFUL_API_TOKEN}` },
    }
  );

  const currentProduct = lastEntry.data.productCollection.items[0];

  const data = await $fetch<any>(
    "https://gianvitoshop.commercelayer.io/oauth/token",
    {
      method: "POST",
      body: {
        grant_type: "client_credentials",
        client_id: config.commercelayerClientId,
        client_secret: config.commercelayerSecredId,
        scope: `market:${config.commercelayerMarket}`,
      },
    }
  );

  const cl = CommerceLayer({
    organization: "gianvitoshop",
    accessToken: data.access_token,
  });

  const shippingCategories = await cl.shipping_categories.list({filters: { name_eq: "Merchandising" }});

    const createSku = async () => {
      
      const newSku = await cl.skus.create({
        code: currentProduct.code,
        name: currentProduct.name,
        description: currentProduct.description,
        weight: currentProduct.weight,
        unit_of_weight: currentProduct.unit_of_weight,
        pieces_per_pack: currentProduct.pieces_per_pack,
        image_url: currentProduct.image ? currentProduct.image.url : '',
        shipping_category: cl.shipping_categories.relationship(shippingCategories[0].id)
        })

      const skuId = newSku.id

      const setPrice = await $fetch<any>(
        `https://gianvitoshop.commercelayer.io/api/prices`,
        {
          method: "POST",
          headers: { 
            Accept: 'application/vnd.api+json',
            Authorization: `Bearer ${data.access_token}`,
            'Content-Type': 'application/vnd.api+json' 
          },
          body: {
            data: {
              type: "prices",
              attributes: {
                amount_cents: currentProduct.price,
                compare_at_amount_cents: currentProduct.price
              },
              relationships: {
                price_list: {
                  data: {
                    type: "price_lists",
                    id: "RkjyQCejwB"
                  }
                },
                sku: {
                  data: {
                    type: "skus",
                    id: skuId
                }
              }
            }
          },
        }
      }
    );

    const setStockQuatity = await $fetch<any>(
      `https://gianvitoshop.commercelayer.io/api/stock_items`,
      {
        method: "POST",
        headers: { 
          Accept: 'application/vnd.api+json',
          Authorization: `Bearer ${data.access_token}`,
          'Content-Type': 'application/vnd.api+json' 
        },
        body: {
          data: {
            type: "stock_items",
            attributes: {
              quantity: currentProduct.quantity
            },
            relationships: {
              stock_location: {
                data: {
                  type: "stock_locations",
                  id: "DngepuPRWk"
                }
              },
              sku: {
                data: {
                  type: "skus",
                  id: skuId
                }
              }
            }
          }
        }
      }
    );

    const record = { 
      objectID: newSku.id, 
      name: currentProduct.name,
      code: currentProduct.code,
      categories: currentProduct.category,
      description: currentProduct.description,
      price: currentProduct.price / 100,
      weight: currentProduct.weight,
      unitWeigth: currentProduct.unit_of_weight,
      piecesPerPack: currentProduct.pieces_per_pack,
      imageUrl: currentProduct.image ? currentProduct.image.url : '',
      reviews: []
    }

      index.saveObject(record).wait() 
      index
        .search(currentProduct.name)
        .then(({ hits }) => console.log(hits[0]))
      }

    createSku()
});
