import { Suspense, useLayoutEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Water from './components/Water.jsx'

const CAMERA_POSITION = [0, 3, 20]
const CAMERA_TARGET = [0, 2, -5]

function CameraTarget() {
  const camera = useThree((state) => state.camera)

  useLayoutEffect(() => {
    camera.lookAt(...CAMERA_TARGET)
  }, [camera])

  return null
}

export default function App() {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ position: CAMERA_POSITION, fov: 60, near: 0.1, far: 1000 }}
    >
      <color attach="background" args={['#1a0535']} />
      <CameraTarget />
      <Suspense fallback={null}>
        <Environment files="/hdri/qwantani_dusk_2_puresky_1k.hdr" />
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
