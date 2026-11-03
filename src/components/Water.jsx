export default function Water() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
      <planeGeometry args={[500, 500]} />
      <meshPhysicalMaterial
        color="#06001a"
        metalness={0.97}
        roughness={0.03}
        envMapIntensity={2.2}
      />
    </mesh>
  )
}
