
const API_URL = 'http://localhost:3000/users';

// Registro
export function initRegister() {
  const form = document.querySelector('#register-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value, // 'admin' o 'visitor'
    };

    const exist = await fetch(`${API_URL}?email=${user.email}`)
      .then(res => res.json());

    if (exist.length) {
      alert('Ya existe un usuario con ese correo.');
      return;
    }

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    alert('Usuario registrado con éxito. Ahora inicia sesión.');
    window.history.pushState({}, '', '/login');
    import('./router.js').then(m => m.router());
  });
}

// Login
export function initLogin() {
  const form = document.querySelector('#login-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    const users = await fetch(`${API_URL}?email=${email}&password=${password}`)
      .then(res => res.json());

    if (users.length === 0) {
      alert('Credenciales incorrectas');
      return;
    }

    const user = users[0];
    localStorage.setItem('user', JSON.stringify(user));
    window.history.pushState({}, '', '/dashboard');
    import('./router.js').then(m => m.router());
  });
}
