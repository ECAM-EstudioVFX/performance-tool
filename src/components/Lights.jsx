import React, { useState } from 'react'
import { useControls, folder, button } from 'leva'
import Ground from './Ground'
import DirectionalLight from './DirectionalLight/DirectionalLight'
import AmbientLight from './AmbientLight/AmbientLight'

function Lights({ setBackColor, directionalLights, setDirectionalLights, }) {
  

  function createDirectionalLight() {
    setDirectionalLights((prevArray) => {
      const newLight = {
        code: Date.now(),
        name: `Directional${prevArray.length + 1}`,
        lightNumber: prevArray.length + 1,
        directional: true,
        colorDirectional: "#ffffff",
        intensityDirectional: 2,
        position: {
          x: 0,
          y: 0,
          z: 0
        },
        shadowBiasDirectional: -0.001,
        helperDirectional: false,
        active: true
      }
      const newArray = [...prevArray, newLight]
      return newArray
    })
  }

  function removeDirectionalLight(name) {
    setDirectionalLights((prevLights) => {
      return prevLights.map((light) => {
        if (light.name === name) {
          return { ...light, active: false }
        }
        return light
      })
    })
  }

  const { grid, backcolor } = useControls('Ground', {
    grid: false,
    backcolor: {
      value: '#303035',
      onChange: (newValue) => {
        setBackColor(newValue)
      }
    }
  })

  const [controls, set] = useControls(() => ({
    DirectionalLight: folder({
      Create: button(() => {
        createDirectionalLight()
      })
    })
  }))

  return (
    <>
      {grid && <Ground />}
      <AmbientLight />
      {directionalLights.length > 0 && directionalLights.map(
        (lightObj) =>
          lightObj.active && (
            <DirectionalLight
              key={lightObj.code}
              name={lightObj.name}
              lightNumber={lightObj.lightNumber}
              directional={lightObj.directional}
              colorDirectional={lightObj.colorDirectional}
              intensityDirectional={lightObj.intensityDirectional}
              position={lightObj.position}
              shadowBiasDirectional={lightObj.shadowBiasDirectional}
              helperDirectional={lightObj.helperDirectional}
              active={lightObj.active}
              onRemove={() => removeDirectionalLight(lightObj.name)}
              directionalLights={directionalLights}
              setDirectionalLights={setDirectionalLights}
            />
          )
      )}
    </>
  )
}

export default Lights
