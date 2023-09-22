import React, { memo } from 'react'
import { TransformControls } from '@react-three/drei'
import { useDirectionalLightLogic } from './logic'

const DirectionalLight = memo(({ name, onRemove, position }) => {
  const { refDirectionalLight, controlsDirectional, handlePositionChange } =
    useDirectionalLightLogic(name, onRemove, position)

  const {
    directional,
    colorDirectional,
    intensityDirectional,
    positionDirectional,
    shadowBiasDirectional
  } = controlsDirectional

  return (
    <TransformControls
      mode='translate'
      onMouseUp={handlePositionChange}
      position={[
        positionDirectional.x,
        positionDirectional.y,
        positionDirectional.z
      ]}
      visible={directional}
      enabled={directional}
      size={0.7}
    >
      <directionalLight
        intensity={intensityDirectional}
        castShadow
        color={colorDirectional}
        shadow-bias={shadowBiasDirectional}
        ref={refDirectionalLight}
      />
    </TransformControls>
  )
})

export default DirectionalLight
