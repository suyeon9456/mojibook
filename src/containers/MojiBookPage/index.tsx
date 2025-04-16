'use client';

import { useCallback, useState } from 'react';
import useMojiMessage from '@/app/hooks/api/useMojiMessage';
import InteractiveBook from '@/components/InteractiveBook';
import FlippingBook from '@/components/FlippingBook';
import useDeviceTilt from '@/hooks/useDeviceTilt';
import Button from '@/components/common/Button';

const MojiBook = ({ isMobile, isIOS }: { isMobile: boolean; isIOS: boolean }) => {
    const {
        data: message,
        isTransitioning,
        mutateWithTransition: getMojiMessage,
    } = useMojiMessage();
    const [bookOpen, setBookOpen] = useState(false);
    const { ref: bookRef, requestPermission } = useDeviceTilt({ maxTilt: 40, isMobile, isIOS });

    const handleBookClick = useCallback(() => {
        setBookOpen(true);
    }, []);

    return (
        <div>
            {bookOpen ? (
                <FlippingBook
                    getMojiMessage={getMojiMessage}
                    message={message ?? ''}
                    isLoading={isTransitioning}
                />
            ) : (
                <div className="relative">
                    <InteractiveBook
                        bookRef={bookRef as React.RefObject<HTMLDivElement>}
                        handleBookClick={handleBookClick}
                        isMobile={isMobile}
                    />
                    {isIOS && isMobile && (
                        <Button
                            label="센서 허용하기"
                            className="absolute bottom-[0] left-[calc(50%-53px)] opacity-[0.4]"
                            onClick={requestPermission}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default MojiBook;
