---
name: commit-convention
activation: always-on
---

# Rule: Commit Message Convention

- Every commit message **MUST** conform to `docs/COMMIT_CONVENTION.md` (single source of truth).
- **Header**: lowercase, ≤ 50 chars, no trailing full stop.
- **Body & Footer**: lowercase, ≤ 72 chars per line, no trailing punctuation.
- **Exception**: uppercase is permitted only for filenames that are also uppercase (e.g. `README.md`, `docs/STRUCTURE.md`).
- Any error-level violation is blocking; fix warnings before proposing.
- See `.agents/rules/01-commit-approval.md` for the commit gate.
