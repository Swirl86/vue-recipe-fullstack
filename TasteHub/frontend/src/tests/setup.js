import { vi } from "vitest";

// Mock RouterLink
vi.mock("vue-router", () => ({
    RouterLink: ({ children }) => children,
}));

// Mock localStorage
if (typeof global.localStorage === "undefined") {
    global.localStorage = {
        getItem: vi.fn(() => null),
        setItem: vi.fn(() => null),
        removeItem: vi.fn(() => null),
        clear: vi.fn(() => null),
    };
}
