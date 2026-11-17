import AppConductores from '../AppConductores/AppConductores.jsx'
import CollectionsVoiceAgent from '../CollectionsVoiceAgent/CollectionsVoiceAgent.jsx'
import ConteoVehicular from '../ConteoVehicular/ConteoVehicular.jsx'

// Las tres mini-ciudades, una por proyecto, dentro de un solo grupo: dos a la
// izquierda de la carretera y una a la derecha.
export default function MiniCities() {
  return (
    <group name="mini-cities">
      <AppConductores />
      <CollectionsVoiceAgent />
      <ConteoVehicular />
    </group>
  )
}
