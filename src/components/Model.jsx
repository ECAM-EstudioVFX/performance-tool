import React, { useEffect, useRef, useState } from 'react'
import { TransformControls, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber';
import { button, folder, useControls } from 'leva'

function Model({ url, name, id, setModelURL }) {
  const [model, setModel] = useState(null); 
  const modelRef = useRef()
  const gltf = useGLTF(url)
  const { scene } = useThree();

  useEffect(() => {
    const clonedScene = gltf.scene.clone();
    setModel(clonedScene);
  }, [gltf.scene]);

  useEffect(() => {
    if (model) {
      modelRef.current = model;
      scene.add(model);
    }
    return () => {
      if (model) {
        scene.remove(model);
      }
    };
  }, [model, scene]); 

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
      transformControls: false,
     
      Delete: button(() => { deleteModel(id) }),
    })
  }))

  return (
    model ? ( 
      <TransformControls enabled={controls.transformControls} object={model}>
        <primitive object={model} />
      </TransformControls>
    ) : null
  );
}

export default Model
