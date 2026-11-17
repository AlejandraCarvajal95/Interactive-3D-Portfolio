import { useLayoutEffect, useMemo, useRef } from 'react'
import { useHelper } from '@react-three/drei'
import { CameraHelper, DirectionalLightHelper, Object3D } from 'three'
import { readCssVar } from '../../utils/cssVar.js'
import { IS_DEBUG } from '../../utils/debug.js'
import './SunLight.css'

// El sol: luz direccional (rayos paralelos) con sombras. Está bajo y detrás de
// las ciudades, a la izquierda, para que las sombras caigan sobre el agua hacia
// la cámara.
const SUN_POSITION = [-25, 22, -75]
const SUN_TARGET = [0, 0, -30]

// Zona (en unidades de la escena) donde se calculan las sombras. Lo que quede
// fuera de este cuadro no proyecta sombra.
const SHADOW_AREA = 32
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
    camera.left = -SHADOW_AREA
    camera.right = SHADOW_AREA
    camera.top = SHADOW_AREA
    camera.bottom = -SHADOW_AREA
    camera.near = 1
    camera.far = 120
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
