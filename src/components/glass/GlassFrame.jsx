import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text, useCursor } from '@react-three/drei'
import { MathUtils } from 'three'
import { FRAME_DEPTH, FRAME_HEIGHT, FRAME_WIDTH } from '../../constants.js'
import { readCssVar } from '../../utils/cssVar.js'
import FrameInfo from './FrameInfo.jsx'
import GlassMaterial from './GlassMaterial.jsx'
import './GlassFrame.css'

const FONT_FILE = '/fonts/poppins-600.woff'
const HOVER_SCALE = 1.06
const SCALE_SPEED = 8 // qué tan rápido crece al pasar el cursor

// Un panel de cristal con las esquinas redondeadas: la guía de una estación.
// Muestra el nombre del proyecto, crece al pasar el cursor y, al hacer clic,
// abre una tarjeta con la descripción. Quien lo coloca (Floating) le da la
// posición y la rotación.
export default function GlassFrame({ id, name, description, active = false }) {
  const [hovered, setHovered] = useState(false)
  const [opened, setOpened] = useState(false)
  const scaleRef = useRef(null)
  // Resaltado: con el cursor encima o cuando el visitante llegó a su estación
  // (lo detecta el sensor de física).
  const highlighted = hovered || active
  const textColor = useMemo(() => readCssVar('--frame-text-color'), [])

  // Cambia el cursor a "pointer" mientras el puntero está sobre el panel.
  useCursor(hovered)

  // Crece o encoge con suavizado. damp es un lerp independiente de los FPS.
  useFrame((_, delta) => {
    const target = highlighted ? HOVER_SCALE : 1
    const scale = MathUtils.damp(scaleRef.current.scale.x, target, SCALE_SPEED, delta)
    scaleRef.current.scale.setScalar(scale)
  })

  // Los eventos van en el grupo: así cubren el cristal y el texto. Con
  // stopPropagation el rayo no activa lo que hay detrás.
  const handleOver = (event) => {
    event.stopPropagation()
    setHovered(true)
  }
  const handleOut = () => setHovered(false)
  const handleClick = (event) => {
    event.stopPropagation()
    setOpened((value) => !value)
  }

  return (
    <group name={`frame-${id}`}>
      <group
        ref={scaleRef}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={handleClick}
      >
        <RoundedBox
          args={[FRAME_WIDTH, FRAME_HEIGHT, FRAME_DEPTH]}
          radius={0.12}
          smoothness={4}
        >
          <GlassMaterial variant="panel" />
        </RoundedBox>
        <Text
          font={FONT_FILE}
          fontSize={0.42}
          maxWidth={FRAME_WIDTH - 0.8}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          position={[0, 0.3, FRAME_DEPTH / 2 + 0.02]}
          color={textColor}
        >
          {name}
        </Text>
        <FrameInfo
          name={name}
          description={description}
          hovered={highlighted}
          opened={opened}
          onClose={() => setOpened(false)}
        />
      </group>
    </group>
  )
}
