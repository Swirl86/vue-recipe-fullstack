import mongoose from "mongoose";

const FavoriteRecipeSchema = new mongoose.Schema({
    recipeId: { type: String, required: true },
    name: { type: String, required: true },
    thumbnail: String,
    category: String,
    area: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("FavoriteRecipe", FavoriteRecipeSchema);
