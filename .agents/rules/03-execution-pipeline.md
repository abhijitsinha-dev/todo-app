---
name: execution-pipeline
activation: always-on
---

# Rule: Execution Pipeline

Order is mandatory. HALT on any failure — do not proceed or propose commits.

Build, format, and lint checks are NOT run per-task. They run at the Commit Gate.

1. **Storage Audit** — if `src/services/todoStore.js`, the data model, or settings schema changed → run `local-storage-auditor`; require 5/5.
2. **A11y Audit** — if CSS (`src/styles/index.css`), layout, or interactive components changed → run `responsive-a11y-auditor`; require 6/6.
3. **Browser UI** — if UI or views changed → run `ui-browser-verifier`; require 7/7 with zero blocking findings (0 uncaught exceptions, 0 unhandled rejections, 0 404s).
4. **Doc Sync** — if files or directories were created, renamed, moved, or deleted → run `doc-sync` to reconcile `docs/STRUCTURE.md`, `README.md`, and `docs/PLAN.md`.
5. **Commit Gate** — before proposing messages, run `npm run build`, `npm run format:check`, and `npm run lint:ci`. All must pass. Then follow `.agents/rules/01-commit-approval.md` and the `commit-proposer` skill.
