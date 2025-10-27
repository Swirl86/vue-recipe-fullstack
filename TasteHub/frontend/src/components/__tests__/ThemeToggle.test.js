import { fireEvent, render, screen } from "@testing-library/vue";
import ThemeToggle from "../ThemeToggle.vue";

describe("ThemeToggle", () => {
    it("renders a button", () => {
        render(ThemeToggle);
        const button = screen.getByRole("button");
        expect(button).toBeTruthy();
    });

    it("toggles theme on click", async () => {
        render(ThemeToggle);
        const button = screen.getByRole("button");

        // Start in light mode (mockLocalStorage returns null)
        expect(button.textContent).toContain("🌞");

        // Click to toggle to dark mode
        await fireEvent.click(button);
        expect(button.textContent).toContain("🌙");

        // Click to toggle back to light mode
        await fireEvent.click(button);
        expect(button.textContent).toContain("🌞");
    });
});
