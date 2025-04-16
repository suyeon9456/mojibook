'use client';

import { useCallback, useState } from 'react';
import useMojiMessage from '@/app/hooks/api/useMojiMessage';
import InteractiveBook from '@/components/InteractiveBook';
import FlippingBook from '@/components/FlippingBook';
import useDeviceTilt from '@/hooks/useDeviceTilt';
import Button from '@/components/common/Button';

const MojiBook = ({ isMobile, isIOS }: { isMobile: boolean; isIOS: boolean }) => {
    console.log('🚀 ~ MojiBook ~ isIOS:', isIOS);
    const { mutateAsync: getMojiMessage, data: message } = useMojiMessage();
    const [bookOpen, setBookOpen] = useState(false);
    const { ref: bookRef, requestPermission } = useDeviceTilt({ maxTilt: 40, isMobile, isIOS });

    const handleBookClick = useCallback(() => {
        setBookOpen(true);
    }, []);

    return (
        <div>
            {bookOpen ? (
                <FlippingBook getMojiMessage={getMojiMessage} message={message ?? ''} />
            ) : (
                <>
                    <InteractiveBook
                        bookRef={bookRef as React.RefObject<HTMLDivElement>}
                        handleBookClick={handleBookClick}
                        isMobile={isMobile}
                    />
                    <Button onClick={() => requestPermission()} />
                </>
            )}
        </div>
    );
};

export default MojiBook;
