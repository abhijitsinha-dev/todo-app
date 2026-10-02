# Directory & File Structure

This document is the **single source of truth** for the codebase organization, directory hierarchy, and file responsibilities in the Todo App repository.

---

## Complete Repository Tree

```
todo-app/
├── .agents/                               # Agent automation skills and rules
│   ├── rules/
│   │   ├── 01-commit-approval.md          # Core invariant: never commit autonomously
│   │   ├── 02-commit-convention.md        # Requires conformance to docs/COMMIT_CONVENTION.md
│   │   ├── 03-execution-pipeline.md       # Ordered 6-step pipeline with strict HALT semantics
│   │   ├── 04-ui-completion-gate.md       # Prohibits declaring UI done until verified
│   │   ├── 05-strict-instruction-scope.md # Invariant: perform only explicitly requested actions
│   │   ├── 06-doc-sync.md                 # Reconciles docs/STRUCTURE.md, README, and PLAN
│   │   └── 07-path-convention.md          # Prohibits absolute filesystem paths in all files
│   └── skills/
│       ├── commit-proposer/               # Inspects diffs, proposes messages, awaits approval
│       ├── doc-sync/                      # Reconciles docs/STRUCTURE.md, README, and PLAN
│       ├── local-storage-auditor/         # Schema validation & backup integrity checks
│       ├── responsive-a11y-auditor/       # Touch target (>=44px) & accessibility checks
│       ├── ui-browser-verifier/           # Multi-device browser verification workflow
│       └── vite-build-validator/          # Pre-commit build compilation validator
├── .github/                               # GitHub configuration & CI/CD workflows
│   └── workflows/
│       └── deploy.yml                     # Automated GitHub Pages build & deployment
├── .husky/                                # Git lifecycle hooks
│   ├── commit-msg                         # Validates commit format via commitlint
│   ├── post-commit                        # Logs commit confirmation
│   ├── pre-commit                         # Runs lint-staged and vite build before commit
│   └── pre-push                           # Runs format:check, lint, and build before push
├── .vscode/                               # Workspace editor settings & extensions
│   ├── extensions.json                    # Recommended workspace extensions (Prettier, ESLint)
│   └── settings.json                      # Workspace editor formatting & linting defaults
├── design/                                # Design wireframes and reference assets
│   ├── header-footer-ref.png              # Mobile-first header and footer wireframe
│   └── home-ref(mobile).png               # Mobile-first home view and card wireframe
├── docs/                                  # Project documentation
│   ├── COMMIT_CONVENTION.md               # Git commit convention guidelines & examples
│   ├── PLAN.md                            # Comprehensive architectural and execution plan
│   └── STRUCTURE.md                       # Canonical directory structure & file inventory (this file)
├── public/                                # Static public assets and favicons
├── scripts/                               # Node automation & audit scripts
│   ├── auditStorage.js                    # Headless storage schema & resilience test script
│   └── postPush.js                        # Post-push notification script
├── src/                                   # Application source code
│   ├── main.js                            # App initialization, routing & background intervals
│   ├── router.js                          # Client-side SPA hash router
│   ├── services/
│   │   ├── todoStore.js                   # LocalStorage CRUD, filters, metrics, backup/restore
│   │   ├── reminderService.js             # Periodic reminder checker & notification engine
│   │   └── audioService.js                # Web Audio API synthesizers (chime & alerts)
│   ├── components/
│   │   ├── navBar.js                      # Top desktop header & bottom mobile tab navigation
│   │   ├── todoCard.js                    # Home view task card component
│   │   ├── filterBar.js                   # Filter pills & search input
│   │   ├── reminderModal.js               # In-app alert popup modal
│   │   └── confirmModal.js                # Confirmation dialog for critical actions
│   ├── views/
│   │   ├── homeView.js                    # Home view (today's tasks, filters, search)
│   │   ├── createView.js                  # Task creation form with subtasks & reminders
│   │   ├── statsView.js                   # Daily tasks scheduled vs. completed analytics
│   │   ├── detailView.js                  # Full task detail view with subtask checklist
│   │   └── settingsView.js                # Settings view (theme, audio, data management)
│   └── styles/
│       └── index.css                      # Design tokens, themes, glassmorphism, responsive queries
├── .editorconfig                          # Cross-editor formatting consistency (LF, 2 spaces)
├── .gitattributes                         # Git line ending normalization (LF) & binary handling
├── .gitignore                             # Git ignore rules for dependencies, caches & build artifacts
├── .node-version                          # Target Node.js runtime specification
├── .npmrc                                 # Strict engine enforcement configuration
├── .prettierignore                        # Files excluded from Prettier formatting
├── .prettierrc                            # Prettier code formatting rules
├── AGENTS.md                              # Workspace root agent guidelines linking active skills & rules
├── commitlint.config.js                   # Commitlint configuration enforcing convention
├── eslint.config.js                       # ESLint flat configuration (ES2025+, browser & Node)
├── index.html                             # HTML entry point with meta tags & typography
├── package.json                           # Project dependencies, scripts & metadata
├── README.md                              # Project overview & documentation
└── vite.config.js                         # Vite build configuration
```

---

## Architectural Breakdown by Layer

### 1. Agent Automation (`.agents/`)

- **`rules/`**: Always-on constraints that govern commit approvals, commit conventions, pipeline gates, UI completion verification, strict scope execution, and documentation synchronization.
- **`skills/`**: Specialized on-demand playbooks for diff inspection, build compilation, storage auditing, accessibility checks, multi-device browser verification, and doc reconciliation.

### 2. CI/CD & Git Lifecycle (`.github/` & `.husky/`)

- **`.github/workflows/deploy.yml`**: GitHub Actions workflow deploying production bundles to GitHub Pages on pushes to `master`.
- **`.husky/`**: Local git hooks executing Commitlint validation (`commit-msg`), staged formatting & build pre-checks (`pre-commit`), full test & lint gates (`pre-push`), and commit notifications (`post-commit`).

### 3. Editor & Tooling Configuration

- **`.editorconfig`**: Guarantees LF line endings, 2-space indentation, and UTF-8 encoding across all text editors.
- **`.prettierrc` / `.prettierignore`**: Automated code formatting configuration.
- **`eslint.config.js`**: ESLint flat config enforcing modern ES2025+ standards across browser runtime and Node scripting contexts.
- **`.node-version` & `.npmrc`**: Locks the Node.js runtime to version 24+ and enforces strict engine compliance.

### 4. Application Source Code (`src/`)

- **`main.js`**: Application entry point, initializes the SPA router, registers event listeners, and mounts root views.
- **`router.js`**: Lightweight client-side hash router supporting dynamic route parameters (`#/todo/:id`).
- **`services/`**: Pure JavaScript modules for storage (`todoStore.js`), reminder intervals (`reminderService.js`), and Web Audio synthesis (`audioService.js`).
- **`components/`**: Reusable Vanilla JS UI components (navigation bars, cards, filter pills, dialog modals).
- **`views/`**: Dedicated full-page view controllers (Home, Create, Stats, Detail, Settings).
- **`styles/index.css`**: Centralized design system defining CSS custom properties, responsive breakpoints, dark/light themes, and glassmorphism tokens.
