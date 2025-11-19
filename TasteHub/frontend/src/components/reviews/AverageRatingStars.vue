<template>
    <div
        v-if="avgRating >= 0"
        class="w-full md:w-1/4 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-md"
    >
        <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Average Rating</h4>

        <div class="flex gap-1 text-2xl">
            <div v-for="i in 5" :key="i" class="relative w-6 h-6">
                <!-- Gray background star -->
                <span class="absolute inset-0 text-gray-300 dark:text-gray-600 select-none">★</span>

                <!-- Yellow filled star -->
                <span
                    class="absolute inset-0 text-yellow-500 overflow-hidden select-none"
                    :style="{
                        width:
                            fillAmount(
                                i,
                                Math.floor(avgRating),
                                avgRating - Math.floor(avgRating)
                            ) + '%',
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                    }"
                >
                    ★
                </span>
            </div>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ avgRating.toFixed(1) }} / 5</p>
    </div>
</template>

<script setup>
import { fillAmount } from "@/utils/reviewRatingHelper.js";

const props = defineProps({
    avgRating: { type: Number, required: true },
});
</script>
