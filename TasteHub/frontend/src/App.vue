<template>
    <div
        class="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
    >
        <Navbar />
        <router-view />
    </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
