import { useRef } from 'react';
import { useControls, folder, button } from 'leva';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

export const useDirectionalLightLogic = (
  name,
  directional,
  colorDirectional,
  intensityDirectional,
  position,
  shadowBiasDirectional,
  helperDirectional,
  active,
  onRemove
) => {
  const refDirectionalLight = useRef();

  const [controlsDirectional, set] = useControls(() => ({
    [[`${name}`]]: folder({
      directional: directional,
      colorDirectional: colorDirectional,
      intensityDirectional: {
        value: intensityDirectional,
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
        value: shadowBiasDirectional,
        step: 0.0001,
        min: 0.0,
        max: -0.001
      },
      helperDirectional: helperDirectional,
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
