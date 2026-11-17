// Burbujas y cuentas decorativas alrededor de la carretera: [x, y, z, radio].
// Se reparten con una semilla fija (siempre quedan en el mismo sitio), de varios
// tamaños, bien separadas entre sí y evitando la carretera, las mini-ciudades,
// los paneles de cristal y el título 3D.
import {
  CITY_SCALE,
  FRAME_HEIGHT,
  FRAME_WIDTH,
  FRAME_X,
  FRAME_Y,
  FRAME_Z_OFFSET,
  NAV_MIN_Z,
} from '../constants.js'
import { createRandom } from '../utils/random.js'
import { PROJECTS, sideSign } from './projects.js'

// Volumen donde se reparten (ancho a cada lado de la carretera, alto y largo).
const MIN_X = 2.8 // lo más cerca del centro de la carretera
const MAX_X = 16
const MIN_Y = 1
const MAX_Y = 12
const NEAR_Z = -2
const FAR_Z = NAV_MIN_Z // hasta donde llega el recorrido

const CITY_RADIUS = CITY_SCALE * 10 // radio de la plataforma de cada ciudad
const CITY_MAX_Y = 8 // por debajo de esta altura no se pone nada sobre una ciudad
const TITLE = { x: 7, y: 7.2, z: -12, halfHeight: 2.5, halfDepth: 2.5 }

// Zona que ocupa cada panel, para no poner nada dentro.
const PANEL_ZONES = PROJECTS.map(({ side, z }) => ({
  sign: sideSign(side),
  z: z + FRAME_Z_OFFSET,
}))

function overlapsPanel(x, y, z, radius) {
  return PANEL_ZONES.some(
    (zone) =>
      Math.sign(x) === zone.sign &&
      Math.abs(x) > FRAME_X - FRAME_WIDTH / 2 - radius &&
      Math.abs(z - zone.z) < FRAME_WIDTH / 2 + radius &&
      y < FRAME_Y + FRAME_HEIGHT / 2 + radius &&
      y > FRAME_Y - FRAME_HEIGHT / 2 - radius,
  )
}

function overlapsCity(x, y, z, radius) {
  return PROJECTS.some(
    ({ position }) =>
      y < CITY_MAX_Y &&
      Math.hypot(x - position[0], z - position[2]) < CITY_RADIUS + radius + 1,
  )
}

function overlapsTitle(x, y, z, radius) {
  return (
    Math.abs(x) < TITLE.x + radius &&
    Math.abs(y - TITLE.y) < TITLE.halfHeight + radius &&
    Math.abs(z - TITLE.z) < TITLE.halfDepth + radius
  )
}

// `placed` guarda todo lo ya colocado (burbujas y cuentas) para mantener una
// distancia mínima entre centros (`spacing`) y que no queden amontonadas.
const placed = []

function scatter({ count, seed, minRadius, maxRadius, spacing }) {
  const random = createRandom(seed)
  const items = []
  let attempts = 0

  while (items.length < count && attempts < 5000) {
    attempts++
    const side = random() < 0.5 ? -1 : 1
    const x = side * (MIN_X + random() * (MAX_X - MIN_X))
    const y = MIN_Y + random() * (MAX_Y - MIN_Y)
    const z = NEAR_Z + random() * (FAR_Z - NEAR_Z)
    // Elevar al cuadrado deja más burbujas chicas que grandes.
    const radius = minRadius + random() ** 2 * (maxRadius - minRadius)

    const tooClose = placed.some(
      ([px, py, pz, pr]) =>
        Math.hypot(x - px, y - py, z - pz) < spacing + radius + pr,
    )
    if (
      tooClose ||
      overlapsPanel(x, y, z, radius) ||
      overlapsCity(x, y, z, radius) ||
      overlapsTitle(x, y, z, radius)
    ) {
      continue
    }

    const item = [x, y, z, radius]
    items.push(item)
    placed.push(item)
  }

  return items
}

export const ORBS = scatter({
  count: 30,
  seed: 11,
  minRadius: 0.12,
  maxRadius: 0.8,
  spacing: 5,
})
export const BEADS = scatter({
  count: 10,
  seed: 23,
  minRadius: 0.08,
  maxRadius: 0.16,
  spacing: 4,
})
