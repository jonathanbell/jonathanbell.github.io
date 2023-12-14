import { test, expect } from "@playwright/test";

test("the homepage has the correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Jonathan Bell, Software Developer");
});

test("the details summary can be shown and hidden", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("personal-block__copy")).not.toBeVisible();
  await expect(page.getByTestId("personal-block__details-summary")).toBeVisible();
  await page.getByTestId("personal-block__details-summary").click();
  await expect(page.getByTestId("personal-block__copy")).toBeVisible();
  await page.getByTestId("personal-block__details-summary").click();
  await expect(page.getByTestId("personal-block__copy")).not.toBeVisible();
});

test("the details summary can be shown and hidden with the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("personal-block__details-summary").press("Enter");
  await expect(page.getByTestId("personal-block__copy")).toBeVisible();
  await page.getByTestId("personal-block__details-summary").press("Enter");
  await expect(page.getByTestId("personal-block__copy")).not.toBeVisible();
});

test("there are six blog post links on the homepage", async ({ page }) => {
  await page.goto("/");

  const writingSection = await page.$("[data-testid=\"card-section--writing\"]");
  const links = await writingSection?.$$("a");
  expect(links?.length).toBe(6);
});

test("clicking the first blog post leads to a blog post", async ({ page }) => {
  await page.goto("/");

  const writingSection = await page.$("[data-testid=\"card-section--writing\"]");
  const links = await writingSection?.$$("a");
  await links?.[0].click();

  expect(page.url()).toContain("/blog/");
});

test("github link takes user to correct page", async ({ page }) => {
  await page.goto("/");
  const href = await page.getByRole("link", { name: "View source" }).getAttribute("href");
  expect(href).toBe("https://github.com/jonathanbell/jonathanbell.github.io");
});
