<template>
    <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-auto pt-[10vh] pb-4"
        @click.self="close"
    >
        <div
            class="bg-[#fefbea] dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-[90rem] mx-auto h-[88vh] flex flex-col relative overflow-y-auto p-6"
        >
            <CloseButton @click="$emit('close')" position="top-4 right-8 md:right-10" />

            <!-- Main content area -->
            <div
                class="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden p-4 gap-4"
            >
                <!-- Left side: Recipe details -->
                <div class="flex-1 md:w-2/3 bg-transparent md:overflow-y-auto p-4 rounded-2xl">
                    <!-- Loading & error -->
                    <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400 mt-4">
                        Loading recipe details...
                    </div>
                    <div v-else-if="error" class="text-center text-red-500 mt-4">
                        {{ error }}
                    </div>

                    <div v-else ref="exportContainer" class="export-container">
                        <!-- Top Content -->
                        <div class="flex flex-col items-center md:flex-row gap-6">
                            <!-- Image -->
                            <div class="w-full md:w-1/4 rounded-3xl overflow-hidden flex-shrink-0">
                                <img
                                    :src="recipe?.thumbnail || '/assets/no_img.png'"
                                    :alt="recipe?.name"
                                    class="w-full h-auto object-cover"
                                />
                            </div>

                            <!-- Info -->
                            <div
                                class="w-full md:w-2/3 flex flex-col items-center gap-4 text-center"
                            >
                                <h2
                                    class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center"
                                >
                                    {{ recipe?.name }}
                                </h2>
                                <div class="flex flex-wrap justify-center gap-2 pt-2">
                                    <span
                                        class="px-3 py-1 bg-pink-100 dark:bg-pink-700 text-pink-800 dark:text-pink-200 font-semibold rounded-full text-sm"
                                        >{{ recipe?.category }}</span
                                    >
                                    <span
                                        class="px-3 py-1 bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 font-semibold rounded-full text-sm"
                                        >{{ recipe?.area }}</span
                                    >
                                </div>
                                <div class="flex flex-wrap justify-center gap-2">
                                    <span
                                        v-for="(tag, index) in recipe?.tags"
                                        :key="index"
                                        class="px-3 py-1 bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-purple-200 font-semibold rounded-full text-sm"
                                        >{{ tag }}</span
                                    >
                                </div>
                                <div v-if="recipe?.youtube">
                                    <a
                                        :href="recipe?.youtube"
                                        target="_blank"
                                        class="text-pink-600 dark:text-pink-400 hover:underline font-medium"
                                        >▶ Watch on YouTube</a
                                    >
                                </div>
                            </div>
                        </div>

                        <!-- Bottom Content -->
                        <div class="flex flex-col md:flex-row gap-6 mt-6">
                            <!-- Ingredients -->
                            <div class="w-full md:w-auto min-w-[12rem] pl-6 pr-6 mb-4 md:mb-0">
                                <h3
                                    class="text-2xl font-semibold text-left text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b-4 border-gray-300 dark:border-gray-700"
                                >
                                    🧂 Ingredients
                                </h3>
                                <ul
                                    class="list-disc text-gray-700 dark:text-gray-300 space-y-1 ml-4 text-left w-auto max-w-full"
                                >
                                    <li
                                        v-for="(ing, index) in recipe?.ingredients"
                                        :key="ing"
                                        class="break-words py-1 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                                    >
                                        {{ recipe?.measures[index] }} {{ ing }}
                                    </li>
                                </ul>
                            </div>

                            <!-- Instructions + Export -->
                            <div class="w-full flex-1 pl-6">
                                <div
                                    class="flex justify-between items-center mb-4 border-b-4 border-gray-300 dark:border-gray-700 pb-2"
                                >
                                    <h3
                                        class="text-2xl font-semibold text-gray-900 dark:text-gray-100"
                                    >
                                        🍳 Instructions
                                    </h3>
                                    <button
                                        @click="showExportModal = true"
                                        class="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm"
                                    >
                                        🖨 Export / Print
                                    </button>
                                </div>
                                <p
                                    class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-left"
                                >
                                    {{ recipe?.instructions }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right side: Reviews -->
                <div
                    class="w-full md:w-1/3 mt-6 bg-white/60 dark:bg-gray-900/40 rounded-2xl p-4 border-t md:border-t-0 md:border-l border-gray-300 dark:border-gray-700 flex flex-col"
                >
                    <ReviewSection v-if="recipe" :recipeId="recipe.recipeId" class="flex-1" />
                </div>
            </div>

            <ExportModal
                :visible="showExportModal"
                @close="showExportModal = false"
                @export="handleExport"
            />
        </div>
    </div>
</template>

<script setup>
import { fetchRecipeDetail } from "@/api/recipes.js";
import ReviewSection from "@/components/reviews/ReviewSection.vue";
import CloseButton from "@/components/ui/CloseButton.vue";
import ExportModal from "@/components/ui/ExportModal.vue";
import { withLoadingAndErrorState } from "@/utils/apiHelper.js";
import { exportRecipe } from "@/utils/exportHelper.js";
import { ref, watch } from "vue";

const props = defineProps({ visible: Boolean, recipeId: String });
const emit = defineEmits(["close"]);

const recipe = ref(null);
const loading = ref(false);
const error = ref(null);
const showExportModal = ref(false);
const exportContainer = ref(null);

function close() {
    emit("close");
}

async function loadRecipe() {
    if (!props.recipeId) return;

    const data = await withLoadingAndErrorState(
        async () => await fetchRecipeDetail(props.recipeId),
        loading,
        error,
        "Failed to load recipe details."
    );
    if (data) recipe.value = data;
}

const handleExport = async (format) => {
    if (!recipe.value) return;
    const darkMode = document.documentElement.classList.contains("dark");
    await exportRecipe(recipe.value, format, darkMode);
    showExportModal.value = false;
};

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

.flex-1.md\:overflow-y-auto::-webkit-scrollbar {
    width: 3px;
}

.flex-1.md\:overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(107, 114, 128, 0.5);
    border-radius: 9999px;
}

.flex-1.md\:overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background-color: rgba(107, 114, 128, 0.7);
}

.flex-1.md\:overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

/* Firefox */
.flex-1.md\:overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(107, 114, 128, 0.5) transparent;
}

@media (max-width: 768px) {
    /* On mobile: the entire modal can scroll */
    .fixed.inset-0 {
        overflow-y: auto !important;
    }

    /* Remove duplicate scrollbars */
    .md\:overflow-hidden {
        overflow-y: visible !important;
    }

    /* Makes left & right sections not have their own scrollbars */
    .md\:overflow-y-auto {
        overflow-y: visible !important;
    }
}
</style>
