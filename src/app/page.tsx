import MojiBookPage from '@/containers/MojiBookPage';
import { cookies } from 'next/headers';

export default async function Home() {
    const deviceType = await getDeviceType();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-center text-white">
                지금 마음속에 있는 걸 떠올리며
                <br />
                클릭해보세요.
            </h1>
            <MojiBookPage isMobile={deviceType === 'mobile'} />
        </div>
    );
}

const getDeviceType = async () => {
    const cookieStore = await cookies();
    const deviceType = cookieStore.get('device-type')?.value;
    return deviceType;
};
