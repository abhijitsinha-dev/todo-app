---
name: ui-browser-verifier
description: >-
  Use this skill to open the browser, inspect the rendered UI across multiple viewports
  (Desktop, Tablet, Mobile), verify interactive workflows, check console error logs,
  and validate design fidelity after making UI changes.
---

# UI Browser Verifier Skill

This skill guides the agent to autonomously launch a browser session, inspect visual rendering, test interactive components, and ensure design specifications match user requirements.

## When to Use
- Whenever a component, view, styling, or interaction change has been implemented.
- Before declaring a UI task or milestone complete.
- To verify multi-device responsive layouts (Mobile 375px, Tablet 768px, Desktop 1280px).

---

## Step-by-Step Procedure

### 1. Ensure the Local Dev Server is Running
Before launching the browser subagent, ensure the Vite development server is active:
1. Check if the dev server is running on the local port (e.g., `http://localhost:5173/`).
2. If not running, launch it in the background using `run_command`:
   ```powershell
   npm run dev
   ```
   (Wait 2000-3000ms to confirm the local URL is accessible).

### 2. Invoke the Browser Subagent
Spawn a `browser_subagent` task with explicit instructions covering:
- **Navigation**: Open `http://localhost:5173/`.
- **Viewport Checks**:
  1. **Desktop Viewport** (`1280x800`):
     - Verify top header, navigation tabs sequence (`Home`, `Create`, `Stats`), and top-right Settings icon (⚙️).
     - Verify glassmorphic card styling, typography, and contrast.
  2. **Tablet Viewport** (`768x1024`):
     - Verify responsive card stacking and padding.
  3. **Mobile Viewport** (`375x667`):
     - Verify bottom navigation bar visibility and ergonomics.
     - Verify touch targets are at least 44x44px.
- **Interactive Verification**:
  1. **Home Tab**:
     - Verify default view displays today's upcoming tasks.
     - Test filter pills (`Today`, `Upcoming`, `Completed`, `All`).
     - Test real-time search bar filter.
     - Click a todo to verify smooth navigation to the Detail Page (`#/todo/:id`).
  2. **Detail Page**:
     - Verify all details: Title, description, priority badge, target date, due date/time, category, and subtask checklist.
     - Toggle subtask checkboxes; observe progress bar updates.
     - Click "Back to Home" button.
  3. **Create Tab**:
     - Fill in a new todo with title, description, priority, target date, due date/time, and subtasks.
     - Enable "Remind Me" and select reminder timing.
     - Submit and verify redirection and addition of the item.
  4. **Settings Page**:
     - Click the ⚙️ Settings icon in the top-right header.
     - Toggle Dark and Light theme; verify instant theme change.
     - Click "Test Sound" button; verify audio trigger.
  5. **Stats Tab**:
     - Verify daily tasks scheduled vs. completed count, circular progress meter, and priority distribution.
- **Console & Health Verification**:
  - Read browser console logs and verify **zero** uncaught JavaScript exceptions and **zero** 404 broken assets.

### 3. Verification Reporting
Document results in the walkthrough or response:
- State viewports tested.
- Report all functional interactions verified.
- Confirm zero console errors.
