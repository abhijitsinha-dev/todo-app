---
name: path-convention
activation: always-on
---

# Rule: Path Convention

- **NEVER** write absolute filesystem paths.
  - ❌ `file:///c:/Users/abhij/Desktop/todo-app/docs/COMMIT_CONVENTION.md`
  - ❌ `C:\Users\abhij\Desktop\todo-app\docs\COMMIT_CONVENTION.md`
  - ❌ `/Users/abhij/Desktop/todo-app/docs/COMMIT_CONVENTION.md`

## Markdown / HTML links

Resolved relative to the current file's directory — not the repo root.

| From           | To                          | Use                    |
| -------------- | --------------------------- | ---------------------- |
| `README.md`    | `docs/PLAN.md`              | `docs/PLAN.md`         |
| `docs/PLAN.md` | `README.md`                 | `../README.md`         |
| `docs/PLAN.md` | `docs/COMMIT_CONVENTION.md` | `COMMIT_CONVENTION.md` |
| `docs/PLAN.md` | `src/main.js`               | `../src/main.js`       |

## Inline code / prose

Not resolved — use repo-relative paths for consistency:
`docs/COMMIT_CONVENTION.md`, `src/main.js`, `.agents/rules/01-commit-approval.md`.

## Everywhere

Before saving any file, scan for `file:///`, `C:\`, `/Users/`, `/home/` and replace with the correct relative form. Never use `file:///` in markdown links.
