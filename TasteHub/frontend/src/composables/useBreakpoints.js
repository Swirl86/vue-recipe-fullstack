import resolveConfig from "tailwindcss/resolveConfig";
import { onMounted, onUnmounted, ref } from "vue";
import tailwindConfig from "../../tailwind.config.js";

const tw = resolveConfig(tailwindConfig);
const MOBILE_BREAKPOINT = parseInt(tw.theme.screens.md);

/** Throttle utility for better performance */
function throttle(fn, delay = 150) {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last >= delay) {
            last = now;
            fn(...args);
        }
    };
}

/** Breakpoint composable */
export function useBreakpoints() {
    const width = ref(window.innerWidth);
    const isMobile = ref(window.innerWidth <= MOBILE_BREAKPOINT);

    const update = () => {
        width.value = window.innerWidth;
        isMobile.value = width.value <= MOBILE_BREAKPOINT;
    };

    const throttledUpdate = throttle(update, 150);

    onMounted(() => window.addEventListener("resize", throttledUpdate));
    onUnmounted(() => window.removeEventListener("resize", throttledUpdate));

    return {
        width,
        isMobile,
        MOBILE_BREAKPOINT,
    };
}
