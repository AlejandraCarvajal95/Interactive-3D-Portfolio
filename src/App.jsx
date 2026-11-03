import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraTarget from './components/CameraTarget.jsx'
import Sky from './components/Sky.jsx'
import Road from './components/Road.jsx'
import SkyReflection from './components/SkyReflection.jsx'
import Water from './components/Water.jsx'
import './App.css'

const CAMERA_POSITION = [0, 3, 20]
const CAMERA_TARGET = [0, 2, -5]

export default function App() {
  return (
    <div className="app">
      <Sky />
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: CAMERA_POSITION, fov: 60, near: 0.1, far: 1000 }}
      >
        <CameraTarget target={CAMERA_TARGET} />
        <Suspense fallback={null}>
          <SkyReflection />
        </Suspense>
        <Water />
        <Road />
      </Canvas>
    </div>
  )
}
