---
name: execution-pipeline
activation: always-on
---

# Rule: Execution Pipeline

Order of execution is mandatory. If any step fails, **HALT**; do not proceed to the next step or propose commits.

1. **Pre-Flight Build Gate**: Run `vite-build-validator`; require exit code `0` and finish within 120s before any other verification.
2. **Storage Audit Gate**: If `src/services/todoStore.js`, the data model, or settings schema changed → run `local-storage-auditor`; require 5/5 checks pass (`PASS`).
3. **Accessibility & Responsive Gate**: If CSS stylesheets (`src/styles/index.css`), layout, or interactive components changed → run `responsive-a11y-auditor`; require 6/6 checks pass (`PASS`).
4. **Browser UI Gate**: Run `ui-browser-verifier`; require 7/7 checks pass (`PASS`) with zero blocking findings (0 uncaught exceptions, 0 unhandled rejections, 0 404s).
5. **Commit Gate**: Only after steps 1–4 pass may the agent propose commit messages. Follow `.agents/rules/01-commit-approval.md` and the `commit-proposer` skill.
