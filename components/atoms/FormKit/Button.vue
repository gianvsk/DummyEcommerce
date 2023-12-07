<script setup lang="ts">

defineProps<{
    label: string
    hidden: boolean
    disable: boolean
    click: () => void
}>()

</script>

<template>
    <FormKit type="button" :label="label" :classes="{
        outer: !hidden ? 'border-2 border-yellow-500 py-2 px-4 rounded-sm' : 'invisible',
        label: 'font-sans text-base font-medium'
    }" @click="click" :disable="disable">
        <template v-if="hidden" #label />
    </FormKit>
</template>