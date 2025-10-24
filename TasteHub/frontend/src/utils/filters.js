import { fetchFilteredRecipes, fetchRecipes } from "@/api/recipes.js";

export async function fetchRecipesByFilter(filters) {
    if (!filters.type && !filters.value) {
        return await fetchRecipes();
    } else {
        return await fetchFilteredRecipes(filters.type, filters.value);
    }
}

export function getOptionsByType(type, categories, areas, ingredients) {
    switch (type) {
        case "Category":
            return categories;
        case "Area":
            return areas;
        case "Ingredient":
            return ingredients;
        default:
            return [];
    }
}

export function updateFiltersState(filtersState, filterType, option) {
    if (!filterType) return;

    const key = filterType.toLowerCase();
    if (filtersState[key] && filtersState[key][0] === option) {
        filtersState[key] = [];
        return null;
    } else {
        filtersState[key] = [option];
        return option;
    }
}

export function buildFilterParams(filterType, option) {
    switch (filterType) {
        case "Area":
            return { a: option };
        case "Category":
            return { c: option };
        case "Ingredient":
            return { i: option };
        default:
            return {};
    }
}
