<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';


const target = ref()

const { cart, checkout, openCart, openModal, showCartModal, closeCart } = useCart()

const open = ref(openCart)
const checkoutInfo = ref<any>(checkout)
const currentCart = ref<any>(cart)

const showCart = () => {
    openModal()
    showCartModal()
}

/* onClickOutside(target, () => openCart.value = false) */

</script>

<template>
    <div>
        <button @click="showCart">
            <img src="/icons/Cart.svg" />
        </button>
    </div>
    <div v-show="open" ref="target" :class="[' hidden md:block absolute w-96 top-12 md:top-9 md:right-6 lg:right-10 p-1 md:p-4 bg-white z-10 rounded-lg md:w-[500px] border border-gray-800',
        !cart ? ' h-60 flex items-center justify-center' : '']">
        <h5 class=" text-2xl font-sans font-semibold mb-5 p-1">Items in your cart</h5>
        <div v-if="currentCart" class="flex flex-col gap-y-1 md:max-h-96 md:overflow-y-scroll">
            <MoleculesCartItem v-for="item in currentCart" :item="item" />
        </div>
        <div v-if="checkoutInfo.skus_count > 0" class="flex flex-col justify-between">
            <div class="flex justify-between px-5 py-4">
            <span class="text-black text-lg font-sans font-medium">Subtotal (Items: {{ checkoutInfo.skus_count }})</span>
            <span class='text-black text-lg font-sans font-semibold'>{{ checkoutInfo ?
                checkoutInfo.formatted_total_amount_with_taxes : "0" }}</span>
            </div>
        </div>
        <div v-else class="py-5">
            <h5 class="text-black text-sm text-center">Cart is empty</h5>
        </div>
        <AtomsSimpleButton text="Checkout" link="/cart-summary" size="default" @click="closeCart"/>
    </div>
</template>