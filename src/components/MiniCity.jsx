import { useMemo } from 'react'
import { readCssVar } from '../utils/cssVar.js'
import { CITY_PARTS } from '../data/cityParts.js'
import Primitive from './Primitive.jsx'
import './MiniCity.css'

export default function MiniCity({ accentVar = '--city-1-accent' }) {
  const colors = useMemo(
    () => ({
      platform: readCssVar('--city-platform-color'),
      building: readCssVar('--city-building-color'),
      orb: readCssVar('--city-orb-color'),
      accent: readCssVar(accentVar),
    }),
    [accentVar],
  )

  return CITY_PARTS.map(({ id, shape, color, position, rotation, scale }) => (
    <Primitive
      key={id}
      shape={shape}
      color={colors[color]}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  ))
}
