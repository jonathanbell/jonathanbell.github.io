# Jonathan Bell's personal website 👨‍💻

Source code for [jonathanbell.ca](https://www.jonathanbell.ca)

---

This website holds:

1. My online résumé 😃
1. My blog
1. A listing of my past and current projects
1. Links to my social media, etc.

Please feel free to use this repo as a template for your own résumé but please also remember to change the content, thank you!

[jonathanbell.ca](https://www.jonathanbell.ca) is built with [Astro](https://docs.astro.build). 🚀

## Installation

1. Clone this repository: `git clone git@github.com:jonathanbell/jonathanbell.github.io.git jonathanbell.ca`
1. `cd jonathanbell.ca`
1. `npm i`
1. `npm run dev` will run the site locally with the [Vite](https://vitejs.dev/) server

## Developer commands

All commands are run from the root of the project:

| Command                          | Action                                                                                                                 |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `npm install`                    | Install dependencies                                                                                                   |
| `npm run dev`<br>`npm run start` | Compile the project and start the local dev server at `localhost:3000`                                                 |
| `npm run test`                   | Run tests                                                                                                              |
| `npm run lint`                   | Run ESLint over: TS & Astro files                                                                                      |
| `npm run lint:fix`               | Run ESLint over: TS, Astro files (and fix all fixable issues)                                                          |
| `npm run build`                  | Build your production site to `./dist/`                                                                                |
| `npm run preview`                | Preview your build locally (useful when checking a deploy)                                                             |
| `npm run astro <command>`        | Run [Astro CLI commands](https://docs.astro.build/en/reference/cli-reference/) like `astro add`, `astro check`         |
| `npm run astro --help`           | Get help using the Astro CLI                                                                                           |
| `npm run prettier:fix`           | Run Prettier and fix any ugliness                                                                                      |
| `npm run lint:fix`               | Run ESLint and fix any atrocities                                                                                      |
| `npm run version:bump`           | Increment the semantic version of the project via the CLI and a series of prompts                                      |
| `npm run commit`                 | Using the already staged files, create [a conventional commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) |
| `npm run commit:stage`           | Interactively stage files and then commit them using a conventional commit style message                               |
| `npm run commit:stage:all`       | Stage all the files that can be staged and commit them using a conventional style commit message (created via prompts) |
| `npm run commit:lint`            | Lint commits against `HEAD`                                                                                            |
| `npm run changelog`              | Generate a new changelog for the project                                                                               |

## Deploying

Push and merge to `main`. GitHub actions handle the rest 😌.

## TODOs

- [x] Update resume content
- [ ] Add "[uses](https://github.com/wesbos/awesome-uses/)" page
- [ ] Add Markdown linting in pre-commit hook
- [ ] Complete draft blog posts
