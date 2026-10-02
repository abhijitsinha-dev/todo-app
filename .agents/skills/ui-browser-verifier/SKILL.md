---
name: ui-browser-verifier
description: >-
  Use this skill to open the browser, inspect the rendered UI across multiple viewports
  (Desktop, Tablet, Mobile), verify interactive workflows, check console error logs,
  and validate design fidelity after making UI changes.
---

# UI Browser Verifier Skill

## 1. Ownership & Scope

- **OWNED BY THIS SKILL**:
  - Live browser rendering and interaction testing using `browser_subagent`.
  - Multi-viewport layout verification (Desktop 1280px, Tablet 768px, Mobile 375px).
  - End-to-end interactive user flows:
    - Navigating tabs (`Home`, `Create`, `Stats`, `Settings`).
    - Creating a new task and verifying its appearance.
    - Clicking a task to open the dedicated Detail view (`#/todo/:id`).
    - Toggling subtasks and checking progress meters.
    - Testing reminder popup modal interactions (_Snooze_, _Complete_, _Dismiss_).
    - Testing Dark / Light theme toggle.
  - Console health monitoring: Zero uncaught exceptions, zero unhandled promise rejections, zero 404 broken asset requests. Non-fatal warnings (e.g. Vite HMR logs) are recorded as non-blocking diagnostics.
- **DELEGATED TO OTHER SKILLS**:
  - Storage unit tests and corrupted JSON recovery belong to `local-storage-auditor`.
  - Pre-flight build compilation belongs to `vite-build-validator`.

---

## 2. Preconditions

Before running browser verification, verify that:

1. `browser_subagent` capability is available in the current environment. If `browser_subagent` is not available, **HALT** and report: _"browser verification unavailable in this environment."_
2. `curl.exe` (or `curl`) is accessible in the system PATH to test HTTP reachability.
3. `package.json` contains a `dev` script.

---

## 3. Execution Procedure

### Step 1: Ensure Local Dev Server Is Active

1. Test server reachability using `run_command`:
   ```powershell
   curl.exe -s -o NUL -w "%{http_code}" http://localhost:5173/
   ```
2. If the response code is `200`: Target URL is `http://localhost:5173/`.
3. If not `200`:
   - Launch Vite dev server in the background:
     ```powershell
     npm run dev
     ```
   - If port `5173` is already in use by another process, parse the assigned port from Vite's stdout output (e.g. `http://localhost:5174/`) and use that URL.
   - Wait up to 5 seconds until the targeted URL returns HTTP `200`.

### Step 2: Launch the Browser Subagent

Invoke `browser_subagent` targeting the active dev server URL, executing the following test sequence:

1. **Desktop Viewport** (`1280x800`):
   - Navigate to the active dev server URL.
   - Verify header logo, navigation sequence (`Home`, `Create`, `Stats`), and Settings icon (⚙️).
   - Verify default Home view shows today's upcoming tasks.
2. **Interactive Flow**:
   - Navigate to `#/create`, fill in form (Title, Priority, Due Date, Subtask), submit.
   - Verify redirection to Home and that the new item is listed.
   - Click the todo title; verify transition to `#/todo/:id`.
   - Check off a subtask; verify progress percentage increases.
   - Click "Back to Home".
3. **Settings & Themes**:
   - Click the ⚙️ Settings icon (navigates to `#/settings`).
   - Toggle theme to Light mode; verify `data-theme="light"` or background changes; toggle back to Dark.
   - Click "Test Sound" button.
   - Click "← Back" button.
4. **Mobile Viewport** (`375x667`):
   - Resize browser window or set mobile emulation to `375x667`.
   - Verify bottom navigation bar is visible, sticky, and responsive.
   - Verify all buttons and tabs are easily clickable.
5. **Console Health**:
   - Inspect console logs: Confirm zero uncaught exceptions, zero unhandled rejections, and zero 404 asset failures.

---

## 3. Testable Success Criteria

| Check ID   | Verification Item           | Target                     | Success Criteria                                        |
| :--------- | :-------------------------- | :------------------------- | :------------------------------------------------------ |
| **UBV-01** | Dev Server Reachability     | Dev server URL             | HTTP 200, `#app` element mounted                        |
| **UBV-02** | Tab Navigation Sequence     | Navigation Bar             | Tabs ordered strictly `Home` -> `Create` -> `Stats`     |
| **UBV-03** | Todo Creation & Detail View | Create form -> Detail page | Form adds todo; clicking title opens `#/todo/:id`       |
| **UBV-04** | Subtask Progress Meter      | Detail View checklist      | Checking subtask updates completion ratio dynamically   |
| **UBV-05** | Mobile Viewport Adaptation  | `375px` viewport           | Bottom nav renders, cards fit without horizontal scroll |
| **UBV-06** | Theme Toggle                | Settings view              | Dark/Light themes switch immediately on click           |
| **UBV-07** | Console Health              | Browser Console            | 0 uncaught exceptions, 0 unhandled rejections, 0 404s   |

---

## 4. Failure Branch

If any browser test fails (visual bug, broken interaction, or console error):

1. **HALT**: Stop test run. Do NOT consider task complete.
2. **INSPECT**: Read DOM state or error stack trace to pinpoint the failing component or handler.
3. **REPAIR**: Update the offending component file using `replace_file_content`.
4. **RE-VERIFY**: Re-run Vite build check (`vite-build-validator`), then re-run browser subagent until all `UBV` checks pass.

---

## 5. Required Output Contract

The agent must output a structured verification report in this exact format:

```markdown
### 🌐 Browser UI Verification Report

| Check ID | Verification Item         | Viewport          | Result      | Observations                                          |
| :------- | :------------------------ | :---------------- | :---------- | :---------------------------------------------------- |
| UBV-01   | Server Mount              | Desktop (1280px)  | PASS / FAIL | App mounted at `#app`                                 |
| UBV-02   | Tab Sequence              | Desktop (1280px)  | PASS / FAIL | Strict Home -> Create -> Stats                        |
| UBV-03   | Create & Detail Page Flow | Desktop (1280px)  | PASS / FAIL | Created task & navigated to `#/todo/:id`              |
| UBV-04   | Subtask Progress Meter    | Desktop (1280px)  | PASS / FAIL | Subtask checklist updates meter                       |
| UBV-05   | Mobile Responsive Layout  | Mobile (375px)    | PASS / FAIL | Bottom nav active, zero horizontal overflow           |
| UBV-06   | Dark / Light Theme Toggle | Settings (1280px) | PASS / FAIL | Instant theme switch verified                         |
| UBV-07   | Console Error Audit       | All Viewports     | PASS / FAIL | 0 uncaught exceptions, 0 unhandled rejections, 0 404s |

- **Console Log Audit**: 0 uncaught exceptions, 0 unhandled rejections, 0 broken asset 404s (non-fatal warnings logged if present)
- **Overall Status**: [ PASSED (7/7) | FAILED (X/7) ]
```
