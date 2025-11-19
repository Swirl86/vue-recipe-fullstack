import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        recipeId: { type: String, required: true },
        userId: { type: String, default: "anonymous" },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, default: "" },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("Review", reviewSchema);
