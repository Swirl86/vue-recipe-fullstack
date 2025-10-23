# TasteHub / Recipe App

A web-based application that allows users to search for recipes, view details, and save favorites.  
The project is built with **Vue + Vite + Tailwind CSS** on the frontend and **Node.js + Express + MongoDB** on the backend, using **[TheMealDB API](https://www.themealdb.com/api.php)** for real recipe data.

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
- Dark/Light mode toggle support  
- Search for recipes using [TheMealDB API](https://www.themealdb.com/api.php) (`/api/recipes?q=...`)  
- Fetch recipe details by ID  
- Recipe Details View: click on a recipe to open a modal showing ingredients, instructions, and media
- Filter recipes using dynamic dropdown:
  - Fetches **Categories**, **Areas**, and **Ingredients** filtering options from backend
  - **Apply Filters**: fetches recipes based on the selected filter options and updates the recipe grid dynamically
  - **Clear Filters**: resets all filters to empty, fetching and displaying the original full recipe list
  - *Multi-ingredient filter not supported in this project (Premium API Only)  
- Basic backend setup: models, routes, server, and database connection
- Backend tests using Jest & Supertest to verify recipes and favorites functionality

**Planned / Future Enhancements:**
- Add custom recipes stored in the local database
- Save favorite recipes
- Retrieve and delete favorites via API
- Improved responsive layout and animations
- Pagination / infinite scroll for large recipe lists
- User authentication & profiles
- Recipe ratings & reviews
- Improved accessibility (ARIA roles, keyboard navigation, contrast)
- Offline support / caching
- Export / print recipes as PDF
- Animations & microinteractions (hover effects, dropdowns, drag-and-drop)
- Recipe sharing (copy link, social media, email)
- More tests


---

## 🧪 Testing

Backend tests are implemented using Jest and Supertest.

**Tests cover:**
- Searching recipes (recipes.test.js)
- Fetching recipe details by ID
- Handling unknown search queries
- CRUD operations for favorites (favorites.test.js)
- Fetching filter options dynamically (`filters.test.js`)

Tests run against a separate test database (recipe-app-test) to avoid affecting production data.

**Run tests with:**
```npm run test```
