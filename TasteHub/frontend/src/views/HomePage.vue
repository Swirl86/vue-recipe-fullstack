<template>
    <div
        class="min-h-screen bg-gradient-to-br from-pink-500 via-red-400 to-yellow-400 flex flex-col items-center justify-center text-center text-white px-6 relative overflow-hidden"
    >
        <div class="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10 bg-repeat"></div>

        <h1
            class="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] tracking-tight"
        >
            TasteHub
        </h1>
        <p
            class="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed"
        >
            Discover, save, and enjoy your favorite recipes.<br />
            Beautifully organized in one place.
        </p>

        <router-link
            to="/recipes"
            class="relative z-10 bg-white text-pink-600 font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105 focus:ring-4 focus:ring-pink-300"
        >
            🍳 Get Started
        </router-link>

        <div class="mt-16 relative">
            <img
                src="/assets/chef-hat.png"
                alt="Chef Illustration"
                class="w-56 sm:w-72 md:w-96 mx-auto animate-bounce drop-shadow-lg"
            />
            <div
                class="absolute inset-0 rounded-full blur-3xl opacity-30 bg-gradient-to-t from-white/20 to-transparent"
            ></div>
        </div>

        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full"
        ></div>
    </div>
</template>

<script>
export default {
    name: "HomePage",
};
</script>
