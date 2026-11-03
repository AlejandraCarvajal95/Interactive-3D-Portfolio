import { useMemo } from 'react'
import { readCssVar } from '../utils/cssVar.js'
import './Road.css'

function Tile({ z, color, glow }) {
  return (
    <mesh position={[0, 0.02, z]}>
      <boxGeometry args={[4, 0.1, 3.2]} />
      <meshPhysicalMaterial
        color={color}
        emissive={glow}
        emissiveIntensity={0.35}
        metalness={0.2}
        roughness={0.25}
        envMapIntensity={1}
      />
    </mesh>
  )
}

export default function Road() {
  const colors = useMemo(
    () => ({
      tile: readCssVar('--road-tile-color'),
      glow: readCssVar('--road-tile-glow'),
    }),
    [],
  )

  return (
    <group>
      {Array.from({ length: 20 }, (_, i) => (
        <Tile
          key={i}
          z={-(i * 3.2 + 1.6)}
          color={colors.tile}
          glow={colors.glow}
        />
      ))}
    </group>
  )
}
