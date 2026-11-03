import { useMemo } from 'react'
import { readCssVar } from '../utils/cssVar.js'
import './Fog.css'

// Niebla del color del cielo: funde la carretera y el agua con el horizonte
// para que no se vea dónde terminan.
export default function Fog() {
  const color = useMemo(() => readCssVar('--fog-color'), [])

  return <fog attach="fog" args={[color, 20, 110]} />
}
