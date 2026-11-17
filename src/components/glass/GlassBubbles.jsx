import { ORBS } from '../../data/orbs.js'
import GlassMaterial from './GlassMaterial.jsx'

// Burbujas de vidrio de varios tamaños alrededor de la carretera. En HU-06
// flotan.
export default function GlassBubbles() {
  return (
    <group name="glass-bubbles">
      {ORBS.map(([x, y, z, radius], i) => (
        <mesh key={i} position={[x, y, z]} scale={radius}>
          <sphereGeometry args={[1, 32, 32]} />
          <GlassMaterial variant="bubble" />
        </mesh>
      ))}
    </group>
  )
}
