import mongoose from "mongoose";
import request from "supertest";
import Ingredient from "../models/Ingredient.js";
import { app } from "../server.js";

describe("Ingredients API", () => {
    const mongoURI = process.env.MONGO_URI_TEST || "mongodb://127.0.0.1:27017/mealapp_test";

    beforeAll(async () => {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    beforeEach(async () => {
        await Ingredient.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should return ingredients from DB if available", async () => {
        await Ingredient.create({
            ingredientId: "1",
            name: "Chicken",
            description: "Chicken meat",
            thumbnail: "chicken.png",
            type: "Meat",
        });

        const res = await request(app).get("/api/ingredients");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.ingredients)).toBe(true);
        expect(res.body.ingredients.length).toBe(1);
        expect(res.body.ingredients[0].name).toBe("Chicken");
    });

    it("should fetch from API if DB is empty and save to DB", async () => {
        const res = await request(app).get("/api/ingredients");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.ingredients)).toBe(true);

        const count = await Ingredient.countDocuments();
        expect(count).toBeGreaterThan(0);
    });

    it("should return 500 if DB throws an error", async () => {
        const originalFind = Ingredient.find;
        Ingredient.find = jest.fn().mockRejectedValue(new Error("DB error"));

        const res = await request(app).get("/api/ingredients");

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty("message", "Failed to fetch ingredients");

        Ingredient.find = originalFind;
    });
});
