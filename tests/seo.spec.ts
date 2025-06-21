import { test, expect } from "@playwright/test";

test("homepage has proper SEO meta tags", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Jonathan Bell, Software Engineer");

  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toHaveAttribute(
    "content",
    "Jonathan Bell is a fullstack web developer and software engineer from Canada.",
  );

  const viewport = page.locator('meta[name="viewport"]');
  await expect(viewport).toHaveAttribute("content", "width=device-width");

  const charset = page.locator("meta[charset]");
  await expect(charset).toHaveAttribute("charset", "UTF-8");
});

test("homepage has proper OpenGraph meta tags", async ({ page }) => {
  await page.goto("/");

  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toHaveAttribute(
    "content",
    "Jonathan Bell, Software Engineer",
  );

  const ogDescription = page.locator('meta[property="og:description"]');
  await expect(ogDescription).toHaveAttribute(
    "content",
    "Jonathan Bell is a fullstack web developer and software engineer from Canada.",
  );

  const ogType = page.locator('meta[property="og:type"]');
  await expect(ogType).toHaveAttribute("content", "article");

  const ogSiteName = page.locator('meta[property="og:site_name"]');
  await expect(ogSiteName).toHaveAttribute(
    "content",
    "Jonathan Bell - Software Engineer",
  );

  const ogImage = page.locator('meta[property="og:image"]');
  await expect(ogImage).toHaveAttribute("content", "/icons/me5.jpg");

  const ogImageAlt = page.locator('meta[property="og:image:alt"]');
  await expect(ogImageAlt).toHaveAttribute(
    "content",
    "A silhouetted Jonathan Bell sits upon a twisted piece of metal that appears to be part of an old bridge",
  );

  const ogImageWidth = page.locator('meta[property="og:image:width"]');
  await expect(ogImageWidth).toHaveAttribute("content", "506");

  const ogImageHeight = page.locator('meta[property="og:image:height"]');
  await expect(ogImageHeight).toHaveAttribute("content", "506");

  const ogPublisher = page.locator('meta[property="article:publisher"]');
  await expect(ogPublisher).toHaveAttribute(
    "content",
    "https://jonathanbell.github.io",
  );
});

test("cv page has proper seo meta tags", async ({ page }) => {
  await page.goto("/cv");

  await expect(page).toHaveTitle("Jonathan Bell - Résumé");

  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toHaveAttribute(
    "content",
    "The personal online curriculum vitea of Jonathan Bell",
  );
});

test("blog page has proper SEO meta tags", async ({ page }) => {
  await page.goto("/blog");

  const title = await page.title();
  expect(title).toContain("Jonathan Bell");

  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toBeAttached();
});

test("RSS feed link is present", async ({ page }) => {
  await page.goto("/");

  const rssLink = page.locator('link[type="application/rss+xml"]');
  await expect(rssLink).toHaveAttribute("href", "/rss.xml");
  await expect(rssLink).toHaveAttribute(
    "title",
    "RSS Feed for jonathanbell.github.io",
  );
});

test("favicon is properly configured", async ({ page }) => {
  await page.goto("/");

  const favicon = page.locator('link[rel="icon"]');
  await expect(favicon).toBeAttached();

  const href = await favicon.getAttribute("href");
  expect(href).toContain("data:image/svg+xml");
});

test("blog post pages have proper SEO structure", async ({ page }) => {
  await page.goto("/blog/getting-data-from-an-api-with-vba");

  const title = await page.title();
  expect(title).toContain("Getting Data from a 3rd Party API with VBA");
  expect(title).toContain("Jonathan Bell");

  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toBeAttached();

  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toBeAttached();

  const ogDescription = page.locator('meta[property="og:description"]');
  await expect(ogDescription).toBeAttached();
});

test("all pages have required meta tags", async ({ page }) => {
  const pages = ["/", "/blog", "/cv", "/links"];

  for (const pagePath of pages) {
    await page.goto(pagePath);

    // Every page should have these basic meta tags.
    await expect(page.locator("meta[charset]")).toBeAttached();
    await expect(page.locator('meta[name="viewport"]')).toBeAttached();
    await expect(page.locator('meta[name="description"]')).toBeAttached();

    // Every page should have a title.
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).toContain("Jonathan Bell");
  }
});
