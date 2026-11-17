import { Center, Text3D } from '@react-three/drei'
import Floating from '../../common/Floating/Floating.jsx'
import MatcapMaterial from '../../common/MatcapMaterial/MatcapMaterial.jsx'

const FONT_FILE = '/fonts/helvetiker_bold.typeface.json'
const POSITION = [0, 5.4, -12]

// Título con volumen (Text3D): letras extruidas con bisel que proyectan sombra.
// Text3D genera muchos polígonos; por eso se usa solo para este título corto y
// no para los textos de los paneles. Center lo centra, porque Text3D nace
// anclado en su esquina inferior izquierda.
export default function PortfolioTitle() {
  return (
    <Floating position={POSITION} amplitude={0.12} speed={0.6}>
      <Center>
        <Text3D
          font={FONT_FILE}
          size={1}
          height={0.3}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.03}
          bevelSegments={4}
          castShadow
        >
          PORTAFOLIO 3D
          <MatcapMaterial />
        </Text3D>
      </Center>
    </Floating>
  )
}
