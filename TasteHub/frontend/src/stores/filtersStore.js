import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filters", {
    state: () => ({
        categories: [],
        areas: [],
        ingredients: [],
    }),
    actions: {
        setCategories(categories) {
            this.categories = categories;
        },
        setAreas(areas) {
            this.areas = areas;
        },
        setIngredients(ingredients) {
            this.ingredients = ingredients;
        },
        clearFilters() {
            this.categories = [];
            this.areas = [];
            this.ingredients = [];
        },
    },
});
