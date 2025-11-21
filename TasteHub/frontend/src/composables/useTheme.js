import { onMounted, ref, watch } from "vue";

const STORAGE_KEY = "theme";

// Determine initial theme (localStorage > OS preference > light)
const getInitialTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;

    // Fallback to system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
};

const theme = ref(getInitialTheme());

export function useTheme() {
    const applyTheme = (value) => {
        const root = document.documentElement;
        if (value === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem(STORAGE_KEY, value);
    };

    const toggleTheme = () => {
        theme.value = theme.value === "light" ? "dark" : "light";
    };

    onMounted(() => {
        // Apply immediately on mount
        applyTheme(theme.value);

        // React to theme changes
        watch(theme, (newValue) => applyTheme(newValue));

        // Watch system preference change
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                // Only auto-update if user hasn't chosen manually
                theme.value = event.matches ? "dark" : "light";
            }
        });
    });

    return { theme, toggleTheme };
}
