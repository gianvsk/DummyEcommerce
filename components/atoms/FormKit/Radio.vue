<script setup lang="ts">


const props = defineProps<{
    text: string
    name: string
    options: string[]
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
            input: 'border border-gray-400',
            wrapper: 'flex gap-2', 
            options: 'flex flex-col gap-2',
            option: 'flex gap-4'
        }"
        :options="options"
        :id="id"
        :name="name"
        >
        </FormKit>
</template>