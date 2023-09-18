import { useGLTF } from "@react-three/drei";
import propTypes from "prop-types";

function Model({ url }) {
  const { nodes, materials } = useGLTF(url);

  return (
    <group>
      {Object.entries(nodes).map(
        ([name, node]) =>
          // Asegurémonos de que solo renderizamos Meshes
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

export default Model;

Model.propTypes = {
  url: propTypes.string.isRequired,
};
