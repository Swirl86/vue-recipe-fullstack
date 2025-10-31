<template>
    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <IngredientCard
            v-for="ingredient in ingredients"
            :key="ingredient.name"
            :ingredient="ingredient"
            @select="$emit('select', $event)"
        />
    </div>
</template>

<script setup>
import IngredientCard from "./IngredientCard.vue";

defineProps({
    ingredients: {
        type: Array,
        required: true,
    },
});
</script>
