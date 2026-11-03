import { useLayoutEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'

const CAMERA_POSITION = [0, 6, 20]
const CAMERA_TARGET = [0, 3, -5]

function CameraTarget() {
  const camera = useThree((state) => state.camera)

  useLayoutEffect(() => {
    camera.lookAt(...CAMERA_TARGET)
  }, [camera])

  return null
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: CAMERA_POSITION, fov: 60, near: 0.1, far: 1000 }}
      >
        <CameraTarget />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} />
        <mesh rotation={[0.5, 0.6, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </Canvas>
    </div>
  )
}
