import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { MathUtils, Vector3 } from 'three'
import {
  EYE_HEIGHT,
  JUMP_IMPULSE,
  LOOK_AHEAD,
  LOOK_DROP,
  LOOK_MAX_X,
  LOOK_MAX_Y,
  LOOK_SMOOTHING,
  NAV_ACCEL,
  NAV_SMOOTHING,
  NAV_SPEED,
  NAV_START_Z,
  NAV_STRAFE_SPEED,
  ROAD_THICKNESS,
  ROAD_Y,
  WALKER_HALF_HEIGHT,
  WALKER_RADIUS,
} from '../../../constants.js'
import { useNavigationInput } from '../../../hooks/useNavigationInput.js'

// Altura del centro del cuerpo cuando está parado sobre la carretera.
const REST_Y = ROAD_Y + ROAD_THICKNESS / 2 + WALKER_HALF_HEIGHT + WALKER_RADIUS
// La cámara va por encima del cuerpo, a la altura de los ojos.
const EYE_OFFSET = EYE_HEIGHT - REST_Y

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

  useFrame((state, delta) => {
    const rigidBody = body.current
    if (!rigidBody) return

    // 1. Velocidad pedida: teclado + rueda. Avanzar es ir hacia -Z.
    const { forward, strafe, wheel } = readInput(delta)
    const targetZ = -(forward * NAV_SPEED + wheel)
    const targetX = strafe * NAV_STRAFE_SPEED

    // 2. Se acerca a esa velocidad poco a poco (arranca y frena suave).
    velocity.current.z = MathUtils.damp(velocity.current.z, targetZ, NAV_ACCEL, delta)
    velocity.current.x = MathUtils.damp(velocity.current.x, targetX, NAV_ACCEL, delta)
    rigidBody.setLinvel(
      { x: velocity.current.x, y: rigidBody.linvel().y, z: velocity.current.z },
      true,
    )

    if (!followCamera) return

    // 3. La cámara persigue al cuerpo. damp es un lerp independiente de los FPS.
    const { x, y, z } = rigidBody.translation()
    const { camera, pointer } = state
    camera.position.x = MathUtils.damp(camera.position.x, x, NAV_SMOOTHING, delta)
    camera.position.y = MathUtils.damp(camera.position.y, y + EYE_OFFSET, NAV_SMOOTHING, delta)
    camera.position.z = MathUtils.damp(camera.position.z, z, NAV_SMOOTHING, delta)

    // 4. Mira hacia adelante; el puntero desvía la mirada con un máximo.
    const look = lookAt.current
    look.x = MathUtils.damp(look.x, x + pointer.x * LOOK_MAX_X, LOOK_SMOOTHING, delta)
    look.y = MathUtils.damp(
      look.y,
      camera.position.y - LOOK_DROP + pointer.y * LOOK_MAX_Y,
      LOOK_SMOOTHING,
      delta,
    )
    look.z = camera.position.z - LOOK_AHEAD
    camera.lookAt(look)
  })

  return (
    <RigidBody
      ref={body}
      position={[0, REST_Y + 0.1, NAV_START_Z]}
      enabledRotations={[false, false, false]}
      colliders={false}
    >
      <CapsuleCollider args={[WALKER_HALF_HEIGHT, WALKER_RADIUS]} />
    </RigidBody>
  )
}
