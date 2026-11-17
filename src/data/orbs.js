// Burbujas y cuentas decorativas alrededor de la carretera: [x, y, z, radio].
// Se reparten con una semilla fija (siempre quedan en el mismo sitio), de varios
// tamaños, y evitando la carretera y los paneles de cristal.
import {
  FRAME_HEIGHT,
  FRAME_WIDTH,
  FRAME_X,
  FRAME_Y,
  FRAME_Z_OFFSET,
} from '../constants.js'
import { createRandom } from '../utils/random.js'
import { PROJECTS, sideSign } from './projects.js'

const MIN_X = 1.9 // lo más cerca del centro de la carretera
const MAX_X = 5
const MIN_Y = 0.8
const MAX_Y = 6
const NEAR_Z = 2
const FAR_Z = -62

// Zona que ocupa cada panel, con un margen, para no poner nada dentro.
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

function scatter({ count, seed, minRadius, maxRadius }) {
  const random = createRandom(seed)
  const items = []

  while (items.length < count) {
    const side = random() < 0.5 ? -1 : 1
    const x = side * (MIN_X + random() * (MAX_X - MIN_X))
    const y = MIN_Y + random() * (MAX_Y - MIN_Y)
    const z = NEAR_Z + random() * (FAR_Z - NEAR_Z)
    // Elevar al cuadrado deja más burbujas chicas que grandes.
    const radius = minRadius + random() ** 2 * (maxRadius - minRadius)

    if (!overlapsPanel(x, y, z, radius)) items.push([x, y, z, radius])
  }

  return items
}

export const ORBS = scatter({ count: 30, seed: 11, minRadius: 0.12, maxRadius: 0.8 })
export const BEADS = scatter({ count: 10, seed: 23, minRadius: 0.08, maxRadius: 0.16 })
