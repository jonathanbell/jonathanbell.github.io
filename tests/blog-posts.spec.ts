import { test, expect } from "@playwright/test";

test("individual blog post pages render correctly", async ({ page }) => {
  // Test a specific blog post.
  await page.goto("/blog/getting-data-from-an-api-with-vba");

  await expect(page).toHaveTitle(
    /Getting Data from a 3rd Party API with VBA.*Jonathan Bell/,
  );

  await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
  await expect(page.getByRole("time")).toBeVisible();
});

test("blog post has proper content structure", async ({ page }) => {
  await page.goto("/blog/getting-data-from-an-api-with-vba");

  await expect(page.locator("article.content")).toBeVisible();

  const mainHeading = page.getByRole("heading", { level: 2 }).first();
  await expect(mainHeading).toBeVisible();

  const timeElement = page.getByRole("time");
  await expect(timeElement).toBeVisible();

  const datetime = await timeElement.getAttribute("datetime");
  expect(datetime).toBeTruthy();

  await expect(page.locator("article.content p").first()).toBeVisible();
});

test("blog post navigation works from homepage", async ({ page }) => {
  await page.goto("/");

  const firstBlogPost = page.getByTestId("card--post-item").first();
  await expect(firstBlogPost).toBeVisible();

  const postLink = firstBlogPost.locator("a");
  await postLink.click();

  expect(page.url()).toContain("/blog/");

  await expect(page.locator("article.content")).toBeVisible();
});

test("blog post dates are properly formatted", async ({ page }) => {
  await page.goto("/blog/getting-data-from-an-api-with-vba");

  const timeElement = page.getByRole("time");
  await expect(timeElement).toBeVisible();

  // Check datetime attribute is in proper format.
  const datetime = await timeElement.getAttribute("datetime");
  expect(datetime).toMatch(
    /^\d{4}-\d{2}-\d{2}$|^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
  );

  // Check visible date text is human-readable.
  const dateText = await timeElement.textContent();
  expect(dateText).toBeTruthy();
  expect(dateText?.length).toBeGreaterThan(5);
});

test("blog post content is properly rendered from markdown", async ({
  page,
}) => {
  await page.goto("/blog/getting-data-from-an-api-with-vba");

  // Should have code blocks (this post has VBA code examples).
  const codeBlocks = page.locator("pre code, .astro-code");
  await expect(codeBlocks.first()).toBeVisible();

  const paragraphs = page.locator("article.content p");
  expect(await paragraphs.count()).toBeGreaterThan(1);

  const links = page.locator("article.content a");
  expect(await links.count()).toBeGreaterThan(0);

  const externalLinks = links.filter({ hasText: /http|www/ });
  const externalLinkCount = await externalLinks.count();

  if (externalLinkCount > 0) {
    const firstExternalLink = externalLinks.first();
    const href = await firstExternalLink.getAttribute("href");
    expect(href).toMatch(/^https?:\/\//);
  }
});

test("blog post SEO meta tags are correct", async ({ page }) => {
  await page.goto("/blog/microsoft-cognitive-services-with-php");

  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toHaveAttribute(
    "content",
    "My first use of 3rd party AI",
  );

  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toBeAttached();

  const ogTitleContent = await ogTitle.getAttribute("content");
  expect(ogTitleContent).toContain("Microsoft Cognitive Services with PHP");
  expect(ogTitleContent).toContain("Jonathan Bell");

  const ogDescription = page.locator('meta[property="og:description"]');
  await expect(ogDescription).toHaveAttribute(
    "content",
    "My first use of 3rd party AI",
  );
});

test("blog posts filter out DRAFT posts", async ({ page }) => {
  await page.goto("/");

  const blogPosts = page.getByTestId("card--post-item");
  const blogPostCount = await blogPosts.count();

  for (let i = 0; i < blogPostCount; i++) {
    const post = blogPosts.nth(i);
    const postText = await post.textContent();
    expect(postText?.toUpperCase()).not.toContain("DRAFT");
  }

  await page.goto("/blog");

  const draftPosts = page.getByText(/DRAFT/i);
  expect(await draftPosts.count()).toBe(0);
});

test("blog post layout consistency", async ({ page }) => {
  const blogPosts = [
    "/blog/getting-data-from-an-api-with-vba",
    "/blog/microsoft-cognitive-services-with-php",
    "/blog/connect-php-to-ldap",
  ];

  for (const postUrl of blogPosts) {
    await page.goto(postUrl);

    // Each post should have consistent layout elements.
    await expect(page.locator("article.content")).toBeVisible();
    await expect(page.getByRole("time")).toBeVisible();
    await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();

    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
  }
});

test("blog post code syntax highlighting works", async ({ page }) => {
  await page.goto("/blog/getting-data-from-an-api-with-vba");

  const syntaxHighlightedBlocks = page.locator(
    '.astro-code, pre[class*="language-"], code[class*="language-"]',
  );

  if ((await syntaxHighlightedBlocks.count()) > 0) {
    const firstBlock = syntaxHighlightedBlocks.first();
    await expect(firstBlock).toBeVisible();

    const backgroundColor = await firstBlock.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    expect(backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    expect(backgroundColor).not.toBe("transparent");
  }
});

test("blog post internal links work correctly", async ({ page }) => {
  await page.goto("/blog/getting-data-from-an-api-with-vba");

  const blogNavLink = page.getByRole("link", { name: "Blog" });
  await expect(blogNavLink).toBeVisible();

  await blogNavLink.click();
  expect(page.url()).toContain("/blog");

  await expect(page.getByText(/blog|posts/i).first()).toBeVisible();
});

test("blog post typography and readability", async ({ page }) => {
  await page.goto("/blog/connect-php-to-ldap");

  const mainContent = page.locator("article.content");

  const fontSize = await mainContent.evaluate((el) => {
    return window.getComputedStyle(el).fontSize;
  });

  const fontSizeValue = parseFloat(fontSize);
  expect(fontSizeValue).toBeGreaterThan(14); // Minimum readable size

  const paragraphs = page.locator("article.content p");
  if ((await paragraphs.count()) > 1) {
    const firstP = paragraphs.first();
    const marginBottom = await firstP.evaluate((el) => {
      return window.getComputedStyle(el).marginBottom;
    });

    const marginValue = parseFloat(marginBottom);
    expect(marginValue).toBeGreaterThan(0);
  }
});
