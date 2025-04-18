'use client';

import { useCallback, useMemo, useState } from 'react';
import InteractiveBook from '@/components/InteractiveBook';
import FlippingBook from '@/components/FlippingBook';
import useDeviceTilt from '@/hooks/useDeviceTilt';
import Button from '@/components/common/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import useMojiMessage from '@/hooks/api/useMojiMessage';
import useMessage from '@/hooks/api/useMessage';

const MojiBook = ({ isMobile, isIOS }: { isMobile: boolean; isIOS: boolean }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const messageId = useMemo(() => searchParams.get('id'), []);
    const { insertMessage, message: prevMessage } = useMessage({
        messageId: messageId == null ? undefined : Number(messageId),
    });
    const {
        data: message,
        isTransitioning,
        mutateWithTransition: getMojiMessage,
    } = useMojiMessage({
        onSuccess: async (message) => {
            const { id } = await insertMessage(message);
            const params = new URLSearchParams(searchParams.toString());
            params.set('id', String(id));
            router.push(`?${params.toString()}`);
        },
    });
    const [bookOpen, setBookOpen] = useState(messageId != null);
    const { ref: bookRef, requestPermission } = useDeviceTilt({ maxTilt: 40, isMobile, isIOS });

    const handleBookClick = useCallback(() => {
        setBookOpen(true);
    }, []);

    return (
        <div>
            {bookOpen ? (
                <FlippingBook
                    getMojiMessage={getMojiMessage}
                    message={message || prevMessage?.message || ''}
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
