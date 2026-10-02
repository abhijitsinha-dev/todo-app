---
name: doc-sync
description: >-
  Use this skill before completing a task or proposing commits to reconcile
  docs/STRUCTURE.md, README.md, and docs/PLAN.md with repository file and directory changes.
---

# Documentation Sync Skill

## 1. Ownership & Scope

- **OWNED BY THIS SKILL**:
  - Updating the canonical repository tree in `docs/STRUCTURE.md`.
  - Keeping architecture references and links in `README.md` and `docs/PLAN.md` up to date.
  - Maintaining consistent column 44 comment alignment and tree glyphs in `docs/STRUCTURE.md`.
- **DELEGATED TO RULES**:
  - The mandatory requirement to execute this skill before completing any task with file changes is enforced by `.agents/rules/06-doc-sync.md` and the Execution Pipeline (`.agents/rules/03-execution-pipeline.md`).

---

## 2. Preconditions

1. Files or directories have been created, modified, moved, renamed, or deleted during the current task.
2. The working tree changes are verified or ready for task completion.

---

## 3. Execution Procedure

### Step 1: Classify Repository Changes

Inspect `git status --porcelain` to identify all changed, created, or deleted paths:

- **New source component / view / service** → update `src/` tree in `docs/STRUCTURE.md`.
- **New root configuration or dotfile** → update root file listings in `docs/STRUCTURE.md`.
- **New agent rule or skill** → update `.agents/` tree in `docs/STRUCTURE.md`, `AGENTS.md` index, and pipeline steps if applicable.
- **New GitHub workflow or hook** → update `.github/` or `.husky/` sections in `docs/STRUCTURE.md`.
- **Renamed / moved path** → update the path in place in `docs/STRUCTURE.md`; avoid duplicating entries.
- **Deleted path** → remove the entry from `docs/STRUCTURE.md` and any associated references.
- **Ignored / build artifacts** (`dist/`, `node_modules/`, `.eslintcache`) → skip; never document ephemeral artifacts.

### Step 2: Update `docs/STRUCTURE.md`

1. Locate section `## Complete Repository Tree`.
2. Insert, update, or remove the entry in the ASCII tree using standard box-drawing glyphs (`├──`, `└──`, `│   `).
3. Align line comments to start at column 44.
4. Update the corresponding layer explanation in `## Architectural Breakdown by Layer` if a new module or system was introduced.

### Step 3: Reconcile `README.md` and `docs/PLAN.md`

1. Verify that `README.md` and `docs/PLAN.md` link properly to `docs/STRUCTURE.md`.
2. If new commands, scripts, or core features were added, update `README.md` commands and `docs/PLAN.md` feature specifications.

### Step 4: Verify Formatting & Consistency

1. Run `npm run format:check` to ensure Prettier markdown formatting passes.
2. Run `npm run lint:ci` to verify no lint regressions.
3. Verify that `docs/STRUCTURE.md` has no duplicate or stale references.

---

## 4. Testable Success Criteria

| Check ID | Item                   | Success Criteria                                                             |
| -------- | ---------------------- | ---------------------------------------------------------------------------- |
| DOC-01   | STRUCTURE.md Tree Sync | All added, renamed, or moved paths appear accurately in `docs/STRUCTURE.md`. |
| DOC-02   | Doc Links Verified     | `README.md` and `docs/PLAN.md` properly link to `docs/STRUCTURE.md`.         |
| DOC-03   | No Duplicates          | No path or configuration item appears more than once in the directory tree.  |
| DOC-04   | No Stale Entries       | Deleted or renamed old paths are completely removed.                         |

---

## 5. Failure Branch

- If `docs/STRUCTURE.md` is missing a section, create the missing section rather than omitting the path.
- If formatting checks fail (`npm run format:check`), run `npm run format` and verify diffs.

---

## 6. Required Output Contract

Record the audit results in the following format:

| Check ID | Item                   | Result      | Notes                              |
| -------- | ---------------------- | ----------- | ---------------------------------- |
| DOC-01   | STRUCTURE.md Tree Sync | PASS / FAIL | `<path list>`                      |
| DOC-02   | Doc Links Verified     | PASS / FAIL | Links confirmed in README and PLAN |
| DOC-03   | No Duplicates          | PASS / FAIL | Zero duplicates detected           |
| DOC-04   | No Stale Entries       | PASS / FAIL | Zero stale references              |
