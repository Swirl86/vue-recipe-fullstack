/**
 * Add isFavorite property to each recipe based on favorites list
 * @param {Array} recipes
 * @param {Array} favorites
 * @returns {Array}
 */
export function markFavorites(recipes, favorites) {
    return recipes.map((recipe) => ({
        ...recipe,
        isFavorite: favorites.some((f) => f.recipeId === recipe.recipeId),
    }));
}
