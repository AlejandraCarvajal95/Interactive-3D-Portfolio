import { Html } from '@react-three/drei'
import { FRAME_DEPTH } from '../../constants.js'
import './FrameInfo.css'

// Información del proyecto en HTML real dentro de la escena (<Html> de Drei).
// - Al pasar el cursor: una pista.
// - Al hacer clic: una tarjeta con la descripción y un botón para cerrarla.
export default function FrameInfo({ name, description, hovered, opened, onClose }) {
  if (!hovered && !opened) return null

  return (
    <Html
      position={[0, -0.55, FRAME_DEPTH / 2 + 0.05]}
      center
      distanceFactor={7}
      pointerEvents={opened ? 'auto' : 'none'}
    >
      {opened ? (
        <div className="frame-card">
          <h3>{name}</h3>
          <p>{description}</p>
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      ) : (
        <div className="frame-hint">Clic para ver más</div>
      )}
    </Html>
  )
}
