import { useEffect, useRef } from 'react';

interface UseDeviceTiltOptions {
    isMobile: boolean;
    isIOS: boolean;
    maxTilt?: number;
}

type DeviceOrientationEventConstructorWithPermission = typeof DeviceOrientationEvent & {
    requestPermission?: () => Promise<'granted' | 'denied'>;
};

const useDeviceTilt = ({ maxTilt = 50, isMobile, isIOS }: UseDeviceTiltOptions) => {
    const ref = useRef<HTMLDivElement | HTMLElement | null>(null);

    const handleOrientation = (event: DeviceOrientationEvent) => {
        const { beta, gamma } = event;

        if (!ref.current || beta === null || gamma === null) return;

        const rotateX = Math.max(Math.min((beta / 90) * maxTilt, maxTilt), -maxTilt);
        const rotateY = Math.max(Math.min((gamma / 90) * maxTilt, maxTilt), -maxTilt);

        ref.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    useEffect(() => {
        if (!isMobile || isIOS === true) return;
        window.addEventListener('deviceorientation', handleOrientation, true);
        return () => {
            if (!isMobile) return;
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [ref.current, maxTilt, isMobile, isIOS, handleOrientation]);

    const requestPermission = async () => {
        if (isIOS === false) {
            window.addEventListener('deviceorientation', handleOrientation, true);
            return;
        }
        const eventConstructor =
            DeviceOrientationEvent as DeviceOrientationEventConstructorWithPermission;
        if (typeof eventConstructor.requestPermission === 'function') {
            try {
                const response = await eventConstructor.requestPermission();
                if (response === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, true);
                } else {
                    console.warn('Permission denied.');
                }
            } catch (err) {
                console.error('IOS Device orientation permission denied:', err);
            }
        } else {
            window.addEventListener('deviceorientation', handleOrientation, true);
        }
    };

    return { ref, requestPermission };
};

export default useDeviceTilt;
