import MiniCityBase from './MiniCityBase.jsx'
import './ConteoVehicular.css'

// Proyecto: Reporte Conteo Vehicular AI (izquierda)
const POSITION = [-9, 0, -48]

export default function ConteoVehicular() {
  return (
    <MiniCityBase
      name="conteo-vehicular"
      position={POSITION}
      accentVar="--city-conteo-vehicular-accent"
    />
  )
}
