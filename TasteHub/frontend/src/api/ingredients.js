const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

/**
 * Fetch all ingredients from backend
 * @returns {Promise<Array<Object>>}
 */
export async function fetchIngredients() {
    const res = await fetch(`${BASE_URL}/ingredients`);
    if (!res.ok) throw new Error("Failed to fetch ingredients");
    const data = await res.json();
    return data.ingredients || [];
}

/**
 * Fetch a single ingredient by ID
 * @param {string} id - Ingredient ID
 * @returns {Promise<Object>}
 */
export async function fetchIngredientById(id) {
    const res = await fetch(`${BASE_URL}/ingredients/${id}`);
    if (!res.ok) throw new Error("Failed to fetch ingredient");
    return await res.json();
}
