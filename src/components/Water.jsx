import { CanvasTexture, RepeatWrapping } from 'three'

function createRippleTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 320; i++) {
    ctx.fillStyle =
      Math.random() > 0.5 ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
    ctx.fillRect(Math.random() * size, Math.random() * size, 30 + Math.random() * 110, 2)
  }

  const texture = new CanvasTexture(canvas)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(10, 120)
  texture.anisotropy = 8
  return texture
}

const rippleTexture = createRippleTexture()

export default function Water() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
      <planeGeometry args={[500, 500]} />
      <meshPhysicalMaterial
        color="#18aeb4"
        metalness={0.1}
        roughness={0.06}
        envMapIntensity={1.2}
        bumpMap={rippleTexture}
        bumpScale={0.35}
      />
    </mesh>
  )
}
