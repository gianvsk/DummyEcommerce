<script setup lang="ts">
import { interactiveIcons } from '~/mock';
</script>

<template>
    <div class="flex gap-6 items-center justify-end shrink-0 lg:justify-center">
        <template v-for="(icon,index) in interactiveIcons">
            <button v-if="index !== 2">
                <img  :src="icon"/>
            </button>
            <MoleculesCart v-else/>
        </template>
        <button>
            <img src="/icons/Avater.png"/>
        </button>
    </div>


</template>