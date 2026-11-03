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
        {/* Franja provisional para ver el punto de fuga. Se borra en HU-02. */}
        <mesh position={[0, 0, -32]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 64]} />
          <meshBasicMaterial color="#8a5cf6" />
        </mesh>
      </Canvas>
    </div>
  )
}
