<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

const props = defineProps<{
    label: string
}>()

const emit = defineEmits<{
    (e: 'sendOpenSelect', value: string): string
}>()

const target = ref()
const show = ref(false)

const sendOpenSelect = () => {
    emit('sendOpenSelect', props.label.toLowerCase())
    show.value = true
}

onClickOutside(target, () => {
    show.value = false
}) 

</script>

<template>
    <div class="relative" ref="target">
        <button class="px-4 py-2 bg-blue-400 text-sm text-white rounded-full" @click="sendOpenSelect">
            {{ label }}
        </button>
        <div v-show="show">
            <slot />
        </div>
    </div>
</template>