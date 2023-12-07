<script setup lang="ts">

const props = defineProps<{
    text: string
    name: string
    options: Object
    id?: string
}>()

</script>

<template>
    <FormKit 
        type="radio" 
        :label="text"
        validation="required"
        validation-visibility="blur"
        :classes="{
            fieldset: 'flex',
            input: 'border border-gray-400 p-1',
            wrapper: 'flex gap-2', 
            options: 'flex flex-col gap-2',
            option: 'flex gap-4',
            outer: 'relative',
            messages: 'absolute top-15 left-0',
            message: 'font-sans text-xs font-medium text-red-500'
        }"
        :options="options"
        :id="id"
        :name="name"
        >
        </FormKit>
</template>