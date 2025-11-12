import mongoose from "mongoose";
import request from "supertest";
import Review from "../models/Review.js";
import { app } from "../server.js";

describe("Review API", () => {
    // Connect to test database before running tests
    beforeAll(async () => {
        const mongoURI = process.env.MONGO_URI_TEST || "mongodb://127.0.0.1:27017/mealapp_test";
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Clear the collection before each test
    beforeEach(async () => {
        await Review.deleteMany({});
    });

    // Close the connection after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should create a new review", async () => {
        const newReview = {
            recipeId: new mongoose.Types.ObjectId().toString(),
            userId: "dummy",
            rating: 5,
            comment: "Excellent recipe!",
        };

        const res = await request(app).post("/api/reviews").send(newReview);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.rating).toBe(5);
        expect(res.body.comment).toBe("Excellent recipe!");

        const found = await Review.findOne({ recipeId: newReview.recipeId });
        expect(found).not.toBeNull();
        expect(found.userId).toBe("dummy");
    });

    it("should return all reviews", async () => {
        await Review.create([
            { recipeId: new mongoose.Types.ObjectId(), rating: 4, comment: "Good" },
            { recipeId: new mongoose.Types.ObjectId(), rating: 5, comment: "Perfect" },
        ]);

        const res = await request(app).get("/api/reviews");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    it("should return all reviews for a specific recipe", async () => {
        const recipeId = new mongoose.Types.ObjectId();
        await Review.create([
            { recipeId, rating: 4, comment: "Tasty" },
            { recipeId, rating: 5, comment: "Amazing" },
        ]);

        const res = await request(app).get(`/api/reviews/recipe/${recipeId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty("comment");
    });

    it("should calculate average rating for a recipe", async () => {
        const recipeId = new mongoose.Types.ObjectId();
        await Review.create([
            { recipeId, rating: 3 },
            { recipeId, rating: 5 },
        ]);

        const res = await request(app).get(`/api/reviews/recipe/${recipeId}/average`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("average");
        expect(res.body.average).toBe(4.0);
        expect(res.body.count).toBe(2);
    });

    it("should delete a review by ID", async () => {
        const review = await Review.create({
            recipeId: new mongoose.Types.ObjectId(),
            rating: 4,
            comment: "Delete me",
        });

        const res = await request(app).delete(`/api/reviews/${review._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Review deleted");

        const stillExists = await Review.findById(review._id);
        expect(stillExists).toBeNull();
    });

    it("should delete all reviews", async () => {
        await Review.create([
            { recipeId: new mongoose.Types.ObjectId(), rating: 4 },
            { recipeId: new mongoose.Types.ObjectId(), rating: 5 },
        ]);

        const res = await request(app).delete("/api/reviews");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "All reviews deleted");

        const all = await Review.find();
        expect(all.length).toBe(0);
    });
});
