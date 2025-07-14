
import { router } from './router.js';

window.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/') {
    window.history.replaceState({}, '', '/login'); // Redirige a /login si estás en /
  }
  router();
});

window.addEventListener('popstate', router);

document.body.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    window.history.pushState({}, '', href);
    router();
  }
});
