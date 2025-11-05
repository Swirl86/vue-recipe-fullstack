<template>
    <Layout>
        <!-- Background -->
        <div class="absolute inset-0 z-0">
            <div
                class="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 dark:from-blue-900 dark:via-teal-800 dark:to-cyan-950"
            ></div>
            <div
                class="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10 bg-repeat dark:opacity-5"
            ></div>
            <div
                class="absolute bottom-0 right-1/3 w-[350px] h-[350px] blur-[70px] rounded-full bg-transparent dark:bg-blue-700/20"
            ></div>
        </div>

        <!-- Content -->
        <div class="z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="flex flex-col items-center mb-12 space-y-4">
                <h1
                    class="text-5xl font-extrabold text-center drop-shadow-md dark:drop-shadow-lg text-gray-900 dark:text-white"
                >
                    Favorites ❤️
                </h1>

                <div v-if="favorites.length" class="flex justify-center">
                    <button
                        @click="clearFavorites"
                        class="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition font-semibold"
                    >
                        Delete All Favorites
                    </button>
                </div>
            </div>

            <div v-if="error" class="mb-6 text-center text-red-500 font-semibold">
                {{ error }}
            </div>

            <div v-if="loading" class="flex justify-center py-12">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500"
                ></div>
            </div>

            <div
                v-else-if="favorites.length === 0"
                class="flex flex-col items-center justify-center py-12"
            >
                <img
                    src="/assets/no_favorites.png"
                    alt="No favorites"
                    class="w-48 h-48 mb-6 opacity-50"
                />
                <p class="text-gray-500 dark:text-gray-400 text-lg text-center">
                    You haven’t added any favorites yet.
                </p>
            </div>

            <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <FavoriteCard
                    v-for="recipe in favorites"
                    :key="recipe.recipeId"
                    :recipe="recipe"
                    @select="openRecipe"
                    @delete="handleDeleteFavorite"
                />
            </div>

            <RecipeModal
                v-if="selectedRecipeId"
                :recipe-id="selectedRecipeId"
                :visible="showModal"
                @close="closeModal"
            />
        </div>
    </Layout>
</template>

<script setup>
import { deleteAllFavorites, deleteFavorite, fetchFavorites } from "@/api/favorites.js";
import Layout from "@/components/Layout.vue";
import FavoriteCard from "@/components/favorite/FavoriteCard.vue";
import RecipeModal from "@/components/recipe/RecipeModal.vue";
import { onMounted, ref } from "vue";

const favorites = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedRecipeId = ref(null);
const showModal = ref(false);

async function loadFavorites() {
    loading.value = true;
    error.value = null;
    try {
        const data = await fetchFavorites();
        favorites.value = data;
    } catch (err) {
        console.error(err);
        error.value = "Failed to load favorites";
    } finally {
        loading.value = false;
    }
}

function openRecipe(recipe) {
    selectedRecipeId.value = recipe.recipeId;
    showModal.value = true;
}

function closeModal() {
    selectedRecipeId.value = null;
    showModal.value = false;
}

async function handleDeleteFavorite(recipe) {
    error.value = null;
    try {
        const existing = favorites.value.find((f) => f.recipeId === recipe.recipeId);
        if (existing) {
            await deleteFavorite(existing.recipeId);
            favorites.value = favorites.value.filter((f) => f.recipeId !== recipe.recipeId);
        }
    } catch (err) {
        console.error(err);
        error.value = "Failed to delete favorite";
    }
}

async function clearFavorites() {
    error.value = null;
    try {
        await deleteAllFavorites();
        favorites.value = [];
    } catch (err) {
        console.error(err);
        error.value = "Failed to delete favorites";
    }
}

onMounted(loadFavorites);
</script>
