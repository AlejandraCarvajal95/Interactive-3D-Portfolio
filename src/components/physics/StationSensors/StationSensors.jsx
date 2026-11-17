import { CuboidCollider } from '@react-three/rapier'
import {
  FRAME_Z_OFFSET,
  ROAD_WIDTH,
  STATION_HALF_LENGTH,
} from '../../../constants.js'
import { PROJECTS } from '../../../data/projects.js'

// Un sensor por estación. Un sensor (`sensor`) detecta cuándo entra o sale un
// cuerpo pero no lo frena. La zona va centrada en el panel de cada proyecto.
export default function StationSensors({ onEnter, onExit }) {
  return (
    <>
      {PROJECTS.map(({ id, z }) => (
        <CuboidCollider
          key={id}
          sensor
          args={[ROAD_WIDTH, 3, STATION_HALF_LENGTH]}
          position={[0, 2, z + FRAME_Z_OFFSET]}
          onIntersectionEnter={() => onEnter(id)}
          onIntersectionExit={() => onExit(id)}
        />
      ))}
    </>
  )
}
