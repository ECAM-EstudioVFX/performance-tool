import { useControls } from 'leva'

function AmbientLight() {
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

  return (
    ambient && <ambientLight intensity={intensityColor} color={colorAmbient} />
  )
}

export default AmbientLight
