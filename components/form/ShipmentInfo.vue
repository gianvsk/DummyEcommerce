<script setup lang="ts">

    defineProps<{
        currentStep: string
    }>()

</script>

<template>
    <section v-show="currentStep === 'Address'">
        <h5 class="mb-5 font-sans text-xl">Insert your address</h5>
        <FormKit type="group" id="contactInfo" name="contactInfo">
            <div class="flex flex-col gap-5">
                <div class="flex gap-5 flex-wrap">
                <AtomsFormKitText text="Address" name="address" />
                <AtomsFormKitText text="City" name="city" />
                <AtomsFormKitText text="Country" name="country" />
                <AtomsFormKitText text="State" name="state" />
                <AtomsFormKitText text="Zipcode" name="zipcode"/>
                </div>
            </div>
        </FormKit>
    </section>
</template>