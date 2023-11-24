<script setup lang="ts">

</script>

<template>

    <div class="flex justify-between py-[10px] px-6 rounded-[200px] bg-gray-100">
        <div class="flex gap-2">
            <FormKit
                placeholder="Search" 
                :classes="{
                inner: 'flex',
                input: 'w-full ml-2 bg-gray-100 placeholder:text-black' 
            }">
                <template #prefixIcon>
                    <button>
                        <img src="/icons/Search.svg"/>
                    </button>
                </template>
                </FormKit>
            <button>
                <img src="/icons/Microphone.svg"/>
            </button>
        </div>
    </div>

</template>