import { test, expect } from "@playwright/test";

test("there are at least 6 blog posts", async ({ page }) => {
  await page.goto("/blog");
  const blogSection = await page.$('[data-testid="card-section--blog"]');
  const links = await blogSection?.$$("a");
  expect(links?.length).toBeGreaterThan(6);
});

test("the blogroll is on the blog page", async ({ page }) => {
  await page.goto("/blog");
  const blogSection = await page.$('[data-testid="blogroll-section"]');
  expect(blogSection).toBeTruthy();
});

test("the footer is on the main blog page", async ({ page }) => {
  await page.goto("/blog");
  const siteFooter = await page.$('[data-testid="site-footer"]');
  expect(siteFooter).toBeTruthy();
});
