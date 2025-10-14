<template>
    <nav
        class="bg-white/90 backdrop-blur-md shadow-md px-6 py-4 text-pink-600 font-semibold flex justify-between items-center sticky top-0 z-50"
    >
        <router-link
            to="/"
            class="text-2xl font-extrabold tracking-tight hover:text-pink-700 transition"
        >
            TasteHub
        </router-link>

        <div class="space-x-6 flex items-center">
            <router-link to="/recipes" class="hover:text-pink-700 transition-colors duration-200">
                Recipes
            </router-link>

            <router-link to="/favorites" class="opacity-50 cursor-not-allowed pointer-events-none">
                Favorites
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
};
</script>
