<template>
    <button
        @click.stop="toggleFavorite"
        :class="[
            'absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm shadow-md hover:scale-110 transition-transform duration-200',
            lightThemeBg,
            darkThemeBg,
        ]"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
        <component
            :is="isFavorite ? HeartSolidIcon : HeartOutlineIcon"
            class="w-6 h-6"
            :class="heartColor"
        />
    </button>
</template>

<script setup>
import { HeartIcon as HeartOutlineIcon } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
    isFavorite: { type: Boolean, default: false },
});

const emit = defineEmits(["toggle"]);

function toggleFavorite() {
    emit("toggle");
}

const lightThemeBg = "bg-gray-200/90";
const darkThemeBg = "dark:bg-gray-900/80";
const heartColor = "text-yellow-500 dark:text-yellow-400";
</script>
