# app-ui5

Mirror of the `app/` folder from the [abap2UI5](https://github.com/abap2UI5/abap2UI5) project.

## Sync `app/` manually

Run the sync script from the repo root:

```bash
npm run sync
```

This clones `abap2UI5/abap2UI5`, replaces the local `app/` folder with its contents, and leaves any changes unstaged for you to review and commit.

### Optional overrides

```bash
SOURCE_REPO=https://github.com/abap2UI5/abap2UI5.git \
SOURCE_BRANCH=main \
npm run sync
```
