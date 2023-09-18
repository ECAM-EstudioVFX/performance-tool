import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import Model from "./components/Model";
import * as THREE from "three";
import "./App.css";

function App() {
  const [modelURL, setModelURL] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setModelURL(objectURL);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <h1 className="text-3xl font-bold underline text-violet-800">
        Prueba de rendimiento
      </h1>
      <input type="file" onChange={handleFileChange} accept=".glb, .gltf" />
      <Canvas
        className="mt-12"
        camera={{ position: [0, 0, 15], fov: 75, near: 0.1, far: 1000 }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[0, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <OrbitControls />
        <Suspense fallback={null}>
          {modelURL && <Model url={modelURL} />}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
