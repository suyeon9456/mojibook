'use client';

import { useCallback, useState } from 'react';
import useMojiMessage from '@/app/hooks/api/useMojiMessage';
import InteractiveBook from '@/components/InteractiveBook';
import FlippingBook from '@/components/FlippingBook';

const MojiBook = ({ isMobile }: { isMobile: boolean }) => {
    const {
        data: message,
        isTransitioning,
        mutateWithTransition: getMojiMessage,
    } = useMojiMessage();
    const [bookOpen, setBookOpen] = useState(false);

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
                <InteractiveBook handleBookClick={handleBookClick} isMobile={isMobile} />
            )}
        </div>
    );
};

export default MojiBook;
