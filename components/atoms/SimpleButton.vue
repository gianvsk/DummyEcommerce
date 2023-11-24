<script setup lang="ts">

    defineProps<{
        text: string
        link: string
        size?: 'small' | 'default'
    }>()

</script>

<template>

    <NuxtLink :to="link ? link : '/'" :class="['py-[10px] px-6 bg-yellow-500 text-black rounded-[100px] flex justify-center',  size === 'small' ? 'w-min' : 'w-max self-end']">
        {{ text }}
    </NuxtLink>

</template>