<template>
    <nav
        class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md px-6 py-4 font-semibold flex justify-between items-center sticky top-0 z-50 transition-colors duration-300"
    >
        <router-link
            to="/"
            class="text-2xl font-extrabold tracking-tight text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200 drop-shadow-md"
        >
            🏠 TasteHub
        </router-link>

        <div class="flex items-center space-x-3">
            <!-- Desktop -->
            <div class="hidden sm:flex space-x-4 items-center">
                <router-link
                    to="/recipes"
                    class="px-3 py-2 rounded-md text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200 font-semibold"
                    active-class="bg-pink-100 dark:bg-pink-800/40 text-pink-800 dark:text-pink-100 shadow-sm"
                    exact
                >
                    Recipes
                </router-link>

                <router-link
                    to="/favorites"
                    class="px-3 py-2 rounded-md text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200 font-semibold"
                    active-class="bg-pink-100 dark:bg-pink-800/40 text-pink-800 dark:text-pink-100 shadow-sm"
                    exact
                >
                    Favorites
                </router-link>

                <router-link
                    to="/ingredients"
                    class="px-3 py-2 rounded-md text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200 font-semibold"
                    active-class="bg-pink-100 dark:bg-pink-800/40 text-pink-800 dark:text-pink-100 shadow-sm"
                    exact
                >
                    Ingredients
                </router-link>
            </div>

            <!-- Mobile - Hamburger menu -->
            <button
                @click="isOpen = !isOpen"
                class="sm:hidden text-pink-600 dark:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-md"
            >
                <svg
                    v-if="!isOpen"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-7 h-7"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-7 h-7"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <ThemeToggle />
        </div>

        <!-- Mobile dropdown -->
        <transition name="fade">
            <div
                v-if="isOpen"
                class="absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg flex flex-col items-center py-4 space-y-3 sm:hidden z-40"
            >
                <router-link
                    to="/recipes"
                    @click="closeMenu"
                    class="px-4 py-2 rounded-md text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-800/30 w-11/12 text-center font-semibold"
                    active-class="bg-pink-100 dark:bg-pink-800/40 text-pink-800 dark:text-pink-100 shadow-sm"
                >
                    Recipes
                </router-link>

                <router-link
                    to="/favorites"
                    @click="closeMenu"
                    class="px-4 py-2 rounded-md text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-800/30 w-11/12 text-center font-semibold"
                    active-class="bg-pink-100 dark:bg-pink-800/40 text-pink-800 dark:text-pink-100 shadow-sm"
                >
                    Favorites
                </router-link>

                <router-link
                    to="/ingredients"
                    @click="closeMenu"
                    class="px-4 py-2 rounded-md text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-800/30 w-11/12 text-center font-semibold"
                    active-class="bg-pink-100 dark:bg-pink-800/40 text-pink-800 dark:text-pink-100 shadow-sm"
                >
                    Ingredients
                </router-link>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import ThemeToggle from "@/components/ThemeToggle.vue";
import { ref } from "vue";

const isOpen = ref(false);

function closeMenu() {
    isOpen.value = false;
}
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
