// Piezas de una mini-ciudad, con las medidas de index2.html (plataforma de
// radio 10). Todo son primitivas: la base de cada una mide 2 (el cilindro tiene
// radio 1 y alto 2), así que la escala es la mitad de la medida que se quiere.
// La ciudad entera se reduce con CITY_SCALE al colocarla.
//
// color: 'platform' | 'building' | 'accent' | 'orb' (ver MiniCity.css)

const ZERO = [0, 0, 0]
const PLATFORM_TOP = 0.3

// [ancho, alto, fondo, x, z]
const BUILDINGS = [
  [2.0, 8, 2.0, 2, -1],
  [1.5, 12, 1.5, -2, 1],
  [1.8, 6.5, 1.8, 4.5, 3],
  [1.2, 9.5, 1.2, -4, -2.5],
  [2.2, 5, 1.5, 1, 4],
  [1.0, 7, 1.0, -5, 2.5],
  [1.3, 11, 1.3, 3.5, -3.5],
]

// [radio, x, z]
const DOMES = [
  [1.8, -3, -5.5],
  [1.4, 5, 0],
]

// [x, z]. La altura sube de a 1.5 en grupos de tres.
const PILLARS = [
  [0, -6.5],
  [5.5, -5],
  [-5, 5.5],
  [0, 6],
  [6, 2],
]

const buildings = BUILDINGS.map(([w, h, d, x, z], i) => ({
  id: `building-${i}`,
  shape: 'box',
  color: 'building',
  position: [x, PLATFORM_TOP + h / 2, z],
  rotation: ZERO,
  scale: [w / 2, h / 2, d / 2],
}))

// Antena sobre los edificios altos (9 o más).
const antennas = BUILDINGS.filter(([, h]) => h >= 9).map(([, h, , x, z], i) => ({
  id: `antenna-${i}`,
  shape: 'cylinder',
  color: 'accent',
  position: [x, PLATFORM_TOP + h + 1, z],
  rotation: ZERO,
  scale: [0.06, 1, 0.06],
}))

const domes = DOMES.map(([r, x, z], i) => ({
  id: `dome-${i}`,
  shape: 'sphere',
  color: 'accent',
  position: [x, PLATFORM_TOP, z],
  rotation: ZERO,
  scale: [r, r, r],
}))

const pillars = PILLARS.flatMap(([x, z], i) => {
  const height = 3 + (i % 3) * 1.5
  return [
    {
      id: `pillar-${i}`,
      shape: 'cylinder',
      color: 'accent',
      position: [x, PLATFORM_TOP + height / 2, z],
      rotation: ZERO,
      scale: [0.1, height / 2, 0.1],
    },
    {
      id: `orb-${i}`,
      shape: 'sphere',
      color: 'orb',
      position: [x, PLATFORM_TOP + height + 0.2, z],
      rotation: ZERO,
      scale: [0.18, 0.18, 0.18],
    },
  ]
})

export const CITY_PARTS = [
  // Plataforma: cilindro plano de radio 10 y 0.3 de alto
  {
    id: 'platform',
    shape: 'cylinder',
    color: 'platform',
    position: [0, PLATFORM_TOP / 2, 0],
    rotation: ZERO,
    scale: [10, PLATFORM_TOP / 2, 10],
  },
  ...buildings,
  ...antennas,
  ...domes,
  ...pillars,
  // Torre central: base, columna y esfera arriba
  {
    id: 'landmark-base',
    shape: 'cylinder',
    color: 'platform',
    position: [0, PLATFORM_TOP + 0.25, 0],
    rotation: ZERO,
    scale: [1.2, 0.25, 1.2],
  },
  {
    id: 'landmark-column',
    shape: 'cylinder',
    color: 'accent',
    position: [0, PLATFORM_TOP + 0.5 + 1.5, 0],
    rotation: ZERO,
    scale: [0.5, 1.5, 0.5],
  },
  {
    id: 'landmark-top',
    shape: 'sphere',
    color: 'accent',
    position: [0, PLATFORM_TOP + 0.5 + 3 + 0.6, 0],
    rotation: ZERO,
    scale: [0.6, 0.6, 0.6],
  },
]
