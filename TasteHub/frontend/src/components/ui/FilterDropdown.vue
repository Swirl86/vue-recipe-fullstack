<template>
    <div class="relative" ref="dropdownRef">
        <!-- Filter button -->
        <button
            @click="toggleDropdown"
            class="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all"
            :class="$attrs.class"
        >
            <span class="font-semibold min-w-[150px] block">
                {{
                    isOpen
                        ? "Select Filter Type"
                        : appliedType && appliedValue
                        ? appliedType + ": " + appliedValue
                        : "Select Filter Type"
                }}
            </span>

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
                class="absolute right-0 mt-6 w-[40rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-4 z-50 flex flex-col items-center"
            >
                <!-- Loading -->
                <div v-if="isLoadingFilters" class="text-center text-gray-500 dark:text-gray-400">
                    Loading filters...
                </div>
                <div v-if="error" class="text-red-500">{{ error }}</div>

                <div v-else class="w-full">
                    <!-- Filter Type Selection -->
                    <div class="flex flex-col items-center w-full">
                        <h3
                            class="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300 text-center"
                        >
                            Filter Types
                        </h3>
                        <div class="flex gap-2 mt-1 flex-wrap justify-center">
                            <button
                                v-for="type in filterTypes"
                                :key="type"
                                @click="selectFilterType(type)"
                                class="px-3 py-1 rounded-full border text-sm font-medium transition-all"
                                :class="
                                    activeFilterType === type
                                        ? 'bg-pink-100 border-pink-400 text-pink-700 dark:bg-pink-900 dark:text-pink-200'
                                        : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                                "
                            >
                                {{ type }}
                            </button>
                        </div>
                    </div>

                    <div class="border-t border-gray-200 dark:border-gray-700 my-4 w-full"></div>

                    <!-- Filter Options -->
                    <div v-if="activeFilterType" class="flex flex-col items-center w-full">
                        <h3
                            class="text-sm font-bold mb-4 text-gray-700 dark:text-gray-300 text-center"
                        >
                            Select {{ activeFilterType }}
                        </h3>
                        <div
                            class="flex flex-wrap gap-2 max-h-40 overflow-y-auto justify-center w-full"
                        >
                            <button
                                v-for="option in availableOptions"
                                :key="option"
                                @click="selectOption(option)"
                                class="px-3 py-1 rounded-full text-sm border transition-all"
                                :class="
                                    activeOption === option
                                        ? 'bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:text-green-200'
                                        : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                                "
                            >
                                {{ option }}
                            </button>
                        </div>
                    </div>

                    <div
                        v-if="activeFilterType"
                        class="border-t border-gray-200 dark:border-gray-700 my-4 w-full"
                    ></div>

                    <!-- Action Buttons -->
                    <div v-if="activeFilterType" class="mt-2 flex justify-between w-full">
                        <button
                            @click="clearFilters"
                            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold text-sm transition-all shadow-sm enabled:hover:bg-gray-200 enabled:dark:hover:bg-gray-700 enabled:hover:text-pink-600 enabled:dark:hover:text-pink-400 disabled:bg-gray-400 disabled:dark:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                            :disabled="!appliedType || !appliedValue"
                        >
                            Clear
                        </button>

                        <button
                            @click="applyFilters"
                            class="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
                            :disabled="
                                !activeOption ||
                                (appliedType === activeFilterType && appliedValue === activeOption)
                            "
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { fetchFilterLists } from "@/api/recipes.js";
import { withLoadingAndErrorState } from "@/utils/apiHelper.js";
import { getOptionsByType, updateFiltersState } from "@/utils/filters.js";
import { onBeforeUnmount, onMounted, ref } from "vue";

const emit = defineEmits(["apply"]);
const isOpen = ref(false);
const dropdownRef = ref(null);

const filterTypes = ["Category", "Area", "Ingredient"];
const activeFilterType = ref("");
const availableOptions = ref([]);
const activeOption = ref("");

const isLoadingFilters = ref(true);
const error = ref(null);

const appliedType = ref(null);
const appliedValue = ref(null);

// Store fetched filters
const categories = ref([]);
const areas = ref([]);
const ingredients = ref([]);

// filtersState object (for backend)
const filtersState = ref({
    categories: [],
    areas: [],
    ingredients: [],
});

onMounted(async () => {
    if (!categories.value.length && !areas.value.length && !ingredients.value.length) {
        isLoadingFilters.value = true;
        await withLoadingAndErrorState(
            async () => {
                const data = await fetchFilterLists();
                categories.value = data.categories;
                areas.value = data.areas;
                ingredients.value = data.ingredients;
            },
            isLoadingFilters,
            error,
            "Failed to fetch filter lists."
        );
    } else {
        isLoadingFilters.value = false;
    }
});

function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

function selectFilterType(type) {
    activeFilterType.value = type;
    activeOption.value = "";
    availableOptions.value = getOptionsByType(
        type,
        categories.value,
        areas.value,
        ingredients.value
    );
}

function selectOption(option) {
    const updatedOption = updateFiltersState(filtersState.value, activeFilterType.value, option);
    activeOption.value = updatedOption || "";
}

function clearFilters() {
    activeOption.value = "";
    activeFilterType.value = "";
    filtersState.value = { categories: [], areas: [], ingredients: [] };

    appliedType.value = null;
    appliedValue.value = null;

    emit("apply", { type: null, value: null });
}

function applyFilters() {
    if (activeFilterType.value && activeOption.value) {
        emit("apply", { type: activeFilterType.value, value: activeOption.value });

        appliedType.value = activeFilterType.value;
        appliedValue.value = activeOption.value;

        isOpen.value = false;
    }
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
