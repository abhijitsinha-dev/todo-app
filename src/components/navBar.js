/**
 * Navigation Bar Component (Header & Mobile Footer)
 *
 * Implements the mobile-first header and footer navigation:
 * - Header: Transforms into a full animated search bar when search is active
 * - Footer: Home, Create, Stats tabs
 */

export function renderHeader() {
  return `
    <header class="app-header" id="app-header">
      <div class="header-container">
        <!-- Default Main Header View -->
        <div class="header-main-view" id="header-main-view">
          <a href="#/" class="app-logo-link" id="header-logo" aria-label="Todo App Home">
            <div class="logo-circle" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 11 3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
            <span class="app-title">Todo</span>
          </a>

          <div class="header-actions">
            <button class="icon-btn search-btn" id="btn-search" type="button" aria-label="Open search" title="Search tasks">
              <div class="search-circle" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
            </button>

            <a href="#/settings" class="icon-btn settings-btn" id="btn-settings" aria-label="Settings" title="Settings">
              <div class="settings-circle" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>

        <!-- Animated Search Input Header View -->
        <div class="header-search-view" id="header-search-view" aria-hidden="true">
          <button class="icon-btn search-back-btn" id="btn-search-back" type="button" aria-label="Close search">
            <div class="back-circle" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </div>
          </button>

          <div class="header-search-box">
            <svg class="header-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="search"
              class="header-search-input"
              id="header-search-input"
              placeholder="Search tasks..."
              aria-label="Search tasks"
              autocomplete="off"
            />
            <button class="header-search-clear" id="btn-search-clear" type="button" aria-label="Clear search" style="display: none;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
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

export function initNavBar(searchCallbacks = {}) {
  const { onOpenSearch, onCloseSearch, onSearchInput, onClearSearch } = searchCallbacks;

  const headerEl = document.querySelector('#app-header');
  const searchViewEl = document.querySelector('#header-search-view');
  const searchBtn = document.querySelector('#btn-search');
  const searchBackBtn = document.querySelector('#btn-search-back');
  const searchInput = document.querySelector('#header-search-input');
  const clearBtn = document.querySelector('#btn-search-clear');

  function openSearchMode() {
    if (!headerEl) return;
    headerEl.classList.add('search-mode');
    if (searchViewEl) searchViewEl.removeAttribute('aria-hidden');

    if (onOpenSearch) onOpenSearch();

    setTimeout(() => {
      if (searchInput) {
        searchInput.focus();
      }
    }, 50);
  }

  function closeSearchMode() {
    if (!headerEl) return;
    headerEl.classList.remove('search-mode');
    if (searchViewEl) searchViewEl.setAttribute('aria-hidden', 'true');

    if (searchInput) {
      searchInput.value = '';
    }
    if (clearBtn) {
      clearBtn.style.display = 'none';
    }

    if (onCloseSearch) onCloseSearch();
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (headerEl?.classList.contains('search-mode')) {
        closeSearchMode();
      } else {
        openSearchMode();
      }
    });
  }

  if (searchBackBtn) {
    searchBackBtn.addEventListener('click', closeSearchMode);
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const val = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = val ? 'flex' : 'none';
      }
      if (onSearchInput) onSearchInput(val);
    });

    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeSearchMode();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      clearBtn.style.display = 'none';
      if (onClearSearch) onClearSearch();
    });
  }

  function updateActiveTab() {
    const hash = window.location.hash || '#/';
    let currentTab = 'home';

    if (hash.startsWith('#/create')) {
      currentTab = 'create';
      closeSearchMode();
    } else if (hash.startsWith('#/stats')) {
      currentTab = 'stats';
      closeSearchMode();
    } else if (hash.startsWith('#/settings')) {
      currentTab = 'settings';
      closeSearchMode();
    } else if (hash.startsWith('#/todo/')) {
      currentTab = 'detail';
      closeSearchMode();
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
