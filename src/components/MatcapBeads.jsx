import { BEADS } from '../data/orbs.js'
import MatcapMaterial from './MatcapMaterial.jsx'

// Cuentas pequeñas con matcap, sueltas entre las burbujas. El matcap no usa
// luces, así que son casi gratis para el rendimiento (SCRUM-42).
export default function MatcapBeads() {
  return (
    <group name="matcap-beads">
      {BEADS.map(([x, y, z, radius], i) => (
        <mesh key={i} position={[x, y, z]} scale={radius} castShadow>
          <sphereGeometry args={[1, 24, 24]} />
          <MatcapMaterial />
        </mesh>
      ))}
    </group>
  )
}
