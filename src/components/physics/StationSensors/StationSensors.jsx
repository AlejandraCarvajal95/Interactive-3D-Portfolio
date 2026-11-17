import { CuboidCollider } from '@react-three/rapier'
import {
  ROAD_WIDTH,
  STATION_HALF_LENGTH,
  STATION_Z_OFFSET,
} from '../../../constants.js'
import { PROJECTS } from '../../../data/projects.js'

// Un sensor por estación. Un sensor (`sensor`) detecta cuándo entra o sale un
// cuerpo pero no lo frena. La zona cubre la ciudad y su panel.
export default function StationSensors({ onEnter, onExit }) {
  return (
    <>
      {PROJECTS.map(({ id, z }) => (
        <CuboidCollider
          key={id}
          sensor
          args={[ROAD_WIDTH, 3, STATION_HALF_LENGTH]}
          position={[0, 2, z + STATION_Z_OFFSET]}
          onIntersectionEnter={() => onEnter(id)}
          onIntersectionExit={() => onExit(id)}
        />
      ))}
    </>
  )
}
