---
name: vite-build-validator
description: >-
  Use this skill to execute a clean Vite production build check, detect syntax errors,
  unresolved ES module imports, or bundling issues before running browser verification.
---

# Vite Build Validator Skill

This skill ensures that all JavaScript modules, imports, assets, and configurations compile cleanly without syntax errors or broken dependencies.

## When to Use
- Before launching the browser subagent or after modifying JavaScript/CSS code.
- To detect missing export/import declarations, broken module paths, or syntax issues early.

---

## Step-by-Step Procedure

### 1. Execute Build Verification
Run the build command within the project workspace using `run_command`:
```powershell
npm run build
```

### 2. Analyze Output
- **Success Criteria**:
  - The command exits with code `0`.
  - Vite generates production assets in the `dist/` folder.
  - Zero warnings or errors regarding unresolved imports, undefined variables, or invalid CSS.
- **Failure Resolution**:
  - If import errors are flagged, verify relative paths (e.g. `./services/todoStore.js` vs `../services/todoStore.js`).
  - If syntax errors occur, inspect the referenced line and resolve syntax issues.

### 3. Verification Reporting
Confirm that production compilation completed successfully prior to proceeding with browser runtime testing.
