<script setup lang="ts">

defineProps<{
    item: any
}>()

</script>

<template>
    <div class="flex gap-4 py-2 px-4 border-b border-black rounded-lg bg-white last:border-b-0">
        <NuxtLink :to="`/products/${item.objectID}`">
            <div class="flex gap-4">
                <NuxtImg fit="cover" :src="item.imageUrl" class="w-32 h-[120px] object-fill" sizes=" 100vw xl:100px 2xl:150px"/>
                <div class="flex flex-col gap-2">
                    <span class=" font-semibold text-gray-800 text-sm lg:text-base">{{ item.name }}</span>
                    <span class=" font-normal text-gray-500 text-sm lg:text-base">{{ item.price }} €</span>
                    <span class=" font-normal text-gray-500 text-sm lg:text-base">{{ item.description }}</span>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>