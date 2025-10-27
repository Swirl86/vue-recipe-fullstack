const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
import { buildFilterParams } from "@/utils/filtersHelper.js";

/**
 * Fetch all recipes from the backend API.
 * @returns {Promise<Array<Object>>} Array of recipe objects
 */
export async function fetchRecipes() {
    const res = await fetch(`${BASE_URL}/recipes`);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    const data = await res.json();

    return (data.meals || []).map((meal) => ({
        recipeId: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        thumbnail: meal.strMealThumb,
    }));
}

/**
 * Fetch available filter lists (categories, areas, etc.) from the backend.
 * @returns {Promise<Object>} Filter lists object
 */
export async function fetchFilterLists() {
    const res = await fetch(`${BASE_URL}/recipes/filters`);
    if (!res.ok) throw new Error("Failed to fetch filter lists");
    const data = await res.json();
    return data;
}

/**
 * Fetch recipes filtered by a specific type and option.
 * @param {string} filterType - The type of filter (e.g., "Category", "Area")
 * @param {string} option - The filter option value
 * @returns {Promise<Array<Object>>} Array of filtered recipes
 */
export async function fetchFilteredRecipes(filterType, option) {
    if (!filterType || !option) return [];

    const params = buildFilterParams(filterType, option);

    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/recipes/filter?${queryString}`);
    if (!res.ok) throw new Error("Failed to fetch filtered recipes");

    const data = await res.json();
    //console.log(`Fetched recipes filtered by ${filterType}=${option}:`, data);

    return (data.meals || []).map((meal) => ({
        recipeId: meal.idMeal,
        name: meal.strMeal,
        thumbnail: meal.strMealThumb,
        category: filterType === "Category" ? option : meal.strCategory || "",
        area: filterType === "Area" ? option : meal.strArea || "",
    }));
}

/**
 * Search recipes by query string.
 * @param {string} query - Search term
 * @returns {Promise<Array<Object>>} Array of recipes matching the search
 */
export async function searchRecipes(query) {
    const res = await fetch(`${BASE_URL}/recipes?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Failed to search recipes");
    const data = await res.json();
    return (data.meals || []).map((meal) => ({
        recipeId: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        thumbnail: meal.strMealThumb,
        youtube: meal.strYoutube || null,
    }));
}

/**
 * Fetch detailed information for a specific recipe by ID.
 * @param {string} id - Recipe ID
 * @returns {Promise<Object>} Detailed recipe object
 */
export async function fetchRecipeDetail(id) {
    const res = await fetch(`${BASE_URL}/recipes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch recipe detail");
    const data = await res.json();
    const meal = data.meals[0];

    const ingredients = [];
    const measures = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(ingredient.trim());
            measures.push(measure ? measure.trim() : "");
        }
    }

    return {
        recipeId: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        thumbnail: meal.strMealThumb,
        youtube: meal.strYoutube || null,
        ingredients,
        measures,
        tags: meal.strTags ? meal.strTags.split(",").map((tag) => tag.trim()) : [],
        source: meal.strSource || null,
        imageSource: meal.strImageSource || null,
        creativeCommonsConfirmed: !!meal.strCreativeCommonsConfirmed,
        dateModified: meal.dateModified || null,
    };
}
