<template>
    <Layout>
        <!-- Background wrapper -->
        <div class="absolute inset-0 z-0">
            <!-- Gradient -->
            <div
                class="absolute inset-0 bg-gradient-to-br from-pink-500 via-red-400 to-yellow-400 dark:from-pink-800 dark:via-red-700 dark:to-yellow-800"
            ></div>

            <!-- Pattern -->
            <div
                class="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10 bg-repeat dark:opacity-5"
            ></div>

            <!-- Background blur circle (dark mode only) -->
            <div
                class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] blur-[80px] rounded-full bg-transparent dark:bg-gray-700/20"
            ></div>
        </div>

        <!-- Main content -->
        <h1
            class="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] tracking-tight dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] z-10"
        >
            TasteHub
        </h1>

        <p
            class="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed dark:drop-shadow-lg z-10"
        >
            Discover, save, and enjoy your favorite recipes.<br />
            Beautifully organized in one place.
        </p>

        <!-- Button -->
        <router-link
            to="/recipes"
            class="relative z-20 font-bold py-3 px-10 rounded-full shadow-lg transform transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-2xl focus:ring-4 bg-white text-pink-600 focus:ring-pink-300 dark:bg-gray-700 dark:text-pink-300 dark:focus:ring-pink-500"
        >
            🍳 Get Started
        </router-link>

        <!-- Chef hat illustration -->
        <div class="relative mt-8 sm:mt-12 w-full flex justify-center z-10">
            <img
                src="/assets/chef-hat.png"
                alt="Chef Illustration"
                class="w-56 sm:w-72 md:w-96 animate-[bounce_2s_infinite] drop-shadow-lg dark:drop-shadow-xl"
            />
            <div
                class="absolute inset-0 rounded-full blur-2xl opacity-30 bg-gradient-to-t from-white/20 to-transparent dark:opacity-20 dark:bg-gradient-to-t dark:from-gray-700/40 dark:to-transparent"
            ></div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from "@/components/Layout.vue";
</script>
