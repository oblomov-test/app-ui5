# cap2UI5 — Development Monorepo

This is the **source of truth** for the cap2UI5 project. All development happens here.
End users do not consume this repo directly — they use the published npm packages
or scaffold a project via `npx create-cap2ui5-app`.

## Structure

```
packages/
  frontend/        → published as @cap2ui5/frontend, mirrored to cap2UI5/frontend
  backend/         → published as @cap2ui5/backend,  mirrored to cap2UI5/backend
  cli/             → published as create-cap2ui5-app (npm)
samples/
  hello-world/     → mirrored to cap2UI5/samples (each sample standalone runnable)
.github/workflows/
  release.yml      → on tag: npm publish all three packages
  mirror.yml       → on tag: subtree-split push to public mirror repos
```

## Quick start (for users)

```bash
npx create-cap2ui5-app my-app --sample=hello-world
cd my-app
npm install
npm run dev
```

## Development (for maintainers)

```bash
git clone https://github.com/cap2UI5/dev.git
cd dev
pnpm install                 # workspaces are linked across packages
pnpm dev                     # runs frontend + backend in parallel
pnpm test
```

To cut a release:

```bash
git tag v1.2.3 && git push --tags
# CI publishes to npm and force-pushes to the public mirror repos.
```

## Public mirrors (read-only, browse only)

- https://github.com/cap2UI5/frontend  — UI5 frontend source
- https://github.com/cap2UI5/backend   — CAP backend source
- https://github.com/cap2UI5/samples   — runnable example projects

PRs and issues belong on **this repo** (`cap2UI5/dev`). The mirrors are
auto-generated and any direct edits will be overwritten on the next release.

## Legacy folders

`app/`, `app_v2/`, `cap2UI5/` at the repo root are pre-reorganization artifacts
and will be migrated into `packages/` over time. They are not part of the new
release flow.
