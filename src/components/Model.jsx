import React, { useEffect, useRef } from 'react'
import { TransformControls, useGLTF } from '@react-three/drei'
import propTypes from 'prop-types'
import { button, folder, useControls } from 'leva'

function Model({ url, onLoad, position, name, id, setModelURL, active }) {
  const meshRef = useRef()
  const { nodes, materials } = useGLTF(url)

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
      <group ref={meshRef} onAfterRender={onLoad()}>
        {Object.entries(nodes).map(
          ([name, node]) =>
            node.type === 'Mesh' && (
              <primitive
                key={name}
                object={node}
                material={materials[node.material.name]}
                castShadow={true}
                receiveShadow={true}
              />
            )
        )}
      </group>
    </TransformControls>
  )
}

Model.propTypes = {
  url: propTypes.string.isRequired,
  onLoad: propTypes.func,
  position: propTypes.object.isRequired
}

export default Model
