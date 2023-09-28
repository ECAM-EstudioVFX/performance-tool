import { useAmbientLightLogic } from './logic'

function AmbientLight() {
  const { ambient, intensityColor, colorAmbient } = useAmbientLightLogic()

  return (
    ambient && <ambientLight intensity={intensityColor} color={colorAmbient} />
  )
}

export default AmbientLight
