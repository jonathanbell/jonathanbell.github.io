# Jonathan Bell's personal website 👨‍💻

Source code for [jonathanbell.ca](https://www.jonathanbell.ca)

---

This site holds:

1. My online résumé. 😃
1. My blog
1. A listing of my past and current projects
1. Links to my social media, etc.

Please feel free to use this repo as a template for your own résumé but please also remember to change the content, thank you!

This blog and project website is built with [Astro](https://docs.astro.build). 🚀

## Installation

1. Clone this repository: `git clone git@github.com:jonathanbell/jonathanbell.github.io.git jonathanbell.ca`
1. `cd jonathanbell.ca`
1. `npm i`
1. `npm run dev` will run the site locally with the [Vite](https://vitejs.dev/) server

## Developer commands

All commands are run from the root of the project:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run test`         | Run tests                                        |
| `npm run test:all`     | Run unit & node tests                            |
| `npm run lint`         | Run ESLint over: TS, Astro, and JS files         |
| `npm run lint:fix`     | Run ESLint over: TS, Astro, and JS files + fix   |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run [Astro CLI commands](https://docs.astro.build/en/reference/cli-reference/) like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## Deploying

Push and merge to `main`. GitHub actions handle the rest 😌.

## TODOs

- [x] Update resume content
- [ ] Add "[uses](https://github.com/wesbos/awesome-uses/)" page
- [ ] Add Markdown linting in pre-commit hook
