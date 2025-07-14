export function initCreateEvent() {
  // Esperar al render del DOM
  setTimeout(() => {
    const form = document.getElementById('create-event-form');
    console.log('[Create Event] Form encontrado:', form);

    if (!form) return; // no hacer nada si no lo encuentra

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      data.capacity = parseInt(data.capacity);

      try {
        const res = await fetch('http://localhost:3000/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('Error al crear el evento');

        alert('Evento creado correctamente');
        window.history.pushState({}, '', '/dashboard');
        import('../router.js').then(m => m.router());
      } catch (err) {
        console.error('Error creando el evento:', err);
        alert('Hubo un error al crear el evento');
      }
    });

    // SPA links
    document.querySelectorAll('[data-link]')?.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        window.history.pushState({}, '', href);
        import('../router.js').then(m => m.router());
      });
    });

  }, 0);
}
