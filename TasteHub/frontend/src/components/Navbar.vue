<template>
    <nav
        class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md px-6 py-4 font-semibold flex justify-between items-center sticky top-0 z-50 transition-colors duration-300"
    >
        <router-link
            to="/"
            class="text-2xl font-extrabold tracking-tight text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200"
        >
            🏠 TasteHub
        </router-link>

        <div class="space-x-6 flex items-center">
            <router-link
                to="/recipes"
                class="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200"
            >
                Recipes
            </router-link>

            <router-link
                to="/favorites"
                class="opacity-50 cursor-not-allowed pointer-events-none text-pink-600 dark:text-pink-400"
            >
                Favorites
            </router-link>

            <ThemeToggle />
        </div>
    </nav>
</template>

<script setup>
import ThemeToggle from "@/components/ThemeToggle.vue";
</script>
