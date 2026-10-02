# 📋 Todo App — Modern, Multi-Device Task Management

An ultra-responsive, feature-rich Todo Web Application built with **Vite** and **Vanilla JavaScript** (ES6+ Modules) with zero external CSS frameworks. Engineered for speed, accessibility, and visual elegance across mobile phones, tablets, laptops, and large desktop screens.

---

## 🌟 Highlights & Key Features

This application goes far beyond basic CRUD with specialized scheduling, reminder automation, and productivity metrics:

- 🗓️ **Date-Specific Scheduling & Due Times**: Schedule tasks for specific days, establish exact due dates and times, and monitor impending deadlines.
- ⚡ **Strict Tab Navigation**: Clean Single Page Application (SPA) hash-based routing with tab sequence:
  1. **Home**: Defaults to today's upcoming tasks; includes quick filters (_Today_, _Upcoming_, _Completed_, _All_) and instant real-time search.
  2. **Create**: Rich task creation form with title, multiline description, priority chips, target date, due date & time, category badges, reminder options, and dynamic subtasks.
  3. **Stats**: Daily task analytics showing scheduled vs. completed count, circular SVG progress ring gauge, priority breakdown, and category distribution.
- 🔍 **Detailed Task Page (`#/todo/:id`)**: Clicking any todo title on Home smoothly navigates to a dedicated full-screen detail view with an interactive subtask checklist, progress meter, in-place editing, and deletion.
- ⏰ **Hybrid Reminder System**:
  - In-app animated popup modal with _Mark Complete_, _Snooze (10m)_, and _Dismiss_ actions.
  - Web Audio API synthesized alert sound (zero external audio file dependencies).
  - Native browser push notifications with permission management.
- ⚙️ **Settings (`#/settings`)**:
  - Accessible via the top-right ⚙️ icon across all views.
  - Dark & Light mode toggle with smooth transitions and persistent storage.
  - Sound effects toggle with an interactive "Test Sound" audio preview.
  - Browser notification permission controls and default reminder timing.
  - Full Data Management: Export tasks to JSON, Import backup JSON, and a protected Danger Zone to safely clear data.
- 📱 **Universal Multi-Device Responsiveness**:
  - **Mobile Phones (iPhone & Android)**: Ergonomic bottom navigation bar for comfortable thumb reach, touch-friendly hit areas (minimum 44×44px), and iOS `safe-area-inset` support.
  - **Tablets & iPads**: Adaptive two-column layouts and flexible cards.
  - **Laptops & Desktops**: Centered max-width container (`1080px`), top navigation header, and glassmorphic micro-animations.

---

## 🛠️ Technology Stack

