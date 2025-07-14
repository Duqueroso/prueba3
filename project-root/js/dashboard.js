import { getUser, hasRole } from './guards.js';

export function initDashboard() {
  const user = getUser();
  if (!user) return;

  // Mostrar nombre y rol
  document.getElementById('user-name').textContent = user.name;
  document.getElementById('user-role').textContent = user.role;

  // Mostrar botón de crear si es admin
  if (hasRole('admin')) {
    const adminControls = document.getElementById('admin-controls');
    adminControls.style.display = 'block';

    document.getElementById('create-event-btn')?.addEventListener('click', () => {
      window.history.pushState({}, '', '/dashboard/events/create');
      import('./router.js').then(m => m.router());
    });
  }

  // Cargar eventos
  fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(events => renderEvents(events, user))
    .catch(err => {
      console.error('Error al cargar eventos:', err);
    });

  // Logout
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.history.pushState({}, '', '/login');
    import('./router.js').then(m => m.router());
  });
}

function renderEvents(events, user) {
  const container = document.getElementById('event-list');
  if (!container) return;

  if (events.length === 0) {
    container.innerHTML = '<p>No hay eventos disponibles.</p>';
    return;
  }

  container.innerHTML = events.map(event => {
    const adminControls = hasRole('admin') ? `
      <button data-edit="${event.id}">✏️ Editar</button>
      <button data-delete="${event.id}">🗑️ Eliminar</button>
    ` : `
      <button data-register="${event.id}">📝 Registrarse</button>
    `;

    return `
      <div class="event-item">
        <strong>${event.title}</strong><br/>
        ${event.date} - ${event.location}<br/>
        ${adminControls}
      </div>
    `;
  }).join('');

  // Editar evento
  document.querySelectorAll('[data-edit]')?.forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem('editEventId', btn.dataset.edit);
      window.history.pushState({}, '', '/dashboard/events/edit');
      import('./router.js').then(m => m.router());
    });
  });

  // Eliminar evento
  document.querySelectorAll('[data-delete]')?.forEach(btn => {
    btn.addEventListener('click', async () => {
      const confirmed = confirm('¿Eliminar este evento?');
      if (!confirmed) return;

      await fetch(`http://localhost:3000/events/${btn.dataset.delete}`, {
        method: 'DELETE'
      });

      // Recargar
      initDashboard();
    });
  });

  // Registro visitante
document.querySelectorAll('[data-register]')?.forEach(btn => {
  btn.addEventListener('click', async () => {
    const eventId = parseInt(btn.dataset.register);
    const user = getUser();

    // Verificar si ya está registrado
    const existingRes = await fetch(`http://localhost:3000/registrations?eventId=${eventId}&userId=${user.id}`);
    const existing = await existingRes.json();

    if (existing.length > 0) {
      return alert('Ya estás registrado en este evento.');
    }

    // Verificar capacidad
    const eventRes = await fetch(`http://localhost:3000/events/${eventId}`);
    const event = await eventRes.json();

    const regCountRes = await fetch(`http://localhost:3000/registrations?eventId=${eventId}`);
    const currentRegs = await regCountRes.json();

    if (currentRegs.length >= event.capacity) {
      return alert('Este evento ya alcanzó su capacidad máxima.');
    }

    // Registrar
    const save = await fetch('http://localhost:3000/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, userId: user.id })
    });

    if (save.ok) {
      alert('Te has registrado con éxito.');
    } else {
      alert('Hubo un error al registrarte.');
    }
  });
});

  // Registro visitante (lógica básica)
  document.querySelectorAll('[data-register]')?.forEach(btn => {
    btn.addEventListener('click', async () => {
      alert(`Aquí podrías registrar al visitante al evento ID ${btn.dataset.register}`);
      // Aquí se podría implementar lógica real de inscripción
    });
  });
}
