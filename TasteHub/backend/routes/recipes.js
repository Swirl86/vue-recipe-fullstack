import axios from "axios";
import express from "express";
import Area from "../models/Area.js";
import Category from "../models/Category.js";
import Ingredient from "../models/Ingredient.js";

const router = express.Router();
const API_BASE = "https://www.themealdb.com/api/json/v1/1";

// GET all filters: categories, areas, ingredients
router.get("/filters", async (_, res) => {
    try {
        let categories = await Category.find();
        let areas = await Area.find();
        let ingredients = await Ingredient.find();

        if (!categories.length || !areas.length || !ingredients.length) {
            console.log("Some filters missing — fetching from TheMealDB...");

            // Fetch data with params
            const [catRes, areaRes, ingRes] = await Promise.all([
                axios.get(`${API_BASE}/list.php`, { params: { c: "list" } }),
                axios.get(`${API_BASE}/list.php`, { params: { a: "list" } }),
                axios.get(`${API_BASE}/list.php`, { params: { i: "list" } }),
            ]);

            // Filter out invalid responses
            const catMeals = Array.isArray(catRes.data.meals) ? catRes.data.meals : [];
            const areaMeals = Array.isArray(areaRes.data.meals) ? areaRes.data.meals : [];
            const ingMeals = Array.isArray(ingRes.data.meals) ? ingRes.data.meals : [];

            // Save to DB if empty
            if (!categories.length && catMeals.length) {
                const newCategories = catMeals.map((c) => ({ name: c.strCategory }));
                await Category.insertMany(newCategories);
                categories = await Category.find();
            }

            if (!areas.length && areaMeals.length) {
                const newAreas = areaMeals.map((a) => ({ name: a.strArea }));
                await Area.insertMany(newAreas);
                areas = await Area.find();
            }

            if (!ingredients.length && ingMeals.length) {
                const newIngredients = ingMeals
                    .filter((i) => i.strIngredient?.trim())
                    .map((i) => ({
                        ingredientId: i.idIngredient,
                        name: i.strIngredient.trim(),
                        description: i.strDescription || null,
                        thumbnail: i.strThumb || null,
                        type: i.strType || null,
                    }));

                await Ingredient.insertMany(newIngredients);
                ingredients = await Ingredient.find();
            }
        }

        res.json({
            categories: categories.map((c) => c.name),
            areas: areas.map((a) => a.name),
            ingredients: ingredients.map((a) => a.name),
        });
    } catch (err) {
        console.error("🔥 Error fetching filters:", err.message);
        res.status(500).json({ message: "Failed to fetch filters" });
    }
});

router.get("/filter", async (req, res) => {
    try {
        const { a, c, i } = req.query; // area, category, ingredient
        const params = { a, c, i };
        const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v));

        const response = await axios.get(`${API_BASE}/filter.php`, { params: filteredParams });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET recipe details by id
router.get("/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE}/lookup.php`, {
            params: { i: req.params.id },
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET recipes by search query
router.get("/", async (req, res) => {
    const query = req.query.q || ""; // empty string = all meals (by category/filter)
    try {
        const response = await axios.get(`${API_BASE}/search.php`, { params: { s: query } });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
