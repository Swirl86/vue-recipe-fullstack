<template>
    <Layout>
        <div class="absolute inset-0 z-0">
            <div
                class="absolute inset-0 bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 dark:from-green-900 dark:via-yellow-800 dark:to-green-950"
            ></div>
            <div
                class="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10 bg-repeat dark:opacity-5"
            ></div>
        </div>
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 class="text-5xl font-extrabold mb-12 text-center text-gray-900 dark:text-white">
                Ingredients 🌿
            </h1>

            <div v-if="isLoading" class="flex justify-center py-20">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"
                ></div>
            </div>

            <div v-else-if="error" class="mb-6 text-center text-red-500 font-semibold">
                {{ error }}
            </div>

            <div
                v-else-if="ingredients.length === 0"
                class="flex flex-col items-center justify-center py-20"
            >
                <img
                    src="/assets/no_img.png"
                    alt="No ingredients"
                    class="w-48 h-48 mb-6 opacity-50"
                />
                <p class="text-gray-500 dark:text-gray-400 text-lg">No ingredients available.</p>
            </div>

            <IngredientList v-else :ingredients="ingredients" @select="openIngredient" />

            <IngredientModal
                v-if="selectedIngredient"
                :ingredient="selectedIngredient"
                :visible="showModal"
                @close="showModal = false"
            />
        </div>
    </Layout>
</template>

<script setup>
import IngredientList from "@/components/ingredient/IngredientList.vue";
import IngredientModal from "@/components/ingredient/IngredientModal.vue";
import Layout from "@/components/Layout.vue";
import { useIngredientsStore } from "@/stores/ingredientsStore";
import { computed, onMounted, ref } from "vue";

const ingredientsStore = useIngredientsStore();

const ingredients = computed(() => ingredientsStore.ingredients);
const isLoading = computed(() => ingredientsStore.isLoading);
const error = computed(() => ingredientsStore.error);

const selectedIngredient = ref(null);
const showModal = ref(false);

function openIngredient(ingredient) {
    selectedIngredient.value = ingredient;
    showModal.value = true;
}

onMounted(() => {
    ingredientsStore.loadIngredients();
});
</script>
