#!/bin/sh
# Install git hooks for this project
# Run this once after cloning: sh scripts/install-hooks.sh

HOOK_DIR=".git/hooks"

cat > "$HOOK_DIR/pre-commit" << 'HOOK'
#!/bin/sh
echo "Running unit tests..."
npm test

if [ $? -ne 0 ]; then
  echo ""
  echo "Tests failed. Commit aborted."
  echo "Fix the failing tests and try again."
  exit 1
fi

echo "All tests passed."
HOOK

chmod +x "$HOOK_DIR/pre-commit"
echo "Pre-commit hook installed successfully."
