<script setup lang="ts">

const props = defineProps<{
    text: string
    active: boolean
}>()

</script>

<template>
    <a :class="[' px-3 py-[6px] rounded-[20px]', active ? 'bg-gray-800' : 'bg-gray-100']">
        <span :class="[active ? 'text-white' : 'text-gray-600']">{{ text }}</span>
    </a>
</template>