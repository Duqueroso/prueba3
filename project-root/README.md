# SPA Gestión de Eventos

Una **Single Page Application (SPA)** desarrollada con **JavaScript Vanilla**, **HTML**, **CSS** y **json-server**. Esta aplicación permite la gestión de eventos con autenticación por roles (administrador y visitante), navegación sin recarga mediante enrutamiento dinámico y operaciones CRUD sobre eventos.

## 🚀 Características principales

- ✅ Registro e inicio de sesión con persistencia de sesión.
- 🔐 Roles diferenciados:
  - **Administrador:** puede crear, editar y eliminar eventos.
  - **Visitante:** puede visualizar y registrarse en eventos.
- 📆 Gestión completa de eventos.
- 🧭 Navegación dinámica sin recarga (SPA con `router.js`).
- 📁 Rutas protegidas según el rol del usuario.
- 📦 Backend simulado con `json-server`.

---

## 📁 Estructura del proyecto

```
/
├── index.html                # HTML principal (único archivo HTML cargado directamente)
├── /js
│   ├── main.js               # Punto de entrada
│   ├── router.js             # Enrutamiento dinámico SPA
│   ├── auth.js               # Manejo de login, registro, logout y sesiones
│   ├── roles.js              # Lógica de autorización por roles
│   └── /views                # Vistas cargadas dinámicamente
│       ├── login.html
│       ├── register.html
│       ├── dashboard.html
│       ├── my-events.html
│       ├── event-create.html
│       └── ...
├── /css
│   └── styles.css            # Estilos generales
├── /assets                   # Imágenes, íconos u otros archivos estáticos
├── db.json                  # Base de datos falsa para json-server
└── README.md
```

---

## 🧪 Base de datos (`db.json` de ejemplo)

```json
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "1234",
      "role": "admin"
    },
    {
      "id": 2,
      "username": "visitante",
      "password": "1234",
      "role": "visitor"
    }
  ],
  "events": [
    {
      "id": 1,
      "title": "Concierto Medellín",
      "description": "Evento musical en vivo",
      "date": "2025-07-30",
      "capacity": 100,
      "location": "Plaza Mayor",
      "registrations": 0
    }
  ]
}
```

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- [`json-server`](https://github.com/typicode/json-server)

---

## ⚙️ Instalación y ejecución local

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/spa-eventos.git
cd spa-eventos
```

### 2. Instala json-server

```bash
npm install -g json-server
```

### 3. Inicia el servidor de desarrollo

#### A. Servidor JSON

```bash
json-server --watch db.json --port 3000
```

#### B. Servidor frontend

- Usa **Live Server** (recomendado con VS Code) o **Vite** si tienes configurado.

---

## 🧭 Navegación por rutas

Las vistas se cargan dinámicamente dentro del `index.html`. Ejemplos:

- `/login` → Vista de inicio de sesión
- `/register` → Vista de registro
- `/dashboard` → Panel según rol
- `/my-events` → Lista de eventos creados o registrados

---

## 🔐 Roles y permisos

| Funcionalidad         | Administrador | Visitante |
|-----------------------|:-------------:|:---------:|
| Ver eventos           | ✅            | ✅        |
| Crear/Editar/Eliminar | ✅            | ❌        |
| Registrarse a eventos | ❌            | ✅        |

---

## ✍️ Autor

- **Brayan Duque** – Medellín, Colombia 🇨🇴  


---

## 📄 Licencia

Este proyecto es de uso educativo y personal. Puedes modificarlo libremente para tus propios fines.