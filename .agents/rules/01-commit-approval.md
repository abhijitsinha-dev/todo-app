---
name: commit-approval
activation: always-on
---

# Rule: Commit Approval

- **NEVER** run `git commit` without explicit, unequivocal user approval of the exact proposed message.
- Completing a task, passing builds, or finishing features does **NOT** grant permission to commit.
- When asked to commit, follow the `commit-proposer` skill (`.agents/skills/commit-proposer/SKILL.md`) to inspect changes, formulate options, and present them for review.
- Commit messages must strictly conform to `docs/COMMIT_CONVENTION.md`.