import { render, screen } from "@testing-library/vue";
import Navbar from "../Navbar.vue";

describe("Navbar", () => {
    it("renders the logo", () => {
        render(Navbar);
        expect(screen.getByText("🏠 TasteHub")).toBeInTheDocument();
    });

    it("renders all desktop links", () => {
        render(Navbar);
        expect(screen.getByText("Recipes")).toBeInTheDocument();
        expect(screen.getByText("Favorites")).toBeInTheDocument();
        expect(screen.getByText("Ingredients")).toBeInTheDocument();
    });

    it("renders ThemeToggle button", () => {
        render(Navbar);
        const themeButton = screen.getByTitle("Switch to dark mode");
        expect(themeButton).toBeInTheDocument();
    });
});
