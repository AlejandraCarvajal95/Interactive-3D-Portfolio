// Modos de revisión. Se activan con banderas en la URL y se pueden combinar,
// por ejemplo: http://localhost:5173/?stats&physics
//
//   ?debug    cámara libre (OrbitControls) y helpers de la luz
//   ?stats    panel de FPS
//   ?physics  muestra los colliders de la física
const params = new URLSearchParams(window.location.search)

export const IS_DEBUG = params.has('debug')
export const SHOW_STATS = params.has('stats')
export const SHOW_PHYSICS = params.has('physics')
