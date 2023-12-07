<script setup lang="ts">

const { capturePayment, createPaymentSource } = usePayment()
const { placeOrder } = useCheckout()
const { checkCookie } = useCart()

onBeforeMount(async() => {
    const {data: paymentSource} = await createPaymentSource()
    const capturedPayment = await capturePayment()
    /* const placedOrder = await placeOrder(paymentSource.id) */
    if (capturedPayment.data) {
        const currentCartId = useCookie('cartId')
        currentCartId.value = null
        checkCookie()
    }
})

</script>

<template>
    <div class="flex flex-col gap-4">
        <h3 class="font-sans text-2xl font-medium">Payment executed successfully</h3>
        <h5>A mail has been sent to your email address. Check your bill and the informations about your order.</h5>
        <NuxtLink to="/" class="px-4 py-2 bg-gray-800 text-white w-max rounded-sm font-sans font-normal">
            Go to the Homepage
        </NuxtLink>
    </div>
</template>