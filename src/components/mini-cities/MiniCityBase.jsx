import { useMemo } from 'react'
import { readCssVar } from '../../utils/cssVar.js'
import { CITY_SCALE } from '../../constants.js'
import { CITY_PARTS } from '../../data/cityParts.js'
import Primitive from '../Primitive.jsx'
import './MiniCityBase.css'

// Lo que comparten todas las mini-ciudades: la plataforma, los edificios y el
// resto de las formas. Cada proyecto la usa con su nombre, su posición y su
// color de acento.
export default function MiniCityBase({ name, position, accentVar }) {
  const colors = useMemo(
    () => ({
      platform: readCssVar('--city-platform-color'),
      building: readCssVar('--city-building-color'),
      orb: readCssVar('--city-orb-color'),
      accent: readCssVar(accentVar),
    }),
    [accentVar],
  )

  return (
    <group name={name} position={position} scale={CITY_SCALE}>
      {CITY_PARTS.map(({ id, shape, color, position, rotation, scale }) => (
        <Primitive
          key={id}
          shape={shape}
          color={colors[color]}
          position={position}
          rotation={rotation}
          scale={scale}
        />
      ))}
    </group>
  )
}
