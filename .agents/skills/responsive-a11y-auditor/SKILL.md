---
name: responsive-a11y-auditor
description: >-
  Use this skill to audit multi-device responsiveness (mobile, tablet, desktop),
  touch target ergonomics (minimum 44x44px), keyboard navigation, and theme color contrast.
---

# Responsive & Accessibility Auditor Skill

## 1. Ownership & Scope
- **OWNED BY THIS SKILL**:
  - CSS rule auditing in `src/styles/index.css` for responsive breakpoints (`<= 640px`, `641px - 1024px`, `1025px+`).
  - Static CSS verification of mobile touch target standards (`min-height: 44px; min-width: 44px`).
  - Keyboard accessibility handling (`Tab` focus rings, `Escape` key listeners on modals).
  - Safe-area-inset support for mobile devices (`env(safe-area-inset-bottom)`).
  - WCAG color contrast calculation for CSS theme tokens.
- **DELEGATED TO `ui-browser-verifier`**:
  - Live runtime rendering and screenshot inspection across viewports.

---

## 2. Preconditions
Before executing this audit, verify that:
1. `src/styles/index.css` exists in the repository.
2. Modal component files (`src/components/reminderModal.js`, `src/components/confirmModal.js`) exist.

---

## 3. Execution Procedure

### Step 1: Static CSS Token & Rule Inspection
Use `view_file` on `src/styles/index.css`:
1. **Touch Targets (A11Y-02)**: Verify that interactive classes (`.btn`, `.tab-item`, `.form-input`, `.checkbox-custom`) include `min-height: 44px` or `min-width: 44px` (or equivalent vertical padding ≥ 12px with `line-height`).
2. **Breakpoints (A11Y-01)**: Verify the presence of `@media (max-width: 640px)` containing single-column card stacking and mobile bottom navigation styling.
3. **Safe-Area Insets (A11Y-03)**: Verify the mobile bottom navigation bar defines `padding-bottom: calc(0.5rem + env(safe-area-inset-bottom, 0px))`.
4. **Focus Rings (A11Y-04)**: Verify `:focus-visible` defines a visible outline/ring (e.g. `outline: 2px solid ...`) for keyboard navigation.
5. **Color Contrast (A11Y-06)**: Extract the color tokens for `--text-primary` and `--bg-card` for both Dark and Light themes. Calculate WCAG contrast ratio (formula: (L1 + 0.05) / (L2 + 0.05)); require ≥ 4.5:1.

### Step 2: Component Keyboard Event Inspection
Use `view_file` on `src/components/reminderModal.js` and `src/components/confirmModal.js`:
- Confirm an event listener on `keydown` checks for `e.key === 'Escape'` to dismiss open modals.

---

## 3. Testable Success Criteria

| Check ID | Verification Item | Target | Success Criteria |
| :--- | :--- | :--- | :--- |
| **A11Y-01** | Mobile Breakpoint Rules | `src/styles/index.css` | Contains `@media (max-width: 640px)` with full-width cards & bottom nav |
| **A11Y-02** | Touch Target Rules | `.btn`, `.tab-item`, inputs | `min-height: 44px` or `min-width: 44px` rule explicitly present |
| **A11Y-03** | iOS Safe-Area Padding | Mobile Nav container | Uses `env(safe-area-inset-bottom)` |
| **A11Y-04** | Keyboard Focus Ring | Interactive elements | `:focus-visible` defines visible outline/ring |
| **A11Y-05** | Modal Escape Dismiss | Modal components | Listens to `keydown` for `Escape` key |
| **A11Y-06** | WCAG Theme Contrast | CSS theme tokens | Calculated contrast between `--text-primary` and `--bg-card` is ≥ 4.5:1 |

---

## 4. Failure Branch

If any accessibility or responsive check fails:
1. **HALT**: Do not proceed to commit proposals.
2. **IDENTIFY**: Locate the missing rule (e.g. missing `min-height: 44px`, failing contrast ratio, or missing `:focus-visible`).
3. **REPAIR**: Update `src/styles/index.css` or component files using `replace_file_content`.
4. **RE-VERIFY**: Re-read the file with `view_file` to confirm the fix is in place.

---

## 5. Required Output Contract

The agent must output a structured accessibility and responsiveness report in this exact format:

```markdown
### 📱 Responsive & Accessibility Audit Report

| Check ID | Item | Target File | Result | Details |
| :--- | :--- | :--- | :--- | :--- |
| A11Y-01 | Mobile Breakpoint (640px) | `src/styles/index.css` | PASS / FAIL | Responsive rules verified |
| A11Y-02 | Touch Target Rules (>= 44px) | Buttons / Nav items | PASS / FAIL | `min-height: 44px` rule present |
| A11Y-03 | Safe-Area-Inset Support | Bottom Navigation Bar | PASS / FAIL | `safe-area-inset-bottom` applied |
| A11Y-04 | Keyboard Focus Visibility | `:focus-visible` | PASS / FAIL | Visible outline styled |
| A11Y-05 | Modal Escape Key Dismiss | Modal components | PASS / FAIL | Keydown listener active |
| A11Y-06 | WCAG Contrast Ratio (>= 4.5:1) | CSS theme tokens | PASS / FAIL | Dark: X.X:1, Light: Y.Y:1 |

**Overall Status**: [ PASSED (6/6) | FAILED (X/6) ]
```
