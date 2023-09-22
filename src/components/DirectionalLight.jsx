import { useRef, memo } from 'react'
import { useHelper, TransformControls } from '@react-three/drei'
import { DirectionalLightHelper } from 'three'
import { useControls, folder, button } from 'leva'

const DirectionalLight = memo(({ name, onRemove, position }) => {
  const refDirectionalLight = useRef()

  const [controlsDirectional, set] = useControls(() => ({
    [[`${name}`]]: folder({
      directional: true,
      colorDirectional: '#FFFFFF',
      intensityDirectional: {
        value: 2,
        step: 0.01,
        min: 0,
        max: 5
      },
      positionDirectional: {
        x: position.x,
        y: position.y,
        z: position.z
      },
      shadowBiasDirectional: {
        value: -0.0001,
        step: 0.0001,
        min: 0.0,
        max: -0.001
      },
      helperDirectional: false,
      Remove: button(() => {
        onRemove()
      })
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

  const handlePositionChange = (event) => {
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
