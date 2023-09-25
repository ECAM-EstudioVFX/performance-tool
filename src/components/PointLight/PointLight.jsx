import { memo } from 'react'
import { TransformControls } from '@react-three/drei'
import { usePointLightLogic } from './logic'

const PointLight = memo(() => {
  return (
    <TransformControls size={0.7}>
      <pointLight intensity={1} position={[0, 0, 0]} />
    </TransformControls>
  )
})

export default PointLight
