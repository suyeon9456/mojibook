import { useEffect, useRef } from 'react';

interface UseDeviceTiltOptions {
    isMobile: boolean;
    isIOS: boolean;
    maxTilt?: number;
}

// Define the type for the DeviceOrientationEvent constructor with the optional static method
type DeviceOrientationEventConstructorWithPermission = typeof DeviceOrientationEvent & {
    requestPermission?: () => Promise<'granted' | 'denied'>;
};

const useDeviceTilt = ({ maxTilt = 40, isMobile, isIOS }: UseDeviceTiltOptions) => {
    const ref = useRef<HTMLDivElement | HTMLElement | null>(null);
    useEffect(() => {
        if (!isMobile) return;
        const handleOrientation = (event: DeviceOrientationEvent) => {
            const { beta, gamma } = event;

            if (!ref.current || beta === null || gamma === null) return;

            const rotateX = Math.max(Math.min((beta / 90) * maxTilt, maxTilt), -maxTilt);
            const rotateY = Math.max(Math.min((gamma / 90) * maxTilt, maxTilt), -maxTilt);

            ref.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const requestPermission = async () => {
            if (isIOS === true) {
                const eventConstructor =
                    DeviceOrientationEvent as DeviceOrientationEventConstructorWithPermission;
                if (typeof eventConstructor.requestPermission === 'function') {
                    try {
                        const response = await eventConstructor.requestPermission();
                        if (response === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation, true);
                        }
                    } catch (err) {
                        console.error('IOS Device orientation permission denied:', err);
                    }
                } else {
                    window.addEventListener('deviceorientation', handleOrientation, true);
                }
            } else {
                window.addEventListener('deviceorientation', handleOrientation, true);
            }
        };

        requestPermission();

        return () => {
            if (!isMobile) return;
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [ref.current, maxTilt, isMobile, isIOS]);

    return { ref };
};

export default useDeviceTilt;
