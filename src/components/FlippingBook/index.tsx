'use client';
import { motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import ZoomPage from '@/components/FlippingBook/page/ZoomPage';
import Pages from './page/Pages';
import BookCoverInner from '../common/Book/BookCoverInner';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import LoadingIndicator from '../common/LoadingIndicator';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
interface FlippingBookProps {
    getMojiMessage: () => void;
    message: string;
    isLoading: boolean;
}

const FlippingBook = ({ getMojiMessage, message, isLoading }: FlippingBookProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isSmallScreen = useMediaQuery({ maxWidth: 800 });
    const [currentStep, setCurrentStep] = useState<'closed' | 'zoomed'>('closed');

    const pages = useMemo(() => Array(8).fill(0), []);

    const messageId = searchParams.get('id');

    const handleAnimationComplete = useCallback(
        async (index: number) => {
            if (index !== pages.length - 1) return;
            setCurrentStep('zoomed');
            if (message !== '') return;
            await getMojiMessage();
        },
        [getMojiMessage, message],
    );

    const propsConfig = useMemo(
        () => ({
            closed: {
                pages,
                handleAnimationComplete,
            },
            zoomed: {
                message: message || '',
                actions: [
                    {
                        icon: (
                            <Image
                                src="/icons/talk.svg"
                                alt="카카오톡 공유 아이콘"
                                width={16}
                                height={16}
                            />
                        ),
                        onClick: () => {
                            if (!window.Kakao || !window.Kakao.Share) return;
                            window.Kakao.Share.sendDefault({
                                objectType: 'feed',
                                content: {
                                    title: '모지북',
                                    description: '당신을 위한 한마디를 받아보세요. ✨',
                                    imageUrl: `${process.env.NEXT_PUBLIC_APP_URL}/images/og_image.png`,
                                    link: {
                                        mobileWebUrl: `${process.env.NEXT_PUBLIC_APP_URL}?id=${messageId}`,
                                        webUrl: `${process.env.NEXT_PUBLIC_APP_URL}?id=${messageId}`,
                                    },
                                },
                            });
                        },
                    },
                    {
                        icon: (
                            <Image
                                src="/icons/refresh.svg"
                                alt="메시지 다시 받기 아콘"
                                width={16}
                                height={16}
                            />
                        ),
                        onClick: () => {
                            window.location.href = '/';
                        },
                    },
                ],
            },
        }),
        [pages, handleAnimationComplete, message, router, messageId],
    );

    const viewConfig = useMemo(
        () => ({
            closed: <Pages {...propsConfig['closed']} />,
            zoomed: <ZoomPage {...propsConfig['zoomed']} />,
        }),
        [propsConfig],
    );

    const CurrentBookView = viewConfig[currentStep];

    return (
        <motion.div
            className={classNames(
                'relative h-[500px] perspective-[800px]',
                isSmallScreen && currentStep === 'zoomed' ? 'w-[100vw]' : 'w-[800px]',
            )}
        >
            <BookCoverInner
                className={classNames(
                    'absolute top-0 left-0',
                    isSmallScreen && currentStep === 'zoomed' ? 'hidden' : '',
                )}
            />
            {CurrentBookView}
            {isLoading && message === '' && <LoadingIndicator />}
            <BookCoverInner className={isSmallScreen && currentStep === 'zoomed' ? 'hidden' : ''} />
        </motion.div>
    );
};

export default FlippingBook;
