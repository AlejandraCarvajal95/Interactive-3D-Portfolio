import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BackSide, CanvasTexture, SRGBColorSpace } from 'three'
import { SKY_RADIUS } from '../../../constants.js'
import { readCssVar } from '../../../utils/cssVar.js'
import './SkyDome.css'

const HEIGHT = 512

// Degradado vertical de arriba hacia abajo. En una esfera, el alto de la
// textura equivale al ángulo: el horizonte (0°) queda justo a la mitad y la
// cámara solo ve unos 25° hacia arriba, así que los colores se concentran en
// esa franja. Cada número es "qué parte de la textura" (0 = cenit, 0.5 =
// horizonte).
function createSkyTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 4
  canvas.height = HEIGHT
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  gradient.addColorStop(0, readCssVar('--sky-top'))
  gradient.addColorStop(0.3, readCssVar('--sky-top'))
  gradient.addColorStop(0.37, readCssVar('--sky-blue'))
  gradient.addColorStop(0.43, readCssVar('--sky-violet'))
  gradient.addColorStop(0.47, readCssVar('--sky-pink'))
  gradient.addColorStop(0.5, readCssVar('--sky-horizon'))
  gradient.addColorStop(1, readCssVar('--sky-horizon'))
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 4, HEIGHT)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

// El cielo: una esfera enorme vista desde adentro. Se pinta en 3D (y no con un
// fondo CSS) para que el degradado siempre coincida con el horizonte, mires
// hacia arriba o hacia abajo. Sigue a la cámara para que nunca se acabe.
export default function SkyDome() {
  const ref = useRef(null)
  const texture = useMemo(() => createSkyTexture(), [])

  useFrame((state) => {
    ref.current.position.x = state.camera.position.x
    ref.current.position.z = state.camera.position.z
  })

  return (
    <mesh ref={ref} renderOrder={-1}>
      <sphereGeometry args={[SKY_RADIUS, 32, 32]} />
      <meshBasicMaterial
        map={texture}
        side={BackSide}
        fog={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}
