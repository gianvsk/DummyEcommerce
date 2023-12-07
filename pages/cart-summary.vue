<script setup lang="ts">

const { cart } = useCart()

const currentCart = ref<any>(cart)

</script>

<template>
    <div class="flex flex-col p-7 gap-3">
        <h3 class="text-2xl text-black font-sans font-semibold">Order summary</h3>
        <div v-if="cart" class="flex flex-col gap-8">
            <h4 class="text-xl text-black font-sans font-medium">Items</h4>
            <div v-for="item in currentCart" class="flex items-center shadow-lg p-2 justify-between">
                <div class="flex gap-3">
                    <img :src="item.attributes.image_url" class=" w-56 h-56 md:w-36 md:h-36 object-contain" />
                    <div class="flex flex-col gap-1 pt-5">
                        <h5 class="text-black font-sans font-normal"><span class="font-semibold">Name: </span>{{ item.attributes.name }}</h5>                        
                        <h5 class="text-black font-sans font-normal"><span class="font-semibold">Code: </span>{{ item.attributes.sku_code }}</h5>
                        <h5 class="text-black font-sans font-normal"><span class="font-semibold">Quantity: </span>{{ item.attributes.quantity }}</h5>
                        <h5 class="text-black font-sans font-normal">{{ item.attributes.formatted_unit_amount }}</h5>
                    </div>
                </div>
                <div>
                    <FormKit 
                        type="select"
                        label="Quantity"
                        :classes="{
                            wrapper: 'flex gap-2',
                            option: 'text-black',
                            input: 'border border-gray-600 rounded-sm'
                        }"
                        :options="
                           Array.from(Array(10).keys())"
                        :value="1"
                    />
                </div>
            </div>
            <h4 class="text-xl text-black font-sans font-medium">User</h4>
            <FormUserForm/>
        </div>
        <div v-else class="w-1/2 h-96 p-10 flex items-center justify-center bg-gray-200 ">
            <h3 class=" font-sans text-2xl text-black">Cart is empty</h3>
        </div>
    </div>
</template>