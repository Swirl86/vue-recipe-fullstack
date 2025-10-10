import mongoose from "mongoose";

const FavoriteRecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: String,
    mealId: Number,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("FavoriteRecipe", FavoriteRecipeSchema);
