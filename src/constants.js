// Medidas compartidas de la escena. Si algo se ve desproporcionado, se corrige
// cambiando un número aquí.

// Carretera
export const ROAD_WIDTH = 2.4
export const ROAD_LENGTH = 128
export const ROAD_THICKNESS = 0.1
export const ROAD_Y = 0.02
// La carretera empieza detrás de la cámara para que no se vea su inicio.
export const ROAD_START_Z = 9.6
export const TILE_SIZE = 0.4

// Agua
export const WATER_SIZE = 500
export const WATER_Y = -0.15

// Mini-ciudades: las medidas de index2.html (plataforma de radio 10) se reducen
// a esta escala para que quepan junto a la carretera.
export const CITY_SCALE = 0.4

// Estaciones: cada proyecto tiene una mini-ciudad a un lado de la carretera y,
// a su lado, un panel de cristal que hace de guía de lo que se verá en ella.
export const CITY_X = 9
// Panel: queda entre la carretera y la ciudad, corrido hacia quien viene por la
// carretera (FRAME_Z_OFFSET) para no tapar la ciudad, y girado hacia él
// (FRAME_TURN, en radianes).
export const FRAME_X = 4
export const FRAME_Y = 2.2
export const FRAME_WIDTH = 5
export const FRAME_HEIGHT = 3.2
export const FRAME_DEPTH = 0.25
export const FRAME_Z_OFFSET = 4.5
export const FRAME_TURN = 0.6
