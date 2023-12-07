<script setup lang="ts">

const formValue = ref()

const currentStep = ref('User')
const stepNames = ['User', 'Address', 'Shipping']

const increaseStep = () => {
    stepNames.indexOf(currentStep.value) < stepNames.length - 1 ?
        currentStep.value = stepNames[stepNames.indexOf(currentStep.value) + 1] : ''
}

const decreaseStep = () => {
    stepNames.indexOf(currentStep.value) > 0 ?
        currentStep.value = stepNames[stepNames.indexOf(currentStep.value) - 1] : ''
}

const { sendDataToAddress, sendDataForShippingMethod, sendDataForSettingOrder } = useCheckout()
const { createPayment } = usePayment()

const submitApp = async () => {
    const address = {
        first_name: formValue.value.contactInfo.name,
        last_name: formValue.value.contactInfo.surname,
        line_1: formValue.value.contactInfo.address,
        city: formValue.value.contactInfo.city,
        zip_code: formValue.value.contactInfo.zipcode,
        state_code: formValue.value.contactInfo.state,
        country_code: formValue.value.contactInfo.country,
        phone: formValue.value.contactInfo.phone
    }
    const addressSent = await sendDataToAddress(address)

    const payment_method = formValue.value.contactInfo.shipping_method
    const shippingMethod = await sendDataForShippingMethod(payment_method)

    const user = {
        email: formValue.value.contactInfo.email,
        payment_method: formValue.value.contactInfo.payment_method
    }
    const paymentMethodId = addressSent.id

    const setOrder = await sendDataForSettingOrder(user, paymentMethodId)

    const newPayment = await createPayment(formValue.value.contactInfo)
}

</script>

<template>
    <FormKit type="form" @submit="submitApp" v-model="formValue" :classes="{
        form: 'shadow-lg p-5 w-min flex flex-col gap-10 w-[550px]',
    }">
        <ul class="flex w-max gap-8 p-2">
            <li v-for="step in stepNames" @click="currentStep = step" class="border-l border-gray-800 text-lg px-2">{{ step }}</li>
        </ul>

        <div class="form-body">
            <FormInfoForm :currentStep="currentStep" />
            <FormShipmentInfo :currentStep="currentStep" />
            <FormShipAndPayForm :currentStep="currentStep" />
        </div>
        <template #submit />
        <div>
            <div class="flex justify-between">
                <AtomsFormKitButton :label="'Indietro'" :click="decreaseStep" :hidden="currentStep === stepNames.at(0)"
                    :disable="currentStep !== stepNames.at(0)" />
                <AtomsFormKitButton :label="'Avanti'" :click="increaseStep"
                    :hidden="currentStep === stepNames.at(stepNames.length - 1)"
                    :disable="currentStep !== stepNames.at(stepNames.length - 1)" />
                <AtomsFormKitSubmit v-if="currentStep === stepNames.at(stepNames.length - 1)" :label="'Invia'" />
            </div>
        </div>
    </FormKit>
</template>