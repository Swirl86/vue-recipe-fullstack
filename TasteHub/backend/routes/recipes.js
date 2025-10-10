import axios from "axios";
import express from "express";

const router = express.Router();
const API_BASE = "https://www.themealdb.com/api/json/v1/1";

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

export default router;
