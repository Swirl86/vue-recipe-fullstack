<template>
    <div class="relative w-80">
        <!-- Inputfält -->
        <input
            :value="modelValue"
            @input="updateValue($event.target.value)"
            :placeholder="placeholder"
            :maxlength="maxlength"
            class="rounded-2xl p-4 w-full shadow-xl bg-white/90 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 text-lg text-center focus:outline-none focus:ring-4 focus:ring-pink-300 transition duration-300 hover:scale-105 hover:shadow-2xl"
        />

        <div class="absolute right-4 bottom-1 text-sm text-gray-500 dark:text-gray-300 select-none">
            {{ modelValue.length }} / {{ maxlength }}
        </div>
    </div>
</template>

<script setup>
defineProps({
    modelValue: { type: String, default: "" },
    placeholder: { type: String, default: "Search..." },
    maxlength: { type: Number, default: 25 },
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(value) {
    emit("update:modelValue", value);
}
</script>
