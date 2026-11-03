# Interactive 3D Portfolio

Portafolio web 3D interactivo. El visitante recorre una carretera flotante sobre un espejo de agua y encuentra mini-ciudades que representan cada proyecto del portafolio.

> Proyecto en desarrollo para el curso Diseño de Experiencias Web 3D (2026-2).

## Tecnologías

- [React](https://react.dev)
- [Vite](https://vite.dev)
- [Three.js](https://threejs.org)
- [React Three Fiber](https://r3f.docs.pmnd.rs)
- [Drei](https://drei.docs.pmnd.rs)
- [ESLint](https://eslint.org)

## Requisitos

- [Node.js](https://nodejs.org) (versión LTS)

## Cómo correrlo en local

```bash
npm install
npm run dev
```

Después abre la URL que aparece en la terminal (normalmente `http://localhost:5173`).

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Muestra localmente la versión de producción |
| `npm run lint` | Revisa el código con ESLint |

## Ramas y despliegue

- `main`: rama de producción. Cada push se despliega automáticamente en Vercel.
- `develop`: rama de trabajo.
