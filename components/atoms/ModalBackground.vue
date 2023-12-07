<script setup lang="ts">

    const { openCartModal, closeCartModal } = useCart()

    const background = ref(openCartModal)

    const closeModal = () => {
        closeCartModal()
    }

</script>

<template>

    <div v-if="background" class="absolute inset-0 bg-gray-400/80 z-10 md:hidden" @click="closeModal"/>

</template>