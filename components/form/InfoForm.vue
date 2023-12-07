<script setup lang="ts">

defineProps<{
    currentStep: string
}>()

</script>

<template>
    <section v-show="currentStep === 'User'">
        <h5 class="mb-5 font-sans font-semibold text-xl">Insert your personal details</h5>
        <FormKit type="group" id="contactInfo" name="contactInfo">
            <div class="flex flex-col gap-5">
                <div class="flex gap-10">
                    <AtomsFormKitText text="Name" name="name" id="name" />
                    <AtomsFormKitText text="Surname" name="surname" id="surname" />
                </div>
                <AtomsFormKitEmail text="Email" name="email" id="email" />
                <AtomsFormKitText text="Phone" name="phone" id="phone" />
            </div>
        </FormKit>
    </section>
</template>