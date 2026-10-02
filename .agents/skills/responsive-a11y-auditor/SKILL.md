---
name: responsive-a11y-auditor
description: >-
  Use this skill to audit multi-device responsiveness, touch target ergonomics
  (min 44x44px), keyboard navigation, and theme color contrast.
---

# Responsive & Accessibility Auditor Skill

## 1. Ownership & Scope

- **OWNS**:
  - CSS rule auditing in `src/styles/index.css` (breakpoints `<=640`, `641–1024`, `1025+`).
  - Static verification of touch target rules (`min-height/min-width: 44px`).
  - Keyboard accessibility (focus rings, Escape listeners).
  - Safe-area-inset support (`env(safe-area-inset-bottom)`).
  - WCAG contrast calculation for theme tokens.
- **DELEGATED**: Runtime rendering + screenshots → `ui-browser-verifier`.

---

## 2. Preconditions

1. `src/styles/index.css` exists.
2. `src/components/reminderModal.js` and `src/components/confirmModal.js` exist.

---

## 3. Execution Procedure

### Step 1: Static CSS Inspection

Inspect `src/styles/index.css`:

1. **A11Y-02 Touch targets** — `.btn`, `.tab-item`, `.form-input`, `.checkbox-custom` have `min-height/min-width: 44px` (or padding ≥ 12px with matching `line-height`).
2. **A11Y-01 Breakpoints** — `@media (max-width: 640px)` contains single-column stacking + mobile bottom nav.
3. **A11Y-03 Safe-area** — bottom nav defines `padding-bottom: calc(0.5rem + env(safe-area-inset-bottom, 0px))`.
4. **A11Y-04 Focus rings** — `:focus-visible` defines a visible outline/ring.
5. **A11Y-06 Contrast** — extract `--text-primary` and `--bg-card` for both themes; compute `(L1 + 0.05) / (L2 + 0.05)`; require ≥ 4.5:1.

### Step 2: Component Keyboard Check

Inspect both modal components: `keydown` listener checks for `e.key === 'Escape'`.

---

## 4. Testable Success Criteria

| Check ID    | Item               | Target                      | Success Criteria                                            |
| :---------- | :----------------- | :-------------------------- | :---------------------------------------------------------- |
| **A11Y-01** | Mobile breakpoint  | `src/styles/index.css`      | `@media (max-width: 640px)` present with cards + bottom nav |
| **A11Y-02** | Touch target rules | `.btn`, `.tab-item`, inputs | `min-height`/`min-width: 44px` present                      |
| **A11Y-03** | Safe-area padding  | Mobile nav                  | Uses `env(safe-area-inset-bottom)`                          |
| **A11Y-04** | Focus ring         | Interactive elements        | `:focus-visible` outline defined                            |
| **A11Y-05** | Escape dismiss     | Modal components            | `keydown` → `Escape` handled                                |
| **A11Y-06** | Theme contrast     | CSS tokens                  | `--text-primary` vs `--bg-card` ≥ 4.5:1                     |

---

## 5. Failure Branch

1. **HALT** — no commit proposal.
2. **IDENTIFY** — locate missing rule (min-height, contrast, `:focus-visible`).
3. **REPAIR** — update `src/styles/index.css` or component.
4. **RE-VERIFY** — re-read with `view_file`.

---

## 6. Required Output Contract

```markdown
### 📱 Responsive & Accessibility Audit Report

| Check ID | Item                      | Target                 | Result      | Details                   |
| :------- | :------------------------ | :--------------------- | :---------- | :------------------------ |
| A11Y-01  | Mobile Breakpoint (640px) | `src/styles/index.css` | PASS / FAIL |                           |
| A11Y-02  | Touch Targets (>= 44px)   | Buttons / Nav          | PASS / FAIL |                           |
| A11Y-03  | Safe-Area Support         | Bottom Nav             | PASS / FAIL |                           |
| A11Y-04  | Focus Visibility          | `:focus-visible`       | PASS / FAIL |                           |
| A11Y-05  | Escape Dismiss            | Modals                 | PASS / FAIL |                           |
| A11Y-06  | WCAG Contrast (>= 4.5:1)  | Theme tokens           | PASS / FAIL | Dark: X.X:1, Light: Y.Y:1 |

**Overall**: [ PASSED (6/6) | FAILED (X/6) ]
```
