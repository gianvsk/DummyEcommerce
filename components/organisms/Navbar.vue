<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { AisInstantSearch, AisSearchBox, AisStateResults, AisConfigure, AisPagination } from 'vue-instantsearch/vue3/es/index.js'

const algolia = useAlgoliaRef()

const { closeSearchbar} = useSearchbar()

const searchbar = ref()
onClickOutside(searchbar.value, () => closeSearchbar())

</script>

<template>
    <div ref="searchbar" class="w-full flex flex-col-reverse gap-4 lg:flex-row lg:items-start lg:justify-between">
        <ais-instant-search :search-client="algolia" index-name="products"
            :class-names="{ 'ais-InstantSearch': 'relative flex flex-col-reverse gap-2 md:flex-col md:justify-center md:items-start lg:w-1/2' }">
            <ais-search-box :class-names="{ 'ais-SearchBox': 'w-full mb-4 md:mb-0' }" />
            <ais-configure :hits-per-page.camel="3" />
            <ais-state-results class="w-full">
                <template v-slot="{ state: { query }, results: { hits } }">
                    <div class="relative">
                        <div v-if="!hits.length" class=" absolute top-12 left-0 lg:top-0">
                            No results found for the query: <q>{{ query }}</q>
                        </div>
                        <div v-if="hits.length > 0 && query.length > 2"
                            class="absolute top-11 left-0 right-0 bg-[#f1f1f1] z-[5] flex flex-col justify-between gap-2 p-4 rounded-b-lg min-h-[387.2px] md:top-0 lg:min-h-[515.2px]">
                            <div class="flex flex-col gap-2">
                                <div v-for="hit in hits">
                                    <MoleculesSearchbarResult :item="hit" :key="hit.name" />
                                </div>
                            </div>
                            <ais-pagination v-if="hits.length" :class-names="{ 'ais-Pagination': 'py-2' }" />
                        </div>
                    </div>
                </template>
            </ais-state-results>
        </ais-instant-search>
        <MoleculesInteractiveIconsButton />
    </div>
</template>