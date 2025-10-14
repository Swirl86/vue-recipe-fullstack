import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import RecipesPage from "../views/RecipesPage.vue";

const routes = [
    { path: "/", name: "Home", component: HomePage },
    { path: "/recipes", name: "Recipes", component: RecipesPage },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
