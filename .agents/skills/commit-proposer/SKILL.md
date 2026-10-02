---
name: commit-proposer
description: >-
  Use this skill to inspect changes, formulate commit messages conforming to
  docs/COMMIT_CONVENTION.md, propose options to the user, iterate until explicit
  approval, and execute git commit only after user approval.
---

# Commit Proposer Skill

## 1. Ownership & Scope

- **OWNED BY THIS SKILL**:
  - Inspecting changed files using `git status` and `git diff`.
  - Verifying that prerequisite pipeline gates (`vite-build-validator`, `local-storage-auditor`, `responsive-a11y-auditor`, `ui-browser-verifier`) have completed before proposing commits.
  - Formulating commit message proposals strictly adhering to `docs/COMMIT_CONVENTION.md`.
  - Presenting options to the user and awaiting explicit approval.
  - Executing `git commit` **ONLY** after receiving unambiguous user approval.
- **DELEGATED TO RULES**:
  - The invariant that commits must never run autonomously is enforced by `.agents/rules/01-commit-approval.md`.

---

## 2. Execution Procedure

### Step 1: Verify Prerequisite Pipeline Gates

Confirm that relevant gates in `.agents/rules/03-execution-pipeline.md` have passed:

- `vite-build-validator` exit code `0`.
- If storage modified: `local-storage-auditor` passed (5/5).
- If CSS/layout modified: `responsive-a11y-auditor` passed (6/6).
- If UI modified: `ui-browser-verifier` passed (7/7).

### Step 2: Inspect Changes & Formulate Message Options

1. Run `git status` and `git diff` to inspect unstaged changes. Do **NOT** run `git add` at this stage.
2. Formulate 1–2 commit messages conforming strictly to `docs/COMMIT_CONVENTION.md`:
   - Header: All lowercase, ≤ 50 characters, no trailing full stop (`.`), one space after colon (`:`).
   - Body & Footer (optional): All lowercase, ≤ 72 characters per line, bullet points (`- `), no trailing full stop.
   - Use recommended types (`feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`, `build`, `ci`, `perf`, `revert`), scopes, and emojis.

### Step 3: Propose to User and Await Approval

1. Present the proposed commit message(s) clearly in the response while changes remain unstaged.
2. Ask for explicit user approval to execute the commit, or invite revisions.
3. **DO NOT EXECUTE `git add` OR `git commit` IN THIS TURN.**

### Step 4: Iterate or Execute

- If user requests changes: Formulate revised options and repeat Step 3 (keep in revision loop).
- **ONLY** if the user explicitly approves (e.g. _"approved"_, _"go ahead and commit"_):
  Stage and commit using `run_command`:
  ```powershell
  git add -A; git commit -m "<approved-header>" -m "<approved-body>"
  ```

---

## 3. Testable Success Criteria

| Check ID      | Verification Item              | Target             | Success Criteria                                                   |
| :------------ | :----------------------------- | :----------------- | :----------------------------------------------------------------- |
| **COMMIT-01** | Header Formatting              | Message Header     | Lowercase, ≤ 50 chars, no trailing period, space after colon       |
| **COMMIT-02** | Body/Footer Formatting         | Message Body       | Lowercase, ≤ 72 chars/line, bulleted, no trailing period           |
| **COMMIT-03** | Pipeline Verification          | Execution Pipeline | Pre-requisite audit & build gates passed prior to proposal         |
| **COMMIT-04** | Staging & Commit Approval Gate | User Interaction   | Zero `git add` or `git commit` run prior to explicit user approval |

---

## 4. Failure Branch

1. **Format Validation Failure**: If a proposed message violates any rule in `docs/COMMIT_CONVENTION.md`, do not present it; fix the formatting first.
2. **Rejection / Revision Request**: If user disapproves or requests changes, regenerate options and remain in proposal mode.
3. **Absence of Explicit Approval**: If user responds without approving the message, continue discussion without committing.

---

## 5. Required Output Contract

When presenting proposals or after executing an approved commit, output:

```markdown
### 📝 Commit Proposal / Execution Report

| Check ID  | Verification Item                         | Result             | Notes                             |
| :-------- | :---------------------------------------- | :----------------- | :-------------------------------- |
| COMMIT-01 | Header Format (<= 50 chars, lowercase)    | PASS / FAIL        | `<header-string>`                 |
| COMMIT-02 | Body Format (<= 72 chars/line, lowercase) | PASS / FAIL        | `<body-summary>`                  |
| COMMIT-03 | Pipeline Gates Completed                  | PASS / FAIL        | Build, storage, a11y, UI verified |
| COMMIT-04 | User Explicit Approval                    | PENDING / APPROVED | Awaiting user review / Approved   |

> Note: COMMIT-04 represents interactive approval workflow state (`PENDING / APPROVED`), while COMMIT-01 through COMMIT-03 represent static formatting and pipeline checks (`PASS / FAIL`).

**Proposed Commit Message**:
```

type(scope): [emoji] header

- body line 1
- body line 2

```

```
