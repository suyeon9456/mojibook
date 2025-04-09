'use client';

import { useCallback, useState } from 'react';
import useMojiMessage from '@/app/hooks/api/useMojiMessage';
import InteractiveBook from '@/components/InteractiveBook';
import FlippingBook from '@/components/FlippingBook';

const MojiBook = ({ isMobile }: { isMobile: boolean }) => {
    const { mutateAsync: getMojiMessage, data: message } = useMojiMessage();
    const [bookOpen, setBookOpen] = useState(false);

    const handleBookClick = useCallback(() => {
        setBookOpen(true);
    }, []);

    return (
        <div>
            {bookOpen ? (
                <FlippingBook getMojiMessage={getMojiMessage} message={message ?? ''} />
            ) : (
                <InteractiveBook handleBookClick={handleBookClick} isMobile={isMobile} />
            )}
        </div>
    );
};

export default MojiBook;
