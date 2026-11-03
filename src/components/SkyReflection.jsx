import { useMemo } from 'react'
import { Environment, Lightformer } from '@react-three/drei'
import { readCssVar } from '../utils/cssVar.js'
import './SkyReflection.css'

const HDRI_FILE = '/hdri/qwantani_dusk_2_puresky_1k.hdr'

export default function SkyReflection() {
  const colors = useMemo(
    () => ({
      horizon: readCssVar('--reflection-horizon'),
      pink: readCssVar('--reflection-pink'),
      sun: readCssVar('--reflection-sun'),
      blue: readCssVar('--reflection-blue'),
    }),
    [],
  )

  return (
    <Environment files={HDRI_FILE}>
      <Lightformer
        color={colors.horizon}
        intensity={1.2}
        position={[0, 1, -15]}
        scale={[60, 3, 1]}
      />
      <Lightformer
        color={colors.pink}
        intensity={0.9}
        position={[0, 5, -15]}
        scale={[60, 8, 1]}
      />
      <Lightformer
        form="circle"
        color={colors.sun}
        intensity={3}
        position={[0, 2, -15]}
        scale={4}
      />
      <Lightformer
        color={colors.blue}
        intensity={0.8}
        position={[0, 14, -10]}
        scale={[80, 20, 1]}
      />
    </Environment>
  )
}
