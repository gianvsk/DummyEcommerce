<script setup lang="ts">

    defineProps<{
        text: string
        link: string
        size?: 'small' | 'default'
    }>()

</script>

<template>

    <NuxtLink :to="link ? link : '/'" :class="['py-[10px] px-6 bg-gray-800 flex justify-center text-white rounded-sm',  size === 'small' ? 'w-min ' : 'w-full self-end']">
        {{ text }}
    </NuxtLink>

</template>