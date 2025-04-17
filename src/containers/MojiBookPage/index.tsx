'use client';

import { useCallback, useMemo, useState } from 'react';
import useMojiMessage from '@/app/hooks/api/useMojiMessage';
import InteractiveBook from '@/components/InteractiveBook';
import FlippingBook from '@/components/FlippingBook';
import useDeviceTilt from '@/hooks/useDeviceTilt';
import Button from '@/components/common/Button';
import { useRouter, useSearchParams } from 'next/navigation';

const MojiBook = ({ isMobile, isIOS }: { isMobile: boolean; isIOS: boolean }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {
        data: message,
        isTransitioning,
        mutateWithTransition: getMojiMessage,
    } = useMojiMessage({
        onSuccess: (data) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('message', btoa(encodeURIComponent(data.toString())));
            router.push(`?${params.toString()}`);
        },
    });
    const [bookOpen, setBookOpen] = useState(searchParams.get('message') != null);
    const { ref: bookRef, requestPermission } = useDeviceTilt({ maxTilt: 40, isMobile, isIOS });

    const handleBookClick = useCallback(() => {
        setBookOpen(true);
    }, []);

    const prevMessage = useMemo(
        () => decodeURIComponent(atob(searchParams.get('message') ?? '')),
        [searchParams.get('message')],
    );

    return (
        <div>
            {bookOpen ? (
                <FlippingBook
                    getMojiMessage={getMojiMessage}
                    message={prevMessage || message || ''}
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
