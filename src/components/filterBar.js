/**
 * Filter Bar Component
 *
 * Implements the filter pills matching design/home-ref(mobile).png:
 * - Today, Upcoming, Completed
 */

export function renderFilterBar(activeFilter = 'today') {
  return `
    <div class="filter-bar" id="filter-bar" role="tablist" aria-label="Task status filters">
      <button
        class="filter-pill ${activeFilter === 'today' ? 'active' : ''}"
        type="button"
        role="tab"
        aria-selected="${activeFilter === 'today' ? 'true' : 'false'}"
        data-filter="today"
      >
        Today
      </button>
      <button
        class="filter-pill ${activeFilter === 'upcoming' ? 'active' : ''}"
        type="button"
        role="tab"
        aria-selected="${activeFilter === 'upcoming' ? 'true' : 'false'}"
        data-filter="upcoming"
      >
        Upcoming
      </button>
      <button
        class="filter-pill ${activeFilter === 'completed' ? 'active' : ''}"
        type="button"
        role="tab"
        aria-selected="${activeFilter === 'completed' ? 'true' : 'false'}"
        data-filter="completed"
      >
        Completed
      </button>
    </div>
  `;
}
