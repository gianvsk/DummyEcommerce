<script setup lang="ts">
import { AisMenu } from 'vue-instantsearch/vue3/es/index.js'

</script>

<template>
        <div class="flex flex-nowrap gap-6 overflow-hidden">
            <ais-menu 
                attribute="categories" 
                :class-names="{'ais-Menu': 'flex gap-4 overflow-x-scroll lg:overflow-auto'}"
                >
                <template #default="{ items, refine }">
                        <AtomsBadge
                            v-for="item in items"
                            :key="item.value" 
                            :text="item.label" 
                            :active="item.isRefined"
                            @click.prevent="refine(item.value)"
                            />
                </template>
            </ais-menu>
        </div>
</template>