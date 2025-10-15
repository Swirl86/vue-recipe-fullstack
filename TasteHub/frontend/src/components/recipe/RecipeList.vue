<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RecipeCard v-for="recipe in recipes" :key="recipe._id" :recipe="recipe" />
    </div>
</template>

<script setup>
import RecipeCard from "./RecipeCard.vue";

defineProps({
    recipes: Array,
});
</script>
