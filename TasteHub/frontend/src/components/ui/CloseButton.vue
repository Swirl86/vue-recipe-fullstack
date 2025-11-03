<template>
    <button
        @click="$emit('click')"
        :class="[
            'absolute flex items-center justify-center rounded-full',
            positionClasses,
            sizeClasses,
            'bg-gray-200/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-200',
            'hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-110 transition-transform duration-200',
            'backdrop-blur-sm shadow-md z-50',
        ]"
    >
        ✖
    </button>
</template>

<script>
export default {
    name: "CloseButton",
    props: {
        position: {
            type: String,
            default: "top-4 right-4 md:right-6",
        },
        size: {
            type: String,
            default: "w-10 h-10",
        },
    },
    computed: {
        positionClasses() {
            return this.position;
        },
        sizeClasses() {
            return this.size;
        },
    },
};
</script>
