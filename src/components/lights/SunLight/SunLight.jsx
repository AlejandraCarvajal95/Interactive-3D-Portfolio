import { useLayoutEffect, useMemo, useRef } from 'react'
import { useHelper } from '@react-three/drei'
import { CameraHelper, DirectionalLightHelper, Object3D } from 'three'
import { readCssVar } from '../../../utils/cssVar.js'
import { IS_DEBUG } from '../../../utils/debug.js'
import './SunLight.css'

// El sol: luz direccional (rayos paralelos) con sombras. Viene del mismo lado
// que el disco solar del horizonte (SunDisc): del fondo de la carretera, en
// línea con ella. Así las siluetas de las ciudades proyectan sus sombras sobre
// el agua hacia quien mira.
//
// El disco real está casi a ras del agua (≈ 3° de altura); con tan poca altura
// la luz casi no daría sobre nada y las sombras serían larguísimas, así que la
// luz se eleva a SUN_ELEVATION grados: viene del fondo pero desde bastante más
// arriba.
const SUN_TARGET = [0, 0, -30]
const SUN_DISTANCE = 90
const SUN_ELEVATION = 35 // grados sobre el horizonte
const elevation = (SUN_ELEVATION * Math.PI) / 180
const SUN_POSITION = [
  SUN_TARGET[0],
  SUN_TARGET[1] + SUN_DISTANCE * Math.sin(elevation),
  SUN_TARGET[2] - SUN_DISTANCE * Math.cos(elevation),
]

// Zona (en unidades de la escena) donde se calculan las sombras: media anchura
// y media altura vistas desde la luz. Lo que quede fuera no proyecta sombra.
const SHADOW_HALF_WIDTH = 24
const SHADOW_HALF_HEIGHT = 20
const SHADOW_FAR = 200
const SHADOW_MAP_SIZE = 2048

// Helpers de depuración (SCRUM-38): solo se montan con ?debug.
function SunHelpers({ lightRef, color }) {
  const shadowCameraRef = useRef(null)

  useLayoutEffect(() => {
    shadowCameraRef.current = lightRef.current.shadow.camera
  }, [lightRef])

  // Orientación de la luz y línea hacia su target.
  useHelper(lightRef, DirectionalLightHelper, 3, color)
  // Caja donde se calculan las sombras.
  useHelper(shadowCameraRef, CameraHelper)

  return null
}

export default function SunLight() {
  const lightRef = useRef(null)
  const colors = useMemo(
    () => ({
      sun: readCssVar('--sun-color'),
      intensity: Number(readCssVar('--sun-intensity')),
    }),
    [],
  )

  // La luz apunta a su target; el target debe estar en la escena.
  const target = useMemo(() => {
    const object = new Object3D()
    object.position.set(...SUN_TARGET)
    return object
  }, [])

  useLayoutEffect(() => {
    const { camera } = lightRef.current.shadow
    camera.left = -SHADOW_HALF_WIDTH
    camera.right = SHADOW_HALF_WIDTH
    camera.top = SHADOW_HALF_HEIGHT
    camera.bottom = -SHADOW_HALF_HEIGHT
    camera.near = 1
    camera.far = SHADOW_FAR
    camera.updateProjectionMatrix()
  }, [])

  return (
    <>
      <directionalLight
        ref={lightRef}
        color={colors.sun}
        intensity={colors.intensity}
        position={SUN_POSITION}
        target={target}
        castShadow
        shadow-mapSize={[SHADOW_MAP_SIZE, SHADOW_MAP_SIZE]}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />
      <primitive object={target} />
      {IS_DEBUG && <SunHelpers lightRef={lightRef} color={colors.sun} />}
    </>
  )
}
