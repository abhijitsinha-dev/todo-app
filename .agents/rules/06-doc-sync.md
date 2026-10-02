---
name: doc-sync
activation: always-on
---

# Rule: Documentation Sync

- **NEVER** declare a task complete or propose commits if files/directories were created, renamed, moved, or deleted without reconciling `docs/STRUCTURE.md`, `README.md`, and `docs/PLAN.md` in the same turn.
- Applies to source files, configs, agent rules/skills, scripts, workflows, and static assets.
- Update existing entries rather than duplicating.
- Do NOT document ephemeral or build artifacts (`dist/`, `node_modules/`, `.eslintcache`, scratchpads).
- Follow the `doc-sync` skill (`.agents/skills/doc-sync/SKILL.md`) for placement, comment alignment, and tree formatting.
