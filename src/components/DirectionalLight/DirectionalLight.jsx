import React, { memo } from 'react'
import { TransformControls } from '@react-three/drei'
import { useDirectionalLightLogic } from './logic'

const DirectionalLight = (({name, directional, colorDirectional, intensityDirectional, position, shadowBiasDirectional, helperDirectional, active, onRemove}) => {
  const { refDirectionalLight, controlsDirectional: c, handlePositionChange } = useDirectionalLightLogic(name, directional, colorDirectional, intensityDirectional, position, shadowBiasDirectional, helperDirectional, active, onRemove)

  return (
    <TransformControls
      mode='translate'
      onMouseUp={handlePositionChange}
      position={[
        c.positionDirectional.x,
        c.positionDirectional.y,
        c.positionDirectional.z
      ]}
      visible={c.directional}
      enabled={c.directional}
      size={0.7}
    >
      <directionalLight
        intensity={c.intensityDirectional}
        castShadow
        color={c.colorDirectional}
        shadow-bias={c.shadowBiasDirectional}
        ref={refDirectionalLight}
      />
    </TransformControls>
  )
})

export default DirectionalLight
