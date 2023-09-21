import React, { useState } from 'react'
import { useControls, folder, button } from 'leva'
import Ground from './Ground'
import DirectionalLight from './DirectionalLight'
import AmbientLight from './AmbientLight'

function Lights({ setBackColor }) {
  const [lights, setLights] = useState([])

  function createLight() {
    setLights((prevArray) => [...prevArray, Date.now()])
    console.log('LIGHTS', lights)
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
        createLight()
      })
    })
  }))

  console.log('LIGHTS', lights)

  return (
    <>
      {grid && <Ground />}
      <AmbientLight />
      {lights.map((name) => (
        <DirectionalLight key={name} />
      ))}
    </>
  )
}

export default Lights
