#!/usr/bin/env bash
set -euo pipefail

SOURCE_REPO="${SOURCE_REPO:-https://github.com/abap2UI5/abap2UI5.git}"
SOURCE_BRANCH="${SOURCE_BRANCH:-main}"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$REPO_ROOT/app"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

echo "Cloning $SOURCE_REPO ($SOURCE_BRANCH)..."
git clone --depth 1 --branch "$SOURCE_BRANCH" "$SOURCE_REPO" "$TMP_DIR/src"

if [ ! -d "$TMP_DIR/src/app" ]; then
  echo "Error: 'app' folder not found in $SOURCE_REPO" >&2
  exit 1
fi

echo "Syncing app folder into $TARGET_DIR..."
rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"
cp -a "$TMP_DIR/src/app/." "$TARGET_DIR/"

echo "Done."
