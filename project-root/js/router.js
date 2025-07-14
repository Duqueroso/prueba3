import { isAuthenticated } from './guards.js';

export async function router() {
  const path = window.location.pathname;
  const app = document.getElementById('app');

  console.log('[Router] Ruta actual:', path);

  const routes = {
    '/': { html: 'views/login.html', js: 'js/login.js' },
    '/login': { html: 'views/login.html', js: 'js/login.js' },
    '/register': { html: 'views/register.html', js: 'js/register.js' },
    '/dashboard': { html: 'views/dashboard.html', js: 'js/dashboard.js', protected: true },
    '/dashboard/events/create': {
      html: 'views/event-create.html',
      js: 'js/events/event-create.js',
      protected: true,
    },
    '/dashboard/events/edit': {
      html: 'views/event-edit.html',
      js: 'js/events/event-edit.js',
      protected: true,
    },
    '/dashboard/my-events': {
      html: 'views/my-events.html',
      js: 'js/events/my-events.js',
      protected: true,
    },
    '/not-found': { html: 'views/not-found.html' },
  };

  const route = routes[path] || routes['/not-found'];

  // 🔐 Redirección si ya logueado y va a /login, /register o /
  if (isAuthenticated() && (path === '/' || path === '/login' || path === '/register')) {
    console.log('[Router] Ya logueado, redirigiendo a /dashboard');
    window.history.pushState({}, '', '/dashboard');
    return router();
  }

  // ❌ Si no está autenticado y es ruta protegida
  if (route.protected && !isAuthenticated()) {
    console.log('[Router] Ruta protegida sin sesión, redirigiendo a /not-found');
    window.history.pushState({}, '', '/not-found');
    return router();
  }

  try {
    console.log('[Router] Cargando vista:', route.html);
    const res = await fetch(route.html);
    if (!res.ok) throw new Error(`Vista no encontrada: ${route.html}`);

    const html = await res.text();
    app.innerHTML = html;
    console.log('[Router] HTML insertado:', html);

    // Esperar al DOM antes de cargar el JS asociado
    if (route.js) {
      console.log('[Router] Cargando JS:', route.js);
      const module = await import(`/${route.js}`);
      const initFn = Object.values(module).find(fn => typeof fn === 'function');

      if (initFn) {
        setTimeout(() => {
          try {
            initFn();
          } catch (error) {
            console.error('[Router] Error al ejecutar initFn:', error);
          }
        }, 0);
      }
    }
  } catch (error) {
    console.error('[Router] Error cargando la vista o el JS:', error);
    app.innerHTML = `<p style="color: red;">Error al cargar la vista.</p>`;
  }
}
