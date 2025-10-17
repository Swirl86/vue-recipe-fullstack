<template>
    <Layout>
        <!-- Bakgrund -->
        <div class="absolute inset-0 z-0">
            <div
                class="absolute inset-0 bg-gradient-to-br from-pink-50 via-yellow-50 to-pink-100 dark:from-pink-900 dark:via-red-800 dark:to-yellow-900"
            ></div>

            <div
                class="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10 bg-repeat dark:opacity-5"
            ></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <!-- Title -->
            <h1
                class="text-5xl font-extrabold mb-12 text-center drop-shadow-md dark:drop-shadow-lg text-gray-900 dark:text-white flex items-center justify-center gap-4"
            >
                <span>Recipes 👩‍🍳</span>
            </h1>

            <!-- Search field -->
            <div class="flex justify-center mb-12">
                <SearchInput
                    v-model="searchQuery"
                    placeholder="Search recipes..."
                    @input="searchRecipesHandler"
                />
            </div>

            <div v-if="loading">
                <LoadingState />
            </div>

            <div v-else-if="error">
                <ErrorState :message="error" />
            </div>

            <div v-else-if="recipes.length === 0">
                <EmptyState :search-query="searchQuery" />
            </div>

            <!-- Recipe grid -->
            <RecipeList v-else :recipes="recipes" />
        </div>
    </Layout>
</template>

<script setup>
import { fetchRecipes, searchRecipes } from "@/api/recipes.js";
import Layout from "@/components/Layout.vue";
import RecipeList from "@/components/recipe/RecipeList.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import ErrorState from "@/components/ui/ErrorState.vue";
import LoadingState from "@/components/ui/LoadingState.vue";
import SearchInput from "@/components/ui/SearchInput.vue";
import { onMounted, ref } from "vue";

const recipes = ref([]);
const searchQuery = ref("");
const loading = ref(true);
const error = ref(null);

async function loadRecipes() {
    loading.value = true;
    try {
        recipes.value = await fetchRecipes();
    } catch (err) {
        console.error(err);
        error.value = "Failed to load recipes. Please try again later.";
    } finally {
        loading.value = false;
    }
}

async function searchRecipesHandler() {
    loading.value = true;
    try {
        if (!searchQuery.value.trim()) {
            await loadRecipes();
        } else {
            recipes.value = await searchRecipes(searchQuery.value);
        }
    } catch (err) {
        console.error(err);
        error.value = "Something went wrong while searching.";
    } finally {
        loading.value = false;
    }
}

onMounted(loadRecipes);
</script>
