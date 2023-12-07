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
  <ais-instant-search :search-client="algolia" index-name="products"
    :class-names="{ 'ais-InstantSearch': 'flex flex-col gap-7' }">
    <ais-breadcrumb :attributes="['categories']" :classes="{
      'ais-Breadcrumb-link': 'font-light'
    }" />
    <div class="pills-wrapper">
      <MoleculesBadgesWrapper />
    </div>
    <div class="product-filters w-max flex gap-4">
      <div>
        <AtomsPill label="Brands" @send-open-select="setOpenedSelect">
          <div
            :class="['absolute z-[1] top-[105%] left-0 w-auto h-auto border bg-white border-gray-800 rounded-lg', openedModal === 'brands' ? 'flex p-1' : 'hidden']">
            <ais-refinement-list attribute="brand" :sort-by="['name:asc']" :class-names="{
              'ais-RefinementList-list': 'flex flex-col w-full bg-white',
              'ais-RefinementList-label': 'w-full flex gap-2 items-center p-2 bg-white border-b border-gray-200',
              'ais-RefinementList-labelText': 'text-left text-xl',
              'ais-RefinementList-count': '!bg-white !rounded-full !w-5 !h-5 !ml-auto'
            }" />
          </div>
        </AtomsPill>
      </div>
      <div>
        <AtomsPill label="Price" @send-open-select="setOpenedSelect">
          <div
            :class="['absolute z-[1] top-[105%] left-0 w-auto h-auto bg-white border border-gray-800 rounded-lg', openedModal === 'price' ? 'flex p-1' : 'hidden']">
            <ais-numeric-menu attribute="price" :items="[
              { label: ' less than 100€', end: 100 },
              { label: ' 100 < 1000€', start: 100, end: 1000 },
              { label: ' more than 1000€ ', start: 1000 },
              { label: ' Show all' },
            ]" :class-names="{
              'ais-NumericMenu-list': 'w-max',
              'ais-NumericMenu-item': 'w-full py-1 bg-white border-b border-gray-200',
              'ais-NumericMenu-label': 'flex items-center justify-between gap-2 p-2'
}" />
          </div>
        </AtomsPill>
      </div>
    </div>
    <div class="product-list">
      <ais-infinite-hits :class-names="{
        'ais-InfiniteHits-list': 'flex flex-col gap-5 !mt-0 !ml-0 md:!grid md:grid-cols-2 2xl:grid-cols-3 lg:gap-x-7 lg:gap-y-[26px]',
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