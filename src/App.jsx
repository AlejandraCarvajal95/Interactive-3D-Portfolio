import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import CameraTarget from './components/CameraTarget.jsx'
import Water from './components/Water.jsx'

const CAMERA_POSITION = [0, 3, 20]
const CAMERA_TARGET = [0, 2, -5]

export default function App() {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ position: CAMERA_POSITION, fov: 60, near: 0.1, far: 1000 }}
    >
      <color attach="background" args={['#5a4bd1']} />
      <CameraTarget target={CAMERA_TARGET} />
      <Suspense fallback={null}>
        <Environment files="/hdri/qwantani_dusk_2_puresky_1k.hdr">
          <Lightformer
            color="#ffa078"
            intensity={1.2}
            position={[0, 1, -15]}
            scale={[60, 3, 1]}
          />
          <Lightformer
            color="#ffa3cc"
            intensity={0.9}
            position={[0, 5, -15]}
            scale={[60, 8, 1]}
          />
          <Lightformer
            form="circle"
            color="#fff1d0"
            intensity={3}
            position={[0, 2, -15]}
            scale={4}
          />
          <Lightformer
            color="#9ec5ff"
            intensity={0.8}
            position={[0, 14, -10]}
            scale={[80, 20, 1]}
          />
        </Environment>
      </Suspense>
      <Water />
      {/* Franja provisional para ver el punto de fuga. Se borra en HU-02. */}
      <mesh position={[0, 0, -32]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 64]} />
        <meshBasicMaterial color="#8a5cf6" />
      </mesh>
    </Canvas>
  )
}
