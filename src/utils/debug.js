// Modo de revisión: se activa con ?debug en la URL (por ejemplo,
// http://localhost:5173/?debug).
export const IS_DEBUG = new URLSearchParams(window.location.search).has('debug')
