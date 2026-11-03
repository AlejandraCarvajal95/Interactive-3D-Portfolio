import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraTarget from './components/CameraTarget.jsx'
import Fog from './components/Fog.jsx'
import MiniCity from './components/MiniCity.jsx'
import Sky from './components/Sky.jsx'
import Road from './components/Road.jsx'
import SkyReflection from './components/SkyReflection.jsx'
import Water from './components/Water.jsx'
import { CITY_SCALE } from './constants.js'
import './App.css'

const CAMERA_POSITION = [0, 3.5, 0]
const CAMERA_TARGET = [0, 1.3, -30]

export default function App() {
  return (
    <div className="app">
      <Sky />
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: CAMERA_POSITION, fov: 60, near: 0.1, far: 1000 }}
      >
        <CameraTarget target={CAMERA_TARGET} />
        <Fog />
        <Suspense fallback={null}>
          <SkyReflection />
        </Suspense>
        <Water />
        <Road />
        <group position={[-9, 0, -14]} scale={CITY_SCALE}>
          <MiniCity />
        </group>
      </Canvas>
    </div>
  )
}
