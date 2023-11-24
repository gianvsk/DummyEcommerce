<script setup lang="ts">

defineProps<{
    active?: boolean
    source: string
    background?: boolean
    text?: string
    small?: boolean
    right?: boolean
}>()

const param = useRoute()

</script>

<template>
    <NuxtLink :to="text === 'Home' ? '/' : '/'" :class="['lg:ml-auto', right ? 'ml-auto' : '']">
        <div
            :class="['flex relative items-center justify-start bg-gray-200',
                param.path === text?.toLowerCase() ? 'rounded-tr-[22px] rounded-br-[22px]' : '',
                background ? 'bg-gray-100 rounded-full items-center justify-center p-[10px] ml-auto' : 'pl-8 py-3 pr-9 gap-4',
                small ? 'py-2 px-2' : '']">
            <img v-if="param.path === text?.toLowerCase()" src="/icons/Rectangle.svg"
                class="absolute top-0 left-0 bottom-0 w-auto !text-red-500 !fill-current " />
            <img :src="source" :class="['w-5 h-5 !fill-current !text-red-500', small ? 'w-3 h-3' : '']" />
            <span v-if="!background">{{ text }}</span>
        </div>
    </NuxtLink>
</template>