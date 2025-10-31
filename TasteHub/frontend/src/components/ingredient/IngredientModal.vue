<template>
    <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-auto p-4 pt-[110px] sm:pt-[120px]"
        @click.self="$emit('close')"
    >
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md sm:max-w-3xl max-h-[80vh] overflow-y-auto p-6 relative"
        >
            <button
                @click="$emit('close')"
                class="absolute top-4 right-4 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-110 transition-transform duration-200 z-50 backdrop-blur-sm shadow-md"
            >
                ✖
            </button>

            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex flex-col md:w-1/3 gap-4 pt-2 md:pt-4">
                    <h2
                        class="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 dark:text-white drop-shadow-md dark:drop-shadow-lg"
                    >
                        {{ ingredient.name }}
                    </h2>
                    <p v-if="ingredient.type" class="text-sm text-gray-500 dark:text-gray-400">
                        Type: {{ ingredient.type }}
                    </p>

                    <img
                        :src="ingredient.thumbnail || '/assets/no_img.png'"
                        :alt="ingredient.name"
                        class="w-full h-48 object-contain rounded-lg mt-2 md:mt-4"
                    />
                </div>

                <div class="flex-1 flex flex-col justify-center pt-4 md:pt-6 pr-6 md:pr-12">
                    <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line text-left">
                        {{ ingredient.description || "No description available." }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    ingredient: Object,
    visible: Boolean,
});

defineEmits(["close"]);
</script>
