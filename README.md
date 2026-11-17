# Interactive 3D Portfolio

Portafolio web 3D interactivo. El visitante recorre una carretera flotante sobre un espejo de agua y encuentra mini-ciudades que representan cada proyecto del portafolio.

> Proyecto en desarrollo para el curso Diseño de Experiencias Web 3D (2026-2).

## Demo en vivo

**https://interactive-3d-portfolio-one.vercel.app**

Se despliega automáticamente en Vercel con cada push a `main`.

## Cómo moverte

| Acción | Mouse y teclado | Touchpad |
|---|---|---|
| Avanzar y retroceder | `W` `S`, `↑` `↓` o la rueda del mouse | Deslizar dos dedos |
| Moverte a los lados | `A` `D` o `←` `→` | `A` `D` o `←` `→` |
| Saltar | `Espacio` | `Espacio` |
| Mirar alrededor | Mover el mouse | Mover el cursor |
| Ver un proyecto | Clic en su panel | Tocar el touchpad sobre su panel |

La misma ayuda aparece en una tarjeta en la esquina superior derecha de la escena.

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

## Estructura del código

Cada componente tiene su propia carpeta con su `.jsx` y su `.css`, agrupados por tema:

```
src/
├── App.jsx, App.css        Escena principal
├── constants.js            Medidas compartidas (carretera, agua, paneles, navegación)
├── components/
│   ├── common/             Piezas reutilizables: Primitive, Floating, MatcapMaterial, DebugControls
│   ├── decor/              Decoración: título 3D y cuentas matcap
│   ├── environment/        Entorno: Sky, SkyReflection, Water, Fog, Road
│   ├── glass/              Cristal: paneles, burbujas y su material
│   ├── lights/             Luces: SunLight, SoftAmbient
│   ├── mini-cities/        Las mini-ciudades de cada proyecto
│   ├── physics/            Física (Rapier): colliders, sensores y el visitante
│   └── ui/                 Interfaz 2D sobre la escena: tarjeta de ayuda con los controles
├── data/                   Datos: proyectos, piezas de las ciudades, burbujas, teclas
├── hooks/                  Hooks propios (entrada de navegación)
└── utils/                  Utilidades (variables CSS, modos de revisión, aleatorio)
```

Los colores se definen como variables en el CSS de cada componente y se leen con `readCssVar`.

## Modos de revisión

Se activan con banderas en la URL y se pueden combinar (por ejemplo `/?stats&physics`):

| Bandera | Qué hace |
|---|---|
| `?debug` | Cámara libre y helpers de la luz |
| `?stats` | Panel de FPS |
| `?physics` | Muestra los colliders de la física |

## Ramas y despliegue

- `main`: rama de producción. Cada push se despliega automáticamente en Vercel: https://interactive-3d-portfolio-one.vercel.app
- `develop`: rama de trabajo.
