const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

/**
 * Fetch all favorite recipes from the backend.
 * @returns {Promise<Array<Object>>} Array of favorite recipes
 * @throws Will throw an error if the request fails
 */
export async function fetchFavorites() {
    const res = await fetch(`${BASE_URL}/favorites`);
    if (!res.ok) throw new Error(`Failed to fetch favorites: ${res.status} ${res.statusText}`);
    return await res.json();
}

/**
 * Add a new recipe to favorites.
 * @param {Object} recipeData - The recipe object to add as favorite
 * @param {string} recipeData.recipeId - The original recipe ID
 * @param {string} recipeData.name - Recipe name
 * @param {string} recipeData.thumbnail - Recipe thumbnail URL
 * @param {string} [recipeData.category] - Recipe category (optional)
 * @param {string} [recipeData.area] - Recipe area/cuisine (optional)
 * @returns {Promise<Object>} The newly added favorite recipe
 * @throws Will throw an error if the request fails
 */
export async function addFavorite(recipeData) {
    const res = await fetch(`${BASE_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
    });

    if (!res.ok) throw new Error(`Failed to add favorite: ${res.status} ${res.statusText}`);
    return await res.json();
}

/**
 * Remove a favorite recipe by its MongoDB `_id`.
 * @param {string} id - MongoDB `_id` of the favorite recipe to delete
 * @returns {Promise<Object>} Response object with deletion confirmation
 * @throws Will throw an error if the request fails
 */
export async function deleteFavorite(id) {
    console.log("Deleting favorite with ID:", id);
    const res = await fetch(`${BASE_URL}/favorites/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error(`Failed to delete favorite: ${res.status} ${res.statusText}`);
    return await res.json();
}

export async function deleteAllFavorites() {
    const res = await fetch(`${BASE_URL}/favorites`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete all favorites");
    return await res.json();
}
