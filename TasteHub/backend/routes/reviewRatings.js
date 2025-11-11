import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// GET all reviews
router.get("/", async (_, res) => {
    try {
        const reviews = await Review.find();
        return res.json(reviews);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// GET all reviews for a specific recipe
router.get("/recipe/:recipeId", async (req, res) => {
    try {
        const { recipeId } = req.params;
        const reviews = await Review.find({ recipeId }).sort({ createdAt: -1 });
        return res.json(reviews);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// GET average rating for a specific recipe
router.get("/recipe/:recipeId/average", async (req, res) => {
    try {
        const { recipeId } = req.params;
        const reviews = await Review.find({ recipeId });
        const average =
            reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
        return res.json({ average: Number(average.toFixed(1)), count: reviews.length });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// POST new review
router.post("/", async (req, res) => {
    const newReview = new Review(req.body);
    try {
        const saved = await newReview.save();
        return res.status(201).json(saved);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

// DELETE review by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Review.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Review not found" });
        }
        return res.status(200).json({ message: "Review deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// DELETE all reviews
router.delete("/", async (_, res) => {
    try {
        await Review.deleteMany({});
        return res.status(200).json({ message: "All reviews deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;
