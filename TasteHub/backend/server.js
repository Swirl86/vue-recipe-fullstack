import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import favoritesRoutes from "./routes/favorites.js";
import recipesRoutes from "./routes/recipes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/recipes", recipesRoutes);
app.use("/api/favorites", favoritesRoutes);

// MongoDB URI
const mongoURI =
    process.env.NODE_ENV === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

async function dropDatabaseIfNeeded() {
    if (process.env.DROP_DB === "true") {
        try {
            await mongoose.connection.db.dropDatabase();
            console.log("Database dropped!");
        } catch (err) {
            console.error("Failed to drop database:", err);
        }
    }
}

// Start server and connect to MongoDB
mongoose
    .connect(mongoURI)
    .then(async () => {
        console.log(`MongoDB connected to ${mongoURI}`);

        // Drop database if needed
        await dropDatabaseIfNeeded();

        if (process.env.NODE_ENV !== "test") {
            const PORT = process.env.PORT || 5000;
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        }
    })
    .catch((err) => console.error("MongoDB connection error:", err));

// 404 middleware
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

export default app;
