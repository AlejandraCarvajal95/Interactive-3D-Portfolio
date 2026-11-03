export default function Water() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
      <planeGeometry args={[500, 500]} />
      <meshBasicMaterial color="#06001a" />
    </mesh>
  )
}
