import { useMemo } from 'react'
import { CanvasTexture, SRGBColorSpace } from 'three'
import {
  SUN_DISC_RADIUS,
  SUN_DISC_Y,
  SUN_DISC_Z,
} from '../../../constants.js'
import { readCssVar } from '../../../utils/cssVar.js'
import './SunDisc.css'

const SIZE = 512
const STRIPES = 7

function createCanvas() {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  return canvas
}

function toTexture(canvas) {
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

// El disco: un círculo con degradado de amarillo a rosa y franjas horizontales
// en su mitad de abajo, cada vez más gruesas (el sol retro de las referencias).
// Las franjas se "borran" del círculo y se ve el cielo a través.
function createDiscTexture() {
  const canvas = createCanvas()
  const ctx = canvas.getContext('2d')

  ctx.beginPath()
  ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2)
  ctx.clip()

  const gradient = ctx.createLinearGradient(0, 0, 0, SIZE)
  gradient.addColorStop(0, readCssVar('--sun-disc-top'))
  gradient.addColorStop(0.5, readCssVar('--sun-disc-mid'))
  gradient.addColorStop(1, readCssVar('--sun-disc-bottom'))
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, SIZE, SIZE)

  ctx.globalCompositeOperation = 'destination-out'
  for (let i = 0; i < STRIPES; i++) {
    const t = (i + 0.5) / STRIPES
    const y = SIZE * (0.42 + 0.5 * t)
    const height = SIZE * (0.012 + 0.036 * t)
    ctx.fillRect(0, y - height / 2, SIZE, height)
  }

  return toTexture(canvas)
}

// El sol del atardecer (sin resplandor: el cielo se ve limpio alrededor). Está lejos y su parte de abajo queda tapada por el
// agua (el agua está en primer plano y oculta lo que está debajo de ella), así
// parece que se hunde en el horizonte. No le afectan la niebla ni los colores
// de la escena (fog y toneMapped en false).
export default function SunDisc() {
  const disc = useMemo(() => createDiscTexture(), [])
  const position = [0, SUN_DISC_Y, SUN_DISC_Z]

  return (
    <group name="sun-disc" position={position}>
      <mesh>
        <planeGeometry args={[SUN_DISC_RADIUS * 2, SUN_DISC_RADIUS * 2]} />
        <meshBasicMaterial
          map={disc}
          transparent
          depthWrite={false}
          fog={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
