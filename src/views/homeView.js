/**
 * Home View Component
 *
 * Implements the Home screen matching design/home-ref(mobile).png:
 * - Filter pills: Today, Upcoming, Completed
 * - Todo card list with demo data and interactive completion toggles
 * - Seamless search integration with header search bar
 */

import { renderTodoCard } from '../components/todoCard.js';
import { renderFilterBar } from '../components/filterBar.js';

export const initialDemoTodos = [
  {
    id: 'todo_1',
    title: 'Submit quarterly financial report',
    priority: 'high',
    category: 'Work',
    schedule: 'today',
    completed: false
  },
  {
    id: 'todo_2',
    title: 'Morning gym workout & cardio session',
    priority: 'medium',
    category: 'Health',
    schedule: 'today',
    completed: false
  },
  {
    id: 'todo_3',
    title: 'Review pull request #42 and team feedback',
    priority: 'high',
    category: 'Work',
    schedule: 'today',
    completed: true
  },
  {
    id: 'todo_4',
    title: 'Buy fresh groceries for weekly meal prep',
    priority: 'low',
    category: 'Personal',
    schedule: 'upcoming',
    completed: false
  },
  {
    id: 'todo_5',
    title: 'Pay monthly electricity and internet bill',
    priority: 'medium',
    category: 'Finance',
    schedule: 'today',
    completed: false
  },
  {
    id: 'todo_6',
    title: 'Prepare product presentation slides for client',
    priority: 'high',
    category: 'Work',
    schedule: 'upcoming',
    completed: false
  },
  {
    id: 'todo_7',
    title: 'Annual dental checkup & cleaning appointment',
    priority: 'low',
    category: 'Health',
    schedule: 'past',
    completed: true
  },
  {
    id: 'todo_8',
    title: 'Sync with design team on mobile UI tokens',
    priority: 'medium',
    category: 'Work',
    schedule: 'today',
    completed: false
  },
  {
    id: 'todo_9',
    title: 'Pick up package from parcel locker',
    priority: 'low',
    category: 'Personal',
    schedule: 'today',
    completed: false
  },
  {
    id: 'todo_10',
    title: 'Drink 2L water & evening wellness walk',
    priority: 'low',
    category: 'Health',
    schedule: 'today',
    completed: false
  }
];

const demoTodos = [...initialDemoTodos];
let activeFilter = 'today';
let currentSearchQuery = '';

export function getVisibleTodos() {
  let list = demoTodos;

  // Status Filter
  if (activeFilter === 'today') {
    list = list.filter(t => t.schedule === 'today' && !t.completed);
  } else if (activeFilter === 'upcoming') {
    list = list.filter(t => t.schedule === 'upcoming' && !t.completed);
  } else if (activeFilter === 'completed') {
    list = list.filter(t => t.completed);
  }

  // Search Query Filter
  if (currentSearchQuery.trim()) {
    const q = currentSearchQuery.toLowerCase().trim();
    list = list.filter(
      t => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }

  return list;
}

export function renderHomeView() {
  const visible = getVisibleTodos();

  return `
    <section class="home-view" id="home-view" aria-label="Tasks list">
      ${renderFilterBar(activeFilter)}

      <div class="todo-list" id="todo-list" role="feed" aria-busy="false">
        ${
          visible.length > 0
            ? visible.map(todo => renderTodoCard(todo)).join('')
            : `
            <div class="empty-state">
              <div class="empty-state-icon" aria-hidden="true">📋</div>
              <p class="empty-state-title">No tasks found</p>
              <p class="empty-state-subtitle">
                ${
                  currentSearchQuery
                    ? `No matching tasks found for "${escapeHtml(currentSearchQuery)}".`
                    : `No tasks scheduled under "${activeFilter}".`
                }
              </p>
            </div>
          `
        }
      </div>
    </section>
  `;
}

export function setSearchQuery(query, container) {
  currentSearchQuery = query;
  updateTodoListDOM(container);
}

export function clearSearchQuery(container) {
  currentSearchQuery = '';
  updateTodoListDOM(container);
}

function updateTodoListDOM(container) {
  const todoListEl = container?.querySelector('#todo-list');
  if (!todoListEl) return;

  const visible = getVisibleTodos();
  todoListEl.innerHTML =
    visible.length > 0
      ? visible.map(todo => renderTodoCard(todo)).join('')
      : `
      <div class="empty-state">
        <div class="empty-state-icon" aria-hidden="true">📋</div>
        <p class="empty-state-title">No tasks found</p>
        <p class="empty-state-subtitle">
          ${
            currentSearchQuery
              ? `No matching tasks found for "${escapeHtml(currentSearchQuery)}".`
              : `No tasks scheduled under "${activeFilter}".`
          }
        </p>
      </div>
    `;
}

export function refreshHomeView(container) {
  if (!container) return;
  const homeView = container.querySelector('#home-view') || container;
  updateTodoListDOM(homeView);
}

export function initHomeViewEvents(container) {
  if (!container) return;

  const homeView = container.querySelector('#home-view') || container;
  if (!homeView) return;

  // Idempotent guard to prevent duplicate event bindings on the same view element
  if (homeView.dataset.eventsInitialized === 'true') return;
  homeView.dataset.eventsInitialized = 'true';

  homeView.addEventListener('click', event => {
    // 1. Handle Filter Pill clicks
    const filterPill = event.target.closest('.filter-pill');
    if (filterPill) {
      const selected = filterPill.getAttribute('data-filter');
      if (selected && selected !== activeFilter) {
        activeFilter = selected;

        // Update active class & accessibility attributes on pills
        const pills = homeView.querySelectorAll('.filter-pill');
        pills.forEach(pill => {
          const isActive = pill.getAttribute('data-filter') === activeFilter;
          pill.classList.toggle('active', isActive);
          pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update todo items without replacing the entire home view DOM
        updateTodoListDOM(homeView);
      }
      return;
    }

    // 2. Handle Todo Checkbox toggle button clicks
    const toggleBtn = event.target.closest('[data-action="toggle-todo"]');
    if (toggleBtn) {
      event.preventDefault();
      const todoId = toggleBtn.getAttribute('data-id');
      const todo = demoTodos.find(t => t.id === todoId);
      if (!todo) return;

      // Toggle completed state
      todo.completed = !todo.completed;

      // Update only the list container to reflect current filter
      updateTodoListDOM(homeView);
    }
  });
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
