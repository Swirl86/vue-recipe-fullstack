import { createRouter, createWebHistory } from "vue-router";
import FavoritesPage from "../views/FavoritesPage.vue";
import HomePage from "../views/HomePage.vue";
import RecipesPage from "../views/RecipesPage.vue";

const routes = [
    { path: "/", name: "Home", component: HomePage },
    { path: "/recipes", name: "Recipes", component: RecipesPage },
    { path: "/favorites", name: "Favorites", component: FavoritesPage },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
