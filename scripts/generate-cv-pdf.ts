import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";

/**
 * Generate a PDF from the built CV HTML page. This script should run after `npm
 * run build`.
 */
async function generateCvPdf() {
  const distDir = path.join(process.cwd(), "dist");
  const cvHtmlPath = path.join(distDir, "cv", "index.html");
  const pdfOutputPath = path.join(distDir, "cv.pdf");

  // Check if the built HTML exists
  if (!fs.existsSync(cvHtmlPath)) {
    console.error("❌ Error: CV HTML not found at:", cvHtmlPath);
    console.error("Please run 'npm run build' first to generate the HTML.");
    process.exit(1);
  }

  if (!fs.existsSync(distDir)) {
    console.error("❌ Error: dist directory not found:", distDir);
    console.error("Please run 'npm run build' first.");
    process.exit(1);
  }

  console.log("🚀 Generating PDF from CV page...");
  console.log("📄 Starting Astro preview server...");

  const astroPreviewServer = spawn(
    "npx",
    ["astro", "preview", "--host", "127.0.0.1"],
    {
      stdio: "pipe",
    },
  );

  // Wait for server to be ready
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Preview server failed to start"));
    }, 30000);

    astroPreviewServer.stdout?.on("data", (data) => {
      const output = data.toString();
      if (
        output.includes("127.0.0.1:4321") ||
        output.includes("localhost:4321")
      ) {
        clearTimeout(timeout);
        resolve();
      }
    });

    astroPreviewServer.stderr?.on("data", (data) => {
      console.error("Preview server error:", data.toString());
    });
  });

  console.log("Preview server started");

  let browser;

  try {
    // Launch headless Chromium
    browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto("http://127.0.0.1:4321/cv/", { waitUntil: "networkidle" });

    // Emulate print media
    await page.emulateMedia({ media: "print" });

    await page.pdf({
      path: pdfOutputPath,
      format: "Letter", // 8.5" x 11"
      preferCSSPageSize: false,
      printBackground: true,
      tagged: true, // Accessibility support
      margin: {
        // Let CSS @page rules handle margins
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    });

    await browser.close();

    // Stop Astro preview server
    astroPreviewServer.kill();
    console.log("Preview server stopped");

    // Verify PDF was created and get file size
    if (fs.existsSync(pdfOutputPath)) {
      const stats = fs.statSync(pdfOutputPath);
      const fileSizeKB = Math.round(stats.size / 1024);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

      console.log("✅ PDF generated successfully!");
      console.log("📍 Location:", pdfOutputPath);

      if (fileSizeKB < 1024) {
        console.log(`Size: ${fileSizeKB} KB`);
      } else {
        console.log(`Size: ${fileSizeMB} MB`);
      }
    } else {
      console.error("❌ Error: PDF was not created");
      astroPreviewServer.kill();
      process.exit(1);
    }
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    astroPreviewServer.kill();
    console.error("❌ Error generating PDF:", error);
    process.exit(1);
  }
}

generateCvPdf();
