import { ORBS } from '../../../data/orbs.js'
import Floating from '../../common/Floating/Floating.jsx'
import GlassMaterial from '../GlassMaterial/GlassMaterial.jsx'

// Burbujas de vidrio de varios tamaños alrededor de la carretera. Cada una
// flota con su propio ritmo; las grandes se mueven más.
export default function GlassBubbles() {
  return (
    <group name="glass-bubbles">
      {ORBS.map(([x, y, z, radius], i) => (
        <Floating
          key={i}
          position={[x, y, z]}
          amplitude={0.1 + radius * 0.3}
          sway={0.05 + radius * 0.2}
          speed={0.5 + ((i * 37) % 10) / 12}
          phase={i * 1.3}
        >
          <mesh scale={radius}>
            <sphereGeometry args={[1, 32, 32]} />
            <GlassMaterial variant="bubble" />
          </mesh>
        </Floating>
      ))}
    </group>
  )
}
