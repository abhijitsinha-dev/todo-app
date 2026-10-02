---
name: commit-approval
activation: always-on
---

# Rule: Commit Approval

- **NEVER** run `git add` or `git commit` without explicit user approval of the exact proposed message.
- **NEVER** state, offer, or suggest commit messages unless the user asks.
- Completing a task, passing builds, or finishing features does **NOT** grant permission to stage or commit.

## Sequence

1. User asks to commit.
2. Inspect unstaged changes with `git status` and `git diff` — do NOT `git add` first.
3. Propose message options while changes remain unstaged.
4. Revise until the user explicitly approves a specific message.
5. Only then run `git add` and `git commit`.

Commit messages must conform to `docs/COMMIT_CONVENTION.md`.
