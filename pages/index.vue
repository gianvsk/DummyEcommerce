<script setup lang="ts">
import { AisInstantSearch, AisInfiniteHits, AisRefinementList, AisNumericMenu, AisBreadcrumb } from 'vue-instantsearch/vue3/es/index.js'

const algolia = useAlgoliaRef()
const openedModal = ref('')

const setOpenedSelect = (value: string) => {
  switch (value) {
    case 'brands':
      return openedModal.value = 'brands'
    case 'price':
      return openedModal.value = 'price'
    case '':
      return openedModal.value = ''
  }
}

</script>

<template>
      <ais-instant-search :search-client="algolia" index-name="products" :class-names="{ 'ais-InstantSearch': 'flex flex-col gap-7' }">
        <ais-breadcrumb :attributes="['categories']" />
        <div class="pills-wrapper">
          <MoleculesBadgesWrapper />
        </div>
        <div class="product-filters w-max flex gap-4">
          <div>
            <AtomsPill label="Brands" @send-open-select="setOpenedSelect">
              <div
                :class="['absolute z-[1] top-full left-0 w-auto h-auto bg-blue-200 rounded-lg', openedModal === 'brands' ? 'flex p-4' : 'hidden']">
                <ais-refinement-list attribute="brand" :sort-by="['name:asc']" :class-names="{
                  'ais-RefinementList-list': 'flex flex-col w-max',
                  'ais-RefinementList-label': 'flex gap-2 items-center',
                  'ais-RefinementList-count': '!w-[20px] !h-[20px] !bg-blue-200 !inline-flex !items-center !justify-center !rounded-full'
                }" />
              </div>
            </AtomsPill>
          </div>
          <div>
            <AtomsPill label="Price" @send-open-select="setOpenedSelect">
              <div
                :class="['absolute z-[1] top-full left-0 w-auto h-auto bg-blue-200 rounded-lg', openedModal === 'price' ? 'flex p-4' : 'hidden']">
                <ais-numeric-menu attribute="price" :items="[
                  { label: ' < 100€', end: 100 },
                  { label: ' 100 < 1000€', start: 100, end: 1000 },
                  { label: ' >= 1000€ ', start: 1000 },
                  { label: ' Show All' },
                ]" :class-names="{
  'ais-NumericMenu-item': 'w-max'
}" />
              </div>
            </AtomsPill>
          </div>
        </div>
        <div class="product-list">
          <ais-infinite-hits :class-names="{
            'ais-InfiniteHits-list': 'flex flex-col gap-5 !mt-0 !ml-0 lg:!grid lg:grid-cols-2 2xl:grid-cols-3 lg:gap-x-7 lg:gap-y-[26px]',
            'ais-InfiniteHits-item': '!w-full !p-0 !m-0 !border-0 !shadow-none'
          }">
            <template v-slot:item="{ item }">
              <MoleculesCard :item="item" />
            </template>
            <template v-slot:loadMore="{ isLastPage, refineNext }" v-show="!isLastPage">
              <button v-show="!isLastPage" class=" mt-7 px-3 py-1 bg-blue-400 rounded-3xl text-white" @click="refineNext">
                Show more results
              </button>
            </template>
          </ais-infinite-hits>
        </div>
      </ais-instant-search>
</template>