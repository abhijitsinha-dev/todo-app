# Mandatory UI Verification Workflow Rule

## Purpose
Enforce automated build verification and browser UI inspection on every frontend or user interface change, guaranteeing that the application always functions properly, renders accurately across devices, and maintains zero console errors.

---

## Guidelines for the Agent

### 1. Pre-Flight Build Check
Whenever any JavaScript, CSS, or HTML files are modified:
- Run the build validation procedure (`vite-build-validator` skill or `npm run build`).
- Confirm zero bundling errors, missing imports, or syntax failures before presenting changes.

### 2. Browser UI Verification
After successful build validation and when UI changes have been implemented:
- Ensure the local dev server is active (`npm run dev`).
- Launch `browser_subagent` using the `ui-browser-verifier` skill guidelines.
- Test across viewports:
  - **Desktop** (1280px): Check top navigation sequence (`Home`, `Create`, `Stats`), Settings icon (⚙️), and layout aesthetics.
  - **Tablet** (768px): Check fluid card stacking and margins.
  - **Mobile** (375px): Check bottom navigation bar accessibility and touch targets (>= 44x44px).
- Verify interactive workflows:
  - Check tab switching (`Home` -> `Create` -> `Stats` -> `Settings`).
  - Create a todo and verify it appears on Home.
  - Navigate to the detail page (`#/todo/:id`), test subtask toggles, and click "Back to Home".
  - Verify that Dark & Light theme toggle switches themes instantly.
  - Verify that no uncaught exceptions appear in the browser console.

### 3. Verification Evidence
Always report the results of both the build check and the browser verification in the response or walkthrough artifact.
