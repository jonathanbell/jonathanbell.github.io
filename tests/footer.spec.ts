import { test, expect } from "@playwright/test";

test("the footer is on the homepage and blog posts page", async ({ page }) => {
  await page.goto("/blog");
  let siteFooter = await page.$("[data-testid=\"site-footer\"]");
  expect(siteFooter).toBeTruthy();
  await page.goto("/");
  siteFooter = await page.$("[data-testid=\"site-footer\"]");
  expect(siteFooter).toBeTruthy();
});
