import express from "express";
import FavoriteRecipe from "../models/FavoriteRecipe.js";

const router = express.Router();

// GET all favorites
router.get("/", async (req, res) => {
    try {
        const favorites = await FavoriteRecipe.find();
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new favorite
router.post("/", async (req, res) => {
    const newFavorite = new FavoriteRecipe(req.body);
    try {
        const saved = await newFavorite.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE favorite
router.delete("/:id", async (req, res) => {
    try {
        await FavoriteRecipe.findByIdAndDelete(req.params.id);
        res.json({ message: "Favorite deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
