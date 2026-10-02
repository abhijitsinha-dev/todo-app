# Todo App — Comprehensive Project Plan

## 1. Project Overview

A modern, ultra-responsive Todo Web Application built using **Vite** and **Vanilla JavaScript** (ES6+ Modules) with zero external CSS frameworks. The app offers advanced task scheduling, due dates, reminder popups, priority management, subtask checklists, and a daily completion analytics dashboard.

---

## 2. Key Requirements & Architectural Decisions

### A. Navigation & Routing

- **Architecture**: Single Page Application (SPA) with Hash-based routing (`#/`, `#/create`, `#/stats`, `#/todo/:id`).
- **Tab Sequence (Strict)**:
  1. **Home** (`#/` or `#/home`)
  2. **Create** (`#/create`)
  3. **Stats** (`#/stats`)
- **Detail View**: Dedicated full-page route (`#/todo/:id`) opened by clicking a todo on the Home view, featuring full details, subtask progress, and in-place editing/deletion.

### B. Tab Features

1. **Home Tab**:
   - **Default View**: Displays only upcoming, unfinished tasks scheduled for **Today**.
   - **Filter Pills**: `Today` (default), `Upcoming (Future)`, `Completed`, `All`.
   - **Search Bar**: Real-time keyword filter across titles and descriptions.
   - **Todo Items**: Displays clean cards highlighting the title, priority accent, category badge, and quick completion toggle.
2. **Create Tab**:
   - Form fields:
     - **Title** (required, autofocus)
     - **Description** (multiline markdown/rich text preview)
     - **Priority**: Segmented selector (`Low`, `Medium`, `High`)
     - **Target Date**: The scheduled date for the task (defaults to today)
     - **Due Date & Time**: Deadline date and time
     - **Remind Me**: Toggle revealing reminder timing (`At due time`, `10 mins before`, `30 mins before`, `Custom`)
     - **Category Tag**: Preset badges (`Work`, `Personal`, `Health`, `Finance`, `Urgent`, `Study`) + custom tag
     - **Subtasks**: Dynamic checklist adder with remove/reorder controls
3. **Stats Tab**:
   - **Daily Tracking**: Shows how many tasks were scheduled to be completed in a selected day vs. how many were actually completed.
   - **Day Navigator**: Date picker and previous/next day buttons.
   - **Visual Metrics**:
     - Circular SVG progress ring displaying completion percentage.
     - Scheduled vs. Completed count cards.
     - Priority distribution breakdown (Low / Med / High).
     - Category breakdown bars.
     - 7-day completion activity overview.

### C. Reminder & Notification System

- **Hybrid Alerting**:
  - **In-App Popup Modal**: Floating glassmorphism dialog showing task title, due countdown, and quick actions:
    - _Mark Complete_
    - _Snooze 10m_
    - _Dismiss_
  - **Audio Effects**: Synthesized alert chime powered by the Web Audio API (zero external audio file dependencies).
  - **Native Browser Notifications**: Fires standard Web Notifications if permission is granted by the user.
- **Background Engine**: Periodic checking interval (every 15s) scanning upcoming reminders and tracking triggered state to prevent duplicates.

### D. Multi-Device Responsiveness

- **Desktop & Laptop (1025px+)**: Centered container (max 1080px), sleek top navbar with glowing brand logo, multi-column dashboard grid.
- **Tablets & iPad (641px - 1024px)**: Adaptive two-column layouts, touch-friendly touch targets, flexible content cards.
- **Mobile Phones (iPhone & Android: ≤640px)**:
  - Ergonomic bottom navigation bar with easy thumb reach.
  - Full-width touch cards (minimum 44×44px touch targets).
  - Fluid typography with CSS `clamp()`.
  - iOS safe-area-inset padding for notches and home indicators.

### E. Settings & Customization

