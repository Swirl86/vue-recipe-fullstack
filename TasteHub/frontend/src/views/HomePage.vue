<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-gradient-to-br from-pink-500 via-red-400 to-yellow-400 text-white dark:bg-gradient-to-br dark:from-pink-800 dark:via-red-700 dark:to-yellow-800 dark:text-gray-200"
    >
        <div
            class="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10 bg-repeat dark:opacity-5"
        ></div>

        <h1
            class="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] tracking-tight dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
        >
            TasteHub
        </h1>

        <p
            class="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed dark:drop-shadow-lg"
        >
            Discover, save, and enjoy your favorite recipes.<br />
            Beautifully organized in one place.
        </p>

        <router-link
            to="/recipes"
            class="relative z-10 font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105 focus:ring-4 bg-white text-pink-600 focus:ring-pink-300 dark:bg-gray-700 dark:text-pink-300 dark:focus:ring-pink-500"
        >
            🍳 Get Started
        </router-link>

        <div class="mt-16 relative">
            <img
                src="/assets/chef-hat.png"
                alt="Chef Illustration"
                class="w-56 sm:w-72 md:w-96 mx-auto animate-bounce drop-shadow-lg dark:drop-shadow-xl"
            />
            <div
                class="absolute inset-0 rounded-full blur-3xl opacity-30 bg-gradient-to-t from-white/20 to-transparent dark:opacity-20 dark:bg-gradient-to-t dark:from-gray-700/40 dark:to-transparent"
            ></div>
        </div>

        <!-- Background gradient-->
        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full dark:bg-gray-700/20"
        ></div>
    </div>
</template>
