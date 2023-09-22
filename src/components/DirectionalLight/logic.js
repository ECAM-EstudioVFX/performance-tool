import { useRef } from 'react';
import { useControls, folder, button } from 'leva';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

export const useDirectionalLightLogic = (name, onRemove, position) => {
  const refDirectionalLight = useRef();
  
  const [controlsDirectional, set] = useControls(() => ({
    [[`${name}`]]: folder({
      directional: true,
      colorDirectional: '#FFFFFF',
      intensityDirectional: {
        value: 2,
        step: 0.01,
        min: 0,
        max: 5
      },
      positionDirectional: {
        x: position.x,
        y: position.y,
        z: position.z
      },
      shadowBiasDirectional: {
        value: -0.0001,
        step: 0.0001,
        min: 0.0,
        max: -0.001
      },
      helperDirectional: false,
      Remove: button(() => {
        onRemove();
      })
    })
  }));
  
  const handlePositionChange = (event) => {
    if (event.target && event.target.object) {
      set({
        positionDirectional: {
          x: event.target.object.position.x,
          y: event.target.object.position.y,
          z: event.target.object.position.z
        }
      });
    }
  };

  useHelper(
    controlsDirectional.helperDirectional && refDirectionalLight,
    DirectionalLightHelper,
    controlsDirectional.colorDirectional
  );

  return { refDirectionalLight, controlsDirectional, handlePositionChange };
};
