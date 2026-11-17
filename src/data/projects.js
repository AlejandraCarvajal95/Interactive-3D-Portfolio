// Los tres proyectos del portafolio. Cada uno tiene su mini-ciudad, su marco de
// cristal y (más adelante) su sensor de estación; todos leen la posición de aquí.
//
// side: 'left' | 'right' (lado de la carretera)
// z: distancia a lo largo de la carretera (negativo = hacia el fondo)
// description: texto provisional, se completa en el Sprint 3.
import { CITY_X } from '../constants.js'

const PROJECT_LIST = [
  {
    id: 'app-conductores',
    name: 'App Conductores',
    side: 'left',
    z: -14,
    accentVar: '--city-app-conductores-accent',
    description: 'Descripción del proyecto App Conductores.',
  },
  {
    id: 'collections-voice-agent',
    name: 'Collections Voice Agent',
    side: 'right',
    z: -30,
    accentVar: '--city-collections-voice-agent-accent',
    description: 'Descripción del proyecto Collections Voice Agent.',
  },
  {
    id: 'conteo-vehicular',
    name: 'Reporte Conteo Vehicular AI',
    side: 'left',
    z: -48,
    accentVar: '--city-conteo-vehicular-accent',
    description: 'Descripción del proyecto Reporte Conteo Vehicular AI.',
  },
]

// Signo según el lado: -1 izquierda, +1 derecha.
export const sideSign = (side) => (side === 'left' ? -1 : 1)

export const PROJECTS = PROJECT_LIST.map((project) => ({
  ...project,
  position: [sideSign(project.side) * CITY_X, 0, project.z],
}))

export const PROJECT_BY_ID = Object.fromEntries(
  PROJECTS.map((project) => [project.id, project]),
)
