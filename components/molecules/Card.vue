<script setup lang="ts">

const props = defineProps<{
    item: any
}>()

const quantity = ref(1)

const { addItemSelectedQuantity } = useUpdateProduct()

const addSelectedItem = () => {
  addItemSelectedQuantity(props.item, quantity.value)
}

const increaseQuantity = () => {
    quantity.value = Math.min(10, quantity.value + 1)
}

const reduceQuantity = () => {
    quantity.value = Math.max(1, quantity.value - 1)
}

</script>

<template>
    <div class="flex flex-col gap-4 rounded-lg overflow-hidden shadow-md">
        <div class="w-full relative">
            <NuxtLink :to="`/products/${item.objectID}`">
                <div class="absolute inset-0 bg-[rgba(193,192,229,0.08)]" />
                <img v-if="item.imageUrl" :src="item.imageUrl" class="w-full  h-[236px] object-contain" />
            </NuxtLink>

        </div>
        <div class="flex p-2 gap-4">
            <img src="/icons/Avater.png" class="w-[25px] h-[25px]" />
            <div class="w-full flex flex-col gap-3">
                <div class="flex flex-col">
                    <span class=" font-semibold text-gray-800 text-sm">{{ item.name }}</span>
                    <span class=" font-normal text-gray-600 text-sm">Eshop Spot</span>
                </div>
                <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div class="flex flex-col gap-2">
                        <div class=" inline-flex gap-2">
                            <span class=" font-semibold text-yellow-500 text-sm">{{ item.price }} €</span>
                            <span class=" font-normal text-gray-500 text-sm ">{{ item.price }} €</span>
                        </div>
                        <div class=" inline-flex gap-4 items-center">
                            <span v-if="item.weight" class="font-normal text-gray-600 text-xs">{{ item.weight }}
                                sales</span>
                            <div class="inline-flex gap-2">
                                <img src="/icons/Star.svg" class="w-[18px] h-[18px]" />
                                <span v-if="item.reviews" class="font-normal text-gray-600 text-xs">
                                    {{ item.reviews.length > 0 ? item.reviews.reduce((el: number, acc = 0) => acc + el) /
                                        item.reviews.length : '0' }} (
                                    {{ item.reviews.length.toString() }} )</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <AtomsButton source="/icons/Plus.svg" :background="true" :small="true" @click="increaseQuantity" />
                        <h5>{{ quantity }}</h5>
                        <AtomsButton source="/icons/MinusNoCircle.svg" :background="true" :small="true" @click="reduceQuantity" />
                        <AtomsButton source="/icons/CartPlusSolid.svg" :background="true" @click="addSelectedItem" :right="true"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>