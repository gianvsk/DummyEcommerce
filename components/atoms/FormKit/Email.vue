<script setup lang="ts">

defineProps<{
    text: string
    name: string
    id?: string
}>()

</script>

<template>
    <FormKit 
        type="email" 
        :label="text" 
        validation="required|email|ends_with:.com" 
        validation-visibility="blur" 
        placeholder="vikas@school.com" 
        :name="name"
        :id="id"
        :classes="{
            input: 'border border-gray-400 rounded-sm p-1',
            outer: 'relative',
            messages: 'absolute top-15 left-0',
            message: 'font-sans text-xs font-medium text-red-500' 
    }"
        />
</template>