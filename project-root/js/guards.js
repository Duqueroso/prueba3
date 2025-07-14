// ✅ Verifica si hay un usuario logueado
export function isAuthenticated() {
  return !!localStorage.getItem('user');
}

// ✅ Devuelve el usuario completo desde localStorage
export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// ✅ Devuelve el rol del usuario (admin / visitor)
export function getUserRole() {
  const user = getUser();
  return user?.role || null;
}

// ✅ Verifica si el usuario tiene un rol específico
export function hasRole(role) {
  return getUserRole() === role;
}
