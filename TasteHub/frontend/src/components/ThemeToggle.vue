<template>
    <button
        @click="toggleThemeAndBlur"
        :class="[
            'w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:shadow-xl transition-all duration-300 text-xl focus:outline-none focus:ring-2',
            theme === 'light'
                ? 'bg-yellow-100/80 hover:ring-4 hover:ring-pink-400 focus:ring-4 focus:ring-pink-400'
                : 'bg-gray-800/80 hover:ring-4 hover:ring-pink-500 focus:ring-4 focus:ring-pink-500',
        ]"
        :title="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
    >
        <span v-if="theme === 'light'" class="animate-sun">🌞</span>
        <span v-else class="animate-moon">🌙</span>
    </button>
</template>

<script setup>
import { useTheme } from "@/composables/useTheme.js";

const { theme, toggleTheme } = useTheme();

function toggleThemeAndBlur(event) {
    toggleTheme();
    event.target.blur(); // Remove focus from button after click
}
</script>

<style scoped>
@keyframes sun-bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-3px);
    }
}

@keyframes moon-spin {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(20deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.animate-sun {
    animation: sun-bounce 1s ease-in-out infinite;
}

.animate-moon {
    animation: moon-spin 1s ease-in-out infinite;
}
</style>
