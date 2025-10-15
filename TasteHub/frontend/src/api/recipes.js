const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export async function fetchRecipes() {
    const res = await fetch(`${BASE_URL}/recipes`);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    const data = await res.json();

    return (data.meals || []).map((meal) => ({
        _id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        thumbnail: meal.strMealThumb,
        youtube: meal.strYoutube || null,
    }));
}

export async function searchRecipes(query) {
    const res = await fetch(`${BASE_URL}/recipes?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Failed to search recipes");
    const data = await res.json();
    return (data.meals || []).map((meal) => ({
        _id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        thumbnail: meal.strMealThumb,
        youtube: meal.strYoutube || null,
    }));
}
