import { useTexture } from '@react-three/drei'
import { SRGBColorSpace } from 'three'

const MATCAP_FILE = '/matcaps/sunset.png'

// Material matcap: la textura es una esfera ya iluminada que se "pega" al
// objeto, así que no necesita luces y casi no cuesta rendimiento. Se usa en
// detalles secundarios (esferas decorativas, bordes de los marcos).
export default function MatcapMaterial(props) {
  const matcap = useTexture(MATCAP_FILE, (texture) => {
    texture.colorSpace = SRGBColorSpace
  })

  return <meshMatcapMaterial matcap={matcap} {...props} />
}
