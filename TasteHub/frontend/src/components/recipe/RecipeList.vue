<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RecipeCard
            v-for="recipe in recipes"
            :key="recipe.recipeId"
            :recipe="recipe"
            @select="$emit('select', $event)"
            @favorite="$emit('favorite', $event)"
        />
    </div>
</template>

<script setup>
import RecipeCard from "./RecipeCard.vue";

defineProps({
    recipes: Array,
});

const emit = defineEmits(["select", "favorite"]);
</script>
