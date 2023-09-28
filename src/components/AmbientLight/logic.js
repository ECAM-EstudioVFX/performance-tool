import { useControls } from 'leva'

export const useAmbientLightLogic = () => {

    const { ambient, colorAmbient, intensityColor } = useControls(
        'AmbientLight',
        {
          ambient: true,
          colorAmbient: '#FFFFFF',
          intensityColor: {
            value: 0.5,
            step: 0.01,
            min: 0,
            max: 5
          }
        }
      )

    return { ambient, colorAmbient, intensityColor };
}