- **Top-Right Settings Icon (⚙️)**: Located in the top-right corner across all screens, with a subtle hover/focus animation, linking to `#/settings`.
- **Navigation Behavior**: Hash-based route `#/settings`. The main navigation tabs (`Home`, `Create`, `Stats`) remain accessible, and the Settings view includes a prominent "← Back" button to return to the prior tab.
- **Settings Features**:
  1. **Appearance**: Dark & Light mode toggle with instant theme application and persistent localStorage saving.
  2. **Audio & Sound Effects**: Toggle switch to enable/disable sound effects (completion chime & reminder alert), plus a "Test Sound" button to sample the Web Audio API melody.
  3. **Notification Preferences**: Browser notification status indicator (`Granted`, `Default`, `Denied`) with a "Request Permission" button, plus default reminder timing preference.
  4. **Data Management**:
     - _Export Tasks (JSON)_: Instant download of all todos and settings.
     - _Import Tasks (JSON)_: File upload to restore todos.
     - _Reset All Data_: Danger zone action protected by a dedicated confirmation modal dialog before wiping data.

---

## 3. Directory & File Structure

Adheres to a **layered architecture with camelCase filenames**:

> [!NOTE]
> The canonical and exhaustive repository directory tree is maintained in [`docs/STRUCTURE.md`](STRUCTURE.md).
> See [`AGENTS.md`](../AGENTS.md) for the live, canonical source of project rules, skills inventory, and execution pipeline gates.

For the complete file inventory, folder hierarchy, and layer responsibilities, refer to [`docs/STRUCTURE.md`](STRUCTURE.md).

---

## 4. Todo Data Model Schema

```javascript
{
  id: "todo_1727854200123_abc",
  title: "Submit quarterly report",
  description: "Prepare revenue graphs and summary for the team review.",
  priority: "high", // "low" | "medium" | "high"
  targetDate: "2026-10-02", // Scheduled day (YYYY-MM-DD)
  dueDateTime: "2026-10-02T17:00", // Due date and time (YYYY-MM-DDTHH:mm)
  remindMe: true,
  reminderOffset: "10", // "0" (at due time), "10", "30", or custom timestamp
  reminderTime: "2026-10-02T16:50", // Calculated trigger time
  reminderTriggered: false,
  category: "Work", // "Work" | "Personal" | "Health" | "Finance" | "General" | custom
  completed: false,
  completedAt: null, // ISO string when completed (used for daily completion stats)
  subtasks: [
    { id: "sub_1", title: "Collect spreadsheets", done: true },
    { id: "sub_2", title: "Generate PDF charts", done: false }
  ],
  createdAt: 1727854200000,
  updatedAt: 1727854200000
}
```

---

## 5. Execution Steps (For when you proceed)

1. **Project Scaffolding**:
   - Initialize `package.json` and configure `vite`.
   - Setup `index.html` with Google Fonts (`Inter` and `Outfit`), meta viewport tags, and responsive container roots.
2. **Design System & Styles (`src/styles/index.css`)**:
   - Define color tokens (HSL-based dark & light themes).
   - Glassmorphism utility classes (`backdrop-filter`, subtle borders, shadows).
   - Responsive breakpoints (Mobile ≤ 640px, Tablet 641px–1024px, Desktop 1025px+).
   - Top header with Settings gear icon, bottom mobile nav bar, and responsive touch controls.
3. **Core Services**:
   - `audioService.js`: Web Audio API oscillators with sound enablement toggle check.
   - `todoStore.js`: LocalStorage manager with CRUD operations, subtasks, daily metrics, settings state, and export/import/reset.
   - `reminderService.js`: Background checker checking reminder triggers every 15s.
4. **Components & Routing**:
   - `router.js`: Hash routing `#`, `#/create`, `#/stats`, `#/todo/:id`, `#/settings`.
   - `navBar.js`: Top header with brand logo & Settings icon, plus mobile bottom bar.
   - `reminderModal.js`: Floating modal for reminder alerts.
   - `confirmModal.js`: Reusable safety confirmation dialog.
5. **Views Implementation**:
   - `homeView.js`: Default today's upcoming view, filter pills, search input, todo cards.
   - `createView.js`: Full creation form with subtasks builder and reminder offset selector.
   - `detailView.js`: Full-screen detailed view with subtasks checklist, edit mode, delete confirmation.
   - `statsView.js`: Daily tasks scheduled vs completed analytics, date selector, circular progress meter, priority breakdown.
   - `settingsView.js`: Dedicated settings interface with theme switch, sound toggle & preview, notification status, and data controls.
6. **Testing & Verification**:
   - Validate build with `npm run build`.
   - Verify responsiveness on mobile, tablet, and desktop viewports.
   - Verify Settings options: toggle dark/light mode, toggle and test audio, export/import JSON, and safe data reset confirmation modal.
