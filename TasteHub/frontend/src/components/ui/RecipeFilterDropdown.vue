<template>
    <div class="relative" ref="dropdownRef">
        <!-- Filter button -->
        <button
            @click="toggleDropdown"
            class="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
            <span class="font-semibold">Filter Options</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transform transition-transform duration-300"
                :class="{ 'rotate-180': isOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>

        <!-- Dropdown content -->
        <transition name="fade">
            <div
                v-if="isOpen"
                class="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-4 z-50"
            >
                <!-- Loading state -->
                <div v-if="loadingFilters" class="text-center text-gray-500 dark:text-gray-400">
                    Loading filters...
                </div>

                <!-- Filters -->
                <div v-else>
                    <!-- Category -->
                    <div class="mb-4">
                        <h3 class="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                            Category
                        </h3>
                        <div class="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                            <button
                                v-for="cat in categories"
                                :key="cat"
                                @click="toggleSelection('categories', cat)"
                                class="px-3 py-1 rounded-full text-sm border transition-all"
                                :class="
                                    selected.categories.includes(cat)
                                        ? 'bg-pink-100 border-pink-400 text-pink-700 dark:bg-pink-900 dark:text-pink-200'
                                        : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                                "
                            >
                                {{ cat }}
                            </button>
                        </div>
                    </div>

                    <!-- Area -->
                    <div class="mb-4">
                        <h3 class="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                            Area
                        </h3>
                        <div class="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                            <button
                                v-for="area in areas"
                                :key="area"
                                @click="toggleSelection('areas', area)"
                                class="px-3 py-1 rounded-full text-sm border transition-all"
                                :class="
                                    selected.areas.includes(area)
                                        ? 'bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                                        : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                                "
                            >
                                {{ area }}
                            </button>
                        </div>
                    </div>

                    <!-- Ingredients -->
                    <div class="mb-4">
                        <h3 class="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                            Main Ingredient
                        </h3>
                        <div class="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                            <button
                                v-for="ing in ingredients"
                                :key="ing"
                                @click="toggleSelection('ingredients', ing)"
                                class="px-3 py-1 rounded-full text-sm border transition-all"
                                :class="
                                    selected.ingredients.includes(ing)
                                        ? 'bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:text-green-200'
                                        : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                                "
                            >
                                {{ ing }}
                            </button>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="mt-5 flex justify-between items-center">
                        <button
                            @click="clearFilters"
                            class="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                        >
                            Clear Filters
                        </button>

                        <button
                            @click="applyFilters"
                            class="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { fetchFilterLists } from "@/api/recipes.js";
import { onBeforeUnmount, onMounted, ref } from "vue";

const emit = defineEmits(["apply"]);

const isOpen = ref(false);
const dropdownRef = ref(null);

const categories = ref([]);
const areas = ref([]);
const ingredients = ref([]);
const loadingFilters = ref(true);

const selected = ref({
    categories: [],
    areas: [],
    ingredients: [],
});

onMounted(async () => {
    try {
        const data = await fetchFilterLists();
        categories.value = data.categories;
        areas.value = data.areas;
        ingredients.value = data.ingredients;
    } catch (err) {
        console.error("Failed to fetch filter lists:", err);
    } finally {
        loadingFilters.value = false;
    }
});

function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

function toggleSelection(type, value) {
    if (selected.value[type].includes(value)) {
        selected.value[type] = [];
    } else {
        selected.value[type] = [value];
    }
}

function applyFilters() {
    emit("apply", { ...selected.value });
    isOpen.value = false;
}

function clearFilters() {
    selected.value = { categories: [], areas: [], ingredients: [] };
    emit("apply", { ...selected.value });
}

function handleClickOutside(event) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
