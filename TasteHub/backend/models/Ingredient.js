import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
    {
        ingredientId: { type: String, required: true, unique: true },
        name: { type: String, required: true, unique: true },
        description: { type: String, default: null },
        thumbnail: { type: String, default: null },
        type: { type: String, default: null },
    },
    { timestamps: true }
);

export default mongoose.model("Ingredient", ingredientSchema);
