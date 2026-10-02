import './styles/index.css';
import { renderHeader, renderFooter, initNavBar } from './components/navBar.js';
import { initRouter } from './router.js';
import { setSearchQuery, clearSearchQuery } from './views/homeView.js';

function initApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="app-layout">
      ${renderHeader()}
      <main class="main-content" id="main-content" role="main">
        <!-- Views rendered by router -->
      </main>
      ${renderFooter()}
    </div>
  `;

  const mainContainer = document.querySelector('#main-content');

  initNavBar({
    onOpenSearch: () => {
      const hash = window.location.hash || '#/';
      if (hash !== '#/' && hash !== '#/home' && hash !== '') {
        window.location.hash = '#/';
      }
    },
    onCloseSearch: () => {
      clearSearchQuery(mainContainer);
    },
    onSearchInput: query => {
      setSearchQuery(query, mainContainer);
    },
    onClearSearch: () => {
      clearSearchQuery(mainContainer);
    }
  });

  initRouter(mainContainer);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
