<script setup lang="ts">

const props = defineProps<{
    item: any
}>()

const { sendItemId } = useUpdateProduct()

const deleteItem = async () => {
    await sendItemId('/api/delete-item-from-cart', props.item.id)
}

</script>

<template>
    <div class="flex justify-between gap-4 bg-white cursor-default border-b border-gray-500 p-4 ">
        <div class="flex gap-4 items-center">
            <img :src="item.attributes.image_url" class="w-28 h-28 lg:object-auto" />
            <div class="flex flex-col gap-1">
                <h5 class="text-gray-800 text-base text-left font-sans font-medium"><span
                        class="text-base font-bold mr-2 text-black">Name:</span>{{ item.attributes.name }}</h5>
                <h5 class="text-gray-800 text-base text-left font-sans font-medium"><span
                        class="text-base font-bold mr-2">Quantity:</span>{{ item.attributes.quantity }}</h5>
                <h5 class="text-gray-800 text-sm text-left font-sans font-medium">{{ item.attributes.formatted_unit_amount
                }}</h5>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div
                class="w-6 h-6 p-1 flex flex-col items-center justify-center gap-2 rounded-sm border border-black shadow-sm shadow-gray-400">
                <h5 class="text-black text-sm text-left">{{ item.attributes.quantity }}</h5>
            </div>
            <button @click="deleteItem" class="w-5 h-5 cursor-pointer shrink-0 self-start">
                <img src="/icons/Cancel.svg" />
            </button>
        </div>
    </div>
</template>