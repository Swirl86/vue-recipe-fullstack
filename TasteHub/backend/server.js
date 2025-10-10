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

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
