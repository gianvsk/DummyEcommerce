<script setup lang="ts">

const { cart, checkout } = useCart()

const currentCart = ref<any>(cart)
const user = ref<any>()

const checkPaymentMethod = computed(() => {
    return user.value.payment_method
})

const sendData = async() => {
    const sendDataForOrder = await useFetch('/api/order/place-order', {
        method: 'POST',
        body: {
            user: user.value
        }
    })
}

const { getShippingMethods, getPaymentMethods, radioOptionsPaymentMethods, radioOptionsShippingMethods } = useCheckout()

const shipmentMethods = ref(await getShippingMethods())
const paymentMethods = ref(await getPaymentMethods())

const currentShipments = ref(radioOptionsShippingMethods(shipmentMethods.value))
const currentPayments = ref(radioOptionsPaymentMethods(paymentMethods.value))

</script>

<template>
    <div class="flex flex-col p-7 gap-6">
        <h3 class="text-2xl text-black font-sans font-semibold">Order summary</h3>
        <div v-if="cart" class="flex flex-col gap-10">
            <h4 class="text-xl text-black font-sans font-medium">Items</h4>
            <div v-for="item in currentCart" class="flex items-center shadow-lg p-2 justify-between">
                <div class="flex gap-5">
                    <img :src="item.attributes.image_url" class=" w-56 h-56 object-contain" />
                    <div class="flex flex-col gap-1 pt-5">
                        <h5 class="text-xl text-black font-sans font-normal">{{ item.attributes.name }}</h5>
                        <h5 class="text-xl text-black font-sans font-normal">{{ item.attributes.formatted_unit_amount }}
                        </h5>
                        <h5 class="text-xl text-black font-sans font-normal">{{ item.attributes.sku_code }}</h5>
                        <h5 class="text-xl text-black font-sans font-normal">Quantity: {{ item.attributes.quantity }}</h5>
                    </div>
                </div>
                <div>
                    <h5 class="text-xl text-black font-sans font-normal">{{ item.attributes.formatted_total_amount }}</h5>
                    <FormKit 
                        type="select"
                        label="Quantity"
                        :classes="{
                            option: 'text-black'
                        }"
                        :options="
                           Array.from(Array(10).keys())"
                        :value="1"
                    />
                </div>
            </div>
            <h4 class="text-xl text-black font-sans font-medium">User</h4>
            <FormKit v-model="user" type="form" :classes="{
                form: 'flex flex-col gap-3'
            }" @submit="sendData">
                <AtomsFormKitEmail text="E-mail" name="email" id="email"/>
                <AtomsFormKitText text="Name" name="name"/>
                <AtomsFormKitText text="Surname" name="surname"/>
                <AtomsFormKitText text="Address" name="address"/>
                <AtomsFormKitText text="City" name="city"/>
                <AtomsFormKitText text="Country" name="country"/>
                <AtomsFormKitText text="State" name="state"/>
                <AtomsFormKitText text="Zipcode" name="zipcode"/>
                <AtomsFormKitText text="Phone" name="phone"/>

                <AtomsFormKitRadio text="Shipping method" name="shipping_method" :options="currentShipments"/>
                <AtomsFormKitRadio text="Payment method" name="payment_method" id="payment" :options="currentPayments"/>
                <div v-if="checkPaymentMethod" class="p-5 bg-gray-400 rounded-lg">
                    <AtomsFormKitText text="Credit card" name="card_number"/>
                    <AtomsFormKitText text="MM/YY" name="card_expiring_date"/>
                    <AtomsFormKitText text="CVC" name="card_cvc"/>
                </div>
            </FormKit>
            <AtomsSimpleButton text="Continue" size="small"/>
        </div>
        <div v-else class="w-1/2 h-96 p-10 flex items-center justify-center bg-gray-200 ">
            <h3 class=" font-sans text-2xl text-black">Cart is empty</h3>
        </div>
    </div>
</template>