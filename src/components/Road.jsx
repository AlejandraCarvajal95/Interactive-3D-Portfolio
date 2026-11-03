import { useMemo } from 'react'
import { Edges } from '@react-three/drei'
import { readCssVar } from '../utils/cssVar.js'
import './Road.css'

function Tile({ z, color, glow, grid }) {
  return (
    <mesh position={[0, 0.02, z]}>
      <boxGeometry args={[2.4, 0.1, 3.2]} />
      <meshPhysicalMaterial
        color={color}
        emissive={glow}
        emissiveIntensity={0.35}
        metalness={0.2}
        roughness={0.25}
        envMapIntensity={1}
      />
      <Edges color={grid} lineWidth={2} fog />
    </mesh>
  )
}

export default function Road() {
  const colors = useMemo(
    () => ({
      tile: readCssVar('--road-tile-color'),
      glow: readCssVar('--road-tile-glow'),
      grid: readCssVar('--road-grid-color'),
      rail: readCssVar('--road-rail-color'),
    }),
    [],
  )

  return (
    <group>
      {Array.from({ length: 40 }, (_, i) => (
        <Tile
          key={i}
          z={-((i - 3) * 3.2 + 1.6)}
          color={colors.tile}
          glow={colors.glow}
          grid={colors.grid}
        />
      ))}
      {[-1.3, 1.3].map((x) => (
        <mesh key={x} position={[x, 0.12, -54.4]}>
          <boxGeometry args={[0.08, 0.08, 128]} />
          <meshBasicMaterial color={colors.rail} />
        </mesh>
      ))}
    </group>
  )
}
