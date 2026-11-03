import MiniCityBase from './MiniCityBase.jsx'
import './CollectionsVoiceAgent.css'

// Proyecto: Collections Voice Agent (derecha)
const POSITION = [9, 0, -30]

export default function CollectionsVoiceAgent() {
  return (
    <MiniCityBase
      name="collections-voice-agent"
      position={POSITION}
      accentVar="--city-collections-voice-agent-accent"
    />
  )
}
