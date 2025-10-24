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

            <!-- Search field + Filter -->
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <SearchBar
                    v-model="searchQuery"
                    placeholder="Search recipes..."
                    @input="searchRecipesHandler"
                />
                <FilterDropdown class="h-[58px]" @apply="applyFilters" />
            </div>

            <!-- Loading / Error / Empty states -->
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
            <RecipeList v-else :recipes="recipes" @select="openRecipe" @favorite="handleFavorite" />

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
import { addFavorite, deleteFavorite, fetchFavorites } from "@/api/favorites.js";
import { fetchRecipes, searchRecipes } from "@/api/recipes.js";
import Layout from "@/components/Layout.vue";
import RecipeList from "@/components/recipe/RecipeList.vue";
import RecipeModal from "@/components/recipe/RecipeModal.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import ErrorState from "@/components/ui/ErrorState.vue";
import FilterDropdown from "@/components/ui/FilterDropdown.vue";
import LoadingState from "@/components/ui/LoadingState.vue";
import SearchBar from "@/components/ui/SearchBar.vue";
import { withLoadingAndErrorState } from "@/utils/apiHelper.js";
import { markFavorites } from "@/utils/favoritesHelper.js";
import { fetchRecipesByFilter } from "@/utils/filtersHelper.js";
import { onMounted, ref, watch } from "vue";

const recipes = ref([]);
const favorites = ref([]);

const searchQuery = ref("");

const loading = ref(true);
const error = ref(null);

const selectedRecipeId = ref(null);
const showModal = ref(false);

async function loadData() {
    try {
        await loadFavorites();

        const data = await withLoadingAndErrorState(
            fetchRecipes,
            loading,
            error,
            "Failed to load recipes"
        );

        if (data) {
            recipes.value = markFavorites(data, favorites.value);
        }
    } catch (err) {
        console.error(err);
    }
}

async function loadFavorites() {
    error.value = null;
    try {
        favorites.value = await fetchFavorites();
    } catch (err) {
        error.value = err.message || "Failed to load favorites";
    }
}

async function handleFavorite(recipe) {
    error.value = null;
    try {
        const existing = favorites.value.find((f) => f.recipeId === recipe._id);

        if (existing) {
            await deleteFavorite(existing._id);
            favorites.value = favorites.value.filter((f) => f._id !== existing._id);
        } else {
            const newFav = await addFavorite({
                recipeId: recipe._id,
                name: recipe.name,
                thumbnail: recipe.thumbnail,
                category: recipe.category || "",
                area: recipe.area || "",
            });
            favorites.value.push(newFav);
        }

        recipes.value = markFavorites(recipes.value, favorites.value);
    } catch (err) {
        error.value = err.message || "Failed to update favorite";
    }
}

async function searchRecipesHandler() {
    const data = await withLoadingAndErrorState(
        async () => {
            if (!searchQuery.value.trim()) {
                return await fetchRecipes();
            } else {
                return await searchRecipes(searchQuery.value);
            }
        },
        loading,
        error,
        "Something went wrong while searching."
    );

    if (data) recipes.value = markFavorites(data, favorites.value);
}

async function applyFilters(filters) {
    const data = await withLoadingAndErrorState(
        async () => await fetchRecipesByFilter(filters),
        loading,
        error,
        "Failed to fetch recipes."
    );
    searchQuery.value = "";
    if (data) recipes.value = markFavorites(data, favorites.value);
}

function openRecipe(recipe) {
    selectedRecipeId.value = recipe._id;
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
    selectedRecipeId.value = null;
}

watch(showModal, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
});

onMounted(loadData);
</script>
