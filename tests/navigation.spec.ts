import { test, expect } from "@playwright/test";

test("404 error page handling", async ({ page }) => {
  const response = await page.goto("/404-not-found");

  expect(response?.status()).toBe(404);

  const pageContent = await page.content();
  const hasErrorIndicator =
    pageContent.includes("404") ||
    pageContent.includes("not found") ||
    pageContent.includes("error") ||
    (await page.getByText(/404|not found|error/i).count()) > 0;

  await expect(page.locator("div.travolta")).toHaveCount(1);

  expect(hasErrorIndicator).toBeTruthy();
});

test("invalid blog post URLs return 404", async ({ page }) => {
  const response = await page.goto("/blog/this-post-does-not-exist");
  expect(response?.status()).toBe(404);
});

test("malformed URLs are handled gracefully", async ({ page }) => {
  const malformedUrls = [
    "/blog//double-slash",
    "/cv/../etc/passwd",
    "/blog/<script>alert('xss')</script>",
  ];

  for (const url of malformedUrls) {
    const response = await page.goto(url);

    expect(response?.status()).toBeLessThan(500);

    // John Travolta should exist.
    await expect(page.locator("div.travolta")).toHaveCount(1);
  }
});
