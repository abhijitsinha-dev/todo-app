---
name: commit-proposer
description: >-
  Use this skill to inspect changes, formulate commit messages conforming to
  docs/COMMIT_CONVENTION.md, propose options to the user, iterate until explicit
  approval, and execute git add + git commit only after user approval.
---

# Commit Proposer Skill

## 1. Ownership & Scope

- **OWNS**:
  - Inspecting changes with `git status` and `git diff`.
  - Verifying pipeline gates passed before proposing.
  - Formulating messages per `docs/COMMIT_CONVENTION.md`.
  - Presenting options and awaiting explicit approval.
  - Running `git add` + `git commit` only after approval.
- **DELEGATED TO RULES**: "never commit autonomously" → `.agents/rules/01-commit-approval.md`.

---

## 2. Execution Procedure

### Step 1: Pre-Commit Verification & Gate Check

Run these before inspecting changes or proposing messages:

1. **Build** — `npm run build`; require exit `0` within 120s.
2. **Format** — `npm run format:check`.
3. **Lint** — `npm run lint:ci`.
4. **Task gates** (only if the relevant files changed):
   - Storage → `local-storage-auditor` 5/5
   - CSS/layout → `responsive-a11y-auditor` 6/6
   - UI → `ui-browser-verifier` 7/7
   - Files created/moved/deleted → `doc-sync` 4/4

### Step 2: Inspect & Formulate

1. Run `git status` and `git diff`. Do **NOT** `git add`.
2. Draft 1–2 messages per `docs/COMMIT_CONVENTION.md`:
   - Header: lowercase (uppercase only for uppercase filenames like `README.md`), ≤ 50 chars, no trailing `.`, one space after `:`.
   - Body/Footer (optional): lowercase, ≤ 72 chars/line, `- ` bullets, no trailing punctuation.
   - Use recommended types, scopes, and emojis.

### Step 3: Propose & Await Approval

1. Present options while changes remain unstaged.
2. Ask for explicit approval or revisions.
3. **DO NOT run `git add` or `git commit` in this turn.**

### Step 4: Iterate or Execute

- Revision requested → return to Step 3.
- Only on explicit approval:
  ```powershell
  git add -A; git commit -m "<approved-header>" -m "<approved-body>"
  ```

---

## 3. Testable Success Criteria

| Check ID      | Item                   | Success Criteria                                                                   |
| :------------ | :--------------------- | :--------------------------------------------------------------------------------- |
| **COMMIT-01** | Header formatting      | Lowercase (uppercase only for filenames), ≤ 50 chars, no period, space after colon |
| **COMMIT-02** | Body/footer formatting | Lowercase, ≤ 72 chars/line, no trailing punctuation                                |
| **COMMIT-03** | Pipeline verification  | Build, format, lint, and relevant task gates passed before proposal                |
| **COMMIT-04** | Staging & commit gate  | Zero `git add` or `git commit` before explicit approval                            |

---

## 4. Failure Branch

- **Format violation** → fix before proposing; do not present.
- **Revision requested** → regenerate options; stay in proposal mode.
- **No explicit approval** → continue discussion; do not commit.

---

## 5. Required Output Contract

````markdown
### 📝 Commit Proposal / Execution Report

| Check ID  | Item           | Result             | Notes                      |
| :-------- | :------------- | :----------------- | :------------------------- |
| COMMIT-01 | Header format  | PASS / FAIL        | `<header>`                 |
| COMMIT-02 | Body format    | PASS / FAIL        | `<body summary>`           |
| COMMIT-03 | Pipeline gates | PASS / FAIL        | build, format, lint, tasks |
| COMMIT-04 | User approval  | PENDING / APPROVED | —                          |

> COMMIT-04 is interactive state; COMMIT-01–03 are static checks.

**Proposed Commit Message**:

```
type(scope): [emoji] header

- body line 1
- body line 2
```
````
