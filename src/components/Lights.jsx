import React, { useState } from 'react'
import { useControls, folder, button } from 'leva'
import Ground from './Ground'
import DirectionalLight from './DirectionalLight'
import AmbientLight from './AmbientLight'

function Lights({ setBackColor }) {
  const [lights, setLights] = useState([])

  function createLight() {
    setLights((prevArray) => {
      const newArray = [...prevArray, `Directional${prevArray.length + 1}`]
      return newArray
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
        createLight()
      })
    })
  }))

  return (
    <>
      {grid && <Ground />}
      <AmbientLight />
      {lights.map((name) => (
        <DirectionalLight key={name} name={name} />
      ))}
    </>
  )
}

export default Lights
