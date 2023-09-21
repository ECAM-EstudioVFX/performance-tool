import { useRef, memo } from 'react'
import { useHelper, TransformControls } from '@react-three/drei'
import { DirectionalLightHelper } from 'three'
import { useControls, folder } from 'leva'

const DirectionalLight = memo(() => {
  const refDirectionalLight = useRef()

  const [controlsDirectional, set] = useControls(() => ({
    DirectionalLight: folder({
      directional: true,
      colorDirectional: '#FFFFFF',
      intensityDirectional: {
        value: 2,
        step: 0.01,
        min: 0,
        max: 5
      },
      positionDirectional: { x: 0, y: 0, z: 0 },
      shadowBiasDirectional: {
        value: -0.0001,
        step: 0.0001,
        min: 0.0,
        max: -0.001
      },
      helperDirectional: false
    })
  }))

  const {
    directional,
    colorDirectional,
    intensityDirectional,
    positionDirectional,
    shadowBiasDirectional,
    helperDirectional
  } = controlsDirectional

  useHelper(
    helperDirectional && refDirectionalLight,
    DirectionalLightHelper,
    colorDirectional
  )

  function handlePositionChange(event) {
    if (event.target && event.target.object) {
      set({
        positionDirectional: {
          x: event.target.object.position.x,
          y: event.target.object.position.y,
          z: event.target.object.position.z
        }
      })
    }
  }

  return (
    <TransformControls
      mode='translate'
      onUpdate={handlePositionChange}
      position={[
        positionDirectional.x,
        positionDirectional.y,
        positionDirectional.z
      ]}
    >
      <directionalLight
        position={[
          positionDirectional.x,
          positionDirectional.y,
          positionDirectional.z
        ]}
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
