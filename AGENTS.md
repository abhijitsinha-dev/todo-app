# Workspace Guidelines for Todo App

This project follows an autonomous, quality-first workflow.

## Active Rules
- **UI Verification Workflow**: Refer to [.agents/rules/ui-verification-workflow.md](file:///.agents/rules/ui-verification-workflow.md).
  - Every UI or logic modification must pass `vite-build-validator` (`npm run build`) and be visually verified using `ui-browser-verifier` across mobile, tablet, and desktop viewports.
  - Zero console errors permitted.

## Active Skills in `.agents/skills/`
1. [`ui-browser-verifier`](file:///.agents/skills/ui-browser-verifier/SKILL.md): Launches browser subagent to verify visual rendering across viewports, interactive flows, console logs, and design fidelity.
2. [`vite-build-validator`](file:///.agents/skills/vite-build-validator/SKILL.md): Pre-flight check running `npm run build` to catch bundling or import errors.
3. [`responsive-a11y-auditor`](file:///.agents/skills/responsive-a11y-auditor/SKILL.md): Audits touch targets (>= 44x44px), keyboard navigation, and theme color contrast.
4. [`local-storage-auditor`](file:///.agents/skills/local-storage-auditor/SKILL.md): Audits LocalStorage schema, JSON import/export, and corrupted data recovery.
