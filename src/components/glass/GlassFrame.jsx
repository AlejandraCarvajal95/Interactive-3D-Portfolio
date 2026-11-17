import { RoundedBox } from '@react-three/drei'
import { FRAME_DEPTH, FRAME_HEIGHT, FRAME_WIDTH } from '../../constants.js'
import GlassMaterial from './GlassMaterial.jsx'

// Un panel de cristal con las esquinas redondeadas. El grosor y el borde
// redondeado son lo que da el brillo en los bordes.
export default function GlassFrame({ name, position, rotation }) {
  return (
    <group name={name} position={position} rotation={rotation}>
      <RoundedBox
        args={[FRAME_WIDTH, FRAME_HEIGHT, FRAME_DEPTH]}
        radius={0.12}
        smoothness={4}
      >
        <GlassMaterial variant="panel" />
      </RoundedBox>
    </group>
  )
}
