import React, { useState } from 'react'
import { useControls, folder, button } from 'leva'
import Ground from './Ground'
import DirectionalLight from './DirectionalLight/DirectionalLight'
import AmbientLight from './AmbientLight/AmbientLight'

function Lights({ setBackColor }) {
  const [lights, setLights] = useState([])

  function createDirectionalLight() {
    setLights((prevArray) => {
      const newLight = {
        name: `Directional${prevArray.length + 1}`,
        lightNumber: prevArray.length + 1,
        code: Date.now(),
        position: {
          x: 0,
          y: 0,
          z: 0
        },
        active: true
      }
      const newArray = [...prevArray, newLight]
      return newArray
    })
  }

  function removeDirectionalLight(name) {
    setLights((prevLights) => {
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
      {lights.map(
        (lightObj) =>
          lightObj.active && (
            <DirectionalLight
              key={lightObj.code}
              name={lightObj.name}
              lightNumber={lightObj.lightNumber}
              position={lightObj.position}
              onRemove={() => removeDirectionalLight(lightObj.name)}
            />
          )
      )}
    </>
  )
}

export default Lights
