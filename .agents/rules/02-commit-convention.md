---
name: commit-convention
activation: always-on
---

# Rule: Commit Message Convention

- Every commit message **MUST** conform to `docs/COMMIT_CONVENTION.md` (the project's single source of truth).
- **Header**: Lowercase, ≤ 50 characters, no trailing full stop (`.`). Uppercase is permitted ONLY for filenames that are also uppercase (e.g. `docs/STRUCTURE.md` or `README.md`).
- **Body & Footer**: Lowercase, ≤ 72 characters per line, no trailing punctuation. Uppercase is permitted ONLY for filenames that are also uppercase.
- **Filename Casing Recommendation**: Only write in uppercase if the referenced file name is also uppercase; general words, types, and scopes must remain in lowercase.
- Validate messages prior to proposing. Any error-level violation is blocking; warnings must be fixed before proposing.
- See `.agents/rules/01-commit-approval.md` for the commit gate.
