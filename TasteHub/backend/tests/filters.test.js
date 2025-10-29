import request from "supertest";
import { app } from "../server.js";

describe("Filters API", () => {
    it("should return all filters", async () => {
        const res = await request(app).get("/api/recipes/filters");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("categories");
        expect(res.body).toHaveProperty("areas");
        expect(res.body).toHaveProperty("ingredients");
        expect(Array.isArray(res.body.categories)).toBe(true);
        expect(Array.isArray(res.body.areas)).toBe(true);
        expect(Array.isArray(res.body.ingredients)).toBe(true);
    });

    it("should return recipes filtered by ingredient", async () => {
        const res = await request(app).get("/api/recipes/filter").query({ i: "chicken_breast" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("meals");
        expect(Array.isArray(res.body.meals)).toBe(true);
    });

    it("should return recipes filtered by category", async () => {
        const res = await request(app).get("/api/recipes/filter").query({ c: "Seafood" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("meals");
        expect(Array.isArray(res.body.meals)).toBe(true);
    });

    it("should return recipes filtered by area", async () => {
        const res = await request(app).get("/api/recipes/filter").query({ a: "Canadian" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("meals");
        expect(Array.isArray(res.body.meals)).toBe(true);
    });

    it("should return null for unknown ingredient", async () => {
        const res = await request(app)
            .get("/api/recipes/filter")
            .query({ i: "unknown_ingredient_123" });
        expect(res.statusCode).toBe(200);
        expect(res.body.meals).toBeNull();
    });
});
