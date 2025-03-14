import { test, expect } from "@playwright/test";

test("navigation links and page titles", async ({ page }) => {
  await page.goto("/");

  await page.click('nav a[href="/blog"]');
  await expect(page).toHaveTitle(/Blog/);

  await page.click('nav a[href="/cv"]');
  await expect(page).toHaveTitle("Jonathan Bell - Résumé");
  const summaryHeading = await page.waitForSelector("#summary");
  const summaryHeadingText = await summaryHeading.innerText();
  expect(summaryHeadingText).toBe("Summary");

  const mainHeadingLink = page.getByTestId("site-header__main-heading--link");
  expect(await mainHeadingLink.innerText()).toBe("Jonathan Bell");
  await mainHeadingLink.click();
  await expect(page).toHaveTitle(/Jonathan Bell, Software Engineer/);

  await page.click('nav a[href="/links"]');
  await expect(page).toHaveTitle(
    /Jonathan Bell - Personal and Social Media Links/,
  );

  await page.click('nav a[href="/"]');
  await expect(page).toHaveTitle(/Jonathan Bell, Software Engineer/);
});
