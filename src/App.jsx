import { Suspense, useCallback, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Stats } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import DebugControls from './components/DebugControls.jsx'
import Fog from './components/Fog.jsx'
import GlassBubbles from './components/glass/GlassBubbles.jsx'
import GlassFrames from './components/glass/GlassFrames.jsx'
import MatcapBeads from './components/MatcapBeads.jsx'
import MiniCities from './components/mini-cities/MiniCities.jsx'
import PortfolioTitle from './components/PortfolioTitle.jsx'
import RoadColliders from './components/physics/RoadColliders.jsx'
import StationSensors from './components/physics/StationSensors.jsx'
import Walker from './components/physics/Walker.jsx'
import Sky from './components/Sky.jsx'
import Road from './components/Road.jsx'
import SkyReflection from './components/SkyReflection.jsx'
import SoftAmbient from './components/lights/SoftAmbient.jsx'
import SunLight from './components/lights/SunLight.jsx'
import Water from './components/Water.jsx'
import { KEYBOARD_MAP } from './data/controls.js'
import { IS_DEBUG, SHOW_PHYSICS, SHOW_STATS } from './utils/debug.js'
import './App.css'

const CAMERA_POSITION = [0, 3.5, 0]
const CAMERA_TARGET = [0, 1.3, -30]

export default function App() {
  // Estación en la que está el visitante (la detectan los sensores).
  const [activeId, setActiveId] = useState(null)
  const handleEnter = useCallback((id) => setActiveId(id), [])
  const handleExit = useCallback(
    (id) => setActiveId((current) => (current === id ? null : current)),
    [],
  )

  return (
    <div className="app">
      <Sky />
      <KeyboardControls map={KEYBOARD_MAP}>
        <Canvas
          shadows="percentage"
          // dpr limita la resolución interna: en pantallas de alta densidad
          // (4K, retina) no se renderiza más de 2 píxeles por píxel de CSS.
          dpr={[1, 2]}
          gl={{ antialias: true }}
          camera={{ position: CAMERA_POSITION, fov: 60, near: 0.1, far: 1000 }}
        >
          {IS_DEBUG && <DebugControls target={CAMERA_TARGET} />}
          {SHOW_STATS && <Stats />}
          <Fog />
          <SunLight />
          <SoftAmbient />
          <Suspense fallback={null}>
            <SkyReflection />
          </Suspense>
          <Water />
          <Road />
          <MiniCities />
          <Suspense fallback={null}>
            <GlassFrames activeId={activeId} />
            <GlassBubbles />
            <MatcapBeads />
            <PortfolioTitle />
          </Suspense>
          {/* La física carga su motor (WebAssembly) de forma asíncrona. */}
          <Suspense fallback={null}>
            <Physics debug={SHOW_PHYSICS}>
              <RoadColliders />
              <StationSensors onEnter={handleEnter} onExit={handleExit} />
              <Walker followCamera={!IS_DEBUG} />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}
