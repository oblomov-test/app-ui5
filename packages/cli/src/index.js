import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join, basename } from "node:path";
import prompts from "prompts";
import tiged from "tiged";

const SAMPLES_REPO = "cap2UI5/samples";

// Static fallback list. The CLI also tries the GitHub API at runtime to
// pick up newly added samples without needing a CLI re-release.
const STATIC_SAMPLES = ["hello-world"];

function parseArgs(argv) {
  const out = { name: undefined, sample: undefined, ref: "main" };
  for (const arg of argv) {
    if (arg.startsWith("--sample=")) out.sample = arg.slice("--sample=".length);
    else if (arg.startsWith("--ref=")) out.ref = arg.slice("--ref=".length);
    else if (!arg.startsWith("--") && !out.name) out.name = arg;
  }
  return out;
}

async function listSamples() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${SAMPLES_REPO}/contents/?ref=main`,
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) throw new Error(`github api ${res.status}`);
    const entries = await res.json();
    const names = entries
      .filter((e) => e.type === "dir" && !e.name.startsWith("."))
      .map((e) => e.name);
    return names.length > 0 ? names : STATIC_SAMPLES;
  } catch {
    return STATIC_SAMPLES;
  }
}

export async function run(argv) {
  const args = parseArgs(argv);

  if (!args.name) {
    const res = await prompts({
      type: "text",
      name: "value",
      message: "Project name?",
      initial: "my-cap2ui5-app",
      validate: (v) => (v && v.trim() ? true : "name required"),
    });
    if (!res.value) process.exit(1);
    args.name = res.value.trim();
  }

  const target = resolve(process.cwd(), args.name);
  if (existsSync(target)) {
    throw new Error(`Directory already exists: ${target}`);
  }

  if (!args.sample) {
    const samples = await listSamples();
    const res = await prompts({
      type: "select",
      name: "value",
      message: "Which sample?",
      choices: samples.map((s) => ({ title: s, value: s })),
      initial: 0,
    });
    if (!res.value) process.exit(1);
    args.sample = res.value;
  }

  console.log(
    `\nScaffolding "${args.name}" from ${SAMPLES_REPO}/${args.sample}@${args.ref} ...`,
  );

  const emitter = tiged(`${SAMPLES_REPO}/${args.sample}#${args.ref}`, {
    cache: false,
    force: false,
    verbose: false,
  });
  await emitter.clone(target);

  // Patch package.json with the project name.
  const pkgPath = join(target, "package.json");
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    pkg.name = basename(args.name);
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  }

  console.log(`\nDone. Next steps:\n`);
  console.log(`  cd ${args.name}`);
  console.log(`  npm install`);
  console.log(`  npm run dev\n`);
}
