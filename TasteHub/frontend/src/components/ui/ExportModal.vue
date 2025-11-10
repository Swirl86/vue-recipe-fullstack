<template>
    <transition name="fade">
        <div
            v-if="visible"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            @click.self="close"
        >
            <div
                class="bg-[#fefbea] dark:bg-gray-800 rounded-2xl p-6 w-80 shadow-2xl border border-gray-200 dark:border-gray-700"
            >
                <h3 class="text-xl font-semibold mb-5 text-gray-900 dark:text-gray-100 text-center">
                    Choose Export Format
                </h3>

                <div class="flex flex-col gap-3">
                    <button
                        @click="selectExport('pdf')"
                        class="flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all"
                        title="Export as PDF"
                        aria-label="Export as PDF"
                    >
                        <FileText class="w-5 h-5" />
                        <span>PDF</span>
                    </button>

                    <button
                        @click="selectExport('docx')"
                        class="flex items-center justify-center gap-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                        title="Export as DOCX"
                        aria-label="Export as DOCX"
                    >
                        <FileX class="w-5 h-5" />
                        <span class="font-medium">DOCX</span>
                    </button>

                    <button
                        @click="selectExport('word')"
                        class="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                        title="Export as Word"
                        aria-label="Export as Word"
                    >
                        <FileType2 class="w-5 h-5" />
                        <span>Word</span>
                    </button>

                    <button
                        @click="selectExport('text')"
                        class="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all"
                        title="Export as Text"
                        aria-label="Export as Text"
                    >
                        <File class="w-5 h-5" />
                        <span>Text</span>
                    </button>
                </div>

                <button
                    @click="close"
                    class="mt-5 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg w-full hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
                    title="Cancel export"
                    aria-label="Cancel export"
                >
                    Cancel
                </button>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { File, FileText, FileType2, FileX } from "lucide-vue-next";

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
