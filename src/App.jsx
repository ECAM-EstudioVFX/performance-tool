import React, { useEffect, useState } from 'react'
import { Leva } from 'leva'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import Lights from './components/Lights'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { Button } from '@nextui-org/react'
import './App.css'
import ExporterImporter from './components/ExporterImporter'
import Models from './components/Models'

function App() {
  const [modelURL, setModelURL] = useState([])
  const [modelName, setModelName] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [backcolor, setBackColor] = useState('#303035')

  const [directionalLights, setDirectionalLights] = useState([])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode, directionalLights])

  const handleAddFile = (event) => {
    const file = event.target.files[0]
    if (file) {
      const objectURL = URL.createObjectURL(file)
      const prevModelURL = [...modelURL]
      prevModelURL.push({ name: file.name.substring(0, file.name.length - 4) + (prevModelURL.length + 1), url: objectURL, active: true })
      setModelURL(prevModelURL)
    }
    event.target.value = null
  }

  const emptyScene = () => {
    setDirectionalLights([])
    setModelName('')
  }

  const loadScene = (scene) => {
    setDirectionalLights(scene.params.directionalLights)
    setModelName(scene.params.modelName)
  }

  return (
    <div
      className={`w-full relative ${darkMode ? 'bg-dark-900 text-light-100' : ''
        }`}
      style={{ height: '80vh' }}
    >
      <div className='flex items-center justify-between'>
        <h1
          className='text-3xl font-bold underline
          dark:text-light-100
          text-dark-900
          text-center
          w-full
          '
        >
          Prueba de rendimiento
        </h1>
        <Button
          isIconOnly
          color='danger'
          aria-label='Like'
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? (
            <img
              src='https://img.icons8.com/?size=128&id=0pAges62zAXE&format=png'
              className='w-8'
            />
          ) : (
            <img
              src='https://img.icons8.com/?size=128&id=EJa7ybjieiOc&format=png'
              className='w-8'
            />
          )}
        </Button>
      </div>
      <input type='file' onChange={handleAddFile} accept='.glb, .gltf' name='model'/>
      <input placeholder='Nombre de la escena' onChange={(e) => { setModelName(e.target.value) }} value={modelName} name='sceneName'></input>

      <Leva />
      <ExporterImporter modelName={modelName} directionalLights={directionalLights} loadScene={loadScene} emptyScene={emptyScene} />
      <Canvas
        shadows
        style={{ border: darkMode ? '1px solid white' : '1px solid black' }}
        className='mt-5'
        camera={{ position: [10, 10, 10], fov: 75, near: 0.1, far: 1000 }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <color attach='background' args={[backcolor]} />
        <Perf position='top-left' />
        <Lights directionalLights={directionalLights} setDirectionalLights={setDirectionalLights} setBackColor={setBackColor} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          makeDefault
        /> 
        <GizmoHelper alignment='bottom-right' margin={[80, 80]}>
          <GizmoViewport
            axisColors={['red', 'green', 'blue']}
            labelColor='black'
          />
        </GizmoHelper>
        <Models modelURL={modelURL} setModelURL={setModelURL}/>
      </Canvas>
    </div>
  )
}

export default App
