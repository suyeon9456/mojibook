'use client';
import { motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import ZoomPage from '@/components/FlippingBook/page/ZoomPage';
import Pages from './page/Pages';
import BookCoverInner from '../common/Book/BookCoverInner';

interface FlippingBookProps {
    getMojiMessage: () => void;
    message: string;
}

const FlippingBook = ({ getMojiMessage, message }: FlippingBookProps) => {
    const [currentStep, setCurrentStep] = useState<'closed' | 'zoomed'>('closed');
    const pages = useMemo(() => Array(8).fill(0), []);

    const handleAnimationComplete = useCallback(
        async (index: number) => {
            if (index !== pages.length - 1) return;
            await getMojiMessage();
            setCurrentStep('zoomed');
        },
        [getMojiMessage],
    );

    const propsConfig = useMemo(
        () => ({
            closed: {
                pages,
                handleAnimationComplete,
            },
            zoomed: {
                message: message || '',
            },
        }),
        [pages, handleAnimationComplete, message],
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
        <motion.div className="relative w-[800px] h-[500px] perspective-[800px]">
            <BookCoverInner className="absolute top-0 left-0" />
            {CurrentBookView}
            <BookCoverInner />
        </motion.div>
    );
};

export default FlippingBook;
