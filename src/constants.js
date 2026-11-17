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
// Panel: es el aviso de cada ciudad. Queda a un costado de ella (del lado de
// quien viene por la carretera), justo fuera de su plataforma, para que la
// ciudad se vea de frente. Se gira casi de cara a la carretera (FRAME_TURN, en
// radianes, desde 0 = mirando hacia quien viene).
export const FRAME_X = 6
export const FRAME_Y = 2.2
export const FRAME_WIDTH = 5
export const FRAME_HEIGHT = 3.2
export const FRAME_DEPTH = 0.25
export const FRAME_TURN = Math.PI / 2 - 0.3
export const FRAME_GAP = 1 // espacio entre la plataforma y el panel
// Distancia, a lo largo de la carretera, del centro de la ciudad al del panel.
export const FRAME_Z_OFFSET =
  CITY_SCALE * 10 + FRAME_GAP + (FRAME_WIDTH / 2) * Math.sin(FRAME_TURN)

// Título 3D del portafolio, flotando sobre el inicio de la carretera.
export const TITLE_TEXT = 'Interactive 3D Portfolio'
export const TITLE_POSITION = [0, 9.5, -18]
export const TITLE_SIZE = 1.05
export const TITLE_HALF_WIDTH = 9 // zona que ocupa, para que nada se le cruce

// Navegación: el visitante es un cuerpo físico (cápsula) que se mueve a lo
// largo de la carretera. Los límites son paredes invisibles.
export const NAV_START_Z = 0
export const NAV_MAX_Z = 6 // límite de atrás (el inicio de la ruta)
export const NAV_MIN_Z = -90 // límite del final de la ruta
export const NAV_SPEED = 8 // unidades por segundo con W/S o las flechas
export const NAV_STRAFE_SPEED = 2 // A/D o flechas laterales
export const NAV_ACCEL = 6 // qué tan rápido alcanza la velocidad pedida
export const WHEEL_GAIN = 0.06 // velocidad que suma cada unidad de la rueda o del touchpad
export const WHEEL_MAX_SPEED = 10
export const WHEEL_DECAY = 3.5 // qué tan rápido se frena el impulso de la rueda
export const JUMP_IMPULSE = 2.5

// Cámara: sigue al cuerpo con suavizado (lerp) y mira hacia adelante; el
// puntero la desvía un poco, con un ángulo máximo.
export const WALKER_RADIUS = 0.4
export const WALKER_HALF_HEIGHT = 0.4 // mitad de la parte recta de la cápsula
export const EYE_HEIGHT = 3.5 // altura de la cámara sobre el agua, en reposo
export const NAV_SMOOTHING = 5 // más alto = la cámara sigue más rápido
export const LOOK_AHEAD = 30 // a qué distancia delante mira la cámara
export const LOOK_DROP = 2.2 // cuánto más abajo que la cámara mira
export const LOOK_MAX_X = 6 // desvío horizontal máximo de la mirada
export const LOOK_MAX_Y = 2 // desvío vertical máximo de la mirada
export const LOOK_DEAD_ZONE = 0.15 // zona central del puntero que no desvía la mirada
export const LOOK_SMOOTHING = 4

// Estación: zona a lo largo de la carretera donde "llegas" a un proyecto.
export const STATION_HALF_LENGTH = 7
export const STATION_Z_OFFSET = 3 // centro de la zona, respecto al centro de la ciudad

// Navegación: margen antes de las paredes donde el visitante se detiene solo
// (así no empuja contra la pared y no rebota).
export const NAV_EDGE_MARGIN = 0.3
export const NAV_MAX_DELTA = 0.1 // tope del tiempo entre fotogramas, en segundos

// Cielo y sol visible (estética sunset). El sol es un disco con franjas, lejos
// en el horizonte y con su parte baja escondida bajo el agua.
export const SKY_RADIUS = 800
export const SUN_DISC_Z = -220
export const SUN_DISC_RADIUS = 40
// Altura del centro del disco sobre el agua. Con 0.45 del radio, su parte de
// abajo (la de las franjas) queda en parte tapada por el agua.
export const SUN_DISC_Y = SUN_DISC_RADIUS * 0.45
