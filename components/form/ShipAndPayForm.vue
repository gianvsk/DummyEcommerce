<script setup lang="ts">

    defineProps<{
        currentStep: string
    }>()

    const { getShippingMethods, getPaymentMethods, radioOptionsShippingMethods, radioOptionsPaymentMethods } = useCheckout()

    const shipments = await getShippingMethods()
    const payments = await getPaymentMethods()
    const currentShipment = await radioOptionsShippingMethods(shipments)
    const currentPayment = await radioOptionsPaymentMethods(payments)

</script>

<template>
    <section v-show="currentStep === 'Shipping'">
        <FormKit type="group" id="contactInfo" name="contactInfo">
            <div class="flex flex-col gap-5">
                <AtomsFormKitRadio text="Shipping method" name="shipping_method" :options="currentShipment"/>
                <AtomsFormKitRadio text="Payment method" name="payment_method" id="payment" :options="currentPayment"/>
                <div v-if="getNode('payment')?.context?._value" class="p-5 flex flex-col bg-gray-400/20 rounded-lg gap-y-5">
                    <AtomsFormKitText text="Credit card" name="card_number" />
                    <div class="flex gap-5">
                        <AtomsFormKitText text="MM/YY" name="card_expiring_date" />
                        <AtomsFormKitText text="CVC" name="card_cvc" />
                    </div>
                </div>
            </div>
        </FormKit>
    </section>
</template>