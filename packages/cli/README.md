# create-cap2ui5-app

Scaffolds a new cap2UI5 application from a sample.

## Usage

```bash
npx create-cap2ui5-app my-app
# interactive: pick a sample

npx create-cap2ui5-app my-app --sample=hello-world
# non-interactive

npx create-cap2ui5-app my-app --sample=hello-world --ref=main
# pin sample ref (branch / tag / sha)
```

The CLI downloads the chosen sample directory from
[`cap2UI5/samples`](https://github.com/cap2UI5/samples) using `tiged`
(no git history, no `.git` folder), rewrites `package.json#name`, and prints
the next-step commands.

The list of available samples is fetched live from the GitHub API; if offline
it falls back to a small built-in list.

> Source lives in [`cap2UI5/dev`](https://github.com/cap2UI5/dev) under
> `packages/cli/`.
