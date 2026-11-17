import { PROJECT_BY_ID } from '../../../data/projects.js'
import MiniCityBase from '../MiniCityBase/MiniCityBase.jsx'
import './AppConductores.css'

// Proyecto: App Conductores (izquierda)
const { id, position, accentVar } = PROJECT_BY_ID['app-conductores']

export default function AppConductores() {
  return (
    <MiniCityBase
      name={id}
      position={position}
      accentVar={accentVar}
    />
  )
}
