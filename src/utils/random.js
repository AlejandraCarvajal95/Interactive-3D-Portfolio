// Generador pseudoaleatorio con semilla: da siempre la misma secuencia, así la
// escena se ve igual en cada carga.
export function createRandom(seed) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}
