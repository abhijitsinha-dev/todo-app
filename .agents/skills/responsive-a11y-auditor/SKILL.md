---
name: responsive-a11y-auditor
description: >-
  Use this skill to audit multi-device responsiveness (mobile, tablet, desktop),
  touch target ergonomics (minimum 44x44px), keyboard navigation, and theme color contrast.
---

# Responsive & Accessibility Auditor Skill

This skill ensures that the application provides a smooth, accessible, and ergonomic experience across iPhones, Android devices, iPads, tablets, laptops, and large desktop screens.

## When to Use
- After designing or refactoring responsive layouts, modal dialogs, forms, or navigation bars.
- To verify that mobile touch targets and desktop mouse interactions both function smoothly.

---

## Step-by-Step Procedure

### 1. Viewport Dimension Checks
Verify that CSS layout rules adapt fluidly across three standard breakpoints:
- **Mobile Viewports** (375x667, 390x844, 412x915):
  - Check that the bottom navigation bar is anchored and accessible with single-thumb reach.
  - Verify that `env(safe-area-inset-bottom)` is respected for devices with home indicator bars.
  - Ensure zero horizontal unwanted scroll (`overflow-x: hidden`).
- **Tablet / iPad Viewports** (768x1024, 820x1180):
  - Check two-column dashboard scaling and comfortable form margins.
- **Desktop / Laptop Viewports** (1280x800, 1920x1080):
  - Ensure centered container with maximum width constraint (`max-width: 1080px`).
  - Top header with logo, navigation, and top-right Settings icon.

### 2. Touch Target & Accessibility Audit
- **Touch Targets**:
  - Buttons, checkboxes, navigation items, and interactive chips must be at least `44px × 44px` in hit area on touch devices.
- **Keyboard Navigation**:
  - Verify that `Tab` navigates through inputs, buttons, and links logically.
  - Verify that `Enter` triggers buttons and forms.
  - Verify that `Escape` dismisses open modals (such as the reminder modal or confirmation dialog).
- **Color Contrast & Readability**:
  - In both Dark and Light themes, text against backgrounds must meet readable contrast.
  - Priority colors (Low emerald, Medium amber, High rose) must remain distinct and legible.
