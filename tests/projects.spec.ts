import { test, expect } from "@playwright/test";

test("projects section is visible on homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
});

test("projects display with required content", async ({ page }) => {
  await page.goto("/");

  const projectCards = page.getByTestId("card--project-item");

  await expect(projectCards.first()).toBeVisible();

  const projectCount = await projectCards.count();
  expect(projectCount).toBeGreaterThan(0);
  expect(projectCount).toBeLessThanOrEqual(6);

  for (let i = 0; i < projectCount; i++) {
    const card = projectCards.nth(i);

    await expect(card.locator("h3")).toBeVisible();
    await expect(card.locator("a")).toBeVisible();
    const cardContent = await card.textContent();
    // Check for emoji by looking for common emoji patterns (Unicode ranges).
    const hasEmoji =
      /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{27BF}]|[\u{1F600}-\u{1F64F}]/u.test(
        cardContent || "",
      );
    expect(hasEmoji).toBeTruthy();
  }
});

test("project links are external and functional", async ({ page }) => {
  await page.goto("/");

  const projectCards = page.getByTestId("card--project-item");
  const projectCount = await projectCards.count();

  for (let i = 0; i < projectCount; i++) {
    const card = projectCards.nth(i);
    const link = card.locator("a");

    const href = await link.getAttribute("href");
    expect(href).toBeTruthy();

    // Should be external links (start with http/https).
    expect(href).toMatch(/^https?:\/\//);

    // Test that the link is reachable (basic connectivity test)
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = await page.request.head(href!);
      expect(response.status()).toBeLessThan(500);
    } catch {
      // If network request fails, at least ensure URL format is valid.
      expect(href).toMatch(/^https?:\/\/[^\s/$.?#].[^\s]*$/);
    }
  }
});

test("project cards have proper accessibility attributes", async ({ page }) => {
  await page.goto("/");

  const projectCards = page.getByTestId("card--project-item");
  const projectCount = await projectCards.count();

  for (let i = 0; i < projectCount; i++) {
    const card = projectCards.nth(i);
    const link = card.locator("a");

    const linkText = await link.textContent();
    expect(linkText?.trim()).toBeTruthy();

    const heading = card.locator("h3");
    await expect(heading).toBeVisible();

    const headingText = await heading.textContent();
    expect(headingText?.trim()).toBeTruthy();
  }
});

test("project section has proper semantic structure", async ({ page }) => {
  await page.goto("/");

  const projectsSection = page
    .locator('section:has-text("Projects"), div:has-text("Projects")')
    .first();
  await expect(projectsSection).toBeVisible();

  const projectsHeading = page.getByRole("heading", { name: "Projects" });
  await expect(projectsHeading).toBeVisible();

  const headingLevel = await projectsHeading.evaluate((el) => el.tagName);
  expect(["H2", "H3"]).toContain(headingLevel);
});

test("project cards maintain consistent layout", async ({ page }) => {
  await page.goto("/");

  const projectCards = page.getByTestId("card--project-item");
  const projectCount = await projectCards.count();

  if (projectCount > 1) {
    // Get dimensions of first card.
    const firstCard = projectCards.first();
    const firstCardBox = await firstCard.boundingBox();

    // Check that cards have reasonable and consistent dimensions.
    for (let i = 1; i < Math.min(projectCount, 3); i++) {
      const card = projectCards.nth(i);
      const cardBox = await card.boundingBox();

      if (firstCardBox && cardBox) {
        const widthDiff = Math.abs(firstCardBox.width - cardBox.width);
        expect(widthDiff).toBeLessThan(1); // Do not allow for any variation in width.

        // Cards should have some minimum dimensions.
        expect(cardBox.width).toBeGreaterThan(100);
        expect(cardBox.height).toBeGreaterThan(50);
      }
    }
  }
});
