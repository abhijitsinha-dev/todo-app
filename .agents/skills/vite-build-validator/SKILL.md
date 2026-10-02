---
name: vite-build-validator
description: >-
  Use this skill to execute a clean Vite production build check, detect syntax errors,
  unresolved ES module imports, or bundling issues before running browser verification.
---

# Vite Build Validator Skill

## 1. Ownership & Scope
- **OWNED BY THIS SKILL**:
  - Compiling production assets with `npm run build` using `run_command`.
  - Detecting unresolved module imports, broken paths, circular dependencies, and syntax errors.
  - Validating that bundle assets (`dist/index.html`, `dist/assets/*.js`, `dist/assets/*.css`) are generated.
  - Enforcing a 120-second build timeout.
- **DELEGATED TO OTHER SKILLS**:
  - Runtime DOM and visual layout verification belongs to `ui-browser-verifier`.
  - State logic and storage integrity belongs to `local-storage-auditor`.

---

## 2. Preconditions
Before executing build validation, verify that:
1. `package.json` exists in the workspace root and defines a `build` script.
2. `node_modules` is installed and up to date.

---

## 3. Execution Procedure

### Step 1: Execute Production Build Command
Run the build command using `run_command`:
```powershell
npm run build
```
- **Timeout Guard**: If the build process does not complete within 120 seconds, terminate the command and record `VBV-00: build timeout` as `FAIL`.

### Step 2: Parse and Verify Output
1. Check exit code: Must be `0`.
2. Check stdout for Vite build summary:
   - Confirm `dist/index.html` is emitted.
   - Confirm JS and CSS chunks are generated in `dist/assets/`.
3. Check for fatal errors:
   - Unresolved imports, syntax errors, or Rollup bundling failures trigger `FAIL`.
   - Non-fatal Rollup/Vite informational warnings are logged in the report as non-blocking diagnostics.

---

## 3. Testable Success Criteria

| Check ID | Verification Item | Success Criteria |
| :--- | :--- | :--- |
| **VBV-00** | Execution Timeout | Process finishes in ≤ 120 seconds |
| **VBV-01** | Process Exit Code | Exits with code `0` |
| **VBV-02** | Asset Emission | Generates `dist/index.html` and bundled JS/CSS in `dist/assets/` |
| **VBV-03** | Module Resolution | Zero missing module import errors (e.g. `Failed to resolve import`) |
| **VBV-04** | Syntax & Parsing | Zero syntax errors, unexpected tokens, or unresolved variables |

---

## 4. Failure Branch

If the build command fails (exit code `!= 0` or timeout):
1. **HALT**: Stop immediately. Do NOT launch the browser or propose commits.
2. **ISOLATE**: Parse the compiler error message to extract the exact filename and line number:
   ```
   [vite]: Rollup failed to resolve import "..." from "..."
   ```
3. **REPAIR**: Use `view_file` and `replace_file_content` to fix the broken import or syntax issue.
4. **RE-VALIDATE**: Re-run `npm run build`. Repeat until exit code is `0`.

---

## 5. Required Output Contract

The agent must output a structured build report in this exact format:

```markdown
### 🛠️ Vite Build Validation Report

| Check ID | Item | Result | Output Summary |
| :--- | :--- | :--- | :--- |
| VBV-00 | Execution Timeout (<= 120s) | PASS / FAIL | Finished in <X>s |
| VBV-01 | Exit Code | PASS / FAIL | Code 0 |
| VBV-02 | Asset Emission | PASS / FAIL | Emitted `dist/` bundle |
| VBV-03 | Module Resolution | PASS / FAIL | Zero unresolved imports |
| VBV-04 | Syntax Check | PASS / FAIL | Clean ES module compilation |

- **Bundle Artifacts**: `dist/index.html` (<size>), `dist/assets/*.js` (<size>), `dist/assets/*.css` (<size>)
- **Diagnostics**: Non-fatal warnings logged if present (non-blocking)
- **Overall Status**: [ PASSED | FAILED ]
```
