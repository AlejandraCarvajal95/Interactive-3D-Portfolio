import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Hace flotar a sus hijos (HU-06).
//
// - Sube y baja con Math.sin(state.clock.elapsedTime): depende del tiempo
//   transcurrido, no de los fotogramas.
// - Se balancea de lado con una fase que va sumando `delta * speed`. `delta` es
//   el tiempo desde el fotograma anterior, así la velocidad es la misma a 60 Hz
//   que a 144 Hz.
//
// Importante: aquí se modifican las referencias directamente. Nunca se llama a
// setState dentro de useFrame (provocaría un render por fotograma).
export default function Floating({
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  amplitude = 0.2, // cuánto sube y baja
  sway = 0, // cuánto se balancea de lado
  speed = 1,
  phase = 0, // desfase, para que no floten todos a la vez
}) {
  const ref = useRef(null)
  const swayPhase = useRef(phase)

  useFrame((state, delta) => {
    const group = ref.current
    group.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed + phase) * amplitude

    swayPhase.current += delta * speed * 0.7
    group.position.x = position[0] + Math.cos(swayPhase.current) * sway
  })

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {children}
    </group>
  )
}
