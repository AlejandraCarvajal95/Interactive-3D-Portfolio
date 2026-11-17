import { Html } from '@react-three/drei'
import { FRAME_DEPTH } from '../../../constants.js'
import './FrameInfo.css'

// Tarjeta del proyecto en HTML real dentro de la escena (<Html> de Drei). Se
// abre al hacer clic en el panel y se cierra con su botón.
//
// La pista "Clic para ver más" ya no es HTML sino texto 3D (ver GlassFrame):
// un elemento HTML que aparece y desaparece mientras se camina se crea de
// nuevo cada vez y, en su primer cuadro, se veía suelto en una esquina de la
// pantalla. Aquí la tarjeta entra con un fundido que arranca después de ese
// primer cuadro.
export default function FrameInfo({ name, description, opened, onClose }) {
  if (!opened) return null

  return (
    <Html position={[0, -0.2, FRAME_DEPTH / 2 + 0.05]} center distanceFactor={7}>
      <div className="frame-card">
        <h3>{name}</h3>
        <p>{description}</p>
        <button type="button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </Html>
  )
}
