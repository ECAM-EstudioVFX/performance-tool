import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import propTypes from 'prop-types'

function Model({ url, onLoad, position }) {
  const meshRef = useRef()
  const { nodes, materials } = useGLTF(url)

  return (
    <group ref={meshRef} onAfterRender={onLoad()}>
      {Object.entries(nodes).map(
        ([name, node]) =>
          node.type === 'Mesh' && (
            <primitive
              key={name}
              object={node}
              material={materials[node.material.name]}
            />
          )
      )}
    </group>
  )
}

Model.propTypes = {
  url: propTypes.string.isRequired,
  onLoad: propTypes.func,
  position: propTypes.object.isRequired
}

export default Model
