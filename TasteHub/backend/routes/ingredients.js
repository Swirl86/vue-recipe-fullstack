import axios from "axios";
import express from "express";
import Ingredient from "../models/Ingredient.js";

const router = express.Router();
const API_BASE = "https://www.themealdb.com/api/json/v1/1";

/**
 * GET /api/ingredients
 * Fetches all ingredients from DB,
 * or from TheMealDB API if DB is empty.
 */
router.get("/", async (_, res) => {
    try {
        let ingredients = await Ingredient.find();

        if (!ingredients.length) {
            const response = await axios.get(`${API_BASE}/list.php`, {
                params: { i: "list" },
            });

            const data = Array.isArray(response.data.meals) ? response.data.meals : [];

            const formatted = data
                .filter((i) => i.strIngredient?.trim())
                .map((i) => ({
                    ingredientId: i.idIngredient,
                    name: i.strIngredient.trim(),
                    description: i.strDescription || null,
                    thumbnail: i.strThumb || null,
                    type: i.strType || null,
                }));

            if (formatted.length) {
                await Ingredient.insertMany(formatted);
                ingredients = await Ingredient.find();
            }
        }

        res.json({
            ingredients: ingredients.map((i) => ({
                id: i.ingredientId,
                name: i.name,
                description: i.description,
                thumbnail: i.thumbnail,
                type: i.type,
            })),
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch ingredients" });
    }
});

export default router;
