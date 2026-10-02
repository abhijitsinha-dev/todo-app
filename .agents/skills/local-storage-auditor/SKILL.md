---
name: local-storage-auditor
description: >-
  Use this skill to audit LocalStorage state management, schema integrity, JSON backup
  import/export reliability, corrupted data recovery, and edge case handling.
---

# LocalStorage & State Auditor Skill

This skill ensures that client-side data persistence is robust, prevents data corruption, handles schema migrations gracefully, and verifies backup export/import functionality.

## When to Use
- After updating the todo data model, settings schema, or storage service methods.
- To test edge cases: empty initial state, corrupted storage strings, malformed imported JSON, and date boundary conditions.

---

## Step-by-Step Procedure

### 1. Schema Integrity & Default Fallbacks
Check that `todoStore.js` implements defensive defaults:
- If `localStorage.getItem('todo_app_todos')` is null or empty, it initializes to an empty array `[]` (or sample onboarding items on first run).
- If JSON parsing fails (`JSON.parse` exception), catch the error gracefully, back up the raw string if possible, and fallback to empty state rather than crashing the application.
- Verify settings schema defaults:
  ```javascript
  {
    theme: 'dark', // or 'light'
    soundEnabled: true,
    notificationsEnabled: false,
    defaultReminderOffset: '0'
  }
  ```

### 2. Export & Import Integrity Verification
- **Export**:
  - Test JSON export generation.
  - Verify exported JSON contains full metadata: timestamp, todos list, subtasks, and user settings.
- **Import**:
  - Test importing valid backup files: verify items merge or restore cleanly.
  - Test importing malformed or partial JSON: ensure an informative error alert is shown and existing data is not corrupted.

### 3. Edge Cases & Boundary Auditing
- Verify handling of tasks scheduled across midnight or future months.
- Verify that toggling completion accurately sets `completedAt` timestamp to ensure daily stats calculations remain mathematically precise.
- Verify subtask toggle logic preserves parent task timestamps and state.
