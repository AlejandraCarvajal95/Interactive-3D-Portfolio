import { useMemo } from 'react'
import { NAV_MIN_Z, WATER_Y } from '../../../constants.js'
import { readCssVar } from '../../../utils/cssVar.js'
import './ShadowCatcher.css'

// Zona que cubre la capa: la misma donde la luz calcula sombras (ver SunLight).
const WIDTH = 60
const LENGTH = 100
const CENTER_Z = NAV_MIN_Z / 2 + 10

// Una capa transparente sobre el agua que solo dibuja las sombras. El agua se
// ilumina sobre todo con el reflejo del cielo, que no cambia con la sombra, así
// que sus sombras casi no se notaban. Con esta capa el color y la intensidad de
// la sombra se controlan desde el CSS (--shadow-color y --shadow-opacity).
export default function ShadowCatcher() {
  const color = useMemo(() => readCssVar('--shadow-color'), [])
  const opacity = useMemo(() => Number(readCssVar('--shadow-opacity')), [])

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, WATER_Y + 0.02, CENTER_Z]}
      receiveShadow
    >
      <planeGeometry args={[WIDTH, LENGTH]} />
      <shadowMaterial color={color} opacity={opacity} transparent />
    </mesh>
  )
}
