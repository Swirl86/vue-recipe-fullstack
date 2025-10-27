import mongoose from "mongoose";
import request from "supertest";
import FavoriteRecipe from "../models/FavoriteRecipe.js";
import app from "../server.js";

describe("Favorites API", () => {
    // Connect to the test database before running tests
    beforeAll(async () => {
        const mongoURI = process.env.MONGO_URI_TEST || "mongodb://127.0.0.1:27017/mealapp_test";
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Clear the favorites collection before each test
    beforeEach(async () => {
        await FavoriteRecipe.deleteMany({});
    });

    // Close the database connection after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should create a new favorite", async () => {
        const newFav = {
            recipeId: "53060",
            name: "Burek",
            thumbnail: "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
            category: "Side",
            area: "Croatian",
        };

        const res = await request(app).post("/api/favorites").send(newFav);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.recipeId).toBe("53060");

        const found = await FavoriteRecipe.findOne({ recipeId: "53060" });
        expect(found).not.toBeNull();
        expect(found.name).toBe("Burek");
    });

    it("should return all favorites", async () => {
        await FavoriteRecipe.create([
            { recipeId: "123", name: "Test1" },
            { recipeId: "456", name: "Test2" },
        ]);

        const res = await request(app).get("/api/favorites");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    it("should delete a favorite by recipeId", async () => {
        await FavoriteRecipe.create({
            recipeId: "777",
            name: "Pizza",
        });

        const res = await request(app).delete("/api/favorites/777");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Favorite deleted");

        const stillExists = await FavoriteRecipe.findOne({ recipeId: "777" });
        expect(stillExists).toBeNull();
    });

    it("should return 404 when deleting non-existent favorite", async () => {
        const res = await request(app).delete("/api/favorites/99999");
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("message", "Favorite not found");
    });

    it("should delete all favorites", async () => {
        await FavoriteRecipe.create([
            { recipeId: "1", name: "Test1" },
            { recipeId: "2", name: "Test2" },
        ]);

        const res = await request(app).delete("/api/favorites");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "All favorites deleted");

        const all = await FavoriteRecipe.find();
        expect(all.length).toBe(0);
    });
});
