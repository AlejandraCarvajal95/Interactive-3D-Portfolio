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

// Navegación: el visitante es un cuerpo físico (cápsula) que se mueve a lo
// largo de la carretera. Los límites son paredes invisibles.
export const NAV_START_Z = 0
export const NAV_MAX_Z = 6 // límite de atrás (el inicio de la ruta)
export const NAV_MIN_Z = -90 // límite del final de la ruta
export const NAV_SPEED = 8 // unidades por segundo con W/S o las flechas
export const NAV_STRAFE_SPEED = 2 // A/D o flechas laterales
export const NAV_ACCEL = 6 // qué tan rápido alcanza la velocidad pedida
export const WHEEL_GAIN = 0.08 // velocidad que suma cada unidad de la rueda o del touchpad
export const WHEEL_MAX_SPEED = 12
export const WHEEL_DECAY = 2.5 // qué tan rápido se frena el impulso de la rueda
export const JUMP_IMPULSE = 2.5

// Cámara: sigue al cuerpo con suavizado (lerp) y mira hacia adelante; el
// puntero la desvía un poco, con un ángulo máximo.
export const WALKER_RADIUS = 0.4
export const WALKER_HALF_HEIGHT = 0.4 // mitad de la parte recta de la cápsula
export const EYE_HEIGHT = 3.5 // altura de la cámara sobre el agua, en reposo
export const NAV_SMOOTHING = 5 // más alto = la cámara sigue más rápido
export const LOOK_AHEAD = 30 // a qué distancia delante mira la cámara
export const LOOK_DROP = 2.2 // cuánto más abajo que la cámara mira
export const LOOK_MAX_X = 12 // desvío horizontal máximo de la mirada
export const LOOK_MAX_Y = 4 // desvío vertical máximo de la mirada
export const LOOK_SMOOTHING = 4

// Estación: zona a lo largo de la carretera donde "llegas" a un proyecto.
export const STATION_HALF_LENGTH = 5

// Cielo y sol visible (estética sunset). El sol es un disco con franjas, lejos
// en el horizonte y con su parte baja escondida bajo el agua.
export const SKY_RADIUS = 800
export const SUN_DISC_Z = -220
export const SUN_DISC_RADIUS = 40
// Altura del centro del disco sobre el agua. Con 0.45 del radio, su parte de
// abajo (la de las franjas) queda en parte tapada por el agua.
export const SUN_DISC_Y = SUN_DISC_RADIUS * 0.45
