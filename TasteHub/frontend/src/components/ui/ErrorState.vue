<template>
    <div class="flex flex-col items-center justify-center mt-20 text-center">
        <span class="text-6xl mb-4">🚫</span>
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Something went wrong
        </h2>
        <p class="text-gray-500 dark:text-gray-400">
            {{ message || "We couldn’t load your recipes. Please try again later." }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    message: String,
});
</script>
