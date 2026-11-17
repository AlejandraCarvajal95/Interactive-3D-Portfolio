import { BEADS } from '../data/orbs.js'
import Floating from './Floating.jsx'
import MatcapMaterial from './MatcapMaterial.jsx'

// Cuentas pequeñas con matcap, sueltas entre las burbujas. El matcap no usa
// luces, así que son casi gratis para el rendimiento (SCRUM-42).
export default function MatcapBeads() {
  return (
    <group name="matcap-beads">
      {BEADS.map(([x, y, z, radius], i) => (
        <Floating
          key={i}
          position={[x, y, z]}
          amplitude={0.15}
          sway={0.1}
          speed={0.8 + ((i * 17) % 7) / 10}
          phase={i * 2.1}
        >
          <mesh scale={radius} castShadow>
            <sphereGeometry args={[1, 24, 24]} />
            <MatcapMaterial />
          </mesh>
        </Floating>
      ))}
    </group>
  )
}
