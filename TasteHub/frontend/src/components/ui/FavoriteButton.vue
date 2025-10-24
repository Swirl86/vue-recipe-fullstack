<template>
    <button
        @click.stop="toggleFavorite"
        :class="[
            'absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm shadow-md hover:scale-110 transition-transform duration-200',
            lightThemeBg,
            darkThemeBg,
        ]"
    >
        <svg
            v-if="isFavorite"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            :class="['w-6 h-6', filledColor]"
        >
            <path
                fill-rule="evenodd"
                d="M12 17.27l5.18 3.04-1.64-5.81L20 9.24l-6-.52L12 3 10 8.72l-6 .52 4.46 5.26-1.64 5.81z"
            />
        </svg>

        <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :class="['w-6 h-6', outlinedColor]"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.716 5.29a1 1 0 00.95.69h5.565c.969 0 1.372 1.24.588 1.81l-4.507 3.278a1 1 0 00-.364 1.118l1.716 5.29c.3.921-.755 1.688-1.54 1.118L12 18.347l-4.075 2.974c-.785.57-1.84-.197-1.54-1.118l1.716-5.29a1 1 0 00-.364-1.118L3.23 10.717c-.784-.57-.38-1.81.588-1.81h5.565a1 1 0 00.95-.69l1.716-5.29z"
            />
        </svg>
    </button>
</template>

<script setup>
const props = defineProps({
    isFavorite: { type: Boolean, default: false },
});

const emit = defineEmits(["toggle"]);

function toggleFavorite() {
    emit("toggle");
}

const lightThemeBg = "bg-gray-200/90";
const darkThemeBg = "dark:bg-gray-900/80";
const filledColor = "text-yellow-500 dark:text-yellow-400";
const outlinedColor = "text-yellow-500 dark:text-yellow-400";
</script>
