import { useState } from 'react'
import './HelpCard.css'

// Cada instrucción es una lista de opciones; las teclas se dibujan como
// <kbd> y el texto suelto (mouse, touchpad) como frase. Así se cubre quien usa
// mouse y quien solo tiene el touchpad del portátil.
const INSTRUCTIONS = [
  {
    label: 'Avanzar y retroceder',
    options: [
      { keys: ['W', 'S'] },
      { keys: ['↑', '↓'] },
      { text: 'Rueda del mouse' },
      { text: 'Dos dedos en el touchpad' },
    ],
  },
  {
    label: 'Moverte a los lados',
    options: [{ keys: ['A', 'D'] }, { keys: ['←', '→'] }],
  },
  {
    label: 'Saltar',
    options: [{ keys: ['Espacio'] }],
  },
  {
    label: 'Mirar alrededor',
    options: [{ text: 'Mueve el mouse o el cursor del touchpad' }],
  },
  {
    label: 'Ver un proyecto',
    options: [{ text: 'Haz clic (o toca el touchpad) sobre su panel' }],
  },
]

// Tarjeta 2D con las instrucciones de movimiento, en la esquina superior
// derecha. Se puede ocultar con el botón.
export default function HelpCard() {
  const [open, setOpen] = useState(true)

  const handleToggle = (event) => {
    setOpen((value) => !value)
    // Si el botón se queda con el foco, la barra espaciadora lo activaría en
    // vez de hacer saltar al visitante.
    event.currentTarget.blur()
  }

  return (
    <aside className="help-card" aria-label="Cómo moverte">
      <div className="help-card__header">
        <strong className="help-card__title">Cómo moverte</strong>
        <button
          type="button"
          className="help-card__toggle"
          onClick={handleToggle}
          aria-expanded={open}
        >
          {open ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {open && (
        <ul className="help-card__list">
          {INSTRUCTIONS.map(({ label, options }) => (
            <li key={label} className="help-card__item">
              <span className="help-card__label">{label}</span>
              <span className="help-card__keys">
                {options.map((option, i) => (
                  <span key={i} className="help-card__keys">
                    {i > 0 && <span className="help-card__or">o</span>}
                    {option.keys
                      ? option.keys.map((key) => <kbd key={key}>{key}</kbd>)
                      : option.text}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
