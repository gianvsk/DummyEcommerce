import { index } from '../algolia/algolia'

export const useAlgoliaUpdateItem = (id : string, type: 'skus' | 'prices' | 'stock_items', value: any  ) => {

    const getType = () => { 
        switch(type) {
        case 'skus':
            return {
                name: value.name['en-US'],
                description: value.description['en-US'],
                brand: value.brand['en-US'],
                categories: value.category['en-US'], 
                objectID: id
            }
        case 'prices':
            return {
                price: value / 100, 
                objectID: id
            }
        case 'stock_items':
            return {
                quantity: value, 
                objectID: id
            }
    }
}

    index.partialUpdateObjects([getType()]).then(({ objectIDs }) => {
            console.log(objectIDs);
      });

}