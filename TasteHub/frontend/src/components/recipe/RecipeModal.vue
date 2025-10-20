<template>
    <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-auto pt-[10vh] pb-4"
        @click.self="close"
    >
        <div
            class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-[90rem] mx-auto h-[88vh] flex flex-col overflow-hidden relative"
        >
            <!-- Close button -->
            <button
                @click="close"
                class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-3xl z-10"
            >
                ✖
            </button>

            <!-- Image (upper part) -->
            <div class="w-full h-64 md:h-80 relative overflow-hidden rounded-t-3xl">
                <img
                    :src="recipe?.thumbnail || '/assets/no_img.png'"
                    :alt="recipe?.name"
                    class="w-full h-full object-cover"
                />

                <div
                    class="absolute bottom-4 right-4 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg p-1 flex items-center justify-center overflow-hidden w-28 h-28 border border-gray-300 dark:border-gray-600 transition-transform duration-300 hover:scale-110"
                >
                    <img
                        :src="recipe?.thumbnail || '/assets/no_img.png'"
                        :alt="recipe?.name"
                        class="max-w-full max-h-full object-contain rounded-lg"
                    />
                </div>
            </div>

            <!-- Content (lower part) -->
            <div
                class="p-6 flex-1 flex flex-col overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-900 rounded-b-3xl"
            >
                <!-- Loading & error states -->
                <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400 mt-4">
                    Loading recipe details...
                </div>
                <div v-else-if="error" class="text-center text-red-500 mt-4">
                    {{ error }}
                </div>

                <div class="max-w-5xl mx-auto px-4 flex flex-col items-center space-y-4 mb-6">
                    <!-- Row 1: Title & optional YouTube -->
                    <div
                        class="w-full flex flex-col md:flex-row justify-center md:justify-center items-center gap-4"
                    >
                        <h2
                            class="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight text-center"
                        >
                            {{ recipe?.name }}
                        </h2>

                        <div v-if="recipe?.youtube" class="mt-2 md:mt-0">
                            <a
                                :href="recipe?.youtube"
                                target="_blank"
                                class="text-pink-600 dark:text-pink-400 hover:underline font-medium"
                            >
                                ▶ Watch on YouTube
                            </a>
                        </div>
                    </div>

                    <!-- Row 2: Category & Area / Tags -->
                    <div
                        class="w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-4"
                    >
                        <!-- Category & Area -->
                        <div class="flex gap-2 flex-wrap justify-center md:justify-start">
                            <span
                                class="px-3 py-1 bg-pink-100 dark:bg-pink-700 text-pink-800 dark:text-pink-200 font-semibold rounded-full text-sm"
                            >
                                {{ recipe?.category }}
                            </span>
                            <span
                                class="px-3 py-1 bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 font-semibold rounded-full text-sm"
                            >
                                {{ recipe?.area }}
                            </span>
                        </div>

                        <!-- Tags -->
                        <div
                            v-if="recipe?.tags?.length"
                            class="flex gap-2 flex-wrap justify-center md:justify-end mt-2 md:mt-0"
                        >
                            <span
                                v-for="(tag, index) in recipe?.tags"
                                :key="index"
                                class="px-3 py-1 bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-purple-200 font-semibold rounded-full text-sm"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
                    <!-- Ingredients -->
                    <div class="md:w-5/12 overflow-y-auto pr-4">
                        <h3
                            class="text-2xl font-semibold text-left text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-300 dark:border-gray-700 pb-2"
                        >
                            🧂 Ingredients
                        </h3>

                        <ul
                            class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1"
                            :style="{
                                columnCount: ingredientColumnCount,
                                textAlign: 'left',
                            }"
                        >
                            <li v-for="(ing, index) in recipe?.ingredients" :key="ing">
                                {{ recipe?.measures[index] }}
                                {{ ing }}
                            </li>
                        </ul>
                    </div>

                    <!-- Divider -->
                    <div class="hidden md:block w-px bg-gray-300 dark:bg-gray-600"></div>

                    <!-- Instructions -->
                    <div class="md:w-7/12 overflow-y-auto pl-4 pr-6">
                        <h3
                            class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 flex items-center gap-2"
                        >
                            🍳 Instructions
                        </h3>
                        <p
                            class="text-left text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                        >
                            {{ recipe?.instructions }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { fetchRecipeDetail } from "@/api/recipes.js";
import { computed, ref, watch } from "vue";

const props = defineProps({
    visible: Boolean,
    recipeId: String,
});

const emit = defineEmits(["close"]);

const recipe = ref(null);
const loading = ref(false);
const error = ref(null);

function close() {
    emit("close");
}

async function loadRecipe() {
    if (!props.recipeId) return;
    loading.value = true;
    error.value = null;

    try {
        const data = await fetchRecipeDetail(props.recipeId);
        recipe.value = data;
    } catch (err) {
        console.error(err);
        error.value = "Failed to load recipe details.";
    } finally {
        loading.value = false;
    }
}

// Determine column count: max 2
const ingredientColumnCount = computed(() => {
    const count = recipe.value?.ingredients?.length || 0;
    if (count <= 6) return 1;
    if (count <= 12) return 2;
    return 2;
});

// Fetch recipe details when recipeId changes
watch(() => props.recipeId, loadRecipe, { immediate: true });
</script>

<style scoped>
/* Fade + scale animation */
@keyframes fadeInScale {
    0% {
        opacity: 0;
        transform: scale(0.95);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

div[v-cloak] > div {
    animation: fadeInScale 0.2s ease-out;
}
</style>
