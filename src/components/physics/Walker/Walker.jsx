import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { MathUtils, Vector3 } from 'three'
import {
  EYE_HEIGHT,
  JUMP_IMPULSE,
  LOOK_AHEAD,
  LOOK_DEAD_ZONE,
  LOOK_DROP,
  LOOK_MAX_X,
  LOOK_MAX_Y,
  LOOK_SMOOTHING,
  NAV_ACCEL,
  NAV_EDGE_MARGIN,
  NAV_MAX_DELTA,
  NAV_MAX_Z,
  NAV_MIN_Z,
  NAV_SMOOTHING,
  NAV_SPEED,
  NAV_START_Z,
  NAV_STRAFE_SPEED,
  ROAD_THICKNESS,
  ROAD_WIDTH,
  ROAD_Y,
  WALKER_HALF_HEIGHT,
  WALKER_RADIUS,
} from '../../../constants.js'
import { useNavigationInput } from '../../../hooks/useNavigationInput.js'

// Altura del centro del cuerpo cuando está parado sobre la carretera.
const REST_Y = ROAD_Y + ROAD_THICKNESS / 2 + WALKER_HALF_HEIGHT + WALKER_RADIUS
// La cámara va por encima del cuerpo, a la altura de los ojos.
const EYE_OFFSET = EYE_HEIGHT - REST_Y

// Hasta dónde puede llegar el centro del cuerpo antes de detenerse solo, a un
// margen de las paredes.
const MIN_Z = NAV_MIN_Z + WALKER_RADIUS + NAV_EDGE_MARGIN
const MAX_Z = NAV_MAX_Z - WALKER_RADIUS - NAV_EDGE_MARGIN
const MAX_X = ROAD_WIDTH / 2 - WALKER_RADIUS - NAV_EDGE_MARGIN

// El puntero cerca del centro de la pantalla no desvía la mirada; así la vista
// no se mueve sola cuando el mouse solo está quieto en la pantalla.
function withDeadZone(value) {
  const size = Math.max(0, Math.abs(value) - LOOK_DEAD_ZONE)
  return (Math.sign(value) * size) / (1 - LOOK_DEAD_ZONE)
}

// El visitante: un cuerpo físico (RigidBody dinámico) con una cápsula. Las
// paredes de RoadColliders no lo dejan salir de la carretera. La cámara sigue
// al cuerpo con suavizado (lerp).
//
// Regla de la física (Sesión 7): nunca se cambia la posición del cuerpo a mano;
// se le da una velocidad (setLinvel) o un impulso (applyImpulse).
export default function Walker({ followCamera = true }) {
  const body = useRef(null)
  const velocity = useRef({ x: 0, z: 0 })
  const lookAt = useRef(new Vector3(0, EYE_HEIGHT - LOOK_DROP, NAV_START_Z - LOOK_AHEAD))
  const readInput = useNavigationInput()
  const [subscribeKeys] = useKeyboardControls()

  // Salto: solo si está apoyado (no sube ni baja). El `true` despierta el
  // cuerpo si Rapier lo había dormido.
  useEffect(
    () =>
      subscribeKeys(
        (state) => state.jump,
        (pressed) => {
          const rigidBody = body.current
          if (pressed && rigidBody && Math.abs(rigidBody.linvel().y) < 0.1) {
            rigidBody.applyImpulse({ x: 0, y: JUMP_IMPULSE, z: 0 }, true)
          }
        },
      ),
    [subscribeKeys],
  )

  useFrame((state, frameDelta) => {
    const rigidBody = body.current
    if (!rigidBody) return

    // Si el navegador pausó la animación (otra pestaña, un tirón), el tiempo
    // entre fotogramas puede ser enorme: se limita para que nada salte.
    const delta = Math.min(frameDelta, NAV_MAX_DELTA)

    // 1. Velocidad pedida: teclado + rueda. Avanzar es ir hacia -Z.
    const { forward, strafe, wheel } = readInput(delta)
    const targetZ = -(forward * NAV_SPEED + wheel)
    const targetX = strafe * NAV_STRAFE_SPEED

    // 2. Se acerca a esa velocidad poco a poco (arranca y frena suave).
    velocity.current.z = MathUtils.damp(velocity.current.z, targetZ, NAV_ACCEL, delta)
    velocity.current.x = MathUtils.damp(velocity.current.x, targetX, NAV_ACCEL, delta)

    // 2b. Cerca de un límite se frena solo, en vez de empujar contra la pared
    // (empujar y rebotar hacía que la cámara temblara).
    const { x, y, z } = rigidBody.translation()
    const speed = velocity.current
    if ((z <= MIN_Z && speed.z < 0) || (z >= MAX_Z && speed.z > 0)) speed.z = 0
    if ((x <= -MAX_X && speed.x < 0) || (x >= MAX_X && speed.x > 0)) speed.x = 0

    rigidBody.setLinvel({ x: speed.x, y: rigidBody.linvel().y, z: speed.z }, true)

    if (!followCamera) return

    // 3. La cámara persigue al cuerpo. damp es un lerp independiente de los FPS.
    const { camera, pointer } = state
    camera.position.x = MathUtils.damp(camera.position.x, x, NAV_SMOOTHING, delta)
    camera.position.y = MathUtils.damp(camera.position.y, y + EYE_OFFSET, NAV_SMOOTHING, delta)
    camera.position.z = MathUtils.damp(camera.position.z, z, NAV_SMOOTHING, delta)

    // 4. Mira hacia adelante; el puntero desvía la mirada con un máximo.
    const look = lookAt.current
    look.x = MathUtils.damp(look.x, x + withDeadZone(pointer.x) * LOOK_MAX_X, LOOK_SMOOTHING, delta)
    look.y = MathUtils.damp(
      look.y,
      camera.position.y - LOOK_DROP + withDeadZone(pointer.y) * LOOK_MAX_Y,
      LOOK_SMOOTHING,
      delta,
    )
    look.z = camera.position.z - LOOK_AHEAD
    camera.lookAt(look)
  })

  return (
    <RigidBody
      ref={body}
      position={[0, REST_Y + 0.02, NAV_START_Z]}
      enabledRotations={[false, false, false]}
      colliders={false}
    >
      <CapsuleCollider args={[WALKER_HALF_HEIGHT, WALKER_RADIUS]} />
    </RigidBody>
  )
}
