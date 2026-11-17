// Mapa de teclas para <KeyboardControls> de Drei: cada acción tiene varias
// teclas posibles. Los códigos son los de KeyboardEvent.code.
export const KEYBOARD_MAP = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['KeyA'] },
  { name: 'right', keys: ['KeyD'] },
  { name: 'turnLeft', keys: ['KeyQ', 'ArrowLeft'] },
  { name: 'turnRight', keys: ['KeyE', 'ArrowRight'] },
  { name: 'jump', keys: ['Space'] },
]
