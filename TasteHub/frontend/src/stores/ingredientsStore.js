import { fetchIngredients } from "@/api/ingredients";
import { defineStore } from "pinia";

export const useIngredientsStore = defineStore("ingredients", {
    state: () => ({
        ingredients: [],
        isLoading: false,
        error: null,
    }),
    actions: {
        async loadIngredients() {
            this.isLoading = true;
            this.error = null;
            try {
                this.ingredients = await fetchIngredients();
            } catch (err) {
                this.error = err.message || "Failed to load ingredients";
            } finally {
                this.isLoading = false;
            }
        },
    },
});
