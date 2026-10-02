---
name: doc-sync
activation: always-on
---

# Rule: Documentation Synchronization

- **NEVER** declare a task complete or propose commits if files or directories were created, renamed, moved, or deleted without reconciling `docs/STRUCTURE.md` (the canonical single source of truth for directory structure), `README.md`, and `docs/PLAN.md` in the same turn.
- This applies to all source files, config files, agent rules/skills, scripts, workflows, and static assets.
- If a path is already documented, update the entry rather than duplicating it.
- Never document ephemeral or build artifacts (e.g. `dist/`, `node_modules/`, `.eslintcache`, test scratchpads).
- Follow the `doc-sync` skill (`.agents/skills/doc-sync/SKILL.md`) for canonical placement, comment alignment, and tree formatting in `docs/STRUCTURE.md`.
