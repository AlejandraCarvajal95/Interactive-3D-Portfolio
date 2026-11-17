import { PROJECT_BY_ID } from '../../../data/projects.js'
import MiniCityBase from '../MiniCityBase/MiniCityBase.jsx'
import './ConteoVehicular.css'

// Proyecto: Reporte Conteo Vehicular AI (izquierda)
const { id, position, accentVar } = PROJECT_BY_ID['conteo-vehicular']

export default function ConteoVehicular() {
  return (
    <MiniCityBase
      name={id}
      position={position}
      accentVar={accentVar}
    />
  )
}
