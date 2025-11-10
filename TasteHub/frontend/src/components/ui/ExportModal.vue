<template>
    <transition name="fade">
        <div
            v-if="visible"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            @click.self="close"
        >
            <div class="bg-[#fefbea] dark:bg-gray-800 rounded-2xl p-6 w-80 shadow-2xl">
                <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Choose Export Format
                </h3>

                <div class="flex flex-col gap-3">
                    <button
                        @click="selectExport('pdf')"
                        class="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                    >
                        PDF
                    </button>
                    <button
                        @click="selectExport('word')"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Word
                    </button>
                    <button
                        @click="selectExport('text')"
                        class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                    >
                        Text
                    </button>
                </div>

                <button
                    @click="close"
                    class="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg w-full hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </div>
    </transition>
</template>

<script setup>
const props = defineProps({
    visible: Boolean,
});

const emit = defineEmits(["close", "export"]);

function close() {
    emit("close");
}

function selectExport(format) {
    emit("export", format);
    close();
}
</script>
