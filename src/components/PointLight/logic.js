import { useControls, folder, button } from 'leva';

export const usePointLightLogic = (name, onRemove, position) => {

    const [controlsPoint, set] = useControls(() => ({
        [[`${name}`]]: folder({
            isActive: true,
            color: '#FFFFFF',
            intensity: {
                value: 1,
                step: 0.01,
                min: 0,
                max: 5
            },
            position: {
                x: position.x,
                y: position.y,
                z: position.z
            },
        })

    }))

}