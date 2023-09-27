import React, { useEffect, useRef } from 'react'
import { TransformControls, useGLTF } from '@react-three/drei'
import propTypes from 'prop-types'
import { button, folder, useControls } from 'leva'

function Model({ url, name, id, setModelURL }) {
  const gltf = useGLTF(url)

  const deleteModel = (id) => {
    setModelURL((prevURL) => {
      return prevURL.map((url, index) => {
        if (index === id) {
          return { ...url, active: false }
        }
        return url
      })
    })
  }

  


  const [controls, set] = useControls(() => ({
    [`${name}`]: folder({
      Delete: button(() => { deleteModel(id) }),
    })
  }))


  return (
    <TransformControls>
      <primitive object={gltf.scene} />
    </TransformControls>
  )
}

Model.propTypes = {
  url: propTypes.string.isRequired,
  onLoad: propTypes.func,
}

export default Model
