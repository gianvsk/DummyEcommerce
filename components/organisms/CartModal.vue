<script setup lang="ts">

const { openCartModal, cart, checkout, closeCartModal } = useCart()

const checkoutInfo = ref<any>(checkout)
const currentCart = ref<any>(cart)
const open = ref<any>(openCartModal)

</script>

<template>
    <div v-show="open" :class="[' absolute left-0 right-0 top-14 p-1 m-4 lg:hidden lg:mx-auto lg:w-[600px] bg-gray-100 z-20 rounded-lg',
        !cart ? ' h-60 flex items-center justify-center' : '']">
        <div v-if="currentCart" class="flex flex-col gap-y-1">
            <MoleculesCartItem v-for="item in currentCart" :item="item" />
            <div v-show="checkoutInfo" class=" flex flex-col gap-2 px-4 sm:px-10 md:px-20 py-4">
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
                <AtomsSimpleButton text="Check cart" link="/cart-summary" size="default" @click="closeCartModal" />
            </div>
        </div>
        <h5 v-else class="text-black text-sm text-center">Cart is empty</h5>
    </div>
</template>