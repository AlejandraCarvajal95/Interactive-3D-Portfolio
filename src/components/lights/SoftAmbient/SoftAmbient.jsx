import { useMemo } from 'react'
import { readCssVar } from '../../../utils/cssVar.js'
import './SoftAmbient.css'

// Luz ambiental lavanda: ilumina todo por igual para que las caras que no
// reciben el sol no queden negras.
export default function SoftAmbient() {
  const { color, intensity } = useMemo(
    () => ({
      color: readCssVar('--ambient-color'),
      intensity: Number(readCssVar('--ambient-intensity')),
    }),
    [],
  )

  return <ambientLight color={color} intensity={intensity} />
}
