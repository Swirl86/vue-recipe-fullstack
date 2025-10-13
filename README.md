# TasteHub / Recipe App

A web-based application that allows users to search for recipes, view details, and save favorites.  
The project is built with **Vue + Vite + Tailwind CSS** on the frontend and **Node.js + Express + MongoDB** on the backend, using **TheMealDB API** for real recipe data.

The main purpose of this project is to **learn and improve my fullstack development skills**, particularly with **Vue, Tailwind CSS, and backend integration**.

---

## 📦 Technologies

| Layer | Technologies |
|-------|---------------|
| Frontend | Vue 3, Vite, Tailwind CSS, Axios |
| Backend | Node.js, Express, Mongoose, Axios, CORS, dotenv |
| Database | MongoDB |
| External API | TheMealDB |

---

## 🚀 Features (current / planned)

**Implemented:**
- Search for recipes using TheMealDB API (`/api/recipes?q=...`)  
- Fetch recipe details by ID  
- Save favorite recipes in MongoDB (title, image, mealId)  
- Retrieve and delete favorites via API  
- Basic backend setup: models, routes, server, and database connection
- Backend tests using Jest & Supertest to verify recipes and favorites functionality

**Planned / Future Enhancements:**
- Filtering and sorting (e.g. “quick”, “vegetarian”)  
- Add custom recipes stored in the local database  
- Dark mode support  
- User authentication  
- Improved responsive layout and animations  

---

## 🧪 Testing

Backend tests are implemented using Jest and Supertest.

**Tests cover:**
- Searching recipes (recipes.test.js)
- Fetching recipe details by ID
- Handling unknown search queries
- CRUD operations for favorites (favorites.test.js)

Tests run against a separate test database (recipe-app-test) to avoid affecting production data.

**Run tests with:**
```npm run test```
