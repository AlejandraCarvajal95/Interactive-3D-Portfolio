import { Canvas } from '@react-three/fiber'

const CAMERA_POSITION = [0, 6, 20]

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: CAMERA_POSITION, fov: 60, near: 0.1, far: 1000 }}
      >
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
