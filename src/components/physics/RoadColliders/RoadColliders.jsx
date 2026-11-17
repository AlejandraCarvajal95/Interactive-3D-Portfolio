import { CuboidCollider, RigidBody } from '@react-three/rapier'
import {
  NAV_MAX_Z,
  NAV_MIN_Z,
  ROAD_LENGTH,
  ROAD_START_Z,
  ROAD_THICKNESS,
  ROAD_WIDTH,
  ROAD_Y,
} from '../../../constants.js'

const WALL = 0.5 // grosor de las paredes
const WALL_HALF_HEIGHT = 2
const MID_Z = (NAV_MAX_Z + NAV_MIN_Z) / 2
const HALF_LENGTH = (NAV_MAX_Z - NAV_MIN_Z) / 2

// Colliders fijos (RigidBody type="fixed"): no se mueven nunca. Son invisibles;
// con ?physics se ven en verde. Los args de un CuboidCollider son la MITAD de
// cada medida.
//   - el suelo: la carretera
//   - dos paredes a los costados de la carretera
//   - dos paredes en los extremos del recorrido
export default function RoadColliders() {
  const side = ROAD_WIDTH / 2 + WALL

  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider
        args={[ROAD_WIDTH / 2, ROAD_THICKNESS / 2, ROAD_LENGTH / 2]}
        position={[0, ROAD_Y, ROAD_START_Z - ROAD_LENGTH / 2]}
      />
      <CuboidCollider
        args={[WALL, WALL_HALF_HEIGHT, HALF_LENGTH]}
        position={[-side, WALL_HALF_HEIGHT, MID_Z]}
      />
      <CuboidCollider
        args={[WALL, WALL_HALF_HEIGHT, HALF_LENGTH]}
        position={[side, WALL_HALF_HEIGHT, MID_Z]}
      />
      <CuboidCollider
        args={[ROAD_WIDTH / 2 + WALL * 2, WALL_HALF_HEIGHT, WALL]}
        position={[0, WALL_HALF_HEIGHT, NAV_MAX_Z + WALL]}
      />
      <CuboidCollider
        args={[ROAD_WIDTH / 2 + WALL * 2, WALL_HALF_HEIGHT, WALL]}
        position={[0, WALL_HALF_HEIGHT, NAV_MIN_Z - WALL]}
      />
    </RigidBody>
  )
}
