'use client';

import { useCallback, useEffect, useState } from 'react';
import useMojiMessage from '@/app/hooks/api/useMojiMessage';
import InteractiveBook from '@/components/InteractiveBook';
import FlippingBook from '@/components/FlippingBook';
import useDeviceTilt from '@/hooks/useDeviceTilt';

const MojiBook = ({ isMobile, isIOS }: { isMobile: boolean; isIOS: boolean }) => {
    const { mutateAsync: getMojiMessage, data: message } = useMojiMessage();
    const [bookOpen, setBookOpen] = useState(false);
    const { ref: bookRef, requestPermission } = useDeviceTilt({ maxTilt: 40, isMobile, isIOS });

    const handleBookClick = useCallback(() => {
        setBookOpen(true);
    }, []);

    useEffect(() => {
        if (isIOS === false) return;
        requestPermission();
    }, [isIOS]);

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
                </>
            )}
        </div>
    );
};

export default MojiBook;
