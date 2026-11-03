import { useMemo } from 'react'
import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three'
import { readCssVar } from '../utils/cssVar.js'
import {
  ROAD_LENGTH,
  ROAD_START_Z,
  ROAD_THICKNESS,
  ROAD_WIDTH,
  ROAD_Y,
  TILE_SIZE,
} from '../constants.js'
import './Road.css'

const TILES_PER_SIDE = ROAD_WIDTH / TILE_SIZE
const TEXTURE_SIZE = 1024

// Generador pseudoaleatorio con semilla: el mármol se ve igual en cada carga.
function createRandom(seed) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

// Una "hoja" de 6x6 baldosas de mármol blanco con juntas finas. Cada baldosa
// varía un poco de claridad y tiene una veta suave.
function createMarbleTexture({ tile, grout, vein }) {
  const random = createRandom(7)
  const canvas = document.createElement('canvas')
  canvas.width = TEXTURE_SIZE
  canvas.height = TEXTURE_SIZE
  const ctx = canvas.getContext('2d')
  const step = TEXTURE_SIZE / TILES_PER_SIDE

  ctx.fillStyle = tile
  ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE)

  for (let row = 0; row < TILES_PER_SIDE; row++) {
    for (let col = 0; col < TILES_PER_SIDE; col++) {
      const x = col * step
      const y = row * step

      ctx.fillStyle = `rgba(120, 110, 140, ${random() * 0.1})`
      ctx.fillRect(x, y, step, step)

      ctx.save()
      ctx.beginPath()
      ctx.rect(x, y, step, step)
      ctx.clip()
      ctx.strokeStyle = vein
      ctx.globalAlpha = 0.35
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(x + random() * step, y)
      ctx.bezierCurveTo(
        x + random() * step,
        y + step * 0.35,
        x + random() * step,
        y + step * 0.65,
        x + random() * step,
        y + step,
      )
      ctx.stroke()
      ctx.restore()
    }
  }

  ctx.strokeStyle = grout
  ctx.lineWidth = 6
  for (let i = 0; i <= TILES_PER_SIDE; i++) {
    const p = i * step
    ctx.beginPath()
    ctx.moveTo(p, 0)
    ctx.lineTo(p, TEXTURE_SIZE)
    ctx.moveTo(0, p)
    ctx.lineTo(TEXTURE_SIZE, p)
    ctx.stroke()
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(1, ROAD_LENGTH / ROAD_WIDTH)
  texture.anisotropy = 16
  return texture
}

export default function Road() {
  const marble = useMemo(
    () =>
      createMarbleTexture({
        tile: readCssVar('--road-tile-color'),
        grout: readCssVar('--road-grout-color'),
        vein: readCssVar('--road-vein-color'),
      }),
    [],
  )

  return (
    <mesh position={[0, ROAD_Y, ROAD_START_Z - ROAD_LENGTH / 2]}>
      <boxGeometry args={[ROAD_WIDTH, ROAD_THICKNESS, ROAD_LENGTH]} />
      <meshStandardMaterial
        map={marble}
        roughness={0.45}
        metalness={0}
        envMapIntensity={0.7}
      />
    </mesh>
  )
}