| Layer                       | Technology                                                           |
| :-------------------------- | :------------------------------------------------------------------- |
| **Bundler & Dev Server**    | [Vite 8.x](https://vitejs.dev/)                                      |
| **Language & Runtime**      | Vanilla JavaScript (ES6+ Modules, zero UI runtime overhead)          |
| **Styling & Design System** | Vanilla CSS3 (Custom design tokens, CSS variables, glassmorphism)    |
| **Audio Engine**            | Web Audio API (Synthesized pleasant melodic chimes and alerts)       |
| **Data Persistence**        | Browser `localStorage` with JSON schema validation & backup recovery |
| **Quality & Git Hooks**     | Husky 9.x, Commitlint (Conventional commits with custom rules)       |

---

## 📁 Project Architecture

```
todo-app/
├── .agents/                             # Agent automation skills and rules
│   ├── rules/
│   │   ├── 01-commit-approval.md        # Core invariant: never commit autonomously
│   │   ├── 02-commit-convention.md      # Requires conformance to docs/COMMIT_CONVENTION.md
│   │   ├── 03-execution-pipeline.md     # Ordered 5-step pipeline with strict HALT semantics
│   │   └── 04-ui-completion-gate.md     # Prohibits declaring UI done until verified
│   └── skills/
│       ├── commit-proposer/             # Inspects diffs, proposes messages, awaits approval
│       ├── local-storage-auditor/       # Schema validation & backup integrity checks
│       ├── responsive-a11y-auditor/     # Touch target (>=44px) & accessibility checks
│       ├── ui-browser-verifier/         # Multi-device browser verification workflow
│       └── vite-build-validator/        # Pre-flight build compilation validator
├── .husky/                              # Git lifecycle hooks
│   ├── commit-msg                       # Validates commit format via commitlint
│   ├── pre-commit                       # Runs npm run build before commit
│   ├── pre-push                         # Validates build before push
│   └── post-commit                      # Logs commit confirmation
├── docs/                                # Project documentation
│   ├── COMMIT_CONVENTION.md             # Git commit convention guidelines & examples
│   └── PLAN.md                          # Comprehensive architectural and execution plan
├── public/                              # Static public assets and favicons
├── scripts/                             # Helper scripts (e.g. post-push automation)
├── src/                                 # Application source code
│   ├── main.js                          # App initialization, routing & background intervals
│   ├── router.js                        # Client-side SPA hash router
│   ├── services/
│   │   ├── todoStore.js                 # LocalStorage CRUD, filters, metrics, backup/restore
│   │   ├── reminderService.js           # Periodic reminder checker & notification engine
│   │   └── audioService.js              # Web Audio API synthesizers (chime & alerts)
│   ├── components/
│   │   ├── navBar.js                    # Top desktop header & bottom mobile tab navigation
│   │   ├── todoCard.js                  # Home view task card component
│   │   ├── filterBar.js                 # Filter pills & search input
│   │   ├── reminderModal.js             # In-app alert popup modal
│   │   └── confirmModal.js              # Confirmation dialog for critical actions
│   ├── views/
│   │   ├── homeView.js                  # Home view (today's tasks, filters, search)
│   │   ├── createView.js                # Task creation form with subtasks & reminders
│   │   ├── statsView.js                 # Daily tasks scheduled vs. completed analytics
│   │   ├── detailView.js                # Full task detail view with subtask checklist
│   │   └── settingsView.js              # Settings view (theme, audio, data management)
│   └── styles/
│       └── index.css                    # Design tokens, themes, glassmorphism, responsive queries
├── AGENTS.md                            # Workspace agent guidelines linking active skills & rules
├── commitlint.config.js                 # Commitlint configuration enforcing convention
├── index.html                           # HTML entry point with meta tags & typography
├── package.json                         # Project dependencies, scripts & metadata
├── README.md                            # Project overview & documentation (this file)
└── vite.config.js                       # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` (bundled with Node.js)

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repo-url>
   cd todo-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To launch the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Building for Production

To bundle optimized, minified production assets into `dist/`:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📝 Git Commit Convention

This project strictly adheres to our custom Git Commit Convention enforced via **Husky** and **Commitlint**:

```
type(scope): [emoji] message header

- body line 1
- body line 2
```

### Core Rules

- **Header**: All lowercase letters, max 50 characters, no trailing full stop (`.`), one space after colon (`:`).
- **Body & Footer**: All lowercase letters, max 72 characters per line, no trailing full stop.
- **Emoji**: Recommended (e.g. `✨` for feat, `🐛` for fix, `♻️` for chore), but optional.
- **Colon Spacing**: Single space after `:` recommended (triggers warning if omitted, non-blocking).

📖 For full tables of types, scopes, and examples, see [`docs/COMMIT_CONVENTION.md`](file:///c:/Users/abhij/Desktop/todo-app/docs/COMMIT_CONVENTION.md).

---

## 📚 Further Documentation

- **[Architectural Plan & Specifications](file:///c:/Users/abhij/Desktop/todo-app/docs/PLAN.md)**: Detailed feature breakdown, data models, and responsive design specs.
- **[Git Commit Convention Guide](file:///c:/Users/abhij/Desktop/todo-app/docs/COMMIT_CONVENTION.md)**: Standardized commit guide for all contributors.
- **[Agent Guidelines & Verification Rules](file:///c:/Users/abhij/Desktop/todo-app/AGENTS.md)**: Autonomous agent verification workflows and skills.
