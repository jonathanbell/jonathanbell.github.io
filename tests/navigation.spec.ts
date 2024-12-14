import { test, expect } from "@playwright/test";

test("navigation links and page titles", async ({ page }) => {
  await page.goto("/");
  const projectCard = page.getByTestId("card--project-item").first();
  let cardBackgroundColor = await projectCard.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue("background-color");
  });
  expect(["rgb(255, 255, 255)", "rgb(0, 0, 0)"]).toContain(cardBackgroundColor);
  await page.click('nav a[href="/#projects"]');
  // Wait for the CSS transition to complete
  await page.waitForTimeout(300); // Wait longer than 0.1 second
  cardBackgroundColor = await projectCard.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue("background-color");
  });
  const possibleBackgroundColors = [
    "rgb(196, 102, 222)", // dark mode, not hovered
    "rgb(219, 34, 114)", // dark mode & light mode, hovered
    "rgb(155, 10, 195)", // light mode, not hovered
  ];
  expect(possibleBackgroundColors).toContain(cardBackgroundColor);

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
