const GEOMETRIES = {
  sphere: <sphereGeometry args={[1, 32, 32]} />,
  cylinder: <cylinderGeometry args={[1, 1, 2, 32]} />,
  box: <boxGeometry args={[2, 2, 2]} />,
}

export default function Primitive({
  shape,
  color,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      {GEOMETRIES[shape]}
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
    </mesh>
  )
}
