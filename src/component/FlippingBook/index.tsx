'use client';
import { motion } from 'framer-motion';
import BookCoverInner from './BookCoverInner';
import { useCallback, useMemo, useState } from 'react';
import useMojiMessage from '@/app/hooks/api/useMojiMessage';
import BookPages from './BookPages';
import BookZoomed from './BookZoomed';

const FlippingBook = () => {
    const [currentStep, setCurrentStep] = useState<'closed' | 'zoomed'>('closed');
    const { mutateAsync: getMojiMessage, data: message } = useMojiMessage();
    const pages = useMemo(() => Array(8).fill(0), []);

    const handleAnimationComplete = useCallback(
        async (index: number) => {
            if (index !== pages.length - 1) return;
            // await getMojiMessage();
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
            closed: <BookPages {...propsConfig['closed']} />,
            zoomed: <BookZoomed {...propsConfig['zoomed']} />,
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
