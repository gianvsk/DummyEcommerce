<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';


const target = ref()

const { cart, checkout, openCart, openModal, showCartModal } = useCart()

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
    <div v-show="open" ref="target" :class="[' hidden lg:block absolute w-96 top-12 right-10 p-1 bg-gray-100 z-10 rounded-lg lg:w-[500px]',
        !cart ? ' h-60 flex items-center justify-center' : '']">
        <h5 class=" text-3xl font-sans font-bold mb-2 p-1">Cart</h5>
        <div v-if="currentCart" class="flex flex-col gap-y-1">
            <MoleculesCartItem v-for="item in currentCart" :item="item" />
            <div v-show="checkoutInfo" class=" flex flex-col gap-2 px-12 py-4">
                <h3 class="text-black text-xl font-sans font-bold self-start mb-2">Order summary</h3>
                <div v-for="item in currentCart" class="flex justify-between gap-4">
                    <h5 class="font-sans text-base">{{ item.attributes.name }}</h5>
                    <div class="flex gap-4">
                        <h5 class="font-sans text-base"> x{{ item.attributes.quantity }}</h5>
                        <h5 class="font-sans text-base">{{ item.attributes.formatted_total_amount }}</h5>
                    </div>
                </div>
                <div class="flex justify-between">
                    <span class="text-black text-lg font-sans font-bold">Total:</span>
                    <span class='text-black text-lg font-sans font-semibold'>{{ checkoutInfo ?
                        checkoutInfo.formatted_total_amount_with_taxes : "0" }}</span>
                </div>
                <AtomsSimpleButton text="Check cart" link="/cart-summary" size="default" />
            </div>
        </div>
        <h5 v-else class="text-black text-sm text-center">Cart is empty</h5>
    </div>
    <!--         <div v-show="cart.length > 0" class="absolute -top-2 left-1/2 w-4 h-4 rounded-full flex items-center justify-center bg-red-500">
            <h5 class=" text-[10px] text-white">{{ cart.length }}</h5>
        </div> -->
</template>