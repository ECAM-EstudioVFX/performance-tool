import React, { useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Stage } from '@react-three/drei'
import Model from './components/Model'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { Spinner } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import './App.css'

function App() {
  const [modelURL, setModelURL] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const separation = 20

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleFileChange = (event) => {
    setShowSpinner(true)
    const file = event.target.files[0]
    if (file) {
      const objectURL = URL.createObjectURL(file)
      setModelURL(objectURL)
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

      <Canvas
        style={{ border: darkMode ? '1px solid white' : '1px solid black' }}
        className='mt-5'
        camera={{ position: [10, 0, 10], fov: 75, near: 0.1, far: 1000 }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <Perf position='top-left' />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} castShadow />
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        {/** Poder mover los elementos con las flechas */}

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        <Suspense fallback={null}>
          {modelURL && (
            <>
              <Stage>
                <Model
                  url={modelURL}
                  onLoad={() => setShowSpinner(false)}
                  position={{ x: 10, y: 0, z: 0 }}
                />
              </Stage>
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
