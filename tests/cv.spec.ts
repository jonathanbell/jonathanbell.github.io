import { test, expect } from "@playwright/test";

test("cv page has the correct title", async ({ page }) => {
  await page.goto("/cv");
  await expect(page).toHaveTitle("Jonathan Bell - Résumé");
});

test("cv page displays contact information", async ({ page }) => {
  await page.goto("/cv");

  const linkedinLink = page.getByRole("link", { name: /linkedin\.com/i });
  await expect(linkedinLink).toBeVisible();
  await expect(linkedinLink).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/jonathan-bell-331578176/",
  );

  const emailLink = page.getByRole("link", {
    name: /jonathanbell\.ca@gmail\.com/i,
  });
  await expect(emailLink).toBeVisible();
  await expect(emailLink).toHaveAttribute(
    "href",
    "mailto:jonathanbell.ca@gmail.com",
  );

  const websiteLink = page.getByRole("link", {
    name: /jonathanbell\.github\.io\/links/i,
  });
  await expect(websiteLink).toBeVisible();
  await expect(websiteLink).toHaveAttribute(
    "href",
    "https://jonathanbell.github.io/links/",
  );
});

test("CV page displays employment history", async ({ page }) => {
  await page.goto("/cv");

  await expect(page.getByText("Workday Inc.").first()).toBeVisible();
  await expect(page.getByText("Klue").first()).toBeVisible();
});

test("cv page displays summary section", async ({ page }) => {
  await page.goto("/cv");

  await expect(page.getByRole("heading", { name: "Summary" })).toBeVisible();
  await expect(
    page.getByText(/Software developer residing in Victoria BC/),
  ).toBeVisible();
});

test("CV page contact section has proper heading structure", async ({
  page,
}) => {
  await page.goto("/cv");

  await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Summary" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Employment" })).toBeVisible();
});

test("CV page footer is hidden for print", async ({ page }) => {
  await page.goto("/cv");
  await page.emulateMedia({ media: "print" });

  const footer = page.locator("#footer");
  await expect(footer).not.toBeVisible();

  await page.emulateMedia({ media: "screen" });
});

test("cv page has proper print styling", async ({ page }) => {
  await page.goto("/cv");
  await page.emulateMedia({ media: "print" });

  const nav = page.locator("header nav");
  const navDisplay = await nav.evaluate((el) => {
    return window.getComputedStyle(el).display;
  });
  expect(navDisplay).toBe("none");

  await page.emulateMedia({ media: "screen" });
});

test("cv page has no broken internal links", async ({ page }) => {
  await page.goto("/cv");

  const internalLinks = page.locator('a[href^="/"], a[href^="#"]');
  const count = await internalLinks.count();

  for (let i = 0; i < count; i++) {
    const link = internalLinks.nth(i);
    const href = await link.getAttribute("href");

    // Skip PDF link since it's generated separately
    if (href && href.startsWith("/") && href !== "/cv.pdf") {
      const response = await page.goto(href);
      expect(response?.status()).toBeLessThan(400);

      await page.goto("/cv");
    }
  }
});
