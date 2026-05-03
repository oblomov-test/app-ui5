# Contributing

## Where to contribute

**All PRs and issues go on `cap2UI5/dev`.**

The other repos (`cap2UI5/frontend`, `cap2UI5/backend`, `cap2UI5/samples`) are
**read-only mirrors** that are regenerated from this repo on every release
via `git subtree split`. Any direct push to a mirror will be overwritten.

If you opened a PR on a mirror by accident, please re-open it against `cap2UI5/dev`
with the same path prefix (e.g. a fix in the mirror's `src/` lives in
`packages/frontend/src/` here).

## Local setup

```bash
pnpm install
pnpm dev          # frontend + backend hot-reload, linked via workspace
pnpm test
pnpm lint
```

A change that touches both frontend and backend should be a single PR — that's
the main reason the dev repo is a monorepo.

## Adding a sample

1. Create `samples/<your-sample>/` with its own `package.json`.
2. The sample's `package.json` must pin specific versions of `@cap2ui5/frontend`
   and `@cap2ui5/backend` (not `workspace:*` — samples ship to end users).
3. The sample must run standalone via `npm install && npm run dev`.
4. Add a short `README.md` explaining what it demonstrates.

## Release flow

Maintainers only.

```bash
# 1. Bump versions (use changesets or manual)
pnpm changeset version

# 2. Tag and push
git tag v1.2.3
git push --tags

# 3. CI does the rest:
#    - release.yml  → npm publish @cap2ui5/frontend, @cap2ui5/backend, create-cap2ui5-app
#    - mirror.yml   → subtree split + force-push to cap2UI5/{frontend,backend,samples}
```
