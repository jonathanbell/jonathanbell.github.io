# GitHub Actions Workflows

This repository uses a modular GitHub Actions architecture with reusable composite actions and streamlined workflows.

## Directory Structure

```
.github/
├── actions/           # Reusable composite actions
│   ├── setup-node/    # Node.js environment setup with caching
│   ├── run-tests/     # Integration test execution
│   ├── lint-commits/  # Commit message validation
│   ├── build-site/    # Astro site build
│   └── deploy-pages/  # GitHub Pages deployment
└── workflows/         # Main workflow files
    ├── ci.yml         # Continuous Integration (PRs)
    ├── cd.yml         # Continuous Deployment (main branch)
    └── dependabot.yml # Dependabot auto-merge
```

## Workflows

### CI Workflow (`ci.yml`)

**Trigger:** Pull requests to the main branch

**Jobs:**

1. **commitlint**: Validates commit messages follow conventional commit format
2. **test**: Runs integration tests with Playwright
3. **status-check**: Ensures all checks pass (used as branch protection requirement)

**Features:**

- Runs in parallel for faster feedback
- Skips commitlint for Dependabot PRs
- Cancels in-progress runs when new commits are pushed

### CD Workflow (`cd.yml`)

**Trigger:**

- Push to main branch
- Manual workflow dispatch

**Jobs:**

1. **commitlint**: Validates the pushed commit message
2. **test**: Runs integration tests
3. **build**: Builds the Astro site (depends on commitlint and test)
4. **deploy**: Deploys to GitHub Pages (depends on build)

**Features:**

- Sequential deployment only after all checks pass
- Prevents concurrent deployments
- Preserves in-progress deployments

### Dependabot Workflow (`dependabot.yml`)

**Trigger:** Pull requests from Dependabot

**Jobs:**

1. **auto-approve**: Automatically approves Dependabot PRs
2. **auto-merge**: Enables auto-merge with squash strategy

**Features:**

- Uses Dependabot metadata action for enhanced PR information
- Auto-merges only after CI checks pass
- Deletes branch after merge

## Composite Actions

### setup-node

Sets up Node.js environment with intelligent package manager detection and dependency caching.

**Features:**

- Detects npm, yarn, or pnpm automatically
- Caches dependencies for faster builds
- Configurable Node.js version

### run-tests

Builds the site and runs Playwright integration tests.

**Features:**

- Caches Playwright browsers
- Handles browser installation intelligently
- Configurable timeout

### lint-commits

Validates commit messages using commitlint.

**Features:**

- Handles both PR and push events
- Skips validation for Dependabot by default
- Uses conventional commit format

### build-site

Builds the Astro static site for deployment.

**Features:**

- Configures GitHub Pages settings
- Uploads build artifacts
- Supports custom site URL and base path

### deploy-pages

Deploys the built site to GitHub Pages.

**Features:**

- Simple deployment abstraction
- Returns deployed page URL

## Branch Protection Settings

To ensure the CI pipeline blocks merging, configure branch protection for `main`:

1. **Required status checks:**
    - `CI Status Check` (from ci.yml)
2. **Additional settings:**
    - Require branches to be up to date before merging
    - Include administrators in restrictions
    - Allow force pushes for Dependabot only

## Benefits of This Architecture

1. **DRY Principle**: Common logic is centralized in composite actions
2. **Maintainability**: Changes to build/test logic only need updates in one place
3. **Clarity**: Each workflow has a clear, single purpose
4. **Performance**: Optimized caching and parallel execution where possible
5. **Security**: Dependabot auto-merge only after tests pass
6. **Flexibility**: Easy to add new workflows or modify existing ones
