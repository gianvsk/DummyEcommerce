<script setup lang="ts">

defineProps<{
    text: string
    name: string
    id?: string
}>()

</script>

<template>
    <FormKit 
        type="text" 
        :label="text" 
        validation="required"
        validation-visibility="blur"
        :classes="{
            input: 'border border-gray-400 rounded-sm p-1',
            outer: 'relative',
            messages: 'absolute top-15 left-0',
            message: 'font-sans text-xs font-medium text-red-500'

        }"
        :id="id"
        :name="name"
        />
</template>