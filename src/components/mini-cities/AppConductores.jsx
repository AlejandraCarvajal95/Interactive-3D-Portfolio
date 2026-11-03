import MiniCityBase from './MiniCityBase.jsx'
import './AppConductores.css'

// Proyecto: App Conductores (izquierda)
const POSITION = [-9, 0, -14]

export default function AppConductores() {
  return (
    <MiniCityBase
      name="app-conductores"
      position={POSITION}
      accentVar="--city-app-conductores-accent"
    />
  )
}
