import { PROJECT_BY_ID } from '../../../data/projects.js'
import MiniCityBase from '../MiniCityBase/MiniCityBase.jsx'
import './CollectionsVoiceAgent.css'

// Proyecto: Collections Voice Agent (derecha)
const { id, position, accentVar } = PROJECT_BY_ID['collections-voice-agent']

export default function CollectionsVoiceAgent() {
  return (
    <MiniCityBase
      name={id}
      position={position}
      accentVar={accentVar}
    />
  )
}
