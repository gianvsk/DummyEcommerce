<script setup lang="ts">

const { checkCookie, refreshCart } = useCart()

checkCookie()
refreshCart()

</script>

<template>
  <div class="lg:grid lg:grid-cols-12">
    <div class="hidden lg:block lg:col-start-1 lg:col-end-3">
      <OrganismsSidebar />
    </div>
    <div class="flex flex-col p-6 gap-7 lg:col-start-3 lg:col-end-13">
      <div class="w-full relative flex flex-col gap-7">
        <OrganismsNavbar />
        <NuxtPage />
      </div>
    </div>
    <OrganismsCartModal/>
    <AtomsModalBackground/>
  </div>
</template>
