<script setup lang="ts">

const props = defineProps<{
        item: any
    }>()

    const { sendItemId } = useUpdateProduct()

    const deleteItem = async() => {
        await sendItemId('/api/delete-item-from-cart', props.item.id)
    }
    
</script>

<template>

    <div class="flex p-4 justify-around items-center gap-1 bg-white rounded-lg cursor-default">
        <img :src="item.attributes.image_url" class=" w-28 h-28 object-cover"/>
        <div class="flex flex-col gap-2">
            <h5 class="text-black text-base text-left font-sans font-semibold">{{ item.attributes.name }}</h5>
            <h5 class="text-black text-sm text-left font-sans font-medium">{{ item.attributes.formatted_unit_amount }}</h5>
        </div>
        <div class="flex items-center gap-4">
        <div class="w-6 h-6 p-1 flex flex-col items-center justify-center gap-2 rounded-sm border border-black shadow-sm shadow-gray-400">
            <h5 class="text-black text-sm text-left">{{ item.attributes.quantity }}</h5>
        </div>
        <button @click="deleteItem" class="w-5 h-5 cursor-pointer shrink-0">
            <img src="/icons/Bin.svg"/>
        </button>
        </div>
    </div>

</template>