/**
 * Lightweight Client-Side SPA Hash Router
 */

import { renderHomeView, initHomeViewEvents } from './views/homeView.js';

export function handleRoute(mainContainer) {
  if (!mainContainer) return;

  const rawHash = window.location.hash || '#/';
  const route = rawHash.split('?')[0].replace(/^#/, '') || '/';

  if (route === '/' || route === '/home') {
    mainContainer.innerHTML = renderHomeView();
    initHomeViewEvents(mainContainer);
  } else if (route === '/create') {
    mainContainer.innerHTML = `
      <section class="placeholder-page" aria-label="Create task page">
        <h1 class="placeholder-title">Create Page</h1>
        <p class="placeholder-desc">Task creation form coming soon</p>
      </section>
    `;
  } else if (route === '/stats') {
    mainContainer.innerHTML = `
      <section class="placeholder-page" aria-label="Statistics page">
        <h1 class="placeholder-title">Stats Page</h1>
        <p class="placeholder-desc">Productivity analytics dashboard coming soon</p>
      </section>
    `;
  } else if (route === '/settings') {
    mainContainer.innerHTML = `
      <section class="placeholder-page" aria-label="Settings page">
        <h1 class="placeholder-title">Settings Page</h1>
        <p class="placeholder-desc">App preferences and options coming soon</p>
      </section>
    `;
  } else if (route.startsWith('/todo/')) {
    mainContainer.innerHTML = `
      <section class="placeholder-page" aria-label="Task detail page">
        <h1 class="placeholder-title">Todo Detail Page</h1>
        <p class="placeholder-desc">Task detail view coming soon</p>
      </section>
    `;
  } else {
    // Fallback to Home
    mainContainer.innerHTML = renderHomeView();
    initHomeViewEvents(mainContainer);
  }

  // Scroll to top on view change
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function initRouter(mainContainer) {
  window.addEventListener('hashchange', () => handleRoute(mainContainer));
  handleRoute(mainContainer);
}
