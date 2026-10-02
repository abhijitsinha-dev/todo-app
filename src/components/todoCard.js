/**
 * Todo Card Component
 *
 * Renders a task card according to design/home-ref(mobile).png:
 * - Top: Task Title
 * - Bottom-left: Priority Badge
 * - Bottom-center: Category Badge
 * - Right: Rounded Square Checkbox / Toggle Button (min 44x44px touch target)
 */

export function renderTodoCard(todo) {
  const isCompleted = Boolean(todo.completed);

  return `
    <article class="todo-card ${isCompleted ? 'completed' : ''}" data-id="${todo.id}">
      <div class="todo-content">
        <h3 class="todo-title">${escapeHtml(todo.title)}</h3>
        <div class="todo-meta">
          <span class="badge priority-badge priority-${todo.priority.toLowerCase()}">
            ${escapeHtml(todo.priority)}
          </span>
          <span class="badge category-badge">
            ${escapeHtml(todo.category)}
          </span>
        </div>
      </div>

      <button
        class="todo-check-btn ${isCompleted ? 'checked' : ''}"
        type="button"
        role="checkbox"
        aria-checked="${isCompleted ? 'true' : 'false'}"
        aria-label="Mark task '${escapeHtml(todo.title)}' as ${isCompleted ? 'incomplete' : 'complete'}"
        data-action="toggle-todo"
        data-id="${todo.id}"
      >
        <span class="checkbox-custom" aria-hidden="true">
          <svg class="check-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
      </button>
    </article>
  `;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
