import { getUser } from '../guards.js';

export function initMyEvents() {
  const user = getUser();
  const container = document.getElementById('my-registrations');

  if (!user || user.role !== 'visitor') {
    container.innerHTML = '<p>Solo los visitantes pueden ver esta sección.</p>';
    return;
  }

  // 1. Obtener registros de ese usuario
  fetch(`http://localhost:3000/registrations?userId=${user.id}`)
    .then(res => res.json())
    .then(async registrations => {
      if (registrations.length === 0) {
        container.innerHTML = '<p>No estás registrado en ningún evento.</p>';
        return;
      }

      // 2. Obtener todos los eventos de esos registros
      const promises = registrations.map(reg =>
        fetch(`http://localhost:3000/events/${reg.eventId}`).then(res => res.json())
      );

      const events = await Promise.all(promises);

      container.innerHTML = events.map(event => `
        <div class="event-item">
          <strong>${event.title}</strong><br/>
          ${event.date} - ${event.location}
        </div>
      `).join('');
    })
    .catch(err => {
      console.error('Error cargando registros:', err);
      container.innerHTML = '<p>Error al cargar tus eventos.</p>';
    });

  // SPA navigation
  document.querySelectorAll('[data-link]')?.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      window.history.pushState({}, '', href);
      import('../router.js').then(m => m.router());
    });
  });
}
