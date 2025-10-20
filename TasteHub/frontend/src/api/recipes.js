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
        _id: meal.idMeal,
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
