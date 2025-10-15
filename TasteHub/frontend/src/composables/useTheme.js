import { onMounted, ref, watchEffect } from "vue";

const theme = ref(localStorage.getItem("theme") || "light");

export function useTheme() {
    const toggleTheme = () => {
        theme.value = theme.value === "light" ? "dark" : "light";
    };

    onMounted(() => {
        watchEffect(() => {
            const root = document.documentElement;
            if (theme.value === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
            localStorage.setItem("theme", theme.value);
        });
    });

    return { theme, toggleTheme };
}
