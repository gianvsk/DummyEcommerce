<script setup lang="ts">

    defineProps<{
      label: string
    }>()

</script>

<template>

    <FormKit 
        type="submit" 
        :label="label" 
        :classes="{
            outer: 'border-2 bg-yellow-400 border-black/20 py-2 px-5 rounded-sm',
            label: 'font-sans text-base font-medium'
        }" 
    />

</template>