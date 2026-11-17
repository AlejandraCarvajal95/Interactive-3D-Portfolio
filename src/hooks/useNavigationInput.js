import { useCallback, useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { MathUtils } from 'three'
import { KEYBOARD_MAP } from '../data/controls.js'
import {
  WHEEL_DECAY,
  WHEEL_GAIN,
  WHEEL_MAX_SPEED,
} from '../constants.js'

// Entrada de navegación: teclado (WASD y flechas) y rueda del mouse o
// deslizamiento con dos dedos en el touchpad.
// Devuelve una función `read(delta)` que se llama en cada fotograma, dentro de
// useFrame, y entrega:
//   forward: -1, 0 o 1 según W/S
//   strafe:  -1, 0 o 1 según A/D
//   wheel:   velocidad hacia adelante que dejó la rueda (negativa = atrás)
//
// El teclado se lee con get() en lugar de useState: así no hay re-renders por
// cada tecla (Sesión 5).
export function useNavigationInput() {
  const [, getKeys] = useKeyboardControls()
  const element = useThree((state) => state.gl.domElement)
  const wheelSpeed = useRef(0)

  useEffect(() => {
    const onWheel = (event) => {
      // Pellizcar en el touchpad llega como rueda con Ctrl: se ignora para que
      // no haga zoom en toda la página.
      if (event.ctrlKey) {
        event.preventDefault()
        return
      }
      // Un mouse manda saltos grandes (≈100 por clic) y un touchpad muchos
      // valores pequeños mientras se deslizan dos dedos; ambos suman velocidad.
      // Si el navegador reporta líneas o páginas en vez de píxeles, se convierte.
      const unit = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? 400 : 1
      // Rueda hacia abajo (o dos dedos hacia arriba) = avanzar, como al bajar
      // una página.
      wheelSpeed.current = MathUtils.clamp(
        wheelSpeed.current + event.deltaY * unit * WHEEL_GAIN,
        -WHEEL_MAX_SPEED,
        WHEEL_MAX_SPEED,
      )
    }
    element.addEventListener('wheel', onWheel, { passive: false })
    return () => element.removeEventListener('wheel', onWheel)
  }, [element])

  // Si la ventana pierde el foco con una tecla presionada (cambiar de pestaña,
  // Alt+Tab), el navegador nunca avisa que se soltó y la cámara seguiría
  // avanzando sola. Al perder el foco se "sueltan" todas las teclas y se frena
  // la rueda.
  useEffect(() => {
    const releaseAll = () => {
      wheelSpeed.current = 0
      KEYBOARD_MAP.forEach(({ keys }) =>
        keys.forEach((code) =>
          window.dispatchEvent(new KeyboardEvent('keyup', { code })),
        ),
      )
    }
    const onVisibility = () => document.hidden && releaseAll()
    window.addEventListener('blur', releaseAll)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('blur', releaseAll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return useCallback(
    (delta) => {
      const { forward, backward, left, right } = getKeys()
      // La rueda da un impulso que se va frenando solo.
      wheelSpeed.current = MathUtils.damp(wheelSpeed.current, 0, WHEEL_DECAY, delta)
      return {
        forward: Number(forward) - Number(backward),
        strafe: Number(right) - Number(left),
        wheel: wheelSpeed.current,
      }
    },
    [getKeys],
  )
}
