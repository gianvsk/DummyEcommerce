<script setup lang="ts">

const props = defineProps<{
    active?: boolean
    source: string
    background?: boolean
    text?: string
}>()

const param = useRoute()

const setTextLink = computed(() => {
    switch(props.text) {
        case 'Home':
            return '/'
        case 'Discover':
            return '/discover'
    }
})

</script>

<template>
    <NuxtLink :to="setTextLink" class=" ml-auto">
        <div
            class='flex relative items-center justify-center gap-4 rounded-tr-[22px] rounded-br-[22px] bg-gray-100 rounded-full p-[10px] ml-auto' >
            <img src="/icons/Rectangle.svg"
                class="absolute top-0 left-0 bottom-0 w-auto !text-red-500 !fill-current " />
            <img :src="source" :class="['w-5 h-5 !fill-current !text-red-500']" />
            <span v-if="!background">{{ text }}</span>
        </div>
    </NuxtLink>
</template>