export function initLogin() {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    
    try {
      const res = await fetch(`http://localhost:3000/users?email=${data.email}&password=${data.password}`);
      const users = await res.json();

      if (users.length === 1) {
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user));
        alert('Bienvenido, ' + user.name);
        window.history.pushState({}, '', '/dashboard');
        import('./router.js').then(m => m.router());
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Error al iniciar sesión');
    }
  });

  // Enlaces internos (SPA)
  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      window.history.pushState({}, '', href);
      import('./router.js').then(m => m.router());
    });
  });
}
