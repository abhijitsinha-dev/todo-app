/**
 * Navigation Bar Component (Header & Mobile Footer)
 *
 * Implements the mobile-first header and footer navigation strictly matching
 * the wireframe reference (design/header-footer-ref.png):
 * - Top Header: App Logo (circle) on left, Settings Icon (circle) on right
 * - Bottom Footer: Home (circle), Create (circle), Stats (circle)
 */

export function renderHeader() {
  return `
    <header class="app-header" id="app-header">
      <div class="header-container">
        <a href="#/" class="app-logo-link" id="header-logo" aria-label="Todo App Home">
          <div class="logo-circle" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 11 3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
          <span class="app-title">Todo</span>
        </a>

        <a href="#/settings" class="icon-btn settings-btn" id="btn-settings" aria-label="Settings" title="Settings">
          <div class="settings-circle" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
        </a>
      </div>
    </header>
  `;
}

export function renderFooter(activeTab = 'home') {
  return `
    <nav class="bottom-nav" id="bottom-nav" aria-label="Main Navigation">
      <div class="bottom-nav-container">
        <a href="#/" class="tab-item ${activeTab === 'home' ? 'active' : ''}" id="nav-home" data-tab="home" aria-label="Home" ${activeTab === 'home' ? 'aria-current="page"' : ''}>
          <div class="tab-icon-circle" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span class="tab-label">Home</span>
        </a>

        <a href="#/create" class="tab-item ${activeTab === 'create' ? 'active' : ''}" id="nav-create" data-tab="create" aria-label="Create" ${activeTab === 'create' ? 'aria-current="page"' : ''}>
          <div class="tab-icon-circle tab-icon-create" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <span class="tab-label">Create</span>
        </a>

        <a href="#/stats" class="tab-item ${activeTab === 'stats' ? 'active' : ''}" id="nav-stats" data-tab="stats" aria-label="Stats" ${activeTab === 'stats' ? 'aria-current="page"' : ''}>
          <div class="tab-icon-circle" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
          <span class="tab-label">Stats</span>
        </a>
      </div>
    </nav>
  `;
}

export function initNavBar() {
  function updateActiveTab() {
    const hash = window.location.hash || '#/';
    let currentTab = 'home';

    if (hash.startsWith('#/create')) {
      currentTab = 'create';
    } else if (hash.startsWith('#/stats')) {
      currentTab = 'stats';
    } else if (hash.startsWith('#/settings')) {
      currentTab = 'settings';
    } else if (hash.startsWith('#/todo/')) {
      currentTab = 'detail';
    }

    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(el => {
      const tab = el.getAttribute('data-tab');
      if (tab === currentTab) {
        el.classList.add('active');
        el.setAttribute('aria-current', 'page');
      } else {
        el.classList.remove('active');
        el.removeAttribute('aria-current');
      }
    });

    const settingsBtn = document.querySelector('#btn-settings');
    if (settingsBtn) {
      if (currentTab === 'settings') {
        settingsBtn.classList.add('active');
        settingsBtn.setAttribute('aria-current', 'page');
      } else {
        settingsBtn.classList.remove('active');
        settingsBtn.removeAttribute('aria-current');
      }
    }
  }

  window.addEventListener('hashchange', updateActiveTab);
  updateActiveTab();
}
