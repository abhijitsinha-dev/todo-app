/**
 * Headless Storage & Schema Audit Runner
 * Validates todoStore logic, schema integrity, JSON export/import and corrupted data resilience.
 */

// Simple in-memory localStorage polyfill for Node.js testing
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

globalThis.localStorage = new MockLocalStorage();

async function runAudit() {
  const results = [];
  let todoStore;

  try {
    const module = await import('../src/services/todoStore.js');
    todoStore = module.todoStore || module.default || module;
  } catch (err) {
    console.log(JSON.stringify({
      status: 'CRITICAL_ERROR',
      message: 'Could not load src/services/todoStore.js: ' + err.message
    }, null, 2));
    process.exit(1);
  }

  // Check LSA-01: Default empty fallback
  try {
    localStorage.clear();
    const todos = todoStore.getAllTodos();
    const isArray = Array.isArray(todos);
    results.push({
      id: 'LSA-01',
      name: 'Default Empty Fallback',
      target: 'getAllTodos() with empty localStorage',
      pass: isArray && todos.length === 0,
      details: isArray ? 'Returned empty array fallback []' : 'Failed to return array'
    });
  } catch (e) {
    results.push({ id: 'LSA-01', name: 'Default Empty Fallback', target: 'getAllTodos()', pass: false, details: e.message });
  }

  // Check LSA-02: Corrupted JSON recovery
  try {
    localStorage.setItem('todo_app_todos', '{ corrupted json: not valid ]');
    const todos = todoStore.getAllTodos();
    const recovered = Array.isArray(todos);
    results.push({
      id: 'LSA-02',
      name: 'Corrupted JSON Recovery',
      target: 'localStorage["todo_app_todos"]',
      pass: recovered,
      details: recovered ? 'Caught JSON error without throwing and fell back safely' : 'Threw exception or invalid type'
    });
  } catch (e) {
    results.push({ id: 'LSA-02', name: 'Corrupted JSON Recovery', target: 'getAllTodos()', pass: false, details: 'Threw exception: ' + e.message });
  }

  // Check LSA-03: Settings Default Schema
  try {
    localStorage.clear();
    const settings = todoStore.getSettings ? todoStore.getSettings() : null;
    const isExactDefault = settings &&
      settings.theme === 'dark' &&
      settings.soundEnabled === true &&
      settings.notificationsEnabled === false &&
      settings.defaultReminderOffset === '0';
    results.push({
      id: 'LSA-03',
      name: 'Settings Default Schema',
      target: 'getSettings()',
      pass: !!isExactDefault,
      details: isExactDefault
        ? 'Settings matches exact default { theme: "dark", soundEnabled: true, notificationsEnabled: false, defaultReminderOffset: "0" }'
        : 'Settings object did not match exact default schema: ' + JSON.stringify(settings)
    });
  } catch (e) {
    results.push({ id: 'LSA-03', name: 'Settings Default Schema', target: 'getSettings()', pass: false, details: e.message });
  }

  // Check LSA-04: Export Schema Integrity
  try {
    localStorage.clear();
    if (todoStore.addTodo) {
      todoStore.addTodo({
        title: 'Audit Test Todo',
        priority: 'high',
        targetDate: '2026-10-02',
        dueDateTime: '2026-10-02T18:00',
        category: 'Work'
      });
    }
    const exportedRaw = todoStore.exportData ? todoStore.exportData() : null;
    const parsed = typeof exportedRaw === 'string' ? JSON.parse(exportedRaw) : exportedRaw;
    const validExport = parsed && Array.isArray(parsed.todos) && parsed.version;
    results.push({
      id: 'LSA-04',
      name: 'Export Schema Integrity',
      target: 'exportData()',
      pass: !!validExport,
      details: validExport ? `Export includes version ${parsed.version} and todos array (${parsed.todos.length} items)` : 'Missing version or todos array'
    });
  } catch (e) {
    results.push({ id: 'LSA-04', name: 'Export Schema Integrity', target: 'exportData()', pass: false, details: e.message });
  }

  // Check LSA-05: Malformed Import Rejection
  try {
    const importRes = todoStore.importData ? todoStore.importData('not valid json payload') : null;
    const rejectedSafely = importRes && importRes.success === false;
    results.push({
      id: 'LSA-05',
      name: 'Malformed Import Rejection',
      target: 'importData(invalidString)',
      pass: !!rejectedSafely,
      details: rejectedSafely ? 'Cleanly returned { success: false } with error message' : 'Failed to reject invalid JSON properly'
    });
  } catch (e) {
    results.push({ id: 'LSA-05', name: 'Malformed Import Rejection', target: 'importData()', pass: false, details: 'Unhandled exception thrown: ' + e.message });
  }

  console.log(JSON.stringify(results, null, 2));
  const allPass = results.every(r => r.pass);
  process.exit(allPass ? 0 : 1);
}

runAudit();
