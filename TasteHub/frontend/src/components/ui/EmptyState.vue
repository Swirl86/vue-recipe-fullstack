<template>
    <div class="flex flex-col items-center justify-center mt-20 text-center">
        <span class="text-6xl mb-4">🍳</span>

        <!-- If user has searched -->
        <template v-if="hasSearched">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                No matching recipes found 🔍
            </h2>
            <p class="text-gray-500 dark:text-gray-400">Try searching for something else!</p>
        </template>

        <!-- If user has not searched -->
        <template v-else>
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Oops! Nothing’s cooking right now 🍽️
            </h2>
            <p class="text-gray-500 dark:text-gray-400">No recipes available.</p>
        </template>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    searchQuery: {
        type: String,
        default: "",
    },
});

const hasSearched = computed(() => props.searchQuery.trim().length > 0);
</script>
