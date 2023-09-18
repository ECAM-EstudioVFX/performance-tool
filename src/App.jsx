import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import Model from "./components/Model"; // Asume que Model está en el mismo directorio. Si no es así, ajusta la ruta de importación.

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
    <div>
      <input type="file" onChange={handleFileChange} accept=".glb, .gltf" />
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls />
        <Suspense fallback={null}>
          {modelURL && <Model url={modelURL} />}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
