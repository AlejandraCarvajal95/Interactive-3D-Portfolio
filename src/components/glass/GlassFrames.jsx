import {
  FRAME_TURN,
  FRAME_X,
  FRAME_Y,
  FRAME_Z_OFFSET,
} from '../../constants.js'
import { PROJECTS, sideSign } from '../../data/projects.js'
import GlassFrame from './GlassFrame.jsx'

// Un panel por proyecto, al lado de su mini-ciudad y corrido hacia quien viene
// por la carretera, para que la ciudad se vea de frente. Se gira hacia la
// carretera: el de la izquierda hacia +X y el de la derecha hacia -X.
export default function GlassFrames() {
  return (
    <group name="glass-frames">
      {PROJECTS.map(({ id, side, z }) => {
        const sign = sideSign(side)
        return (
          <GlassFrame
            key={id}
            name={`frame-${id}`}
            position={[sign * FRAME_X, FRAME_Y, z + FRAME_Z_OFFSET]}
            rotation={[0, -sign * FRAME_TURN, 0]}
          />
        )
      })}
    </group>
  )
}
