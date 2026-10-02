---
name: vite-build-validator
description: >-
  Use this skill to execute a clean Vite production build, detect syntax errors,
  unresolved ES module imports, or bundling issues during pre-commit verification.
---

# Vite Build Validator Skill

## 1. Ownership & Scope

- **OWNS**:
  - Compiling production assets with `npm run build`.
  - Detecting unresolved imports, broken paths, circular deps, syntax errors.
  - Validating `dist/index.html` + `dist/assets/*.{js,css}` are emitted.
  - Enforcing a 120s build timeout.
- **DELEGATED**: Runtime DOM/layout → `ui-browser-verifier`. Storage → `local-storage-auditor`.

---

## 2. Preconditions

1. `package.json` exists with a `build` script.
2. `node_modules` installed and current.

---

## 3. Execution Procedure

### Step 1: Run Build

```powershell
npm run build
```

- **Timeout guard**: if it does not complete within 120s, terminate and record `VBV-00 FAIL`.

### Step 2: Verify Output

1. Exit code must be `0`.
2. Confirm `dist/index.html` and `dist/assets/*.{js,css}` emitted.
3. Fatal errors (unresolved imports, syntax, Rollup failures) → `FAIL`.
   Non-fatal Rollup/Vite warnings → logged as non-blocking diagnostics.

---

## 4. Testable Success Criteria

| Check ID   | Item              | Success Criteria                            |
| :--------- | :---------------- | :------------------------------------------ |
| **VBV-00** | Execution timeout | ≤ 120s                                      |
| **VBV-01** | Exit code         | `0`                                         |
| **VBV-02** | Asset emission    | `dist/index.html` + `dist/assets/*` present |
| **VBV-03** | Module resolution | Zero `Failed to resolve import` errors      |
| **VBV-04** | Syntax & parsing  | Zero syntax errors or unresolved variables  |

---

## 5. Failure Branch

1. **HALT** — no browser, no commit proposal.
2. **ISOLATE** — parse compiler error for filename + line:
   ```
   [vite]: Rollup failed to resolve import "..." from "..."
   ```
3. **REPAIR** — fix via `view_file` + `replace_file_content`.
4. **RE-VALIDATE** — rerun until exit `0`.

---

## 6. Required Output Contract

```markdown
### 🛠️ Vite Build Validation Report

| Check ID | Item              | Result      | Output Summary              |
| :------- | :---------------- | :---------- | :-------------------------- |
| VBV-00   | Timeout (<= 120s) | PASS / FAIL | Finished in <X>s            |
| VBV-01   | Exit Code         | PASS / FAIL | Code 0                      |
| VBV-02   | Asset Emission    | PASS / FAIL | Emitted `dist/` bundle      |
| VBV-03   | Module Resolution | PASS / FAIL | Zero unresolved imports     |
| VBV-04   | Syntax Check      | PASS / FAIL | Clean ES module compilation |

- **Bundle Artifacts**: `dist/index.html` (<size>), `dist/assets/*.js` (<size>), `dist/assets/*.css` (<size>)
- **Diagnostics**: Non-fatal warnings logged if present
- **Overall**: [ PASSED | FAILED ]
```
