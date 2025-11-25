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
- Ingredients page – a dedicated view where users can browse and read about available ingredients
- Basic backend setup: models, routes, server, and database connection
- Backend tests using Jest & Supertest to verify recipes and favorites functionality
- Frontend tests using Vitest & Testing Library
  - Includes basic rendering tests for components and views
- CI/CD with GitHub Actions
  - Automatically runs backend and frontend tests on each push or pull request
- Recipe ratings & reviews
  - Users can rate recipes from 1 to 5 stars  
  - Leave optional text reviews  
  - View average rating per recipe  
  - See all submitted reviews with reviewer name and date 
- Export / print recipes  
  - Supports PDF, DOCX (Word), and plain text formats  

**Planned / Future Enhancements:**
- Add custom recipes stored in the local database
- User authentication & profiles
- Offline support / caching
- Animations & microinteractions (hover effects, dropdowns, drag-and-drop)
- Recipe sharing (copy link, social media, email)

**Continuously Improved Over Time**
- Enhanced responsive layouts and smooth animations
- Expanded test coverage and improved reliability
  
---

## ✅ Environment Setup
This project uses environment variables for both the backend and frontend.
Before running the application, make sure the environment files are properly set up.

### 🔧 Default environment values

Each part of the project contains a .env.example file:
```
backend/.env.example
frontend/.env.example
```
These example files include default development values that work immediately for local use.
When a .env file is missing, the setup script will automatically create it using these defaults.

You can modify the values anytime if needed, but the project will run using the provided defaults out of the box.

**🔍 Step 1 - Validate your environment setup**
From the project root, run:
```
node scripts/checkEnv.js
```
This script will:
- Check if .env exists in both backend/ and frontend/
- Automatically create .env from .env.example if it is missing
- Verify that all required environment variables are present
- Ensure that no variable is left empty or incorrectly formatted
If any required value is missing or invalid, the script will show a clear error message and stop the process.

**🚫 If something is missing**
If placeholders, empty values, or missing variables are detected, the script will output something like:
```
❌ backend: MONGO_URI is missing or not configured properly
```
Update the generated .env file(s) with the correct values and run the script again.


---

## 🚀 Running the Project
Once your environment files are set up and validated with ```node scripts/checkEnv.js```, you can start both the backend and frontend.

**1. Start the backend**

From the project root:
```
cd backend
npm install
npm run dev
```
- ```npm install``` installs all dependencies for the backend.
- ```npm run dev``` runs the backend server (default port 5000).

**2. Start the frontend**

From the project root:
```
cd frontend
npm install
npm run dev
```
- ```npm install``` installs all dependencies for the frontend.
- ```npm run dev``` starts the frontend development server (default port 5173).

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
