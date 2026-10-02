---
name: local-storage-auditor
description: >-
  Use this skill to audit LocalStorage state management, schema integrity, JSON backup
  import/export reliability, corrupted data recovery, and edge case handling.
---

# LocalStorage & State Auditor Skill

## 1. Ownership & Scope
- **OWNED BY THIS SKILL**:
  - Direct static code inspection of `src/services/todoStore.js`.
  - Headless automated stress testing via `scripts/auditStorage.js`.
  - Schema integrity, corrupted key recovery, serialization fallbacks, and boundary dates.
- **DELEGATED TO `ui-browser-verifier`**:
  - End-to-end browser interactions (e.g. clicking the "Import Backup" button in Settings, file picker dialog, rendering toast messages).

---

## 2. Preconditions
Before running this skill, verify that:
1. `scripts/auditStorage.js` exists in the repository.
2. It exits with code `0` on all-pass and code `1` on any-fail.
3. It emits a JSON array on stdout with the shape:
   ```json
   [
     {
       "id": "LSA-01",
       "name": "Check Name",
       "target": "functionOrKey",
       "pass": true,
       "details": "Diagnostic string"
     }
   ]
   ```

---

## 3. Execution Procedure

### Step 1: Static Code Inspection
Use `view_file` on `src/services/todoStore.js` and verify:
1. Every `localStorage.getItem(...)` call is enclosed in a `try { ... } catch (e) { ... }` block.
2. Todos fallback returns an empty array `[]` when storage is empty, null, or corrupted.
3. Settings fallback returns the exact default:
   ```javascript
   {
     theme: 'dark',
     soundEnabled: true,
     notificationsEnabled: false,
     defaultReminderOffset: '0'
   }
   ```
4. `importData(raw)` validates JSON structure and schema fields before modifying storage, returning `{ success: false, error: string }` on failure rather than throwing uncaught exceptions.

### Step 2: Automated Headless Stress Test
Run the audit script using `run_command`:
```powershell
node scripts/auditStorage.js
```

---

## 4. Testable Success Criteria

| Check ID | Assertion | Expected Behavior |
| :--- | :--- | :--- |
| **LSA-01** | `todoStore.getAllTodos()` on empty storage | Returns empty array `[]` |
| **LSA-02** | `todoStore.getAllTodos()` on corrupted JSON | Catches error, issues `console.warn`, returns `[]`, does not throw |
| **LSA-03** | `todoStore.getSettings()` on initial run | Returns exact object `{ theme: 'dark', soundEnabled: true, notificationsEnabled: false, defaultReminderOffset: '0' }` |
| **LSA-04** | `todoStore.exportData()` | Outputs valid JSON string containing `version` and `todos` array with `length >= 1` |
| **LSA-05** | `todoStore.importData("invalid json")` | Returns `{ success: false, error: '...' }` without throwing |

---

## 5. Failure Branch

If any check fails (exit code `1` or static check fails):
1. **HALT**: Stop immediately. Do not proceed to UI verification or commit proposals.
2. **DIAGNOSE**: Parse the JSON stdout from `scripts/auditStorage.js` to identify the failing `id` and `details`.
3. **REMEDIATE**: Modify `src/services/todoStore.js` to address the missing fallback or error catch.
4. **RE-RUN**: Execute `node scripts/auditStorage.js` until all checks pass with exit code `0`.

---

## 6. Required Output Contract

The agent must output a structured audit report in this exact format:

```markdown
### 🗄️ LocalStorage & Schema Audit Report

| Check ID | Verification Item | Target | Result | Details |
| :--- | :--- | :--- | :--- | :--- |
| LSA-01 | Default Empty Fallback | `getAllTodos()` | PASS / FAIL | <diagnostic note> |
| LSA-02 | Corrupted JSON Recovery | `localStorage['todo_app_todos']` | PASS / FAIL | <diagnostic note> |
| LSA-03 | Settings Default Schema | `getSettings()` | PASS / FAIL | <diagnostic note> |
| LSA-04 | Export Schema Integrity | `exportData()` | PASS / FAIL | <diagnostic note> |
| LSA-05 | Malformed Import Rejection | `importData(invalidString)` | PASS / FAIL | <diagnostic note> |

**Overall Status**: [ PASSED (5/5) | FAILED (X/5) ]
```
