import { OrbitControls } from '@react-three/drei'

// Cámara libre solo para revisar la escena. Se monta únicamente en modo debug
// (ver utils/debug.js).
export default function DebugControls({ target }) {
  return <OrbitControls target={target} makeDefault />
}
