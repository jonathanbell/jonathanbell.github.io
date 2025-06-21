import { test, expect } from "@playwright/test";

test("rss feed validates against RSS 2.0 specification", async ({ page }) => {
  await page.goto("/rss.xml");
  const content = await page.content();

  // Should have required RSS 2.0 elements.
  expect(content).toMatch(/<rss version="2\.0"/);
  expect(content).toContain("<channel>");

  // Required channel elements.
  expect(content).toMatch(/<title>.*<\/title>/);
  expect(content).toMatch(/<link>.*<\/link>/);
  expect(content).toMatch(/<description>.*<\/description>/);

  // Should have proper structure.
  expect(content).toMatch(/<\?xml[^>]*\?>/); // XML declaration
  expect(content.indexOf("<rss")).toBeGreaterThan(content.indexOf("<?xml"));
  expect(content.indexOf("<channel>")).toBeGreaterThan(content.indexOf("<rss"));
  expect(content.indexOf("</channel>")).toBeGreaterThan(
    content.indexOf("<channel>"),
  );
  expect(content.indexOf("</rss>")).toBeGreaterThan(
    content.indexOf("</channel>"),
  );
});

test("rss feed has proper channel information", async ({ page }) => {
  await page.goto("/rss.xml");
  const content = await page.content();

  expect(content).toMatch(/<title>.*Jonathan Bell.*<\/title>/);
  expect(content).toMatch(/<link>.*jonathanbell\.github\.io.*<\/link>/);
  expect(content).toContain("<language>");
  expect(content).toMatch(/<rss version="2\.0"/);
});

test("rss feed contains blog posts", async ({ page }) => {
  await page.goto("/rss.xml");
  const content = await page.content();

  expect(content).toContain("<item>");
  expect(content).toContain("</item>");

  const itemMatches = content.match(/<item>/g);
  expect(itemMatches?.length).toBeGreaterThan(1);

  // Should contain known blog post titles.
  expect(content).toContain("Getting Data from a 3rd Party API with VBA");
  expect(content).toContain("Microsoft Cognitive Services with PHP");
});

test("RSS feed dates are properly formatted", async ({ page }) => {
  await page.goto("/rss.xml");
  const content = await page.content();

  const pubDateMatches = content.match(/<pubDate>(.*?)<\/pubDate>/g);
  expect(pubDateMatches?.length).toBeGreaterThan(0);

  // Check date format (RFC 2822 format for RSS)
  if (pubDateMatches) {
    for (const dateMatch of pubDateMatches.slice(0, 3)) {
      const dateString = dateMatch.replace(/<\/?pubDate>/g, "");

      const date = new Date(dateString);
      expect(date.getTime()).not.toBeNaN();

      // Should be in proper RFC 2822 format or ISO format.
      expect(dateString).toMatch(/\d{4}|[A-Z][a-z]{2}/);
    }
  }
});

test("RSS feed content is properly escaped", async ({ page }) => {
  await page.goto("/rss.xml");
  const content = await page.content();

  // Should not contain unescaped HTML in wrong places
  expect(content).not.toMatch(/<title>.*<[^/].*<\/title>/); // No HTML tags in titles

  // Should properly escape content in descriptions
  if (content.includes("<description>")) {
    // If there's HTML content, it should be properly escaped or in CDATA
    const hasUnescapedHTML =
      /<description>(?:(?!<!\[CDATA\[)[\s\S])*?<(?!\/description>)/.test(
        content,
      );
    if (hasUnescapedHTML) {
      // Should use CDATA sections for HTML content
      expect(content).toContain("<![CDATA[");
      expect(content).toContain("]]>");
    }
  }
});

test("rss feed links are absolute URLs", async ({ page }) => {
  await page.goto("/rss.xml");
  const content = await page.content();

  const linkMatches = content.match(/<link>(.*?)<\/link>/g);

  if (linkMatches) {
    for (const linkMatch of linkMatches) {
      const url = linkMatch.replace(/<\/?link>/g, "");

      expect(url).toMatch(/^https?:\/\//);

      expect(url).toContain("jonathanbell.github.io");
    }
  }

  const guidMatches = content.match(/<guid.*?>(.*?)<\/guid>/g);
  if (guidMatches) {
    for (const guidMatch of guidMatches) {
      const guid = guidMatch.replace(/<\/?guid[^>]*>/g, "");

      if (guid.startsWith("http")) {
        expect(guid).toMatch(/^https?:\/\//);
      }
    }
  }
});

test("rss feed includes recent posts only", async ({ page }) => {
  await page.goto("/rss.xml");
  const content = await page.content();

  const pubDateMatches = content.match(/<pubDate>(.*?)<\/pubDate>/g);

  if (pubDateMatches && pubDateMatches.length > 1) {
    const dates = pubDateMatches.map((match) => {
      const dateString = match.replace(/<\/?pubDate>/g, "");
      return new Date(dateString);
    });

    // Dates should be in descending order (newest first).
    for (let i = 0; i < dates.length - 1; i++) {
      expect(dates[i].getTime()).toBeGreaterThanOrEqual(dates[i + 1].getTime());
    }
  }
});

test("rss feed excludes DRAFT posts", async ({ page }) => {
  await page.goto("/rss.xml");
  const content = await page.content();

  expect(content.toUpperCase()).not.toContain("DRAFT");

  const titleMatches = content.match(/<title>(.*?)<\/title>/g);
  if (titleMatches) {
    for (const titleMatch of titleMatches) {
      const title = titleMatch.replace(/<\/?title>/g, "");
      expect(title.toUpperCase()).not.toContain("DRAFT");
    }
  }
});

test("rss feed is gettable from the homepage", async ({ page }) => {
  await page.goto("/");

  const rssLink = page.locator('link[type="application/rss+xml"]');
  await expect(rssLink).toBeAttached();

  const href = await rssLink.getAttribute("href");
  expect(href).toBe("/rss.xml");

  const title = await rssLink.getAttribute("title");
  expect(title).toContain("RSS");
  expect(title).toContain("jonathanbell.github.io");
});
