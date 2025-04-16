import VhSetter from '@/components/common/VhSetter';
import MojiBookPage from '@/containers/MojiBookPage';
import { cookies } from 'next/headers';

export default async function Home() {
    const deviceType = await getDeviceType();
    const isIOS = await getIsIOS();
    return (
        <>
            <VhSetter />
            <div
                className="flex flex-col items-center justify-center"
                style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
            >
                <h1 className="text-2xl font-bold text-center text-white">
                    지금 마음속에 있는 걸 떠올리며
                    <br />
                    클릭해보세요.
                </h1>
                <MojiBookPage isMobile={deviceType === 'mobile'} isIOS={isIOS === 'true'} />
            </div>
        </>
    );
}

const getDeviceType = async () => {
    const cookieStore = await cookies();
    const deviceType = cookieStore.get('device-type')?.value;
    return deviceType;
};

const getIsIOS = async () => {
    const cookieStore = await cookies();
    const isIOS = cookieStore.get('is-ios')?.value;
    return isIOS;
};
