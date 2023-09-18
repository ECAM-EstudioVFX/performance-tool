import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import propTypes from "prop-types";

function Model({ url, onLoad, position }) {
  const meshRef = useRef();
  const { nodes, materials } = useGLTF(url);
  const { camera } = useThree();

  useEffect(() => {
    if (meshRef.current) {
      const box = new THREE.Box3().setFromObject(meshRef.current);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const desiredSize = 5;
      const scaleValue = desiredSize / Math.max(size.x, size.y, size.z);
      meshRef.current.scale.set(scaleValue, scaleValue, scaleValue);

      meshRef.current.position.set(position.x, position.y, position.z);
      camera.position.set(position.x, position.y, position.z + desiredSize);
      camera.lookAt(center);
    }
  }, [camera]);

  return (
    <group ref={meshRef} onAfterRender={onLoad()}>
      {Object.entries(nodes).map(
        ([name, node]) =>
          node.type === "Mesh" && (
            <primitive
              key={name}
              object={node}
              material={materials[node.material.name]}
            />
          )
      )}
    </group>
  );
}

Model.propTypes = {
  url: propTypes.string.isRequired,
  onLoad: propTypes.func,
  position: propTypes.arrayOf(propTypes.number),
};

export default Model;
