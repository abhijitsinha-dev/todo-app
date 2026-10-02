import './styles/index.css';
import { renderHeader, renderFooter, initNavBar } from './components/navBar.js';

function initApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="app-layout">
      ${renderHeader()}
      <main class="main-content" id="main-content" role="main">
        <!-- Content placeholder ready for future views -->
      </main>
      ${renderFooter()}
    </div>
  `;

  initNavBar();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
