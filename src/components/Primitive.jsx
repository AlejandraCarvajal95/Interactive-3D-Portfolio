export default function Primitive({ color, position = [0, 0, 0] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
    </mesh>
  )
}
