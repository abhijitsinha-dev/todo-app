---
name: local-storage-auditor
description: >-
  Use this skill to audit LocalStorage state management, schema integrity, JSON backup
  import/export reliability, corrupted data recovery, and edge case handling.
---

# LocalStorage & State Auditor Skill

## 1. Ownership & Scope

- **OWNS**:
  - Static inspection of `src/services/todoStore.js`.
  - Headless stress testing via `scripts/auditStorage.js`.
  - Schema integrity, corrupted-key recovery, serialization fallbacks, boundary dates.
- **DELEGATED**: Browser interactions (import button, file picker, toasts) → `ui-browser-verifier`.

---

## 2. Preconditions

1. `scripts/auditStorage.js` exists.
2. It exits `0` on all-pass, `1` on any-fail.
3. It emits a JSON array on stdout:
   ```json
   [{ "id": "LSA-01", "name": "...", "target": "...", "pass": true, "details": "..." }]
   ```

---

## 3. Execution Procedure

### Step 1: Static Inspection

Inspect `src/services/todoStore.js`:

1. Every `localStorage.getItem(...)` wrapped in `try/catch`.
2. Todos fallback → `[]` on empty, null, or corrupted.
3. Settings fallback → exact default:
   ```javascript
   { theme: 'dark', soundEnabled: true, notificationsEnabled: false, defaultReminderOffset: '0' }
   ```
4. `importData(raw)` validates JSON/schema, returns `{ success: false, error }` on failure — never throws.

### Step 2: Headless Stress Test

```powershell
node scripts/auditStorage.js
```

---

## 4. Testable Success Criteria

| Check ID   | Assertion                         | Expected                                          |
| :--------- | :-------------------------------- | :------------------------------------------------ |
| **LSA-01** | `getAllTodos()` on empty storage  | Returns `[]`                                      |
| **LSA-02** | `getAllTodos()` on corrupted JSON | `console.warn`, returns `[]`, no throw            |
| **LSA-03** | `getSettings()` on first run      | Exact default object                              |
| **LSA-04** | `exportData()`                    | Valid JSON with `version` and `todos.length >= 1` |
| **LSA-05** | `importData("invalid json")`      | `{ success: false, error }`, no throw             |

---

## 5. Failure Branch

1. **HALT** — no UI verification, no commit proposal.
2. **DIAGNOSE** — parse JSON stdout for failing `id` + `details`.
3. **REMEDIATE** — fix `todoStore.js`.
4. **RE-RUN** — until exit `0`.

---

## 6. Required Output Contract

```markdown
### 🗄️ LocalStorage & Schema Audit Report

| Check ID | Item                       | Target                           | Result      | Details |
| :------- | :------------------------- | :------------------------------- | :---------- | :------ |
| LSA-01   | Default Empty Fallback     | `getAllTodos()`                  | PASS / FAIL |         |
| LSA-02   | Corrupted JSON Recovery    | `localStorage['todo_app_todos']` | PASS / FAIL |         |
| LSA-03   | Settings Default Schema    | `getSettings()`                  | PASS / FAIL |         |
| LSA-04   | Export Schema Integrity    | `exportData()`                   | PASS / FAIL |         |
| LSA-05   | Malformed Import Rejection | `importData(invalidString)`      | PASS / FAIL |         |

**Overall**: [ PASSED (5/5) | FAILED (X/5) ]
```
