<template>
    <div
        class="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 cursor-pointer"
        @click="emit('select', recipe)"
    >
        <button
            @click.stop="emit('delete', recipe)"
            class="absolute top-3 right-3 p-2 rounded-full bg-red-500/90 dark:bg-red-700/80 backdrop-blur-sm shadow-md hover:scale-110 transition-transform duration-200"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6 text-white"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>

        <div class="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[4/3] mx-auto">
            <img
                :src="recipe.thumbnail || '/assets/no_img.png'"
                :alt="recipe.name"
                class="w-full h-full object-cover"
            />
        </div>

        <div class="p-4">
            <h2 class="font-bold text-xl mb-1 text-gray-900 dark:text-white">
                {{ recipe.name }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-300">
                <span v-if="recipe.category">{{ recipe.category }}</span>
                <span v-if="recipe.category && recipe.area"> | </span>
                <span v-if="recipe.area">{{ recipe.area }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    recipe: Object,
});

const emit = defineEmits(["select", "delete"]);
</script>
