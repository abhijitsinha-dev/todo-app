# Workspace Guidelines — Todo App

This project follows a quality-first workflow with human-approved commits.

---

## Project

Todo app built with Vite + Vanilla JS (ES6+ modules, zero runtime UI overhead), plain CSS,
hash routing (`#/`, `#/create`, `#/stats`, `#/todo/:id`, `#/settings`), and localStorage persistence.
Entry: `src/main.js`. State: `src/services/todoStore.js`.

---

## Commands

- `npm run dev` — Vite dev server (default port 5173)
- `npm run build` — production build
- `node scripts/auditStorage.js` — headless storage and schema audit

---

## Activation Model

- Files in `.agents/rules/` are always-on constraints.
- Files in `.agents/skills/` are triggered playbooks, loaded by their `description` field.
- When a rule and a skill conflict, the rule wins.

---

## Execution Pipeline (Mandatory Order)

Order of execution is mandatory. If any step fails, **HALT**; do not proceed to the next step or propose commits.
Note: `npm run build`, `npm run format:check`, and `npm run lint:ci` are NOT run on every task; they run during the **Commit Gate** before proposing any commits.

1. **Storage Gate** — if `src/services/todoStore.js`, the data model, or settings schema changed → `local-storage-auditor`; 5/5 pass.
2. **A11y Gate** — if CSS (`src/styles/index.css`), layout, or interactive components changed → `responsive-a11y-auditor`; 6/6 pass.
3. **Browser Gate** — `ui-browser-verifier`; 7/7 pass with zero blocking findings (0 uncaught exceptions, 0 unhandled rejections, 0 404s).
4. **Doc Sync Gate** — if files or directories were created, renamed, moved, or deleted → `doc-sync`; update tree and references.
5. **Commit Gate (Pre-Commit Verification)** — run `npm run build` (`vite-build-validator`), `npm run format:check`, and `npm run lint:ci` before proposing commits. See `.agents/rules/01-commit-approval.md` and the `commit-proposer` skill. Never commit without explicit user approval.

---

## Rules (`.agents/rules/`)

1. `01-commit-approval.md` — never run git add or git commit without explicit approval; never suggest commit messages without being asked.
2. `02-commit-convention.md` — enforce `docs/COMMIT_CONVENTION.md` (the single source of truth).
3. `03-execution-pipeline.md` — the ordered 6-step pipeline above, with strict HALT semantics.
4. `04-ui-completion-gate.md` — no UI task is "done" until browser verification passes across viewports.
5. `05-strict-instruction-scope.md` — do nothing without explicit instruction; ask for approval before taking any action beyond user requests.
6. `06-doc-sync.md` — before declaring a task done or proposing commits, reconcile `docs/STRUCTURE.md`, `README.md`, and `docs/PLAN.md` with repository file changes.
7. `07-path-convention.md` — never write absolute filesystem paths; always use repo-relative paths.

---

## Skills (`.agents/skills/`)

1. `commit-proposer` — inspect diffs, draft conventional messages, propose, commit on approval.
2. `doc-sync` — reconcile `docs/STRUCTURE.md`, `README.md`, and `docs/PLAN.md` with repo changes.
3. `local-storage-auditor` — schema, import/export, corruption recovery via `scripts/auditStorage.js`.
4. `responsive-a11y-auditor` — touch targets ≥ 44×44, keyboard nav, WCAG contrast ≥ 4.5:1.
5. `ui-browser-verifier` — multi-viewport rendering, interactive flows, console health.
6. `vite-build-validator` — `npm run build` with 120s timeout.
