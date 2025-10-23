<template>
    <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 cursor-pointer"
        @click="emit('select', recipe)"
    >
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
    recipe: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["select"]);
</script>
