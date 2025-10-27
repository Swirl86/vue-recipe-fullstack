import { render, screen } from "@testing-library/vue";
import Navbar from "../Navbar.vue";

describe("Navbar", () => {
    it("renders all links correctly", () => {
        render(Navbar);
        expect(screen.getByText("🏠 TasteHub")).toBeTruthy();
        expect(screen.getByText("Recipes")).toBeTruthy();
        expect(screen.getByText("Favorites")).toBeTruthy();
    });

    it("renders ThemeToggle component", () => {
        render(Navbar);
        expect(screen.getByRole("button")).toBeTruthy();
    });
});
