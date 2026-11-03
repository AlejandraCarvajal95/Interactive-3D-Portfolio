import { useLayoutEffect } from 'react'
import { useThree } from '@react-three/fiber'

export default function CameraTarget({ target }) {
  const camera = useThree((state) => state.camera)

  useLayoutEffect(() => {
    camera.lookAt(...target)
  }, [camera, target])

  return null
}
