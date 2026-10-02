---
name: doc-sync
description: >-
  Use this skill before completing a task or proposing commits to reconcile
  docs/STRUCTURE.md, README.md, and docs/PLAN.md with repository changes.
---

# Documentation Sync Skill

## 1. Ownership & Scope

- **OWNS**:
  - Updating the canonical tree in `docs/STRUCTURE.md`.
  - Keeping links and references in `README.md` and `docs/PLAN.md` current.
  - Maintaining column-44 comment alignment and tree glyphs in `docs/STRUCTURE.md`.
- **DELEGATED TO RULES**: `.agents/rules/06-doc-sync.md` and pipeline step 4.

---

## 2. Preconditions

1. Files or directories were created, modified, moved, renamed, or deleted this task.
2. The working tree is ready for task completion.

---

## 3. Execution Procedure

### Step 1: Classify Changes

Run `git status --porcelain`, then map:

| Change                                                     | Update                                             |
| :--------------------------------------------------------- | :------------------------------------------------- |
| New source file                                            | `src/` tree in `docs/STRUCTURE.md`                 |
| New root config/dotfile                                    | root listing in `docs/STRUCTURE.md`                |
| New rule or skill                                          | `.agents/` tree, `AGENTS.md` index, pipeline steps |
| New workflow or hook                                       | `.github/` or `.husky/` sections                   |
| Renamed/moved path                                         | update in place; no duplicates                     |
| Deleted path                                               | remove entry and any references                    |
| Build artifacts (`dist/`, `node_modules/`, `.eslintcache`) | skip — never document                              |

### Step 2: Update `docs/STRUCTURE.md`

1. Locate `## Complete Repository Tree`.
2. Insert/update/remove entries using `├──`, `└──`, `│   `.
3. Align comments to column 44.
4. Update `## Architectural Breakdown by Layer` if a new module was introduced.

### Step 3: Reconcile `README.md` and `docs/PLAN.md`

1. Confirm both link correctly to `docs/STRUCTURE.md`.
2. If new commands, scripts, or features were added, update the corresponding sections.

### Step 4: Verify

1. No duplicate or stale entries in `docs/STRUCTURE.md`.
2. Tree glyphs and column-44 alignment correct.
3. `format:check` and `lint:ci` are deferred to the Commit Gate.

---

## 4. Testable Success Criteria

| Check ID   | Item                   | Success Criteria                                           |
| :--------- | :--------------------- | :--------------------------------------------------------- |
| **DOC-01** | STRUCTURE.md tree sync | Added/renamed/moved paths reflected                        |
| **DOC-02** | Doc links              | `README.md` and `docs/PLAN.md` link to `docs/STRUCTURE.md` |
| **DOC-03** | No duplicates          | No path appears more than once                             |
| **DOC-04** | No stale entries       | Deleted/renamed paths removed                              |

---

## 5. Failure Branch

- Missing section in `docs/STRUCTURE.md` → create it, don't omit the path.
- Inconsistent paths/links → reconcile before task completion.

---

## 6. Required Output Contract

| Check ID | Item                   | Result      | Notes                  |
| :------- | :--------------------- | :---------- | :--------------------- |
| DOC-01   | STRUCTURE.md tree sync | PASS / FAIL | `<path list>`          |
| DOC-02   | Doc links              | PASS / FAIL | README + PLAN verified |
| DOC-03   | No duplicates          | PASS / FAIL | —                      |
| DOC-04   | No stale entries       | PASS / FAIL | —                      |
