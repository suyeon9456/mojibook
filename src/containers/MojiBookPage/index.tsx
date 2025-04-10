'use client';

import { useCallback, useState } from 'react';
import useMojiMessage from '@/app/hooks/api/useMojiMessage';
import InteractiveBook from '@/components/InteractiveBook';
import FlippingBook from '@/components/FlippingBook';
import useDeviceTilt from '@/hooks/useDeviceTilt';

const MojiBook = ({ isMobile }: { isMobile: boolean }) => {
    const { mutateAsync: getMojiMessage, data: message } = useMojiMessage();
    const [bookOpen, setBookOpen] = useState(false);
    const { ref: bookRef } = useDeviceTilt({ maxTilt: 40, isMobile });

    const handleBookClick = useCallback(() => {
        setBookOpen(true);
    }, []);

    return (
        <div>
            {bookOpen ? (
                <FlippingBook getMojiMessage={getMojiMessage} message={message ?? ''} />
            ) : (
                <InteractiveBook
                    bookRef={bookRef as React.RefObject<HTMLDivElement>}
                    handleBookClick={handleBookClick}
                    isMobile={isMobile}
                />
            )}
        </div>
    );
};

export default MojiBook;
