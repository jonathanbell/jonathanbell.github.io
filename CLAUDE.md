# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Jonathan Bell's personal website built with Astro, deployed at jonathanbell.github.io. It's a static site containing a résumé, blog, projects portfolio, and links. The site uses Astro as the main framework with TypeScript, SCSS, and Playwright for testing.

## Key Commands

### Development

- `npm run dev` or `npm run start` - Start local development server at localhost:3000
- `npm run build` - Build production site to ./dist/ (includes Astro type checking)
- `npm run preview` - Preview production build locally at localhost:4321
- `npm run test` - Run Playwright tests (builds first, then runs tests against preview server)

### Code Quality

- `npm run lint` - Run ESLint on TypeScript and Astro files
- `npm run lint:fix` - Run ESLint and auto-fix issues
- `npm run prettier:fix` - Format code with Prettier
- `npm run astro check` - Run Astro's built-in type checking

### Release/Versioning

- `npm run release` - Interactive semantic version increment, changelog generation, and automated release

## Architecture & Structure

### Content Management

- **Blog posts**: `/src/pages/blog/*.md` - Markdown files with frontmatter
- **Projects**: `/src/content/projects/*.md` - Content collections with schema validation
- **Static pages**: `/src/pages/*.astro` - Astro components for main pages

### Layouts & Components

- **BaseLayout.astro**: Main layout with SEO meta tags, OpenGraph, and global styles
- **Post.astro**: Layout for blog posts
- **Components**: Reusable Astro components in `/src/components/`

### Styling

- **Global styles**: Defined in BaseLayout.astro with CSS custom properties
- **SCSS utilities**: `/src/styles/` contains breakpoints and utility mixins
- **Dark mode**: Automatic via `prefers-color-scheme` media query
- **Print styles**: Optimized for CV printing

### Content Schema

Projects use schema validation requiring:

- `name`: string
- `link`: string
- `emoji`: string

### Testing

- **Playwright**: End-to-end tests in `/tests/` directory
- **Test browsers**: Firefox, Mobile Safari, Google Chrome
- **Test server**: Runs against preview build on localhost:4321

## Development Notes

- **Node version**: 23.x (managed via Volta)
- **Deployment**: GitHub Actions on push/merge to main branch
- **Site URL**: jonathanbell.github.io
- **RSS feed**: Available at /rss.xml

## Code Quality Tools

- **ESLint**: Configured with TypeScript, Astro, and JSX accessibility rules
- **Prettier**: Code formatting with Astro plugin support
- **Commitlint**: Enforces conventional commit messages
- **Husky**: Git hooks for pre-commit quality checks

## Git and Source Control

When creating commits always use the conventional commit style. The commit title should use lowercase characters only. The body should use proper English grammar.

Do not mention Claude, Claude Code or any AI tools when creating commit messages. Never add "Co-Authored-By: Claude <noreply@anthropic.com>" statements.
