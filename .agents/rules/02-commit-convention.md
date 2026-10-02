---
name: commit-convention
activation: always-on
---

# Rule: Commit Message Convention

- Every commit message **MUST** conform to `docs/COMMIT_CONVENTION.md` (the project's single source of truth).
- **Header**: All lowercase, ≤ 50 characters, no trailing full stop (`.`).
- **Body & Footer**: All lowercase, ≤ 72 characters per line, no trailing punctuation.
- Validate messages prior to proposing. Any error-level violation is blocking; warnings must be fixed before proposing.
- See `.agents/rules/01-commit-approval.md` for the commit gate.