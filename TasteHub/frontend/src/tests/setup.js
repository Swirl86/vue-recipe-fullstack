import "@testing-library/jest-dom";
import { config } from "@vue/test-utils";
import { vi } from "vitest";

// Global stub for router-link
config.global.stubs = {
    "router-link": {
        template: "<a><slot /></a>",
    },
};

// Mock localStorage
if (typeof global.localStorage === "undefined") {
    global.localStorage = {
        getItem: vi.fn(() => null),
        setItem: vi.fn(() => null),
        removeItem: vi.fn(() => null),
        clear: vi.fn(() => null),
    };
}
