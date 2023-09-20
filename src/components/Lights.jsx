import { useRef, useState, useEffect } from 'react'
import { useHelper, TransformControls, PivotControls } from '@react-three/drei'
import { DirectionalLightHelper } from 'three'
import { useControls, folder, button } from 'leva'
import Ground from './Ground'

function createLight() {
  console.log('createLight')
  return (
    <TransformControls mode='translate'>
      <directionalLight position={[1, 1, 1]} />
    </TransformControls>
  )
}

function Lights({ setBackColor }) {
  const [lightPosition, setLightPosition] = useState({ x: 5, y: 5, z: 5 })
  const refDirectionalLight = useRef()
  const prevPositionRef = useRef()

  const { grid, backcolor } = useControls('Ground', {
    grid: false,
    backcolor: {
      value: '#303035',
      onChange: (newValue) => {
        setBackColor(newValue)
      }
    }
  })

  const { ambient, colorAmbient, intensityColor } = useControls(
    'AmbientLight',
    {
      ambient: true,
      colorAmbient: '#FFFFFF',
      intensityColor: {
        value: 0.5,
        step: 0.01,
        min: 0,
        max: 5
      }
    }
  )

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
      helperDirectional: false,
      Create: button(() => {
        createLight()
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

  useEffect(() => {
    // Comprobar contra el valor almacenado en el ref
    if (
      !prevPositionRef.current ||
      lightPosition.x !== prevPositionRef.current.x ||
      lightPosition.y !== prevPositionRef.current.y ||
      lightPosition.z !== prevPositionRef.current.z
    ) {
      set({ positionDirectional: lightPosition })
      prevPositionRef.current = lightPosition
    }
  }, [lightPosition, set])

  function handlePositionChange(event) {
    if (event.target && event.target.object) {
      setLightPosition({
        x: event.target.object.position.x,
        y: event.target.object.position.y,
        z: event.target.object.position.z
      })
    }
  }

  return (
    <>
      {grid && <Ground />}
      {ambient && (
        <ambientLight intensity={intensityColor} color={colorAmbient} />
      )}
      {directional && (
        <>
          <TransformControls
            mode='translate'
            //onChange={handlePositionChange}
            onMouseUp={handlePositionChange}
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
              /*    target={refTarget.current.position} */
            />
          </TransformControls>
        </>
      )}
    </>
  )
}

export default Lights
