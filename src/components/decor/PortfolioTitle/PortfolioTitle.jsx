import { useLayoutEffect, useMemo, useRef } from 'react'
import { Center, Text3D } from '@react-three/drei'
import { CanvasTexture, Color, Float32BufferAttribute, SRGBColorSpace } from 'three'
import { TITLE_POSITION, TITLE_SIZE, TITLE_TEXT } from '../../../constants.js'
import { readCssVar } from '../../../utils/cssVar.js'
import Floating from '../../common/Floating/Floating.jsx'
import './PortfolioTitle.css'

const FONT_FILE = '/fonts/helvetiker_bold.typeface.json'

// Matcap gris: solo aporta el sombreado (brillo arriba a la izquierda, borde
// oscuro). El color lo ponen los colores de los vértices, así el título puede
// ir de cian a aguamarina.
function createShadingTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createRadialGradient(size * 0.4, size * 0.33, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, '#ffffff')
  gradient.addColorStop(0.45, '#d8d8d8')
  gradient.addColorStop(0.85, '#8a8a8a')
  gradient.addColorStop(1, '#4a4a4a')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

// Título con volumen (Text3D): letras extruidas con bisel. No proyecta sombra:
// flotando sobre la carretera, su sombra se vería rara.
// Text3D genera muchos polígonos; por eso se usa solo para este título corto y
// no para los textos de los paneles. Center lo centra, porque Text3D nace
// anclado en su esquina inferior izquierda.
export default function PortfolioTitle() {
  const textRef = useRef(null)
  const shading = useMemo(() => createShadingTexture(), [])

  // Degradado de izquierda a derecha: a cada vértice se le da un color según su
  // posición horizontal.
  useLayoutEffect(() => {
    const geometry = textRef.current.geometry
    geometry.computeBoundingBox()
    const { min, max } = geometry.boundingBox
    const from = new Color(readCssVar('--title-cyan'))
    const to = new Color(readCssVar('--title-aqua'))
    const mix = new Color()
    const position = geometry.attributes.position
    const colors = []

    for (let i = 0; i < position.count; i++) {
      mix.lerpColors(from, to, (position.getX(i) - min.x) / (max.x - min.x))
      colors.push(mix.r, mix.g, mix.b)
    }
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
  }, [])

  return (
    <Floating position={TITLE_POSITION} amplitude={0.12} speed={0.6}>
      <Center>
        <Text3D
          ref={textRef}
          font={FONT_FILE}
          size={TITLE_SIZE}
          height={0.25}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.03}
          bevelSegments={4}
        >
          {TITLE_TEXT}
          <meshMatcapMaterial matcap={shading} vertexColors toneMapped={false} />
        </Text3D>
      </Center>
    </Floating>
  )
}
