// node scripts/clearFilters.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import Area from "../models/Area.js";
import Category from "../models/Category.js";
import Ingredient from "../models/Ingredient.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

async function clearFilters() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        await Category.deleteMany({});
        await Area.deleteMany({});
        await Ingredient.deleteMany({});

        console.log("Filters cleared from DB!");
        process.exit(0);
    } catch (err) {
        console.error("Error clearing DB:", err);
        process.exit(1);
    }
}

clearFilters();
