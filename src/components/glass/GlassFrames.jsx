import {
  FRAME_TURN,
  FRAME_X,
  FRAME_Y,
  FRAME_Z_OFFSET,
} from '../../constants.js'
import { PROJECTS, sideSign } from '../../data/projects.js'
import Floating from '../Floating.jsx'
import GlassFrame from './GlassFrame.jsx'

// Un panel por proyecto, al lado de su mini-ciudad y corrido hacia quien viene
// por la carretera, para que la ciudad se vea de frente. Se gira hacia la
// carretera: el de la izquierda hacia +X y el de la derecha hacia -X. Flotan
// muy suavemente.
export default function GlassFrames({ activeId }) {
  return (
    <group name="glass-frames">
      {PROJECTS.map(({ id, name, description, side, z }, i) => {
        const sign = sideSign(side)
        return (
          <Floating
            key={id}
            position={[sign * FRAME_X, FRAME_Y, z + FRAME_Z_OFFSET]}
            rotation={[0, -sign * FRAME_TURN, 0]}
            amplitude={0.06}
            speed={0.7}
            phase={i * 2}
          >
            <GlassFrame
              id={id}
              name={name}
              description={description}
              active={activeId === id}
            />
          </Floating>
        )
      })}
    </group>
  )
}
