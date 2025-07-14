export function initRegister() {
  const form = document.getElementById('register-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    try {
      // Verifica si el email ya existe
      const res = await fetch(`http://localhost:3000/users?email=${data.email}`);
      const existing = await res.json();

      if (existing.length > 0) {
        return alert('Ese correo ya está registrado.');
      }

      // Registrar nuevo usuario
      const save = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (save.ok) {
        alert('Usuario registrado con éxito.');
        window.history.pushState({}, '', '/login');
        import('./router.js').then(m => m.router());
      } else {
        throw new Error('Error al registrar');
      }

    } catch (err) {
      console.error('Error al registrar:', err);
      alert('Hubo un error al registrar el usuario.');
    }
  });

  // Enlaces internos SPA
  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      window.history.pushState({}, '', href);
      import('./router.js').then(m => m.router());
    });
  });
}
