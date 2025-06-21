import { test, expect } from "@playwright/test";

test("homepage has proper heading hierarchy", async ({ page }) => {
  await page.goto("/");

  const h1 = page.locator("h1");
  await expect(h1).toBeVisible();
  await expect(h1).toHaveCount(1); // Only one h1 per page

  const headings = page.locator("h1, h2, h3, h4, h5, h6");
  const headingCount = await headings.count();

  const headingLevels: number[] = [];
  for (let i = 0; i < headingCount; i++) {
    const heading = headings.nth(i);
    const tagName = await heading.evaluate((el) => el.tagName);
    const level = parseInt(tagName.charAt(1));
    headingLevels.push(level);
  }

  expect(headingLevels[0]).toBe(1);

  // No heading should skip more than one level.
  for (let i = 1; i < headingLevels.length; i++) {
    const currentLevel = headingLevels[i];
    const previousLevel = headingLevels[i - 1];
    expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
  }
});

test("navigation is keyboard accessible", async ({ page }) => {
  await page.goto("/");

  const navLinks = page.locator("nav a");
  const linkCount = await navLinks.count();

  await page.keyboard.press("Tab");

  for (let i = 0; i < linkCount; i++) {
    const focusedElement = page.locator(":focus");

    await expect(focusedElement).toBeVisible();

    const isNavLink = await focusedElement.evaluate((el) => {
      return el.closest("nav") !== null && el.tagName === "A";
    });

    if (isNavLink) {
      // Should be able to use with Enter key.
      const href = await focusedElement.getAttribute("href");
      expect(href).toBeTruthy();
    }

    await page.keyboard.press("Tab");
  }
});

test("interactive elements have focus indicators", async ({ page }) => {
  await page.goto("/");

  const interactiveElements = page.locator(
    'a, button, [tabindex]:not([tabindex="-1"])',
  );
  const elementCount = await interactiveElements.count();

  for (let i = 0; i < Math.min(elementCount, 10); i++) {
    const element = interactiveElements.nth(i);

    await element.focus();

    // Check that focus is visible (has outline, border, or background change).
    const focusStyles = await element.evaluate((el) => {
      const styles = window.getComputedStyle(el, ":focus");
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        boxShadow: styles.boxShadow,
        borderColor: styles.borderColor,
      };
    });

    const hasFocusIndicator =
      focusStyles.outline !== "none" ||
      focusStyles.outlineWidth !== "0px" ||
      focusStyles.boxShadow !== "none" ||
      focusStyles.borderColor !== "rgba(0, 0, 0, 0)";

    expect(hasFocusIndicator).toBeTruthy();
  }
});

test("images have proper alt text", async ({ page }) => {
  const pages = ["/", "/cv", "/blog", "/links"];

  for (const pagePath of pages) {
    await page.goto(pagePath);

    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);

      const alt = await img.getAttribute("alt");
      expect(alt).not.toBeNull();
    }

    // Also check background images have proper accessibility.
    const decorativeElements = page.locator('[style*="background-image"]');
    const decorativeCount = await decorativeElements.count();

    for (let i = 0; i < decorativeCount; i++) {
      const element = decorativeElements.nth(i);

      const role = await element.getAttribute("role");
      const ariaLabel = await element.getAttribute("aria-label");
      const ariaHidden = await element.getAttribute("aria-hidden");

      if (!ariaHidden) {
        expect(role === "img" || ariaLabel !== null).toBeTruthy();
      }
    }
  }
});

test("color contrast is sufficient", async ({ page }) => {
  await page.goto("/");

  // Test main text elements for contrast.
  const textElements = page.locator("p, h1, h2, h3, h4, h5, h6, a, span, div");
  const elementCount = await textElements.count();

  // Sample some elements to check contrast.
  for (let i = 0; i < Math.min(elementCount, 15); i++) {
    const element = textElements.nth(i);

    // Skip elements without visible text.
    const text = await element.textContent();
    if (!text || text.trim().length === 0) continue;

    const styles = await element.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        fontSize: computed.fontSize,
      };
    });

    // Parse RGB values for basic contrast check.
    const colorMatch = styles.color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    const bgColorMatch = styles.backgroundColor.match(
      /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
    );

    if (colorMatch && bgColorMatch) {
      const textRgb = [
        parseInt(colorMatch[1]),
        parseInt(colorMatch[2]),
        parseInt(colorMatch[3]),
      ];
      const bgRgb = [
        parseInt(bgColorMatch[1]),
        parseInt(bgColorMatch[2]),
        parseInt(bgColorMatch[3]),
      ];

      // Simple contrast check.
      const textLuminance =
        0.299 * textRgb[0] + 0.587 * textRgb[1] + 0.114 * textRgb[2];
      const bgLuminance =
        0.299 * bgRgb[0] + 0.587 * bgRgb[1] + 0.114 * bgRgb[2];

      const contrast = Math.abs(textLuminance - bgLuminance);

      expect(contrast).toBeGreaterThan(50);
    }
  }
});

