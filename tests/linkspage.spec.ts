import { test, expect } from "@playwright/test";

test("the links section is on the page", async ({ page }) => {
  await page.goto("/links");
  const linksSection = await page.$("[data-testid=\"links-section\"]");
  expect(linksSection).toBeTruthy();
});

test("the links are external", async ({ page }) => {
  await page.goto("/links");
  const linksSection = await page.$("[data-testid=\"links-section\"]");
  const bigOlButtons = await linksSection?.$$("a");
  expect(bigOlButtons?.length).toBeGreaterThan(6);

  if (bigOlButtons) {
    for (const button of bigOlButtons) {
      const href = await button.getAttribute("href");
      expect(href).toBeTruthy();

      if (href === "https://log.jonathanbell.ca/" || href === "mailto:jonathanbell.ca+site@gmail.com") {
        continue;
      }

      expect(href).not.toContain("jonathanbell.ca");
    }
  }
});
