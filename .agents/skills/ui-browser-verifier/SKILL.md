---
name: ui-browser-verifier
description: >-
  Use this skill to open the browser, inspect rendered UI across Desktop, Tablet,
  and Mobile, verify interactive workflows, check console logs, and validate
  design fidelity after UI changes.
---

# UI Browser Verifier Skill

## 1. Ownership & Scope

- **OWNS**:
  - Live browser rendering + interaction via `browser_subagent`.
  - Viewport verification: Desktop 1280px, Tablet 768px, Mobile 375px.
  - Interactive flows: tab navigation, task create, detail view (`#/todo/:id`),
    subtask toggles, reminder modal (_Snooze_/_Complete_/_Dismiss_), theme toggle.
  - Console health: 0 uncaught exceptions, 0 unhandled rejections, 0 404s.
    Non-fatal warnings (Vite HMR) logged as non-blocking.
- **DELEGATED**: Storage logic → `local-storage-auditor`. Build → `vite-build-validator`.

---

## 2. Preconditions

1. `browser_subagent` available. If not, **HALT** and report: _"browser verification unavailable in this environment."_
2. `curl.exe` (or `curl`) on PATH.
3. `package.json` has a `dev` script.

---

## 3. Execution Procedure

### Step 1: Ensure Dev Server

1. Check reachability:
   ```powershell
   curl.exe -s -o NUL -w "%{http_code}" http://localhost:5173/
   ```
2. `200` → use `http://localhost:5173/`.
3. Otherwise:
   - Launch `npm run dev` in background.
   - If 5173 is taken, parse the actual port from Vite stdout.
   - Wait up to 5s for HTTP `200`.

### Step 2: Run Browser Subagent

1. **Desktop (`1280x800`)**: header logo, nav `Home → Create → Stats`, ⚙️ icon, Home shows today's tasks.
2. **Interactive flow**: `#/create` form → submit → verify redirect + listing. Click title → `#/todo/:id`. Toggle subtask → progress updates. "Back to Home".
3. **Settings**: ⚙️ → `#/settings`. Toggle Light theme → verify `data-theme="light"`. Toggle back. "Test Sound". "← Back".
4. **Mobile (`375x667`)**: bottom nav visible, sticky, tappable.
5. **Console**: 0 uncaught exceptions, 0 unhandled rejections, 0 404s.

---

## 4. Testable Success Criteria

| Check ID   | Item                | Target           | Success Criteria                        |
| :--------- | :------------------ | :--------------- | :-------------------------------------- |
| **UBV-01** | Server reachability | Dev URL          | HTTP 200, `#app` mounted                |
| **UBV-02** | Tab sequence        | Nav bar          | Strict `Home → Create → Stats`          |
| **UBV-03** | Create & detail     | Form → Detail    | Add works; title opens `#/todo/:id`     |
| **UBV-04** | Subtask progress    | Detail checklist | Toggle updates ratio                    |
| **UBV-05** | Mobile layout       | 375px            | Bottom nav active, no horizontal scroll |
| **UBV-06** | Theme toggle        | Settings         | Instant dark/light switch               |
| **UBV-07** | Console health      | Console          | 0 exceptions, 0 rejections, 0 404s      |

---

## 5. Failure Branch

1. **HALT** — do NOT mark task complete.
2. **INSPECT** — DOM state or error stack.
3. **REPAIR** — update the offending component.
4. **RE-VERIFY** — re-run `vite-build-validator`, then re-run browser until all UBV pass.

---

## 6. Required Output Contract

```markdown
### 🌐 Browser UI Verification Report

| Check ID | Item                 | Viewport          | Result      | Observations                       |
| :------- | :------------------- | :---------------- | :---------- | :--------------------------------- |
| UBV-01   | Server Mount         | Desktop (1280px)  | PASS / FAIL |                                    |
| UBV-02   | Tab Sequence         | Desktop (1280px)  | PASS / FAIL |                                    |
| UBV-03   | Create & Detail Flow | Desktop (1280px)  | PASS / FAIL |                                    |
| UBV-04   | Subtask Progress     | Desktop (1280px)  | PASS / FAIL |                                    |
| UBV-05   | Mobile Layout        | Mobile (375px)    | PASS / FAIL |                                    |
| UBV-06   | Theme Toggle         | Settings (1280px) | PASS / FAIL |                                    |
| UBV-07   | Console Error Audit  | All Viewports     | PASS / FAIL | 0 exceptions, 0 rejections, 0 404s |

- **Console Log Audit**: 0 uncaught exceptions, 0 unhandled rejections, 0 broken 404s (non-fatal warnings logged)
- **Overall**: [ PASSED (7/7) | FAILED (X/7) ]
```
