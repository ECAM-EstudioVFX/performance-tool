import { useEffect, useRef } from 'react';
import { useControls, folder, button } from 'leva';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

export const useDirectionalLightLogic = (name, directional, colorDirectional, intensityDirectional, position, shadowBiasDirectional, helperDirectional, active, onRemove, directionalLights, setDirectionalLights) => {
  const refDirectionalLight = useRef();

  const [controlsDirectional, set] = useControls(() => ({
    [[`${name}`]]: folder({
      directional: directional,
      colorDirectional: colorDirectional,
      intensityDirectional: {
        value: intensityDirectional,
        step: 0.01,
        min: 0,
        max: 5,
      },
      positionDirectional: {
        x: position.x,
        y: position.y,
        z: position.z
      },
      shadowBiasDirectional: {
        value: shadowBiasDirectional,
        step: 0.00001,
        min: -0.001,
        max: 0.0
    
      },
      helperDirectional: helperDirectional,
      Remove: button(() => {
        onRemove();
      })
    })
  }));

  useEffect(() => {
    const newDirectionalLights = directionalLights.map((light) => {
      if (light.name === name) {
        light.directional = controlsDirectional.directional;
        light.colorDirectional = controlsDirectional.colorDirectional;
        light.intensityDirectional = controlsDirectional.intensityDirectional;
        light.position = controlsDirectional.positionDirectional;
        light.shadowBiasDirectional = controlsDirectional.shadowBiasDirectional;
        light.helperDirectional = controlsDirectional.helperDirectional;
      }
      return light;
    });

    setDirectionalLights(newDirectionalLights);
  }, [controlsDirectional])

  useEffect(() => {
    set({
      directional: directional,
      colorDirectional: colorDirectional,
      intensityDirectional: intensityDirectional,
      positionDirectional: {
        x: position.x,
        y: position.y,
        z: position.z
      },
      shadowBiasDirectional: shadowBiasDirectional,
      helperDirectional: helperDirectional,
    });
  }, []);

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
