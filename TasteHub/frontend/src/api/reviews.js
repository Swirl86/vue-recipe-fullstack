const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

/**
 * Fetch reviews for a specific recipe
 * @param {string} recipeId
 * @returns {Promise<Array>}
 */
export async function fetchReviews(recipeId) {
    const res = await fetch(`${BASE_URL}/reviews/recipe/${recipeId}`);
    if (!res.ok) throw new Error("Failed to fetch reviews", res.status);
    return await res.json();
}

/**
 * Create a new review
 * @param {Object} reviewData - { recipeId, rating, comment }
 * @returns {Promise<Object>}
 */
export async function postReview(reviewData) {
    const res = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
    });
    if (!res.ok) throw new Error("Failed to post review", res.status);
    return await res.json();
}
