import express from "express";
import FavoriteRecipe from "../models/FavoriteRecipe.js";

const router = express.Router();

// GET all favorites
router.get("/", async (_, res) => {
    try {
        const favorites = await FavoriteRecipe.find();
        return res.json(favorites);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// POST new favorite
router.post("/", async (req, res) => {
    const newFavorite = new FavoriteRecipe(req.body);
    try {
        const saved = await newFavorite.save();
        return res.status(201).json(saved);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

// DELETE favorite by ID
router.delete("/:recipeId", async (req, res) => {
    try {
        const { recipeId } = req.params;
        const deleted = await FavoriteRecipe.findOneAndDelete({ recipeId });
        if (!deleted) {
            return res.status(404).json({ message: "Favorite not found" });
        }
        return res.status(200).json({ message: "Favorite deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// DELETE all favorites
router.delete("/", async (req, res) => {
    try {
        await FavoriteRecipe.deleteMany({});
        return res.status(200).json({ message: "All favorites deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;
