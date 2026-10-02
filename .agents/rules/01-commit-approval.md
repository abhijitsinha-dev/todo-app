---
name: commit-approval
activation: always-on
---

# Rule: Commit Approval

- **NEVER** run `git add` or `git commit` without explicit, unequivocal user approval of the exact proposed message.
- Completing a task, passing builds, or finishing features does **NOT** grant permission to stage or commit.
- **NEVER** state, offer, or suggest commit messages unless explicitly asked by the user.
- **Staging & Commit Sequence**:
  - When the user asks to commit, inspect unstaged changes using `git status` and `git diff`. Do **NOT** run `git add` beforehand.
  - Propose commit message options to the user while changes remain unstaged.
  - Keep in a revision loop if the user suggests changes until the message is explicitly approved.
  - **ONLY** after explicit approval of the message, execute both `git add` and `git commit`.
- Commit messages must strictly conform to `docs/COMMIT_CONVENTION.md`.
