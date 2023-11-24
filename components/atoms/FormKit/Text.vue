<script setup lang="ts">

defineProps<{
    text: string
    name: string
    id?: string
    required?: boolean
}>()

</script>

<template>
    <FormKit 
        type="text" 
        :label="text" 
        validation="required"
        validation-visibility="blur"
        :classes="{
            input: 'border border-gray-400 rounded-md'

        }"
        :id="id"
        :name="name"
        />
</template>