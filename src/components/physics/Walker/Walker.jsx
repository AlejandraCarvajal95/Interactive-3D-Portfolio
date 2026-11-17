import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { MathUtils } from 'three'
import {
  EYE_HEIGHT,
  JUMP_IMPULSE,
  DRAG_SENSITIVITY,
  LOOK_MAX_PITCH,
  LOOK_SMOOTHING,
  LOOK_START_PITCH,
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
  TURN_SPEED,
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

// El visitante: un cuerpo físico (RigidBody dinámico) con una cápsula. Las
// paredes de RoadColliders no lo dejan salir de la carretera. La cámara sigue
// al cuerpo con suavizado (lerp).
//
// Regla de la física (Sesión 7): nunca se cambia la posición del cuerpo a mano;
// se le da una velocidad (setLinvel) o un impulso (applyImpulse).
export default function Walker({ followCamera = true }) {
  const body = useRef(null)
  const velocity = useRef({ x: 0, z: 0 })
  // Hacia dónde se mira: giro a los lados (yaw) e inclinación (pitch), en
  // radianes. `view` es el giro que muestra la cámara; sigue a `look` con
  // suavizado.
  const look = useRef({ yaw: 0, pitch: LOOK_START_PITCH })
  const view = useRef({ yaw: 0, pitch: LOOK_START_PITCH })
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

    // 1. Giro: Q/E o flechas laterales, y arrastre con el clic presionado.
    const { forward, strafe, turn, dragX, dragY, wheel } = readInput(delta)
    look.current.yaw -= turn * TURN_SPEED * delta + dragX * DRAG_SENSITIVITY
    look.current.pitch = MathUtils.clamp(
      look.current.pitch - dragY * DRAG_SENSITIVITY,
      -LOOK_MAX_PITCH,
      LOOK_MAX_PITCH,
    )

    // 2. Velocidad pedida según hacia dónde se mira: W/S y la rueda van al
    // frente, A/D de lado. Mirando al frente, "adelante" es -Z.
    const { yaw } = look.current
    const ahead = forward * NAV_SPEED + wheel
    const side = strafe * NAV_STRAFE_SPEED
    const targetX = -Math.sin(yaw) * ahead + Math.cos(yaw) * side
    const targetZ = -Math.cos(yaw) * ahead - Math.sin(yaw) * side

    // 3. Se acerca a esa velocidad poco a poco (arranca y frena suave).
    velocity.current.z = MathUtils.damp(velocity.current.z, targetZ, NAV_ACCEL, delta)
    velocity.current.x = MathUtils.damp(velocity.current.x, targetX, NAV_ACCEL, delta)

    // 3b. Cerca de un límite se frena solo, en vez de empujar contra la pared
    // (empujar y rebotar hacía que la cámara temblara).
    const { x, y, z } = rigidBody.translation()
    const speed = velocity.current
    if ((z <= MIN_Z && speed.z < 0) || (z >= MAX_Z && speed.z > 0)) speed.z = 0
    if ((x <= -MAX_X && speed.x < 0) || (x >= MAX_X && speed.x > 0)) speed.x = 0

    rigidBody.setLinvel({ x: speed.x, y: rigidBody.linvel().y, z: speed.z }, true)

    if (!followCamera) return

    // 4. La cámara persigue al cuerpo. damp es un lerp independiente de los FPS.
    const { camera } = state
    camera.position.x = MathUtils.damp(camera.position.x, x, NAV_SMOOTHING, delta)
    camera.position.y = MathUtils.damp(camera.position.y, y + EYE_OFFSET, NAV_SMOOTHING, delta)
    camera.position.z = MathUtils.damp(camera.position.z, z, NAV_SMOOTHING, delta)

    // 5. La vista sigue el giro pedido, con suavizado. El orden 'YXZ' gira
    // primero a los lados y después inclina, como una cabeza.
    const shown = view.current
    shown.yaw = MathUtils.damp(shown.yaw, look.current.yaw, LOOK_SMOOTHING, delta)
    shown.pitch = MathUtils.damp(shown.pitch, look.current.pitch, LOOK_SMOOTHING, delta)
    camera.rotation.set(shown.pitch, shown.yaw, 0, 'YXZ')
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
