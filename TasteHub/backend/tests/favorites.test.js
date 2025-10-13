import dotenv from "dotenv";
import mongoose from "mongoose";
import request from "supertest";
import FavoriteRecipe from "../models/FavoriteRecipe.js";
import app from "../server.js";

dotenv.config();

beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI_TEST || "mongodb://localhost:27017/recipe-app-test";
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

beforeEach(async () => {
    // Clear the test database before each test
    await FavoriteRecipe.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Favorites API", () => {
    it("should create a new favorite", async () => {
        const res = await request(app).post("/api/favorites").send({
            title: "Test Meal",
            image: "https://www.themealdb.com/images/media/meals/test.jpg",
            mealId: 12345,
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("Test Meal");
    });

    it("should get all favorites", async () => {
        await FavoriteRecipe.create({ title: "Meal 1", mealId: 111 });
        await FavoriteRecipe.create({ title: "Meal 2", mealId: 222 });

        const res = await request(app).get("/api/favorites");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    it("should delete a favorite", async () => {
        const favorite = await FavoriteRecipe.create({ title: "ToDelete", mealId: 999 });
        const res = await request(app).delete(`/api/favorites/${favorite._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Favorite deleted");
    });
});
