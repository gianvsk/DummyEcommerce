export const useShipment = () => {

    const createShipment = async() => {
        const shipmentCreated = await useFetch('/api/shipping/create-shipment')
        return shipmentCreated
    }

    return { createShipment }

}