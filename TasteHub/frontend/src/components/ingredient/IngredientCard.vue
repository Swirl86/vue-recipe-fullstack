<template>
    <div
        class="relative bg-white dark:bg-gray-700 rounded-xl shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden hover:scale-105 transform transition-all duration-300 cursor-pointer p-4 flex flex-col items-center text-center"
        @click="$emit('select', ingredient)"
        role="button"
        :aria-label="`Open details for ${ingredient.name}`"
    >
        <div class="w-full h-40 mb-4 flex items-center justify-center">
            <img
                :src="ingredient.thumbnail || '/assets/no_img.png'"
                :alt="ingredient.name"
                class="max-h-full max-w-full object-contain rounded-xl"
            />
        </div>

        <h2 class="font-bold text-xl mb-2 text-gray-900 dark:text-white">
            {{ ingredient.name }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-200 line-clamp-5">
            {{ ingredient.description || "No description available." }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    ingredient: {
        type: Object,
        required: true,
    },
});
</script>
