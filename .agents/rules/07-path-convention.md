---
name: path-convention
activation: always-on
---

# Rule: Path Convention

- **NEVER** write absolute filesystem paths anywhere.
  - ❌ `file:///c:/Users/abhij/Desktop/todo-app/docs/COMMIT_CONVENTION.md`
  - ❌ `C:\Users\abhij\Desktop\todo-app\docs\COMMIT_CONVENTION.md`
  - ❌ `/Users/abhij/Desktop/todo-app/docs/COMMIT_CONVENTION.md`

## Markdown and HTML links

- Links are resolved **relative to the current file's directory**, not the repo root.
- Link to a sibling: `FILE.md` or `./FILE.md`
- Link to a parent: `../FILE.md`
- Link to a grandparent: `../../FILE.md`
- Link to a child: `subdir/FILE.md`

Examples:

- From `README.md` → `docs/PLAN.md`:
  `[Plan](docs/PLAN.md)`
- From `docs/PLAN.md` → `README.md`:
  `[README](../README.md)`
- From `docs/PLAN.md` → `docs/COMMIT_CONVENTION.md`:
  `[Convention](COMMIT_CONVENTION.md)`
- From `docs/PLAN.md` → `src/main.js`:
  `[Entry](../src/main.js)`

## Inline code and prose references

- These are not resolved — use repo-relative paths for consistency.
- `docs/COMMIT_CONVENTION.md`, `src/main.js`, `.agents/rules/01-commit-approval.md`

## Everywhere

- Before saving any file, scan for `file:///`, `C:\`, `/Users/`, `/home/`
  and replace with the correct relative form.
- Never use `file:///` in any markdown link — it breaks on GitHub, in editors,
  and for every contributor except you.
