export async function initEditEvent() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert('ID de evento no encontrado');
    window.history.pushState({}, '', '/dashboard');
    return import('../router.js').then(m => m.router());
  }

  try {
    const res = await fetch(`http://localhost:3000/events/${id}`);
    if (!res.ok) throw new Error('Error cargando evento');

    const evento = await res.json();

    // Rellenar campos
    document.querySelector('[name="title"]').value = evento.title;
    document.querySelector('[name="description"]').value = evento.description;
    document.querySelector('[name="date"]').value = evento.date;
    document.querySelector('[name="capacity"]').value = evento.capacity;
    document.querySelector('[name="location"]').value = evento.location;

    // Manejo del formulario
    const form = document.getElementById('edit-event-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      data.capacity = parseInt(data.capacity);
      data.registrations = evento.registrations || 0; // mantener el valor actual

      try {
        const updateRes = await fetch(`http://localhost:3000/events/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (!updateRes.ok) throw new Error('Error al actualizar evento');

        alert('Evento actualizado correctamente');
        window.history.pushState({}, '', '/dashboard');
        import('../router.js').then(m => m.router());
      } catch (err) {
        console.error('Error actualizando evento:', err);
        alert('Hubo un error al actualizar el evento');
      }
    });

    // SPA navigation para botones con data-link
    document.querySelectorAll('[data-link]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        window.history.pushState({}, '', href);
        import('../router.js').then(m => m.router());
      });
    });

  } catch (error) {
    console.error('Error cargando evento:', error);
    alert('Error cargando evento');
    window.history.pushState({}, '', '/dashboard');
    import('../router.js').then(m => m.router());
  }
}