test("aria attributes are used correctly", async ({ page }) => {
  await page.goto("/");

  const elementsWithAria = page.locator(
    "[aria-label], [aria-labelledby], [aria-describedby], [aria-expanded], [aria-hidden], [role]",
  );
  const ariaCount = await elementsWithAria.count();

  for (let i = 0; i < ariaCount; i++) {
    const element = elementsWithAria.nth(i);

    // aria-expanded should only be on interactive elements.
    const ariaExpanded = await element.getAttribute("aria-expanded");
    if (ariaExpanded !== null) {
      const tagName = await element.evaluate((el) => el.tagName);
      const isInteractive = ["BUTTON", "A", "SUMMARY", "DETAILS"].includes(
        tagName,
      );
      const hasTabindex = (await element.getAttribute("tabindex")) !== null;

      expect(isInteractive || hasTabindex).toBeTruthy();
    }

    // aria-hidden should not be on focusable elements.
    const ariaHidden = await element.getAttribute("aria-hidden");
    if (ariaHidden === "true") {
      const isFocusable = await element.evaluate((el) => {
        return (
          el.tabIndex >= 0 ||
          ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)
        );
      });

      expect(isFocusable).toBeFalsy();
    }

    // `role` attributes should be valid.
    const role = await element.getAttribute("role");
    if (role) {
      const validRoles = [
        "button",
        "link",
        "img",
        "banner",
        "navigation",
        "main",
        "contentinfo",
        "article",
        "section",
        "complementary",
        "search",
        "form",
        "region",
        "heading",
        "list",
        "listitem",
        "table",
        "row",
        "cell",
        "columnheader",
        "rowheader",
        "tab",
        "tabpanel",
        "tablist",
        "dialog",
        "menu",
        "menuitem",
      ];

      expect(validRoles).toContain(role);
    }
  }
});

test("details/summary elements are accessible", async ({ page }) => {
  await page.goto("/");

  const detailsElements = page.locator("details");
  const detailsCount = await detailsElements.count();

  for (let i = 0; i < detailsCount; i++) {
    const details = detailsElements.nth(i);
    const summary = details.locator("summary");

    if ((await summary.count()) > 0) {
      await summary.focus();
      await expect(summary).toBeFocused();

      const isExpanded = (await details.getAttribute("open")) !== null;

      await page.keyboard.press("Enter");

      const newExpandedState = (await details.getAttribute("open")) !== null;
      expect(newExpandedState).not.toBe(isExpanded);

      const ariaExpanded = await summary.getAttribute("aria-expanded");
      if (ariaExpanded !== null) {
        expect(ariaExpanded).toBe(newExpandedState.toString());
      }
    }
  }
});

test("keyboard tabs work in interactive components", async ({ page }) => {
  await page.goto("/");

  const focusableElements = page.locator(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
  );
  const elementCount = await focusableElements.count();

  if (elementCount > 1) {
    await page.keyboard.press("Tab");
    const firstFocused = await page.evaluate(
      () => document.activeElement?.tagName,
    );

    await page.keyboard.press("Tab");
    const secondFocused = await page.evaluate(
      () => document.activeElement?.tagName,
    );

    await page.keyboard.press("Tab");
    const thirdFocused = await page.evaluate(
      () => document.activeElement?.tagName,
    );

    expect(
      [firstFocused, secondFocused, thirdFocused].filter(Boolean).length,
    ).toBeGreaterThan(1);

    await page.keyboard.press("Shift+Tab");
    const backwardsTabbed = await page.evaluate(
      () => document.activeElement?.tagName,
    );

    expect(backwardsTabbed).toBeTruthy();
  }
});
