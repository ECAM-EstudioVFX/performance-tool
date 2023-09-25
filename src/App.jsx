import React, { useEffect, useState, Suspense, useRef } from 'react'
import { useControls, folder, button, Leva } from 'leva'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Center,
  GizmoHelper,
  GizmoViewport
} from '@react-three/drei'
import Model from './components/Model'
import Lights from './components/Lights'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { Spinner } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import './App.css'
import ExporterImporter from './components/ExporterImporter'

function App() {
  const [modelURL, setModelURL] = useState(null)
  const [modelName, setModelName] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)
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

  const handleFileChange = (event) => {
    setShowSpinner(true)
    const file = event.target.files[0]
    if (file) {
      const objectURL = URL.createObjectURL(file)
      setModelURL(objectURL)
      setModelName(file.name)
    }
  }

  return (
    <div
      className={`w-full relative ${
        darkMode ? 'bg-dark-900 text-light-100' : ''
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
      <input type='file' onChange={handleFileChange} accept='.glb, .gltf' />
      
      {showSpinner && (
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center  bg-opacity-50'>
          <Spinner color='warning' size='lg' />
        </div>
      )}
      <Leva />
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

        <ExporterImporter modelName={modelName} directionalLights={directionalLights} />

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
        <Suspense fallback={null}>
          {modelURL && (
            <>
              <Center>
                <Model
                  url={modelURL}
                  onLoad={() => setShowSpinner(false)}
                  position={{ x: 10, y: 0, z: 0 }}
                />
              </Center>
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
