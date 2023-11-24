<script setup lang="ts">
import { icons } from '~/mock';

</script>

<template>
    <nav class="w-full h-screen py-6 sticky top-0 left-0 flex flex-col items-center bg-gray-500/10">
        <img src="/icons/logo-base.png" />
        <div class="w-full mt-11 flex flex-col ">
            <template v-for="(icon, index) in icons">
                <div clss="inline-flex">
                    <AtomsLink :source="icon.src" :active="index === 0" :text="icon.tag" />
                </div>
            </template>
        </div>
    </nav>
</template>