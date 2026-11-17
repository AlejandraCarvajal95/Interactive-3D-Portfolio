import { useMemo } from 'react'
import { readCssVar } from '../../utils/cssVar.js'
import './GlassMaterial.css'

// Dos acabados de vidrio con el mismo material (MeshPhysicalMaterial):
//
// panel:  vidrio grueso. `transmission` deja ver lo de atrás, `roughness` lo
//         difumina un poco, `thickness` e `ior` desvían la imagen y dan el
//         borde brillante. `iridescence` agrega el arcoíris sutil y
//         `clearcoat` el brillo pulido de la superficie.
// bubble: burbuja. Transparente y sin nada de rugosidad; casi todo su aspecto
//         viene de reflejar el cielo y de la iridiscencia.
const VARIANTS = {
  panel: {
    transmission: 0.95,
    roughness: 0.1,
    thickness: 1.5,
    ior: 1.5,
    iridescence: 1,
    iridescenceIOR: 1.3,
    iridescenceThicknessMinimum: 100,
    iridescenceThicknessMaximum: 500,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2,
  },
  bubble: {
    transmission: 1,
    roughness: 0,
    thickness: 0.4,
    ior: 1.2,
    iridescence: 1,
    iridescenceIOR: 1.4,
    iridescenceThicknessMinimum: 150,
    iridescenceThicknessMaximum: 450,
    clearcoat: 1,
    envMapIntensity: 3,
  },
}

export default function GlassMaterial({ variant = 'panel' }) {
  const colors = useMemo(
    () => ({
      color: readCssVar('--glass-color'),
      attenuationColor: readCssVar('--glass-attenuation'),
    }),
    [],
  )

  return (
    <meshPhysicalMaterial
      {...colors}
      attenuationDistance={4}
      {...VARIANTS[variant]}
    />
  )
}
