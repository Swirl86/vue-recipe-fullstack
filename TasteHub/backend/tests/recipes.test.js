import request from "supertest";
import { app } from "../server.js";

describe("Recipes API", () => {
    it("should return a list of recipes for a search query", async () => {
        const res = await request(app).get("/api/recipes?q=chicken");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("meals");
        expect(Array.isArray(res.body.meals)).toBe(true);
    });

    it("should return recipe details by ID", async () => {
        const res = await request(app).get("/api/recipes/52772");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("meals");
        expect(res.body.meals[0]).toHaveProperty("idMeal", "52772");
    });

    it("should return null for unknown search query", async () => {
        const res = await request(app).get("/api/recipes?q=nonexistentfood123");
        expect(res.statusCode).toBe(200);
        expect(res.body.meals).toBeNull();
    });
});
