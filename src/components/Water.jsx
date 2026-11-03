import { useMemo } from 'react'
import { CanvasTexture, RepeatWrapping } from 'three'
import { readCssVar } from '../utils/cssVar.js'
import './Water.css'

const TWO_PI = Math.PI * 2

function createRippleTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const image = ctx.createImageData(size, size)

  // Relieve suave: suma de tres ondas. Los ciclos son enteros para que la
  // textura se repita sin costuras.
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size
      const v = y / size
      const height =
        0.5 +
        0.22 * Math.sin(TWO_PI * (2 * u + 6 * v)) +
        0.16 * Math.sin(TWO_PI * (3 * u - 11 * v + 0.3)) +
        0.1 * Math.sin(TWO_PI * (1 * u + 17 * v + 0.7))
      const value = Math.round(height * 255)
      const i = (y * size + x) * 4
      image.data[i] = value
      image.data[i + 1] = value
      image.data[i + 2] = value
      image.data[i + 3] = 255
    }
  }
  ctx.putImageData(image, 0, 0)

  const texture = new CanvasTexture(canvas)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(5, 20)
  texture.anisotropy = 8
  return texture
}

const rippleTexture = createRippleTexture()

export default function Water() {
  const color = useMemo(() => readCssVar('--water-color'), [])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
      <planeGeometry args={[500, 500]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.1}
        roughness={0.06}
        envMapIntensity={1.2}
        bumpMap={rippleTexture}
        bumpScale={0.35}
      />
    </mesh>
  )
}
