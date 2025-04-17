'use client';
import { motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import ZoomPage from '@/components/FlippingBook/page/ZoomPage';
import Pages from './page/Pages';
import BookCoverInner from '../common/Book/BookCoverInner';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import LoadingIndicator from '../common/LoadingIndicator';
import { useRouter } from 'next/navigation';
interface FlippingBookProps {
    getMojiMessage: () => void;
    message: string;
    isLoading: boolean;
}

const FlippingBook = ({ getMojiMessage, message, isLoading }: FlippingBookProps) => {
    const router = useRouter();
    const isSmallScreen = useMediaQuery({ maxWidth: 800 });
    const [currentStep, setCurrentStep] = useState<'closed' | 'zoomed'>('closed');
    const pages = useMemo(() => Array(8).fill(0), []);

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
                        label: '메시지 다시 받기',
                        buttonType: 'primary' as const,
                        onClick: () => {
                            window.location.href = '/';
                        },
                    },
                ],
            },
        }),
        [pages, handleAnimationComplete, message, router],
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
