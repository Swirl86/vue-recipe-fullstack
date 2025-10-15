<template>
    <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
    >
        <img
            :src="recipe.thumbnail || '/assets/no_img.png'"
            :alt="recipe.name"
            class="w-full h-48 object-cover"
        />
        <div class="p-4">
            <h2 class="font-bold text-xl mb-1">{{ recipe.name }}</h2>
            <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ recipe.category }} | {{ recipe.area }}
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    recipe: Object,
});
</script>
