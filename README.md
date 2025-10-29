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
- Favorite recipes
  - Save, remove and display favorite recipes 
- Basic backend setup: models, routes, server, and database connection
- Backend tests using Jest & Supertest to verify recipes and favorites functionality
- Frontend tests using Vitest & Testing Library
  - Includes basic rendering tests for components and views
- CI/CD with GitHub Actions
  - Automatically runs backend and frontend tests on each push or pull request

**Planned / Future Enhancements:**
- Add custom recipes stored in the local database
- Improved responsive layout and animations
- Ingredients page – a dedicated view where users can browse and read about available ingredients
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

### Backend
Backend tests are implemented using Jest and Supertest.

**Tests cover:**
- Searching recipes (`recipes.test.js`)
- Fetching recipe details by ID
- Handling unknown search queries
- CRUD operations for favorites (favorites.test.js)
- Fetching filter options dynamically (`filters.test.js`)

Tests run against a separate test database (recipe-app-test) to avoid affecting production data.

**Run tests with:**
```npm run test```

---

### Frontend
Frontend tests are implemented using Vitest and Testing Library (React Testing Library).

**Tests cover:**
- Navbar – ensures navigation links render and respond correctly
- ThemeToggle – verifies that dark/light mode toggling works as expected

Tests ensure that core UI components render correctly and that key interactive behaviors (like theme switching) function as intended.

Run frontend tests with:
```npm run test```
