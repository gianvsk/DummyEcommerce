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
        />
</template>