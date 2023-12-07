<script setup lang="ts">

const { openCartModal, cart, checkout, closeCartModal } = useCart()

const checkoutInfo = ref<any>(checkout)
const currentCart = ref<any>(cart)
const open = ref<any>(openCartModal)

</script>

<template>
    <div v-show="open" :class="[' absolute left-0 right-0 top-6 p-1 m-4 md:hidden md:mx-auto md:w-[600px] bg-white z-20 rounded-lg',
        !cart ? ' h-60 flex flex-col items-start justify-center' : '']">
        <div v-if="currentCart" class="flex flex-col gap-y-1 max-h-[460px] overflow-y-scroll">
            <MoleculesCartItem v-for="item in currentCart" :item="item" />
        </div>
        <div class="flex justify-between bg-white mb-5 px-5 py-4">
            <span class="text-black text-lg font-sans font-bold">Subtotal:</span>
            <span class='text-black text-lg font-sans font-semibold'>{{ checkoutInfo ?
                checkoutInfo.formatted_total_amount_with_taxes : "0" }}</span>
        </div>
        <AtomsSimpleButton text="Check cart" link="/cart-summary" size="default" @click="closeCartModal" />
        <h5 v-if="!checkoutInfo" class="text-black text-sm text-center">Cart is empty</h5>
    </div>
</template>